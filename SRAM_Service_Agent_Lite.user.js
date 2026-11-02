// ==UserScript==
// @name         SRAM Service Agent lite (Beta)
// @namespace    https://sram.com
// @version      0.7.2
// @description  BETA – KVA-Nachverfolgung für das SRAM B2B Service-Portal (Deutschland)
// @author       SRAM STS
// @match        https://sramllcprodcf.cpp.cfapps.us10.hana.ondemand.com/*
// @match        https://b2b.sram.com/*
// @grant        none
// @all-frames   true
// @updateURL    https://raw.githubusercontent.com/cteuschler/sram-lieferschein-texte/main/SRAM_Service_Agent_Lite.user.js
// @downloadURL  https://raw.githubusercontent.com/cteuschler/sram-lieferschein-texte/main/SRAM_Service_Agent_Lite.user.js
// ==/UserScript==

// ─────────────────────────────────────────────────────────────────────────
// SRAM Service Agent lite (Beta)
//
// Findet Auftraege im Status COM, bei denen der Haendler nicht geantwortet
// hat, und bereitet die naechsten Schritte vor: Erinnerung zwischen 4 und 10
// Werktagen, unbearbeiteter Rueckversand ab 10 Werktagen.
//
// GRUNDSATZ: Das Werkzeug schreibt vor, es schickt nicht ab.
// Jede Aktion fuellt Felder und setzt den Status, aber SPEICHERN muss der
// Bearbeiter. Der Grund: Der Status SBP hebt den Versandblock auf. Ein
// falscher Stapellauf wuerde Produkte unbearbeitet verschicken, und das
// laesst sich nicht zurueckholen, wenn das Paket draussen ist.
//
// Gemessene Grundlagen (Portal, Stand Oktober 2026):
//   - SmartFilterBar mit ID-Endung "--smartFilterBar", Felder HeaderStatusKey,
//     SalesOrganization, EmployeeName, EmployeePartner
//   - Status COM = E0005, SBP = E0010 (ACHTUNG: SHBP = E0008 heisst in der
//     Beschreibung genauso, ist aber ein anderer Status)
//   - Die Korrespondenz ist NICHT ueber den OData-Dienst abfragbar. Sie steht
//     nur im "order"-Modell, also erst nach dem Oeffnen eines Auftrags.
//     Deshalb laeuft die Pruefung je Auftrag einzeln, nicht fuer die Liste.
// ─────────────────────────────────────────────────────────────────────────

(function () {
'use strict';

const VERSION = '0.7.2';
const IS_TOP = (window === window.top);

// Status-Schluessel. Nach Beschreibung zu gehen waere falsch: "Shipment Being
// Prepared" gibt es zweimal, als SHBP (E0008) und als SBP (E0010).
const STATUS_COM = 'E0005';
const STATUS_SBP = 'E0010';

const SALES_ORG = '0047';          // Deutschland
const FRIST_ERINNERUNG = 4;        // ab so vielen Werktagen: Erinnerung
const FRIST_RUECKVERSAND = 10;     // ab so vielen Werktagen: Rueckversand

const TEXT_ERINNERUNG =
  'Bitte beantworten Sie diesen Auftrag innerhalb der nächsten 6 Werktage, ' +
  'andernfalls senden wir das Produkt unbearbeitet zurück.';
const TEXT_RUECKVERSAND =
  'Aufgrund fehlender Rückmeldung senden wir das Produkt unbearbeitet zurück.';

const KEY_IDENT = 'sramAgentIdent';
// Ergebnisse geprueffter Auftraege. Im Sitzungsspeicher, nicht dauerhaft:
// Eine Pruefung ist eine Momentaufnahme - morgen kann der Haendler geantwortet
// haben. Beim Schliessen des Browsers soll sie deshalb verfallen.
const KEY_GEPRUEFT = 'sramAgentGeprueft';
// War das Panel offen, und was stand darin? Damit ueberlebt der Arbeitsstand
// den Wechsel zwischen Auftragsliste und Auftrag - sonst faengt man nach
// jedem Sprung von vorne an.
const KEY_OFFEN = 'sramAgentOffen';
const KEY_LISTE = 'sramAgentListe';

function merke(schluessel, wert) {
  try { sessionStorage.setItem(schluessel, JSON.stringify(wert)); } catch (e) {}
}
function hole(schluessel) {
  try { const r = sessionStorage.getItem(schluessel); return r ? JSON.parse(r) : null; } catch (e) { return null; }
}
function vergiss(schluessel) {
  try { sessionStorage.removeItem(schluessel); } catch (e) {}
}

// Die Ergebnisse liegen JE PERSON getrennt.
//
// Vorher wurde beim Wechsel in eine Vertretung alles geloescht - damit waren
// auch die eigenen Pruefungen weg, und man fing von vorne an. Getrennte Faecher
// loesen das: Wer zum Kollegen wechselt und zurueck, findet seinen Stand
// wieder, sieht aber nie fremde Ergebnisse in der eigenen Liste.
function fachName() {
  const k = aktiveKennung();
  return k ? (k.vertretung ? 'v:' : 'e:') + String(k.wert).toLowerCase() : 'unbekannt';
}
function geprueffteLesen() {
  try {
    const alle = JSON.parse(sessionStorage.getItem(KEY_GEPRUEFT) || '{}');
    return alle[fachName()] || {};
  } catch (e) { return {}; }
}
function geprueffteMerken(nr, res) {
  try {
    const alle = JSON.parse(sessionStorage.getItem(KEY_GEPRUEFT) || '{}');
    const fach = fachName();
    if (!alle[fach]) alle[fach] = {};
    alle[fach][String(nr).replace(/^0+/, '')] = {
      zeit: Date.now(),
      tage: res.tage,
      anzahl: res.anzahl,
      letzterSender: res.letzte ? res.letzte.sender : null,
      vonSram: res.letzteVonSram,
      nichtGeladen: !!res.korrNichtGeladen,
      stufe: res.korrNichtGeladen ? 'nichtgeladen'
           : (res.tage == null) ? 'unklar'
           : (res.tage >= FRIST_RUECKVERSAND ? 'rueck'
           : (res.tage >= FRIST_ERINNERUNG ? 'erinnern' : 'warten'))
    };
    sessionStorage.setItem(KEY_GEPRUEFT, JSON.stringify(alle));
  } catch (e) {}
}

function log() { try { console.log('%c[SRAM Agent]', 'color:#E31836;font-weight:700', ...arguments); } catch (e) {} }

// ── Zugriff auf die Anwendung ────────────────────────────────────────────
function allDocs() {
  const docs = [document];
  try {
    document.querySelectorAll('iframe').forEach(f => {
      try { if (f.contentDocument) docs.push(f.contentDocument); } catch (e) {}
    });
    const td = window.top.document;
    if (docs.indexOf(td) < 0) docs.push(td);
    td.querySelectorAll('iframe').forEach(f => {
      try { if (f.contentDocument && docs.indexOf(f.contentDocument) < 0) docs.push(f.contentDocument); } catch (e) {}
    });
  } catch (e) {}
  return docs;
}

// Alle Fenster mit einer SAPUI5-Umgebung.
//
// ACHTUNG, das war ein Fehler in Fassung 0.1.0: Das Hauptfenster hat SELBST
// ein sap.ui - die Shell des Portals, gemessen 154 Controls. Wer dort als
// Erstes sucht, findet die Auftragsliste nie; die Anwendung steckt im iframe
// und bringt rund 1390 Controls mit. Es muessen also alle Fenster durchsucht
// werden, nicht nur das erste mit sap.ui.
function appWindows() {
  const liste = [];
  for (const doc of allDocs()) {
    try {
      const w = doc.defaultView;
      if (!w || liste.indexOf(w) >= 0) continue;
      if (w.sap && w.sap.ui && w.sap.ui.core && w.sap.ui.core.Element) liste.push(w);
    } catch (e) {}
  }
  return liste;
}

// Control ueber die Endung seiner ID finden - in allen Fenstern. Der
// View-Praefix wechselt (__xmlview0, __xmlview2, ...), die Endung bleibt.
function byIdSuffix(wOderNull, suffix) {
  const fenster = wOderNull ? [wOderNull] : appWindows();
  const muster = new RegExp('--' + suffix + '$');
  for (const w of fenster) {
    try {
      const all = w.sap.ui.core.Element.registry.all();
      for (const id in all) {
        if (muster.test(id)) return all[id];
      }
    } catch (e) {}
  }
  return null;
}

// Das Fenster, in dem ein bestimmtes Control liegt
function appWindow(suffix) {
  for (const w of appWindows()) {
    try {
      const all = w.sap.ui.core.Element.registry.all();
      const muster = new RegExp('--' + (suffix || 'smartFilterBar') + '$');
      for (const id in all) { if (muster.test(id)) return w; }
    } catch (e) {}
  }
  return null;
}

// Das JSON-Modell mit den Auftragsdaten. Erreichbar ueber die Bindung eines
// bekannten Feldes - denselben Weg nutzt auch die Auftrags-Sicherung.
function orderModel(w) {
  try {
    const ta = byIdSuffix(w || null, 'internalMemoTextArea');
    const b = ta && ta.getBinding && ta.getBinding('value');
    return b ? b.getModel() : null;
  } catch (e) { return null; }
}

// ── Identitaet ───────────────────────────────────────────────────────────
// Die hinterlegte Kennung wird an die E-Mail des angemeldeten Benutzers
// gebunden. Oeffnet jemand anderes das Portal am selben Rechner - Vertretung,
// Schulungsplatz -, passt die E-Mail nicht mehr und es wird neu gefragt,
// statt stillschweigend unter fremdem Namen zu filtern und zu schreiben.
function angemeldeteMail() {
  for (const w of [window.top, window, appWindow()].filter(Boolean)) {
    try {
      const u = w.sap && w.sap.ushell && w.sap.ushell.Container &&
                w.sap.ushell.Container.getUser && w.sap.ushell.Container.getUser();
      if (u && u.getEmail && u.getEmail()) return u.getEmail();
      if (u && u.getId && u.getId()) return u.getId();
    } catch (e) {}
  }
  return null;
}

function identLesen() {
  try {
    const roh = localStorage.getItem(KEY_IDENT);
    if (!roh) return null;
    const d = JSON.parse(roh);
    const mail = angemeldeteMail();
    if (mail && d.mail && d.mail !== mail) return null;   // anderer Benutzer
    return d;
  } catch (e) { return null; }
}

// Vertretung: Auftraege eines Kollegen pruefen, etwa im Urlaub.
//
// Bewusst GETRENNT von der eigenen Kennung und nur im Sitzungsspeicher:
// Die eigene Kennung ist an die E-Mail gebunden, damit niemand aus Versehen
// unter fremdem Namen arbeitet. Eine Vertretung ist das Gegenteil - absichtlich
// fremd -, also muss sie sichtbar bleiben und beim Schliessen des Browsers
// verfallen. Eine vergessene Dauer-Vertretung waere genau der Fehler, den die
// Bindung an die E-Mail verhindern soll.
const KEY_VERTRETUNG = 'sramAgentVertretung';
// Warteschlange fuer "Alle prüfen". Muss den Seitenwechsel ueberstehen,
// deshalb im Sitzungsspeicher und nicht im Arbeitsspeicher: Jeder Auftrag
// bedeutet einen Wechsel, und dabei baut das Portal sich neu auf.
const KEY_SCHLANGE = 'sramAgentSchlange';
let stapelLaeuft = false;   // verhindert, dass der Takt sich selbst ueberholt

function vertretungLesen() {
  try { return JSON.parse(sessionStorage.getItem(KEY_VERTRETUNG) || 'null'); } catch (e) { return null; }
}
function vertretungSetzen(wert) {
  try {
    if (wert) sessionStorage.setItem(KEY_VERTRETUNG, JSON.stringify({
      art: /^\d+$/.test(wert) ? 'nummer' : 'name', wert: wert
    }));
    else sessionStorage.removeItem(KEY_VERTRETUNG);
  } catch (e) {}
}

// Nach wem wird gesucht - eigene Kennung oder Vertretung?
function aktiveKennung() {
  const v = vertretungLesen();
  if (v) return { art: v.art, wert: v.wert, vertretung: true };
  const i = identLesen();
  return i ? { art: i.art, wert: i.wert, vertretung: false } : null;
}

function identSchreiben(art, wert) {
  try {
    localStorage.setItem(KEY_IDENT, JSON.stringify({
      art: art, wert: wert, mail: angemeldeteMail() || null
    }));
  } catch (e) {}
}

// ── Werktage ─────────────────────────────────────────────────────────────
// Samstag und Sonntag zaehlen nicht. Feiertage kennt das Werkzeug nicht -
// die Zahl kann also um wenige Tage zu hoch liegen. Fuer eine Frist von vier
// bis zehn Tagen ist das vertretbar, und zu hoch bedeutet hier: eher spaeter
// erinnern, nicht frueher zurueckschicken.
function werktageSeit(datum) {
  if (!datum) return null;
  const von = new Date(datum);
  if (isNaN(von.getTime())) return null;
  let n = 0;
  const x = new Date(von.getTime());
  const heute = new Date();
  while (x < heute) {
    x.setDate(x.getDate() + 1);
    const wd = x.getDay();
    if (wd !== 0 && wd !== 6) n++;
  }
  return n;
}

function fmtDatum(d) {
  try {
    const x = new Date(d);
    return x.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch (e) { return '–'; }
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Ist gerade ein Auftrag geoeffnet? Dann kann der Agent dessen Korrespondenz
// sofort lesen - ohne Liste und ohne Seitenwechsel.
function offenerAuftrag() {
  try {
    // Zuerst die Adresse: Das Auftragsmodell bleibt nach dem Zuruecknavigieren
    // im Speicher stehen. Wer nur das Modell prueft, haelt auf der
    // Auftragsliste faelschlich einen Auftrag fuer geoeffnet - genau das ist
    // in Fassung 0.4.0 passiert.
    const hash = String(window.top.location.hash || '');
    const m2 = hash.match(/ServiceOrders-Create\?Order=(\d+)/);
    if (!m2) return null;
    const ausAdresse = m2[1].replace(/^0+/, '');

    const m = orderModel(null);
    const d = m && m.getData ? m.getData() : null;
    const nr = d && String(d.Order || d.SalesDocument || '').replace(/^0+/, '');
    // Nur wenn Adresse und Modell denselben Auftrag meinen
    if (!nr || nr !== ausAdresse) return null;
    return { nr: nr, status: d.HeaderStatusKey, korrespondenz: (d.Correspondence || []).length };
  } catch (e) { return null; }
}

// Zur Auftragsliste wechseln
function zurListe() {
  try { window.top.location.hash = 'manageserviceordersext-Display?sap-app-origin-hint='; } catch (e) {}
}

// ── Liste abfragen ───────────────────────────────────────────────────────
let gefunden = [];      // Ergebnis der letzten Abfrage
let laeuft = false;

function sucheAuftraege(fertig) {
  const fb = byIdSuffix(null, 'smartFilterBar');
  const tbl = byIdSuffix(null, 'orderTable');
  if (!fb || !tbl) {
    fertig({ fehler: 'Diese Ansicht hat keine Auftragsliste. Bitte „Manage My Orders“ öffnen.' });
    return;
  }
  const ident = aktiveKennung();
  if (!ident) { fertig({ fehler: 'Keine Kennung hinterlegt.' }); return; }

  const daten = {
    HeaderStatusKey: { items: [{ key: STATUS_COM }] },
    SalesOrganization: { ranges: [{ exclude: false, operation: 'EQ',
      keyField: 'SalesOrganization', value1: SALES_ORG, value2: null }] }
  };
  const feld = (ident.art === 'nummer') ? 'EmployeePartner' : 'EmployeeName';
  daten[feld] = { ranges: [{ exclude: false, operation: 'EQ',
    keyField: feld, value1: ident.wert, value2: null }] };

  try { fb.setFilterData(daten, true); } catch (e) { fertig({ fehler: 'Filter konnten nicht gesetzt werden.' }); return; }
  try { fb.search(); } catch (e) {}

  // Auf das Ergebnis warten. Die Bindung meldet kein verlaessliches Ereignis,
  // deshalb wird geprueft, bis sich die Laenge nicht mehr aendert.
  const b = tbl.getBinding('rows') || tbl.getBinding('items');
  let vorher = -1, ruhig = 0, versuche = 0;
  (function warte() {
    versuche++;
    const jetzt = b.getLength ? b.getLength() : 0;
    if (jetzt === vorher) ruhig++; else { ruhig = 0; vorher = jetzt; }
    if (ruhig >= 3 || versuche > 40) {
      const ctxs = b.getContexts(0, 300) || [];
      const zeilen = ctxs.map(c => {
        const o = c.getObject() || {};
        return {
          order: o.Order,
          ref: o.ExternalReference || '',
          kunde: o.ShipToName || '',
          angelegt: o.CreatedDate || null,
          neueNachricht: !!(o.NewMessage && String(o.NewMessage).trim()),
          employee: o.EmployeeName || '',
          // Vorlaeufig ab Anlage. Massgeblich ist die letzte SRAM-Nachricht,
          // die steht aber erst nach dem Oeffnen zur Verfuegung.
          tageVorlaeufig: werktageSeit(o.CreatedDate),
          geprueft: null
        };
      });
      fertig({ treffer: b.getLength ? b.getLength() : zeilen.length, zeilen: zeilen });
      return;
    }
    setTimeout(warte, 400);
  })();
}

// ── Einen Auftrag pruefen ────────────────────────────────────────────────
// Oeffnet den Auftrag und liest die Korrespondenz. Nur so ist zu erkennen,
// wer zuletzt geschrieben hat - der OData-Dienst gibt die Nachrichten nicht
// heraus (geprueft: SoConversationSet liefert null Eintraege).
// Die Korrespondenz des Auftrags auswerten, der GERADE geladen ist.
// Kein Seitenwechsel - deshalb von beiden Wegen nutzbar: aus dem geoeffneten
// Auftrag heraus und nach einem Wechsel aus der Liste.
// Den Korrespondenz-Abschnitt anstossen.
//
// WICHTIG: Das Portal laedt die Nachrichten ERST, wenn dieser Abschnitt
// geoeffnet wird. Ohne das bleibt Correspondence im Modell leer, und die
// Pruefung meldete "0 Nachricht(en)", obwohl im Auftrag welche standen -
// der haertnaeckigste Fehler dieser BETA.
function oeffneKorrespondenz() {
  // Weg 1: ueber die Seitenstruktur (ObjectPage) den Abschnitt waehlen
  try {
    for (const w of appWindows()) {
      const all = w.sap.ui.core.Element.registry.all();
      let seite = null, abschnitt = null;
      for (const id in all) {
        const c = all[id];
        try {
          const typ = c.getMetadata().getName();
          if (/ObjectPageLayout$/.test(typ)) seite = c;
          if (/--correspondenceSection$/.test(id)) abschnitt = c;
        } catch (e) {}
      }
      if (seite && abschnitt) {
        try { if (seite.setSelectedSection) seite.setSelectedSection(abschnitt.getId()); return true; } catch (e) {}
        try { if (seite.scrollToSection) seite.scrollToSection(abschnitt.getId()); return true; } catch (e) {}
      }
    }
  } catch (e) {}

  // Weg 2: den Reiter im Dokument anklicken
  try {
    for (const doc of allDocs()) {
      const el = doc.querySelector('[id$="correspondenceSection-anchor"]');
      if (!el) continue;
      const w = doc.defaultView || window;
      const r = el.getBoundingClientRect();
      const opt = { bubbles: true, cancelable: true, clientX: r.left + r.width / 2,
                    clientY: r.top + r.height / 2, view: w };
      ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(typ => {
        const E = typ.indexOf('pointer') === 0 ? w.PointerEvent : w.MouseEvent;
        try { el.dispatchEvent(new E(typ, typ.indexOf('pointer') === 0
          ? Object.assign({ pointerId: 1, pointerType: 'mouse', isPrimary: true }, opt) : opt)); } catch (e) {}
      });
      return true;
    }
  } catch (e) {}
  return false;
}

function werteAus(nr, fertig) {
  // Zwei Dinge muessen abgewartet werden, nicht eines:
  //   1. die richtige Auftragsnummer im Modell
  //   2. die Korrespondenz - sie wird NACH der Nummer nachgeladen
  // Fassung 0.1.0 hat nur auf die Nummer gewartet und deshalb "0 Nachrichten"
  // gemeldet, obwohl im Auftrag welche standen.
  let versuche = 0, nummerSeit = 0, angestossen = false;
  (function warte() {
    versuche++;
    const m = orderModel(null);
    const d = m && m.getData ? m.getData() : null;
    const passt = d && String(d.Order || d.SalesDocument || '').replace(/^0+/, '') === String(nr).replace(/^0+/, '');
    const korrRoh = (d && d.Correspondence) || [];

    if (passt) {
      if (!nummerSeit) { nummerSeit = versuche; angestossen = false; }
      // Beim ersten Durchlauf ohne Nachrichten den Abschnitt anstossen -
      // sonst laedt das Portal sie nie.
      if (korrRoh.length === 0 && !angestossen) { angestossen = true; oeffneKorrespondenz(); }
      const genugGewartet = (versuche - nummerSeit) >= 20;   // ca. 10 Sekunden
      if (korrRoh.length === 0 && !genugGewartet) { setTimeout(warte, 500); return; }

      // Nach dem Warten immer noch nichts? Dann ist NICHT gesagt, dass es
      // keine Nachrichten gibt - das Portal laedt die Korrespondenz nur beim
      // Oeffnen des Abschnitts, und das Anstossen greift nicht immer.
      // "0 Nachrichten" zu behaupten waere hier eine Falschaussage, auf die
      // sich jemand verlassen wuerde. Deshalb wird der Zweifel gemeldet.
      const nichtGeladen = (korrRoh.length === 0 && genugGewartet);

      const korr = korrRoh.map(k => ({
        nr: k.MsgNumber,
        sender: (k.Sender || '').trim(),
        zeit: k.Timestamp || k.Date || null,
        text: (k.messageText || k.MessageText || '').trim()
      })).filter(k => k.text);
      korr.sort((a, b) => new Date(a.zeit || 0) - new Date(b.zeit || 0));
      const letzte = korr[korr.length - 1] || null;

      // Wer ist SRAM? Das Feld SenderType ist leer (gemessen), taugt also
      // nicht. Verglichen wird der Absendername mit der hinterlegten Kennung -
      // das Portal kuerzt ihn, aus "Christian Teuschler" wird "Christian T.".
      // Erkannt werden dadurch nur die EIGENEN Nachrichten; ein Kollege gilt
      // als fremd. Deshalb nennt die Anzeige immer den Namen im Klartext,
      // statt zu behaupten, es sei der Haendler gewesen.
      const ident = aktiveKennung();
      const eigen = (ident && ident.art === 'name') ? ident.wert : '';
      const teile = eigen.split(/\s+/).filter(Boolean);
      const kurz = teile.length >= 2 ? (teile[0] + ' ' + teile[teile.length - 1][0]) : eigen;
      const istSram = (s) => {
        if (!s || !kurz) return null;                       // nicht entscheidbar
        const a = s.toLowerCase().replace(/\.$/, '');
        const b = kurz.toLowerCase();
        return a === b || a.indexOf(b) === 0;
      };

      const sramLetzte = [...korr].reverse().find(k => istSram(k.sender) === true);
      fertig({
        order: nr,
        status: d.HeaderStatusKey,
        headerNote: (d.TextHeadNote || ''),
        anzahl: korr.length,
        letzte: letzte,
        letzteVonSram: letzte ? istSram(letzte.sender) : null,
        korrNichtGeladen: nichtGeladen,
        eigenerKurzname: kurz || null,
        fristAb: sramLetzte ? sramLetzte.zeit : null,
        tage: sramLetzte ? werktageSeit(sramLetzte.zeit) : null,
        nachrichten: korr
      });
      return;
    }
    if (versuche > 40) { fertig({ fehler: 'Auftrag konnte nicht geladen werden' }); return; }
    setTimeout(warte, 500);
  })();
}

// Zu einem Auftrag wechseln und ihn danach auswerten.
function pruefeAuftrag(nr, fertig) {
  const ziel = 'ServiceOrders-Create?Order=' + encodeURIComponent(nr) +
               '&sap-app-origin-hint=&/orderentry?editing=false';
  try { window.top.location.hash = ziel; } catch (e) { fertig({ fehler: 'Wechsel nicht möglich' }); return; }
  setTimeout(() => werteAus(nr, fertig), 1200);
}

// ── Schreiben ────────────────────────────────────────────────────────────
// Genutzt wird die Feld-Bruecke des Textbaustein-Scripts. Die Logik dort ist
// erprobt (gesperrte Felder, iframes, Write-Message-Dialog) und soll nicht
// ein zweites Mal entstehen.
function bruecke() {
  try { return window.__sramFieldApi || window.top.__sramFieldApi || null; } catch (e) { return null; }
}

function korrespondenzSchreiben(text, fertig) {
  const api = bruecke();
  if (!api || !api.resolveCorrespondenceField) {
    fertig({ ok: false, text: 'Textbaustein-Script nicht aktiv – Korrespondenz kann nicht geöffnet werden.' });
    return;
  }
  api.resolveCorrespondenceField(function (feld) {
    if (!feld) { fertig({ ok: false, text: 'Korrespondenzfeld nicht gefunden – bitte „Write Message“ öffnen.' }); return; }
    if (api.isFieldEditable && !api.isFieldEditable(feld)) {
      fertig({ ok: false, text: 'Feld gesperrt – bitte zuerst „Edit“ klicken.' }); return;
    }
    const ok = api.writeField ? api.writeField(feld, text) : false;
    fertig({ ok: !!ok, text: ok
      ? 'Text eingetragen. Der Dialog bleibt offen: bitte prüfen und mit „Ok“ bestätigen.'
      : 'Text konnte nicht eingetragen werden.' });
  }, function () {});
}

function headerNoteSchreiben(text) {
  const api = bruecke();
  if (!api || !api.findFieldByLabel) return { ok: false, text: 'Textbaustein-Script nicht aktiv.' };
  const feld = api.findFieldByLabel((api.labels && api.labels.TextHeadNote) || 'Bemerkungen');
  if (!feld) return { ok: false, text: 'Header Note nicht gefunden.' };
  if (api.isFieldEditable && !api.isFieldEditable(feld)) return { ok: false, text: 'Header Note gesperrt – bitte „Edit“ klicken.' };
  const ok = api.writeField ? api.writeField(feld, text) : false;
  return { ok: !!ok, text: ok ? 'Header Note ergänzt.' : 'Header Note konnte nicht beschrieben werden.' };
}

function statusSetzen(key) {
  const sel = byIdSuffix(null, 'headerStatusSelect');
  if (!sel) return { ok: false, text: 'Statusfeld nicht gefunden.' };
  try {
    if (sel.getEditable && !sel.getEditable()) return { ok: false, text: 'Status gesperrt – bitte „Edit“ klicken.' };
    const vorhanden = (sel.getItems() || []).some(i => { try { return i.getKey() === key; } catch (e) { return false; } });
    if (!vorhanden) return { ok: false, text: 'Status ' + key + ' steht hier nicht zur Auswahl.' };
    sel.setSelectedKey(key);
    try { sel.fireChange({ selectedItem: sel.getSelectedItem ? sel.getSelectedItem() : null }); } catch (e) {}
    return { ok: true, text: 'Status auf SBP gesetzt.' };
  } catch (e) { return { ok: false, text: 'Status konnte nicht gesetzt werden.' }; }
}

// ── Oberflaeche ──────────────────────────────────────────────────────────
let panel = null;

function knopfAnlegen() {
  if (document.getElementById('sram-ag-launcher')) return;
  const b = document.createElement('button');
  b.id = 'sram-ag-launcher';
  b.innerHTML = '<span style="font-weight:700;">Service Agent Lite</span>' +
    '<span style="font-size:9px;background:#fff;color:#C62828;border-radius:3px;' +
    'padding:0 4px;font-weight:700;letter-spacing:.04em;">Beta</span>';
  // Farbe und Hoehe wie beim schwebenden Backup-Knopf.
  //
  // Gemessen: Der Backup-Knopf nutzt NICHT das Markenrot #E31836, sondern das
  // dunklere #C62828, und ist 30 Pixel hoch. Die Panels verwenden dagegen
  // #E31836 - das bleibt so, denn nebeneinander liegen immer nur die Knoepfe.
  b.style.cssText = 'position:fixed;left:136px;bottom:80px;z-index:2147482900;display:flex;' +
    'align-items:center;gap:6px;padding:7px 12px;background:#C62828;color:#fff;border:none;' +
    'border-radius:4px;cursor:pointer;font-family:Arial,Helvetica,sans-serif;font-size:12px;' +
    'box-shadow:0 3px 14px rgba(0,0,0,0.28);letter-spacing:0.02em;';
  ['mousedown', 'pointerdown', 'touchstart'].forEach(ev =>
    b.addEventListener(ev, e => { e.stopPropagation(); if (ev === 'mousedown') e.preventDefault(); }));
  b.addEventListener('click', toggle);
  document.body.appendChild(b);
  positioniere();
}

// Den Backup-Knopf im Dokument suchen - er kann in der Fussleiste des
// Auftrags sitzen (dann in einem iframe) oder frei schweben.
//
// WICHTIG: Die Leiste liegt im iframe, dieser Knopf im Hauptfenster. Die
// Masse aus dem iframe muessen deshalb um dessen Versatz ergaenzt werden,
// sonst stimmt die Position nicht - derselbe Stolperstein wie beim Abstand
// zur Fussleiste im Textbaustein-Script.
function findeBackupKnopf() {
  const suche = (doc, versatzX, versatzY) => {
    try {
      // In der Fussleiste eines Auftrags
      let el = doc.querySelector('[data-sram-tag="sramBackup"]');
      // Ausserhalb von Auftraegen schwebt der Knopf frei. Die Textsuche nach
      // "Backup" greift dort NICHT: der Knopf enthaelt Logo und Zaehler, sein
      // Textinhalt lautet also etwa "Backup2". Darum ueber die Kennung.
      if (!el) el = doc.getElementById('sram-bk-launcher');
      if (!el) {
        for (const k of doc.querySelectorAll('button')) {
          const txt = (k.textContent || '').trim();
          if (/^Backup/.test(txt) && k.getBoundingClientRect().width > 40) { el = k; break; }
        }
      }
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return null;
      return { x: r.left + versatzX, y: r.top + versatzY, b: r.width, h: r.height,
               el: el,
               inLeiste: el.hasAttribute && el.hasAttribute('data-sram-tag') };
    } catch (e) { return null; }
  };
  let tr = suche(document, 0, 0);
  if (tr) return tr;
  const rahmen = document.querySelectorAll('iframe');
  for (const f of rahmen) {
    try {
      if (!f.contentDocument) continue;
      const fr = f.getBoundingClientRect();
      tr = suche(f.contentDocument, fr.left, fr.top);
      if (tr) return tr;
    } catch (e) {}
  }
  return null;
}

function positioniere() {
  const b = document.getElementById('sram-ag-launcher');
  if (!b) return;
  const bk = findeBackupKnopf();
  if (!bk) {
    // Kein Backup-Knopf sichtbar: eigener Platz unten links
    b.style.left = '20px';
    b.style.bottom = '80px';
    b.style.top = 'auto';
    return;
  }
  // Rechts daneben, auf gleicher Hoehe. Gemessen: Backup ist 159 Pixel breit
  // und 26 hoch; mit Reset in der Leiste verschiebt es sich nach rechts,
  // deshalb wird jedes Mal neu gemessen statt fest gerechnet.
  // Ausserhalb von Auftraegen steht der Backup-Knopf frei und traegt einen
  // Zaehler, der ihn breiter macht. Dort mehr Abstand, damit nichts klebt.
  const inLeiste = !!bk.inLeiste;
  const abstand = inLeiste ? 10 : 28;

  // Aussehen vom Backup-Knopf ABNEHMEN statt fest eintragen.
  //
  // Gemessen: In der Fussleiste ist er #E31836 und 26 Pixel hoch, schwebend
  // dagegen #C62828 und 30 Pixel hoch. Zwei feste Werte waeren schon beim
  // naechsten Umbau falsch; abgelesen stimmt es immer.
  try {
    if (bk.el) {
      const s = (bk.el.ownerDocument.defaultView || window).getComputedStyle(bk.el);
      if (s && s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        b.style.background = s.backgroundColor;
        // Das "Beta"-Abzeichen traegt die Knopffarbe als Schrift
        const abz = b.querySelector('span:last-child');
        if (abz) abz.style.color = s.backgroundColor;
      }
      if (s && s.padding) b.style.padding = s.padding;
      if (s && s.fontSize) b.style.fontSize = s.fontSize;
      if (s && s.borderRadius) b.style.borderRadius = s.borderRadius;
    }
  } catch (e) {}

  const hoehe = b.getBoundingClientRect().height || 26;
  b.style.left = Math.round(bk.x + bk.b + abstand) + 'px';
  b.style.top = Math.round(bk.y + (bk.h - hoehe) / 2) + 'px';
  b.style.bottom = 'auto';
}

// Platzierung neben dem Sicherungs-Panel - laufend geprueft, nicht nur beim
// Oeffnen.
//
// Das Sicherungs-Panel liegt fest bei left:20px, ist 460 Pixel breit und hat
// die Ebene 2147483001 - hoeher als dieses hier. Es soll NICHT weichen,
// sondern der Agent. In Fassung 0.4.1 geschah das nur beim Aufbau: Wer zuerst
// den Agenten oeffnete und dann die Sicherung, bekam beide uebereinander.
//
// Nebeneinander passen sie erst ab etwa 1450 Pixel Fensterbreite, weil rechts
// noch das Textbaustein-Panel 443 Pixel belegt. Ist es enger, legt sich der
// Agent davor und sagt es in der Kopfzeile.
function positionierePanel() {
  if (!panel) return;
  let links = 20, ebene = 2147482901, verdeckt = false;
  try {
    if (document.getElementById('sram-bk-panel')) {
      const platz = window.innerWidth - 443 - 20;
      if (490 + 520 <= platz) { links = 490; }
      else { links = 20; ebene = 2147483050; verdeckt = true; }
    }
  } catch (e) {}
  if (panel.style.left !== links + 'px') panel.style.left = links + 'px';
  if (panel.style.zIndex !== String(ebene)) panel.style.zIndex = String(ebene);

  // Hinweiszeile ein- oder ausblenden
  const vorhanden = document.getElementById('sram-ag-verdeckt');
  if (verdeckt && !vorhanden) {
    const k = document.getElementById('sram-ag-ident');
    if (k) k.insertAdjacentHTML('beforebegin',
      '<div id="sram-ag-verdeckt" style="padding:5px 13px;background:#FFF4F4;' +
      'border-bottom:1px solid #E0B4B4;font-size:10.5px;color:#A02020;flex-shrink:0;">' +
      'Das Backup-Panel liegt dahinter – das Fenster ist zu schmal für beide nebeneinander.</div>');
  } else if (!verdeckt && vorhanden) {
    vorhanden.remove();
  }
}

function toggle() {
  if (panel) { panel.remove(); panel = null; vergiss(KEY_OFFEN); return; }
  merke(KEY_OFFEN, true);
  bauePanel();
}

function bauePanel() {
  panel = document.createElement('div');
  panel.id = 'sram-ag-panel';
  panel.style.cssText = 'position:fixed;left:20px;bottom:122px;width:520px;max-height:72vh;' +
    'z-index:2147482901;background:#fff;border:1px solid #E31836;border-radius:6px;' +
    'box-shadow:0 8px 30px rgba(0,0,0,0.28);font-family:Arial,Helvetica,sans-serif;' +
    'display:flex;flex-direction:column;overflow:hidden;color:#312929;';
  positionierePanel();
  ['mousedown', 'pointerdown', 'touchstart'].forEach(ev =>
    panel.addEventListener(ev, e => {
      e.stopPropagation();
      if (ev !== 'mousedown') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      e.preventDefault();
    }));

  panel.innerHTML =
    '<div style="display:flex;align-items:center;gap:8px;padding:11px 13px;background:#E31836;color:#fff;flex-shrink:0;">' +
      '<img src="data:image/png;base64,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" alt="SRAM" style="height:15px;width:auto;display:block;flex-shrink:0;">' +
      '<span style="font-size:13px;font-weight:600;flex:1;">Service Agent lite <span style="font-size:9px;background:#fff;color:#E31836;border-radius:3px;padding:0 4px;font-weight:700;">Beta</span></span>' +
      '<button id="sram-ag-x" style="background:none;border:none;color:#fff;cursor:pointer;font-size:17px;line-height:1;padding:0 3px;">✕</button>' +
    '</div>' +
    '<div id="sram-ag-ident" style="padding:7px 13px;background:#F2F7FB;border-bottom:1px solid #DCE6EE;font-size:11px;color:#2A5A7A;flex-shrink:0;"></div>' +
    '<div style="padding:8px 13px;background:#FFF8E1;border-bottom:1px solid #F0E3B0;font-size:11px;color:#7A5B00;flex-shrink:0;">' +
      'Diese Fassung <b>schreibt vor, sendet aber nicht ab</b>. Jede Aktion muss im Auftrag geprüft und gespeichert werden.' +
    '</div>' +
    '<div id="sram-ag-body" style="overflow-y:auto;padding:12px 13px;font-size:12px;line-height:1.5;"></div>';

  document.body.appendChild(panel);
  document.getElementById('sram-ag-x').addEventListener('click', toggle);
  zeigeIdent();
  zeigeStart();
}

function zeigeIdent() {
  const el = document.getElementById('sram-ag-ident');
  if (!el) return;
  const i = identLesen();
  const v = vertretungLesen();
  const mail = angemeldeteMail();

  if (v) {
    // Vertretung deutlich hervorheben - man arbeitet in fremden Auftraegen
    el.style.background = '#FFF4F4';
    el.style.borderBottomColor = '#E0B4B4';
    el.style.color = '#A02020';
    el.innerHTML = '<b>Vertretung für ' + esc(v.wert) + '</b>' +
      (v.art === 'nummer' ? ' (SRAM Owner No.)' : '') +
      ' &middot; <a href="#" id="sram-ag-vertrende" style="color:#A02020;">beenden</a>' +
      '<div style="font-size:10px;margin-top:2px;">Angemeldet als ' + esc(i ? i.wert : (mail || '–')) +
      ' – gilt nur für diese Browser-Sitzung.</div>';
  } else if (i) {
    el.style.background = '#F2F7FB';
    el.style.borderBottomColor = '#DCE6EE';
    el.style.color = '#2A5A7A';
    el.innerHTML = 'Bearbeiter: <b>' + esc(i.wert) + '</b>' +
      (i.art === 'nummer' ? ' (SRAM Owner No.)' : '') +
      ' &middot; <a href="#" id="sram-ag-identaendern" style="color:#2A5A7A;">ändern</a>' +
      ' &middot; <a href="#" id="sram-ag-vertretung" style="color:#2A5A7A;">Vertretung</a>';
  } else {
    el.innerHTML = 'Noch keine Kennung hinterlegt' +
      (mail ? ' für <b>' + esc(mail) + '</b>' : '') +
      ' &middot; <a href="#" id="sram-ag-identaendern" style="color:#2A5A7A;">jetzt eintragen</a>';
  }

  const a = document.getElementById('sram-ag-identaendern');
  if (a) a.addEventListener('click', e => { e.preventDefault(); frageIdent(); });
  const vt = document.getElementById('sram-ag-vertretung');
  if (vt) vt.addEventListener('click', e => { e.preventDefault(); frageVertretung(); });
  const ve = document.getElementById('sram-ag-vertrende');
  if (ve) ve.addEventListener('click', e => {
    e.preventDefault();
    vertretungSetzen(null);
    vergiss(KEY_LISTE);              // Trefferliste gehoerte zum Kollegen
    // Pruefergebnisse NICHT loeschen - sie liegen je Person getrennt und
    // der eigene Stand soll erhalten bleiben.
    zeigeIdent(); zeigeStart();
  });
}

function frageIdent() {
  const alt = identLesen();
  const wert = window.prompt(
    'Nach wessen Aufträgen soll gesucht werden?\n\n' +
    'Employee Name eintragen, zum Beispiel: Christian Teuschler\n' +
    'Oder die SRAM Owner No., zum Beispiel: 1091\n\n' +
    'Die Angabe wird an ' + (angemeldeteMail() || 'diesen Browser') + ' gebunden.',
    alt ? alt.wert : '');
  if (wert === null) return;
  const w = wert.trim();
  if (!w) return;
  // Nur Ziffern -> Owner No., sonst Name
  identSchreiben(/^\d+$/.test(w) ? 'nummer' : 'name', w);
  zeigeIdent();
  zeigeStart();
}

function frageVertretung() {
  const wert = window.prompt(
    'Wessen Aufträge sollen geprüft werden?\n\n' +
    'Employee Name eintragen, zum Beispiel: Uwe Kleedoerfer\n' +
    'Oder dessen SRAM Owner No.\n\n' +
    'Die Vertretung gilt nur für diese Browser-Sitzung und wird im Panel ' +
    'dauerhaft angezeigt. Leer lassen zum Beenden.', '');
  if (wert === null) return;
  const w = wert.trim();
  vertretungSetzen(w || null);
  // Nur die Trefferliste verwerfen; die Pruefergebnisse liegen je Person
  // getrennt und bleiben erhalten.
  if (w) vergiss(KEY_LISTE);
  zeigeIdent();
  zeigeStart();
}

function zeigeStart() {
  const b = document.getElementById('sram-ag-body');
  if (!b) return;
  const i = aktiveKennung();
  if (!i) {
    b.innerHTML = '<div style="color:#666;">Bitte zuerst oben die Kennung eintragen. ' +
      'Danach sucht der Agent Aufträge im Status <b>COM</b> für Verkaufsorganisation ' + SALES_ORG + '.</div>';
    return;
  }
  const listeDa = !!byIdSuffix(null, 'smartFilterBar');
  const auftrag = offenerAuftrag();
  // Kennzeichen des aktuellen Zusammenhangs, damit die Ansicht erneuert wird,
  // sobald die Liste fertig geladen ist oder ein Auftrag aufgeht.
  b.dataset.lage = (listeDa ? 'L' : '-') + (auftrag ? 'A' + auftrag.nr + ':' + auftrag.korrespondenz : '-');
  b.dataset.ansicht = 'start';

  let h = '';
  // In einem geoeffneten Auftrag: dessen Korrespondenz lesen. Das geht hier
  // ohne Umweg, weil die Daten bereits im Modell stehen.
  if (auftrag) {
    h += '<div style="background:#F2F7FB;border:1px solid #DCE6EE;border-radius:4px;padding:9px;margin-bottom:10px;">' +
      '<div style="font-weight:700;margin-bottom:3px;">Auftrag ' + esc(auftrag.nr) + ' ist geöffnet</div>' +
      '<div style="color:#555;font-size:11px;margin-bottom:7px;">Status ' + esc(auftrag.status || '–') +
        ' &middot; ' + auftrag.korrespondenz + ' Nachricht(en)</div>' +
      '<button id="sram-ag-hier" style="width:100%;padding:8px;background:#E31836;color:#fff;border:none;' +
        'border-radius:4px;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,Helvetica,sans-serif;">' +
        'Diesen Auftrag prüfen</button></div>';
  }

  if (listeDa) {
    h += '<div style="color:#555;margin-bottom:10px;">Sucht Aufträge im Status <b>COM</b> ' +
      '(Communication with Customer), Verkaufsorganisation ' + SALES_ORG + ', Bearbeiter <b>' + esc(i.wert) + '</b>.</div>' +
      '<button id="sram-ag-go" style="width:100%;padding:9px;background:#E31836;color:#fff;border:none;' +
        'border-radius:4px;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,Helvetica,sans-serif;">' +
        'Offene KVA suchen</button>' +
      '<div style="margin-top:9px;font-size:10.5px;color:#888;">Der Filter in der Auftragsliste wird dabei ' +
        'überschrieben. Wer dort eine eigene Einstellung hatte, muss sie danach neu setzen.</div>';
  } else {
    h += '<div style="color:#555;margin-bottom:8px;">Für die Suche nach offenen KVA wird die Auftragsliste ' +
      'gebraucht. In einem geöffneten Auftrag ist sie nicht geladen.</div>' +
      '<button id="sram-ag-liste" style="width:100%;padding:9px;background:#E31836;color:#fff;border:none;' +
        'border-radius:4px;font-size:12px;font-weight:700;cursor:pointer;font-family:Arial,Helvetica,sans-serif;">' +
        '↗ Zur Auftragsliste wechseln</button>' +
      '<div style="margin-top:9px;font-size:10.5px;color:#888;">Nicht gespeicherte Eingaben in diesem Auftrag ' +
        'gehen dabei verloren.</div>';
  }
  b.innerHTML = h;

  const bh = document.getElementById('sram-ag-hier');
  if (bh) {
    bh.addEventListener('mousedown', e => e.preventDefault());
    bh.addEventListener('click', pruefeHier);
  }
  const bg = document.getElementById('sram-ag-go');
  if (bg) {
    bg.addEventListener('mousedown', e => e.preventDefault());
    bg.addEventListener('click', starteSuche);
  }
  const bl = document.getElementById('sram-ag-liste');
  if (bl) {
    bl.addEventListener('mousedown', e => e.preventDefault());
    bl.addEventListener('click', () => {
      if (!window.confirm('Zur Auftragsliste wechseln?\n\nNicht gespeicherte Eingaben in diesem Auftrag gehen verloren.')) return;
      zurListe();
    });
  }
}

function starteSuche() {
  if (laeuft) return;
  laeuft = true;
  const b = document.getElementById('sram-ag-body');
  b.innerHTML = '<div style="color:#7A5B00;">Suche läuft …</div>';
  sucheAuftraege(res => {
    laeuft = false;
    if (res.fehler) {
      b.innerHTML = '<div style="color:#C62828;">' + esc(res.fehler) + '</div>' +
        '<div style="margin-top:8px;font-size:11px;color:#777;">Der Agent braucht die Auftragsliste ' +
        '(„Manage My Orders“). In einem geöffneten Auftrag kann er nicht suchen.</div>';
      return;
    }
    gefunden = res.zeilen;
    merke(KEY_LISTE, { treffer: res.treffer, zeilen: res.zeilen, zeit: Date.now() });
    zeigeListe(res.treffer);
  });
}

// Ein Schritt des Stapellaufs. Wird vom Takt aufgerufen und arbeitet die
// Warteschlange Auftrag fuer Auftrag ab.
function stapelSchritt() {
  const q = hole(KEY_SCHLANGE);
  if (!q || !q.aktiv) return false;
  if (stapelLaeuft) return true;

  // Fertig?
  if (q.index >= q.liste.length) {
    vergiss(KEY_SCHLANGE);
    stapelLaeuft = false;
    // Zurueck zur Liste, damit man das Ergebnis sieht
    if (!byIdSuffix(null, 'smartFilterBar')) { zurListe(); return true; }
    const l = hole(KEY_LISTE);
    if (l && l.zeilen) { gefunden = l.zeilen; zeigeListe(l.treffer); }
    return true;
  }

  const nr = String(q.liste[q.index]);
  zeigeStapelstand(q, nr);

  const offen = offenerAuftrag();
  if (!offen || offen.nr !== nr.replace(/^0+/, '')) {
    // Noch nicht beim richtigen Auftrag: hinwechseln und im naechsten Takt
    // weitermachen.
    try {
      window.top.location.hash = 'ServiceOrders-Create?Order=' + encodeURIComponent(nr) +
        '&sap-app-origin-hint=&/orderentry?editing=false';
    } catch (e) {}
    return true;
  }

  // Richtiger Auftrag ist geladen - auswerten
  stapelLaeuft = true;
  werteAus(nr, res => {
    if (!res.fehler && res.order) { try { geprueffteMerken(res.order, res); } catch (e) {} }
    const q2 = hole(KEY_SCHLANGE);
    if (q2) { q2.index = (q2.index || 0) + 1; merke(KEY_SCHLANGE, q2); }
    stapelLaeuft = false;
  });
  return true;
}

function zeigeStapelstand(q, nr) {
  const b = document.getElementById('sram-ag-body');
  if (!b) return;
  b.dataset.ansicht = 'stapel';
  const fertig = q.index, gesamt = q.liste.length;
  const anteil = Math.round(fertig / gesamt * 100);
  b.innerHTML =
    '<div style="font-weight:700;margin-bottom:6px;">Alle Aufträge werden geprüft</div>' +
    '<div style="color:#555;margin-bottom:8px;">' + fertig + ' von ' + gesamt + ' erledigt &middot; ' +
      'gerade: <b>' + esc(nr) + '</b></div>' +
    '<div style="height:8px;background:#EEE;border-radius:4px;overflow:hidden;margin-bottom:10px;">' +
      '<div style="height:100%;width:' + anteil + '%;background:#E31836;"></div></div>' +
    '<div style="font-size:10.5px;color:#888;margin-bottom:9px;">Der Agent springt dabei durch die ' +
      'Aufträge. Bitte nichts anderes im Portal tun, solange das läuft.</div>' +
    '<button id="sram-ag-stop" style="font-size:11px;padding:4px 10px;border:1px solid #E0B4B4;' +
      'background:#FFF6F6;color:#A02020;border-radius:3px;cursor:pointer;">Abbrechen</button>';
  const s = document.getElementById('sram-ag-stop');
  if (s) s.addEventListener('click', () => {
    vergiss(KEY_SCHLANGE); stapelLaeuft = false;
    const l = hole(KEY_LISTE);
    if (l && l.zeilen) { gefunden = l.zeilen; zeigeListe(l.treffer); } else zeigeStart();
  });
}

function zeigeListe(treffer) {
  const b = document.getElementById('sram-ag-body');
  if (!b) return;
  if (!gefunden.length) {
    b.innerHTML = '<div style="color:#1A7A45;">Keine Aufträge im Status COM gefunden. Nichts zu tun.</div>' +
      '<div style="margin-top:10px;"><button id="sram-ag-back">Zurück</button></div>';
    document.getElementById('sram-ag-back').addEventListener('click', zeigeStart);
    return;
  }
  b.dataset.ansicht = 'liste';
  const geprueft = geprueffteLesen();
  const schluessel = nr => String(nr).replace(/^0+/, '');

  // Ungepruefte zuerst - sonst arbeitet man sich immer wieder an denselben ab.
  // Innerhalb der Gruppen die aeltesten oben.
  const liste = [...gefunden].sort((x, y) => {
    const gx = geprueft[schluessel(x.order)] ? 1 : 0;
    const gy = geprueft[schluessel(y.order)] ? 1 : 0;
    if (gx !== gy) return gx - gy;
    return (y.tageVorlaeufig || 0) - (x.tageVorlaeufig || 0);
  });
  const offenAnzahl = liste.filter(z => !geprueft[schluessel(z.order)]).length;

  let h = '<div style="margin-bottom:8px;color:#555;">' + liste.length + ' von ' + treffer +
    ' Aufträgen geladen' +
    (liste.length - offenAnzahl ? ', davon <b>' + (liste.length - offenAnzahl) + ' bereits geprüft</b>' : '') +
    '. Die Werktage zählen <b>ab Anlage</b>, bis geprüft wurde – danach ab der letzten SRAM-Nachricht.</div>';

  // Sammelknopf nach OBEN: Bei ueber hundert Auftraegen muesste man sonst durch
  // die ganze Liste scrollen, um ihn zu finden.
  //
  // Dazu ein Vorfilter nach Alter. Begruendung: Von 132 offenen Auftraegen sind
  // die meisten frisch und brauchen keine Pruefung - interessant sind die alten.
  // Ohne Vorfilter laeuft der Stapel 18 Minuten, mit oft nur zwei.
  if (offenAnzahl) {
    const offene = liste.filter(z => !geprueft[schluessel(z.order)]);
    const ab = (n) => offene.filter(z => (z.tageVorlaeufig || 0) >= n).length;
    const stufen = [
      { n: FRIST_RUECKVERSAND, text: 'ab ' + FRIST_RUECKVERSAND + ' Werktagen', anzahl: ab(FRIST_RUECKVERSAND) },
      { n: FRIST_ERINNERUNG,   text: 'ab ' + FRIST_ERINNERUNG + ' Werktagen',   anzahl: ab(FRIST_ERINNERUNG) },
      { n: 0,                  text: 'alle',                                    anzahl: offene.length }
    ].filter((s, i, arr) => s.anzahl > 0 && (i === 0 || s.anzahl !== arr[i - 1].anzahl));

    h += '<div style="margin-bottom:10px;padding-bottom:9px;border-bottom:1px solid #E5E5E5;">' +
      '<div style="font-size:10.5px;color:#777;margin-bottom:5px;">Stapel prüfen – wie viele?</div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap;">';
    stufen.forEach((s, i) => {
      const dauer = Math.ceil(s.anzahl * 8 / 60);
      h += '<button class="sram-ag-alle" data-ab="' + s.n + '" style="font-size:11.5px;padding:7px 11px;' +
        'background:' + (i === 0 ? '#E31836' : '#FFFFFF') + ';color:' + (i === 0 ? '#fff' : '#454545') + ';' +
        'border:1px solid ' + (i === 0 ? '#E31836' : '#C7C7C7') + ';border-radius:4px;cursor:pointer;' +
        'font-weight:' + (i === 0 ? '700' : '400') + ';font-family:Arial,Helvetica,sans-serif;">' +
        s.anzahl + ' ' + s.text +
        '<span style="font-size:9.5px;opacity:.8;display:block;font-weight:400;">rund ' + dauer +
        ' Min.</span></button>';
    });
    h += '</div></div>';
  }

  liste.forEach(z => {
    const g = geprueft[schluessel(z.order)];
    const alt = g && g.tage != null ? g.tage : z.tageVorlaeufig;
    let farbe = alt >= FRIST_RUECKVERSAND ? '#C62828' : (alt >= FRIST_ERINNERUNG ? '#B4780D' : '#999');
    if (g) {
      // Geprueft: gruen, wenn nichts zu tun ist oder der Haendler geantwortet
      // hat. Sonst bleibt die Warnfarbe stehen - erledigt ist es ja nicht.
      if (g.stufe === 'nichtgeladen') farbe = '#B4780D';      // nicht gruen!
      else if (g.stufe === 'warten' || g.vonSram === false) farbe = '#1D9E75';
    }
    h += '<div class="sram-ag-karte" data-nr="' + esc(z.order) + '" style="border:1px solid ' +
         (g ? '#CFE8DA' : '#E5E5E5') + ';background:' + (g ? '#FBFEFC' : '#fff') + ';' +
         'border-left:3px solid ' + farbe + ';border-radius:4px;padding:7px 9px;margin-bottom:6px;">' +
      '<div style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;">' +
        '<b style="font-size:12.5px;">' + esc(z.order) + '</b>' +
        '<span style="color:' + farbe + ';font-size:11px;font-weight:700;">' + alt + ' Werktage</span>' +
        (g ? '<span style="background:' + farbe + ';color:#fff;font-size:9.5px;font-weight:700;padding:1px 5px;border-radius:3px;">' +
              (g.stufe === 'nichtgeladen' ? 'Korrespondenz nicht geladen'
               : g.stufe === 'rueck' ? 'Rückversand fällig'
               : g.stufe === 'erinnern' ? 'Erinnerung fällig'
               : g.vonSram === false ? 'Händler hat geantwortet'
               : g.stufe === 'unklar' ? 'unklar' : 'nichts zu tun') + '</span>' : '') +
        (z.neueNachricht ? '<span style="background:#1D9E75;color:#fff;font-size:9.5px;font-weight:700;padding:1px 5px;border-radius:3px;">neue Nachricht</span>' : '') +
        '<button class="sram-ag-pruef" data-nr="' + esc(z.order) + '" style="margin-left:auto;font-size:10.5px;' +
          'padding:3px 9px;border:1px solid #C7C7C7;background:#F7F7F7;border-radius:3px;cursor:pointer;">' +
          (g ? 'erneut prüfen' : 'Prüfen') + '</button>' +
      '</div>' +
      '<div style="color:#8A8A8A;font-size:10.5px;margin-top:2px;">' +
        esc(z.kunde) + (z.ref ? ' &middot; ' + esc(z.ref) : '') + ' &middot; angelegt ' + fmtDatum(z.angelegt) +
        (g && g.letzterSender ? ' &middot; zuletzt: <span style="white-space:nowrap;">' +
          esc(g.letzterSender) + '</span>' : '') +
      '</div>' +
      '<div class="sram-ag-detail" data-nr="' + esc(z.order) + '" style="display:none;margin-top:7px;"></div>' +
      '</div>';
  });
  h += '<div style="margin-top:10px;"><button id="sram-ag-back" style="font-size:11px;padding:4px 10px;' +
       'border:1px solid #C7C7C7;background:#F7F7F7;border-radius:3px;cursor:pointer;">Neue Suche</button></div>';
  b.innerHTML = h;

  b.querySelectorAll('.sram-ag-alle').forEach(alle => {
    alle.addEventListener('mousedown', e => e.preventDefault());
    alle.addEventListener('click', () => {
      const mindestAlter = parseInt(alle.getAttribute('data-ab') || '0', 10);
      const offene = liste
        .filter(z => !geprueft[schluessel(z.order)])
        .filter(z => (z.tageVorlaeufig || 0) >= mindestAlter)
        .map(z => z.order);
      if (!offene.length) return;
      const dauer = Math.ceil(offene.length * 8 / 60);
      let frage = 'Alle ' + offene.length + ' offenen Aufträge prüfen?\n\n' +
          'Der Agent springt nacheinander in jeden Auftrag und liest die Korrespondenz. ' +
          'Das dauert etwa ' + dauer + ' Minute(n), und das Portal wechselt dabei ständig die Ansicht.\n\n' +
          'Nicht gespeicherte Eingaben gehen verloren. Bitte währenddessen nichts anderes tun.';
      if (offene.length > 30) {
        frage += '\n\nACHTUNG: Das sind sehr viele. Der Browser ist währenddessen blockiert, ' +
          'und bei einem Abbruch bleibt nur der bis dahin erreichte Stand. Vielleicht erst einmal ' +
          'mit wenigen Aufträgen ausprobieren.';
      }
      if (!window.confirm(frage)) return;
      merke(KEY_SCHLANGE, { aktiv: true, index: 0, liste: offene });
      stapelSchritt();
    });
  });

  b.querySelectorAll('.sram-ag-pruef').forEach(btn => {
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', () => startefPruefung(btn.getAttribute('data-nr'), btn));
  });
  const zb = document.getElementById('sram-ag-back');
  if (zb) zb.addEventListener('click', zeigeStart);
}

// Den bereits geoeffneten Auftrag auswerten - ohne Seitenwechsel, deshalb
// bleibt das Panel stehen und das Ergebnis erscheint sofort.
function pruefeHier() {
  const a = offenerAuftrag();
  if (!a) return;
  const b = document.getElementById('sram-ag-body');
  if (b) b.innerHTML = '<div style="color:#7A5B00;">Korrespondenz wird gelesen …</div>';
  werteAus(a.nr, res => {
    try { sessionStorage.setItem('sramAgentPruefung', JSON.stringify(res)); } catch (e) {}
    zeigeGemerktePruefung();          // merkt das Ergebnis selbst
  });
}

function startefPruefung(nr, btn) {
  if (!window.confirm('Auftrag ' + nr + ' wird geöffnet, um die Korrespondenz zu lesen.\n\n' +
      'Nicht gespeicherte Eingaben im aktuell geöffneten Auftrag gehen dabei verloren.\n\nFortfahren?')) return;
  if (btn) { btn.textContent = 'öffnet …'; btn.disabled = true; }
  pruefeAuftrag(nr, res => {
    // Nach dem Wechsel ist das Panel weg - die Seite hat neu geladen.
    // Darum wird das Ergebnis zwischengespeichert und beim naechsten
    // Panel-Aufbau gezeigt.
    try { sessionStorage.setItem('sramAgentPruefung', JSON.stringify(res)); } catch (e) {}
    log('Prüfung', res);
  });
}

// Ergebnis einer Pruefung nach dem Auftragswechsel anzeigen
function zeigeGemerktePruefung() {
  let res = null;
  try {
    const roh = sessionStorage.getItem('sramAgentPruefung');
    if (roh) { res = JSON.parse(roh); sessionStorage.removeItem('sramAgentPruefung'); }
  } catch (e) {}
  if (!res) return false;

  // HIER wird das Ergebnis ins Gedaechtnis uebernommen, nicht im Rueckruf der
  // Pruefung.
  //
  // Grund: Beim Weg ueber die Liste wechselt die Seite, und das Portal baut
  // sich dabei neu auf. Der Rueckruf lief dann ins Leere - gespeichert wurde
  // nur die Zwischenablage, und die Liste zeigte nie eine gruene Markierung.
  // An dieser Stelle ist das Ergebnis dagegen sicher angekommen, egal ueber
  // welchen Weg.
  if (!res.fehler && res.order) {
    try { geprueffteMerken(res.order, res); } catch (e) {}
  }
  const b = document.getElementById('sram-ag-body');
  if (!b) return false;

  b.dataset.ansicht = 'ergebnis';
  if (res.fehler) {
    b.innerHTML = '<div style="color:#C62828;">' + esc(res.fehler) + '</div>';
    return true;
  }
  const l = res.letzte;
  const tage = res.tage;
  const stufe = tage == null ? null : (tage >= FRIST_RUECKVERSAND ? 'rueck' : (tage >= FRIST_ERINNERUNG ? 'erinnern' : 'warten'));

  let h = '<div style="font-weight:700;font-size:13px;margin-bottom:6px;">Auftrag ' + esc(res.order) + '</div>';
  h += '<div style="color:#555;margin-bottom:8px;">' + res.anzahl + ' Nachricht(en) &middot; Status ' + esc(res.status || '–') + '</div>';

  if (!l && res.korrNichtGeladen) {
    h += '<div style="background:#FFF8E1;border:1px solid #F0E3B0;border-radius:4px;padding:8px;">' +
         '<b>Korrespondenz nicht geladen.</b> Das Portal lädt die Nachrichten erst beim Öffnen des ' +
         'Abschnitts, und das ließ sich hier nicht auslösen. Ob Nachrichten vorhanden sind, ist ' +
         '<b>offen</b> – bitte den Reiter <b>CORRESPONDENCE</b> öffnen und erneut prüfen.</div>';
  } else if (!l) {
    h += '<div style="background:#FFF8E1;border:1px solid #F0E3B0;border-radius:4px;padding:8px;">' +
         'Keine Korrespondenz vorhanden. Ohne Nachricht lässt sich keine Frist berechnen.</div>';
  } else {
    // Verlauf anzeigen, juengste zuletzt - so liest es sich wie im Portal
    h += '<div style="background:#F7F7F7;border:1px solid #E5E5E5;border-radius:4px;padding:8px;margin-bottom:8px;max-height:200px;overflow-y:auto;">';
    (res.nachrichten || [l]).forEach((k, i, arr) => {
      const letzteZeile = (i === arr.length - 1);
      h += '<div style="' + (letzteZeile ? '' : 'opacity:.72;padding-bottom:6px;margin-bottom:6px;border-bottom:1px solid #E5E5E5;') + '">' +
        '<div style="font-size:10.5px;color:#777;margin-bottom:2px;"><b>' + esc(k.sender) + '</b> am ' + fmtDatum(k.zeit) + '</div>' +
        '<div style="white-space:pre-wrap;font-size:11.5px;">' + esc(k.text.slice(0, 500)) + '</div></div>';
    });
    h += '</div>';

    if (res.letzteVonSram === null) {
      // Absender nicht zuzuordnen - etwa weil die Kennung als Nummer
      // hinterlegt ist und der Name nicht verglichen werden kann.
      h += '<div style="background:#FFF8E1;border:1px solid #F0E3B0;border-radius:4px;padding:8px;">' +
        '<b>Absender nicht zuzuordnen.</b> Der Agent kann nicht erkennen, ob ' +
        esc(res.letzte.sender) + ' zu SRAM gehört' +
        (res.eigenerKurzname ? '' : ' – dafür müsste die Kennung als <b>Name</b> hinterlegt sein') +
        '. Bitte selbst entscheiden.</div>';
    } else if (res.letzteVonSram === false) {
      h += '<div style="background:#EDF7F1;border:1px solid #BFE3CD;border-radius:4px;padding:8px;color:#1A7A45;">' +
        '<b>' + esc(res.letzte.sender) + ' hat zuletzt geschrieben.</b> Sieht nach einer Antwort aus – ' +
        'bitte selbst entscheiden, wie es weitergeht. Der Agent schlägt hier nichts vor.</div>';
    } else {
      h += '<div style="color:#555;margin-bottom:8px;">Letzte Nachricht von SRAM, Frist läuft seit ' +
           fmtDatum(res.fristAb) + ' &middot; <b>' + (tage == null ? '–' : tage + ' Werktage</b>') + '</div>';
      if (stufe === 'warten') {
        h += '<div style="background:#F7F7F7;border:1px solid #E5E5E5;border-radius:4px;padding:8px;color:#666;">' +
          'Noch keine ' + FRIST_ERINNERUNG + ' Werktage vergangen. Nichts zu tun.</div>';
      }
      if (stufe === 'erinnern') {
        h += '<div style="background:#FFF8E1;border:1px solid #F0E3B0;border-radius:4px;padding:8px;">' +
          '<div style="font-weight:700;margin-bottom:4px;">Erinnerung fällig</div>' +
          '<div style="white-space:pre-wrap;font-size:11.5px;margin-bottom:7px;">' + esc(TEXT_ERINNERUNG) + '</div>' +
          '<button id="sram-ag-erinnern" style="font-size:11.5px;padding:6px 11px;background:#E31836;color:#fff;' +
            'border:none;border-radius:3px;cursor:pointer;font-weight:600;">Erinnerung vorbereiten</button></div>';
      }
      if (stufe === 'rueck') {
        h += '<div style="background:#FFF4F4;border:1px solid #E0B4B4;border-radius:4px;padding:8px;">' +
          '<div style="font-weight:700;margin-bottom:4px;color:#A02020;">Rückversand fällig (' + tage + ' Werktage)</div>' +
          '<div style="white-space:pre-wrap;font-size:11.5px;margin-bottom:7px;">' + esc(TEXT_RUECKVERSAND) + '</div>' +
          '<div style="font-size:10.5px;color:#777;margin-bottom:7px;">Setzt Header Note, Korrespondenz und Status <b>SBP</b>. ' +
            'SBP hebt den Versandblock auf – bitte vor dem Speichern prüfen.</div>' +
          '<button id="sram-ag-rueck" style="font-size:11.5px;padding:6px 11px;background:#A02020;color:#fff;' +
            'border:none;border-radius:3px;cursor:pointer;font-weight:600;">Rückversand vorbereiten</button></div>';
      }
    }
  }
  const liste = hole(KEY_LISTE);
  h += '<div style="margin-top:10px;display:flex;gap:6px;">' +
       (liste ? '<button id="sram-ag-zurliste" style="font-size:11px;padding:4px 10px;border:1px solid #C7C7C7;' +
         'background:#F7F7F7;border-radius:3px;cursor:pointer;">↩ Zurück zur Liste</button>' : '') +
       '<button id="sram-ag-back" style="font-size:11px;padding:4px 10px;' +
       'border:1px solid #C7C7C7;background:#F7F7F7;border-radius:3px;cursor:pointer;">Neue Suche</button></div>';
  b.innerHTML = h;

  const zl = document.getElementById('sram-ag-zurliste');
  if (zl) zl.addEventListener('click', () => {
    const l = hole(KEY_LISTE);
    if (!l) { zeigeStart(); return; }
    gefunden = l.zeilen || [];
    zeigeListe(l.treffer);
  });

  const e1 = document.getElementById('sram-ag-erinnern');
  if (e1) e1.addEventListener('click', () => tueErinnerung(res.order));
  const e2 = document.getElementById('sram-ag-rueck');
  if (e2) e2.addEventListener('click', () => tueRueckversand(res.order));
  const zb = document.getElementById('sram-ag-back');
  if (zb) zb.addEventListener('click', zeigeStart);
  return true;
}

function meldung(text, gut) {
  const b = document.getElementById('sram-ag-body');
  if (!b) return;
  const d = document.createElement('div');
  d.style.cssText = 'margin-top:9px;padding:8px;border-radius:4px;font-size:11.5px;' +
    (gut ? 'background:#EDF7F1;border:1px solid #BFE3CD;color:#1A7A45;'
         : 'background:#FFF4F4;border:1px solid #E0B4B4;color:#A02020;');
  d.textContent = text;
  b.appendChild(d);
}

function tueErinnerung(nr) {
  if (!window.confirm('Erinnerung für Auftrag ' + nr + ' vorbereiten?\n\n' +
      'Der Text wird in „Write Message“ eingetragen. Abschicken müssen Sie selbst mit „Ok“.')) return;
  korrespondenzSchreiben(TEXT_ERINNERUNG, r => meldung(r.text, r.ok));
}

function tueRueckversand(nr) {
  if (!window.confirm('Rückversand für Auftrag ' + nr + ' vorbereiten?\n\n' +
      'Es werden Header Note, Korrespondenz und Status SBP gesetzt.\n' +
      'SBP hebt den Versandblock auf – das Produkt geht dann unbearbeitet zurück.\n\n' +
      'Gespeichert wird NICHT automatisch. Fortfahren?')) return;

  const hn = headerNoteSchreiben(TEXT_RUECKVERSAND);
  meldung(hn.text, hn.ok);

  const st = statusSetzen(STATUS_SBP);
  meldung(st.text, st.ok);

  korrespondenzSchreiben(TEXT_RUECKVERSAND, r => {
    meldung(r.text, r.ok);
    meldung('Bitte alles prüfen und den Auftrag speichern.', true);
  });
}

// ── Start ────────────────────────────────────────────────────────────────
if (IS_TOP) {
  const start = () => {
    try {
      knopfAnlegen();
      positioniere();      // folgt dem Backup-Knopf, auch wenn Reset erscheint
      positionierePanel();  // weicht dem Sicherungs-Panel aus, wann immer es aufgeht

      // Laeuft ein Stapellauf? Der hat Vorrang vor allem anderen.
      const schlange = hole(KEY_SCHLANGE);
      if (schlange && schlange.aktiv) {
        if (!panel) bauePanel();
        stapelSchritt();
        return;
      }

      // Panel nach einem Seitenwechsel wieder aufbauen, wenn es vorher offen
      // war oder ein Prüfergebnis wartet.
      const wartet = !!hole('sramAgentPruefung');
      const warOffen = !!hole(KEY_OFFEN);
      if ((wartet || warOffen) && !panel) {
        bauePanel();
        // Ansicht wiederherstellen: erst ein wartendes Ergebnis, sonst die
        // zuletzt gesuchte Liste, sonst der Startbildschirm.
        if (!zeigeGemerktePruefung()) {
          const l = hole(KEY_LISTE);
          if (l && l.zeilen && l.zeilen.length) { gefunden = l.zeilen; zeigeListe(l.treffer); }
        }
      } else if (panel && wartet) {
        zeigeGemerktePruefung();
      } else if (panel) {
        // Startansicht neu zeichnen, wenn sich die Lage geaendert hat - etwa
        // weil die Auftragsliste inzwischen geladen ist. Andere Ansichten
        // (Liste, Pruefergebnis) bleiben unberuehrt.
        const b = document.getElementById('sram-ag-body');
        if (b && b.dataset.ansicht === 'start') {
          const listeDa = !!byIdSuffix(null, 'smartFilterBar');
          const a = offenerAuftrag();
          const lage = (listeDa ? 'L' : '-') + (a ? 'A' + a.nr + ':' + a.korrespondenz : '-');
          if (b.dataset.lage !== lage) zeigeStart();
        }
      }
    } catch (e) { log('UI-Fehler:', e); }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  setInterval(start, 1500);
  window.addEventListener('hashchange', () => setTimeout(start, 900));
  log('geladen · SRAM Service Agent lite (Beta) v' + VERSION);
}

})();

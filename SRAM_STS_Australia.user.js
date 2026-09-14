// ==UserScript==
// @name         SRAM Service Texts AUS V3
// @namespace    https://sram.com
// @version      3.2
// @description  Text Assistant for the SRAM B2B Service Portal – Australia
// @author       SRAM STS Australia
// @match        https://sramllcprodcf.cpp.cfapps.us10.hana.ondemand.com/*
// @match        https://b2b.sram.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/cteuschler/sram-lieferschein-texte/main/SRAM_STS_Australia.user.js
// @downloadURL  https://raw.githubusercontent.com/cteuschler/sram-lieferschein-texte/main/SRAM_STS_Australia.user.js
// @all-frames   true
// ==/UserScript==

(function() {
'use strict';

const DATA = {"Fork":[{"id":"Fork_0_1","heading":"200hr Service","body":"200hr service completed in full. Fork tested OK.","full":"200hr Service\n200hr service completed in full. Fork tested OK.","type":"Service Notes"},{"id":"Fork_0_2","heading":"Lower Leg Service","body":"Lower legs serviced with new dust wiper seals. Fork Tested OK.","full":"Lower Leg Service\nLower legs serviced with new dust wiper seals. Fork Tested OK.","type":"Service Notes"},{"id":"Fork_0_3","heading":"Replaced at cost of repair","body":"Fork replaced at cost of repair.","full":"Replaced at cost of repair\nFork replaced at cost of repair.","type":"Service Notes"},{"id":"Fork_0_4","heading":"LSC Only – Explained","body":"Hey Team, please note that this fork has LSC only. This will not make the fork feel \"firmer\". It will only slow the movement of the fork in low-speed compression events. This can be in circumstances such as brake dive, moving body fore / aft on bike.","full":"LSC Only – Explained\nHey Team, please note that this fork has LSC only. This will not make the fork feel \"firmer\". It will only slow the movement of the fork in low-speed compression events. This can be in circumstances such as brake dive, moving body fore / aft on bike.","type":"Service Notes"},{"id":"Fork_0_5","heading":"No Issue Found","body":"Hey Team, this fork has been tested to be functioning as intended with no issue found. Fork returned as is.","full":"No Issue Found\nHey Team, this fork has been tested to be functioning as intended with no issue found. Fork returned as is.","type":"Service Notes"},{"id":"Fork_0_6","heading":"Bushing Play – No Defect","body":"Hey Team, these bushings were checked for excessive play. No defect could be identified. Correct bushing clearance is essential to ensure proper fork function during riding. Fork returned as is.","full":"Bushing Play – No Defect\nHey Team, these bushings were checked for excessive play. No defect could be identified. Correct bushing clearance is essential to ensure proper fork function during riding. Fork returned as is.","type":"Service Notes"},{"id":"Fork_0_7","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"Fork_1_1","heading":"Creaky CSU + Impact Damage","body":"Hey Team, this CSU will be replaced under warranty. However, there is external impact damage to the upper tube that has torn the lower leg bushes and then caused additional wear at the point of damage. If the CSU is replaced without replacing the lower leg assembly, the new CSU will be prematurely worn due to the torn lower leg bushes. We can replace the LL for an additional $XXX, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Creaky CSU + Impact Damage\nHey Team, this CSU will be replaced under warranty. However, there is external impact damage to the upper tube that has torn the lower leg bushes and then caused additional wear at the point of damage. If the CSU is replaced without replacing the lower leg assembly, the new CSU will be prematurely worn due to the torn lower leg bushes. We can replace the LL for an additional $XXX, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_2","heading":"CSU Impact Damage","body":"Hi Team, this fork has damage to the upper tubes that has been caused by an external impact, this has then torn the lower leg bushing as it has passed over the damage, which has then caused excess wear to the upper tube. The CSU and Lower leg assembly require replacement, as the damage will result in loss of performance, leakage of lubricating oil over time, allow contaminants to enter the lower legs, shorter time between service intervals and continual wear at the point of damage. We can replace the CSU & LL for $XXX, please let us know via the correspondence how you would like to proceed. Thanks!","full":"CSU Impact Damage\nHi Team, this fork has damage to the upper tubes that has been caused by an external impact, this has then torn the lower leg bushing as it has passed over the damage, which has then caused excess wear to the upper tube. The CSU and Lower leg assembly require replacement, as the damage will result in loss of performance, leakage of lubricating oil over time, allow contaminants to enter the lower legs, shorter time between service intervals and continual wear at the point of damage. We can replace the CSU & LL for $XXX, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_3","heading":"CSU / LL Damage + Service (or Service Only)","body":"Hi Team, this fork has damage to the upper tubes that has been caused by an external impact, this has then torn the lower leg bushing as it has passed over the damage, which has then caused excess wear to the upper tube. The CSU and Lower leg assembly require replacement, as the damage will result in loss of performance, leakage of lubricating oil over time, allow contaminants to enter the lower legs, shorter time between service intervals and continual wear at the point of damage. We can replace the CSU, LL and service this fork for $XXX. Alternatively, we can just service this fork without replacing these parts, with the understanding that the damage will worsen over time and lead to an ongoing decrease in performance. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"CSU / LL Damage + Service (or Service Only)\nHi Team, this fork has damage to the upper tubes that has been caused by an external impact, this has then torn the lower leg bushing as it has passed over the damage, which has then caused excess wear to the upper tube. The CSU and Lower leg assembly require replacement, as the damage will result in loss of performance, leakage of lubricating oil over time, allow contaminants to enter the lower legs, shorter time between service intervals and continual wear at the point of damage. We can replace the CSU, LL and service this fork for $XXX. Alternatively, we can just service this fork without replacing these parts, with the understanding that the damage will worsen over time and lead to an ongoing decrease in performance. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_4","heading":"Service + Extra Parts","body":"Hey Team, this fork has damage to the XXXX shaft. We can supply a replacement XXXX and service this fork in full for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Service + Extra Parts\nHey Team, this fork has damage to the XXXX shaft. We can supply a replacement XXXX and service this fork in full for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_5","heading":"CSU – Out of Stock ETA","body":"Hey Team, we are currently sold out of replacement CSUs and do not have a solid ETA. Please hold off on returning the fork unless you are happy for the fork to wait at STS until the parts become available. We will contact you when stock arrives.","full":"CSU – Out of Stock ETA\nHey Team, we are currently sold out of replacement CSUs and do not have a solid ETA. Please hold off on returning the fork unless you are happy for the fork to wait at STS until the parts become available. We will contact you when stock arrives.","type":"Quote"},{"id":"Fork_1_6","heading":"Damper Shaft Wear","body":"Hey Team, this fork has wear forming on the damper shaft. This will result in oil loss during use and inconsistent damper performance. We can replace the damper for $XXX. Please let us know via the correspondence with how you would like to proceed.","full":"Damper Shaft Wear\nHey Team, this fork has wear forming on the damper shaft. This will result in oil loss during use and inconsistent damper performance. We can replace the damper for $XXX. Please let us know via the correspondence with how you would like to proceed.","type":"Quote"},{"id":"Fork_1_7","heading":"Replacement Fork","body":"Hey Team, this fork is damaged beyond repair. We can replace this fork with a XXXX for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Replacement Fork\nHey Team, this fork is damaged beyond repair. We can replace this fork with a XXXX for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_8","heading":"Damaged Brake Mount","body":"Hey Team, the brake mount thread in the lower leg is damaged. This is not a manufacturing defect, but the result of external force or incorrect installation. If bolts with insufficient thread engagement are used, the brake can come loose, and the threads may be damaged. Excessive torque can also damage the fork. Excessive torque combined with rotational shear forces can cause the brake mount to break. These lower legs require replacement, we can replace these LL for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Brake Mount\nHey Team, the brake mount thread in the lower leg is damaged. This is not a manufacturing defect, but the result of external force or incorrect installation. If bolts with insufficient thread engagement are used, the brake can come loose, and the threads may be damaged. Excessive torque can also damage the fork. Excessive torque combined with rotational shear forces can cause the brake mount to break. These lower legs require replacement, we can replace these LL for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_9","heading":"CSU – OOS Alternative Option","body":"This CSU will be replaced at no charge. Although we are currently out of stock of a direct replacement, we can replace this CSU with a compatible CSU that matches all specs except it will have a 63od crown (currently 59od). This is purely a visual / aesthetic change and will not affect ride characteristics. Please let us know how you would like to proceed. Thanks!","full":"CSU – OOS Alternative Option\nThis CSU will be replaced at no charge. Although we are currently out of stock of a direct replacement, we can replace this CSU with a compatible CSU that matches all specs except it will have a 63od crown (currently 59od). This is purely a visual / aesthetic change and will not affect ride characteristics. Please let us know how you would like to proceed. Thanks!","type":"Quote"}],"Rear Shock":[{"id":"RearShock_0_1","heading":"200hr Service","body":"200hr service completed in full. Shock tested OK.","full":"200hr Service\n200hr service completed in full. Shock tested OK.","type":"Service Notes"},{"id":"RearShock_0_2","heading":"200hr Service + New Damper Body","body":"200hr service completed in full with new damper body. Shock tested and all functions working as intended.","full":"200hr Service + New Damper Body\n200hr service completed in full with new damper body. Shock tested and all functions working as intended.","type":"Service Notes"},{"id":"RearShock_0_3","heading":"Replaced at Cost of Service","body":"Shock replaced at cost of service.","full":"Replaced at Cost of Service\nShock replaced at cost of service.","type":"Service Notes"},{"id":"RearShock_0_4","heading":"\"Leaking Oil\" on Damper Body","body":"Hey Team, suspension oil may appear on the damper body during or after use. This is normal lubrication necessary to the performance of the shock and is not a sign of decreased performance. Wipe off extra oil on the damper body or damper shaft to keep the system clean and perform regular service to ensure adequate lubrication oil remains in the system. Please let us know if you have any questions.","full":"\"Leaking Oil\" on Damper Body\nHey Team, suspension oil may appear on the damper body during or after use. This is normal lubrication necessary to the performance of the shock and is not a sign of decreased performance. Wipe off extra oil on the damper body or damper shaft to keep the system clean and perform regular service to ensure adequate lubrication oil remains in the system. Please let us know if you have any questions.","type":"Service Notes"},{"id":"RearShock_0_5","heading":"\"Leaking Oil\" on Damper Body – FOC Air Can Service","body":"Shock tested to be working as intended with no damper oil loss. FOC air can service performed as goodwill. Please note, suspension oil may appear on the damper body during or after use. This is normal lubrication necessary to the performance of the shock and is not a sign of decreased performance. Wipe off extra oil on the damper body or damper shaft to keep the system clean and perform regular service to ensure adequate lubrication oil remains in the system. Please let us know if you have any questions.","full":"\"Leaking Oil\" on Damper Body – FOC Air Can Service\nShock tested to be working as intended with no damper oil loss. FOC air can service performed as goodwill. Please note, suspension oil may appear on the damper body during or after use. This is normal lubrication necessary to the performance of the shock and is not a sign of decreased performance. Wipe off extra oil on the damper body or damper shaft to keep the system clean and perform regular service to ensure adequate lubrication oil remains in the system. Please let us know if you have any questions.","type":"Service Notes"},{"id":"RearShock_0_6","heading":"No Issue Found","body":"Hey Team, this shock has been tested to be functioning as intended with no issue found. Shock returned as is.","full":"No Issue Found\nHey Team, this shock has been tested to be functioning as intended with no issue found. Shock returned as is.","type":"Service Notes"},{"id":"RearShock_0_7","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"RearShock_1_1","heading":"Air Leak – External Impact","body":"Hey Team, this shock has been tested to be free from air loss whilst static, however there is damage to the damper body that is a result of an external impact and will allow air to leak from the shock as it is cycled through its travel.\nThis shock will require a full service to replace the damaged damper body. We can service and repair this shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Air Leak – External Impact\nHey Team, this shock has been tested to be free from air loss whilst static, however there is damage to the damper body that is a result of an external impact and will allow air to leak from the shock as it is cycled through its travel.\nThis shock will require a full service to replace the damaged damper body. We can service and repair this shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_2","heading":"Damaged Damper Shaft (Coil)","body":"Hey Team, this shock has damage to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Damper Shaft (Coil)\nHey Team, this shock has damage to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_3","heading":"Damaged Damper Body and Shaft","body":"Hey Team, this shock has damage to the damper body that has been caused by an external impact, this will allow air to escape as the shock is cycled. Additionally, this shock has been excessively bottomed out, which has damaged the bottom out bumper and allowed the bottom out plate to freely move along the damper shaft. This has caused damage to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Damper Body and Shaft\nHey Team, this shock has damage to the damper body that has been caused by an external impact, this will allow air to escape as the shock is cycled. Additionally, this shock has been excessively bottomed out, which has damaged the bottom out bumper and allowed the bottom out plate to freely move along the damper shaft. This has caused damage to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_4","heading":"Worn Damper Body and Shaft","body":"Hey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. There is also wear to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Worn Damper Body and Shaft\nHey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. There is also wear to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_5","heading":"Worn Damper Body and Air Can","body":"Hey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Worn Damper Body and Air Can\nHey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_6","heading":"Worn Damper Body, Shaft and Air Can","body":"Hey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. There is also wear to the damper shaft which will allow air to enter the system and oil to escape. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Worn Damper Body, Shaft and Air Can\nHey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. There is also wear to the damper shaft which will allow air to enter the system and oil to escape. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_7","heading":"Damaged Damper Body, Shaft and Worn Air Can","body":"Hey Team, this shock has damage to the damper body from external impacts, this will allow air to escape as the shock is cycled. There is also damage to the damper shaft which will allow air to enter the system and oil to escape. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Damper Body, Shaft and Worn Air Can\nHey Team, this shock has damage to the damper body from external impacts, this will allow air to escape as the shock is cycled. There is also damage to the damper shaft which will allow air to enter the system and oil to escape. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_8","heading":"Damaged Beyond Repair","body":"Hey Team, unfortunately, this shock is damaged beyond repair. We can supply a replacement shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Beyond Repair\nHey Team, unfortunately, this shock is damaged beyond repair. We can supply a replacement shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_9","heading":"Incorrect Grease","body":"Hey Team, this shock shows signs of being serviced with the incorrect grease, and/or not enough grease and lubricating fluid in the air can. There are deposits of the incorrect grease in the air can assembly. If the incorrect grease is used, the heat from the shock causes the grease to liquify and weep through the main seal, causing the air can to be depleted of grease and lubrication, then leading to premature wear to the dynamic surfaces. This shock has wear forming to the damper body and will require the damper body to be replaced. We can service and repair this shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Incorrect Grease\nHey Team, this shock shows signs of being serviced with the incorrect grease, and/or not enough grease and lubricating fluid in the air can. There are deposits of the incorrect grease in the air can assembly. If the incorrect grease is used, the heat from the shock causes the grease to liquify and weep through the main seal, causing the air can to be depleted of grease and lubrication, then leading to premature wear to the dynamic surfaces. This shock has wear forming to the damper body and will require the damper body to be replaced. We can service and repair this shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"}],"Reverb Seatpost":[{"id":"Reverb_0_1","heading":"600hr Service","body":"600hr service completed in full. Reverb tested OK.","full":"600hr Service\n600hr service completed in full. Reverb tested OK.","type":"Service Notes"},{"id":"Reverb_0_2","heading":"Replaced at Cost of Service","body":"Reverb replaced at cost of service.","full":"Replaced at Cost of Service\nReverb replaced at cost of service.","type":"Service Notes"},{"id":"Reverb_0_3","heading":"B1 AXS Clicking – Cleaned","body":"Cleaned and re-lubricated wiper seal / bushing at no charge as a goodwill gesture.\nPlease note, this seatpost may make an audible noise upon direction change, this is not a cause for concern. Regular maintenance as per the service intervals will help reduce this noise.","full":"B1 AXS Clicking – Cleaned\nCleaned and re-lubricated wiper seal / bushing at no charge as a goodwill gesture.\nPlease note, this seatpost may make an audible noise upon direction change, this is not a cause for concern. Regular maintenance as per the service intervals will help reduce this noise.","type":"Service Notes"},{"id":"Reverb_0_4","heading":"No Issue Found","body":"Hey Team, This Reverb has been tested to be working as intended with no manufacturing defect present. Reverb returned as is.","full":"No Issue Found\nHey Team, This Reverb has been tested to be working as intended with no manufacturing defect present. Reverb returned as is.","type":"Service Notes"},{"id":"Reverb_0_5","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"Reverb_1_1","heading":"Loose Collar – A Series AXS","body":"Hey Team, this seatpost has been ridden with a loose wiper collar, which has damaged the upper post. The upper post is not a spare part and therefore the seatpost requires replacement. We can supply a replacement seatpost for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Loose Collar – A Series AXS\nHey Team, this seatpost has been ridden with a loose wiper collar, which has damaged the upper post. The upper post is not a spare part and therefore the seatpost requires replacement. We can supply a replacement seatpost for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Reverb_1_2","heading":"Loose Collar – Stealth (AXS Replacement)","body":"Hey Team, this seatpost has been ridden with a loose wiper collar, which has damaged the upper post. The upper post is not a spare part and therefore the seatpost requires replacement. We no longer carry the Reverb Stealth seatpost. We can supply a replacement Reverb AXS B1 seatpost and POD controller for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!\n\nSRR311       00.3018.405.004    E AM EC AXS POD D1 W/CLAMP (L/R)","full":"Loose Collar – Stealth (AXS Replacement)\nHey Team, this seatpost has been ridden with a loose wiper collar, which has damaged the upper post. The upper post is not a spare part and therefore the seatpost requires replacement. We no longer carry the Reverb Stealth seatpost. We can supply a replacement Reverb AXS B1 seatpost and POD controller for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!\n\nSRR311       00.3018.405.004    E AM EC AXS POD D1 W/CLAMP (L/R)","type":"Quote"},{"id":"Reverb_1_3","heading":"B1 AXS Upper Post Damage","body":"Hey Team, this seatpost has damage to the upper post. We do not hold the upper posts for the B1 Reverb AXS. We can supply a replacement seatpost at the cost of service and required parts for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!\nRAP 50= $220+\nRAP 25= $240+","full":"B1 AXS Upper Post Damage\nHey Team, this seatpost has damage to the upper post. We do not hold the upper posts for the B1 Reverb AXS. We can supply a replacement seatpost at the cost of service and required parts for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!\nRAP 50= $220+\nRAP 25= $240+","type":"Quote"},{"id":"Reverb_1_4","heading":"Reverb Squish / Active Ride","body":"Hey Team, when the Reverb is not at full top out, the reverb is in \"ActiveRide\". This technology provides slight, built-in compliance/suspension when the seat is partially dropped. This is a feature of this Reverb and not a cause for concern.","full":"Reverb Squish / Active Ride\nHey Team, when the Reverb is not at full top out, the reverb is in \"ActiveRide\". This technology provides slight, built-in compliance/suspension when the seat is partially dropped. This is a feature of this Reverb and not a cause for concern.","type":"Quote"},{"id":"Reverb_1_5","heading":"Bent Upper Post","body":"Hey Team, the upper post of this Reverb has been bent. We are unable to service or repair this post, we can offer a replacement Reverb AXS B1 for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Bent Upper Post\nHey Team, the upper post of this Reverb has been bent. We are unable to service or repair this post, we can offer a replacement Reverb AXS B1 for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Reverb_1_6","heading":"Serviced with Wrong Grease/Oil – AXS Replacement","body":"Hey Team, This Reverb has been serviced elsewhere with the incorrect grease/oil. There has been an extreme oil bypass and we therefore cannot reliably service this Reverb. As a gesture of goodwill, we can replace this reverb with a Reverb AXS B2 with a POD remote for $575+gst. Alternatively, we can return this Reverb as is. Please let us know via the correspondence how you would like to proceed. Thanks!\n\nSRR311       00.3018.405.004    E AM EC AXS POD D1 W/CLAMP (L/R)","full":"Serviced with Wrong Grease/Oil – AXS Replacement\nHey Team, This Reverb has been serviced elsewhere with the incorrect grease/oil. There has been an extreme oil bypass and we therefore cannot reliably service this Reverb. As a gesture of goodwill, we can replace this reverb with a Reverb AXS B2 with a POD remote for $575+gst. Alternatively, we can return this Reverb as is. Please let us know via the correspondence how you would like to proceed. Thanks!\n\nSRR311       00.3018.405.004    E AM EC AXS POD D1 W/CLAMP (L/R)","type":"Quote"}],"Drivetrain":[{"id":"Drivetrain_0_1","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"Drivetrain_0_2","heading":"No Issue Found – Derailleur","body":"Hey Team, This derailleur has been tested to be working as intended with no manufacturing defect present. We have returned this as is.","full":"No Issue Found – Derailleur\nHey Team, This derailleur has been tested to be working as intended with no manufacturing defect present. We have returned this as is.","type":"Service Notes"},{"id":"Drivetrain_0_3","heading":"No Issue Found – Cassette","body":"Hey Team, This cassette has been tested to be functioning as intended. We have been unable to replicate the fault described. This cassette has been returned as is.","full":"No Issue Found – Cassette\nHey Team, This cassette has been tested to be functioning as intended. We have been unable to replicate the fault described. This cassette has been returned as is.","type":"Service Notes"},{"id":"Drivetrain_1_1","heading":"FD/RD Requires Replacement","body":"Hey Team, this derailleur requires replacement. We can supply a replacement derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"FD/RD Requires Replacement\nHey Team, this derailleur requires replacement. We can supply a replacement derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_2","heading":"FD/RD Electronics Not Repairable / Replaceable","body":"Hey Team, the electronics in this derailleur are not repairable / replaceable. We can replace this derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"FD/RD Electronics Not Repairable / Replaceable\nHey Team, the electronics in this derailleur are not repairable / replaceable. We can replace this derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_3","heading":"FD/RD Damaged Beyond Repair","body":"Hey Team, this derailleur is damaged beyond repair and as such requires replacement. We can replace this derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"FD/RD Damaged Beyond Repair\nHey Team, this derailleur is damaged beyond repair and as such requires replacement. We can replace this derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_4","heading":"GXP Discontinued","body":"Hey Team, unfortunately this unit is beyond repair. GXP and BB30 spiders have been discontinued, and the only option would be a complete DUB system. Please use the documents below to find the part numbers of a suitable replacement. Please reply with the part numbers for all parts you require and we will check availability and price up a crash replacement deal.\nhttps://sram-riderexperience.typeform.com/to/N6p3v4Uf?typeform-source=www.sram.com\nhttps://www.sram.com/globalassets/document-hierarchy/compatibility-map/road/dub-choose-a-road-bottom-bracket-compatibility-map.pdf","full":"GXP Discontinued\nHey Team, unfortunately this unit is beyond repair. GXP and BB30 spiders have been discontinued, and the only option would be a complete DUB system. Please use the documents below to find the part numbers of a suitable replacement. Please reply with the part numbers for all parts you require and we will check availability and price up a crash replacement deal.\nhttps://sram-riderexperience.typeform.com/to/N6p3v4Uf?typeform-source=www.sram.com\nhttps://www.sram.com/globalassets/document-hierarchy/compatibility-map/road/dub-choose-a-road-bottom-bracket-compatibility-map.pdf","type":"Quote"},{"id":"Drivetrain_1_5","heading":"Chain Drop Damage – Power Meter","body":"Hey Team, this Power Meter shows signs of external impact. This damage has resulted in damage to the strain gauges which are built into the chainring spider. As such, the power meter requires replacement. We can replace this Power Meter for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Chain Drop Damage – Power Meter\nHey Team, this Power Meter shows signs of external impact. This damage has resulted in damage to the strain gauges which are built into the chainring spider. As such, the power meter requires replacement. We can replace this Power Meter for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_6","heading":"Crank Pedal Thread Stripped","body":"Hey Team, this damage has been the result of the bike being ridden whilst the pedals were loose in the crank. As a result, this is not a manufacturing defect. We can replace this crankset for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Crank Pedal Thread Stripped\nHey Team, this damage has been the result of the bike being ridden whilst the pedals were loose in the crank. As a result, this is not a manufacturing defect. We can replace this crankset for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_7","heading":".fit File Request","body":"Hey Team, can you please upload a .fit file for this power meter? This can be found in the ride data recorded by the head unit or app used to record the ride. If you're unsure how to export this data, search in Google \"How to get .fit file from power meter\" and locate the info for your head unit / app. Please send us a message via the correspondence when this has been uploaded. Thanks!","full":".fit File Request\nHey Team, can you please upload a .fit file for this power meter? This can be found in the ride data recorded by the head unit or app used to record the ride. If you're unsure how to export this data, search in Google \"How to get .fit file from power meter\" and locate the info for your head unit / app. Please send us a message via the correspondence when this has been uploaded. Thanks!","type":"Quote"},{"id":"Drivetrain_1_8","heading":"Trade-In – Power Meter / Chainring","body":"Hey Team, we can replace this power meter / chainring unit for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Trade-In – Power Meter / Chainring\nHey Team, we can replace this power meter / chainring unit for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_9","heading":"E-Bike Cassette Wear","body":"Hey Team, this cassette shows significant wear in the lower gear range, while the upper range is nearly unused. For improved service life, we recommend using as much of the cassette's gear range as possible and adjusting the front chainring size accordingly. As a gesture of goodwill, we can replace this cassette, as a once off, for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"E-Bike Cassette Wear\nHey Team, this cassette shows significant wear in the lower gear range, while the upper range is nearly unused. For improved service life, we recommend using as much of the cassette's gear range as possible and adjusting the front chainring size accordingly. As a gesture of goodwill, we can replace this cassette, as a once off, for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"}],"Brakes":[{"id":"Brakes_0_1","heading":"Battery Contacts Damaged – Fixed","body":"Battery contacts were found to be damaged due to incorrect orientation of the battery cover during installation. Re-aligned battery contacts, tested to be functioning as intended.","full":"Battery Contacts Damaged – Fixed\nBattery contacts were found to be damaged due to incorrect orientation of the battery cover during installation. Re-aligned battery contacts, tested to be functioning as intended.","type":"Service Notes"},{"id":"Brakes_0_2","heading":"Leaking at Caliper Halves – Normal","body":"Hey Team, It is normal for these brakes to show residual oil left over from the caliper assembly process and is unlikely to be leaking from the brake system.\nWhen the lever is pulled, the caliper halves will flex, causing any residual assembly oil/grease on the exterior of the caliper seals to appear at the seam. This is not a cause for concern.\nIf the brake is not experiencing any loss of performance, please wipe away this residual oil with a clean shop towel and continue with the installation process as per the user manual.","full":"Leaking at Caliper Halves – Normal\nHey Team, It is normal for these brakes to show residual oil left over from the caliper assembly process and is unlikely to be leaking from the brake system.\nWhen the lever is pulled, the caliper halves will flex, causing any residual assembly oil/grease on the exterior of the caliper seals to appear at the seam. This is not a cause for concern.\nIf the brake is not experiencing any loss of performance, please wipe away this residual oil with a clean shop towel and continue with the installation process as per the user manual.","type":"Service Notes"},{"id":"Brakes_0_3","heading":"Check If Maven Lever Is Leaking Before Returning","body":"Hey Team, this has been approved for return. However, there is a quick way to check if the lever is actually leaking fluid, before returning the lever to us.\n\nTo determine whether there is a recurring oil leak, advise the customer as follows:\n\n1. Tighten the compression nut to 8 Nm if the oily area is near the compression fitting\n2. Clean the brake thoroughly with isopropyl alcohol\n3. Set the lever reach fully outward (note the number of clicks or measure the original reach)\n4. With the bike in a work stand, pull the lever firmly with two fingers for 2–3 seconds, up to 5 times (Do not pull the lever fully to the handlebar)\n5. Clean the brake again with isopropyl alcohol\n6. Repeat step 4\n\nIf oil is still leaking, please get this lever returned to us. If you are in doubt, please do not hesitate in getting this one back to us for assessment.\n\nThanks!","full":"Check If Maven Lever Is Leaking Before Returning\nHey Team, this has been approved for return. However, there is a quick way to check if the lever is actually leaking fluid, before returning the lever to us.\n\nTo determine whether there is a recurring oil leak, advise the customer as follows:\n\n1. Tighten the compression nut to 8 Nm if the oily area is near the compression fitting\n2. Clean the brake thoroughly with isopropyl alcohol\n3. Set the lever reach fully outward (note the number of clicks or measure the original reach)\n4. With the bike in a work stand, pull the lever firmly with two fingers for 2–3 seconds, up to 5 times (Do not pull the lever fully to the handlebar)\n5. Clean the brake again with isopropyl alcohol\n6. Repeat step 4\n\nIf oil is still leaking, please get this lever returned to us. If you are in doubt, please do not hesitate in getting this one back to us for assessment.\n\nThanks!","type":"Service Notes"},{"id":"Brakes_0_4","heading":"Brake Tested OK – Loose Compression Nut","body":"Hey Team, we have tested this brake system to be working as intended and free from manufacturing defect. However, the compression nut was loose which will lead to inconsistent performance. Please note the compression nuts need to be torqued to 8Nm. Brake returned as is.","full":"Brake Tested OK – Loose Compression Nut\nHey Team, we have tested this brake system to be working as intended and free from manufacturing defect. However, the compression nut was loose which will lead to inconsistent performance. Please note the compression nuts need to be torqued to 8Nm. Brake returned as is.","type":"Service Notes"},{"id":"Brakes_0_5","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"Brakes_1_1","heading":"Guide / Level Paid Replacement","body":"Hey Team, we are no longer able to offer support on early model Guide / Level brakes. Please return the levers only if you would like to proceed with a charged replacement of the levers, noting that levers will only be replaced with the same level of brake only. Please see the pricing below:\nGuide R / Level T - G2 R @$40+\nGuide RS / Level TL - G2 RS @$50+\nGuide RSC / Level TLM - G2 RSC @$60+\nGuide ULT / Level UL - G2 ULT @$85+","full":"Guide / Level Paid Replacement\nHey Team, we are no longer able to offer support on early model Guide / Level brakes. Please return the levers only if you would like to proceed with a charged replacement of the levers, noting that levers will only be replaced with the same level of brake only. Please see the pricing below:\nGuide R / Level T - G2 R @$40+\nGuide RS / Level TL - G2 RS @$50+\nGuide RSC / Level TLM - G2 RSC @$60+\nGuide ULT / Level UL - G2 ULT @$85+","type":"Quote"},{"id":"Brakes_1_2","heading":"Contaminated Brake System","body":"Hey Team, this brake has been contaminated due to being bled with the incorrect fluid, causing the seals to swell and as a result could potentially lead to brake failure. This issue is not related to a manufacturing defect and has occurred post-factory release. The entire brake system (lever, line, and caliper) needs to be replaced. We also recommend checking the other brake to ensure it hasn't been bled with the incorrect fluid as well. If it has, we will need this complete brake returned before we can supply a replacement. Upon return of the complete brake, we can replace this complete brake for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Contaminated Brake System\nHey Team, this brake has been contaminated due to being bled with the incorrect fluid, causing the seals to swell and as a result could potentially lead to brake failure. This issue is not related to a manufacturing defect and has occurred post-factory release. The entire brake system (lever, line, and caliper) needs to be replaced. We also recommend checking the other brake to ensure it hasn't been bled with the incorrect fluid as well. If it has, we will need this complete brake returned before we can supply a replacement. Upon return of the complete brake, we can replace this complete brake for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Brakes_1_3","heading":"Battery Contacts Damaged – SBL","body":"Hey Team, the battery contacts in this SBL have been damaged due to incorrect fitment of the battery. We can replace the Lever Assembly / Electronics Pod for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Battery Contacts Damaged – SBL\nHey Team, the battery contacts in this SBL have been damaged due to incorrect fitment of the battery. We can replace the Lever Assembly / Electronics Pod for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Brakes_1_4","heading":"Stripped Bleed Port – Caliper","body":"Hey Team, the bleed port in this caliper has been stripped due to being installed beyond its limit. This is not a manufacturing defect. We can replace this caliper for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Stripped Bleed Port – Caliper\nHey Team, the bleed port in this caliper has been stripped due to being installed beyond its limit. This is not a manufacturing defect. We can replace this caliper for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Brakes_1_5","heading":"Lever Body Cracked – Overtorqued","body":"Hey Team, thanks for getting this order back to us. The lever body has cracked due to being overtorqued. This is not a manufacturing defect. We can replace this lever for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Lever Body Cracked – Overtorqued\nHey Team, thanks for getting this order back to us. The lever body has cracked due to being overtorqued. This is not a manufacturing defect. We can replace this lever for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"}],"Eagle Powertrain":[{"id":"PT_0_1","heading":"How To: Run Diagnostics","body":"Please log in to the SRAM warranty and B2B portal and hover your cursor over the \"Eagle Powertrain\" tab at the top of the page, then click on \"Diagnostic Tool Software\". This software will be downloaded to your computer. Once downloaded, open the file and it will load up a window titled \"SRAM Powertrain Dealer Tool\", then simply log in using your B2B login credentials. Once the bike is connected to your computer, you will be able to run the diagnostics report.\n\nRunning a diagnostics report is super straightforward; the diagnostics tool plugs directly into the battery at the base and the other end into the USB port in a desktop computer / laptop.","full":"How To: Run Diagnostics\nPlease log in to the SRAM warranty and B2B portal and hover your cursor over the \"Eagle Powertrain\" tab at the top of the page, then click on \"Diagnostic Tool Software\". This software will be downloaded to your computer. Once downloaded, open the file and it will load up a window titled \"SRAM Powertrain Dealer Tool\", then simply log in using your B2B login credentials. Once the bike is connected to your computer, you will be able to run the diagnostics report.\n\nRunning a diagnostics report is super straightforward; the diagnostics tool plugs directly into the battery at the base and the other end into the USB port in a desktop computer / laptop.","type":"Troubleshooting"},{"id":"PT_0_2","heading":"Battery Error – Pre Warranty Lodgment (No Stock)","body":"As the battery is currently in a Battery Failure or Safety Protection state, we'll need it back to our facility for further assessment. Please create a warranty return in the warranty/service b2b.\n\nAt the moment, we don't have any replacement batteries available. We are working on securing more stock, but unfortunately, we don't have an ETA just yet. When you can, please box the battery securely and return it to us. Once it's back here, we'll do everything we can to pull it out of this state, but we may not be able to.\n\nWith the order created in the warranty / B2B portal, we can backorder a battery and provide you with updates on an ETA as we get them.","full":"Battery Error – Pre Warranty Lodgment (No Stock)\nAs the battery is currently in a Battery Failure or Safety Protection state, we'll need it back to our facility for further assessment. Please create a warranty return in the warranty/service b2b.\n\nAt the moment, we don't have any replacement batteries available. We are working on securing more stock, but unfortunately, we don't have an ETA just yet. When you can, please box the battery securely and return it to us. Once it's back here, we'll do everything we can to pull it out of this state, but we may not be able to.\n\nWith the order created in the warranty / B2B portal, we can backorder a battery and provide you with updates on an ETA as we get them.","type":"Troubleshooting"},{"id":"PT_0_3","heading":"Battery Error – Received (No Stock)","body":"Hey Team, at the moment we do not have any replacement batteries available. We are working on securing more stock, but unfortunately, we don't have an ETA just yet. We have placed a backorder for a replacement battery to be sent when stock arrives, we will keep you updated. Thanks!","full":"Battery Error – Received (No Stock)\nHey Team, at the moment we do not have any replacement batteries available. We are working on securing more stock, but unfortunately, we don't have an ETA just yet. We have placed a backorder for a replacement battery to be sent when stock arrives, we will keep you updated. Thanks!","type":"Troubleshooting"}],"Wheels":[{"id":"Wheels_0_1","heading":"Cognition Oil Only","body":"Hey Team, grease has been applied to the clutch and spring assembly. It is crucial that only Cognition oil is used in the clutch. Please refer to the Cognition hub service manual.\nhttps://www.sram.com/globalassets/document-hierarchy/service-manuals/zipp/wheels-and-hubs/zipp-cognition-v2-hubs-service-manual.pdf","full":"Cognition Oil Only\nHey Team, grease has been applied to the clutch and spring assembly. It is crucial that only Cognition oil is used in the clutch. Please refer to the Cognition hub service manual.\nhttps://www.sram.com/globalassets/document-hierarchy/service-manuals/zipp/wheels-and-hubs/zipp-cognition-v2-hubs-service-manual.pdf","type":"Service Notes"},{"id":"Wheels_0_2","heading":"Spokes and Nipples – Wear Item","body":"Hey Team, Spokes and nipples are classed as wear and tear items and not covered under warranty.\nWe would likely quote to replace the spokes, nipples and washers as a paid service when returned to us for assessment. Thanks.","full":"Spokes and Nipples – Wear Item\nHey Team, Spokes and nipples are classed as wear and tear items and not covered under warranty.\nWe would likely quote to replace the spokes, nipples and washers as a paid service when returned to us for assessment. Thanks.","type":"Service Notes"},{"id":"Wheels_0_3","heading":"Hub Serviced – Bearings Only","body":"Hub serviced in full with new bearings. Function tested OK.","full":"Hub Serviced – Bearings Only\nHub serviced in full with new bearings. Function tested OK.","type":"Service Notes"},{"id":"Wheels_0_4","heading":"Hub Serviced – Bearings and Axle","body":"Hub serviced in full with new bearings and hub axle. Function tested OK.","full":"Hub Serviced – Bearings and Axle\nHub serviced in full with new bearings and hub axle. Function tested OK.","type":"Service Notes"},{"id":"Wheels_0_5","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"}],"General":[{"id":"General_0_1","heading":"Direct Replacement – Out of Stock","body":"Hey Team, unfortunately we are currently out of stock of XXXX. Stock is due on DD/MM/YYYY. We can replace this with XXXX or back-order the matching part, to be processed when stock arrives. Please let us know how via the correspondence with how you would like to proceed. Thanks!","full":"Direct Replacement – Out of Stock\nHey Team, unfortunately we are currently out of stock of XXXX. Stock is due on DD/MM/YYYY. We can replace this with XXXX or back-order the matching part, to be processed when stock arrives. Please let us know how via the correspondence with how you would like to proceed. Thanks!","type":"General & Info"},{"id":"General_0_2","heading":"Battery – Out of Stock","body":"Hey Team, unfortunately we are out of stock of batteries. We have placed a back order for replacement/s, to ship to you when stock arrives.","full":"Battery – Out of Stock\nHey Team, unfortunately we are out of stock of batteries. We have placed a back order for replacement/s, to ship to you when stock arrives.","type":"General & Info"},{"id":"General_0_3","heading":"Battery Low Voltage Protection","body":"Hey Team, It sounds as though the battery has entered a low voltage protection state.\nA low voltage protection state means the battery's voltage has dropped below a safe threshold, prompting the battery management system to shut down the battery to prevent damage.\nFor charger LED color explanations, refer to the SRAM AXS Single Battery Charger Base - LED Indicator Status or SRAM AXS Four Battery Charger Base - LED Indicator Status sections.\nAXS Battery Recovery\nThere are two procedures that can be used to wake a battery in sleep state depending on the capabilities of your SRAM AXS battery charger.\nTrickle Charge Procedure\nPerform this procedure first if your SRAM AXS battery charger is capable of providing a trickle charge.\nYou can identify if your charger has trickle charge capability by referring to the serial number on the bottom of the charger.\n- For single bay chargers, a serial number greater than 3308304631 indicates that the charger has trickle charge capability.\n- For four bay chargers, a serial number greater than 3306390011 indicates that the charger has trickle charge capability.\nIf your charger is not capable of trickle charge, go to the Manual Wake Up Procedure.\nTrickle Charge Procedure:\n1. Plug the battery charger into a USB charging port connected to a power source.\n2. Place the battery into the battery charger and wait 10 seconds for the charger LED to respond.\n3a. If the LED responds yellow, leave the battery on the charger. The battery is no longer in sleep mode and will continue to charge.\n3b. If the LED responds red, remove the battery from the charger and proceed to the Manual Wake Up Procedure.\nManual Wake Up Procedure:\n1. Plug the battery charger into the USB charging port of a computer.\n2. Place the battery into the battery charger and wait for the charger LED to respond.\n3. If the LED responds red, remove the battery from the charger and wait for the LED to turn off.\n4. Place the battery on the charger again and wait for the LED to respond.\n5. Repeat steps 2-4 for a total of 10-15 cycles or until the LED turns yellow.","full":"Battery Low Voltage Protection\nHey Team, It sounds as though the battery has entered a low voltage protection state.\nA low voltage protection state means the battery's voltage has dropped below a safe threshold, prompting the battery management system to shut down the battery to prevent damage.\nFor charger LED color explanations, refer to the SRAM AXS Single Battery Charger Base - LED Indicator Status or SRAM AXS Four Battery Charger Base - LED Indicator Status sections.\nAXS Battery Recovery\nThere are two procedures that can be used to wake a battery in sleep state depending on the capabilities of your SRAM AXS battery charger.\nTrickle Charge Procedure\nPerform this procedure first if your SRAM AXS battery charger is capable of providing a trickle charge.\nYou can identify if your charger has trickle charge capability by referring to the serial number on the bottom of the charger.\n- For single bay chargers, a serial number greater than 3308304631 indicates that the charger has trickle charge capability.\n- For four bay chargers, a serial number greater than 3306390011 indicates that the charger has trickle charge capability.\nIf your charger is not capable of trickle charge, go to the Manual Wake Up Procedure.\nTrickle Charge Procedure:\n1. Plug the battery charger into a USB charging port connected to a power source.\n2. Place the battery into the battery charger and wait 10 seconds for the charger LED to respond.\n3a. If the LED responds yellow, leave the battery on the charger. The battery is no longer in sleep mode and will continue to charge.\n3b. If the LED responds red, remove the battery from the charger and proceed to the Manual Wake Up Procedure.\nManual Wake Up Procedure:\n1. Plug the battery charger into the USB charging port of a computer.\n2. Place the battery into the battery charger and wait for the charger LED to respond.\n3. If the LED responds red, remove the battery from the charger and wait for the LED to turn off.\n4. Place the battery on the charger again and wait for the LED to respond.\n5. Repeat steps 2-4 for a total of 10-15 cycles or until the LED turns yellow.","type":"General & Info"},{"id":"General_0_4","heading":"Inside-Sales Service Charge","body":"Please note, all inside-sales suspension services are now charged at $120+gst, per component. This price includes labour and the necessary service kit for the service item. Any further parts needed will be charged at a discounted price.","full":"Inside-Sales Service Charge\nPlease note, all inside-sales suspension services are now charged at $120+gst, per component. This price includes labour and the necessary service kit for the service item. Any further parts needed will be charged at a discounted price.","type":"General & Info"},{"id":"General_0_5","heading":"Request: Return Damaged Part on RAP Quote","body":"Hey Team, we're unable to return the damaged component and supply the replacement. The replacement is issued at a discounted rate against the original component's serial number, and the damaged item is held to ensure it's removed from circulation. Please let us know if you'd like to proceed with the replacement as quoted, with the understanding that the damaged component/s will not be returned.","full":"Request: Return Damaged Part on RAP Quote\nHey Team, we're unable to return the damaged component and supply the replacement. The replacement is issued at a discounted rate against the original component's serial number, and the damaged item is held to ensure it's removed from circulation. Please let us know if you'd like to proceed with the replacement as quoted, with the understanding that the damaged component/s will not be returned.","type":"General & Info"},{"id":"General_0_6","heading":"Ready to Ship – Payment Required","body":"Hey Team, this order is now complete. Please contact us on 03 9212 6100 when you're ready to arrange payment. If you prefer to pay by bank transfer, kindly send a copy of the remittance along with the RA or invoice number to sramaustralia@sram.com. Just a note that the order will be shipped once payment has been received. Thanks!","full":"Ready to Ship – Payment Required\nHey Team, this order is now complete. Please contact us on 03 9212 6100 when you're ready to arrange payment. If you prefer to pay by bank transfer, kindly send a copy of the remittance along with the RA or invoice number to sramaustralia@sram.com. Just a note that the order will be shipped once payment has been received. Thanks!","type":"General & Info"},{"id":"General_0_7","heading":"Card on File Declined","body":"Hey Team, we have attempted to process payment for this repair however the card on file was declined. Please let us know when you'd like us to re-attempt to process payment. Thanks!","full":"Card on File Declined\nHey Team, we have attempted to process payment for this repair however the card on file was declined. Please let us know when you'd like us to re-attempt to process payment. Thanks!","type":"General & Info"},{"id":"General_0_8","heading":"Credit Card Details – Upload Request","body":"Hey Team, could you please upload your credit card details using the \"Edit Credit Card Details\" section on the bottom left of the order page? Once that's done, just send us a quick message and we'll process and ship the order. Thanks!","full":"Credit Card Details – Upload Request\nHey Team, could you please upload your credit card details using the \"Edit Credit Card Details\" section on the bottom left of the order page? Once that's done, just send us a quick message and we'll process and ship the order. Thanks!","type":"General & Info"},{"id":"General_0_9","heading":"POP Request","body":"Hey Team, could you please upload a copy of the POP and reply to this message once it's been added? Thank you!","full":"POP Request\nHey Team, could you please upload a copy of the POP and reply to this message once it's been added? Thank you!","type":"General & Info"},{"id":"General_0_10","heading":"Pending POP","body":"Hey Team, this order has been approved for return and assessment. Please make sure to include a copy of the proof of purchase with the item. For all warranty returns, it's preferred that a copy of the proof of purchase is attached directly to the claim in the service portal, but you may include a printed copy with the returned goods. Thanks!","full":"Pending POP\nHey Team, this order has been approved for return and assessment. Please make sure to include a copy of the proof of purchase with the item. For all warranty returns, it's preferred that a copy of the proof of purchase is attached directly to the claim in the service portal, but you may include a printed copy with the returned goods. Thanks!","type":"General & Info"}]};
const CATS = Object.keys(DATA);
let state = { cat: 'all', type: 'all', q: '', open: null };

// ── Cross-frame shared state ───────────────────────
// With @all-frames true, Tampermonkey injects this script into the top page
// AND into every same-origin iframe. We use window.top._sramShared so all
// frame instances share the same lastFocused/pinnedField reference.
// The panel/launcher is created only in the TOP frame.

const IS_TOP_FRAME = (window === window.top);

try {
  if (!window.top._sramShared) window.top._sramShared = { lastFocused: null, pinnedField: null, pinnedMode: null };
} catch(e) {
  // Cross-origin top frame — shouldn't happen on SAP portal, but handle gracefully
  window._sramShared = { lastFocused: null, pinnedField: null, pinnedMode: null };
}

function getShared() {
  try { return window.top._sramShared; } catch(e) { return window._sramShared || {}; }
}

// Convenience accessors (so existing code stays readable)
function getLastFocused() { return getShared().lastFocused; }
function getPinnedField()  { return getShared().pinnedField; }
function getPinnedMode()   { return getShared().pinnedMode; }
function setLastFocused(el) { try { window.top._sramShared.lastFocused = el; } catch(e) {} }
function setPinnedField(el) { try { window.top._sramShared.pinnedField = el; } catch(e) {} }
function setPinnedMode(mode) { try { window.top._sramShared.pinnedMode = mode; } catch(e) {} }

// ── Determine if an element is an editable SAP/HTML field ──
function isEditableField(el) {
  if (!el || !el.tagName) return false;
  const tag = el.tagName;
  const type = (el.getAttribute('type') || '').toLowerCase();
  return (
    tag === 'TEXTAREA' ||
    (tag === 'INPUT' && !['button','submit','reset','checkbox','radio','hidden','image','file','range','color'].includes(type)) ||
    el.isContentEditable ||
    el.getAttribute('contenteditable') === 'true' ||
    el.getAttribute('role') === 'textbox' ||
    el.getAttribute('role') === 'textarea' ||
    el.classList.contains('sapMInputBaseInner') ||
    el.classList.contains('sapMTextAreaInner') ||
    el.classList.contains('sapUiRichTextEditor')
  );
}

// ── Core tracker — runs in ALL frames (top + iframes) ──────
function trackIfEditable(el) {
  if (!el) return;
  // Skip our own UI (only present in top frame, but check anyway)
  try {
    const panel = window.top.document.getElementById('sram-panel');
    if (panel && panel.contains(el)) return;
    const launcher = window.top.document.getElementById('sram-launcher');
    if (launcher && launcher.contains(el)) return;
  } catch(e) {}

  let node = el;
  for (let i = 0; i < 5; i++) {
    if (!node || node.nodeType !== 1) break;
    if (isEditableField(node)) {
      setLastFocused(node);
      // If top frame: update hint immediately (don't wait for setInterval)
      if (IS_TOP_FRAME) {
        const hint = document.getElementById('sram-field-name');
        if (hint && !getPinnedField()) {
          const lbl = node.placeholder || node.getAttribute('aria-label') || node.id || node.tagName;
          hint.textContent = '✓ Target field: ' + String(lbl || '?').substring(0, 50) + ' (auto)';
          hint.style.color = '#1D9E75';
        }
      }
      return;
    }
    node = node.parentElement;
  }
}

// Install tracking in THIS frame (both top and iframes run this)
document.addEventListener('mousedown', e => trackIfEditable(e.target), true);
document.addEventListener('focusin',   e => trackIfEditable(e.target), true);

// ── Walk DOM tree to find the SAPUI5 control for an element ──
// Tries sap.ui.getCore() from the element's own window (iframe-aware)
function findSAPControl(el) {
  if (!el) return null;
  const win = (el.ownerDocument && el.ownerDocument.defaultView) || window;
  if (!win.sap || !win.sap.ui || !win.sap.ui.getCore) return null;
  let node = el;
  for (let i = 0; i < 15; i++) {
    if (!node) break;
    if (node.id) {
      try {
        const ctrl = win.sap.ui.getCore().byId(node.id);
        if (ctrl && typeof ctrl.setValue === 'function') return ctrl;
      } catch(e) {}
    }
    node = node.parentElement;
  }
  return null;
}

// ── Collect all documents we can access (main + same-origin iframes) ──
function allDocs() {
  const docs = [document];
  try {
    document.querySelectorAll('iframe').forEach(f => {
      try { if (f.contentDocument) docs.push(f.contentDocument); } catch(e) {}
    });
  } catch(e) {}
  return docs;
}

// ── Field label mappings: German button label → search terms (DE + EN) ──
const FIELD_SEARCH_TERMS = {
  'Internal Info':     ['Internal Info', 'Internal Memo', 'Internal Note', 'Interne Info'],
  'Shipping Info':     ['Shipping Info', 'Shipping Note', 'Versandinformation'],
  'Header Note':       ['Remarks', 'Header Note', 'Notes', 'Bemerkungen'],
  // Deliberately WITHOUT "Message" — too generic, would e.g. collide with the
  // "New Message:" checkbox in the Header Information.
  'Correspondence':    ['Correspondence', 'Korrespondenz'],
};

// ── Find a SAP textarea by its visible label text (searches all accessible frames) ──
function findFieldByLabel(labelText) {
  const terms = FIELD_SEARCH_TERMS[labelText] || [labelText];

  for (const doc of allDocs()) {
    for (const term of terms) {
      const result = findFieldByLabelInDoc(doc, term);
      if (result) return result;
    }
  }
  return null;
}

function findFieldByLabelInDoc(doc, labelText) {
  const wanted = labelText.trim().toLowerCase();

  // Exact (not substring) comparison, so e.g. "Message" doesn't incorrectly
  // match a label like "New Message:". An optional trailing colon on the
  // label is tolerated ("Correspondence" == "Correspondence:").
  function labelMatches(text) {
    const norm = text.trim().toLowerCase().replace(/:\s*$/, '').replace(/\*\s*$/, '').trim();
    return norm === wanted;
  }

  // 1. Label elements (SAP and standard)
  const lblSelectors = ['label', '.sapMLabel', '.sapUiFormLabel', '[role="label"]', '.sapMLabelText'];
  for (const sel of lblSelectors) {
    try {
      const lbls = doc.querySelectorAll(sel);
      for (const lbl of lbls) {
        if (labelMatches(lbl.textContent)) {
          const forId = lbl.getAttribute('for') || lbl.getAttribute('labelfor') || lbl.getAttribute('data-for');
          if (forId) {
            const direct = doc.getElementById(forId) || doc.getElementById(forId + '-inner');
            // Only accept if this is really a text input field
            // (no checkbox, radio, etc. — even if the label happens to match)
            if (direct && isEditableField(direct)) return direct;
          }
          const row = lbl.closest('.sapUiFormElement, .sapUiVlt tr, .sapMHBox, .sapMFlexBox, [data-sap-ui]');
          if (row) {
            const inp = row.querySelector('textarea.sapMTextAreaInner, textarea, input.sapMInputBaseInner, input[type="text"]');
            if (inp) return inp;
          }
          // Last resort: next sibling area
          const next = lbl.nextElementSibling;
          if (next) {
            const inp = next.tagName === 'TEXTAREA' || (next.tagName === 'INPUT' && isEditableField(next)) ? next
              : next.querySelector('textarea, input[type="text"]');
            if (inp) return inp;
          }
        }
      }
    } catch(e) {}
  }
  // 2. Placeholder
  try {
    const byPh = doc.querySelector(`textarea[placeholder*="${labelText}"], input[placeholder*="${labelText}"]`);
    if (byPh) return byPh;
  } catch(e) {}
  return null;
}

// ── Correspondence field: special case ─────────────────────────────
// The Correspondence field is closed by default. Only clicking
// "Write Message" opens a DIALOG with a new, unnamed textarea
// (no label like "Correspondence" present). So the normal label search
// doesn't work here — instead we detect the new field via a
// before/after comparison: remember all textareas before the click, then
// use the newly-appeared (visible) field after opening.
function findWriteMessageButton(doc) {
  try {
    const candidates = doc.querySelectorAll('button, a, span[role="button"], div[role="button"], .sapMBtn, [class*="Btn"]');
    for (const el of candidates) {
      const txt = (el.textContent || '').trim();
      if (/write\s*message/i.test(txt) && txt.length < 60) return el;
    }
  } catch(e) {}
  return null;
}

// ── Realistic click simulation ─────────────────────────────────
// SAPUI5 buttons (sap.m.Button) often don't respond to a simple
// el.click(), because their "press" logic is triggered via a whole
// sequence of pointer/mouse events (pointerdown → mousedown →
// pointerup → mouseup → click), not just the plain "click" event.
// This function simulates that complete sequence at the element's
// exact screen position, so UI5's event detection fires correctly.
function simulateRealClick(el) {
  try {
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const view = el.ownerDocument.defaultView || window;
    const base = { bubbles: true, cancelable: true, composed: true, view, clientX: x, clientY: y, button: 0 };

    try { el.focus({ preventScroll: true }); } catch(e) {}

    try { el.dispatchEvent(new PointerEvent('pointerover', { ...base, pointerId: 1, pointerType: 'mouse', isPrimary: true })); } catch(e) {}
    try { el.dispatchEvent(new PointerEvent('pointerenter', { ...base, pointerId: 1, pointerType: 'mouse', isPrimary: true, bubbles: false })); } catch(e) {}
    el.dispatchEvent(new MouseEvent('mouseover', base));
    el.dispatchEvent(new MouseEvent('mouseenter', { ...base, bubbles: false }));
    el.dispatchEvent(new MouseEvent('mousemove', base));

    try { el.dispatchEvent(new PointerEvent('pointerdown', { ...base, pointerId: 1, pointerType: 'mouse', isPrimary: true })); } catch(e) {}
    el.dispatchEvent(new MouseEvent('mousedown', base));

    try { el.dispatchEvent(new PointerEvent('pointerup', { ...base, pointerId: 1, pointerType: 'mouse', isPrimary: true })); } catch(e) {}
    el.dispatchEvent(new MouseEvent('mouseup', base));

    el.dispatchEvent(new MouseEvent('click', base));
  } catch(e) {
    // Last resort, in case something went wrong during dispatch
    try { el.click(); } catch(e2) {}
  }
}

function isVisible(el) {
  if (!el) return false;
  try {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    const style = (el.ownerDocument.defaultView || window).getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    return true;
  } catch(e) { return true; }
}

function isEmptyField(el) {
  try {
    const val = el.value !== undefined ? el.value : el.textContent;
    return !val || !val.trim();
  } catch(e) { return true; }
}

function isOwnUI(el) {
  try {
    const p = window.top.document.getElementById('sram-panel');
    if (p && p.contains(el)) return true;
    const l = window.top.document.getElementById('sram-launcher');
    if (l && l.contains(el)) return true;
  } catch(e) {}
  return false;
}

// Snapshot: Element -> was it visible at this point in time?
// (SAPUI5 often renders dialog/popover content invisibly in the DOM
// beforehand — it's only made visible on open, not newly created.
// So what matters here is the visibility change, not mere existence.)
function collectFieldVisibility() {
  const map = new Map();
  for (const doc of allDocs()) {
    try {
      doc.querySelectorAll('textarea, [contenteditable="true"]').forEach(el => {
        map.set(el, isVisible(el));
      });
    } catch(e) {}
  }
  return map;
}

function getActiveEditableAcrossFrames() {
  for (const doc of allDocs()) {
    try {
      const act = doc.activeElement;
      if (act && isEditableField(act) && !isOwnUI(act)) return act;
    } catch(e) {}
  }
  return null;
}

// ── Core logic: find the Correspondence field, or open it via "Write Message" ──
// Reusable for: (a) the "Correspondence" button, and (b) automatically
// on insert, in case the field has since closed again.
// onDone(field|null) is called as soon as a result is known.
function resolveCorrespondenceField(onDone, onStatus) {
  const say = (txt, color) => { if (onStatus) onStatus(txt, color); };

  // 1. If a matching, valid field is already open
  let field = findFieldByLabel('Correspondence');
  if (field) { onDone(field); return; }

  // Is the currently pinned field (from a previous opening) still there and visible?
  const current = getPinnedField();
  if (current && getPinnedMode() === 'correspondence') {
    try {
      if (current.isConnected && isVisible(current)) { onDone(current); return; }
    } catch(e) {}
  }

  // 2. Before-snapshot: which fields are currently visible?
  const before = collectFieldVisibility();

  // 3. Find and click the "Write Message" button to open/show the dialog
  let btn = null;
  for (const doc of allDocs()) {
    btn = findWriteMessageButton(doc);
    if (btn) break;
  }
  if (!btn) {
    say('✗ "Write Message" button not found – please open the correspondence tab', '#C62828');
    onDone(null);
    return;
  }
  say('⏳ Opening correspondence field…', '#B4780D');
  let btnRect = null;
  try { btnRect = btn.getBoundingClientRect(); } catch(e) {}
  try { simulateRealClick(btn); } catch(e) {}

  // 4. Search for the target field multiple times with a delay. Priority:
  //    a) the currently focused field (many SAP dialogs auto-focus the field)
  //    b) a field that changed from invisible -> visible (newly created fields
  //       automatically count here too, since they were "not visible" before). If there
  //       are multiple such candidates, the one spatially closest to the "Write Message" button wins.
  //    IMPORTANT: no more "any empty field on the page" fallback — that previously
  //    incorrectly matched already-existing, empty fields like "Internal Memo" or "Shipping Note",
  //    even though the correspondence popover wasn't open at all.
  function distanceToBtn(el) {
    if (!btnRect) return 0;
    try {
      const r = el.getBoundingClientRect();
      const ax = r.left + r.width / 2, ay = r.top + r.height / 2;
      const bx = btnRect.left + btnRect.width / 2, by = btnRect.top + btnRect.height / 2;
      return Math.hypot(ax - bx, ay - by);
    } catch(e) { return Infinity; }
  }

  let attempts = 0;
  const tryFind = () => {
    attempts++;

    let target = getActiveEditableAcrossFrames();

    if (!target) {
      const now = collectFieldVisibility();
      const candidates = [];
      for (const [el, visibleNow] of now.entries()) {
        const wasVisible = before.has(el) ? before.get(el) : false;
        if (visibleNow && !wasVisible && !isOwnUI(el)) candidates.push(el);
      }
      if (candidates.length > 1) {
        candidates.sort((a, b) => distanceToBtn(a) - distanceToBtn(b));
      }
      target = candidates.find(isEmptyField) || candidates[0];
    }

    if (target) {
      onDone(target);
    } else if (attempts < 10) {
      setTimeout(tryFind, 300);
    } else {
      say('✗ Correspondence field not found – please click manually into the text field', '#C62828');
      onDone(null);
    }
  };
  setTimeout(tryFind, 350);
}

// Called from the "Correspondence" button in the target-field area:
// finds/opens the field and pins it permanently as the target (mode "correspondence").
function clickWriteMessageAndPin() {
  const hint = document.getElementById('sram-field-name');
  const setHint = (txt, color) => { if (hint) { hint.textContent = txt; hint.style.color = color; } };

  resolveCorrespondenceField(
    (field) => {
      if (field) {
        setPinnedField(field);
        setPinnedMode('correspondence');
        setActiveFieldButton('Correspondence');
        setHint('✓ Target field set: Correspondence (Write Message dialog)', '#1D9E75');
      }
    },
    setHint
  );
}

// ── Check: is the field actually enabled for editing? ──
// Prevents text being written into locked fields,
// as long as the order hasn't been unlocked via the "Edit" button.
const SAP_LOCKED_CLASSES = [
  'sapMInputBaseReadOnly', 'sapMInputBaseDisabled',
  'sapMInputDisabled', 'sapMInputReadOnly',
  'sapMTextAreaReadOnly', 'sapMTextAreaDisabled',
  'sapUiFieldReadOnly', 'sapMInputBaseReadOnlyNoDecoration'
];

function isFieldEditable(el) {
  if (!el) return false;
  if (el.disabled || el.readOnly) return false;
  if (el.getAttribute('aria-disabled') === 'true') return false;
  if (el.getAttribute('aria-readonly') === 'true') return false;

  // Check SAPUI5 marker classes along the parent chain
  let node = el;
  for (let i = 0; i < 6 && node; i++) {
    if (node.classList) {
      for (const cls of SAP_LOCKED_CLASSES) {
        if (node.classList.contains(cls)) return false;
      }
    }
    node = node.parentElement;
  }

  // SAPUI5 Core API: getEditable()/getEnabled()
  const ctrl = findSAPControl(el);
  if (ctrl) {
    try {
      if (typeof ctrl.getEditable === 'function' && ctrl.getEditable() === false) return false;
      if (typeof ctrl.getEnabled === 'function' && ctrl.getEnabled() === false) return false;
    } catch(e) {}
  }

  return true;
}

// ── SAP-compatible text insertion (APPEND mode) ──────────────────
function insertIntoField(text) {
  const el = getPinnedField() || getLastFocused();

  if (!el) {
    navigator.clipboard.writeText(text).catch(() => {});
    return 'clipboard';
  }

  // Field locked (order not yet released via "Edit")? -> don't write,
  // just copy to clipboard so nothing gets changed unintentionally.
  if (!isFieldEditable(el)) {
    navigator.clipboard.writeText(text).catch(() => {});
    return 'locked';
  }

  // Element's own window context (important when element is in an iframe)
  const elWin = (el.ownerDocument && el.ownerDocument.defaultView) || window;

  // ── Helper: reads the current field content ────────────────────
  function getCurrentValue() {
    const ctrl = findSAPControl(el);
    if (ctrl && typeof ctrl.getValue === 'function') return ctrl.getValue() || '';
    if (el.value !== undefined) return el.value || '';
    if (el.isContentEditable || el.getAttribute('contenteditable') === 'true')
      return el.textContent || '';
    return '';
  }

  // ── Helper: existing content + line break + new text ───
  function buildNewValue() {
    const current = getCurrentValue();
    return current ? current + '\n' + text : text;
  }

  // Method 0: SAP Core API — most reliable for SAPUI5 controls
  const sapCtrl = findSAPControl(el);
  if (sapCtrl) {
    try {
      const newVal = buildNewValue();
      sapCtrl.setValue(newVal);
      if (typeof sapCtrl.fireChange === 'function') sapCtrl.fireChange({ value: newVal });
      if (typeof sapCtrl.fireLiveChange === 'function') sapCtrl.fireLiveChange({ value: newVal });
      return 'field';
    } catch(e) {}
  }

  // Method 1: execCommand — set cursor to end, then append
  try {
    el.focus();
    const current = getCurrentValue();
    const insertText = current ? '\n' + text : text;
    // Cursor to end (do NOT select everything)
    if (el.setSelectionRange) {
      el.setSelectionRange(current.length, current.length);
    }
    if (document.execCommand('insertText', false, insertText)) {
      fireSAPEvents(el);
      return 'field';
    }
  } catch(e) {}

  // Method 2: Native setter — type-safe (no more TypeError on wrong prototype)
  try {
    el.focus();
    const newVal = buildNewValue();
    if (el.tagName === 'TEXTAREA') {
      const desc = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value');
      if (desc && desc.set) desc.set.call(el, newVal);
      else el.value = newVal;
    } else if (el.tagName === 'INPUT') {
      const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
      if (desc && desc.set) desc.set.call(el, newVal);
      else el.value = newVal;
    } else if (el.isContentEditable || el.getAttribute('contenteditable') === 'true') {
      el.textContent = newVal;
    } else {
      el.value = newVal;
    }
    fireSAPEvents(el);
    return 'field';
  } catch(e) {}

  // Fallback: clipboard only
  navigator.clipboard.writeText(text).catch(() => {});
  return 'clipboard';
}

function fireSAPEvents(el) {
  try { el.dispatchEvent(new Event('input', { bubbles: true, cancelable: true })); } catch(e) {}
  try { el.dispatchEvent(new Event('change', { bubbles: true, cancelable: true })); } catch(e) {}
  try { el.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'a' })); } catch(e) {}
  try { el.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'a' })); } catch(e) {}
  // Also try SAP Core API on the element itself (belt + suspenders)
  const ctrl = findSAPControl(el);
  if (ctrl) {
    try {
      const val = el.value !== undefined ? el.value : el.textContent;
      if (typeof ctrl.setValue === 'function') ctrl.setValue(val);
      if (typeof ctrl.fireChange === 'function') ctrl.fireChange({ value: val });
    } catch(e) {}
  }
}

// ── Helpers ───────────────────────────────────────
function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function getItems() {
  let items = state.cat === 'all'
    ? CATS.flatMap(c => DATA[c].map(t => ({...t, _cat: c})))
    : (DATA[state.cat] || []).map(t => ({...t, _cat: state.cat}));
  if (state.type !== 'all') items = items.filter(t => t.type === state.type);
  if (state.q) {
    const q = state.q.toLowerCase();
    items = items.filter(t =>
      t.heading.toLowerCase().includes(q) || t.body.toLowerCase().includes(q)
    );
  }
  return items;
}

function getTypes() {
  const items = state.cat === 'all' ? CATS.flatMap(c => DATA[c]) : (DATA[state.cat] || []);
  const seen = {};
  return items.map(t => t.type).filter(t => t && !seen[t] && (seen[t]=1)).sort();
}

// ── Floating launcher button ──────────────────────
function createLauncher() {
  if (document.getElementById('sram-launcher')) return;
  const btn = document.createElement('button');
  btn.id = 'sram-launcher';
  btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="14" height="2" fill="white"/><rect x="1" y="8" width="10" height="2" fill="white"/><rect x="1" y="12" width="7" height="2" fill="white"/></svg><span style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600">Texts</span>`;
  btn.style.cssText = 'position:fixed;bottom:80px;right:20px;z-index:2147483646;display:flex;align-items:center;gap:8px;padding:9px 16px;background:#CC0000;color:#fff;border:none;border-radius:4px;cursor:pointer;box-shadow:0 3px 14px rgba(0,0,0,0.28);letter-spacing:0.02em;';

  // CRITICAL: prevent mousedown so SAP field keeps focus, and stop it from bubbling
  // to document (see explanation in the panel handler further below)
  ['mousedown', 'pointerdown', 'touchstart'].forEach(evtName => {
    btn.addEventListener(evtName, e => {
      e.stopPropagation();
      if (evtName === 'mousedown') e.preventDefault();
    });
  });
  btn.addEventListener('click', togglePanel);
  document.body.appendChild(btn);
}

// ── Panel ─────────────────────────────────────────
let panel = null;

function togglePanel() {
  if (document.getElementById('sram-panel')) {
    panel.remove(); panel = null; return;
  }
  buildPanel();
}

// ── Target field buttons: mark/reset active state ──────
function clearActiveFieldButtons() {
  if (!panel) return;
  panel.querySelectorAll('.sram-fld-btn').forEach(b => {
    b.style.background = '#FFFFFF';
    b.style.borderColor = '#D0D0D0';
    b.style.color = '#454545';
  });
}

function setActiveFieldButton(lbl) {
  if (!panel) return;
  clearActiveFieldButtons();
  const btn = panel.querySelector(`.sram-fld-btn[data-lbl="${lbl}"]`);
  if (btn) {
    btn.style.background = '#CE1126';
    btn.style.borderColor = '#CE1126';
    btn.style.color = '#FFFFFF';
  }
}

function buildPanel() {
  if (panel) panel.remove();
  panel = document.createElement('div');
  panel.id = 'sram-panel';
  panel.style.cssText = 'position:fixed;top:0;right:0;bottom:0;width:440px;background:#FFFFFF;border-left:3px solid #CE1126;z-index:2147483647;display:flex;flex-direction:column;font-family:Arial,Helvetica,sans-serif;font-size:13px;box-shadow:-6px 0 24px rgba(0,0,0,0.18);color:#312929;';

  // CRITICAL: prevent all mousedown events inside panel from stealing focus from SAP fields
  // AND: prevent clicks in the panel from bubbling up to document.
  // Reason: SAPUI5 popovers (e.g. the "Write Message" popup) close automatically
  // as soon as they detect a "click outside" — which they do via a document-wide
  // mousedown/pointerdown listener. Without stopPropagation(), any click on
  // our panel would close the popover before the text could be inserted.
  ['mousedown', 'pointerdown', 'touchstart'].forEach(evtName => {
    panel.addEventListener(evtName, e => {
      e.stopPropagation();
      if (evtName !== 'mousedown') return;
      // Exception: the search field and the text preview should work normally
      // (preview = manually selecting/copying individual text passages with the mouse)
      if (e.target.id === 'sram-q') return;
      if (e.target.closest && e.target.closest('.sram-preview-text')) return;
      e.preventDefault();
    });
  });

  panel.innerHTML = `
    <div style="padding:12px 14px;background:#CE1126;border-bottom:1px solid #A30F1F;display:flex;align-items:center;gap:10px;flex-shrink:0;">
      <div style="padding:3px 8px;background:#FFFFFF;border-radius:3px;flex-shrink:0;">
        <span style="font-size:13px;font-weight:800;letter-spacing:0.02em;color:#CE1126;font-family:Arial,Helvetica,sans-serif;">SRAM</span>
      </div>
      <span style="font-size:13px;font-weight:600;color:#FFFFFF;flex:1;">Service Texts AUS V3</span>
      <button id="sram-x" style="background:none;border:none;color:#FFFFFF;cursor:pointer;font-size:18px;padding:0 4px;line-height:1;opacity:0.9;">✕</button>
    </div>
    <div style="padding:10px 14px;background:#FFFFFF;border-bottom:1px solid #E5E5E5;flex-shrink:0;">
      <input id="sram-q" type="text" placeholder="Search…" autocomplete="off" style="width:100%;padding:8px 10px;background:#F7F7F7;border:1px solid #D0D0D0;border-radius:4px;color:#312929;font-size:13px;outline:none;font-family:Arial,Helvetica,sans-serif;box-sizing:border-box;" />
    </div>
    <div style="padding:8px 14px;background:#F7F7F7;border-bottom:1px solid #E5E5E5;flex-shrink:0;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
      <span style="font-size:10px;color:#6B6B6B;flex-shrink:0;font-weight:700;letter-spacing:0.04em;">TARGET FIELD:</span>
      <button class="sram-fld-btn" data-lbl="Internal Info" style="padding:4px 9px;border-radius:3px;border:1px solid #D0D0D0;background:#FFFFFF;color:#454545;font-size:11px;cursor:pointer;font-family:Arial,Helvetica,sans-serif;">Internal Info</button>
      <button class="sram-fld-btn" data-lbl="Shipping Info" style="padding:4px 9px;border-radius:3px;border:1px solid #D0D0D0;background:#FFFFFF;color:#454545;font-size:11px;cursor:pointer;font-family:Arial,Helvetica,sans-serif;">Shipping Info</button>
      <button class="sram-fld-btn" data-lbl="Header Note" style="padding:4px 9px;border-radius:3px;border:1px solid #D0D0D0;background:#FFFFFF;color:#454545;font-size:11px;cursor:pointer;font-family:Arial,Helvetica,sans-serif;">Header Note</button>
      <button class="sram-fld-btn" data-lbl="Correspondence" style="padding:4px 9px;border-radius:3px;border:1px solid #D0D0D0;background:#FFFFFF;color:#454545;font-size:11px;cursor:pointer;font-family:Arial,Helvetica,sans-serif;" title="Automatically opens 'Write Message' if needed">Correspondence</button>
      <button id="sram-fld-auto" style="padding:4px 9px;border-radius:3px;border:1px solid #D0D0D0;background:#FFFFFF;color:#8A8A8A;font-size:10px;cursor:pointer;font-family:Arial,Helvetica,sans-serif;" title="Reset target field selection (automatic detection)">Reset</button>
    </div>
    <div id="sram-field-hint" style="padding:6px 14px;background:#FFFBEA;border-bottom:1px solid #E5E5E5;font-size:10.5px;flex-shrink:0;display:flex;align-items:center;gap:6px;">
      <span id="sram-field-name" style="color:#B4780D;">⚠ No field selected – click a target field button or click a text field in the portal</span>
    </div>
    <div id="sram-cats" style="display:flex;flex-wrap:wrap;gap:5px;padding:10px 14px;border-bottom:1px solid #E5E5E5;flex-shrink:0;background:#FFFFFF;"></div>
    <div id="sram-types" style="display:flex;flex-wrap:wrap;gap:4px;padding:8px 14px;border-bottom:1px solid #E5E5E5;flex-shrink:0;background:#F7F7F7;"></div>
    <div id="sram-results" style="flex:1;overflow-y:auto;padding:10px;background:#FFFFFF;"></div>
  `;

  document.body.appendChild(panel);

  document.getElementById('sram-x').addEventListener('click', () => { panel.remove(); panel = null; hideTooltip(); });
  document.getElementById('sram-results').addEventListener('scroll', hideTooltip);
  document.getElementById('sram-q').addEventListener('input', e => {
    state.q = e.target.value.trim();
    state.open = null;
    renderResults();
  });

  // Target field pinning buttons
  panel.querySelectorAll('.sram-fld-btn').forEach(btn => {
    btn.addEventListener('mousedown', e => e.preventDefault());
    btn.addEventListener('click', () => {
      const lbl = btn.getAttribute('data-lbl');

      // Special case Correspondence: field may need to be opened first via "Write Message"
      if (lbl === 'Correspondence') {
        clickWriteMessageAndPin();
        return;
      }

      const found = findFieldByLabel(lbl);
      if (found) {
        setPinnedField(found);
        setPinnedMode(null);
        setActiveFieldButton(lbl);
        const hint = document.getElementById('sram-field-name');
        if (hint) { hint.textContent = '✓ Target field set: ' + lbl; hint.style.color = '#1D9E75'; }
      } else {
        const hint = document.getElementById('sram-field-name');
        if (hint) { hint.textContent = '✗ Field "' + lbl + '" not found – open the text field in the portal'; hint.style.color = '#C62828'; }
      }
    });
  });

  document.getElementById('sram-fld-auto').addEventListener('mousedown', e => e.preventDefault());
  document.getElementById('sram-fld-auto').addEventListener('click', () => {
    setPinnedField(null);
    setPinnedMode(null);
    clearActiveFieldButtons();
    const hint = document.getElementById('sram-field-name');
    if (hint) { hint.textContent = '↺ Reset – automatic detection active'; hint.style.color = '#6B6B6B'; }
  });

  // Live hint: show current target field
  setInterval(() => {
    const hint = document.getElementById('sram-field-name');
    if (!hint) return;
    const pinned = getPinnedField();
    const auto   = getLastFocused();
    const active = pinned || auto;
    if (active) {
      try {
        const lbl = active.placeholder ||
          active.getAttribute('aria-label') ||
          (active.getAttribute('aria-labelledby') && (active.ownerDocument.getElementById(active.getAttribute('aria-labelledby')) || {}).textContent) ||
          active.name || active.id || active.tagName.toLowerCase();
        const locked = !isFieldEditable(active);
        if (locked) {
          hint.textContent = '🔒 Target field: ' + String(lbl || '?').substring(0, 50) + ' – locked, click "Edit" first';
          hint.style.color = '#C62828';
        } else {
          hint.textContent = '✓ Target field: ' + String(lbl || '?').substring(0, 50) + (pinned ? ' (pinned)' : ' (auto)');
          hint.style.color = '#1D9E75';
        }
      } catch(e) {
        hint.textContent = '✓ Target field detected (iframe)';
        hint.style.color = '#1D9E75';
      }
    } else {
      hint.textContent = '⚠ No field selected – click a target field button or click a text field in the portal';
      hint.style.color = '#B4780D';
    }
  }, 500);

  render();
}

function pill(label, active, cb, small) {
  const b = document.createElement('button');
  b.textContent = label;
  b.style.cssText = `padding:${small?'3px 8px':'5px 11px'};border-radius:3px;border:1px solid ${active?'#CE1126':'#D0D0D0'};background:${active?'#CE1126':'#FFFFFF'};color:${active?'#FFFFFF':'#454545'};font-size:${small?'10px':'11px'};cursor:pointer;white-space:nowrap;font-family:Arial,Helvetica,sans-serif;font-weight:${active?'600':'400'};`;
  // CRITICAL: prevent mousedown so SAP field keeps focus when clicking filters
  b.addEventListener('mousedown', e => e.preventDefault());
  b.addEventListener('click', cb);
  return b;
}

function renderCats() {
  const c = document.getElementById('sram-cats'); if (!c) return;
  c.innerHTML = '';
  c.appendChild(pill('All', state.cat==='all', ()=>{ state.cat='all'; state.type='all'; render(); }));
  CATS.forEach(cat => c.appendChild(pill(cat, state.cat===cat, ()=>{ state.cat=cat; state.type='all'; render(); }, true)));
}

function renderTypes() {
  const c = document.getElementById('sram-types'); if (!c) return;
  c.innerHTML = '';
  const types = getTypes(); if (!types.length) return;
  c.appendChild(pill('All Types', state.type==='all', ()=>{ state.type='all'; render(); }, true));
  types.forEach(t => c.appendChild(pill(t, state.type===t, ()=>{ state.type=t; render(); }, true)));
}

// ── Tooltip for truncated headings ──────
function ensureTooltip() {
  let tip = document.getElementById('sram-tooltip');
  if (!tip) {
    tip = document.createElement('div');
    tip.id = 'sram-tooltip';
    tip.style.cssText = 'position:fixed;z-index:2147483647;background:#312929;color:#FFFFFF;padding:7px 11px;border-radius:4px;font-size:12px;font-family:Arial,Helvetica,sans-serif;max-width:340px;box-shadow:0 4px 16px rgba(0,0,0,0.28);pointer-events:none;display:none;line-height:1.45;white-space:normal;word-break:break-word;';
    document.body.appendChild(tip);
  }
  return tip;
}

function showTooltip(el, text) {
  const tip = ensureTooltip();
  tip.textContent = text;
  tip.style.display = 'block';
  const rect = el.getBoundingClientRect();
  let top = rect.top - tip.offsetHeight - 8;
  if (top < 4) top = rect.bottom + 8; // not enough room above -> show below
  let left = rect.left;
  const maxLeft = window.innerWidth - tip.offsetWidth - 8;
  if (left > maxLeft) left = Math.max(4, maxLeft);
  tip.style.top = top + 'px';
  tip.style.left = left + 'px';
}

function hideTooltip() {
  const tip = document.getElementById('sram-tooltip');
  if (tip) tip.style.display = 'none';
}

function renderResults() {
  const c = document.getElementById('sram-results'); if (!c) return;
  hideTooltip();
  c.innerHTML = '';
  const items = getItems();
  if (!items.length) {
    c.innerHTML = '<div style="color:#8A8A8A;text-align:center;padding:40px;font-size:12px;">No texts found</div>';
    return;
  }
  items.forEach(item => {
    const isOpen = state.open === item.id;
    const card = document.createElement('div');
    card.style.cssText = `background:#FFFFFF;border:1px solid ${isOpen?'#CE1126':'#E5E5E5'};border-radius:4px;margin-bottom:6px;overflow:hidden;`;

    const hdr = document.createElement('div');
    hdr.style.cssText = 'padding:9px 11px;cursor:pointer;display:flex;align-items:center;gap:8px;user-select:none;background:#FAFAFA;';
    hdr.innerHTML = `<span style="font-size:9px;text-transform:uppercase;letter-spacing:0.05em;color:#8A8A8A;font-family:Arial,Helvetica,sans-serif;white-space:nowrap;flex-shrink:0;">${esc(item.type||'')}</span><span class="sram-item-heading" style="font-size:12.5px;font-weight:600;color:#312929;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(item.heading)}</span><span style="color:#B0B0B0;font-size:11px;">${isOpen?'▲':'▼'}</span>`;
    hdr.addEventListener('mousedown', e => e.preventDefault());
    hdr.addEventListener('click', () => { state.open = isOpen ? null : item.id; renderResults(); });
    const headingSpan = hdr.querySelector('.sram-item-heading');
    if (headingSpan) {
      headingSpan.addEventListener('mouseenter', () => {
        // Only show if the text is actually truncated
        if (headingSpan.scrollWidth > headingSpan.clientWidth) {
          showTooltip(headingSpan, item.heading);
        }
      });
      headingSpan.addEventListener('mouseleave', hideTooltip);
    }
    card.appendChild(hdr);

    if (isOpen) {
      const body = document.createElement('div');
      body.style.cssText = 'padding:0 11px 11px;border-top:1px solid #E5E5E5;background:#FFFFFF;';
      // Heading is already shown as the card title above – here just the plain text content
      // (fallback to "full" if the entry has no separate body text)
      const textOnly = (item.body && item.body.trim()) ? item.body : item.full;

      const pre = document.createElement('div');
      pre.className = 'sram-preview-text';
      pre.style.cssText = 'margin:9px 0;font-size:11.5px;line-height:1.65;color:#454545;white-space:pre-wrap;word-break:break-word;max-height:220px;overflow-y:auto;background:#F7F7F7;padding:10px;border:1px solid #E5E5E5;border-radius:3px;user-select:text;cursor:text;';
      pre.textContent = textOnly;

      const actions = document.createElement('div');
      actions.style.cssText = 'display:flex;gap:6px;margin-top:9px;';

      const btnInsert = document.createElement('button');
      btnInsert.innerHTML = '↳ Insert into field';
      btnInsert.style.cssText = 'flex:1;padding:9px 12px;background:#CC0000;color:#fff;border:none;border-radius:4px;font-size:12px;font-weight:600;cursor:pointer;font-family:Arial,Helvetica,sans-serif;';
      btnInsert.addEventListener('mousedown', e => e.preventDefault()); // Keep SAP field focused

      function showInsertResult(mode) {
        if (mode === 'field') {
          btnInsert.textContent = '✓ Inserted!';
          btnInsert.style.background = '#1D9E75';
        } else if (mode === 'locked') {
          btnInsert.textContent = '🔒 Field locked – click "Edit" first (copied)';
          btnInsert.style.background = '#C62828';
        } else if (mode === 'notfound') {
          btnInsert.textContent = '✗ Correspondence field not found (copied)';
          btnInsert.style.background = '#C62828';
        } else {
          btnInsert.textContent = '✓ In clipboard (Ctrl+V)';
          btnInsert.style.background = '#B4780D';
        }
        setTimeout(() => { btnInsert.innerHTML = '↳ Insert into field'; btnInsert.style.background = '#CC0000'; }, 3500);
      }

      btnInsert.addEventListener('click', () => {
        // Special case Correspondence: automatically (re-)open "Write Message",
        // in case the field is no longer present/visible (e.g. popover closed in the meantime)
        if (getPinnedMode() === 'correspondence') {
          btnInsert.textContent = '⏳ Opening correspondence field…';
          btnInsert.style.background = '#B4780D';
          resolveCorrespondenceField((field) => {
            if (field) {
              setPinnedField(field);
              const mode = insertIntoField(textOnly);
              showInsertResult(mode);
            } else {
              navigator.clipboard.writeText(textOnly).catch(() => {});
              showInsertResult('notfound');
            }
          });
          return;
        }

        const mode = insertIntoField(textOnly);
        showInsertResult(mode);
      });

      const btnCopy = document.createElement('button');
      btnCopy.textContent = 'Copy';
      btnCopy.style.cssText = 'padding:9px 12px;background:#FFFFFF;color:#454545;border:1px solid #D0D0D0;border-radius:4px;font-size:12px;cursor:pointer;font-family:Arial,Helvetica,sans-serif;';
      btnCopy.addEventListener('mousedown', e => e.preventDefault());
      btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(textOnly);
        btnCopy.textContent = '✓ Copied';
        setTimeout(() => { btnCopy.textContent = 'Copy'; }, 2000);
      });

      actions.appendChild(btnInsert); actions.appendChild(btnCopy);
      body.appendChild(pre); body.appendChild(actions);
      card.appendChild(body);
    }
    c.appendChild(card);
  });
}

function render() { renderCats(); renderTypes(); renderResults(); }

// Only create the launcher/panel in the TOP frame.
// iframe instances of this script only do focus tracking (above).
if (IS_TOP_FRAME) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createLauncher);
  } else {
    createLauncher();
  }
}

})();

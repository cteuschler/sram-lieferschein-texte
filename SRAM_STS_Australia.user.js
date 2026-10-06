// ==UserScript==
// @name         SRAM Service Texts AUS V3
// @namespace    https://sram.com
// @version      4.0
// @description  Text Assistant for the SRAM B2B Service Portal – Australia
// @author       SRAM STS Australia
// @match        https://sramllcprodcf.cpp.cfapps.us10.hana.ondemand.com/*
// @match        https://b2b.sram.com/*
// @grant        none
// @all-frames   true
// ==/UserScript==

(function() {
'use strict';

const DATA = {"Fork":[{"id":"Fork_0_1","heading":"200hr Service","body":"200hr service completed in full. Fork tested OK.","full":"200hr Service\n200hr service completed in full. Fork tested OK.","type":"Service Notes"},{"id":"Fork_0_2","heading":"Lower Leg Service","body":"Lower legs serviced with new dust wiper seals. Fork Tested OK.","full":"Lower Leg Service\nLower legs serviced with new dust wiper seals. Fork Tested OK.","type":"Service Notes"},{"id":"Fork_0_3","heading":"Replaced at cost of repair","body":"Fork replaced at cost of repair.","full":"Replaced at cost of repair\nFork replaced at cost of repair.","type":"Service Notes"},{"id":"Fork_0_4","heading":"LSC Only – Explained","body":"Hey Team, please note that this fork has LSC only. This will not make the fork feel \"firmer\". It will only slow the movement of the fork in low-speed compression events. This can be in circumstances such as brake dive, moving body fore / aft on bike.","full":"LSC Only – Explained\nHey Team, please note that this fork has LSC only. This will not make the fork feel \"firmer\". It will only slow the movement of the fork in low-speed compression events. This can be in circumstances such as brake dive, moving body fore / aft on bike.","type":"Service Notes"},{"id":"Fork_0_5","heading":"No Issue Found","body":"Hey Team, this fork has been tested to be functioning as intended with no issue found. Fork returned as is.","full":"No Issue Found\nHey Team, this fork has been tested to be functioning as intended with no issue found. Fork returned as is.","type":"Service Notes"},{"id":"Fork_0_6","heading":"Bushing Play – No Defect","body":"Hey Team, these bushings were checked for excessive play. No defect could be identified. Correct bushing clearance is essential to ensure proper fork function during riding. Fork returned as is.","full":"Bushing Play – No Defect\nHey Team, these bushings were checked for excessive play. No defect could be identified. Correct bushing clearance is essential to ensure proper fork function during riding. Fork returned as is.","type":"Service Notes"},{"id":"Fork_0_7","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"Fork_1_1","heading":"Creaky CSU + Impact Damage","body":"Hey Team, this CSU will be replaced under warranty. However, there is external impact damage to the upper tube that has torn the lower leg bushes and then caused additional wear at the point of damage. If the CSU is replaced without replacing the lower leg assembly, the new CSU will be prematurely worn due to the torn lower leg bushes. We can replace the LL for an additional $XXX, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Creaky CSU + Impact Damage\nHey Team, this CSU will be replaced under warranty. However, there is external impact damage to the upper tube that has torn the lower leg bushes and then caused additional wear at the point of damage. If the CSU is replaced without replacing the lower leg assembly, the new CSU will be prematurely worn due to the torn lower leg bushes. We can replace the LL for an additional $XXX, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_2","heading":"CSU Impact Damage","body":"Hi Team, this fork has damage to the upper tubes that has been caused by an external impact, this has then torn the lower leg bushing as it has passed over the damage, which has then caused excess wear to the upper tube. The CSU and Lower leg assembly require replacement, as the damage will result in loss of performance, leakage of lubricating oil over time, allow contaminants to enter the lower legs, shorter time between service intervals and continual wear at the point of damage. We can replace the CSU & LL for $XXX, please let us know via the correspondence how you would like to proceed. Thanks!","full":"CSU Impact Damage\nHi Team, this fork has damage to the upper tubes that has been caused by an external impact, this has then torn the lower leg bushing as it has passed over the damage, which has then caused excess wear to the upper tube. The CSU and Lower leg assembly require replacement, as the damage will result in loss of performance, leakage of lubricating oil over time, allow contaminants to enter the lower legs, shorter time between service intervals and continual wear at the point of damage. We can replace the CSU & LL for $XXX, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_3","heading":"CSU / LL Damage + Service (or Service Only)","body":"Hi Team, this fork has damage to the upper tubes that has been caused by an external impact, this has then torn the lower leg bushing as it has passed over the damage, which has then caused excess wear to the upper tube. The CSU and Lower leg assembly require replacement, as the damage will result in loss of performance, leakage of lubricating oil over time, allow contaminants to enter the lower legs, shorter time between service intervals and continual wear at the point of damage. We can replace the CSU, LL and service this fork for $XXX. Alternatively, we can just service this fork without replacing these parts, with the understanding that the damage will worsen over time and lead to an ongoing decrease in performance. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"CSU / LL Damage + Service (or Service Only)\nHi Team, this fork has damage to the upper tubes that has been caused by an external impact, this has then torn the lower leg bushing as it has passed over the damage, which has then caused excess wear to the upper tube. The CSU and Lower leg assembly require replacement, as the damage will result in loss of performance, leakage of lubricating oil over time, allow contaminants to enter the lower legs, shorter time between service intervals and continual wear at the point of damage. We can replace the CSU, LL and service this fork for $XXX. Alternatively, we can just service this fork without replacing these parts, with the understanding that the damage will worsen over time and lead to an ongoing decrease in performance. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_4","heading":"Service + Extra Parts","body":"Hey Team, this fork has damage to the XXXX shaft. We can supply a replacement XXXX and service this fork in full for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Service + Extra Parts\nHey Team, this fork has damage to the XXXX shaft. We can supply a replacement XXXX and service this fork in full for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_5","heading":"CSU – Out of Stock ETA","body":"Hey Team, we are currently sold out of replacement CSUs and do not have a solid ETA. Please hold off on returning the fork unless you are happy for the fork to wait at STS until the parts become available. We will contact you when stock arrives.","full":"CSU – Out of Stock ETA\nHey Team, we are currently sold out of replacement CSUs and do not have a solid ETA. Please hold off on returning the fork unless you are happy for the fork to wait at STS until the parts become available. We will contact you when stock arrives.","type":"Quote"},{"id":"Fork_1_6","heading":"Damper Shaft Wear","body":"Hey Team, this fork has wear forming on the damper shaft. This will result in oil loss during use and inconsistent damper performance. We can replace the damper for $XXX. Please let us know via the correspondence with how you would like to proceed.","full":"Damper Shaft Wear\nHey Team, this fork has wear forming on the damper shaft. This will result in oil loss during use and inconsistent damper performance. We can replace the damper for $XXX. Please let us know via the correspondence with how you would like to proceed.","type":"Quote"},{"id":"Fork_1_7","heading":"Replacement Fork","body":"Hey Team, this fork is damaged beyond repair. We can replace this fork with a XXXX for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Replacement Fork\nHey Team, this fork is damaged beyond repair. We can replace this fork with a XXXX for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_8","heading":"Damaged Brake Mount","body":"Hey Team, the brake mount thread in the lower leg is damaged. This is not a manufacturing defect, but the result of external force or incorrect installation. If bolts with insufficient thread engagement are used, the brake can come loose, and the threads may be damaged. Excessive torque can also damage the fork. Excessive torque combined with rotational shear forces can cause the brake mount to break. These lower legs require replacement, we can replace these LL for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Brake Mount\nHey Team, the brake mount thread in the lower leg is damaged. This is not a manufacturing defect, but the result of external force or incorrect installation. If bolts with insufficient thread engagement are used, the brake can come loose, and the threads may be damaged. Excessive torque can also damage the fork. Excessive torque combined with rotational shear forces can cause the brake mount to break. These lower legs require replacement, we can replace these LL for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Fork_1_9","heading":"CSU – OOS Alternative Option","body":"This CSU will be replaced at no charge. Although we are currently out of stock of a direct replacement, we can replace this CSU with a compatible CSU that matches all specs except it will have a 63od crown (currently 59od). This is purely a visual / aesthetic change and will not affect ride characteristics. Please let us know how you would like to proceed. Thanks!","full":"CSU – OOS Alternative Option\nThis CSU will be replaced at no charge. Although we are currently out of stock of a direct replacement, we can replace this CSU with a compatible CSU that matches all specs except it will have a 63od crown (currently 59od). This is purely a visual / aesthetic change and will not affect ride characteristics. Please let us know how you would like to proceed. Thanks!","type":"Quote"}],"Rear Shock":[{"id":"RearShock_0_1","heading":"200hr Service","body":"200hr service completed in full. Shock tested OK.","full":"200hr Service\n200hr service completed in full. Shock tested OK.","type":"Service Notes"},{"id":"RearShock_0_2","heading":"200hr Service + New Damper Body","body":"200hr service completed in full with new damper body. Shock tested and all functions working as intended.","full":"200hr Service + New Damper Body\n200hr service completed in full with new damper body. Shock tested and all functions working as intended.","type":"Service Notes"},{"id":"RearShock_0_3","heading":"Replaced at Cost of Service","body":"Shock replaced at cost of service.","full":"Replaced at Cost of Service\nShock replaced at cost of service.","type":"Service Notes"},{"id":"RearShock_0_4","heading":"\"Leaking Oil\" on Damper Body","body":"Hey Team, suspension oil may appear on the damper body during or after use. This is normal lubrication necessary to the performance of the shock and is not a sign of decreased performance. Wipe off extra oil on the damper body or damper shaft to keep the system clean and perform regular service to ensure adequate lubrication oil remains in the system. Please let us know if you have any questions.","full":"\"Leaking Oil\" on Damper Body\nHey Team, suspension oil may appear on the damper body during or after use. This is normal lubrication necessary to the performance of the shock and is not a sign of decreased performance. Wipe off extra oil on the damper body or damper shaft to keep the system clean and perform regular service to ensure adequate lubrication oil remains in the system. Please let us know if you have any questions.","type":"Service Notes"},{"id":"RearShock_0_5","heading":"\"Leaking Oil\" on Damper Body – FOC Air Can Service","body":"Shock tested to be working as intended with no damper oil loss. FOC air can service performed as goodwill. Please note, suspension oil may appear on the damper body during or after use. This is normal lubrication necessary to the performance of the shock and is not a sign of decreased performance. Wipe off extra oil on the damper body or damper shaft to keep the system clean and perform regular service to ensure adequate lubrication oil remains in the system. Please let us know if you have any questions.","full":"\"Leaking Oil\" on Damper Body – FOC Air Can Service\nShock tested to be working as intended with no damper oil loss. FOC air can service performed as goodwill. Please note, suspension oil may appear on the damper body during or after use. This is normal lubrication necessary to the performance of the shock and is not a sign of decreased performance. Wipe off extra oil on the damper body or damper shaft to keep the system clean and perform regular service to ensure adequate lubrication oil remains in the system. Please let us know if you have any questions.","type":"Service Notes"},{"id":"RearShock_0_6","heading":"No Issue Found","body":"Hey Team, this shock has been tested to be functioning as intended with no issue found. Shock returned as is.","full":"No Issue Found\nHey Team, this shock has been tested to be functioning as intended with no issue found. Shock returned as is.","type":"Service Notes"},{"id":"RearShock_0_7","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"RearShock_1_1","heading":"Air Leak – External Impact","body":"Hey Team, this shock has been tested to be free from air loss whilst static, however there is damage to the damper body that is a result of an external impact and will allow air to leak from the shock as it is cycled through its travel.\nThis shock will require a full service to replace the damaged damper body. We can service and repair this shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Air Leak – External Impact\nHey Team, this shock has been tested to be free from air loss whilst static, however there is damage to the damper body that is a result of an external impact and will allow air to leak from the shock as it is cycled through its travel.\nThis shock will require a full service to replace the damaged damper body. We can service and repair this shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_2","heading":"Damaged Damper Shaft (Coil)","body":"Hey Team, this shock has damage to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Damper Shaft (Coil)\nHey Team, this shock has damage to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_3","heading":"Damaged Damper Body and Shaft","body":"Hey Team, this shock has damage to the damper body that has been caused by an external impact, this will allow air to escape as the shock is cycled. Additionally, this shock has been excessively bottomed out, which has damaged the bottom out bumper and allowed the bottom out plate to freely move along the damper shaft. This has caused damage to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Damper Body and Shaft\nHey Team, this shock has damage to the damper body that has been caused by an external impact, this will allow air to escape as the shock is cycled. Additionally, this shock has been excessively bottomed out, which has damaged the bottom out bumper and allowed the bottom out plate to freely move along the damper shaft. This has caused damage to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_4","heading":"Worn Damper Body and Shaft","body":"Hey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. There is also wear to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Worn Damper Body and Shaft\nHey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. There is also wear to the damper shaft which will allow air to enter the system and oil to escape. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_5","heading":"Worn Damper Body and Air Can","body":"Hey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Worn Damper Body and Air Can\nHey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_6","heading":"Worn Damper Body, Shaft and Air Can","body":"Hey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. There is also wear to the damper shaft which will allow air to enter the system and oil to escape. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Worn Damper Body, Shaft and Air Can\nHey Team, this shock has wear to the damper body, this will allow air to escape as the shock is cycled. There is also wear to the damper shaft which will allow air to enter the system and oil to escape. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_7","heading":"Damaged Damper Body, Shaft and Worn Air Can","body":"Hey Team, this shock has damage to the damper body from external impacts, this will allow air to escape as the shock is cycled. There is also damage to the damper shaft which will allow air to enter the system and oil to escape. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Damper Body, Shaft and Worn Air Can\nHey Team, this shock has damage to the damper body from external impacts, this will allow air to escape as the shock is cycled. There is also damage to the damper shaft which will allow air to enter the system and oil to escape. Alongside this, there is wear to the air can which will allow air to bypass the main seal, resulting in inconsistent performance. We can service and repair this shock for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_8","heading":"Damaged Beyond Repair","body":"Hey Team, unfortunately, this shock is damaged beyond repair. We can supply a replacement shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Damaged Beyond Repair\nHey Team, unfortunately, this shock is damaged beyond repair. We can supply a replacement shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"RearShock_1_9","heading":"Incorrect Grease","body":"Hey Team, this shock shows signs of being serviced with the incorrect grease, and/or not enough grease and lubricating fluid in the air can. There are deposits of the incorrect grease in the air can assembly. If the incorrect grease is used, the heat from the shock causes the grease to liquify and weep through the main seal, causing the air can to be depleted of grease and lubrication, then leading to premature wear to the dynamic surfaces. This shock has wear forming to the damper body and will require the damper body to be replaced. We can service and repair this shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Incorrect Grease\nHey Team, this shock shows signs of being serviced with the incorrect grease, and/or not enough grease and lubricating fluid in the air can. There are deposits of the incorrect grease in the air can assembly. If the incorrect grease is used, the heat from the shock causes the grease to liquify and weep through the main seal, causing the air can to be depleted of grease and lubrication, then leading to premature wear to the dynamic surfaces. This shock has wear forming to the damper body and will require the damper body to be replaced. We can service and repair this shock for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"}],"Reverb Seatpost":[{"id":"Reverb_0_1","heading":"600hr Service","body":"600hr service completed in full. Reverb tested OK.","full":"600hr Service\n600hr service completed in full. Reverb tested OK.","type":"Service Notes"},{"id":"Reverb_0_2","heading":"Replaced at Cost of Service","body":"Reverb replaced at cost of service.","full":"Replaced at Cost of Service\nReverb replaced at cost of service.","type":"Service Notes"},{"id":"Reverb_0_3","heading":"B1 AXS Clicking – Cleaned","body":"Cleaned and re-lubricated wiper seal / bushing at no charge as a goodwill gesture.\nPlease note, this seatpost may make an audible noise upon direction change, this is not a cause for concern. Regular maintenance as per the service intervals will help reduce this noise.","full":"B1 AXS Clicking – Cleaned\nCleaned and re-lubricated wiper seal / bushing at no charge as a goodwill gesture.\nPlease note, this seatpost may make an audible noise upon direction change, this is not a cause for concern. Regular maintenance as per the service intervals will help reduce this noise.","type":"Service Notes"},{"id":"Reverb_0_4","heading":"No Issue Found","body":"Hey Team, This Reverb has been tested to be working as intended with no manufacturing defect present. Reverb returned as is.","full":"No Issue Found\nHey Team, This Reverb has been tested to be working as intended with no manufacturing defect present. Reverb returned as is.","type":"Service Notes"},{"id":"Reverb_0_5","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"Reverb_1_1","heading":"Loose Collar – A Series AXS","body":"Hey Team, this seatpost has been ridden with a loose wiper collar, which has damaged the upper post. The upper post is not a spare part and therefore the seatpost requires replacement. We can supply a replacement seatpost for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Loose Collar – A Series AXS\nHey Team, this seatpost has been ridden with a loose wiper collar, which has damaged the upper post. The upper post is not a spare part and therefore the seatpost requires replacement. We can supply a replacement seatpost for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Reverb_1_2","heading":"Loose Collar – Stealth (AXS Replacement)","body":"Hey Team, this seatpost has been ridden with a loose wiper collar, which has damaged the upper post. The upper post is not a spare part and therefore the seatpost requires replacement. We no longer carry the Reverb Stealth seatpost. We can supply a replacement Reverb AXS B1 seatpost and POD controller for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!\n\nSRR311       00.3018.405.004    E AM EC AXS POD D1 W/CLAMP (L/R)","full":"Loose Collar – Stealth (AXS Replacement)\nHey Team, this seatpost has been ridden with a loose wiper collar, which has damaged the upper post. The upper post is not a spare part and therefore the seatpost requires replacement. We no longer carry the Reverb Stealth seatpost. We can supply a replacement Reverb AXS B1 seatpost and POD controller for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!\n\nSRR311       00.3018.405.004    E AM EC AXS POD D1 W/CLAMP (L/R)","type":"Quote"},{"id":"Reverb_1_3","heading":"B1 AXS Upper Post Damage","body":"Hey Team, this seatpost has damage to the upper post. We do not hold the upper posts for the B1 Reverb AXS. We can supply a replacement seatpost at the cost of service and required parts for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!\nRAP 50= $220+\nRAP 25= $240+","full":"B1 AXS Upper Post Damage\nHey Team, this seatpost has damage to the upper post. We do not hold the upper posts for the B1 Reverb AXS. We can supply a replacement seatpost at the cost of service and required parts for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!\nRAP 50= $220+\nRAP 25= $240+","type":"Quote"},{"id":"Reverb_1_4","heading":"Reverb Squish / Active Ride","body":"Hey Team, when the Reverb is not at full top out, the reverb is in \"ActiveRide\". This technology provides slight, built-in compliance/suspension when the seat is partially dropped. This is a feature of this Reverb and not a cause for concern.","full":"Reverb Squish / Active Ride\nHey Team, when the Reverb is not at full top out, the reverb is in \"ActiveRide\". This technology provides slight, built-in compliance/suspension when the seat is partially dropped. This is a feature of this Reverb and not a cause for concern.","type":"Quote"},{"id":"Reverb_1_5","heading":"Bent Upper Post","body":"Hey Team, the upper post of this Reverb has been bent. We are unable to service or repair this post, we can offer a replacement Reverb AXS B1 for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Bent Upper Post\nHey Team, the upper post of this Reverb has been bent. We are unable to service or repair this post, we can offer a replacement Reverb AXS B1 for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Reverb_1_6","heading":"Serviced with Wrong Grease/Oil – AXS Replacement","body":"Hey Team, This Reverb has been serviced elsewhere with the incorrect grease/oil. There has been an extreme oil bypass and we therefore cannot reliably service this Reverb. As a gesture of goodwill, we can replace this reverb with a Reverb AXS B2 with a POD remote for $575+gst. Alternatively, we can return this Reverb as is. Please let us know via the correspondence how you would like to proceed. Thanks!\n\nSRR311       00.3018.405.004    E AM EC AXS POD D1 W/CLAMP (L/R)","full":"Serviced with Wrong Grease/Oil – AXS Replacement\nHey Team, This Reverb has been serviced elsewhere with the incorrect grease/oil. There has been an extreme oil bypass and we therefore cannot reliably service this Reverb. As a gesture of goodwill, we can replace this reverb with a Reverb AXS B2 with a POD remote for $575+gst. Alternatively, we can return this Reverb as is. Please let us know via the correspondence how you would like to proceed. Thanks!\n\nSRR311       00.3018.405.004    E AM EC AXS POD D1 W/CLAMP (L/R)","type":"Quote"}],"Drivetrain":[{"id":"Drivetrain_0_1","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"Drivetrain_0_2","heading":"No Issue Found – Derailleur","body":"Hey Team, This derailleur has been tested to be working as intended with no manufacturing defect present. We have returned this as is.","full":"No Issue Found – Derailleur\nHey Team, This derailleur has been tested to be working as intended with no manufacturing defect present. We have returned this as is.","type":"Service Notes"},{"id":"Drivetrain_0_3","heading":"No Issue Found – Cassette","body":"Hey Team, This cassette has been tested to be functioning as intended. We have been unable to replicate the fault described. This cassette has been returned as is.","full":"No Issue Found – Cassette\nHey Team, This cassette has been tested to be functioning as intended. We have been unable to replicate the fault described. This cassette has been returned as is.","type":"Service Notes"},{"id":"Drivetrain_1_1","heading":"FD/RD Requires Replacement","body":"Hey Team, this derailleur requires replacement. We can supply a replacement derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"FD/RD Requires Replacement\nHey Team, this derailleur requires replacement. We can supply a replacement derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_2","heading":"FD/RD Electronics Not Repairable / Replaceable","body":"Hey Team, the electronics in this derailleur are not repairable / replaceable. We can replace this derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"FD/RD Electronics Not Repairable / Replaceable\nHey Team, the electronics in this derailleur are not repairable / replaceable. We can replace this derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_3","heading":"FD/RD Damaged Beyond Repair","body":"Hey Team, this derailleur is damaged beyond repair and as such requires replacement. We can replace this derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"FD/RD Damaged Beyond Repair\nHey Team, this derailleur is damaged beyond repair and as such requires replacement. We can replace this derailleur for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_4","heading":"GXP Discontinued","body":"Hey Team, unfortunately this unit is beyond repair. GXP and BB30 spiders have been discontinued, and the only option would be a complete DUB system. Please use the documents below to find the part numbers of a suitable replacement. Please reply with the part numbers for all parts you require and we will check availability and price up a crash replacement deal.\nhttps://sram-riderexperience.typeform.com/to/N6p3v4Uf?typeform-source=www.sram.com\nhttps://www.sram.com/globalassets/document-hierarchy/compatibility-map/road/dub-choose-a-road-bottom-bracket-compatibility-map.pdf","full":"GXP Discontinued\nHey Team, unfortunately this unit is beyond repair. GXP and BB30 spiders have been discontinued, and the only option would be a complete DUB system. Please use the documents below to find the part numbers of a suitable replacement. Please reply with the part numbers for all parts you require and we will check availability and price up a crash replacement deal.\nhttps://sram-riderexperience.typeform.com/to/N6p3v4Uf?typeform-source=www.sram.com\nhttps://www.sram.com/globalassets/document-hierarchy/compatibility-map/road/dub-choose-a-road-bottom-bracket-compatibility-map.pdf","type":"Quote"},{"id":"Drivetrain_1_5","heading":"Chain Drop Damage – Power Meter","body":"Hey Team, this Power Meter shows signs of external impact. This damage has resulted in damage to the strain gauges which are built into the chainring spider. As such, the power meter requires replacement. We can replace this Power Meter for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Chain Drop Damage – Power Meter\nHey Team, this Power Meter shows signs of external impact. This damage has resulted in damage to the strain gauges which are built into the chainring spider. As such, the power meter requires replacement. We can replace this Power Meter for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_6","heading":"Crank Pedal Thread Stripped","body":"Hey Team, this damage has been the result of the bike being ridden whilst the pedals were loose in the crank. As a result, this is not a manufacturing defect. We can replace this crankset for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Crank Pedal Thread Stripped\nHey Team, this damage has been the result of the bike being ridden whilst the pedals were loose in the crank. As a result, this is not a manufacturing defect. We can replace this crankset for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_7","heading":".fit File Request","body":"Hey Team, can you please upload a .fit file for this power meter? This can be found in the ride data recorded by the head unit or app used to record the ride. If you're unsure how to export this data, search in Google \"How to get .fit file from power meter\" and locate the info for your head unit / app. Please send us a message via the correspondence when this has been uploaded. Thanks!","full":".fit File Request\nHey Team, can you please upload a .fit file for this power meter? This can be found in the ride data recorded by the head unit or app used to record the ride. If you're unsure how to export this data, search in Google \"How to get .fit file from power meter\" and locate the info for your head unit / app. Please send us a message via the correspondence when this has been uploaded. Thanks!","type":"Quote"},{"id":"Drivetrain_1_8","heading":"Trade-In – Power Meter / Chainring","body":"Hey Team, we can replace this power meter / chainring unit for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","full":"Trade-In – Power Meter / Chainring\nHey Team, we can replace this power meter / chainring unit for $XXX+gst, please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Drivetrain_1_9","heading":"E-Bike Cassette Wear","body":"Hey Team, this cassette shows significant wear in the lower gear range, while the upper range is nearly unused. For improved service life, we recommend using as much of the cassette's gear range as possible and adjusting the front chainring size accordingly. As a gesture of goodwill, we can replace this cassette, as a once off, for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"E-Bike Cassette Wear\nHey Team, this cassette shows significant wear in the lower gear range, while the upper range is nearly unused. For improved service life, we recommend using as much of the cassette's gear range as possible and adjusting the front chainring size accordingly. As a gesture of goodwill, we can replace this cassette, as a once off, for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"}],"Brakes":[{"id":"Brakes_0_1","heading":"Battery Contacts Damaged – Fixed","body":"Battery contacts were found to be damaged due to incorrect orientation of the battery cover during installation. Re-aligned battery contacts, tested to be functioning as intended.","full":"Battery Contacts Damaged – Fixed\nBattery contacts were found to be damaged due to incorrect orientation of the battery cover during installation. Re-aligned battery contacts, tested to be functioning as intended.","type":"Service Notes"},{"id":"Brakes_0_2","heading":"Leaking at Caliper Halves – Normal","body":"Hey Team, It is normal for these brakes to show residual oil left over from the caliper assembly process and is unlikely to be leaking from the brake system.\nWhen the lever is pulled, the caliper halves will flex, causing any residual assembly oil/grease on the exterior of the caliper seals to appear at the seam. This is not a cause for concern.\nIf the brake is not experiencing any loss of performance, please wipe away this residual oil with a clean shop towel and continue with the installation process as per the user manual.","full":"Leaking at Caliper Halves – Normal\nHey Team, It is normal for these brakes to show residual oil left over from the caliper assembly process and is unlikely to be leaking from the brake system.\nWhen the lever is pulled, the caliper halves will flex, causing any residual assembly oil/grease on the exterior of the caliper seals to appear at the seam. This is not a cause for concern.\nIf the brake is not experiencing any loss of performance, please wipe away this residual oil with a clean shop towel and continue with the installation process as per the user manual.","type":"Service Notes"},{"id":"Brakes_0_3","heading":"Check If Maven Lever Is Leaking Before Returning","body":"Hey Team, this has been approved for return. However, there is a quick way to check if the lever is actually leaking fluid, before returning the lever to us.\n\nTo determine whether there is a recurring oil leak, advise the customer as follows:\n\n1. Tighten the compression nut to 8 Nm if the oily area is near the compression fitting\n2. Clean the brake thoroughly with isopropyl alcohol\n3. Set the lever reach fully outward (note the number of clicks or measure the original reach)\n4. With the bike in a work stand, pull the lever firmly with two fingers for 2–3 seconds, up to 5 times (Do not pull the lever fully to the handlebar)\n5. Clean the brake again with isopropyl alcohol\n6. Repeat step 4\n\nIf oil is still leaking, please get this lever returned to us. If you are in doubt, please do not hesitate in getting this one back to us for assessment.\n\nThanks!","full":"Check If Maven Lever Is Leaking Before Returning\nHey Team, this has been approved for return. However, there is a quick way to check if the lever is actually leaking fluid, before returning the lever to us.\n\nTo determine whether there is a recurring oil leak, advise the customer as follows:\n\n1. Tighten the compression nut to 8 Nm if the oily area is near the compression fitting\n2. Clean the brake thoroughly with isopropyl alcohol\n3. Set the lever reach fully outward (note the number of clicks or measure the original reach)\n4. With the bike in a work stand, pull the lever firmly with two fingers for 2–3 seconds, up to 5 times (Do not pull the lever fully to the handlebar)\n5. Clean the brake again with isopropyl alcohol\n6. Repeat step 4\n\nIf oil is still leaking, please get this lever returned to us. If you are in doubt, please do not hesitate in getting this one back to us for assessment.\n\nThanks!","type":"Service Notes"},{"id":"Brakes_0_4","heading":"Brake Tested OK – Loose Compression Nut","body":"Hey Team, we have tested this brake system to be working as intended and free from manufacturing defect. However, the compression nut was loose which will lead to inconsistent performance. Please note the compression nuts need to be torqued to 8Nm. Brake returned as is.","full":"Brake Tested OK – Loose Compression Nut\nHey Team, we have tested this brake system to be working as intended and free from manufacturing defect. However, the compression nut was loose which will lead to inconsistent performance. Please note the compression nuts need to be torqued to 8Nm. Brake returned as is.","type":"Service Notes"},{"id":"Brakes_0_5","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"},{"id":"Brakes_1_1","heading":"Guide / Level Paid Replacement","body":"Hey Team, we are no longer able to offer support on early model Guide / Level brakes. Please return the levers only if you would like to proceed with a charged replacement of the levers, noting that levers will only be replaced with the same level of brake only. Please see the pricing below:\nGuide R / Level T - G2 R @$40+\nGuide RS / Level TL - G2 RS @$50+\nGuide RSC / Level TLM - G2 RSC @$60+\nGuide ULT / Level UL - G2 ULT @$85+","full":"Guide / Level Paid Replacement\nHey Team, we are no longer able to offer support on early model Guide / Level brakes. Please return the levers only if you would like to proceed with a charged replacement of the levers, noting that levers will only be replaced with the same level of brake only. Please see the pricing below:\nGuide R / Level T - G2 R @$40+\nGuide RS / Level TL - G2 RS @$50+\nGuide RSC / Level TLM - G2 RSC @$60+\nGuide ULT / Level UL - G2 ULT @$85+","type":"Quote"},{"id":"Brakes_1_2","heading":"Contaminated Brake System","body":"Hey Team, this brake has been contaminated due to being bled with the incorrect fluid, causing the seals to swell and as a result could potentially lead to brake failure. This issue is not related to a manufacturing defect and has occurred post-factory release. The entire brake system (lever, line, and caliper) needs to be replaced. We also recommend checking the other brake to ensure it hasn't been bled with the incorrect fluid as well. If it has, we will need this complete brake returned before we can supply a replacement. Upon return of the complete brake, we can replace this complete brake for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Contaminated Brake System\nHey Team, this brake has been contaminated due to being bled with the incorrect fluid, causing the seals to swell and as a result could potentially lead to brake failure. This issue is not related to a manufacturing defect and has occurred post-factory release. The entire brake system (lever, line, and caliper) needs to be replaced. We also recommend checking the other brake to ensure it hasn't been bled with the incorrect fluid as well. If it has, we will need this complete brake returned before we can supply a replacement. Upon return of the complete brake, we can replace this complete brake for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Brakes_1_3","heading":"Battery Contacts Damaged – SBL","body":"Hey Team, the battery contacts in this SBL have been damaged due to incorrect fitment of the battery. We can replace the Lever Assembly / Electronics Pod for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Battery Contacts Damaged – SBL\nHey Team, the battery contacts in this SBL have been damaged due to incorrect fitment of the battery. We can replace the Lever Assembly / Electronics Pod for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Brakes_1_4","heading":"Stripped Bleed Port – Caliper","body":"Hey Team, the bleed port in this caliper has been stripped due to being installed beyond its limit. This is not a manufacturing defect. We can replace this caliper for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Stripped Bleed Port – Caliper\nHey Team, the bleed port in this caliper has been stripped due to being installed beyond its limit. This is not a manufacturing defect. We can replace this caliper for $XXX+gst. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"},{"id":"Brakes_1_5","heading":"Lever Body Cracked – Overtorqued","body":"Hey Team, thanks for getting this order back to us. The lever body has cracked due to being overtorqued. This is not a manufacturing defect. We can replace this lever for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","full":"Lever Body Cracked – Overtorqued\nHey Team, thanks for getting this order back to us. The lever body has cracked due to being overtorqued. This is not a manufacturing defect. We can replace this lever for $XXX. Please let us know via the correspondence how you would like to proceed. Thanks!","type":"Quote"}],"Eagle Powertrain":[{"id":"PT_0_1","heading":"How To: Run Diagnostics","body":"Please log in to the SRAM warranty and B2B portal and hover your cursor over the \"Eagle Powertrain\" tab at the top of the page, then click on \"Diagnostic Tool Software\". This software will be downloaded to your computer. Once downloaded, open the file and it will load up a window titled \"SRAM Powertrain Dealer Tool\", then simply log in using your B2B login credentials. Once the bike is connected to your computer, you will be able to run the diagnostics report.\n\nRunning a diagnostics report is super straightforward; the diagnostics tool plugs directly into the battery at the base and the other end into the USB port in a desktop computer / laptop.","full":"How To: Run Diagnostics\nPlease log in to the SRAM warranty and B2B portal and hover your cursor over the \"Eagle Powertrain\" tab at the top of the page, then click on \"Diagnostic Tool Software\". This software will be downloaded to your computer. Once downloaded, open the file and it will load up a window titled \"SRAM Powertrain Dealer Tool\", then simply log in using your B2B login credentials. Once the bike is connected to your computer, you will be able to run the diagnostics report.\n\nRunning a diagnostics report is super straightforward; the diagnostics tool plugs directly into the battery at the base and the other end into the USB port in a desktop computer / laptop.","type":"Troubleshooting"},{"id":"PT_0_2","heading":"Battery Error – Pre Warranty Lodgment (No Stock)","body":"As the battery is currently in a Battery Failure or Safety Protection state, we'll need it back to our facility for further assessment. Please create a warranty return in the warranty/service b2b.\n\nAt the moment, we don't have any replacement batteries available. We are working on securing more stock, but unfortunately, we don't have an ETA just yet. When you can, please box the battery securely and return it to us. Once it's back here, we'll do everything we can to pull it out of this state, but we may not be able to.\n\nWith the order created in the warranty / B2B portal, we can backorder a battery and provide you with updates on an ETA as we get them.","full":"Battery Error – Pre Warranty Lodgment (No Stock)\nAs the battery is currently in a Battery Failure or Safety Protection state, we'll need it back to our facility for further assessment. Please create a warranty return in the warranty/service b2b.\n\nAt the moment, we don't have any replacement batteries available. We are working on securing more stock, but unfortunately, we don't have an ETA just yet. When you can, please box the battery securely and return it to us. Once it's back here, we'll do everything we can to pull it out of this state, but we may not be able to.\n\nWith the order created in the warranty / B2B portal, we can backorder a battery and provide you with updates on an ETA as we get them.","type":"Troubleshooting"},{"id":"PT_0_3","heading":"Battery Error – Received (No Stock)","body":"Hey Team, at the moment we do not have any replacement batteries available. We are working on securing more stock, but unfortunately, we don't have an ETA just yet. We have placed a backorder for a replacement battery to be sent when stock arrives, we will keep you updated. Thanks!","full":"Battery Error – Received (No Stock)\nHey Team, at the moment we do not have any replacement batteries available. We are working on securing more stock, but unfortunately, we don't have an ETA just yet. We have placed a backorder for a replacement battery to be sent when stock arrives, we will keep you updated. Thanks!","type":"Troubleshooting"}],"Wheels":[{"id":"Wheels_0_1","heading":"Cognition Oil Only","body":"Hey Team, grease has been applied to the clutch and spring assembly. It is crucial that only Cognition oil is used in the clutch. Please refer to the Cognition hub service manual.\nhttps://www.sram.com/globalassets/document-hierarchy/service-manuals/zipp/wheels-and-hubs/zipp-cognition-v2-hubs-service-manual.pdf","full":"Cognition Oil Only\nHey Team, grease has been applied to the clutch and spring assembly. It is crucial that only Cognition oil is used in the clutch. Please refer to the Cognition hub service manual.\nhttps://www.sram.com/globalassets/document-hierarchy/service-manuals/zipp/wheels-and-hubs/zipp-cognition-v2-hubs-service-manual.pdf","type":"Service Notes"},{"id":"Wheels_0_2","heading":"Spokes and Nipples – Wear Item","body":"Hey Team, Spokes and nipples are classed as wear and tear items and not covered under warranty.\nWe would likely quote to replace the spokes, nipples and washers as a paid service when returned to us for assessment. Thanks.","full":"Spokes and Nipples – Wear Item\nHey Team, Spokes and nipples are classed as wear and tear items and not covered under warranty.\nWe would likely quote to replace the spokes, nipples and washers as a paid service when returned to us for assessment. Thanks.","type":"Service Notes"},{"id":"Wheels_0_3","heading":"Hub Serviced – Bearings Only","body":"Hub serviced in full with new bearings. Function tested OK.","full":"Hub Serviced – Bearings Only\nHub serviced in full with new bearings. Function tested OK.","type":"Service Notes"},{"id":"Wheels_0_4","heading":"Hub Serviced – Bearings and Axle","body":"Hub serviced in full with new bearings and hub axle. Function tested OK.","full":"Hub Serviced – Bearings and Axle\nHub serviced in full with new bearings and hub axle. Function tested OK.","type":"Service Notes"},{"id":"Wheels_0_5","heading":"Returned as Is","body":"","full":"Returned as Is","type":"Service Notes"}],"General":[{"id":"General_0_1","heading":"Direct Replacement – Out of Stock","body":"Hey Team, unfortunately we are currently out of stock of XXXX. Stock is due on DD/MM/YYYY. We can replace this with XXXX or back-order the matching part, to be processed when stock arrives. Please let us know how via the correspondence with how you would like to proceed. Thanks!","full":"Direct Replacement – Out of Stock\nHey Team, unfortunately we are currently out of stock of XXXX. Stock is due on DD/MM/YYYY. We can replace this with XXXX or back-order the matching part, to be processed when stock arrives. Please let us know how via the correspondence with how you would like to proceed. Thanks!","type":"General & Info"},{"id":"General_0_2","heading":"Battery – Out of Stock","body":"Hey Team, unfortunately we are out of stock of batteries. We have placed a back order for replacement/s, to ship to you when stock arrives.","full":"Battery – Out of Stock\nHey Team, unfortunately we are out of stock of batteries. We have placed a back order for replacement/s, to ship to you when stock arrives.","type":"General & Info"},{"id":"General_0_3","heading":"Battery Low Voltage Protection","body":"Hey Team, It sounds as though the battery has entered a low voltage protection state.\nA low voltage protection state means the battery's voltage has dropped below a safe threshold, prompting the battery management system to shut down the battery to prevent damage.\nFor charger LED color explanations, refer to the SRAM AXS Single Battery Charger Base - LED Indicator Status or SRAM AXS Four Battery Charger Base - LED Indicator Status sections.\nAXS Battery Recovery\nThere are two procedures that can be used to wake a battery in sleep state depending on the capabilities of your SRAM AXS battery charger.\nTrickle Charge Procedure\nPerform this procedure first if your SRAM AXS battery charger is capable of providing a trickle charge.\nYou can identify if your charger has trickle charge capability by referring to the serial number on the bottom of the charger.\n- For single bay chargers, a serial number greater than 3308304631 indicates that the charger has trickle charge capability.\n- For four bay chargers, a serial number greater than 3306390011 indicates that the charger has trickle charge capability.\nIf your charger is not capable of trickle charge, go to the Manual Wake Up Procedure.\nTrickle Charge Procedure:\n1. Plug the battery charger into a USB charging port connected to a power source.\n2. Place the battery into the battery charger and wait 10 seconds for the charger LED to respond.\n3a. If the LED responds yellow, leave the battery on the charger. The battery is no longer in sleep mode and will continue to charge.\n3b. If the LED responds red, remove the battery from the charger and proceed to the Manual Wake Up Procedure.\nManual Wake Up Procedure:\n1. Plug the battery charger into the USB charging port of a computer.\n2. Place the battery into the battery charger and wait for the charger LED to respond.\n3. If the LED responds red, remove the battery from the charger and wait for the LED to turn off.\n4. Place the battery on the charger again and wait for the LED to respond.\n5. Repeat steps 2-4 for a total of 10-15 cycles or until the LED turns yellow.","full":"Battery Low Voltage Protection\nHey Team, It sounds as though the battery has entered a low voltage protection state.\nA low voltage protection state means the battery's voltage has dropped below a safe threshold, prompting the battery management system to shut down the battery to prevent damage.\nFor charger LED color explanations, refer to the SRAM AXS Single Battery Charger Base - LED Indicator Status or SRAM AXS Four Battery Charger Base - LED Indicator Status sections.\nAXS Battery Recovery\nThere are two procedures that can be used to wake a battery in sleep state depending on the capabilities of your SRAM AXS battery charger.\nTrickle Charge Procedure\nPerform this procedure first if your SRAM AXS battery charger is capable of providing a trickle charge.\nYou can identify if your charger has trickle charge capability by referring to the serial number on the bottom of the charger.\n- For single bay chargers, a serial number greater than 3308304631 indicates that the charger has trickle charge capability.\n- For four bay chargers, a serial number greater than 3306390011 indicates that the charger has trickle charge capability.\nIf your charger is not capable of trickle charge, go to the Manual Wake Up Procedure.\nTrickle Charge Procedure:\n1. Plug the battery charger into a USB charging port connected to a power source.\n2. Place the battery into the battery charger and wait 10 seconds for the charger LED to respond.\n3a. If the LED responds yellow, leave the battery on the charger. The battery is no longer in sleep mode and will continue to charge.\n3b. If the LED responds red, remove the battery from the charger and proceed to the Manual Wake Up Procedure.\nManual Wake Up Procedure:\n1. Plug the battery charger into the USB charging port of a computer.\n2. Place the battery into the battery charger and wait for the charger LED to respond.\n3. If the LED responds red, remove the battery from the charger and wait for the LED to turn off.\n4. Place the battery on the charger again and wait for the LED to respond.\n5. Repeat steps 2-4 for a total of 10-15 cycles or until the LED turns yellow.","type":"General & Info"},{"id":"General_0_4","heading":"Inside-Sales Service Charge","body":"Please note, all inside-sales suspension services are now charged at $120+gst, per component. This price includes labour and the necessary service kit for the service item. Any further parts needed will be charged at a discounted price.","full":"Inside-Sales Service Charge\nPlease note, all inside-sales suspension services are now charged at $120+gst, per component. This price includes labour and the necessary service kit for the service item. Any further parts needed will be charged at a discounted price.","type":"General & Info"},{"id":"General_0_5","heading":"Request: Return Damaged Part on RAP Quote","body":"Hey Team, we're unable to return the damaged component and supply the replacement. The replacement is issued at a discounted rate against the original component's serial number, and the damaged item is held to ensure it's removed from circulation. Please let us know if you'd like to proceed with the replacement as quoted, with the understanding that the damaged component/s will not be returned.","full":"Request: Return Damaged Part on RAP Quote\nHey Team, we're unable to return the damaged component and supply the replacement. The replacement is issued at a discounted rate against the original component's serial number, and the damaged item is held to ensure it's removed from circulation. Please let us know if you'd like to proceed with the replacement as quoted, with the understanding that the damaged component/s will not be returned.","type":"General & Info"},{"id":"General_0_6","heading":"Ready to Ship – Payment Required","body":"Hey Team, this order is now complete. Please contact us on 03 9212 6100 when you're ready to arrange payment. If you prefer to pay by bank transfer, kindly send a copy of the remittance along with the RA or invoice number to sramaustralia@sram.com. Just a note that the order will be shipped once payment has been received. Thanks!","full":"Ready to Ship – Payment Required\nHey Team, this order is now complete. Please contact us on 03 9212 6100 when you're ready to arrange payment. If you prefer to pay by bank transfer, kindly send a copy of the remittance along with the RA or invoice number to sramaustralia@sram.com. Just a note that the order will be shipped once payment has been received. Thanks!","type":"General & Info"},{"id":"General_0_7","heading":"Card on File Declined","body":"Hey Team, we have attempted to process payment for this repair however the card on file was declined. Please let us know when you'd like us to re-attempt to process payment. Thanks!","full":"Card on File Declined\nHey Team, we have attempted to process payment for this repair however the card on file was declined. Please let us know when you'd like us to re-attempt to process payment. Thanks!","type":"General & Info"},{"id":"General_0_8","heading":"Credit Card Details – Upload Request","body":"Hey Team, could you please upload your credit card details using the \"Edit Credit Card Details\" section on the bottom left of the order page? Once that's done, just send us a quick message and we'll process and ship the order. Thanks!","full":"Credit Card Details – Upload Request\nHey Team, could you please upload your credit card details using the \"Edit Credit Card Details\" section on the bottom left of the order page? Once that's done, just send us a quick message and we'll process and ship the order. Thanks!","type":"General & Info"},{"id":"General_0_9","heading":"POP Request","body":"Hey Team, could you please upload a copy of the POP and reply to this message once it's been added? Thank you!","full":"POP Request\nHey Team, could you please upload a copy of the POP and reply to this message once it's been added? Thank you!","type":"General & Info"},{"id":"General_0_10","heading":"Pending POP","body":"Hey Team, this order has been approved for return and assessment. Please make sure to include a copy of the proof of purchase with the item. For all warranty returns, it's preferred that a copy of the proof of purchase is attached directly to the claim in the service portal, but you may include a printed copy with the returned goods. Thanks!","full":"Pending POP\nHey Team, this order has been approved for return and assessment. Please make sure to include a copy of the proof of purchase with the item. For all warranty returns, it's preferred that a copy of the proof of purchase is attached directly to the claim in the service portal, but you may include a printed copy with the returned goods. Thanks!","type":"General & Info"}]};
const CATS = Object.keys(DATA);

// ── Update check ──────────────────────────────────────────
// Runs over the normal (logged-in) browser session instead of
// Tampermonkey's unreliable anonymous background check.
const SCRIPT_VERSION = '4.0';
const UPDATE_CHECK_URL = 'https://raw.githubusercontent.com/cteuschler/sram-lieferschein-texte/main/SRAM_STS_Australia.user.js';

function compareVersions(a, b) {
  const pa = String(a).split('.').map(n => parseInt(n, 10) || 0);
  const pb = String(b).split('.').map(n => parseInt(n, 10) || 0);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const na = pa[i] || 0, nb = pb[i] || 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}

function checkForUpdate(onResult) {
  console.log('[SRAM Update Check] Starting check. URL:', UPDATE_CHECK_URL);
  fetch(UPDATE_CHECK_URL, { cache: 'no-store' })
    .then(response => {
      console.log('[SRAM Update Check] Response received. Status:', response.status);
      if (!response.ok) {
        console.warn('[SRAM Update Check] Not OK status – aborting.');
        onResult(null);
        return null;
      }
      return response.text();
    })
    .then(text => {
      if (text == null) return; // already aborted above
      console.log('[SRAM Update Check] Response length:', text.length, 'chars');
      const m = text.match(/@version\s+([0-9]+(?:\.[0-9]+)*)/);
      if (!m) {
        console.warn('[SRAM Update Check] No @version line found in response.');
        onResult(null);
        return;
      }
      console.log('[SRAM Update Check] Found remote version:', m[1], '| Own version:', SCRIPT_VERSION);
      if (m[1] && compareVersions(m[1], SCRIPT_VERSION) > 0) {
        onResult(m[1]);
      } else {
        onResult(null);
      }
    })
    .catch(e => {
      console.warn('[SRAM Update Check] Error:', e);
      onResult(null);
    });
}

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
  btn.style.cssText = 'position:fixed;bottom:80px;right:20px;z-index:2147483646;display:flex;align-items:center;gap:8px;padding:9px 16px;background:#E31836;color:#fff;border:none;border-radius:4px;cursor:pointer;box-shadow:0 3px 14px rgba(0,0,0,0.28);letter-spacing:0.02em;';

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
    btn.style.background = '#E31836';
    btn.style.borderColor = '#E31836';
    btn.style.color = '#FFFFFF';
  }
}

function buildPanel() {
  if (panel) panel.remove();
  panel = document.createElement('div');
  panel.id = 'sram-panel';
  panel.style.cssText = 'position:fixed;top:0;right:0;bottom:0;width:440px;background:#FFFFFF;border-left:3px solid #E31836;z-index:2147483647;display:flex;flex-direction:column;font-family:Arial,Helvetica,sans-serif;font-size:13px;box-shadow:-6px 0 24px rgba(0,0,0,0.18);color:#312929;';

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
    <div style="padding:12px 14px;background:#E31836;border-bottom:1px solid #B2132B;display:flex;align-items:center;gap:10px;flex-shrink:0;">
      <img src="data:image/png;base64,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" alt="SRAM" style="height:15px;width:auto;flex-shrink:0;display:block;" />
      <span style="font-size:13px;font-weight:600;color:#FFFFFF;flex:1;">Service Texts AUS</span>
      <button id="sram-x" style="background:none;border:none;color:#FFFFFF;cursor:pointer;font-size:18px;padding:0 4px;line-height:1;opacity:0.9;">✕</button>
    </div>
    <div id="sram-update-banner" style="display:none;padding:8px 14px;background:#FFF4D6;border-bottom:1px solid #E8D9A6;font-size:11.5px;flex-shrink:0;color:#7A5B00;line-height:1.4;"></div>
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

  // Check once on open whether a newer version is available
  checkForUpdate((newerVersion) => {
    if (!newerVersion) return;
    const banner = document.getElementById('sram-update-banner');
    if (!banner) return;
    banner.style.display = 'block';
    banner.innerHTML = `🔔 New version <strong>${esc(newerVersion)}</strong> available (current: ${esc(SCRIPT_VERSION)}). <a href="${esc(UPDATE_CHECK_URL)}" target="_blank" style="color:#7A5B00;text-decoration:underline;">Download now</a> and import into Tampermonkey.`;
  });

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
  b.style.cssText = `padding:${small?'3px 8px':'5px 11px'};border-radius:3px;border:1px solid ${active?'#E31836':'#D0D0D0'};background:${active?'#E31836':'#FFFFFF'};color:${active?'#FFFFFF':'#454545'};font-size:${small?'10px':'11px'};cursor:pointer;white-space:nowrap;font-family:Arial,Helvetica,sans-serif;font-weight:${active?'600':'400'};`;
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
    card.style.cssText = `background:#FFFFFF;border:1px solid ${isOpen?'#E31836':'#E5E5E5'};border-radius:4px;margin-bottom:6px;overflow:hidden;`;

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
      btnInsert.style.cssText = 'flex:1;padding:9px 12px;background:#E31836;color:#fff;border:none;border-radius:4px;font-size:12px;font-weight:600;cursor:pointer;font-family:Arial,Helvetica,sans-serif;';
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
        setTimeout(() => { btnInsert.innerHTML = '↳ Insert into field'; btnInsert.style.background = '#E31836'; }, 3500);
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

// ═══════════════════════════════════════════════════════════════════
// ===== FELD-BRUECKE ANFANG =====
// Stellt dem Sicherungs-Teil die Feldlogik bereit. Dort nachzubauen
// waere eine Fehlerquelle: die Eigenheiten (SAPUI5-Control-API,
// gesperrte Felder, Suche ueber mehrere iframes, die Sonderbehandlung
// des Korrespondenz-Dialogs) stecken alle in diesen Funktionen.
// ═══════════════════════════════════════════════════════════════════
try {
  // Die Beschriftungen der Zielfelder heissen je Standort anders. Statt
  // sie fest einzutragen, werden sie aus FIELD_SEARCH_TERMS ermittelt:
  // gesucht wird der Schluessel, dessen Suchbegriffe den englischen
  // Portalnamen enthalten.
  function labelFuer(portalName) {
    try {
      for (const key of Object.keys(FIELD_SEARCH_TERMS)) {
        if ((FIELD_SEARCH_TERMS[key] || []).some(t => t === portalName)) return key;
      }
    } catch (e) {}
    return portalName;
  }

  window.__sramFieldApi = {
    findFieldByLabel: findFieldByLabel,
    isFieldEditable: isFieldEditable,
    readField: function (el) {
      try {
        const ctrl = findSAPControl(el);
        if (ctrl && typeof ctrl.getValue === 'function') return ctrl.getValue() || '';
        if (el && el.value !== undefined) return el.value || '';
        if (el) return el.textContent || '';
      } catch (e) {}
      return '';
    },
    writeField: function (el, text) {
      setPinnedField(el);
      return insertIntoField(text);
    },
    allDocs: allDocs,
    simulateRealClick: simulateRealClick,
    resolveCorrespondenceField: resolveCorrespondenceField,
    labels: {
      TextIntMemo:  labelFuer('Internal Memo'),
      TextShipNote: labelFuer('Shipping Note'),
      TextHeadNote: labelFuer('Header Note')
    }
  };
} catch (e) {}
// ===== FELD-BRUECKE ENDE =====
})();

// ===== BACKUP-TEIL ANFANG =====
// Auftrags-Sicherung: sichert den Bearbeitungsstand lokal im Browser
// und kann ihn zurueckschreiben. Eigener Funktionsblock, eigene
// DOM-Kennungen (sram-bk-*), kein gemeinsamer Zustand mit dem
// Textteil ausser der Bruecke window.__sramFieldApi.
// ═══════════════════════════════════════════════════════════════════
(function () {
'use strict';

// ============================================================
// STUFE 1 - NUR BEOBACHTEN
// Dieses Script sichert Daten und zeigt sie an. Es schreibt
// bewusst NICHTS zurueck in die Portalfelder. Damit kann es
// keine Auftragsdaten veraendern.
// ============================================================

// Version sichtbar im Panel. Ohne Anzeige war nicht erkennbar, welche
// Fassung gerade laeuft - das hat beim Testen mehrfach zu Fehlsuchen
// gefuehrt, weil Beobachtungen aus einer alten Fassung stammten.
const BK_VERSION   = '2.1';
const PREFIX       = 'sramBk:';
const KEY_STATUS   = PREFIX + 'status';
const KEY_LOG      = PREFIX + 'log';
const KEY_ORDER    = PREFIX + 'order:';
const SNAP_INTERVAL= 5000;      // alle 5 Sekunden pruefen
const MAX_AGE_MS   = 7 * 24 * 3600 * 1000;  // Sicherungen nach 7 Tagen entfernen
const MAX_ORDERS   = 10;    // nur die letzten N Auftraege behalten
const WARN_BYTES   = 600000; // ab dieser Groesse im Panel warnen
const SAVESTATE_MAX = 2 * 3600 * 1000; // Speicher-Markierung nach 2 Std. verfallen
const MAX_LOG      = 60;
const MAX_RAW_CHARS= 400000;    // Notbremse gegen uebergrosse Rohdaten

const IS_TOP = (function () { try { return window.top === window.self; } catch (e) { return false; } })();

function log() { try { console.log('%c[SRAM Backup]', 'background:#E31836;color:#fff;padding:2px 6px;border-radius:3px;', ...arguments); } catch (e) {} }

// ─── Speicher-Helfer ────────────────────────────────────────
function lsGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (e) { log('Save failed (storage full?):', e && e.name); return false; }
}
function listBackupKeys() {
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(KEY_ORDER) === 0) out.push(k);
    }
  } catch (e) {}
  return out;
}
function cleanupOld() {
  const now = Date.now();
  // a) Zu alte Sicherungen entfernen
  listBackupKeys().forEach(k => {
    const s = lsGet(k, null);
    if (!s || !s.ts || (now - s.ts) > MAX_AGE_MS) { try { localStorage.removeItem(k); } catch (e) {} }
  });
  // b) Nur die letzten MAX_ORDERS Auftraege behalten.
  //    Gesichert wird jeder Auftrag, an dem gearbeitet wird - als Netz
  //    gegen CPI-Fehler UND gegen ein abgelaufenes Sitzungs-Timeout.
  //    Ohne Obergrenze wuerde der Browserspeicher langsam volllaufen.
  //    Sicherungen mit fehlgeschlagenem Speichern werden dabei bevorzugt
  //    behalten, denn genau die braucht man noch.
  const all = listBackupKeys().map(k => {
    const s = lsGet(k, null);
    return { key: k, ts: (s && s.ts) || 0, failed: !!(s && s.saveState && s.saveState.state === 'failed') };
  });
  if (all.length <= MAX_ORDERS) return;
  all.sort((a, b) => {
    if (a.failed !== b.failed) return a.failed ? -1 : 1; // Fehlgeschlagene zuerst behalten
    return b.ts - a.ts;                                  // dann die neuesten
  });
  all.slice(MAX_ORDERS).forEach(x => { try { localStorage.removeItem(x.key); } catch (e) {} });
}

function storageBytes() {
  let n = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(PREFIX) === 0) n += k.length + (localStorage.getItem(k) || '').length;
    }
  } catch (e) {}
  return n * 2; // UTF-16
}
function addEvent(ev) {
  const arr = lsGet(KEY_LOG, []);
  ev.ts = Date.now();
  // Auftragsnummer mitschreiben, damit im Protokoll erkennbar ist, zu
  // welchem Auftrag ein Speicherversuch gehoert.
  if (!ev.order) {
    const st = lsGet(KEY_STATUS, null);
    ev.order = (st && st.order) || (function () {
      try { const m = String(window.top.location.href).match(/Order=(\d{4,})/); return m ? m[1] : null; }
      catch (e) { return null; }
    })();
  }
  arr.push(ev);
  while (arr.length > MAX_LOG) arr.shift();
  lsSet(KEY_LOG, arr);
}

// ─── Das 'order'-Modell finden ──────────────────────────────
// Der komplette Bearbeitungsstand liegt in einem JSONModel namens
// 'order'. Die View-ID wechselt (__xmlview0, __xmlview2, ...),
// deshalb wird ueber die Endung der Control-ID gesucht.
function hasUi5() {
  try { return !!(window.sap && sap.ui && sap.ui.core && sap.ui.core.Element && sap.ui.core.Element.registry); }
  catch (e) { return false; }
}

function findOrderModel() {
  if (!hasUi5()) return null;
  let all;
  try { all = sap.ui.core.Element.registry.all(); } catch (e) { return null; }

  // Weg 1: ueber die bekannten Textfelder (deren Binding haengt am 'order'-Modell)
  for (const id in all) {
    if (!/--(internalMemoTextArea|shipNoteTextArea|headerNoteTextArea)$/.test(id)) continue;
    try {
      const b = all[id].getBinding('value');
      if (b && b.getModel && typeof b.getModel().getData === 'function') {
        const d = b.getModel().getData();
        if (d && typeof d === 'object') return { model: b.getModel(), via: id };
      }
    } catch (e) {}
  }

  // Weg 2: ueber die Positions-Tabelle
  for (const id in all) {
    if (!/--itemsTable$/.test(id)) continue;
    try {
      const b = all[id].getBinding('rows') || all[id].getBinding('items');
      if (b && b.getModel && typeof b.getModel().getData === 'function') {
        return { model: b.getModel(), via: id };
      }
    } catch (e) {}
  }

  // Weg 3: ueber die View und das benannte Modell
  for (const id in all) {
    const c = all[id];
    try {
      if (!c.getMetadata || !/XMLView$/.test(c.getMetadata().getName())) continue;
      const m = c.getModel('order');
      if (m && typeof m.getData === 'function') {
        const d = m.getData();
        if (d && typeof d === 'object' && ('Items' in d || 'TextHeadNote' in d)) return { model: m, via: id + " (Modell 'order')" };
      }
    } catch (e) {}
  }
  return null;
}

// ─── Auftragsnummer bestimmen ───────────────────────────────
function getOrderNo(data) {
  if (data && data.Order) return String(data.Order).replace(/^0+/, '') || String(data.Order);
  // Aus der URL (Top-Frame und eigener Frame)
  const hashes = [];
  try { hashes.push(String(window.top.location.href)); } catch (e) {}
  try { hashes.push(String(window.location.href)); } catch (e) {}
  for (const h of hashes) {
    const m = h.match(/Order=(\d{4,})/);
    if (m) return m[1];
  }
  // Aus dem OData-Zwischenspeicher
  try {
    const all = sap.ui.core.Element.registry.all();
    for (const id in all) {
      const m2 = all[id].getModel && all[id].getModel();
      if (m2 && typeof m2.getObject === 'function') {
        const root = m2.getObject('/');
        if (root) {
          const k = Object.keys(root).find(x => x.indexOf('SoHeaderSet(') === 0);
          if (k) { const mm = k.match(/'(\d+)'/); if (mm) return mm[1]; }
        }
      }
    }
  } catch (e) {}
  return null;
}

// ─── Positionen einsammeln (inkl. verschachtelter Nachtraege) ──
// WICHTIG: Ueber das rote Plus hinzugefuegte Materialien liegen
// NICHT flach in /Items, sondern verschachtelt unter der
// Originalposition, z. B. /Items/0/Actuals/0. Deshalb wird hier
// rekursiv gesucht - sonst gingen genau diese Nachtraege verloren.
const NESTED_KEYS = ['Actuals', 'SubItems', 'Items', 'Children'];

// Nimmt die Position VOLLSTAENDIG mit. Frueher wurden nur ausgesuchte
// Felder gesichert - dabei fehlten unter anderem Status, Delivery Date,
// Man., 50%/25% Goodwill, Net Value und das Ship-Kennzeichen. Verliert
// das Portal einen Auftrag, muessen aber alle Spalten wieder eingetragen
// werden, also wird jetzt jedes Feld gesichert. Die ausgewaehlten Felder
// darunter bleiben fuer die Anzeige erhalten.
function allFields(it) {
  const o = {};
  try {
    for (const k of Object.keys(it)) {
      if (k === '__metadata') continue;
      const v = it[k];
      if (Array.isArray(v)) continue;                 // Actuals werden separat behandelt
      if (v && typeof v === 'object') {               // z. B. Datumsobjekte
        try { o[k] = JSON.parse(JSON.stringify(v)); } catch (e) {}
        continue;
      }
      o[k] = v;
    }
  } catch (e) {}
  return o;
}

function pickItem(it, parentItem, path) {
  return {
    _all:               allFields(it),
    Item:               it.Item || null,
    Material:           it.Material || null,
    ItemDescription:    it.ItemDescription || null,
    Quantity:           it.Quantity || null,
    Plant:              it.Plant || null,
    StorageLocation:    it.StorageLocation || null,
    SerialNumber:       it.SerialNumber || it.SerialNumberLong || null,
    ItemCategory:       it.ItemCategory || null,
    SymptomDescription: it.SymptomDescription || null,
    TextItemMemo:       it.TextItemMemo || null,
    PurchaseDate:       it.PurchaseDate || null,
    CQFNumber:          it.CQFNumber || it.CqfNumber || null,
    ItemStatusKey:      it.ItemStatusKey || null,
    _parentItem:        parentItem || null,
    _path:              path
  };
}

function collectItems(items, out, parentItem, basePath) {
  if (!Array.isArray(items)) return out;
  items.forEach((it, idx) => {
    if (!it || typeof it !== 'object') return;
    const path = basePath + '/' + idx;
    out.push(pickItem(it, parentItem, path));
    NESTED_KEYS.forEach(key => {
      if (Array.isArray(it[key]) && it[key].length) {
        collectItems(it[key], out, it.Item || null, path + '/' + key);
      }
    });
  });
  return out;
}

// ─── Rohdaten absichern (Groesse begrenzen) ─────────────────
function safeRaw(data) {
  let txt;
  try { txt = JSON.stringify(data); } catch (e) { return { _note: 'raw data not serialisable' }; }
  if (!txt) return null;
  if (txt.length > MAX_RAW_CHARS) {
    // Anhangs-Inhalte sind die wahrscheinliche Ursache -> entfernen und erneut versuchen
    try {
      const copy = JSON.parse(txt);
      if (Array.isArray(copy.Attachments)) {
        copy.Attachments = copy.Attachments.map(a => ({
          FileName: (a && (a.FileName || a.Name || a.fileName)) || '(unbenannt)',
          _contentStripped: true
        }));
      }
      const t2 = JSON.stringify(copy);
      if (t2.length <= MAX_RAW_CHARS) return copy;
      return { _note: 'raw data too large (' + Math.round(t2.length / 1024) + ' KB), not backed up' };
    } catch (e) {
      return { _note: 'raw data too large (' + Math.round(txt.length / 1024) + ' KB)' };
    }
  }
  try { return JSON.parse(txt); } catch (e) { return null; }
}

// Liest einen noch nicht abgeschickten Korrespondenz-Entwurf mit.
//
// Wichtig: Dieser Entwurf steckt NICHT im Datenmodell. Er lebt nur im
// Textfeld des "Write Message"-Dialogs, solange dieser offen ist - und
// genau er geht bei einem CPI-Fehler oder Sitzungsverlust verloren.
// Gelesen wird daher rein passiv: der Dialog wird NIE von selbst
// geoeffnet, denn alle 5 Sekunden ein Dialog waere unbrauchbar.
function readCorrespondenceDraft() {
  try {
    const tas = document.querySelectorAll('textarea');
    for (const ta of tas) {
      if (/internalMemoTextArea|shipNoteTextArea|headerNoteTextArea/.test(ta.id || '')) continue;
      if (isOwnUiElement(ta)) continue;
      const r = ta.getBoundingClientRect();
      if (!r.width && !r.height) continue;            // ausgeblendet
      const wert = (ta.value || '').trim();
      if (!wert) continue;
      const imDialog = !!(ta.closest && (ta.closest('.sapMDialog') || ta.closest('.sapMPopover') || ta.closest('[role="dialog"]')));
      return { text: ta.value, imDialog: imDialog, feldId: (ta.id || '').split('--').pop() || null };
    }
  } catch (e) {}
  return null;
}

// Eigene Panel-Elemente ausschliessen, damit nicht unser Suchfeld oder
// das Anzeigefeld fuer Fehlertexte als Entwurf gesichert wird.
function isOwnUiElement(el) {
  try {
    if (!el) return false;
    if (el.closest && (el.closest('#sram-bk-panel') || el.closest('#sramtest-panel') || el.closest('#sram-panel'))) return true;
    const w = window.top;
    for (const id of ['sram-bk-panel', 'sramtest-panel', 'sram-panel']) {
      const p = w.document.getElementById(id);
      if (p && p.contains(el)) return true;
    }
  } catch (e) {}
  return false;
}

function attachmentNames(data) {
  if (!Array.isArray(data.Attachments)) return [];
  return data.Attachments.map(a => (a && (a.FileName || a.Name || a.fileName || a.filename)) || '(unbenannt)');
}

// ─── Eine Momentaufnahme bauen ──────────────────────────────
// Liest aus der Positions-Tabelle, welche Felder ueberhaupt beschreibbare
// Spalten haben. Damit zeigt das Panel spaeter genau die Felder, die der
// Bearbeiter selbst ausfuellt - und nicht die vielen Systemfelder wie
// CreatedDate, DGIndicator, ProductType oder Upc, die nur verwirren.
function editableFieldNames() {
  try {
    if (!hasUi5()) return null;
    const all = sap.ui.core.Element.registry.all();
    let tbl = null;
    for (const id in all) { if (/--itemsTable$/.test(id)) { tbl = all[id]; break; } }
    if (!tbl || !tbl.getRows) return null;
    const felder = {};
    (tbl.getRows() || []).forEach(row => {
      (row.getCells ? row.getCells() : []).forEach(c => {
        try {
          const bi = c.getBindingInfo('value') || c.getBindingInfo('selectedKey') || c.getBindingInfo('selected');
          const pfad = bi && bi.parts && bi.parts[0] && bi.parts[0].path;
          if (pfad) felder[String(pfad).split('/').pop()] = true;
        } catch (e) {}
      });
    });
    const liste = Object.keys(felder);
    return liste.length ? liste : null;
  } catch (e) { return null; }
}

function buildSnapshot(reason) {
  const found = findOrderModel();
  if (!found) return null;
  let d;
  try { d = found.model.getData(); } catch (e) { return null; }
  if (!d || typeof d !== 'object') return null;

  const orderNo = getOrderNo(d);
  if (!orderNo) return null;

  const items = collectItems(d.Items, [], null, '/Items');

  return {
    v: 1,
    ts: Date.now(),
    reason: reason || 'automatic',
    order: orderNo,
    via: found.via,
    texts: {
      TextIntMemo:  d.TextIntMemo  || '',
      TextShipNote: d.TextShipNote || '',
      TextHeadNote: d.TextHeadNote || ''
    },
    items: items,
    editableFields: editableFieldNames(),
    attachments: attachmentNames(d),
    correspondenceCount: Array.isArray(d.Correspondence) ? d.Correspondence.length : 0,
    // Den INHALT mitsichern, nicht nur die Anzahl. Im Test stand in der
    // Sicherung "Korrespondenz: 1", nach dem Neuladen war das Modell leer -
    // die Nachricht war also noch nicht gespeichert und ging verloren.
    // Mit nur einem Zaehler liess sie sich nicht wiederherstellen.
    correspondence: Array.isArray(d.Correspondence) ? d.Correspondence.map(allFields) : [],
    correspondenceDraft: readCorrespondenceDraft(),
    header: {
      DocumentType:       d.DocumentType || null,
      ExternalReference:  d.ExternalReference || null,
      HeaderStatusKey:    d.HeaderStatusKey || null,
      OrderReason:        d.OrderReason || null,
      ShipTo:             d.ShipTo || null,
      SoldTo:             d.SoldTo || null,
      CompleteDelivery:   d.CompleteDelivery,
      CustomerEmail:      d.CustomerEmail || null
    },
    raw: safeRaw(d)
  };
}

// Fingerabdruck, um unnoetiges Schreiben zu vermeiden
function fingerprint(s) {
  if (!s) return '';
  try {
    return JSON.stringify({ t: s.texts, i: s.items, a: s.attachments, c: s.correspondenceCount, h: s.header });
  } catch (e) { return String(s.ts); }
}

function hasContent(s) {
  if (!s) return false;
  const t = s.texts || {};
  if ((t.TextIntMemo || t.TextShipNote || t.TextHeadNote || '').length) return true;
  if (s.correspondenceDraft && s.correspondenceDraft.text) return true;
  if (Array.isArray(s.correspondence) && s.correspondence.some(c => korrText(c))) return true;
  if (Array.isArray(s.items) && s.items.length) return true;
  return false;
}

// Mass fuer den "Gehalt" einer Sicherung. Positionen wiegen schwerer als
// Zeichen, weil ein verlorener Materialnachtrag mehr Arbeit kostet als
// ein Satz Text.
// Holt den Nachrichtentext aus einem Korrespondenz-Eintrag. Die Feldnamen
// des Portals sind hier nicht sicher bekannt, deshalb wird das laengste
// Textfeld genommen - das ist in der Praxis die Nachricht selbst.
function korrText(c) {
  if (!c || typeof c !== 'object') return '';
  // Das Portal nutzt 'messageText' (klein geschrieben) - im Test enthielt
  // der Eintrag genau zwei Felder: Sender und messageText.
  const bevorzugt = ['messageText', 'MessageText', 'Text', 'text', 'Message',
                     'message', 'LongText', 'Body', 'Comment'];
  for (const k of bevorzugt) { if (typeof c[k] === 'string' && c[k].trim()) return c[k]; }
  // Rueckfall: das laengste Textfeld. Dabei muessen Zaehler, Kennzeichen,
  // Datums- und Nummernfelder ausgeschlossen werden - sonst wird etwa ein
  // Zaehler "001" als Nachricht ausgegeben.
  let best = '';
  try {
    Object.keys(c).forEach(k => {
      const v = c[k];
      if (typeof v !== 'string') return;
      const x = v.trim();
      if (x.length < 15) return;                       // zu kurz fuer eine Nachricht
      if (/^[\d.,:\-\/\s]+$/.test(x)) return;          // reine Zahlen, Datum, Uhrzeit
      if (/^\d{4}-\d{2}-\d{2}T/.test(x)) return;        // ISO-Zeitstempel (2026-10-07T00:00:00.000Z)
      if (/^PT?\d+[HMS]/.test(x)) return;              // Zeitdauer (PT08H00M00S)
      if (/^[A-Z0-9_\-]+$/.test(x)) return;             // Schluessel wie ZWRN, E0001
      if (x.length > best.length) best = x;
    });
  } catch (e) {}
  return best;
}

function contentScore(s) {
  if (!s) return -1;
  const t = s.texts || {};
  const entwurf = (s.correspondenceDraft && s.correspondenceDraft.text) ? s.correspondenceDraft.text.length : 0;
  const korr = Array.isArray(s.correspondence)
    ? s.correspondence.reduce((n, c) => n + korrText(c).length, 0) : 0;
  const chars = (t.TextIntMemo || '').length + (t.TextShipNote || '').length + (t.TextHeadNote || '').length + entwurf;
  const items = Array.isArray(s.items) ? s.items.length : 0;
  const atts  = Array.isArray(s.attachments) ? s.attachments.length : 0;
  return chars + korr + items * 200 + atts * 20;
}

// Fuehrt zwei Staende zusammen, statt den aermeren komplett zu verwerfen.
//
// Das ist der Kern: ein reiner Vergleich "welcher Stand ist gehaltvoller"
// hat im Test dazu gefuehrt, dass eine NEU hinzugekommene Korrespondenz
// verloren ging - der neue Stand hatte insgesamt weniger Inhalt (kuerzere
// Texte, eine Position weniger) und wurde deshalb ganz verworfen, obwohl
// er als Einziger die Nachricht enthielt.
// Zusammengefuehrt wird daher Teil fuer Teil: pro Textfeld der laengere
// Inhalt, bei Positionen und Korrespondenz die gehaltvollere Liste.
function mergeSnapshots(prev, next) {
  if (!prev) return next;

  const zusammen = JSON.parse(JSON.stringify(next));

  // Texte: je Feld den laengeren behalten
  ['TextIntMemo', 'TextShipNote', 'TextHeadNote'].forEach(k => {
    const a = (prev.texts && prev.texts[k]) || '';
    const b = (next.texts && next.texts[k]) || '';
    zusammen.texts[k] = (a.length > b.length) ? a : b;
  });

  // Positionen: die Liste mit mehr Gehalt
  const itemGehalt = arr => Array.isArray(arr)
    ? arr.reduce((n, i) => n + 200 + JSON.stringify(i._all || i).length, 0) : 0;
  if (itemGehalt(prev.items) > itemGehalt(next.items)) {
    zusammen.items = prev.items;
    if (prev.editableFields && !next.editableFields) zusammen.editableFields = prev.editableFields;
  }

  // Korrespondenz: die Liste mit mehr Text
  const korrGehalt = arr => Array.isArray(arr) ? arr.reduce((n, c) => n + korrText(c).length, 0) : 0;
  if (korrGehalt(prev.correspondence) > korrGehalt(next.correspondence)) {
    zusammen.correspondence = prev.correspondence;
    zusammen.correspondenceCount = prev.correspondenceCount;
  }

  // Entwurf: den laengeren behalten
  const dA = (prev.correspondenceDraft && prev.correspondenceDraft.text) || '';
  const dB = (next.correspondenceDraft && next.correspondenceDraft.text) || '';
  if (dA.length > dB.length) zusammen.correspondenceDraft = prev.correspondenceDraft;

  // Anhaenge: die laengere Liste
  if ((prev.attachments || []).length > (next.attachments || []).length) {
    zusammen.attachments = prev.attachments;
  }

  zusammen.merged = true;
  return zusammen;
}

// Darf die neue Sicherung die vorhandene ersetzen?
// Hintergrund: Verwirft man im Portal die Bearbeitung (Display) oder laeuft
// die Sitzung ab, zeigt das Formular anschliessend leere Felder. Ein
// automatischer Schnappschuss wuerde dann die gute Sicherung durch den
// leeren Stand ersetzen - im Test ist genau das passiert (2 Positionen und
// 368 Zeichen wurden zu 1 Position und 0 Zeichen).
// Deshalb: ein AUTOMATISCHER Schnappschuss ueberschreibt nur, wenn er
// mindestens so gehaltvoll ist. Ein Schnappschuss direkt vor dem Speichern
// oder bei Sitzungsverlust ist der verbindliche Stand und darf immer.
function mayReplace(prev, next) {
  if (!prev) return true;
  const verbindlich = next.reason === 'before saving' || next.reason === 'Session expired';
  if (verbindlich) return true;
  return contentScore(next) >= contentScore(prev);
}

// ─── Sicherungs-Schleife (nur im App-Frame aktiv) ───────────
let lastFp = null;
let lastSnapAt = 0;

function snapshotNow(reason) {
  let snap = buildSnapshot(reason);

  // Statusanzeige fuer das Panel aktualisieren.
  //
  // Achtung Wettlauf: das Script laeuft in ALLEN Frames (@all-frames).
  // Nur der App-Frame findet die Auftragsdaten, der aeussere Frame nicht.
  // Beide schrieben bisher alle 5 Sekunden denselben Statuseintrag, also
  // zeigte das Panel abwechselnd "erkannt" und "nicht gefunden".
  // Deshalb: eine negative Meldung ueberschreibt eine frische positive
  // nicht. Nur wenn seit 20 Sekunden keine Instanz mehr Erfolg gemeldet
  // hat, gilt "nicht gefunden".
  const vorherStatus = lsGet(KEY_STATUS, null);
  if (!snap && vorherStatus && vorherStatus.found &&
      (Date.now() - (vorherStatus.ts || 0)) < 20000) {
    return null;
  }

  lsSet(KEY_STATUS, {
    ts: Date.now(),
    found: !!snap,
    order: snap ? snap.order : null,
    via: snap ? snap.via : null,
    itemCount: snap ? snap.items.length : 0,
    textLens: snap ? {
      IntMemo: snap.texts.TextIntMemo.length,
      ShipNote: snap.texts.TextShipNote.length,
      HeadNote: snap.texts.TextHeadNote.length
    } : null,
    attachments: snap ? snap.attachments.length : 0,
    url: (function () { try { return String(location.href).slice(0, 200); } catch (e) { return null; } })()
  });

  if (!snap || !hasContent(snap)) return null;

  const fp = fingerprint(snap);
  const forced = reason && reason !== 'automatic';
  if (!forced && fp === lastFp) return null;   // nichts geaendert

  const key = KEY_ORDER + snap.order;
  const prev = lsGet(key, null);

  // Verbindliche Staende (vor dem Speichern, Sitzungsverlust) ersetzen
  // vollstaendig. Automatische Schnappschuesse werden mit dem vorhandenen
  // Stand zusammengefuehrt, damit weder Altes verloren geht noch Neues
  // uebersehen wird.
  let zuSpeichern = snap;
  if (!mayReplace(prev, snap)) {
    zuSpeichern = mergeSnapshots(prev, snap);
    // Nichts gewonnen? Dann nicht schreiben.
    if (contentScore(zuSpeichern) <= contentScore(prev)) { lastFp = fp; return null; }
  }
  snap = zuSpeichern;

  // Vorherige Markierung uebernehmen - aber nur, solange sie aktuell ist.
  // Eine einmal gesetzte Markierung "Speichern fehlgeschlagen" wurde sonst
  // bei jedem neuen Schnappschuss mitgeschleppt und blieb fuer immer
  // kleben, selbst wenn sie (wie bei der alten Fehlererkennung) falsch war.
  if (prev && prev.saveState && (Date.now() - (prev.saveState.at || 0)) < SAVESTATE_MAX) {
    snap.saveState = prev.saveState;
  }
  if (lsSet(key, snap)) {
    lastFp = fp;
    lastSnapAt = snap.ts;
    cleanupOld();   // Obergrenze einhalten
    log('Backup updated:', snap.order, '| Items:', snap.items.length, '| Reason:', snap.reason);
  }
  return snap;
}

function markSaveState(state, info) {
  const st = lsGet(KEY_STATUS, null);
  const orderNo = (st && st.order) || (function () {
    try { const m = String(window.top.location.href).match(/Order=(\d{4,})/); return m ? m[1] : null; } catch (e) { return null; }
  })();
  if (!orderNo) return;
  const key = KEY_ORDER + orderNo;
  const snap = lsGet(key, null);
  if (!snap) return;
  snap.saveState = { state: state, at: Date.now(), info: info || null };
  lsSet(key, snap);
}

// ─── Speicherversuche mitlesen (rein passiv) ────────────────
// Wird nur protokolliert. Es wird nichts abgefangen, umgeleitet
// oder veraendert - die Anfragen laufen unveraendert durch.
function trimUrl(u) {
  try { const s = String(u); return s.length > 160 ? s.slice(0, 160) + '…' : s; } catch (e) { return null; }
}

function looksLikeSave(method, url) {
  const m = String(method || '').toUpperCase();
  const u = String(url || '');
  if (!/^(POST|PUT|PATCH|MERGE)$/.test(m)) return false;
  return /\$batch|SoHeaderSet|SoItemSet|ServiceOrder/i.test(u);
}

// Erkennt ein abgelaufenes Sitzungs-Timeout. Das Portal antwortet dann
// mit 401/403 oder leitet auf eine Anmeldeseite um - die Eingaben im
// Formular sind in dem Moment noch da, gehen aber beim naechsten
// Seitenwechsel verloren. Genau dafuer ist die Sicherung gedacht.
function looksLikeSessionLoss(status, text) {
  if (status === 401 || status === 403) return true;
  const t = String(text || '');
  if (!t) return false;
  if (/HTTP\/1\.[01]\s+(401|403)/.test(t)) return true;
  // Antwort ist ploetzlich eine Anmeldeseite statt Daten
  if (/<form[^>]+login|saml2|SAMLRequest|j_spring_security_check/i.test(t)) return true;
  return false;
}

// Schneidet den Auszug UM die Fehlerstelle herum zu. Vorher wurden die
// ersten 1500 Zeichen gespeichert - bei einer langen $batch-Antwort steht
// der fehlgeschlagene Teilvorgang aber oft am Ende, sodass im Protokoll
// nur harmlose Kopfzeilen landeten und der Fehler unsichtbar blieb.
function errorExcerpt(text, status) {
  const t = String(text || '');
  if (!t) return null;
  const muster = [/HTTP\/1\.[01]\s+[45]\d\d/, /"error"\s*:\s*\{/, /<error[\s>]/i];
  let pos = -1;
  for (const re of muster) { const m = t.match(re); if (m && m.index !== undefined) { pos = m.index; break; } }
  if (pos < 0) {
    // Kein Muster gefunden (z. B. reiner HTTP-Fehlerstatus) -> Anfang und Ende
    if (t.length <= 2000) return t;
    return t.slice(0, 1000) + '\n\n[... ' + (t.length - 2000) + ' chars skipped ...]\n\n' + t.slice(-1000);
  }
  const von = Math.max(0, pos - 500);
  const bis = Math.min(t.length, pos + 2000);
  return (von > 0 ? '[... ' + von + ' chars before ...]\n\n' : '') +
         t.slice(von, bis) +
         (bis < t.length ? '\n\n[... ' + (t.length - bis) + ' chars after ...]' : '');
}

function looksLikeError(status, text) {
  if (status >= 400) return true;
  const t = String(text || '');
  if (!t) return false;
  // Im $batch stecken Teilfehler im Antwortkoerper, obwohl der Status 202
  // lautet. Deshalb wird dort nach einem echten Fehlerstatus oder einem
  // Fehlerobjekt gesucht.
  //
  // Bewusst NICHT nach dem Wort "CPI" suchen: im Auftragskopf steht
  // CreatedBy "CPI_SP_CF", das hat jede normale Antwort als Fehler
  // markiert. Im Test waren so 1 von 32 Eintraegen ein Fehlalarm.
  if (/HTTP\/1\.[01]\s+[45]\d\d/.test(t)) return true;
  if (/"error"\s*:\s*\{/.test(t)) return true;
  if (/<error[\s>]/i.test(t)) return true;
  return false;
}

// Unterscheidet Schreib- von Lesevorgaengen. Das Portal feuert laufend
// $batch-Anfragen, im Test 27 in wenigen Minuten. Wuerde man alle
// protokollieren, findet man den echten Fehler nicht mehr. Gesichert wird
// weiterhin bei jeder Anfrage, protokolliert nur bei Schreibvorgaengen
// und bei Fehlern.
function isWriteRequest(body) {
  try {
    const b = (typeof body === 'string') ? body : '';
    if (!b) return false;
    return /(MERGE|PATCH|PUT|DELETE)\s+\S*(SoHeaderSet|SoItemSet)/i.test(b)
        || /POST\s+\S*(SoItemSet|SoHeaderSet)/i.test(b);
  } catch (e) { return false; }
}

function installNetworkMonitor() {
  if (window.__sramBkNet) return;
  window.__sramBkNet = true;

  // XMLHttpRequest
  try {
    const XO = XMLHttpRequest.prototype.open;
    const XS = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url) {
      try { this.__sramM = method; this.__sramU = url; } catch (e) {}
      return XO.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function () {
      try {
        const self = this;
        if (looksLikeSave(self.__sramM, self.__sramU)) {
          const istSchreiben = isWriteRequest(arguments[0]);
          // Vor dem Absenden sichern - das ist der Stand, der gespeichert werden soll
          snapshotNow(istSchreiben ? 'before saving' : 'automatic');
          self.addEventListener('loadend', function () {
            try {
              let txt = '';
              try { if (!self.responseType || self.responseType === 'text') txt = String(self.responseText || ''); } catch (e) {}
              const bad = looksLikeError(self.status, txt);
              const sessionWeg = looksLikeSessionLoss(self.status, txt);
              if (sessionWeg) {
                snapshotNow('Session expired');
                addEvent({ type: 'session-expired', status: self.status,
                           method: String(self.__sramM || '').toUpperCase(),
                           url: trimUrl(self.__sramU), snippet: errorExcerpt(txt, self.status) });
                markSaveState('session-expired', 'HTTP ' + self.status);
                log('Session appears expired - state backed up.');
              }
              // Lesevorgaenge ohne Fehler nicht protokollieren
              if (!sessionWeg && (bad || istSchreiben)) {
                addEvent({
                  type: bad ? 'save-failed' : 'save-ok',
                  status: self.status,
                  method: String(self.__sramM || '').toUpperCase(),
                  url: trimUrl(self.__sramU),
                  snippet: bad ? errorExcerpt(txt, self.status) : null
                });
              }
              if (!sessionWeg && (bad || istSchreiben)) markSaveState(bad ? 'failed' : 'ok', bad ? ('HTTP ' + self.status) : null);
              if (bad) log('Save failed - backup kept. Status', self.status);
            } catch (e) {}
          });
        }
      } catch (e) {}
      return XS.apply(this, arguments);
    };
  } catch (e) { log('XHR-Monitor could not be installed:', e && e.message); }

  // fetch (falls das Portal teils fetch nutzt)
  try {
    const of = window.fetch;
    if (typeof of === 'function') {
      window.fetch = function (input, init) {
        let url = null, method = 'GET';
        try {
          url = (typeof input === 'string') ? input : (input && input.url);
          method = (init && init.method) || (input && input.method) || 'GET';
        } catch (e) {}
        const isSave = looksLikeSave(method, url);
        const istSchreiben = isSave && isWriteRequest(init && init.body);
        if (isSave) snapshotNow(istSchreiben ? 'before saving' : 'automatic');
        return of.apply(this, arguments).then(res => {
          if (isSave) {
            try {
              res.clone().text().then(txt => {
                const bad = looksLikeError(res.status, txt);
                if (bad || istSchreiben) {
                  addEvent({
                    type: bad ? 'save-failed' : 'save-ok',
                    status: res.status, method: String(method).toUpperCase(),
                    url: trimUrl(url), snippet: bad ? errorExcerpt(txt, res.status) : null
                  });
                  markSaveState(bad ? 'failed' : 'ok', bad ? ('HTTP ' + res.status) : null);
                }
              }).catch(() => {});
            } catch (e) {}
          }
          return res;
        });
      };
    }
  } catch (e) { log('fetch-Monitor could not be installed:', e && e.message); }
}

// ============================================================
// OBERFLAECHE (nur im obersten Fenster)
// ============================================================
let panel = null;
// Merkt, welche Sicherungen aufgeklappt sind. Das Panel aktualisiert sich
// alle 5 Sekunden selbst; ohne diesen Merker klappte der Inhalt dabei
// sofort wieder zu.
let openDetails = {};
// Das Protokoll ist im Alltag Beiwerk und wird daher zugeklappt
// angezeigt. Nur fehlgeschlagene Eintraege sind interessant.
let logOpen = false;

function fmtAge(ts) {
  if (!ts) return '–';
  const s = Math.round((Date.now() - ts) / 1000);
  if (s < 60) return 'vor ' + s + ' Sek.';
  if (s < 3600) return 'vor ' + Math.round(s / 60) + ' Min.';
  if (s < 86400) return 'vor ' + Math.round(s / 3600) + ' Std.';
  return 'vor ' + Math.round(s / 86400) + ' Tg.';
}
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function createLauncher() {
  if (document.getElementById('sram-bk-launcher')) return;
  const btn = document.createElement('button');
  btn.id = 'sram-bk-launcher';
  btn.type = 'button';
  // Logo mit fester Hoehe und automatischer Breite -> kein Verzerren.
  btn.innerHTML = '<img src="data:image/png;base64,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" alt="SRAM" style="height:11px;width:auto;flex-shrink:0;display:block;" />' +
    '<span>Backup</span>' +
    '<span id="sram-bk-badge" style="background:#fff;color:#E31836;border-radius:9px;padding:0 5px;font-size:10px;font-weight:700;">0</span>';
  // Position bewusst hoeher als die Portal-Leiste: bei der Auftragserstellung
  // sitzt unten links der Reset-Knopf, den darf der Backup-Knopf nicht verdecken.
  btn.style.cssText = 'position:fixed;left:20px;bottom:140px;z-index:2147483000;background:#E31836;color:#fff;border:none;border-radius:4px;' +
    'display:flex;align-items:center;gap:7px;padding:8px 13px;font-size:12px;font-weight:600;cursor:pointer;' +
    'font-family:Arial,Helvetica,sans-serif;box-shadow:0 3px 14px rgba(0,0,0,0.28);letter-spacing:0.02em;';
  ['mousedown', 'pointerdown', 'touchstart'].forEach(ev => btn.addEventListener(ev, e => { e.stopPropagation(); if (ev === 'mousedown') e.preventDefault(); }));
  btn.addEventListener('click', togglePanel);
  document.body.appendChild(btn);
  updateBadge();
  setInterval(updateBadge, 4000);
}

function updateBadge() {
  const b = document.getElementById('sram-bk-badge');
  if (!b) return;
  const n = listBackupKeys().length;
  b.textContent = String(n);
  const launcher = document.getElementById('sram-bk-launcher');
  const failed = listBackupKeys().some(k => { const s = lsGet(k, null);
    return s && s.saveState && (s.saveState.state === 'failed' || s.saveState.state === 'session-expired'); });
  if (launcher) launcher.style.background = failed ? '#C62828' : '#E31836';
}

function togglePanel() {
  if (panel) { panel.remove(); panel = null; return; }
  buildPanel();
}

function buildPanel() {
  panel = document.createElement('div');
  panel.id = 'sram-bk-panel';
  panel.style.cssText = 'position:fixed;left:20px;bottom:182px;width:460px;max-height:70vh;z-index:2147483001;background:#fff;' +
    'border:1px solid #D0D0D0;border-radius:6px;box-shadow:0 8px 28px rgba(0,0,0,.28);display:flex;flex-direction:column;' +
    'font-family:Arial,Helvetica,sans-serif;color:#312929;overflow:hidden;';
  panel.innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#E31836;border-bottom:1px solid #B2132B;color:#fff;flex-shrink:0;">' +
      '<img src="data:image/png;base64,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" alt="SRAM" style="height:15px;width:auto;flex-shrink:0;display:block;" />' +
      '<span style="font-size:13px;font-weight:600;flex:1;">Order Backup</span>' +
      '<button id="sram-bk-x" style="background:none;border:none;color:#fff;cursor:pointer;font-size:17px;line-height:1;padding:0 3px;">✕</button>' +
    '</div>' +
    '<div style="padding:8px 12px;background:#FFF8E1;border-bottom:1px solid #F0E3B0;font-size:11px;color:#7A5B00;flex-shrink:0;">' +
      'Saves entries locally in the browser. Restoring only fills <b>empty</b> fields.' +
    '</div>' +
    '<div id="sram-bk-body" style="overflow-y:auto;padding:12px;font-size:12px;line-height:1.5;"></div>';

  ['mousedown', 'pointerdown', 'touchstart'].forEach(ev => panel.addEventListener(ev, e => {
    e.stopPropagation();
    if (ev === 'mousedown' && !/^(TEXTAREA|INPUT|BUTTON)$/.test(e.target.tagName)) e.preventDefault();
  }));

  document.body.appendChild(panel);
  document.getElementById('sram-bk-x').addEventListener('click', () => { panel.remove(); panel = null; });
  renderBody();
}

function renderBody() {
  const body = document.getElementById('sram-bk-body');
  if (!body) return;

  const st = lsGet(KEY_STATUS, null);
  const keys = listBackupKeys().sort();
  const logArr = lsGet(KEY_LOG, []).slice().reverse();

  let h = '';

  // Erkennung
  h += '<div style="font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#777;margin-bottom:6px;">Detection</div>';
  if (!st) {
    h += '<div style="background:#F7F7F7;border:1px solid #E5E5E5;border-radius:4px;padding:9px;margin-bottom:14px;">' +
         'No response yet. Please open an order (tab <b>Order Data</b>).</div>';
  } else {
    const ok = st.found;
    h += '<div style="background:' + (ok ? '#EDF7F1' : '#FFF4F4') + ';border:1px solid ' + (ok ? '#BFE3CD' : '#F3C9C9') +
         ';border-radius:4px;padding:9px;margin-bottom:14px;">' +
         '<div>' + (ok ? '✔ Order data detected' : '✖ No order data found') + ' · <span style="color:#777;">' + fmtAge(st.ts) + '</span></div>';
    if (ok) {
      h += '<div style="margin-top:5px;">Order <b>' + esc(st.order) + '</b> · Items: <b>' + st.itemCount + '</b> · Attachments: ' + st.attachments + '</div>';
      if (st.textLens) {
        h += '<div style="margin-top:3px;color:#555;">Text lengths &ndash; Internal Memo: ' + st.textLens.IntMemo +
             ' · Shipping Note: ' + st.textLens.ShipNote + ' · Header Note: ' + st.textLens.HeadNote + '</div>';
      }
      h += '<div style="margin-top:3px;color:#999;font-size:11px;">Source: ' + esc(st.via) + '</div>';
    }
    h += '</div>';
  }

  // Sicherungen
  const bytes = storageBytes();
  h += '<div style="font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#777;margin-bottom:6px;">' +
       'Backups (' + keys.length + ' of max. ' + MAX_ORDERS + ') &middot; ' + Math.round(bytes/1024) + ' KB</div>';
  if (bytes > WARN_BYTES) {
    h += '<div style="background:#FFF8E1;border:1px solid #F0E3B0;border-radius:4px;padding:7px 9px;margin-bottom:8px;font-size:11px;color:#7A5B00;">' +
         'Storage is filling up. Older backups are removed automatically.</div>';
  }
  if (!keys.length) {
    h += '<div style="background:#F7F7F7;border:1px solid #E5E5E5;border-radius:4px;padding:9px;margin-bottom:14px;color:#666;">' +
         'No backup yet. A backup is made automatically as soon as texts or items are present in the order.</div>';
  } else {
    keys.forEach(k => {
      const s = lsGet(k, null);
      if (!s) return;
      const failed = s.saveState && s.saveState.state === 'failed';
      const sessionLost = s.saveState && s.saveState.state === 'session-expired';
      // Ist der gerade geoeffnete Auftrag derselbe wie in dieser Sicherung?
      // Nur dann kann zurueckgeschrieben werden, deshalb wird es deutlich
      // gekennzeichnet statt den Knopf still ins Leere laufen zu lassen.
      const istAktuell = !!(st && st.found && String(st.order) === String(s.order));
      const tl = s.texts || {};
      const rahmen = failed ? '#F3C9C9' : (istAktuell ? '#BFE3CD' : '#E5E5E5');
      const kante  = failed ? '#C62828' : (istAktuell ? '#1D9E75' : '#C7C7C7');
      const grund  = failed ? '#FFF8F8' : (istAktuell ? '#F3FAF6' : '#fff');
      h += '<div style="border:1px solid ' + rahmen + ';border-left:3px solid ' + kante +
           ';border-radius:4px;padding:9px;margin-bottom:8px;background:' + grund + ';">' +
           '<div style="display:flex;align-items:baseline;gap:6px;">' +
             '<b style="font-size:13px;">Order ' + esc(s.order) + '</b>' +
             '<span style="color:#777;font-size:11px;">' + fmtAge(s.ts) + '</span>' +
             (sessionLost ? '<span style="margin-left:auto;background:#B4780D;color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:3px;" title="' + fmtAge(s.saveState.at) + '">Session expired ' + fmtAge(s.saveState.at) + '</span>'
                 : failed ? '<span style="margin-left:auto;background:#C62828;color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:3px;">Save failed ' + fmtAge(s.saveState.at) + '</span>'
                     : (s.saveState && s.saveState.state === 'ok'
                        ? '<span style="margin-left:auto;background:#1D9E75;color:#fff;font-size:10px;padding:1px 6px;border-radius:3px;">saved</span>' : '')) +
           '</div>' +
           (istAktuell
             ? '<div style="margin-top:4px;"><span style="background:#1D9E75;color:#fff;font-size:10px;font-weight:700;padding:1px 6px;border-radius:3px;">This order is currently open</span></div>'
             : (st && st.found
                ? '<div style="margin-top:4px;color:#8A8A8A;font-size:10.5px;">Currently open is order ' + esc(st.order) + ' &ndash; open this order to restore into it.</div>'
                : '<div style="margin-top:4px;color:#8A8A8A;font-size:10.5px;">No open order detected.</div>')) +
           '<div style="margin-top:5px;color:#444;">Items: <b>' + (s.items ? s.items.length : 0) + '</b>' +
             ' · Texts: ' + ((tl.TextIntMemo || '').length + (tl.TextShipNote || '').length + (tl.TextHeadNote || '').length) + ' chars' +
             ' · Attachments: ' + ((s.attachments && s.attachments.length) || 0) +
             ' · Correspondence: ' + (s.correspondenceCount || 0) +
             ((Array.isArray(s.correspondence) && s.correspondence.some(c => korrText(c)))
               ? ' <span style="background:#EDF7F1;border:1px solid #BFE3CD;color:#1A7A45;font-size:10px;padding:0 5px;border-radius:2px;">content saved</span>'
               : '') +
             ((s.correspondenceDraft && s.correspondenceDraft.text)
               ? ' <span style="background:#FFF4D6;border:1px solid #E8D9A6;color:#7A5B00;font-size:10px;padding:0 5px;border-radius:2px;">draft ' + s.correspondenceDraft.text.length + ' chars</span>'
               : '') + '</div>' +
           '<div style="margin-top:3px;color:#888;font-size:11px;">Reason: ' + esc(s.reason || '–') +
             (s.merged ? ' · merged from several states' : '') + '</div>' +
           // Der Hauptknopf steht bewusst direkt auf der Karte: im Ernstfall
           // will man zurueckschreiben, nicht erst aufklappen.
           (function () {
             const tx = s.texts || {};
             const hatText = !!((tx.TextIntMemo || '') + (tx.TextShipNote || '') + (tx.TextHeadNote || ''));
             const nach = (s.items || []).filter(i => i._parentItem);
             const hatEntwurf = !!(s.correspondenceDraft && s.correspondenceDraft.text) ||
                                (Array.isArray(s.correspondence) && s.correspondence.some(c => korrText(c)));
             const teile = [];
             const posFelder = (s.items || []).filter(i => !i._parentItem).length;
             if (hatText) teile.push('Texts');
             if (posFelder) teile.push('Item fields');
             if (hatEntwurf) teile.push('Correspondence');
             if (nach.length) teile.push(nach.length + ' material' + (nach.length > 1 ? 's' : ''));
             if (!teile.length) return '';
             const aktiv = istAktuell;
             return '<div style="margin-top:8px;">' +
               '<button class="sram-bk-restore-all" data-k="' + esc(k) + '" ' + (aktiv ? '' : 'disabled ') +
               'title="' + (aktiv ? '' : 'Only possible while this order is open') + '" ' +
               'style="width:100%;font-size:12px;font-weight:700;padding:9px 12px;border:none;border-radius:4px;' +
               'cursor:' + (aktiv ? 'pointer' : 'not-allowed') + ';background:' + (aktiv ? '#E31836' : '#D8D8D8') +
               ';color:#fff;">\u21B3 Restore everything (' + teile.join(' + ') + ')</button>' +
               '<div class="sram-bk-restore-result" data-k="' + esc(k) + '" style="display:none;margin-top:8px;"></div>' +
               '</div>';
           })() +
           '<div style="margin-top:7px;display:flex;gap:6px;">' +
             '<button class="sram-bk-det" data-k="' + esc(k) + '" style="font-size:11px;padding:4px 9px;border:1px solid #C7C7C7;background:#F7F7F7;border-radius:3px;cursor:pointer;">Show content</button>' +
             '<button class="sram-bk-cp"  data-k="' + esc(k) + '" style="font-size:11px;padding:4px 9px;border:1px solid #C7C7C7;background:#F7F7F7;border-radius:3px;cursor:pointer;">Copy as text</button>' +
             ((failed || sessionLost) ? '<button class="sram-bk-clearflag" data-k="' + esc(k) + '" style="font-size:11px;padding:4px 9px;border:1px solid #C7C7C7;background:#F7F7F7;border-radius:3px;cursor:pointer;">Clear flag</button>' : '') +
             '<button class="sram-bk-del" data-k="' + esc(k) + '" style="font-size:11px;padding:4px 9px;border:1px solid #E0B4B4;background:#FFF4F4;color:#A02020;border-radius:3px;cursor:pointer;margin-left:auto;">Discard</button>' +
           '</div>' +
           '<div class="sram-bk-detbox" id="det-' + esc(k) + '" style="display:none;margin-top:8px;"></div>' +
           '</div>';
    });
  }

  // Protokoll
  const fehlerAnzahl = logArr.filter(e => e.type === 'save-failed' || e.type === 'session-expired').length;
  h += '<div style="margin:14px 0 6px;">' +
       '<button id="sram-bk-logtoggle" style="background:none;border:none;padding:0;cursor:pointer;' +
       'font-weight:700;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#777;' +
       'font-family:Arial,Helvetica,sans-serif;">' +
       (logOpen ? '\u25BC' : '\u25B6') + ' Save attempts (' + logArr.length + ')' +
       (fehlerAnzahl ? ' <span style="background:#C62828;color:#fff;border-radius:9px;padding:0 6px;font-size:10px;">' + fehlerAnzahl + '</span>' : '') +
       '</button></div>';
  if (!logOpen) {
    h += '';
  } else if (!logArr.length) {
    h += '<div style="color:#666;background:#F7F7F7;border:1px solid #E5E5E5;border-radius:4px;padding:9px;">Noch nichts protokolliert.</div>';
  } else {
    h += '<div style="border:1px solid #E5E5E5;border-radius:4px;overflow:hidden;">';
    logArr.slice(0, 20).forEach((e, i) => {
      const bad = e.type === 'save-failed' || e.type === 'session-expired';
      h += '<div style="padding:7px 9px;border-bottom:' + (i === 19 ? 'none' : '1px solid #F0F0F0') + ';background:' + (bad ? '#FFF8F8' : '#fff') + ';">' +
           '<div><span style="color:' + (bad ? '#C62828' : '#1D9E75') + ';font-weight:700;">' + (bad ? '✖' : '✔') + ' ' + esc(e.type) + '</span>' +
           (e.order ? ' <span style="background:#EEE;color:#444;font-size:10.5px;font-weight:700;border-radius:2px;padding:1px 5px;">Order ' + esc(e.order) + '</span>' : '') +
           ' <span style="color:#888;font-size:11px;">HTTP ' + esc(e.status) + ' · ' + esc(e.method) + ' · ' + fmtAge(e.ts) + '</span></div>';
      if (e.snippet) {
        h += '<div style="margin-top:4px;"><button class="sram-bk-snip" data-i="' + i + '" style="font-size:10.5px;padding:2px 7px;border:1px solid #C7C7C7;background:#F7F7F7;border-radius:3px;cursor:pointer;">Show error text</button>' +
             '<div id="snip-' + i + '" style="display:none;margin-top:5px;"></div></div>';
      }
      h += '</div>';
    });
    h += '</div>';
  }

  body.innerHTML = h;

  // Aktionen verdrahten
  body.querySelectorAll('.sram-bk-det').forEach(b => b.addEventListener('click', () => {
    const k = b.getAttribute('data-k');
    const box = document.getElementById('det-' + k);
    if (!box) return;
    if (box.style.display === 'block') {
      box.style.display = 'none'; b.textContent = 'Show content';
      delete openDetails[k];
      return;
    }
    box.style.display = 'block';
    b.textContent = 'Hide content';
    box.innerHTML = renderDetail(lsGet(k, null));
    openDetails[k] = true;
    wireRestore(box, k);
  }));

  // Nach einer Aktualisierung die vorher offenen Inhalte wieder aufklappen
  Object.keys(openDetails).forEach(k => {
    const box = document.getElementById('det-' + k);
    const btn = body.querySelector('.sram-bk-det[data-k="' + k + '"]');
    if (box && btn) {
      box.style.display = 'block';
      btn.textContent = 'Hide content';
      box.innerHTML = renderDetail(lsGet(k, null));
      wireRestore(box, k);
    } else {
      delete openDetails[k];
    }
  });

  body.querySelectorAll('.sram-bk-cp').forEach(b => b.addEventListener('click', () => {
    const s = lsGet(b.getAttribute('data-k'), null);
    if (!s) return;
    const txt = plainText(s);
    navigator.clipboard.writeText(txt).then(() => {
      b.textContent = '✔ kopiert';
      setTimeout(() => { b.textContent = 'Copy as text'; }, 2500);
    }).catch(() => { b.textContent = '✖ not possible'; });
  }));

  // Hauptknopf jeder Karte verdrahten
  body.querySelectorAll('.sram-bk-restore-all').forEach(b => {
    const k = b.getAttribute('data-k');
    const ziel = body.querySelector('.sram-bk-restore-result[data-k="' + k + '"]');
    wireRestoreButton(b, ziel, k);
  });

  body.querySelectorAll('.sram-bk-clearflag').forEach(b => b.addEventListener('mousedown', e => e.preventDefault()));
  body.querySelectorAll('.sram-bk-clearflag').forEach(b => b.addEventListener('click', () => {
    const k = b.getAttribute('data-k');
    const s2 = lsGet(k, null);
    if (!s2) return;
    delete s2.saveState;
    lsSet(k, s2);
    renderBody();
    updateBadge();
  }));

  body.querySelectorAll('.sram-bk-del').forEach(b => b.addEventListener('click', () => {
    const k = b.getAttribute('data-k');
    if (!window.confirm('Really discard this backup?\n\n(Affects only the local backup, not the order in the portal.)')) return;
    try { localStorage.removeItem(k); } catch (e) {}
    lastFp = null;
    renderBody();
    updateBadge();
  }));

  const lt = document.getElementById('sram-bk-logtoggle');
  if (lt) {
    lt.addEventListener('mousedown', e => e.preventDefault());
    lt.addEventListener('click', () => { logOpen = !logOpen; renderBody(); });
  }

  body.querySelectorAll('.sram-bk-snip').forEach(b => b.addEventListener('click', () => {
    const i = parseInt(b.getAttribute('data-i'), 10);
    const arr = lsGet(KEY_LOG, []).slice().reverse();
    const box = document.getElementById('snip-' + i);
    if (!box || !arr[i]) return;
    if (box.style.display === 'block') { box.style.display = 'none'; b.textContent = 'Show error text'; return; }
    box.style.display = 'block';
    b.textContent = 'Hide error text';
    const ta = document.createElement('textarea');
    ta.readOnly = true;
    ta.value = arr[i].snippet || '';
    ta.style.cssText = 'width:100%;height:200px;font-family:monospace;font-size:10.5px;border:1px solid #E5E5E5;border-radius:3px;padding:6px;background:#FAFAFA;';
    box.innerHTML = '';
    box.appendChild(ta);
  }));
}

// ── Zurueckschreiben in die Portalfelder ────────────────────────────
// Genutzt wird die Feldlogik aus dem Textteil (findFieldByLabel,
// isFieldEditable, die SAP-kompatiblen Schreibwege). Sie liegt in einem
// eigenen Funktionsblock, deshalb wird sie ueber window.__sramFieldApi
// bereitgestellt. Doppelt implementieren waere eine Fehlerquelle: die
// Besonderheiten (SAPUI5-Control-API, gesperrte Felder, iframes) stecken
// alle dort drin.
// Die Beschriftungen der Zielfelder unterscheiden sich je Standort
// (Deutschland: "Interne Info", Australien: "Internal Info"). Sie werden
// deshalb aus der Bruecke bezogen, die sie im Textteil selbst ermittelt.
function feldZuordnung() {
  const api = fieldApi();
  const l = (api && api.labels) || {};
  return [
    { key: 'TextIntMemo',  label: l.TextIntMemo  || 'Internal Memo', anzeige: 'Internal Memo' },
    { key: 'TextShipNote', label: l.TextShipNote || 'Shipping Note', anzeige: 'Shipping Note' },
    { key: 'TextHeadNote', label: l.TextHeadNote || 'Header Note',   anzeige: 'Header Note' }
  ];
}

function fieldApi() {
  try { return window.__sramFieldApi || (window.top && window.top.__sramFieldApi) || null; }
  catch (e) { return null; }
}

function restoreTexts(snap) {
  const api = fieldApi();
  if (!api) return [{ ok: false, feld: '-', meldung: 'field logic not available (is the text part running?)' }];

  const ergebnis = [];
  feldZuordnung().forEach(f => {
    const text = (snap.texts && snap.texts[f.key]) || '';
    if (!text) { ergebnis.push({ ok: null, feld: f.anzeige, meldung: 'empty in the backup, skipped' }); return; }

    let el = null;
    try { el = api.findFieldByLabel(f.label); } catch (e) {}
    if (!el) { ergebnis.push({ ok: false, feld: f.anzeige, meldung: 'field not found in the portal' }); return; }

    let editierbar = true;
    try { editierbar = api.isFieldEditable(el); } catch (e) {}
    if (!editierbar) { ergebnis.push({ ok: false, feld: f.anzeige, meldung: 'locked - click "Edit" first' }); return; }

    // Vorhandenen Inhalt NICHT ueberschreiben: lieber ueberspringen als
    // etwas zerstoeren, das der Bearbeiter gerade getippt hat.
    let aktuell = '';
    try { aktuell = api.readField(el) || ''; } catch (e) {}
    if (aktuell.trim()) { ergebnis.push({ ok: null, feld: f.anzeige, meldung: 'field is not empty, skipped' }); return; }

    let modus = null;
    try { modus = api.writeField(el, text); } catch (e) { modus = 'fehler'; }
    if (modus === 'field') ergebnis.push({ ok: true, feld: f.anzeige, meldung: text.length + ' chars inserted' });
    else if (modus === 'locked') ergebnis.push({ ok: false, feld: f.anzeige, meldung: 'locked - copied to clipboard' });
    else if (modus === 'clipboard') ergebnis.push({ ok: false, feld: f.anzeige, meldung: 'no target - copied to clipboard' });
    else ergebnis.push({ ok: false, feld: f.anzeige, meldung: 'write failed' });
  });
  return ergebnis;
}

// ── Materialien wieder anlegen ──────────────────────────────────────
// Das rote Plus ist eine sap.ui.table.RowAction. SAPUI5 rendert diese
// Zeilenaktionen in einem eigenen Container NEBEN der Tabelle, nicht in
// den Zeilen selbst, und eine Zuordnung ueber IDs gibt es nicht. Sie
// laeuft daher ueber die vertikale Ueberlappung.
//
// Wichtig ist die Hunderter-Logik: 100, 200, 300 sind die Produkte,
// 101, 201 das jeweils zugehoerige Material. Jedes Produkt hat sein
// eigenes Plus. Ein Klick an der falschen Zeile wuerde das Material dem
// falschen Produkt zuordnen - daher die Gegenpruefung vor dem Klick.

function normItem(v) { return String(v == null ? '' : v).replace(/^0+/, ''); }

function findItemsTable() {
  const api = fieldApi();
  const docs = (api && api.allDocs) ? api.allDocs() : [document];
  for (const doc of docs) {
    try {
      const w = doc.defaultView;
      if (!(w && w.sap && w.sap.ui && w.sap.ui.core && w.sap.ui.core.Element)) continue;
      const all = w.sap.ui.core.Element.registry.all();
      for (const id in all) {
        if (!/--itemsTable$/.test(id)) continue;
        const tbl = all[id];
        const b = tbl.getBinding && (tbl.getBinding('rows') || tbl.getBinding('items'));
        if (b) return { tbl: tbl, binding: b, w: w, doc: doc };
      }
    } catch (e) {}
  }
  return null;
}

function findPlusForItem(tc, itemNo) {
  const ctxs = tc.binding.getContexts(0, 200) || [];
  let idx = -1;
  ctxs.forEach((c, i) => {
    const o = c.getObject() || {};
    if (normItem(o.Item) === normItem(itemNo)) idx = i;
  });
  if (idx < 0) return { fehler: 'Product row ' + itemNo + ' not found in the table' };

  const rows = tc.tbl.getRows ? tc.tbl.getRows() : [];
  const row = rows[idx];
  const dom = row && row.getDomRef && row.getDomRef();
  if (!dom) return { fehler: 'Row ' + itemNo + ' not visible - please scroll to it in the table' };
  const rb = dom.getBoundingClientRect();

  const rowCtx = row.getBindingContext('order') || row.getBindingContext();
  const rowItem = rowCtx && rowCtx.getObject() && rowCtx.getObject().Item;
  if (normItem(rowItem) !== normItem(itemNo)) {
    return { fehler: 'Safety abort: row does not match item ' + itemNo };
  }

  const aktionen = Array.from(tc.doc.querySelectorAll('div.sapUiTableAction'));
  for (const a of aktionen) {
    const ab = a.getBoundingClientRect();
    if (!ab.width && !ab.height) continue;
    const mitte = ab.top + ab.height / 2;
    if (mitte < rb.top || mitte > rb.bottom) continue;
    const icon = a.querySelector('span[class*="sapUiIcon"]') || a;
    return { icon: icon, aktion: a, zeileIndex: idx };
  }
  return { fehler: 'No plus at item ' + itemNo + ' (only product rows have one)' };
}

// nurLeere = true: vorhandene Werte werden nicht angetastet. Das wird beim
// Auffuellen BESTEHENDER Produktzeilen gebraucht - dort darf nichts
// ueberschrieben werden, was der Bearbeiter schon eingetragen hat.
function fillRow(tc, rowIndex, daten, erlaubt, nurLeere) {
  const rows = tc.tbl.getRows ? tc.tbl.getRows() : [];
  const row = rows[rowIndex];
  if (!row) return { ok: false, gesetzt: 0, offen: ['new row not reachable'] };
  let gesetzt = 0; const offen = [];
  const cells = row.getCells ? row.getCells() : [];
  cells.forEach(c => {
    try {
      const bi = c.getBindingInfo && (c.getBindingInfo('value') || c.getBindingInfo('selectedKey') || c.getBindingInfo('selected'));
      const pfad = bi && bi.parts && bi.parts[0] && bi.parts[0].path;
      if (!pfad) return;
      const feld = String(pfad).split('/').pop();
      if (!(feld in daten)) return;
      if (erlaubt && erlaubt.indexOf(feld) < 0) return;
      const wert = daten[feld];
      if (wert === null || wert === undefined || wert === '') return;

      if (nurLeere) {
        // Steht im Feld schon etwas? Dann nicht anfassen.
        let aktuell = null;
        try {
          if (typeof c.getSelectedKey === 'function' && /\.(Select|ComboBox)$/.test(c.getMetadata().getName())) aktuell = c.getSelectedKey();
          else if (typeof c.getValue === 'function') aktuell = c.getValue();
          else if (typeof c.getSelected === 'function') aktuell = c.getSelected();
        } catch (e) {}
        const leer = (aktuell === null || aktuell === undefined || aktuell === '' || aktuell === false);
        if (!leer) { offen.push(feld + ' (already filled, skipped)'); return; }
      }

      // Der Schreibweg wird nach dem CONTROL-TYP entschieden, nicht nach der
      // Verfuegbarkeit einer Methode: sap.m.Select bringt ebenfalls ein
      // setValue() mit, das dort aber nichts bewirkt. Eine Pruefung
      // "hat setValue?" waere bei allen Dropdowns (Symptom, Status, Item
      // Category, Plant, Storage Loc.) ins Leere gelaufen.
      const typ = c.getMetadata().getName();
      const istAuswahl  = /\.(Select|ComboBox|MultiComboBox)$/.test(typ);
      const istHaken    = /\.(CheckBox|Switch)$/.test(typ);
      const istTextfeld = /\.(Input|TextArea|MaskInput|DatePicker)$/.test(typ);

      if (istAuswahl) {
        const schluessel = String(wert);
        let items = [];
        try { items = c.getItems ? (c.getItems() || []) : []; } catch (e) {}

        // In einer FRISCH angelegten Zeile ist die Auswahlliste oft noch
        // leer (bei Symptom beobachtet: 0 Eintraege). setSelectedKey wuerde
        // dann ins Leere greifen. Deshalb in diesem Fall direkt in das
        // Datenmodell schreiben - der Wert erscheint, sobald die Liste
        // nachgeladen ist, und wird beim Speichern mitgesendet.
        if (!items.length) {
          let viaModell = false;
          try {
            const ctx = row.getBindingContext('order') || row.getBindingContext();
            if (ctx && ctx.getModel && ctx.getModel().setProperty) {
              ctx.getModel().setProperty(pfad, schluessel, ctx);
              const o = ctx.getObject() || {};
              viaModell = String(o[feld]) === schluessel;
            }
          } catch (e) {}
          if (viaModell) { gesetzt++; return; }
          offen.push(feld + ' (option list empty, value cannot be set)');
          return;
        }

        if (!items.some(it => String(it.getKey ? it.getKey() : '') === schluessel)) {
          offen.push(feld + ' (option ' + schluessel + ' not in the list)');
          return;
        }
        c.setSelectedKey(schluessel);
        try { if (typeof c.fireChange === 'function') c.fireChange({ selectedItem: c.getSelectedItem ? c.getSelectedItem() : null }); } catch (e) {}
        try { if (c.getSelectedKey && String(c.getSelectedKey()) !== schluessel) { offen.push(feld + ' (not applied)'); return; } } catch (e) {}
        gesetzt++;
      } else if (istHaken && typeof wert === 'boolean') {
        if (typeof c.setSelected === 'function') c.setSelected(wert);
        else if (typeof c.setState === 'function') c.setState(wert);
        try { if (typeof c.fireSelect === 'function') c.fireSelect({ selected: wert }); } catch (e) {}
        gesetzt++;
      } else if (istTextfeld && typeof c.setValue === 'function') {
        c.setValue(String(wert));
        try { if (typeof c.fireChange === 'function') c.fireChange({ value: String(wert) }); } catch (e) {}
        try { if (c.getValue && String(c.getValue()) !== String(wert)) { offen.push(feld + ' (not applied)'); return; } } catch (e) {}
        gesetzt++;
      } else {
        offen.push(feld + ' (' + typ.split('.').pop() + ' not writable)');
      }
    } catch (e) {}
  });
  return { ok: gesetzt > 0, gesetzt: gesetzt, offen: offen };
}

// Fuellt die Felder BESTEHENDER Positionszeilen wieder auf.
//
// Hintergrund: Die Produktzeile selbst (100, 200, ...) kommt nach einem
// Fehlschlag vom Backend zurueck, ihre Eingabefelder sind aber leer.
// Genau dort stehen Symptom, Serial Number, Status, Delivery Date,
// Item Text, Purchase Date und CQF Number - im Test fehlte das Symptom,
// weil das Zurueckschreiben bisher nur Kopftexte und neue Materialien
// bearbeitet hat.
function restoreItemFields(snap, fertig) {
  const tc = findItemsTable();
  if (!tc) { fertig([{ ok: false, text: 'items table not found' }]); return; }

  const erlaubt = Array.isArray(snap.editableFields) ? snap.editableFields : null;
  const melde = [];
  const ctxs = tc.binding.getContexts(0, 200) || [];
  const rows = tc.tbl.getRows ? tc.tbl.getRows() : [];

  (snap.items || []).forEach(it => {
    if (it._parentItem) return;                    // Nachtraege laufen ueber restoreMaterials
    if (!it.Item) return;
    let idx = -1;
    ctxs.forEach((c, i) => {
      const o = c.getObject() || {};
      if (normItem(o.Item) === normItem(it.Item)) idx = i;
    });
    if (idx < 0) { melde.push({ ok: false, text: 'Item ' + it.Item + ': Row nicht gefunden' }); return; }
    if (!rows[idx]) { melde.push({ ok: false, text: 'Item ' + it.Item + ': Row nicht sichtbar' }); return; }

    const res = fillRow(tc, idx, it._all || it, erlaubt, true);
    if (res.gesetzt) {
      melde.push({ ok: true, text: 'Item ' + it.Item + ': ' + res.gesetzt + ' field(s) filled' +
        (res.offen.length ? ' (' + res.offen.length + ' skipped)' : '') });
    } else {
      melde.push({ ok: null, text: 'Item ' + it.Item + ': nothing to fill' });
    }
  });

  fertig(melde.length ? melde : [{ ok: null, text: 'no item fields to fill' }]);
}

function restoreMaterials(snap, fertig) {
  const api = fieldApi();
  const melde = [];
  if (!api || !api.simulateRealClick) { fertig([{ ok: false, text: 'click logic not available (is the text part running?)' }]); return; }

  const tc = findItemsTable();
  if (!tc) { fertig([{ ok: false, text: 'items table not found - is the order in edit mode?' }]); return; }

  const erlaubt = Array.isArray(snap.editableFields) ? snap.editableFields : null;

  // Doppelte Zeilen vermeiden, wenn der Knopf mehrmals gedrueckt wird.
  // Der Vergleich laeuft ueber ANZAHLEN, nicht ueber "gibt es diese
  // Materialnummer schon": unter einer Position kann dieselbe Nummer
  // mehrfach berechtigt vorkommen (im Testauftrag lag 87.0100.999.502
  // zweimal unter Position 100). Angelegt wird daher nur die Differenz
  // zwischen Soll (Sicherung) und Ist (Auftrag).
  function istBestand() {
    const zaehler = {};
    try {
      const ctxs = tc.binding.getContexts(0, 200) || [];
      let aktuellerParent = null;
      ctxs.forEach(c => {
        const o = c.getObject() || {};
        const istNachtrag = /\/Actuals\/\d+$/.test(c.getPath());
        if (!istNachtrag) { aktuellerParent = normItem(o.Item); return; }
        if (!o.Material) return;                       // leere, noch nicht gefuellte Zeile
        const key = aktuellerParent + '|' + String(o.Material).replace(/\./g, '');
        zaehler[key] = (zaehler[key] || 0) + 1;
      });
    } catch (e) {}
    return zaehler;
  }

  const bestand = istBestand();
  const uebersprungen = [];
  const aufgaben = [];
  const sollZaehler = {};

  (snap.items || []).forEach(i => {
    if (!i._parentItem) return;
    const key = normItem(i._parentItem) + '|' + String(i.Material || '').replace(/\./g, '');
    sollZaehler[key] = (sollZaehler[key] || 0) + 1;
    const schonDa = bestand[key] || 0;
    if (sollZaehler[key] <= schonDa) {
      uebersprungen.push({ ok: null, text: i.Material + ' at item ' + i._parentItem + ': already present in the order, skipped' });
      return;
    }
    aufgaben.push({ parent: i._parentItem, mat: i });
  });

  if (!aufgaben.length) {
    fertig(uebersprungen.length ? uebersprungen
      : [{ ok: null, text: 'no added materials in the backup' }]);
    return;
  }
  uebersprungen.forEach(u => melde.push(u));

  let n = 0;
  function naechste() {
    if (n >= aufgaben.length) { fertig(melde); return; }
    const a = aufgaben[n++];
    const daten = a.mat._all || a.mat;

    const plus = findPlusForItem(tc, a.parent);
    if (plus.fehler) { melde.push({ ok: false, text: a.mat.Material + ' -> ' + plus.fehler }); naechste(); return; }

    const vorher = (tc.binding.getContexts(0, 200) || []).length;
    try { api.simulateRealClick(plus.icon); }
    catch (e) { melde.push({ ok: false, text: a.mat.Material + ' -> clicking the plus failed' }); naechste(); return; }

    let versuche = 0;
    (function warte() {
      versuche++;
      const ctxs = tc.binding.getContexts(0, 200) || [];
      if (ctxs.length > vorher) {
        let neuIdx = -1;
        ctxs.forEach((c, idx) => {
          const o = c.getObject() || {};
          if (/\/Actuals\/\d+$/.test(c.getPath()) && !o.Material) neuIdx = idx;
        });
        if (neuIdx < 0) neuIdx = ctxs.length - 1;
        const res = fillRow(tc, neuIdx, daten, erlaubt);
        melde.push({
          ok: res.ok,
          text: a.mat.Material + ' at item ' + a.parent + (res.ok
            ? ': created, ' + res.gesetzt + ' fields filled' + (res.offen.length ? ' (offen: ' + res.offen.join(', ') + ')' : '')
            : ': row created, fields could not be filled')
        });
        setTimeout(naechste, 400);
        return;
      }
      if (versuche < 12) { setTimeout(warte, 250); return; }
      melde.push({ ok: false, text: a.mat.Material + ' -> no new row appeared' });
      naechste();
    })();
  }
  naechste();
}

// Korrespondenz-Entwurf zurueckschreiben. Nutzt die Sonderbehandlung aus
// dem Textteil: das Feld traegt kein passendes Label und erscheint erst,
// wenn "Write Message" geklickt wurde. Diese Logik dort wiederzuverwenden
// ist sicherer, als sie hier nachzubauen.
function restoreCorrespondence(snap, fertig) {
  // Zu schreiben ist: ein noch offener Entwurf, und/oder die im Modell
  // gesicherten, aber noch nicht gespeicherten Nachrichten.
  const stuecke = [];
  if (Array.isArray(snap.correspondence)) {
    snap.correspondence.forEach(c => { const x = korrText(c); if (x) stuecke.push(x); });
  }
  const entwurfText = snap.correspondenceDraft && snap.correspondenceDraft.text;
  if (entwurfText && stuecke.indexOf(entwurfText) < 0) stuecke.push(entwurfText);

  if (!stuecke.length) { fertig([{ ok: null, text: 'Correspondence: nothing backed up' }]); return; }

  // Mehrere Nachrichten lassen sich nicht automatisch nacheinander
  // abschicken - dafuer muesste jeweils "Ok" im Dialog gedrueckt werden,
  // und das wuerde Nachrichten ungeprueft versenden. Deshalb wird die
  // erste eingefuegt und der Rest zum Uebernehmen angezeigt.
  const entwurf = stuecke[0];
  const weitere = stuecke.slice(1);

  const api = fieldApi();
  if (!api || !api.resolveCorrespondenceField) {
    fertig([{ ok: false, text: 'Correspondence: logic not available (is the text part running?)' }]);
    return;
  }

  api.resolveCorrespondenceField(function (el) {
    if (!el) {
      fertig([{ ok: false, text: 'Correspondence: field not found - please open "Write Message"' }]);
      return;
    }
    let vorhanden = '';
    try { vorhanden = api.readField(el) || ''; } catch (e) {}
    if (vorhanden.trim()) {
      fertig([{ ok: null, text: 'Correspondence: field is not empty, skipped' }]);
      return;
    }
    let modus = null;
    try { modus = api.writeField(el, entwurf); } catch (e) { modus = 'fehler'; }
    const rest = weitere.length
      ? [{ ok: null, text: 'Correspondence: ' + weitere.length + ' further message(s) must be transferred individually - text under "Show content"' }]
      : [];
    if (modus === 'field') fertig([{ ok: true, text: 'Correspondence: ' + entwurf.length + ' chars inserted' }].concat(rest));
    else if (modus === 'locked') fertig([{ ok: false, text: 'Correspondence: field locked - copied to clipboard' }]);
    else if (modus === 'clipboard') fertig([{ ok: false, text: 'Correspondence: no target - copied to clipboard' }]);
    else fertig([{ ok: false, text: 'Correspondence: write failed' }]);
  }, function () { /* Statusmeldungen des Textteils hier nicht anzeigen */ });
}

// Kopier-Knoepfe fuer Korrespondenz und Entwurf verdrahten. Das ist der
// verlaessliche Weg: Nachrichten lassen sich nicht automatisch abschicken
// (dafuer muesste "Ok" gedrueckt werden), kopieren und selbst einfuegen
// funktioniert dagegen immer.
function wireCopy(box, key) {
  box.querySelectorAll('.sram-bk-copykorr').forEach(b => {
    if (b.dataset.verdrahtet) return;
    b.dataset.verdrahtet = '1';
    b.addEventListener('mousedown', e => e.preventDefault());
    b.addEventListener('click', () => {
      const s = lsGet(key, null);
      if (!s) return;
      const i = b.getAttribute('data-i');
      let txt = '';
      if (i === 'draft') txt = (s.correspondenceDraft && s.correspondenceDraft.text) || '';
      else txt = korrText((s.correspondence || [])[parseInt(i, 10)] || {});
      if (!txt) return;
      const alt = b.textContent;
      navigator.clipboard.writeText(txt).then(() => {
        b.textContent = '\u2713 kopiert';
        setTimeout(() => { b.textContent = alt; }, 2500);
      }).catch(() => { b.textContent = '\u2717 not possible'; setTimeout(() => { b.textContent = alt; }, 2500); });
    });
  });
}

function wireRestore(box, key) { wireCopy(box, key); }

function wireRestoreButton(btn, ziel, key) {
  if (!btn || btn.dataset.verdrahtet) return;
  btn.dataset.verdrahtet = '1';

  function zeile(ok, text) {
    const farbe = ok === true ? '#1D9E75' : (ok === null ? '#8A8A8A' : '#C62828');
    const icon  = ok === true ? '\u2713' : (ok === null ? '\u2013' : '\u2717');
    return '<div style="color:' + farbe + ';">' + icon + ' ' + esc(text) + '</div>';
  }
  function ausgeben(html) {
    if (!ziel) return;
    ziel.style.display = 'block';
    ziel.innerHTML = '<div style="background:#F7F7F7;border:1px solid #E5E5E5;border-radius:4px;' +
      'padding:9px;font-size:11.5px;line-height:1.6;">' + html + '</div>';
  }

  btn.addEventListener('mousedown', e => e.preventDefault());
  btn.addEventListener('click', () => {
    const snap = lsGet(key, null);
    if (!snap) return;

    const nach = (snap.items || []).filter(i => i._parentItem);
    let frage = 'In order ' + snap.order + ' the following will be restored:\n\n';
    const tx = snap.texts || {};
    feldZuordnung().forEach(f => {
      const v = tx[f.key] || '';
      if (v) frage += '  ' + f.anzeige + ' (' + v.length + ' chars, only if empty)\n';
    });
    const korrStuecke = [];
    if (Array.isArray(snap.correspondence)) snap.correspondence.forEach(c => { const x = korrText(c); if (x) korrStuecke.push(x); });
    if (snap.correspondenceDraft && snap.correspondenceDraft.text && korrStuecke.indexOf(snap.correspondenceDraft.text) < 0) {
      korrStuecke.push(snap.correspondenceDraft.text);
    }
    if (korrStuecke.length) {
      frage += '  Correspondence: ' + korrStuecke.length + ' message(s) - the first is inserted last,\n' +
               '    the dialog stays open and must be confirmed manually with "Ok"\n';
    }
    const posListe = (snap.items || []).filter(i => !i._parentItem);
    if (posListe.length) {
      frage += '  Fields of items ' + posListe.map(i => i.Item).join(', ') +
               ' (symptom, serial, status ... empty fields only)\n';
    }
    nach.forEach(i => { frage += '  Material ' + i.Material + ' at item ' + i._parentItem + '\n'; });
    frage += '\nThis changes the order in the portal. Continue?';
    if (!window.confirm(frage)) return;

    btn.disabled = true;
    ausgeben('<div style="color:#7A5B00;">Wird zurueckgeschrieben...</div>');

    // 1. Texte
    const textErgebnis = restoreTexts(snap);
    let html = '<div style="font-weight:700;margin-bottom:3px;">Texts</div>' +
               textErgebnis.map(r => zeile(r.ok, r.feld + ': ' + r.meldung)).join('');

    const abschluss = () => '<div style="margin-top:7px;padding-top:6px;border-top:1px solid #E5E5E5;color:#7A5B00;">' +
      'Please check before saving.</div>';

    // 2. Korrespondenz (oeffnet bei Bedarf "Write Message")
    const hatEntwurf = korrStuecke.length > 0;

    // Reihenfolge: Texte -> Materialien -> Korrespondenz ZULETZT.
    //
    // Die Korrespondenz muss am Ende stehen: der "Write Message"-Dialog ist
    // modal. Solange er offen ist, ist die Positionstabelle nicht
    // erreichbar, das Anlegen der Materialien wuerde also scheitern.
    // Ausserdem bleibt der Dialog danach bewusst offen stehen - der
    // Bearbeiter muss den Text selbst mit "Ok" bestaetigen, damit das
    // System weiterarbeitet. Diesen Schritt nimmt das Script absichtlich
    // nicht ab, sonst wuerden Nachrichten ungeprueft abgeschickt.
    const zumSchluss = () => {
      if (!hatEntwurf) { ausgeben(html + abschluss()); btn.disabled = false; return; }
      ausgeben(html + '<div style="font-weight:700;margin:8px 0 3px;">Correspondence</div>' +
               '<div style="color:#7A5B00;">\u201eWrite Message\u201c is opening...</div>');
      restoreCorrespondence(snap, function (melde) {
        btn.disabled = false;
        ausgeben(html +
          '<div style="font-weight:700;margin:8px 0 3px;">Correspondence</div>' +
          melde.map(r => zeile(r.ok, r.text)).join('') +
          '<div style="margin-top:7px;padding-top:6px;border-top:1px solid #E5E5E5;color:#7A5B00;">' +
          'The dialog stays open: please check the text and confirm with <b>Ok</b>. ' +
          'Then save the order.</div>');
      });
    };

    // Reihenfolge: Texte -> Felder bestehender Positionen -> neue
    // Materialien -> Korrespondenz. Die Positionsfelder zuerst, weil das
    // Anlegen neuer Zeilen die Tabelle umbaut.
    const dannMaterial = () => {
      if (!nach.length) { setTimeout(zumSchluss, 200); return; }
      ausgeben(html + '<div style="font-weight:700;margin:8px 0 3px;">Materials</div>' +
               '<div style="color:#7A5B00;">Creating...</div>');
      restoreMaterials(snap, function (melde) {
        html += '<div style="font-weight:700;margin:8px 0 3px;">Materials</div>' +
                melde.map(r => zeile(r.ok, r.text)).join('');
        setTimeout(zumSchluss, 300);
      });
    };

    const hatPositionsfelder = (snap.items || []).some(i => !i._parentItem);
    if (hatPositionsfelder) {
      ausgeben(html + '<div style="font-weight:700;margin:8px 0 3px;">Item fields</div>' +
               '<div style="color:#7A5B00;">Filling...</div>');
      restoreItemFields(snap, function (melde) {
        html += '<div style="font-weight:700;margin:8px 0 3px;">Item fields</div>' +
                melde.map(r => zeile(r.ok, r.text)).join('');
        setTimeout(dannMaterial, 250);
      });
    } else {
      dannMaterial();
    }
  });
}

function renderDetail(s) {
  if (!s) return '<div style="color:#999;">Backup cannot be read.</div>';
  const t = s.texts || {};
  let h = '<div style="background:#FAFAFA;border:1px solid #EEE;border-radius:4px;padding:8px;">';

  h += '<div style="font-weight:700;margin-bottom:4px;">Texts</div>';
  [['Internal Memo', t.TextIntMemo], ['Shipping Note', t.TextShipNote], ['Header Note', t.TextHeadNote]].forEach(([lbl, val]) => {
    h += '<div style="margin-bottom:5px;"><span style="color:#777;font-size:11px;">' + lbl + '</span>' +
         (val ? '<div style="white-space:pre-wrap;background:#fff;border:1px solid #E5E5E5;border-radius:3px;padding:5px;margin-top:2px;">' + esc(val) + '</div>'
              : '<div style="color:#AAA;font-style:italic;">empty</div>') + '</div>';
  });

  if (Array.isArray(s.correspondence) && s.correspondence.some(c => korrText(c))) {
    h += '<div style="font-weight:700;margin:9px 0 4px;">Correspondence (' +
         s.correspondence.filter(c => korrText(c)).length + ')</div>';
    s.correspondence.forEach((c, idx) => {
      const txt = korrText(c);
      if (!txt) return;
      const sender = (c && (c.Sender || c.sender)) ? String(c.Sender || c.sender) : '';
      h += '<div style="background:#fff;border:1px solid #E5E5E5;border-radius:3px;padding:6px;margin-bottom:5px;">' +
           (sender ? '<div style="font-size:10.5px;color:#888;margin-bottom:3px;">' + esc(sender) + '</div>' : '') +
           '<div style="white-space:pre-wrap;">' + esc(txt) + '</div>' +
           '<button class="sram-bk-copykorr" data-i="' + idx + '" ' +
           'style="margin-top:5px;font-size:10.5px;padding:3px 8px;border:1px solid #C7C7C7;background:#F7F7F7;' +
           'border-radius:3px;cursor:pointer;">Copy this message</button>' +
           '</div>';
    });
    h += '<div style="font-size:10.5px;color:#888;margin-top:-2px;">Created in the order, but possibly not saved yet.</div>';
  }

  if (s.correspondenceDraft && s.correspondenceDraft.text) {
    h += '<div style="font-weight:700;margin:9px 0 4px;">Correspondence draft</div>' +
         '<div style="background:#FFFDF5;border:1px solid #E8D9A6;border-radius:3px;padding:6px;">' +
         '<div style="white-space:pre-wrap;">' + esc(s.correspondenceDraft.text) + '</div>' +
         '<button class="sram-bk-copykorr" data-i="draft" ' +
         'style="margin-top:5px;font-size:10.5px;padding:3px 8px;border:1px solid #C7C7C7;background:#F7F7F7;' +
         'border-radius:3px;cursor:pointer;">Copy draft</button>' +
         '</div>' +
         '<div style="font-size:10.5px;color:#888;margin-top:3px;">Unsent draft from the ' +
         '&bdquo;Write Message&ldquo;dialog.</div>';
  }

  h += '<div style="font-weight:700;margin:9px 0 4px;">Items (' + ((s.items && s.items.length) || 0) + ')</div>';
  if (!s.items || !s.items.length) {
    h += '<div style="color:#AAA;font-style:italic;">none</div>';
  } else {
    h += '<table style="width:100%;border-collapse:collapse;font-size:11px;">' +
         '<tr style="background:#F0F0F0;"><th style="text-align:left;padding:3px 4px;">Pos</th><th style="text-align:left;padding:3px 4px;">Material</th>' +
         '<th style="text-align:left;padding:3px 4px;">Bezeichnung</th><th style="text-align:left;padding:3px 4px;">Mg</th>' +
         '<th style="text-align:left;padding:3px 4px;">Werk</th><th style="text-align:left;padding:3px 4px;">LOrt</th><th style="text-align:left;padding:3px 4px;">Kat</th></tr>';
    s.items.forEach(it => {
      const nested = !!it._parentItem;
      h += '<tr style="border-bottom:1px solid #EEE;' + (nested ? 'background:#FFFDF2;' : '') + '">' +
           '<td style="padding:3px 4px;white-space:nowrap;">' + (nested ? '↳ ' : '') + esc(it.Item) + '</td>' +
           '<td style="padding:3px 4px;white-space:nowrap;">' + esc(it.Material) + '</td>' +
           '<td style="padding:3px 4px;">' + esc(it.ItemDescription) + '</td>' +
           '<td style="padding:3px 4px;">' + esc(it.Quantity) + '</td>' +
           '<td style="padding:3px 4px;">' + esc(it.Plant) + '</td>' +
           '<td style="padding:3px 4px;">' + esc(it.StorageLocation) + '</td>' +
           '<td style="padding:3px 4px;">' + esc(it.ItemCategory) + '</td></tr>';
      // Nur Felder zeigen, die im Auftrag auch beschreibbar sind und
      // tatsaechlich einen Wert haben. Alles andere (CreatedDate,
      // ProductType, DGIndicator, Upc ...) ist Systemballast.
      const alle = it._all || {};
      const erlaubt = Array.isArray(s.editableFields) ? s.editableFields : null;
      const schonInTabelle = /^(Item|Material|ItemDescription|Quantity|Plant|StorageLocation|ItemCategory)$/;
      const weitere = Object.keys(alle).filter(k => {
        if (schonInTabelle.test(k)) return false;
        if (erlaubt && erlaubt.indexOf(k) < 0) return false;
        const v = alle[k];
        if (v === null || v === undefined || v === '' || v === false) return false;
        if (typeof v === 'object') return false;
        return true;
      }).sort();
      if (weitere.length) {
        h += '<tr style="border-bottom:1px solid #EEE;' + (nested ? 'background:#FFFDF2;' : '') + '">' +
             '<td></td><td colspan="6" style="padding:0 4px 5px;color:#555;line-height:1.5;">' +
             weitere.map(k => '<span style="display:inline-block;margin-right:9px;">' +
               '<span style="color:#999;">' + esc(k) + ':</span> ' + esc(String(alle[k])) + '</span>').join('') +
             '</td></tr>';
      }
    });
    h += '</table>';
    if (s.items.some(i => i._parentItem)) {
      h += '<div style="margin-top:5px;font-size:10.5px;color:#7A5B00;background:#FFF8E1;border:1px solid #F0E3B0;border-radius:3px;padding:5px;">' +
           'Rows marked yellow (↳) are materials added later. In the portal they sit nested under the original item.</div>';
    }
  }

  if (s.attachments && s.attachments.length) {
    h += '<div style="font-weight:700;margin:9px 0 4px;">Attachments (' + s.attachments.length + ')</div>' +
         '<div style="color:#555;">' + s.attachments.map(esc).join('<br>') + '</div>' +
         '<div style="font-size:10.5px;color:#888;margin-top:3px;">File names only &ndash; the files themselves cannot be backed up.</div>';
  }

  h += '</div>';
  return h;
}

function plainText(s) {
  const t = s.texts || {};
  const L = [];
  L.push('SRAM Order Backup');
  L.push('Order: ' + s.order);
  L.push('Backed up: ' + new Date(s.ts).toLocaleString());
  L.push('Reason: ' + (s.reason || '-'));
  if (s.saveState) L.push('Save status: ' + s.saveState.state + (s.saveState.info ? ' (' + s.saveState.info + ')' : ''));
  L.push('');
  L.push('--- Texts ---');
  L.push('Internal Memo:');  L.push(t.TextIntMemo || '(empty)');
  L.push('Shipping Note:');  L.push(t.TextShipNote || '(empty)');
  L.push('Header Note:');    L.push(t.TextHeadNote || '(empty)');
  L.push('');
  L.push('--- Items (' + ((s.items && s.items.length) || 0) + ') ---');
  (s.items || []).forEach(it => {
    L.push((it._parentItem ? '  [added to item ' + it._parentItem + '] ' : '') +
      'Pos ' + (it.Item || '?') + ' | ' + (it.Material || '?') + ' | ' + (it.ItemDescription || '') +
      ' | qty ' + (it.Quantity || '') + ' | plant ' + (it.Plant || '') +
      (it.StorageLocation ? ' | storage loc ' + it.StorageLocation : '') +
      (it.ItemCategory ? ' | cat ' + it.ItemCategory : '') +
      (it.SerialNumber ? ' | serial ' + it.SerialNumber : ''));
    const alle = it._all || {};
    const erlaubt = Array.isArray(s.editableFields) ? s.editableFields : null;
    Object.keys(alle).sort().forEach(k => {
      const v = alle[k];
      if (v === null || v === undefined || v === '' || v === false || typeof v === 'object') return;
      if (/^(Order|Item|Material|ItemDescription|Quantity|Plant|StorageLocation|ItemCategory)$/.test(k)) return;
      if (erlaubt && erlaubt.indexOf(k) < 0) return;
      L.push('      ' + k + ': ' + v);
    });
  });
  if (Array.isArray(s.correspondence) && s.correspondence.some(c => korrText(c))) {
    L.push('');
    L.push('--- Correspondence ---');
    s.correspondence.forEach(c => { const x = korrText(c); if (x) { L.push(x); L.push(''); } });
  }
  if (s.correspondenceDraft && s.correspondenceDraft.text) {
    L.push('');
    L.push('--- Correspondence draft (unsent) ---');
    L.push(s.correspondenceDraft.text);
  }
  if (s.attachments && s.attachments.length) {
    L.push('');
    L.push('--- Attachments (names only) ---');
    s.attachments.forEach(a => L.push(a));
  }
  return L.join('\n');
}

// ============================================================
// START
// ============================================================
cleanupOld();

// Im Frame mit den Auftragsdaten: sichern und Speicherversuche mitlesen
installNetworkMonitor();
setInterval(() => { try { snapshotNow('automatic'); } catch (e) {} }, SNAP_INTERVAL);
setTimeout(() => { try { snapshotNow('automatic'); } catch (e) {} }, 2500);

// Oberflaeche nur im obersten Fenster
if (IS_TOP) {
  const start = () => { try { createLauncher(); } catch (e) { log('UI-Fehler:', e); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
  // Panel regelmaessig aktualisieren, solange es offen ist
  setInterval(() => {
    if (!panel) return;
    // Waehrend ein Inhalt offen ist oder gerade zurueckgeschrieben wurde,
    // nicht neu aufbauen - sonst verliert man die Ansicht unter den Haenden.
    if (Object.keys(openDetails).length) return;
    try { renderBody(); } catch (e) {}
  }, 5000);
}

log('geladen · Backup v' + BK_VERSION + ' · Frame:', IS_TOP ? 'oben' : 'App-Frame');

})();
// ===== BACKUP-TEIL ENDE =====

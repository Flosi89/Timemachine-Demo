OVERLAY — Landscape-Only UI Add-on
==================================

Das hier ist ein *Overlay*: Füge es in dein bestehendes Projekt.
Portrait bleibt unverändert; Querformat wird kompakt & seitlich.

Dateien:
- css/hud-landscape.css
- js/hud-autohide.js
- example_index.html  (nur als Referenz für die nötigen IDs/Klassen)

Einbau:
1) In deiner index.html einbinden:
   <link rel="stylesheet" href="css/hud-landscape.css">
   ...
   <script src="js/hud-autohide.js"></script>

2) Stelle sicher, dass die Elemente so benannt sind:
   - HUD-Wrapper: id="hud"
   - Dropdown: class="place-select"
   - GPS/Karte-Buttons: class="icon-btn"
   - Info-Box: class="info-box"
   - Slider-Wrapper: class="zoom-wrap"

Nur wenn die Klassen/IDs vorhanden sind, greift das Styling im Querformat.
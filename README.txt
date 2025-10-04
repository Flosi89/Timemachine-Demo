Zeitreise Tribschen – PWA Release

Was ist drin:
- index.html (Vintage-Startscreen, funktionierender Start-Flow)
- manifest.webmanifest (Name: Zeitreise Tribschen)
- sw.js (Caching der wichtigsten Dateien; Netz zuerst, Cache-Fallback)
- icons/icon-192.png, icons/icon-512.png (Platzhalter-Icons)
- orte.json (Platzhalter)
- Bilder/zeppelin_tribschen.jpg (Platzhalter), Bilder/platz1.jpg (Platzhalter)

So nutzt du es:
1) Ersetze die Platzhalterbilder in /Bilder durch deine echten Dateien.
2) Ergänze weitere Bilder/Audios in sw.js -> ASSETS[], damit sie offline verfügbar sind.
3) Lade alles über HTTPS hoch (GitHub Pages, Netlify, Vercel).
4) Öffne die Seite am Handy und „Zum Startbildschirm hinzufügen“ (Android) bzw. „Zum Home-Bildschirm“ (iOS).

Hinweise:
- Kamera/GPS funktionieren nur über HTTPS oder localhost.
- Beim ersten Start erscheint die Berechtigungsabfrage erst nach Klick auf „Zeitreise starten“.

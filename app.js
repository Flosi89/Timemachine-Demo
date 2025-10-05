// Minimal JS um HUD/Info in beiden Orientierungen ein/auszublenden.
// Bestehende App-Funktionen (Kamera, GPS, Karte, etc.) bleiben unberührt.

const hud = document.getElementById('hud');
const info = document.getElementById('infoPanel');
const hudToggle = document.getElementById('hudToggle');
const infoToggle = document.getElementById('infoToggle');

// Startzustand: HUD in Portrait UND Landscape ausgeblendet, Info sichtbar.
hud.classList.add('hud--hidden');
info.classList.remove('infobox--hidden');

hudToggle.addEventListener('click', () => {
  hud.classList.toggle('hud--hidden');
});

infoToggle.addEventListener('click', () => {
  info.classList.toggle('infobox--hidden');
});

// Optional: bei Orientierungswechsel HUD schließen (mehr Sicht)
window.addEventListener('orientationchange', () => {
  hud.classList.add('hud--hidden');
});

// Falls deine bestehende App Informationstitel-/texte dynamisch setzt, bleibt das erhalten.
// Beispiel-Fallback:
document.getElementById('infoTitle').textContent ||= 'Platz 1';
document.getElementById('infoText').textContent ||= 'Fallback 1';

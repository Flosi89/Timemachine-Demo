(function() {
  const hud = document.getElementById('hud');
  const infobox = document.getElementById('infobox');
  const footer = document.getElementById('footer');
  if (!hud) return;

  let hideTimer;
  const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;

  function setHiddenState(hidden) {
    // Nur im Querformat ausblenden
    if (isLandscape()) {
      [hud, infobox, footer].forEach(el => {
        if (!el) return;
        if (hidden) el.classList.add('hidden');
        else el.classList.remove('hidden');
      });
    } else {
      // Im Hochformat immer sichtbar
      [hud, infobox, footer].forEach(el => {
        if (!el) return;
        el.classList.remove('hidden');
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
      });
    }
  }

  function scheduleHide() {
    if (!isLandscape()) return;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => setHiddenState(true), 2500);
  }

  function showHUD() {
    setHiddenState(false);
    scheduleHide();
  }

  ['pointerdown', 'mousemove', 'touchstart', 'keydown', 'wheel'].forEach(evt => {
    window.addEventListener(evt, showHUD, { passive: true });
  });

  hud.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  hud.addEventListener('mouseleave', scheduleHide);

  window.matchMedia('(orientation: landscape)').addEventListener('change', showHUD);

  showHUD();
})();

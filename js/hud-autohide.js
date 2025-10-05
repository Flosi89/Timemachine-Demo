(function(){
  const hud = document.getElementById('hud');
  const infobox = document.getElementById('infobox');
  const footer = document.getElementById('footer');
  const select = document.getElementById('placeSelect');
  if(!hud) return;

  let hideTimer;
  const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;
  let paused = false;

  function setHidden(state){
    if(paused) return;
    [hud, infobox, footer].forEach(el => {
      if(!el) return;
      if(state) el.classList.add('hidden');
      else el.classList.remove('hidden');
    });
  }

  function scheduleHide(){
    if(!isLandscape() || paused) return;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => setHidden(true), 2500);
  }

  function showHUD(){
    setHidden(false);
    scheduleHide();
  }

  // Reaktion auf Nutzerinteraktionen
  ['pointerdown','mousemove','touchstart','keydown','wheel']
    .forEach(evt => window.addEventListener(evt, showHUD, {passive:true}));

  [hud, infobox, footer].forEach(el => {
    if(!el) return;
    el.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    el.addEventListener('mouseleave', scheduleHide);
  });

  // Dropdown-Auswahl fix
  if(select){
    select.addEventListener('focus', () => {
      paused = true;
      setHidden(false);
      clearTimeout(hideTimer);
    });
    // kleine Verzögerung, damit Android nicht sofort blur feuert
    select.addEventListener('change', () => {
      paused = false;
      scheduleHide();
    });
    select.addEventListener('blur', () => {
      setTimeout(() => { paused = false; scheduleHide(); }, 800);
    });
  }

  window.matchMedia('(orientation: landscape)')
    .addEventListener('change', showHUD);

  showHUD();
})();

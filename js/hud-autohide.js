(function(){
  const hud = document.getElementById('hud');
  const infobox = document.getElementById('infobox');
  const footer = document.getElementById('footer');
  if(!hud) return;

  let hideTimer;
  const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;

  function setHidden(state){
    [hud, infobox, footer].forEach(el => {
      if(!el) return;
      if(state) el.classList.add('hidden');
      else el.classList.remove('hidden');
    });
  }

  function scheduleHide(){
    if(!isLandscape()) return;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => setHidden(true), 2500);
  }

  function showHUD(){
    setHidden(false);
    scheduleHide();
  }

  ['pointerdown','mousemove','touchstart','keydown','wheel']
    .forEach(evt => window.addEventListener(evt, showHUD, {passive:true}));

  [hud, infobox, footer].forEach(el => {
    if(!el) return;
    el.addEventListener('mouseenter', () => clearTimeout(hideTimer));
    el.addEventListener('mouseleave', scheduleHide);
  });

  window.matchMedia('(orientation: landscape)')
    .addEventListener('change', showHUD);

  showHUD();
})();

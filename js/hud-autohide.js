(function(){
  const hud = document.getElementById('hud');
  if(!hud) return;
  let hideTimer;

  const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;

  function scheduleHide(){
    if(!isLandscape()) return; // Autohide nur im Querformat
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => hud.classList.add('hidden'), 2500);
  }

  function showHUD(){
    hud.classList.remove('hidden');
    if(isLandscape()) scheduleHide();
  }

  // Maus-/Touchbewegung → HUD zeigen
  ['pointerdown','mousemove','touchstart','keydown','wheel'].forEach(evt=>{
    window.addEventListener(evt, showHUD, {passive:true});
  });

  // Wenn Hochformat aktiv, HUD immer sichtbar
  function handleOrientationChange(){
    if(isLandscape()){
      showHUD();
    } else {
      hud.classList.remove('hidden'); // sichtbar halten
      clearTimeout(hideTimer);
    }
  }

  hud.addEventListener('mouseenter', ()=> clearTimeout(hideTimer));
  hud.addEventListener('mouseleave', scheduleHide);
  window.matchMedia('(orientation: landscape)').addEventListener('change', handleOrientationChange);

  // Initialzustand
  handleOrientationChange();
})();

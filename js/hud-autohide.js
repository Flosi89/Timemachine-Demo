(function(){
  const hud = document.getElementById('hud');
  if(!hud) return;
  let hideTimer;
  const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;
  function scheduleHide(){ if(!isLandscape()) return; clearTimeout(hideTimer); hideTimer=setTimeout(()=>hud.classList.add('hidden'),2500); }
  function showHUD(){ hud.classList.remove('hidden'); scheduleHide(); }
  ['pointerdown','mousemove','touchstart','keydown','wheel'].forEach(evt=>{ window.addEventListener(evt, showHUD, {passive:true}); });
  hud.addEventListener('mouseenter', ()=> clearTimeout(hideTimer));
  hud.addEventListener('mouseleave', scheduleHide);
  window.matchMedia('(orientation: landscape)').addEventListener('change', showHUD);
  showHUD();
})();
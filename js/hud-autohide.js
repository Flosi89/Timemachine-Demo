(function(){
  const hud = document.getElementById('hud');
  const infobox = document.getElementById('infobox');
  if(!hud || !infobox) return;

  let hideTimer;
  const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;

  function scheduleHide(){
    clearTimeout(hideTimer);
    hideTimer = setTimeout(()=>{
      hud.classList.add('hidden');
      infobox.classList.add('hidden');
    },2500);
  }

  function showHUD(){
    hud.classList.remove('hidden');
    infobox.classList.remove('hidden');
    scheduleHide();
  }

  ['pointerdown','mousemove','touchstart','keydown','wheel']
    .forEach(evt=>window.addEventListener(evt, showHUD, {passive:true}));

  hud.addEventListener('mouseenter', ()=>clearTimeout(hideTimer));
  hud.addEventListener('mouseleave', scheduleHide);
  infobox.addEventListener('mouseenter', ()=>clearTimeout(hideTimer));
  infobox.addEventListener('mouseleave', scheduleHide);

  window.matchMedia('(orientation: landscape)').addEventListener('change', showHUD);
  showHUD();
})();

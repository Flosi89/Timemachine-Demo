(function(){
  const hud     = document.getElementById('hud');
  const infobox = document.getElementById('infobox');
  const footer  = document.getElementById('footer');
  const select  = document.getElementById('placeSelect');
  if(!hud) return;

  let hideTimer;
  let paused = false;          // pausiert Autohide (z.B. solange Dropdown offen)
  let dropdownOpen = false;    // expliziter Zustand fürs Select
  const isLandscape = () => window.matchMedia('(orientation: landscape)').matches;

  function setHidden(state){
    // Nur im Landscape darf ausgeblendet werden
    if(!isLandscape()) {
      [hud,infobox,footer].forEach(el => { if(el){ el.classList.remove('hidden'); } });
      return;
    }
    if(paused) return; // während Pause nicht verstecken
    [hud,infobox,footer].forEach(el => {
      if(!el) return;
      if(state) el.classList.add('hidden');
      else      el.classList.remove('hidden');
    });
  }

  function scheduleHide(){
    if(!isLandscape() || paused) return;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(()=> setHidden(true), 2500);
  }

  function showHUD(){
    setHidden(false);
    scheduleHide();
  }

  // --- Globale Interaktionen: zeigen und (wenn Dropdown NICHT offen) Autohide wieder aktivieren
  function wakeAndMaybeUnpause(){
    if(!dropdownOpen){ paused = false; }
    showHUD();
  }
  ['pointerdown','mousemove','touchstart','keydown','wheel']
    .forEach(evt => window.addEventListener(evt, wakeAndMaybeUnpause, {passive:true}));

  // Hover-Schutz (Desktop)
  [hud, infobox, footer].forEach(el=>{
    if(!el) return;
    el.addEventListener('mouseenter', ()=> clearTimeout(hideTimer));
    el.addEventListener('mouseleave', scheduleHide);
  });

  // --- Dropdown sauber handlen (Android/iOS)
  if(select){
    // Öffnen/Bedienen → Autohide pausieren
    const openDropdown = ()=>{ dropdownOpen = true; paused = true; clearTimeout(hideTimer); setHidden(false); };
    select.addEventListener('pointerdown', openDropdown, {passive:true});
    select.addEventListener('touchstart', openDropdown, {passive:true});
    select.addEventListener('focus', openDropdown);

    // Auswahl getroffen → wieder autohide erlauben
    select.addEventListener('change', ()=>{
      dropdownOpen = false; paused = false; showHUD();
    });

    // Schließen ohne Änderung (manchmal blur sehr früh) → kurz verzögert wieder aktivieren
    select.addEventListener('blur', ()=>{
      setTimeout(()=>{ dropdownOpen = false; paused = false; scheduleHide(); }, 400);
    });
  }

  // Orientation-Wechsel
  window.matchMedia('(orientation: landscape)').addEventListener('change', ()=>{
    dropdownOpen = false; paused = false; showHUD();
  });

  // Initial
  showHUD();
})();

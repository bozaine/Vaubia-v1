// Burger menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
if (burger && menu){
  burger.addEventListener('click', ()=>{
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Recherche : n’afficher la barre QUE si hover/tap sur la loupe
const trigger = document.getElementById('searchTrigger');
const form = document.getElementById('searchForm');
const zone = document.getElementById('searchZone');

function openSearch(){ form.classList.add('open'); }
function closeSearch(){ form.classList.remove('open'); }

if (trigger && form){
  // Desktop : hover
  trigger.addEventListener('mouseenter', openSearch);
  zone.addEventListener('mouseleave', closeSearch);

  // Mobile / click
  trigger.addEventListener('click', (e)=>{
    e.preventDefault();
    form.classList.toggle('open');
    if (form.classList.contains('open')) form.querySelector('input')?.focus();
  });

  // Escape to close
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeSearch();
  });
}

// Drag-to-scroll pour desktop (en plus du swipe natif mobile)
const row = document.getElementById('cardsRow');
if (row){
  let isDown=false, startX=0, scrollLeft=0;
  row.addEventListener('pointerdown', (e)=>{
    isDown=true; row.setPointerCapture(e.pointerId);
    startX = e.clientX; scrollLeft = row.scrollLeft;
  });
  row.addEventListener('pointermove', (e)=>{
    if(!isDown) return;
    const dx = e.clientX - startX;
    row.scrollLeft = scrollLeft - dx;
  });
  ['pointerup','pointercancel','mouseleave'].forEach(ev=>row.addEventListener(ev, ()=>{isDown=false;}));
}

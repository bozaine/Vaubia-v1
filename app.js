// Menu
const burger = document.querySelector('.burger');
const drawer = document.querySelector('.drawer');
if (burger && drawer){
  burger.addEventListener('click', ()=>{
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', (e)=>{
    if(!drawer.contains(e.target) && !burger.contains(e.target)){
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded','false');
    }
  });
}
// Search hover/tap
const searchToggle = document.querySelector('.search-toggle');
if (searchToggle){
  searchToggle.addEventListener('mouseenter', ()=> document.body.classList.add('search-open'));
  searchToggle.addEventListener('mouseleave', ()=> document.body.classList.remove('search-open'));
  searchToggle.addEventListener('click', ()=> document.body.classList.toggle('search-open'));
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') document.body.classList.remove('search-open'); });
}
// Topics drag
const track = document.querySelector('.topics-track');
if (track){
  let down=false, sx=0, sl=0;
  track.addEventListener('pointerdown', e=>{ down=true; track.setPointerCapture(e.pointerId); sx=e.clientX; sl=track.scrollLeft; });
  track.addEventListener('pointermove', e=>{ if(!down) return; track.scrollLeft = sl - (e.clientX - sx); });
  ['pointerup','pointercancel','mouseleave'].forEach(ev=> track.addEventListener(ev, ()=> down=false));
}

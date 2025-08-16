// Vaubia refined home v2
(function(){
  const burger = document.querySelector('.burger');
  if (burger){
    burger.addEventListener('click', ()=>{
      const nav = document.querySelector('.main-nav');
      const open = nav.style.display === 'flex';
      nav.style.display = open ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      burger.setAttribute('aria-expanded', String(!open));
    });
  }

  // Search pill -> bar toggle
  const pill = document.getElementById('searchPill');
  const bar = document.getElementById('searchBar');
  if (pill && bar){
    const show = () => { bar.classList.add('show'); bar.setAttribute('aria-hidden','false'); bar.querySelector('input').focus(); };
    pill.addEventListener('click', show);
  }

  // Carousel controls + swipe
  function setupCarousel(id){
    const el = document.getElementById(id);
    if (!el) return;
    const prev = document.querySelector(`.nav.prev[data-target="${id}"]`);
    const next = document.querySelector(`.nav.next[data-target="${id}"]`);

    const cardWidth = () => el.querySelector('.card')?.getBoundingClientRect().width + 18 || 340;
    const slide = (dir)=> el.scrollBy({left: dir*cardWidth(), behavior:'smooth'});

    prev?.addEventListener('click', ()=>slide(-1));
    next?.addEventListener('click', ()=>slide(1));

    // Touch/Mouse swipe
    let startX = 0, scrollStart = 0, dragging = false;
    const start = (x)=>{ dragging = true; startX = x; scrollStart = el.scrollLeft; };
    const move  = (x)=>{
      if(!dragging) return;
      const dx = x - startX;
      el.scrollLeft = scrollStart - dx;
    };
    const end = (x)=>{
      if(!dragging) return;
      dragging = false;
      const dx = x - startX;
      if (Math.abs(dx) > 40){
        slide(dx<0 ? 1 : -1);
      }
    };

    el.addEventListener('pointerdown', (e)=>{ el.setPointerCapture(e.pointerId); start(e.clientX); });
    el.addEventListener('pointermove', (e)=> move(e.clientX));
    el.addEventListener('pointerup',   (e)=> end(e.clientX));
    el.addEventListener('pointercancel', ()=> dragging=false);
  }
  setupCarousel('topicsCarousel');
})();


// Year
document.getElementById('y') && (document.getElementById('y').textContent = new Date().getFullYear());

// Drawer
const drawer = document.querySelector('[data-drawer]');
const backdrop = document.querySelector('[data-backdrop]');
const toggles = document.querySelectorAll('[data-menu-toggle]');
function drawerOpen(open){
  if(!drawer || !backdrop) return;
  if(open){ drawer.classList.add('open'); backdrop.classList.add('show'); document.body.style.overflow='hidden'; }
  else { drawer.classList.remove('open'); backdrop.classList.remove('show'); document.body.style.overflow=''; }
}
toggles.forEach(btn=> btn.addEventListener('click', ()=> drawerOpen(!drawer.classList.contains('open'))));
backdrop && backdrop.addEventListener('click', ()=> drawerOpen(false));
window.addEventListener('keydown', e=>{ if(e.key==='Escape') drawerOpen(false); });

// Search expand/compact
const search = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const searchToggle = document.querySelector('[data-search-toggle]');
function openSearch(){ if(!search) return; search.classList.remove('compact'); setTimeout(()=>searchInput&&searchInput.focus(),0); }
function closeSearch(){ if(!search) return; searchInput&&(searchInput.value=''); search.classList.add('compact'); }
searchToggle && searchToggle.addEventListener('click', ()=> search.classList.contains('compact') ? openSearch() : closeSearch());
searchInput && searchInput.addEventListener('blur', ()=> { if(!searchInput.value.trim()) closeSearch(); });

// ===== Pricing page logic (only if elements present) =====
const DISCOUNT = 0.17;
const viewport = document.getElementById('viewport');
const track = document.getElementById('track');
const btnPrev = document.querySelector('.arrow.prev');
const btnNext = document.querySelector('.arrow.next');
const bills = Array.from(document.querySelectorAll('.bill'));
if(viewport && track){
  let cards = Array.from(track.children);
  // clones for infinite
  const firstClone = cards[0].cloneNode(true);
  const lastClone  = cards[cards.length-1].cloneNode(true);
  track.prepend(lastClone); track.append(firstClone);
  let slideW = 0, index = 1, anim=false;
  function measure(){ const c = track.querySelector('.card'); slideW = c.getBoundingClientRect().width + 32; }
  function setX(i, animate=true){
    if(anim) return; anim=true;
    track.style.transition = animate ? 'transform 300ms cubic-bezier(.2,.8,.2,1)' : 'none';
    track.style.transform = `translateX(${-i*slideW}px)`;
    setTimeout(()=>{
      anim=false; index=i;
      const total = track.children.length;
      if(index===total-1){ track.style.transition='none'; index=1; track.style.transform=`translateX(${-index*slideW}px)`; }
      else if(index===0){ track.style.transition='none'; index=total-2; track.style.transform=`translateX(${-index*slideW}px)`; }
    }, animate?300:0);
  }
  function next(){ setX(index+1); } function prev(){ setX(index-1); }
  // swipe (one gesture -> one card)
  let downX=0, curX=0, dragging=false, t0=0; const TH=50, VMIN=0.35;
  viewport.addEventListener('pointerdown', e=>{ dragging=true; downX=curX=e.clientX; t0=performance.now(); track.style.transition='none'; viewport.setPointerCapture(e.pointerId); });
  viewport.addEventListener('pointermove', e=>{ if(!dragging) return; curX=e.clientX; const dx=curX-downX; const base=-index*slideW; track.style.transform=`translateX(${base+dx}px)`; });
  function endSwipe(){ if(!dragging) return; dragging=false; const dx=curX-downX; const v=Math.abs(dx)/Math.max(1,performance.now()-t0); if(dx<-TH || (dx<0 && v>VMIN)) next(); else if(dx>TH || (dx>0 && v>VMIN)) prev(); else setX(index); }
  viewport.addEventListener('pointerup', endSwipe); viewport.addEventListener('pointercancel', endSwipe); viewport.addEventListener('mouseleave', endSwipe);
  btnPrev && btnPrev.addEventListener('click', prev); btnNext && btnNext.addEventListener('click', next);
  window.addEventListener('load', ()=>{ measure(); setX(1,false); });
  window.addEventListener('resize', ()=>{ measure(); setX(index,false); });

  // billing toggle
  function setBilling(mode){
    document.querySelectorAll('.card').forEach(card=>{
      const m = Number(card.getAttribute('data-month'));
      const amount = card.querySelector('.amount');
      const per = card.querySelector('.per');
      if(mode==='yearly'){ const y = Math.round(m*12*(1-DISCOUNT)); amount.textContent=y; per.textContent='/an'; }
      else { amount.textContent=m; per.textContent='/mois'; }
    });
    bills.forEach(b=> b.setAttribute('aria-pressed', String(b.dataset.mode===mode)));
    try{ localStorage.setItem('vaubia-billing', mode); }catch{}
  }
  bills.forEach(b=> b.addEventListener('click', ()=> setBilling(b.dataset.mode)));
  setBilling(localStorage.getItem('vaubia-billing') || 'monthly');
}

// Cookie center placeholder
function openCookieCenter(){ alert('Centre de préférences cookies — placeholder.'); }

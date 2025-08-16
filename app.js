/* Vaubia pricing v3 — swipe->one card, infinite, monthly/yearly (-17%) */
const DISCOUNT = 0.17;
const viewport = document.getElementById('viewport');
const track = document.getElementById('track');
const cards = Array.from(track.children);
const btnPrev = document.querySelector('.arrow.prev');
const btnNext = document.querySelector('.arrow.next');
const bills = Array.from(document.querySelectorAll('.bill'));
let slideW = 0, index = 1, anim = false;

// ---- Build infinity (clone ends) ----
const firstClone = cards[0].cloneNode(true);
const lastClone  = cards[cards.length-1].cloneNode(true);
track.prepend(lastClone);
track.append(firstClone);

function measure(){ const c = track.querySelector('.card'); slideW = c.getBoundingClientRect().width + 32; }
function setX(i, animate=true){
  if(anim) return;
  anim = true;
  track.style.transition = animate ? 'transform 300ms cubic-bezier(.2,.8,.2,1)' : 'none';
  track.style.transform = `translateX(${-i*slideW}px)`;
  setTimeout(()=>{
    anim = false; index = i;
    const total = track.children.length;
    if(index === total-1){ // passed last (firstClone)
      track.style.transition='none'; index = 1;
      track.style.transform = `translateX(${-index*slideW}px)`;
    } else if(index === 0){ // passed first (lastClone)
      track.style.transition='none'; index = total-2;
      track.style.transform = `translateX(${-index*slideW}px)`;
    }
  }, animate? 300 : 0);
}
function next(){ setX(index+1); }
function prev(){ setX(index-1); }

// ---- Swipe: one gesture -> exactly one card
let downX=0, curX=0, dragging=false, startTime=0;
const THRESHOLD = 50;     // pixels to trigger
const MIN_VEL = 0.35;     // px/ms for fling
viewport.addEventListener('pointerdown', e=>{
  dragging=true; downX=curX=e.clientX; startTime=performance.now();
  track.style.transition='none'; viewport.setPointerCapture(e.pointerId);
});
viewport.addEventListener('pointermove', e=>{
  if(!dragging) return;
  curX=e.clientX;
  const dx = curX - downX;
  const base = -index*slideW;
  track.style.transform = `translateX(${base + dx}px)`;
});
function endSwipe(){
  if(!dragging) return;
  dragging=false;
  const dx = curX - downX;
  const dt = Math.max(1, performance.now()-startTime);
  const v = Math.abs(dx)/dt;
  if(dx < -THRESHOLD || (dx < 0 && v > MIN_VEL)){ next(); }
  else if(dx > THRESHOLD || (dx > 0 && v > MIN_VEL)){ prev(); }
  else { setX(index); }
}
viewport.addEventListener('pointerup', endSwipe);
viewport.addEventListener('pointercancel', endSwipe);
viewport.addEventListener('mouseleave', endSwipe);

// arrows
btnPrev.addEventListener('click', prev);
btnNext.addEventListener('click', next);

// ---- Billing toggle
function setBilling(mode){
  document.querySelectorAll('.card').forEach(card=>{
    const m = Number(card.getAttribute('data-month'));
    const amount = card.querySelector('.amount');
    const per = card.querySelector('.per');
    if(mode==='yearly'){
      const y = Math.round(m*12*(1-DISCOUNT));
      amount.textContent = y; per.textContent='/an';
    } else {
      amount.textContent = m; per.textContent='/mois';
    }
  });
  bills.forEach(b=> b.setAttribute('aria-pressed', String(b.dataset.mode===mode)));
  try{ localStorage.setItem('vaubia-billing', mode); }catch{}
}
bills.forEach(b=> b.addEventListener('click', ()=> setBilling(b.dataset.mode)));
setBilling(localStorage.getItem('vaubia-billing') || 'monthly');

// init
window.addEventListener('load', ()=>{ measure(); setX(1,false); });
window.addEventListener('resize', ()=>{ measure(); setX(index,false); });

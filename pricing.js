// pricing.js
const track = document.getElementById('track');
const left = document.querySelector('.arrow.left');
const right = document.querySelector('.arrow.right');
const btns = document.querySelectorAll('.bill-btn');
const dotsEl = document.querySelector('.dots');

// Build dots and clone slides for infinite loop
let slides = Array.from(track.children);
const slideCount = slides.length;

function buildDots(){
  dotsEl.innerHTML = '';
  for(let i=0;i<slideCount;i++){
    const b = document.createElement('button');
    if(i===0) b.classList.add('active');
    dotsEl.appendChild(b);
  }
}
buildDots();

// Clone to both ends
function cloneForLoop(){
  const first = slides[0].cloneNode(true);
  const last = slides[slides.length-1].cloneNode(true);
  first.classList.add('clone'); last.classList.add('clone');
  track.appendChild(first);
  track.insertBefore(last, track.firstChild);
}
cloneForLoop();

let slideW = slides[0].getBoundingClientRect().width + 18; // +gap
let index = 1; // start on first real slide (after the prepended clone)

function goto(idx, smooth=true){
  track.style.scrollBehavior = smooth ? 'smooth' : 'auto';
  track.scrollTo({left: idx*slideW, behavior: smooth?'smooth':'auto'});
}
function refresh(){
  slides = Array.from(track.querySelectorAll('.card'));
  slideW = slides[1].getBoundingClientRect().width + 18;
  goto(index, false);
}
window.addEventListener('resize', ()=>setTimeout(refresh, 100));

// Initialize scroll position
requestAnimationFrame(()=> goto(index, false));

// Snap when hitting clones
track.addEventListener('scroll', ()=>{
  const maxIndex = slides.length-2;
  if(track.scrollLeft <= 1){
    index = maxIndex-1;
    goto(index, false);
  } else if(track.scrollLeft >= (slides.length-1)*slideW - 2){
    index = 1;
    goto(index, false);
  } else {
    index = Math.round(track.scrollLeft/slideW);
  }
  // dots
  const realIndex = (index-1+slideCount)%slideCount;
  Array.from(dotsEl.children).forEach((d,i)=> d.classList.toggle('active', i===realIndex));
});

// Arrows
left?.addEventListener('click', ()=> goto(index-1));
right?.addEventListener('click', ()=> goto(index+1));

// Drag/Swipe gesture (one swipe = one card)
let startX=0, delta=0, dragging=false, lock=false;
const threshold = 30;

function onDown(e){
  dragging=true;
  startX = (e.touches?e.touches[0].clientX:e.clientX);
  delta=0; lock=false;
}
function onMove(e){
  if(!dragging) return;
  const x = (e.touches?e.touches[0].clientX:e.clientX);
  delta = x - startX;
  if(Math.abs(delta)>8) e.preventDefault();
}
function onUp(){
  if(!dragging) return;
  dragging=false;
  if(delta > threshold){ goto(index-1); }
  else if(delta < -threshold){ goto(index+1); }
  else { goto(index); }
}

track.addEventListener('pointerdown', onDown);
track.addEventListener('pointermove', onMove, {passive:false});
window.addEventListener('pointerup', onUp);
track.addEventListener('touchstart', onDown, {passive:true});
track.addEventListener('touchmove', onMove, {passive:false});
track.addEventListener('touchend', onUp);

// Billing toggle
function updatePrices(mode){
  document.querySelectorAll('.amount').forEach(el=>{
    const m = parseFloat(el.dataset.month);
    const y = parseFloat(el.dataset.year);
    if(mode==='yearly'){
      el.textContent = `${y}€`;
      el.parentElement.querySelector('small').textContent = '/ an HT';
    }else{
      el.textContent = `${m}€`;
      el.parentElement.querySelector('small').textContent = '/ mois HT';
    }
  });
}
btns.forEach(b=> b.addEventListener('click', ()=>{
  btns.forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  updatePrices(b.dataset.mode);
}));
updatePrices('yearly'); // default

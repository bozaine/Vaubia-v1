/* ===== VAUBIA PRICING LOGIC ===== */
const BILLING_DISCOUNT = 0.17; // 17% for yearly

const state = {
  mode: localStorage.getItem('billingMode') || 'monthly'
};

const el = {
  toggleBtns: Array.from(document.querySelectorAll('.billing-btn')),
  plans: Array.from(document.querySelectorAll('.plan')),
  carousel: document.getElementById('carousel'),
  left: document.querySelector('.carousel-arrow.left'),
  right: document.querySelector('.carousel-arrow.right'),
};

function formatEuro(n){
  return Math.round(n) // clean numbers for display
}

function updatePrices(){
  el.plans.forEach(card => {
    const base = parseFloat(card.dataset.priceMonth || '0');
    const amount = card.querySelector('.amount');
    const period = card.querySelector('.period');
    const save = card.querySelector('.save');

    if(state.mode === 'monthly'){
      amount.textContent = formatEuro(base);
      period.textContent = '/mois';
      save.textContent = '';
    } else {
      const yearly = base * 12 * (1 - BILLING_DISCOUNT);
      const saved = base * 12 - yearly;
      amount.textContent = formatEuro(yearly);
      period.textContent = '/an';
      save.textContent = `Éco. ${formatEuro(saved)}€ / an`;
    }
  });
}

function setMode(mode){
  state.mode = mode;
  localStorage.setItem('billingMode', mode);
  el.toggleBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === state.mode)));
  updatePrices();
}

el.toggleBtns.forEach(b => {
  b.addEventListener('click', () => setMode(b.dataset.mode));
});

// Carousel: infinite loop (clone first/last)
function buildInfiniteCarousel(){
  const cards = Array.from(el.carousel.children);
  // clone last and first
  const first = cards[0].cloneNode(true);
  const last  = cards[cards.length - 1].cloneNode(true);
  el.carousel.insertBefore(last, cards[0]);
  el.carousel.appendChild(first);
  // position to the "first" real slide
  requestAnimationFrame(() => {
    const w = cards[0].getBoundingClientRect().width + 18; // width + gap
    el.carousel.scrollLeft = w;
  });
}

function go(dir){ // dir: -1 left, +1 right
  const card = el.carousel.querySelector('.plan');
  const w = card.getBoundingClientRect().width + 18;
  const start = el.carousel.scrollLeft;
  const target = start + (dir * w);
  el.carousel.scrollTo({left: target, behavior:'smooth'});
  // snap if at clones
  setTimeout(() => {
    const max = el.carousel.scrollWidth;
    const nearStart = el.carousel.scrollLeft < 1;
    const nearEnd = Math.abs(el.carousel.scrollLeft - (max - el.carousel.clientWidth)) < 2;
    if(nearStart){
      el.carousel.scrollLeft = el.carousel.scrollLeft + w * (el.plans.length);
    } else if(nearEnd){
      el.carousel.scrollLeft = el.carousel.scrollLeft - w * (el.plans.length);
    }
  }, 350);
}

el.left && el.left.addEventListener('click', () => go(-1));
el.right && el.right.addEventListener('click', () => go(1));

// Drag / Swipe
let dragging = false, startX=0, scrollStart=0;
el.carousel.addEventListener('pointerdown', e => {
  dragging = true; startX = e.clientX; scrollStart = el.carousel.scrollLeft; el.carousel.setPointerCapture(e.pointerId);
});
el.carousel.addEventListener('pointermove', e => {
  if(!dragging) return;
  const dx = e.clientX - startX;
  el.carousel.scrollLeft = scrollStart - dx;
});
['pointerup','pointercancel','mouseleave'].forEach(evt => el.carousel.addEventListener(evt, () => dragging=false));

// Init
buildInfiniteCarousel();
setMode(state.mode);

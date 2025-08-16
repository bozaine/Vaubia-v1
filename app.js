
// Drawer
const drawer = document.getElementById('drawer');
function toggleDrawer(){ drawer.classList.toggle('open'); }
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') drawer.classList.remove('open'); });
document.addEventListener('click', (e)=>{
  if(!drawer.contains(e.target) && !e.target.closest('.burger')) drawer.classList.remove('open');
});

// Search expand on small icon
const q = document.getElementById('q');
function expandSearch(open){ if(!q) return; q.classList.toggle('open', open); }
if(q){ q.addEventListener('focus', ()=>expandSearch(true)); q.addEventListener('blur', ()=>expandSearch(false)); }

// Pricing carousel (infinite + swipe + annual toggle -17%)
const basePlans = [
  {name:'Essentiel', priceM:19, features:['Surveillance comptes','Alertes e‑mail','Rapport hebdo']},
  {name:'Pro', priceM:39, features:['Tout Essentiel','Alertes temps réel','Registre RGPD']},
  {name:'Business', priceM:79, features:['Tout Pro','SLA prioritaire','Export & Audit']}
];
function monthlyToAnnual(m){ return Math.round((m*12)*0.83); } // ~17% off

function makeCard(p, isAnnual=false){
  const price = isAnnual ? monthlyToAnnual(p.priceM) : p.priceM;
  const unit = isAnnual ? '/an HT' : '/mois HT';
  const wrap = document.createElement('article');
  wrap.className = 'card price-card';
  wrap.innerHTML = `
    <div class="plan-h"><span class="badge">${p.name}</span></div>
    <div class="price">${price}€ <span style="font-size:1rem;color:var(--muted)">${unit}</span></div>
    <ul style="margin:12px 0 14px;padding-left:18px">${p.features.map(x=>`<li>${x}</li>`).join('')}</ul>
    <div style="display:flex;gap:8px">
      <a class="btn" href="contact.html">Souscrire</a>
      <a class="btn ghost" href="demo.html">Voir une démo</a>
    </div>`;
  return wrap;
}

function renderCarousel(mode='mensuel'){
  const carousel = document.getElementById('carousel');
  if(!carousel) return;
  carousel.innerHTML = '';
  const isAnnual = mode==='annuel';
  // duplicate ends for smooth infinite feel
  const plans = [...basePlans];
  const seq = [plans[2],...plans,...plans.slice(0,2)];
  seq.forEach(p=> carousel.appendChild(makeCard(p, isAnnual)));

  // swipe (1 gesture = one card)
  let startX=0, current=0, isDown=false;
  const cardW = ()=> carousel.querySelector('.price-card').getBoundingClientRect().width + 16;
  const snapTo = (idx)=> carousel.scrollTo({left: idx*cardW(), behavior:'smooth'});
  function index(){ return Math.round(carousel.scrollLeft / cardW()); }

  carousel.addEventListener('pointerdown', e=>{ isDown=true; startX=e.clientX; current=carousel.scrollLeft; carousel.setPointerCapture(e.pointerId); });
  carousel.addEventListener('pointerup', e=>{
    if(!isDown) return; isDown=false;
    const dx = e.clientX - startX;
    const i = index() + (dx<-30 ? 1 : dx>30 ? -1 : 0);
    snapTo(Math.max(0, Math.min(i, carousel.children.length-1)));
  });
  // snap on resize
  window.addEventListener('resize', ()=> snapTo(index()));
}
const toggle = document.getElementById('toggle');
if(toggle){
  toggle.addEventListener('click', (e)=>{
    const btn = e.target.closest('button'); if(!btn) return;
    toggle.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderCarousel(btn.dataset.mode);
  });
  renderCarousel('mensuel');
}

// Simple cookie banner
(function(){
  if(localStorage.getItem('cookie:consent')) return;
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;padding:12px;border-radius:12px;background:rgba(0,0,0,.75);color:#fff;backdrop-filter:blur(8px);display:flex;gap:8px;align-items:center;z-index:60';
  bar.innerHTML = '<span style="flex:1">Nous utilisons des cookies pour améliorer votre expérience.</span>';
  const ok = document.createElement('button'); ok.className='btn'; ok.textContent='Accepter';
  const no = document.createElement('button'); no.className='btn ghost'; no.textContent='Refuser';
  [ok,no].forEach(b=>{ b.style.padding='8px 10px'; b.style.boxShadow='none'; });
  ok.onclick = ()=>{ localStorage.setItem('cookie:consent','yes'); bar.remove(); };
  no.onclick = ()=>{ localStorage.setItem('cookie:consent','no'); bar.remove(); };
  bar.append(ok,no); document.body.append(bar);
})();

function openCookieCenter(){
  alert('Centre de préférences – version simple (peut être remplacé par votre CMP).');
}


// ===== Util: qs =====
const $  = (s, d=document)=>d.querySelector(s);
const $$ = (s, d=document)=>[...d.querySelectorAll(s)];

// ===== Theme toggle (press "L") =====
const toggleTheme = () => {
  document.documentElement.classList.toggle('light');
  localStorage.setItem('vaubia_theme', document.documentElement.classList.contains('light')?'light':'dark');
};
document.addEventListener('keydown', (e)=>{ if (e.key.toLowerCase()==='l') toggleTheme(); });
const saved = localStorage.getItem('vaubia_theme'); if(saved==='light') document.documentElement.classList.add('light');

// ===== Mobile menu =====
const hamb = $('.hamb');
if(hamb){
  const sheet = $('.sheet');
  hamb.addEventListener('click', ()=> sheet.classList.toggle('open'));
}

// ===== Canvas orbs / particles (hero background) =====
(function initOrbs(){
  const c = document.createElement('canvas');
  c.id = 'orbs'; c.style.width='100%'; c.style.height='100%';
  $('.canvas-wrap')?.appendChild(c);
  const ctx = c.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio||1, 2);
  function size(){ c.width = c.offsetWidth*DPR; c.height = c.offsetHeight*DPR; }
  size(); addEventListener('resize', size);
  const colors = ['#2dd4bf','#60a5fa','#22d3ee','#a78bfa'];
  const orbs = Array.from({length: 36}, (_,i)=> ({
    x: Math.random()*c.width, y: Math.random()*c.height,
    r: 20+Math.random()*70, dx:(Math.random()-.5)*.35, dy:(Math.random()-.5)*.35,
    color: colors[i%colors.length]
  }));
  function tick(){
    ctx.clearRect(0,0,c.width,c.height);
    for(const o of orbs){
      o.x+=o.dx; o.y+=o.dy;
      if(o.x<-100||o.x>c.width+100) o.dx*=-1;
      if(o.y<-100||o.y>c.height+100) o.dy*=-1;
      const g = ctx.createRadialGradient(o.x,o.y, 0, o.x,o.y, o.r*DPR);
      g.addColorStop(0, `${o.color}30`);
      g.addColorStop(1, '#0000');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(o.x,o.y,o.r*DPR,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

// ===== Mock dashboard (animated sparkline) =====
(function mock(){
  const el = $('#dashboard'); if(!el) return;
  const ctx = el.getContext('2d'); const DPR = Math.min(window.devicePixelRatio||1, 2);
  const w = el.clientWidth, h = Math.max(200, el.clientWidth*.5);
  el.width = w*DPR; el.height = h*DPR; el.style.height = h+'px';
  ctx.scale(DPR,DPR);
  function draw(){
    // grid
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#0b1220'; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = 'rgba(255,255,255,.06)';
    for(let y=40;y<h;y+=40){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
    // sparkline
    ctx.strokeStyle = '#22d3ee'; ctx.lineWidth = 2; ctx.beginPath();
    let y = h*0.6; ctx.moveTo(0,y);
    for(let x=0;x<w;x+=8){ y += (Math.sin(x*.04)+Math.random()-.4)*3; y = Math.max(20, Math.min(h-20, y)); ctx.lineTo(x,y); }
    ctx.stroke();
    // fill gradient glow
    const g = ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,'#22d3ee22'); g.addColorStop(1,'#22d3ee00');
    ctx.fillStyle=g; ctx.lineTo(w,h-10); ctx.lineTo(0,h-10); ctx.closePath(); ctx.fill();
    // header
    ctx.fillStyle = '#e5f1ff'; ctx.font = '600 12px Inter, sans-serif';
    ctx.fillText('Activité des menaces', 12, 18);
    ctx.fillStyle = '#a9b7d0'; ctx.fillText('Détections • alertes • posture', 12, 34);
  }
  draw(); addEventListener('resize', draw);
})();

// ===== Pricing toggle =====
const monthly = { starter:19, pro:49, business:99 };
const yearly  = { starter:15, pro:39, business:79 };
function setPrices(mode='monthly'){
  const src = mode==='yearly'? yearly : monthly;
  $("[data-price='starter']").textContent = src.starter;
  $("[data-price='pro']").textContent = src.pro;
  $("[data-price='business']").textContent = src.business;
}
$$('.tabs button')?.forEach(btn=>btn.addEventListener('click', e=>{
  $$('.tabs button').forEach(b=>b.classList.remove('active'));
  e.currentTarget.classList.add('active');
  setPrices(e.currentTarget.dataset.mode);
}));
setPrices('monthly');

// ===== Cookie banner (persist consent) =====
(function cookies(){
  const key = 'vaubia_cookie_ok';
  const el = $('.cookie'); if(!el) return;
  if(!localStorage.getItem(key)){ el.classList.add('show'); }
  const accept = el.querySelector('[data-accept]');
  const prefs  = el.querySelector('[data-prefs]');
  accept.addEventListener('click', ()=>{ localStorage.setItem(key,'1'); el.classList.remove('show'); });
  prefs.addEventListener('click', ()=>{ alert('Pour le moment, seuls des cookies essentiels sont utilisés.'); });
})();

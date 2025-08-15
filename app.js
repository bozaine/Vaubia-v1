
// Drawer (burger)
const burger = document.querySelector('.burger');
const drawer = document.getElementById('drawer');
if (burger && drawer){
  burger.addEventListener('click', () => {
    drawer.classList.toggle('open');
    const opened = drawer.classList.contains('open');
    burger.setAttribute('aria-expanded', opened);
    drawer.setAttribute('aria-hidden', !opened);
  });
}

// Billing toggle
const toggle = document.getElementById('billingToggle');
if (toggle){
  const amounts = document.querySelectorAll('.amount');
  const perEls = document.querySelectorAll('.per');
  const update = () => {
    amounts.forEach(a => {
      const v = toggle.checked ? a.dataset.y : a.dataset.m;
      a.textContent = v;
    });
    perEls.forEach(p => p.textContent = toggle.checked ? '/mois (annuel)' : '/mois');
  };
  toggle.addEventListener('change', update);
  update();
}

// Cookie banner
const storageKey = 'vaubia_cookies_v1';
const banner = document.getElementById('cookie-banner');
const modal = document.getElementById('cookie-modal');
const getPrefs = () => JSON.parse(localStorage.getItem(storageKey) || 'null');
const savePrefs = (prefs) => localStorage.setItem(storageKey, JSON.stringify(prefs));

const showBannerIfNeeded = () => {
  if (!getPrefs()) banner.classList.add('show');
};
showBannerIfNeeded();

document.querySelectorAll('[data-cookie="accept"]').forEach(btn => btn.onclick = () => {
  savePrefs({essential:true, analytics:true, improve:true, ts:Date.now()});
  banner.classList.remove('show'); modal.classList.remove('show');
});
document.querySelectorAll('[data-cookie="deny"]').forEach(btn => btn.onclick = () => {
  savePrefs({essential:true, analytics:false, improve:false, ts:Date.now()});
  banner.classList.remove('show');
});
document.querySelectorAll('[data-cookie="settings"]').forEach(btn => btn.onclick = () => {
  modal.classList.add('show');
  const prefs = getPrefs() || {analytics:false, improve:false};
  const a = document.getElementById('pref-analytics'); if(a) a.checked = !!prefs.analytics;
  const i = document.getElementById('pref-improve'); if(i) i.checked = !!prefs.improve;
});
document.querySelectorAll('[data-cookie="close"]').forEach(btn => btn.onclick = () => modal.classList.remove('show'));
document.querySelectorAll('[data-cookie="save"]').forEach(btn => btn.onclick = () => {
  const prefs = {
    essential:true,
    analytics: document.getElementById('pref-analytics')?.checked || false,
    improve: document.getElementById('pref-improve')?.checked || false,
    ts: Date.now()
  };
  savePrefs(prefs); modal.classList.remove('show'); banner.classList.remove('show');
});

// Canvas orbits (subtle floating dots)
(function(){
  const c = document.getElementById('orbits');
  if(!c) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const ctx = c.getContext('2d');
  const resize = () => {
    c.width = c.clientWidth * dpr;
    c.height = 200 * dpr;
  };
  const initSize = () => {
    c.style.width = '100%';
    c.style.height = '200px';
    resize();
  };
  initSize();
  window.addEventListener('resize', resize);

  const dots = Array.from({length: 24}, (_,i)=> ({
    r: 50 + i*4,
    a: Math.random()*Math.PI*2,
    s: (0.002 + Math.random()*0.002) * (i%2?1:-1)
  }));
  function frame(){
    ctx.clearRect(0,0,c.width,c.height);
    ctx.save();
    ctx.translate(c.width/2, c.height/2);
    dots.forEach((d,i)=>{
      d.a += d.s;
      const x = Math.cos(d.a)*d.r*dpr;
      const y = Math.sin(d.a)*d.r*dpr*0.5;
      const hue = i%2 ? 180 : 210;
      ctx.fillStyle = `hsla(${hue}, 90%, 70%, .85)`;
      ctx.shadowBlur = 12*dpr;
      ctx.shadowColor = ctx.fillStyle;
      ctx.beginPath();
      ctx.arc(x,y, 2.5*dpr, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.restore();
    requestAnimationFrame(frame);
  }
  frame();
})();

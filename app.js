
// Drawer
const drawer = document.getElementById('drawer');
const openDrawer = document.getElementById('openDrawer');
if(openDrawer){
  openDrawer.addEventListener('click', ()=> drawer.classList.add('active'));
  drawer?.querySelector('.backdrop')?.addEventListener('click', ()=> drawer.classList.remove('active'));
}

// Ambient visual: add orbiting dots
function addDots(container){
  if(!container) return;
  const count = 8;
  for(let i=0;i<count;i++){
    const d = document.createElement('div');
    d.className='dot';
    // Random orbit radius angle
    const r = 36 + Math.random()*28; // %
    const angle = Math.random()*360;
    d.style.transform = `rotate(${angle}deg) translate(${r}%)`;
    // spin animation with slightly different durations
    const dur = 7 + Math.random()*9;
    d.style.animation = `spin ${dur}s linear infinite`;
    container.appendChild(d);
  }
}
document.querySelectorAll('.radar').forEach(addDots);

// Cookie banner with preferences
const STORAGE_KEY = 'vaubia_cookie_prefs_v1';
function getPrefs(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }catch{ return {}; } }
function savePrefs(p){ localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

const banner = document.getElementById('cookieBanner');
const prefs = getPrefs();
if(!('accepted' in prefs)){ banner?.classList.add('active'); }

document.getElementById('acceptCookies')?.addEventListener('click', ()=>{
  savePrefs({ accepted:true, analytics:true, improve:true, date:Date.now() });
  banner?.classList.remove('active');
});
document.getElementById('declineCookies')?.addEventListener('click', ()=>{
  savePrefs({ accepted:false, analytics:false, improve:false, date:Date.now() });
  banner?.classList.remove('active');
});

// Modal
const modal = document.getElementById('prefsModal');
document.getElementById('openPrefs')?.addEventListener('click', ()=> modal?.classList.add('active'));
document.getElementById('closePrefs')?.addEventListener('click', ()=> modal?.classList.remove('active'));

function bindSwitch(id, key){
  const el = document.getElementById(id);
  if(!el) return;
  const p = getPrefs();
  if(p[key]) el.classList.add('active');
  el.addEventListener('click', ()=> el.classList.toggle('active'));
}
bindSwitch('toggleAnalytics','analytics');
bindSwitch('toggleImprove','improve');

document.getElementById('savePrefs')?.addEventListener('click', ()=>{
  const p = getPrefs();
  p.accepted = true;
  p.analytics = document.getElementById('toggleAnalytics')?.classList.contains('active');
  p.improve = document.getElementById('toggleImprove')?.classList.contains('active');
  savePrefs(p);
  modal?.classList.remove('active');
  banner?.classList.remove('active');
});

// Pricing toggle
function setYearly(on){
  document.querySelectorAll('.price').forEach(el=>{
    const y = el.getAttribute('data-y');
    const m = el.getAttribute('data-m');
    el.textContent = (on ? y : m) + '€';
  });
}
document.getElementById('toggleYear')?.addEventListener('click', ()=>setYearly(true));
document.getElementById('togglePlan')?.addEventListener('click', ()=>setYearly(false));


// Animated particles background (lightweight)
const canvas = document.getElementById('bg');
if (canvas) {
  const c = canvas.getContext('2d');
  let W, H, particles;
  const R = () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
    particles = Array.from({length: Math.min(140, Math.floor(W*H/12000))}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4,
      r: Math.random()*2+0.4
    }));
  };
  addEventListener('resize', R); R();
  const loop = () => {
    c.clearRect(0,0,W,H);
    c.fillStyle = 'rgba(94,231,223,0.35)';
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy;
      if (p.x<0||p.x>W) p.vx*=-1;
      if (p.y<0||p.y>H) p.vy*=-1;
      c.beginPath(); c.arc(p.x,p.y,p.r,0,Math.PI*2); c.fill();
    });
    requestAnimationFrame(loop);
  };
  loop();
}
// Mobile menu
function toggleMenu(){
  const m = document.getElementById('mobileMenu');
  m.style.display = (m.style.display === 'block') ? 'none' : 'block';
}
// Pricing toggle
function toggleBilling(){
  const sw = document.querySelector('.switch');
  const annual = sw.getAttribute('aria-pressed') !== 'true';
  sw.setAttribute('aria-pressed', annual);
  document.querySelectorAll('.money').forEach(el=>{
    const m = +el.dataset.m, y = +el.dataset.y;
    el.textContent = annual ? y+'€' : m+'€';
  });
  document.querySelectorAll('.per').forEach(el=>{
    el.textContent = annual ? '/an' : '/mo';
  });
}
// Demo slides
function showSlide(i){
  document.querySelectorAll('.mock-nav button').forEach((b,idx)=>b.classList.toggle('on', idx===i));
  document.querySelectorAll('.slide').forEach((s,idx)=>s.classList.toggle('show', idx===i));
  document.querySelectorAll('.steps li').forEach((li,idx)=>li.classList.toggle('active', idx===i));
}
// Cookies
const banner = document.getElementById('cookieBanner');
const modal = document.getElementById('cookieModal');
function showBanner(){ if(!localStorage.getItem('cookiePrefs')) banner.style.display='block'; }
function acceptAllCookies(){ localStorage.setItem('cookiePrefs', JSON.stringify({analytics:true,marketing:true})); banner.style.display='none'; }
function openCookiePrefs(){ if(modal){ modal.hidden = false; } }
function closeCookiePrefs(){ if(modal){ modal.hidden = true; } }
function saveCookiePrefs(){
  const pref = {
    analytics: document.getElementById('pref_analytics')?.checked || false,
    marketing: document.getElementById('pref_marketing')?.checked || false
  };
  localStorage.setItem('cookiePrefs', JSON.stringify(pref));
  closeCookiePrefs(); banner.style.display='none';
}
showBanner();

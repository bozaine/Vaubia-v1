
// Vaubia — app.js (v3)
const $ = (sel, ctx=document)=>ctx.querySelector(sel);
const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

// Mobile menu
const hamb = $('.hamb');
if(hamb){
  hamb.addEventListener('click', ()=> $('.menu').classList.toggle('open'));
}

// Expandable search pill
$$('.search-pill').forEach(pill=>{
  const input = $('input', pill);
  const icon = $('button', pill);
  icon?.addEventListener('click', ()=>{ input?.focus(); });
});

// Cookie banner
(function(){
  const key='vaubia_cookies';
  const saved = localStorage.getItem(key);
  if(!saved){
    $('.cookie')?.classList.remove('hidden');
  }
  $('#cookie-accept')?.addEventListener('click', ()=>{
    localStorage.setItem(key, JSON.stringify({essentials:true, analytics:true, ts:Date.now()}));
    $('.cookie')?.classList.add('hidden');
  });
  $('#cookie-deny')?.addEventListener('click', ()=>{
    localStorage.setItem(key, JSON.stringify({essentials:true, analytics:false, ts:Date.now()}));
    $('.cookie')?.classList.add('hidden');
  });
})();

// Simple i18n
const i18n = {
  get lang(){ return localStorage.getItem('vaubia_lang') || 'fr';},
  set lang(l){ localStorage.setItem('vaubia_lang', l);},
  t(dictKey){
    const dict = window.TRANSLATIONS?.[this.lang] || {};
    return dict[dictKey] || dictKey;
  }
};
window.i18n = i18n;

// Auth mock
const Auth = {
  key:'vaubia_auth',
  get user(){
    try{ return JSON.parse(localStorage.getItem(this.key)); }catch(e){ return null; }
  },
  login(email,pass){
    if(!email || !pass) throw new Error('Identifiants requis');
    const u = { id: cryptoRandom(), email, name: email.split('@')[0], plan: localStorage.getItem('vaubia_plan') || 'trial' };
    localStorage.setItem(this.key, JSON.stringify(u));
    return u;
  },
  signupPending(email, org){
    localStorage.setItem('vaubia_pending', JSON.stringify({email, org, ts:Date.now()}));
  },
  completeSubscription(plan){
    localStorage.setItem('vaubia_plan', plan);
    const pending = JSON.parse(localStorage.getItem('vaubia_pending')||'null');
    if(pending){
      this.login(pending.email, 'set-by-provider');
      localStorage.removeItem('vaubia_pending');
    }
  },
  logout(){ localStorage.removeItem(this.key); }
};
window.Auth = Auth;

function cryptoRandom(){
  const arr = new Uint8Array(8); (window.crypto||window.msCrypto).getRandomValues(arr);
  return btoa(String.fromCharCode(...arr)).replace(/[^a-z0-9]/gi,'').slice(0,12);
}

// Guard: if a page has data-auth="required", redirect to login
(function(){
  const guard = document.documentElement.getAttribute('data-auth');
  if(guard === 'required' && !Auth.user){
    const here = location.pathname.split('/').pop();
    location.href = `login.html?next=${encodeURIComponent(here)}`;
  }
})();

// Pricing carousel with drag & swipe
window.initCarousel = function(selector){
  const root = $(selector); if(!root) return;
  const track = $('.carousel-track', root);
  let pos = 0, startX = 0, isDown=false, lastX=0, velocity=0, raf=null;

  const max = () => Math.max(0, track.scrollWidth - root.clientWidth);

  const setPos = (x) => {
    pos = Math.max(0, Math.min(max(), x));
    track.style.transform = `translateX(${-pos}px)`;
  };

  const momentum = () => {
    pos += velocity;
    velocity *= 0.95;
    setPos(pos);
    if(Math.abs(velocity) > 0.5) raf = requestAnimationFrame(momentum);
  };

  const onDown = (x) => { isDown=true; startX=x; lastX=x; velocity=0; cancelAnimationFrame(raf); root.classList.add('grabbing'); };
  const onMove = (x) => {
    if(!isDown) return;
    const dx = x - lastX;
    setPos(pos - dx);
    velocity = (x - lastX);
    lastX = x;
  };
  const onUp = () => {
    isDown=false; root.classList.remove('grabbing');
    raf = requestAnimationFrame(momentum);
  };

  root.addEventListener('pointerdown', e=> onDown(e.clientX));
  window.addEventListener('pointermove', e=> onMove(e.clientX));
  window.addEventListener('pointerup', onUp);
  root.addEventListener('wheel', e=>{ setPos(pos + e.deltaY + e.deltaX); });

  $('.arrow.left', root)?.addEventListener('click', ()=> setPos(pos - root.clientWidth*0.9));
  $('.arrow.right', root)?.addEventListener('click', ()=> setPos(pos + root.clientWidth*0.9));
};

// Helper to mount common header/footer
window.mountCommon = function(active){
  const header = document.getElementById('header-slot');
  if(header){
    header.innerHTML = `
    <div class="header">
      <div class="container nav">
        <div class="brand"><a href="index.html" style="display:flex;gap:10px;align-items:center;text-decoration:none;color:inherit">
          ${window.LOGO_SVG}
          <span>Vaubia</span>
        </a></div>

        <div class="search-pill" aria-label="Rechercher">
          <button aria-label="Rechercher" class="btn ghost" style="border-radius:999px;padding:8px 10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
          <input placeholder="Rechercher..."/>
        </div>

        <div class="menu">
          <a href="pricing.html" ${active==='pricing'?'style="background:rgba(255,255,255,.12)"':''}>Tarifs</a>
          <a href="services.html" ${active==='services'?'style="background:rgba(255,255,255,.12)"':''}>Services</a>
          <a href="legal/mentions-legales.html">Légal</a>
          <a href="login.html">Connexion</a>
          <a class="btn" href="signup.html">S’inscrire</a>
        </div>
        <div class="hamb" aria-label="Menu">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </div>
      </div>
    </div>`;
  }
  const footer = document.getElementById('footer-slot');
  if(footer){
    footer.innerHTML = `
      <div class="footer container">
        <div class="wave"></div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:space-between;align-items:center">
          <div>© ${new Date().getFullYear()} Vaubia — Protégez l’essentiel</div>
          <div style="display:flex;gap:12px">
            <a href="legal/politique-confidentialite.html">Confidentialité</a>
            <a href="legal/cookies.html">Cookies</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
      </div>`;
  }
};

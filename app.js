
// Drawer + cookie banner + pricing toggle helpers
const qs=(s,sc=document)=>sc.querySelector(s);
const qsa=(s,sc=document)=>[...sc.querySelectorAll(s)];

// Drawer
const drawer = qs('.drawer');
qsa('.burger, .close-drawer').forEach(el => el?.addEventListener('click',()=>{
  drawer?.classList.toggle('open');
}));

// Cookie banner (basic consent)
(function(){
  const KEY='vaubia_cookie_consent_v1';
  const banner=qs('.cookie-banner');
  if(!banner) return;
  const saved=localStorage.getItem(KEY);
  if(!saved) banner.classList.add('show');
  qs('#acceptAll')?.addEventListener('click',()=>{
    localStorage.setItem(KEY, JSON.stringify({essential:true,analytics:true,marketing:false,ts:Date.now()}));
    banner.classList.remove('show');
  });
  qs('#declineAll')?.addEventListener('click',()=>{
    localStorage.setItem(KEY, JSON.stringify({essential:true,analytics:false,marketing:false,ts:Date.now()}));
    banner.classList.remove('show');
  });
})();

// Pricing page toggle (if present)
(function(){
  const toggle=qs('#billingToggle');
  if(!toggle) return;
  const label=qs('#billingLabel');
  const cards=qsa('[data-plan]');
  function apply(yearly){
    label.textContent = yearly ? 'Annuel (-17%)' : 'Mensuel';
    cards.forEach(c=>{
      const price = yearly ? c.dataset.yearly : c.dataset.monthly;
      const unit  = yearly ? '€/an HT' : '€/mois HT';
      const priceEl = c.querySelector('.price');
      priceEl.textContent = price;
      c.querySelector('.unit').textContent = unit;
    });
  }
  toggle.addEventListener('change',e=>apply(e.target.checked));
  apply(toggle.checked);
})();

// Contact form simple client-side guard
(function(){
  const form=qs('#contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    const email=qs('input[name="email"]',form).value.trim();
    const message=qs('textarea[name="message"]',form).value.trim();
    if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length<10){
      e.preventDefault();
      alert('Merci de renseigner un e-mail valide et un message (10 caractères minimum).');
    }
  });
})();


(function(){
  const KEY='vaubia-consent-v1';
  const state = JSON.parse(localStorage.getItem(KEY) || '{"necessary":true,"analytics":false}');
  function save(){ localStorage.setItem(KEY,JSON.stringify(state)); }
  function style(){
    const s=document.createElement('style');
    s.textContent=`
      .cc-wrap{position:fixed;inset:auto 12px 12px 12px;background:#121f31;border:1px solid rgba(255,255,255,.08);color:#e9f0f7;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.4);padding:16px;z-index:9999;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
      .cc-wrap .cc-actions{margin-left:auto;display:flex;gap:8px}
      .cc-btn{background:#3ad1b7;color:#052825;border:none;border-radius:10px;padding:10px 12px;font-weight:700;cursor:pointer}
      .cc-btn.ghost{background:transparent;border:1px solid rgba(255,255,255,.15);color:#e9f0f7}
      .cc-modal{position:fixed;inset:0;background:rgba(0,0,0,.5);display:none;place-items:center;z-index:10000}
      .cc-panel{background:#121f31;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:18px;max-width:520px;width:92%}
      .row{display:flex;align-items:center;justify-content:space-between;margin:10px 0;color:#b6c6d8}
      input[type=checkbox]{transform:scale(1.2)}
    `;
    document.head.appendChild(s);
  }
  function banner(){
    if(localStorage.getItem(KEY)) return; // already set
    const b=document.createElement('div'); b.className='cc-wrap';
    b.innerHTML=`<strong>Cookies</strong><span>Nous utilisons des cookies nécessaires. Les analytiques sont <u>désactivés par défaut</u>.</span>
      <div class="cc-actions">
        <button class="cc-btn ghost" id="cc-settings">Paramètres</button>
        <button class="cc-btn" id="cc-accept">Tout accepter</button>
        <button class="cc-btn ghost" id="cc-reject">Tout refuser</button>
      </div>`;
    document.body.appendChild(b);
    document.getElementById('cc-accept').onclick=()=>{state.analytics=true;save();b.remove();maybeLoadAnalytics();};
    document.getElementById('cc-reject').onclick=()=>{state.analytics=false;save();b.remove();};
    document.getElementById('cc-settings').onclick=()=>{openConsent(); b.remove();};
  }
  function modal(){
    const m=document.createElement('div'); m.className='cc-modal'; m.innerHTML=`
      <div class="cc-panel">
        <h3>Préférences de confidentialité</h3>
        <div class="row"><span>Nécessaires</span><input type="checkbox" checked disabled></div>
        <div class="row"><span>Analytiques</span><input id="cc-analytics" type="checkbox" ${state.analytics?'checked':''}></div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
          <button class="cc-btn ghost" id="cc-close">Fermer</button>
          <button class="cc-btn" id="cc-save">Enregistrer</button>
        </div>
      </div>`;
    document.body.appendChild(m);
    return m;
  }
  function maybeLoadAnalytics(){
    if(!state.analytics) return;
    // placeholder for Plausible/Matomo; safe by default
    // Example: const s=document.createElement('script'); s.defer=true; s.src='https://plausible.io/js/script.js'; s.setAttribute('data-domain','vaubia.com'); document.head.appendChild(s);
  }
  style();
  const m = modal();
  window.openConsent = function(){ m.style.display='grid'; }
  m.addEventListener('click', (e)=>{ if(e.target===m) m.style.display='none'; });
  m.querySelector('#cc-close').onclick=()=> m.style.display='none';
  m.querySelector('#cc-save').onclick=()=>{ state.analytics = m.querySelector('#cc-analytics').checked; save(); m.style.display='none'; maybeLoadAnalytics(); };
  banner();
  maybeLoadAnalytics();
})();

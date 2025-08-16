/*! Vaubia Consent v1 */
(function(){
  const LS_KEY = "vaubia-consent-v1";
  const defaults = { essential: true, analytics: false, marketing: false, timestamp: null };

  function read(){
    try{ const d = JSON.parse(localStorage.getItem(LS_KEY)); if(d && typeof d==='object') return d; }catch(e){}
    return null;
  }
  function save(prefs){
    prefs.timestamp = new Date().toISOString();
    localStorage.setItem(LS_KEY, JSON.stringify(prefs));
    apply(prefs);
  }
  function apply(prefs){
    window.vaubiaConsent = Object.freeze({ ...prefs });
    // Enable any scripts tagged with data-consent="analytics|marketing"
    document.querySelectorAll('script[type="text/plain"][data-consent]').forEach(function(sc){
      const cat = sc.getAttribute('data-consent');
      const allowed = !!prefs[cat];
      const loaded = sc.dataset.loaded === "1";
      if (allowed && !loaded){
        const s = document.createElement('script');
        if (sc.src) s.src = sc.src;
        s.text = sc.text;
        s.async = sc.async;
        s.defer = sc.defer;
        document.head.appendChild(s);
        sc.dataset.loaded = "1";
      }
    });
  }

  function ensureUI(){
    if (document.getElementById('cc-banner')) return;
    const banner = document.createElement('div');
    banner.className = 'cc-banner'; banner.id = 'cc-banner';
    banner.innerHTML = ''
      + '<div class="cc-title">Nous respectons votre vie privée</div>'
      + '<p class="cc-text">Nous utilisons des cookies essentiels pour faire fonctionner le site et, avec votre accord, des cookies d\\'analyse et marketing.</p>'
      + '<div class="cc-actions">'
      + '  <button class="cc-btn ghost" id="cc-reject">Tout refuser</button>'
      + '  <button class="cc-btn" id="cc-customize">Personnaliser</button>'
      + '  <button class="cc-btn primary" id="cc-accept">Tout accepter</button>'
      + '</div>';
    document.body.appendChild(banner);

    const backdrop = document.createElement('div'); backdrop.className='cc-modal-backdrop'; backdrop.id='cc-backdrop';
    const modal = document.createElement('div'); modal.className='cc-modal'; modal.id='cc-modal';
    modal.innerHTML = ''
      + '<h3 style="margin:0 0 8px">Préférences de confidentialité</h3>'
      + '<p class="cc-text">Choisissez les catégories que vous souhaitez autoriser. Vous pouvez modifier ces préférences à tout moment.</p>'
      + '<div class="cc-row"><div><strong>Essentiel</strong> <span class="cc-badge">Toujours actif</span><div class="cc-text">Nécessaire pour le fonctionnement du site.</div></div><div class="cc-lock">🔒</div></div>'
      + '<div class="cc-row"><div><strong>Analytics</strong><div class="cc-text">Mesure d\\'audience anonyme.</div></div><div><label><input type="checkbox" id="cc-analytics" class="cc-toggle"></label></div></div>'
      + '<div class="cc-row"><div><strong>Marketing</strong><div class="cc-text">Personnalisation et publicités.</div></div><div><label><input type="checkbox" id="cc-marketing" class="cc-toggle"></label></div></div>'
      + '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:12px">'
      + '  <button class="cc-btn ghost" id="cc-cancel">Annuler</button>'
      + '  <button class="cc-btn" id="cc-save">Enregistrer</button>'
      + '</div>';
    document.body.appendChild(backdrop); document.body.appendChild(modal);

    const btnAccept = banner.querySelector('#cc-accept');
    const btnReject = banner.querySelector('#cc-reject');
    const btnCustom = banner.querySelector('#cc-customize');
    const btnSave = modal.querySelector('#cc-save');
    const btnCancel = modal.querySelector('#cc-cancel');
    const toggleAnalytics = modal.querySelector('#cc-analytics');
    const toggleMarketing = modal.querySelector('#cc-marketing');

    function showBanner(){ banner.classList.add('show'); }
    function hideBanner(){ banner.classList.remove('show'); }
    function showModal(){ backdrop.classList.add('show'); modal.classList.add('show'); }
    function hideModal(){ backdrop.classList.remove('show'); modal.classList.remove('show'); }

    btnAccept.addEventListener('click', function(){ hideBanner(); save({ essential:true, analytics:true, marketing:true }); });
    btnReject.addEventListener('click', function(){ hideBanner(); save({ essential:true, analytics:false, marketing:false }); });
    btnCustom.addEventListener('click', function(){ hideBanner(); const cur = read() || defaults; toggleAnalytics.checked = !!cur.analytics; toggleMarketing.checked = !!cur.marketing; showModal(); });
    btnSave.addEventListener('click', function(){ hideModal(); save({ essential:true, analytics:toggleAnalytics.checked, marketing:toggleMarketing.checked }); });
    btnCancel.addEventListener('click', function(){ hideModal(); showBanner(); });

    window.openCookieCenter = function(){ const cur = read() || defaults; toggleAnalytics.checked = !!cur.analytics; toggleMarketing.checked = !!cur.marketing; showModal(); };
  }

  document.addEventListener('DOMContentLoaded', function(){
    const prefs = read();
    ensureUI();
    if (prefs){ apply(prefs); } else { document.getElementById('cc-banner').classList.add('show'); }
  });
})();
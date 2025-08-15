document.getElementById('y').textContent=new Date().getFullYear();
(function(){
  const key='vaubia_consent_v1';
  const saved=localStorage.getItem(key);
  const banner=document.getElementById('cookie-banner');
  if(!saved){ banner.style.display='block'; }
  function accept(){ localStorage.setItem(key, JSON.stringify({analytics:true, ts:Date.now()})); banner.style.display='none'; }
  function reject(){ localStorage.setItem(key, JSON.stringify({analytics:false, ts:Date.now()})); banner.style.display='none'; }
  document.getElementById('btn-accept').onclick=accept;
  document.getElementById('btn-reject').onclick=reject;
})();
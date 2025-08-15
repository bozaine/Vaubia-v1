
function toggleDrawer(){document.getElementById('drawer').classList.toggle('open');}
let yearly=true;function setBilling(m){yearly=(m==='y');document.getElementById('yBtn').classList.toggle('active',yearly);document.getElementById('mBtn').classList.toggle('active',!yearly);const p1=document.getElementById('p1');const p2=document.getElementById('p2');if(!p1||!p2)return;if(yearly){p1.textContent='19 €';p2.textContent='49 €';}else{p1.textContent='23 €';p2.textContent='59 €';}}
const KEY='vaubia.cookies.v1';function loadConsent(){try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(e){return{};}}function saveConsent(o){localStorage.setItem(KEY,JSON.stringify(o));}
function showBannerIfNeeded(){const c=loadConsent();if(!c.set){document.getElementById('cookieBanner').classList.add('show');}}
function acceptAll(){saveConsent({set:true,analytics:true,ux:true,t:Date.now()});document.getElementById('cookieBanner').classList.remove('show');}
function rejectAll(){saveConsent({set:true,analytics:false,ux:false,t:Date.now()});document.getElementById('cookieBanner').classList.remove('show');}
function openPrefs(){const c=loadConsent();document.getElementById('c_analytics').checked=!!c.analytics;document.getElementById('c_ux').checked=!!c.ux;document.getElementById('cookieModal').classList.add('show');}
function closePrefs(){document.getElementById('cookieModal').classList.remove('show');}
function savePrefs(){const analytics=document.getElementById('c_analytics').checked;const ux=document.getElementById('c_ux').checked;saveConsent({set:true,analytics,ux,t:Date.now()});closePrefs();document.getElementById('cookieBanner').classList.remove('show');}
document.addEventListener('DOMContentLoaded',()=>{showBannerIfNeeded();setBilling('y');});

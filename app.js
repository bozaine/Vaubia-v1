
function toggleMenu(){
  const d=document.getElementById('drawer');
  d.style.display=(d.style.display==='block'?'none':'block');
}
const cookieKey='vaubia_cookie_optin_v1';
function acceptCookies(){localStorage.setItem(cookieKey,'accepted');document.getElementById('cookieBar').style.display='none';}
function rejectCookies(){localStorage.setItem(cookieKey,'rejected');document.getElementById('cookieBar').style.display='none';}
window.addEventListener('DOMContentLoaded',()=>{
  if(!localStorage.getItem(cookieKey)){document.getElementById('cookieBar').style.display='block';}
});

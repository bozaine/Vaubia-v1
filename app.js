
// Mobile drawer
const drawer = document.querySelector('.mobile-drawer');
const overlay = document.querySelector('.overlay');
const openBtn = document.querySelector('.burger');
const closeBtn = document.querySelector('#close-drawer');

function openDrawer(){ drawer?.classList.add('open'); overlay?.classList.add('show'); }
function closeDrawer(){ drawer?.classList.remove('open'); overlay?.classList.remove('show'); }

openBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
overlay?.addEventListener('click', closeDrawer);

// Pricing toggle
const monthlyBtn = document.querySelector('#toggle-monthly');
const yearlyBtn = document.querySelector('#toggle-yearly');
const priceEls = document.querySelectorAll('[data-monthly][data-yearly]');

function setPeriod(period){
  if(!monthlyBtn||!yearlyBtn) return;
  monthlyBtn.classList.toggle('active', period==='m');
  yearlyBtn.classList.toggle('active', period==='y');
  priceEls.forEach(el=>{
    el.textContent = period==='y' ? el.dataset.yearly : el.dataset.monthly;
  });
  document.querySelectorAll('.period').forEach(p=>p.textContent = period==='y' ? '/an' : '/mois');
  localStorage.setItem('vaubia_period', period);
}
// init
const saved = localStorage.getItem('vaubia_period') || 'm';
setPeriod(saved);
monthlyBtn?.addEventListener('click', ()=>setPeriod('m'));
yearlyBtn?.addEventListener('click', ()=>setPeriod('y'));

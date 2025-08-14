document.querySelectorAll('form[action="#newsletter"]').forEach(f=>{
  f.addEventListener('submit', (e)=>{
    e.preventDefault();
    const ok = f.querySelector('.ok'); if(ok){ ok.style.display='block'; }
  });
});
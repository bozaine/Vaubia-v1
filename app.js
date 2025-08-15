
// Drawer
(function(){
  const burger = document.querySelector('.burger'); if(!burger) return;
  const drawer = document.createElement('div'); drawer.className='drawer';
  drawer.innerHTML = `<div class="scrim"></div><div class="panel">
    <a href="index.html">Accueil</a>
    <a href="services.html">Fonctionnalités</a>
    <a href="pricing.html">Tarifs</a>
    <a href="demo.html">Démo</a>
    <a href="contact.html">Contact</a>
    <a href="mentions-legales.html">Mentions légales</a>
    <a href="politique-confidentialite.html">Confidentialité</a>
    <a href="cookies.html">Cookies</a>
  </div>`;
  document.body.appendChild(drawer);
  burger.addEventListener('click', ()=> drawer.classList.toggle('open'));
  drawer.querySelector('.scrim').addEventListener('click', ()=> drawer.classList.remove('open'));
})();

// Pricing toggle
(function(){
  const btns = document.querySelectorAll('.tabs button');
  if(!btns.length) return;
  const setMode = mode => {
    document.querySelectorAll('[data-price]').forEach(el=>{
      const m = el.getAttribute('data-m'); const y = el.getAttribute('data-y');
      el.textContent = mode==='yearly'? y : m;
    });
  };
  btns.forEach(b=> b.addEventListener('click', e=>{
    btns.forEach(x=>x.classList.remove('active')); e.currentTarget.classList.add('active'); setMode(e.currentTarget.dataset.mode);
  }));
  setMode('monthly');
})();

// Cookie consent
(function(){
  const KEY='vaubia_cookie_prefs_v3';
  const banner = document.querySelector('.cookie-banner'); const modal = document.getElementById('cookie-modal');
  const open = ()=> modal.classList.add('show'); const close = ()=> modal.classList.remove('show');
  const get=()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch{return null}}; const set=v=>localStorage.setItem(KEY, JSON.stringify(v));
  if(!get()) banner.classList.add('show');
  document.querySelectorAll('[data-cookie="accept"]').forEach(el=> el.addEventListener('click', ()=>{ set({necessary:true,analytics:true,marketing:false}); banner.classList.remove('show'); close(); }));
  document.querySelectorAll('[data-cookie="reject"]').forEach(el=> el.addEventListener('click', ()=>{ set({necessary:true,analytics:false,marketing:false}); banner.classList.remove('show'); }));
  document.querySelectorAll('[data-cookie="settings"]').forEach(el=> el.addEventListener('click', open));
  document.querySelectorAll('[data-cookie="close"]').forEach(el=> el.addEventListener('click', close));
  document.getElementById('save-preferences')?.addEventListener('click', ()=>{
    const a = document.getElementById('toggle-analytics')?.checked; const m = document.getElementById('toggle-marketing')?.checked;
    set({necessary:true, analytics:!!a, marketing:!!m}); banner.classList.remove('show'); close();
  });
})();

// Demo: network defense animation
(function(){
  const canvas = document.getElementById('network-demo'); if(!canvas) return;
  const ctx = canvas.getContext('2d'); const DPR = Math.min(2, window.devicePixelRatio||1);
  function fit(){ canvas.width = canvas.clientWidth*DPR; canvas.height = 380*DPR; canvas.style.height='380px'; ctx.setTransform(DPR,0,0,DPR,0,0) }
  fit(); addEventListener('resize', fit);
  const center={x:.58,y:.48}; const nodes=Array.from({length:14},()=>({x:Math.random()*.8+.1,y:Math.random()*.6+.2,r:2+Math.random()*2}));
  const edges=[]; nodes.forEach((n,i)=>{ edges.push([i,'c']); const j=(i+Math.floor(Math.random()*4)+1)%nodes.length; edges.push([i,j]); });
  const pulses = edges.map(()=>({t:Math.random(), s:.12+Math.random()*.2, dir:Math.random()<.5?1:-1}));
  let attack=null, next=0, ripple=null;
  function launch(){ const s=Math.floor(Math.random()*4); let x,y; if(s===0){x=-.05;y=Math.random()} else if(s===1){x=1.05;y=Math.random()} else if(s===2){x=Math.random();y=-.05} else {x=Math.random();y=1.05}
    attack={x,y,vx:(center.x-x)*.32,vy:(center.y-y)*.32}; }
  function draw(){
    const w=canvas.clientWidth, h=380; ctx.clearRect(0,0,w,h);
    // edges
    ctx.lineWidth=1.2; edges.forEach(e=>{ const a=e[0]==='c'?{x:w*center.x,y:h*center.y}:{x:w*nodes[e[0]].x,y:h*nodes[e[0]].y};
      const b=e[1]==='c'?{x:w*center.x,y:h*center.y}:{x:w*nodes[e[1]].x,y:h*nodes[e[1]].y};
      const g=ctx.createLinearGradient(a.x,a.y,b.x,b.y); g.addColorStop(0,'rgba(90,103,255,0)'); g.addColorStop(.5,'rgba(90,103,255,.35)'); g.addColorStop(1,'rgba(90,103,255,0)');
      ctx.strokeStyle=g; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
    });
    // nodes
    nodes.forEach(n=>{ ctx.fillStyle='#9fd4ff'; ctx.globalAlpha=.12; ctx.beginPath(); ctx.arc(w*n.x,h*n.y,n.r*4,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1; ctx.beginPath(); ctx.arc(w*n.x,h*n.y,n.r,0,Math.PI*2); ctx.fill(); });
    // pulses
    pulses.forEach((p,i)=>{ p.t=(p.t+p.s*.016*p.dir)%1; if(p.t<0)p.t+=1; const e=edges[i];
      const a=e[0]==='c'?{x:w*center.x,y:h*center.y}:{x:w*nodes[e[0]].x,y:h*nodes[e[0]].y};
      const b=e[1]==='c'?{x:w*center.x,y:h*center.y}:{x:w*nodes[e[1]].x,y:h*nodes[e[1]].y};
      const x=a.x+(b.x-a.x)*p.t, y=a.y+(b.y-a.y)*p.t; ctx.fillStyle='#13e2c2'; ctx.beginPath(); ctx.arc(x,y,2,0,Math.PI*2); ctx.fill();
    });
    // shield
    const R=Math.min(w,h)*.12; ctx.strokeStyle='rgba(19,226,194,.65)'; ctx.lineWidth=1.6; ctx.beginPath(); ctx.arc(w*center.x,h*center.y,R,0,Math.PI*2); ctx.stroke();
    // attack
    const now=performance.now()/1000; if(!attack && now>next){ launch(); next=now+5+Math.random()*3; }
    if(attack){ attack.x+=attack.vx*.016; attack.y+=attack.vy*.016; const ax=w*attack.x, ay=h*attack.y;
      ctx.fillStyle='#ff6677'; ctx.shadowColor='#ff6677'; ctx.shadowBlur=14; ctx.beginPath(); ctx.arc(ax,ay,3,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
      const dx=(attack.x-center.x)*w, dy=(attack.y-center.y)*h; if(Math.hypot(dx,dy)<R){ ripple={t:0}; attack.vx*=-.8; attack.vy*=-.8; }
      if(attack.x<-0.1||attack.x>1.1||attack.y<-0.1||attack.y>1.1) attack=null;
    }
    if(ripple){ ripple.t+=.02; const r=R*(1+ripple.t*.9); ctx.strokeStyle=`rgba(19,226,194,${1-ripple.t})`; ctx.lineWidth=2; ctx.beginPath(); ctx.arc(w*center.x,h*center.y,r,0,Math.PI*2); ctx.stroke(); if(ripple.t>1) ripple=null; }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();

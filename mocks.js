
// mocks.js — synthetic data for dashboard
function seededRandom(seed){
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
export function generateDailySeries(days=30, seed=42){
  const out=[]; let S=seed;
  let attempts=40+Math.round(seededRandom(S++)*60);
  let blocked=attempts*0.7;
  for(let i=days-1;i>=0;i--){
    attempts += (seededRandom(S++)-.5)*10;
    blocked = Math.max(0, attempts*(0.6 + seededRandom(S++)*0.2));
    out.push({date:new Date(Date.now()-i*86400000), attempts:Math.max(0,Math.round(attempts)), blocked:Math.round(blocked)});
  }
  return out;
}
export function securityScore(series){
  const last = series.at(-1)||{attempts:0, blocked:0};
  const rate = last.attempts? last.blocked/last.attempts : 1;
  return Math.round(60 + rate*40);
}
// tiny chart drawing (canvas 2d)
export function drawSeries(canvas, series){
  const ctx = canvas.getContext('2d');
  const W = canvas.clientWidth, H = canvas.clientHeight;
  canvas.width = W*2; canvas.height=H*2; ctx.scale(2,2);
  ctx.clearRect(0,0,W,H);
  const maxY = Math.max(...series.map(d=>d.attempts)) * 1.2 || 100;
  const pad=18; const n = series.length;
  // grid
  ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=1;
  for(let y=0;y<4;y++){ const yy = pad + (H-2*pad)*y/3; ctx.beginPath(); ctx.moveTo(pad,yy); ctx.lineTo(W-pad,yy); ctx.stroke();}
  // area: blocked
  ctx.beginPath();
  series.forEach((d,i)=>{
    const x = pad + (W-2*pad)*i/(n-1);
    const y = pad + (H-2*pad)*(1 - d.blocked/maxY);
    if(i===0) ctx.moveTo(x,H-pad);
    ctx.lineTo(x,y);
  });
  ctx.lineTo(W-pad,H-pad); ctx.closePath();
  const grad = ctx.createLinearGradient(0,0,0,H);
  grad.addColorStop(0,'rgba(22,224,184,.45)');
  grad.addColorStop(1,'rgba(22,224,184,0)');
  ctx.fillStyle=grad; ctx.fill();
  // line: attempts
  ctx.beginPath();
  series.forEach((d,i)=>{
    const x = pad + (W-2*pad)*i/(n-1);
    const y = pad + (H-2*pad)*(1 - d.attempts/maxY);
    i?ctx.lineTo(x,y):ctx.moveTo(x,y);
  });
  ctx.strokeStyle='rgba(108,166,255,.9)'; ctx.lineWidth=2; ctx.stroke();
}

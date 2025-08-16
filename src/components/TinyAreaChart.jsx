import React, { useEffect, useRef } from 'react'

export default function TinyAreaChart({ series }){
  const ref = useRef(null)
  useEffect(()=>{
    const canvas = ref.current; if(!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.clientWidth, H = canvas.clientHeight
    canvas.width = W*2; canvas.height = H*2; ctx.scale(2,2)
    ctx.clearRect(0,0,W,H)
    const pad=18; const n=series.length
    const maxY = Math.max(...series.map(d=>d.attempts)) * 1.2 || 100

    // grid
    ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=1
    for(let y=0;y<4;y++){ const yy = pad + (H-2*pad)*y/3; ctx.beginPath(); ctx.moveTo(pad,yy); ctx.lineTo(W-pad,yy); ctx.stroke() }

    // area blocked
    ctx.beginPath()
    series.forEach((d,i)=>{
      const x = pad + (W-2*pad)*i/(n-1)
      const y = pad + (H-2*pad)*(1 - d.blocked/maxY)
      if(i===0) ctx.moveTo(x,H-pad)
      ctx.lineTo(x,y)
    })
    ctx.lineTo(W-pad,H-pad); ctx.closePath()
    const grad = ctx.createLinearGradient(0,0,0,H)
    grad.addColorStop(0,'rgba(31,164,143,.45)')
    grad.addColorStop(1,'rgba(31,164,143,0)')
    ctx.fillStyle=grad; ctx.fill()

    // line attempts
    ctx.beginPath()
    series.forEach((d,i)=>{
      const x = pad + (W-2*pad)*i/(n-1)
      const y = pad + (H-2*pad)*(1 - d.attempts/maxY)
      i?ctx.lineTo(x,y):ctx.moveTo(x,y)
    })
    ctx.strokeStyle='rgba(108,166,255,.9)'; ctx.lineWidth=2; ctx.stroke()
  }, [series])
  return <canvas ref={ref} className="w-full h-60 rounded-2xl bg-white/5 border border-white/10" role="img" aria-label="Évolution des menaces"></canvas>
}

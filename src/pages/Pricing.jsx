import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Pricing(){
  const nav = useNavigate()
  const { completePlan } = useAuth()
  const rootRef = useRef(null); const trackRef = useRef(null)
  useEffect(()=>{
    const root = rootRef.current, track = trackRef.current; if(!root||!track) return
    let pos=0, startX=0, lastX=0, vel=0, isDown=false, raf
    const max = ()=> Math.max(0, track.scrollWidth - root.clientWidth)
    const setPos = x => { pos = Math.max(0, Math.min(max(), x)); track.style.transform = `translateX(${-pos}px)` }
    const momentum = ()=>{ pos += vel; vel*=0.95; setPos(pos); if(Math.abs(vel)>0.5) raf=requestAnimationFrame(momentum) }
    const down = x => { isDown=true; startX=x; lastX=x; vel=0; cancelAnimationFrame(raf) }
    const move = x => { if(!isDown) return; const dx = x - lastX; setPos(pos - dx); vel = (x-lastX); lastX=x }
    const up = ()=>{ isDown=false; raf=requestAnimationFrame(momentum) }
    root.addEventListener('pointerdown', e=>down(e.clientX))
    window.addEventListener('pointermove', e=>move(e.clientX))
    window.addEventListener('pointerup', up)
    root.addEventListener('wheel', e=> setPos(pos + e.deltaY + e.deltaX))
    return ()=>{ window.removeEventListener('pointermove',e=>move(e.clientX)); window.removeEventListener('pointerup', up) }
  }, [])

  function selectPlan(plan){
    localStorage.setItem('vaubia_plan', plan)
    const pending = localStorage.getItem('vaubia_pending')
    if(pending){ completePlan(plan); nav('/dashboard') }
    else { nav(`/signup?plan=${plan}`) }
  }

  return (
    <div className="container py-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tarifs</h1>
        <Link to="/" className="btn">Accueil</Link>
      </header>
      <div ref={rootRef} className="relative overflow-hidden">
        <div ref={trackRef} className="flex gap-4 transition-transform">
          {['Essentiel','Pro','Entreprise','Essentiel','Pro'].map((name,i)=> (
            <div key={i} className="card min-w-[320px] max-w-[360px]">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-slate-300">Offre {name.toLowerCase()} pour {name==='Entreprise'?'les grandes structures':'bien démarrer'}.</p>
              <h2 className="mt-2 text-2xl font-bold">{name==='Entreprise'?'—':'19€'} <small className="text-slate-400 text-sm">{name==='Entreprise'?'sur devis':'/mois'}</small></h2>
              <ul className="text-slate-300 mt-2 list-disc pl-5">
                <li>Score de sécurité</li>
                <li>Alertes e‑mail</li>
                <li>Rapport {name==='Essentiel'?'mensuel':'hebdomadaire'}</li>
              </ul>
              {name==='Entreprise' ? <Link className="btn mt-3" to="/contact">Nous contacter</Link> :
                <button className="btn primary mt-3" onClick={()=>selectPlan(name.toLowerCase())}>Souscrire</button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

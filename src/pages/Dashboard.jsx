import Header from '../components/Header'
import Footer from '../components/Footer'
import { genMetrics } from '../mocks/data'
import { useState } from 'react'
import { auth } from '../mocks/auth'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const [m, setM] = useState(genMetrics())
  const nav = useNavigate()
  const logout = () => { auth.logout(); nav('/login') }

  return (
    <div>
      <Header />
      <main className="container">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h1>Tableau de bord</h1>
          <div style={{display:'flex', gap:10}}>
            <button className="btn" onClick={()=>setM(genMetrics())}>Rafraîchir</button>
            <button className="btn ghost" onClick={logout}>Déconnexion</button>
          </div>
        </div>
        <div className="grid grid-2">
          <div className="card">
            <strong>Score sécurité</strong>
            <div style={{fontSize:42, fontWeight:800, color:'#5eead4'}}>{m.score}</div>
            <small className="muted">Plus c’est haut, mieux c’est.</small>
          </div>
          <div className="card">
            <strong>Tentatives de phishing</strong>
            <div style={{fontSize:32}}>{m.phish}</div>
            <small style={{opacity:.7}}>Bloquées : {m.blocked}</small>
          </div>
          <div className="card">
            <strong>Tendances</strong>
            <svg viewBox="0 0 100 40" style={{width:'100%', height:120}}>
              <polyline fill="none" stroke="#60a5fa" strokeWidth="2" points={m.series.map(p=>`${p.x*8},${40-p.y/2}`).join(' ')} />
            </svg>
          </div>
          <div className="card">
            <strong>Dernières alertes</strong>
            <p style={{opacity:.8}}>Aucune alerte critique aujourd’hui.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

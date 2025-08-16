import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Signup(){
  const { signupPending } = useAuth()
  const [email,setEmail]=useState('')
  const [org,setOrg]=useState('')
  const [loading,setLoading]=useState(false)
  const [qs] = useSearchParams()
  const nav=useNavigate()

  async function onSubmit(e){
    e.preventDefault()
    setLoading(true)
    await new Promise(r=>setTimeout(r, 400))
    signupPending(email, org)
    const plan = qs.get('plan') || 'essentiel'
    nav(`/pricing?plan=${plan}`)
  }

  return (
    <div className="container py-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Inscription</h1>
        <Link to="/" className="btn">Accueil</Link>
      </header>
      <form onSubmit={onSubmit} className="max-w-md space-y-3">
        <label className="label" htmlFor="email">E‑mail</label>
        <input id="email" className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <label className="label" htmlFor="org">Organisation</label>
        <input id="org" className="input" value={org} onChange={e=>setOrg(e.target.value)} required/>
        <div className="flex gap-2 pt-2">
          <button className="btn primary" disabled={loading}>{loading?'Envoi…':'Continuer'}</button>
          <Link className="btn" to="/pricing">Voir les offres</Link>
        </div>
      </form>
      <p className="text-slate-300 mt-3 text-sm">Après paiement (plus tard), vous recevrez automatiquement vos identifiants par e‑mail.</p>
    </div>
  )
}

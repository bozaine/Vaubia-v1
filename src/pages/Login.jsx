import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Login(){
  const { login } = useAuth()
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [loading,setLoading]=useState(false)
  const [err,setErr]=useState('')
  const nav=useNavigate()
  const [qs] = useSearchParams()

  async function onSubmit(e){
    e.preventDefault()
    try{
      setErr(''); setLoading(true)
      await new Promise(r=>setTimeout(r, 400))
      login(email, pass)
      const next = qs.get('next') || '/dashboard'
      nav(next)
    }catch(e){
      setErr(e.message || 'Erreur de connexion')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Connexion</h1>
        <Link to="/" className="btn">Accueil</Link>
      </header>
      <form onSubmit={onSubmit} className="max-w-md space-y-3">
        {err && <div role="alert" className="text-rose-300">{err}</div>}
        <label className="label" htmlFor="email">E‑mail</label>
        <input id="email" className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required aria-required="true"/>
        <label className="label" htmlFor="pass">Mot de passe</label>
        <input id="pass" className="input" type="password" value={pass} onChange={e=>setPass(e.target.value)} required aria-required="true"/>
        <div className="flex gap-2 pt-2">
          <button className="btn primary" disabled={loading} aria-busy={loading}>{loading?'Connexion…':'Se connecter'}</button>
          <Link className="btn" to="/signup">Créer un compte</Link>
        </div>
      </form>
    </div>
  )
}

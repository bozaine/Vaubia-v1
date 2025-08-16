import React, { useEffect, useState } from 'react'
import { getUser } from '../hooks/useAuth.js'
import { getLang, setLang } from '../i18n.js'

export default function Settings(){
  const u = getUser()
  const [dark, setDark] = useState(localStorage.getItem('vaubia_theme') !== 'light')
  const [name, setName] = useState(u?.name || '')
  const [email, setEmail] = useState(u?.email || '')

  useEffect(()=>{
    document.documentElement.style.setProperty('--tw-bg-opacity', '1')
  }, [])

  function applyTheme(on){
    localStorage.setItem('vaubia_theme', on ? 'dark':'light')
    document.documentElement.style.setProperty('color-scheme', on ? 'dark':'light')
    setDark(on)
  }

  function saveProfile(){
    const data = { ...(u||{}), name, email }
    localStorage.setItem('vaubia_auth', JSON.stringify(data))
    alert('Profil enregistré')
  }

  return (
    <div className="grid md:grid-cols-3 gap-5">
      <div className="card">
        <h3 className="text-lg font-semibold">Préférences</h3>
        <div className="flex items-center gap-3 mt-3">
          <label htmlFor="dark" className="label">Mode sombre</label>
          <input id="dark" type="checkbox" checked={dark} onChange={e=>applyTheme(e.target.checked)} aria-label="Basculer sombre/clair"/>
        </div>
        <div className="mt-3">
          <label className="label">Langue</label>
          <select className="input" value={getLang()} onChange={e=>setLang(e.target.value)}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="mt-3">
          <label className="label">Alertes e‑mail</label>
          <label className="flex items-center gap-2 mt-1 text-sm"><input type="checkbox" defaultChecked/> Critiques</label>
          <label className="flex items-center gap-2 mt-1 text-sm"><input type="checkbox" defaultChecked/> Rapport hebdo</label>
          <label className="flex items-center gap-2 mt-1 text-sm"><input type="checkbox" /> SMS (bientôt)</label>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Profil</h3>
        <div className="mt-2">
          <label className="label">Nom</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="mt-2">
          <label className="label">E‑mail</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <button className="btn primary mt-3" onClick={saveProfile}>Enregistrer</button>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Sécurité</h3>
        <p className="text-slate-300 text-sm mt-2">MFA recommandé. Changez régulièrement votre mot de passe.</p>
        <button className="btn mt-3">Activer la 2FA</button>
      </div>
    </div>
  )
}

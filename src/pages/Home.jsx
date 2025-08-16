import React from 'react'
import { Link } from 'react-router-dom'
import { t, getLang, setLang } from '../i18n.js'

export default function Home(){
  return (
    <div>
      <header className="border-b border-white/10">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-white">Vaubia</Link>
          <nav className="hidden md:flex items-center gap-3">
            <Link to="/pricing" className="btn">Tarifs</Link>
            <Link to="/login" className="btn">Connexion</Link>
            <Link to="/signup" className="btn primary">S’inscrire</Link>
            <select aria-label="Langue" value={getLang()} onChange={e=>setLang(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm">
              <option value="fr">FR</option>
              <option value="en">EN</option>
            </select>
          </nav>
        </div>
      </header>

      <section className="container py-12">
        <span className="badge">Protégez l’essentiel</span>
        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-tr from-white to-sky-200">{t('hero_title')}</h1>
        <p className="text-slate-300 mt-3 max-w-3xl">{t('hero_sub')}</p>
        <div className="mt-6 flex gap-3">
          <Link to="/signup" className="btn primary">{t('cta_start')}</Link>
          <Link to="/components" className="btn">{t('cta_demo')}</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="card"><div className="badge">Valeur</div><h3 className="mt-2 text-xl font-semibold">Visibilité claire</h3><p className="text-slate-300 mt-1">Un score de sécurité unifié et des rapports compréhensibles.</p></div>
          <div className="card"><div className="badge">Sécurité</div><h3 className="mt-2 text-xl font-semibold">Attaques bloquées</h3><p className="text-slate-300 mt-1">Phishing & intrusions détectés et neutralisés automatiquement.</p></div>
          <div className="card"><div className="badge">Conformité</div><h3 className="mt-2 text-xl font-semibold">RGPD sans effort</h3><p className="text-slate-300 mt-1">Journal d’audit, registres et modèles prêts.</p></div>
        </div>
      </section>
    </div>
  )
}

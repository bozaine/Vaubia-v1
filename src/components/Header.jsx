import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../mocks/i18n'

export default function Header(){
  const [open, setOpen] = useState(false)
  const { t } = useLocale()

  return (
    <header className="header container">
      <div className="brand">
        <img src="/logo.svg" alt="Vaubia" />
        <span>Vaubia</span>
      </div>

      <div className="nav">
        <div className="search-wrap">
          <button className="search-icon" aria-label="Rechercher">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          <input className="search-input" placeholder="Rechercher… (mock)" aria-label="Recherche"/>
        </div>

        <button className="hamburger" aria-haspopup="true" aria-expanded={open} onClick={()=>setOpen(v=>!v)} aria-label="Ouvrir le menu">
          <span></span>
        </button>
        {open && (
          <nav className="drawer" onMouseLeave={()=>setOpen(false)}>
            <Link to="/">{t('services')}</Link>
            <Link to="/pricing">{t('pricing')}</Link>
            <Link to="/login">{t('login')}</Link>
            <Link to="/signup">{t('signup')}</Link>
            <Link to="/dashboard">{t('dashboard')}</Link>
            <Link to="/settings">{t('settings')}</Link>
            <Link to="/contact">{t('contact')}</Link>
          </nav>
        )}
      </div>
    </header>
  )
}

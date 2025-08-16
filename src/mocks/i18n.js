import { createContext, useContext, useState, useMemo } from 'react'

const dict = {
  fr: {
    hero_title: 'Simulez, détectez et décidez en secondes.',
    hero_sub: 'Surveillez vos comptes, détectez les fuites et recevez des alertes — simplement.',
    start: 'Commencer',
    demo: 'Voir une démo',
    pricing: 'Tarifs',
    services: 'Services',
    login: 'Connexion',
    signup: 'Inscription',
    dashboard: 'Tableau de bord',
    settings: 'Réglages',
    contact: 'Contact',
    cookie_title: 'Cookies & confidentialité',
    cookie_desc: 'Nous utilisons des cookies pour mesurer l’audience et améliorer votre expérience.',
    accept: 'Tout accepter',
    deny: 'Tout refuser',
    prefs: 'Personnaliser'
  },
  en: {
    hero_title: 'Simulate, detect and decide in seconds.',
    hero_sub: 'Monitor accounts, detect leaks and receive alerts — simply.',
    start: 'Get started',
    demo: 'See a demo',
    pricing: 'Pricing',
    services: 'Services',
    login: 'Login',
    signup: 'Sign up',
    dashboard: 'Dashboard',
    settings: 'Settings',
    contact: 'Contact',
    cookie_title: 'Cookies & privacy',
    cookie_desc: 'We use cookies to measure traffic and improve your experience.',
    accept: 'Accept all',
    deny: 'Reject all',
    prefs: 'Preferences'
  }
}

const LocaleContext = createContext({ locale: 'fr', t: k => k, setLocale: () => {} })
export const useLocale = () => useContext(LocaleContext)

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'fr')
  const value = useMemo(() => ({
    locale,
    t: (k) => (dict[locale] && dict[locale][k]) || k,
    setLocale: (l) => { localStorage.setItem('locale', l); setLocale(l) }
  }), [locale])
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

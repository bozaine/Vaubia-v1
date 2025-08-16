export const translations = {
  fr: {
    hero_title: "Simulez, détectez et décidez en quelques secondes.",
    hero_sub: "Surveillez vos comptes, détectez les fuites, recevez des alertes et suivez votre conformité en un seul endroit.",
    cta_start: "Commencer",
    cta_demo: "Voir une démo",
    pricing: "Tarifs",
    services: "Services",
    login: "Connexion",
    signup: "S’inscrire",
  },
  en: {
    hero_title: "Simulate, detect and decide in seconds.",
    hero_sub: "Monitor accounts, detect leaks, receive alerts and track compliance in one place.",
    cta_start: "Get started",
    cta_demo: "See a demo",
    pricing: "Pricing",
    services: "Features",
    login: "Log in",
    signup: "Sign up",
  }
}

export function getLang(){
  return localStorage.getItem('vaubia_lang') || 'fr'
}
export function setLang(l){
  localStorage.setItem('vaubia_lang', l)
  location.reload()
}
export function t(key){
  const lang = getLang()
  return translations[lang]?.[key] ?? key
}

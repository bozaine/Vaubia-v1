import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocale } from '../mocks/i18n'
import { useState } from 'react'

export default function Settings(){
  const { locale, setLocale } = useLocale()
  const [dark, setDark] = useState(true)

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Réglages</h1>
        <div className="grid grid-2">
          <div className="card">
            <h3>Apparence</h3>
            <label style={{display:'flex', alignItems:'center', gap:8}}>
              <input type="checkbox" checked={dark} onChange={()=>setDark(v=>!v)}/> Mode sombre (démo)
            </label>
          </div>
          <div className="card">
            <h3>Langue</h3>
            <select value={locale} onChange={e=>setLocale(e.target.value)}>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import Header from '../components/Header'
import Footer from '../components/Footer'
import { auth } from '../mocks/auth'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup(){
  const [email, setEmail] = useState(''); const [pwd, setPwd] = useState(''); const [ok,setOk]=useState(false); const [err,setErr]=useState('')
  const nav = useNavigate()
  const submit = (e)=>{
    e.preventDefault()
    try{ auth.signup(email,pwd); setOk(true); setTimeout(()=>nav('/login'), 700) } catch(e){ setErr('Ce mail existe déjà (démo).') }
  }
  return (
    <div>
      <Header />
      <main className="container">
        <h1>Inscription</h1>
        <form onSubmit={submit} className="card" style={{display:'grid', gap:12, maxWidth:420}}>
          {ok && <div className="badge">Compte créé ! Vérifiez vos emails (démo).</div>}
          {err && <div className="badge" role="alert">{err}</div>}
          <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
          <label>Mot de passe<input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required/></label>
          <button className="btn primary">Créer le compte</button>
          <small>Déjà un compte ? <Link to="/login">Se connecter</Link></small>
        </form>
      </main>
      <Footer />
    </div>
  )
}

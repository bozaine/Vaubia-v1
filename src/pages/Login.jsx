import Header from '../components/Header'
import Footer from '../components/Footer'
import { auth } from '../mocks/auth'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState(''); const [pwd, setPwd] = useState(''); const [err,setErr]=useState('')
  const nav = useNavigate()
  const submit = (e)=>{
    e.preventDefault()
    try{ auth.login(email, pwd); nav('/dashboard') } catch(e){ setErr('Identifiants invalides (démo).') }
  }
  return (
    <div>
      <Header />
      <main className="container">
        <h1>Connexion</h1>
        <form onSubmit={submit} className="card" style={{display:'grid', gap:12, maxWidth:420}}>
          {err && <div className="badge" role="alert">{err}</div>}
          <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
          <label>Mot de passe<input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} required/></label>
          <button className="btn primary">Se connecter</button>
          <small>Pas de compte ? <Link to="/signup">Créer un compte</Link></small>
        </form>
      </main>
      <Footer />
    </div>
  )
}

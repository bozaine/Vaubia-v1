import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact(){
  return (
    <div>
      <Header />
      <main className="container">
        <h1>Contact</h1>
        <form className="card" style={{display:'grid', gap:12, maxWidth:560}} onSubmit={(e)=>e.preventDefault()}>
          <label>Nom<input required style={{width:'100%'}}/></label>
          <label>Email<input type="email" required style={{width:'100%'}}/></label>
          <label>Message<textarea rows="5" required style={{width:'100%'}}/></label>
          <button className="btn primary">Envoyer</button>
        </form>
      </main>
      <Footer />
    </div>
  )
}

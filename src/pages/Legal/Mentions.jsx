import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Mentions(){
  return (
    <div>
      <Header />
      <main className="container">
        <h1>Mentions légales</h1>
        <p>Éditeur : Vaubia SAS — 10 rue Exemple, 75000 Paris.</p>
        <p>Directeur de publication : Service juridique.</p>
      </main>
      <Footer />
    </div>
  )
}

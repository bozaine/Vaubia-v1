import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Services(){
  return (
    <div>
      <Header />
      <main className="container">
        <h1>Services</h1>
        <div className="grid grid-2">
          <div className="card"><h3>Surveillance comptes</h3><p>Détections d’e-mails compromis & fuites publiques.</p></div>
          <div className="card"><h3>Alertes intelligentes</h3><p>Notifications en cas d’activité suspecte.</p></div>
          <div className="card"><h3>Conformité</h3><p>Registre des traitements, journal d’audit, modèles RGPD.</p></div>
          <div className="card"><h3>Rapports</h3><p>Hebdomadaire par e-mail + export.</p></div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

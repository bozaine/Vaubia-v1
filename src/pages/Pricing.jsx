import Header from '../components/Header'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'

export default function Pricing(){
  const Plan = ({ title, price, note, features }) => (
    <article className="plan" role="group" aria-label={title}>
      <span className="badge">{note}</span>
      <h3>{title}</h3>
      <div className="price">{price}</div>
      <ul>
        {features.map((f,i)=>(<li key={i} style={{marginBottom:8, color:'#9fb0c7'}}>✓ {f}</li>))}
      </ul>
      <div style={{display:'flex', gap:10}}>
        <a className="btn primary" href="/signup">Souscrire</a>
        <a className="btn ghost" href="/contact">Contact</a>
      </div>
    </article>
  )

  const plans = [
    { title:'Mensuel', price:'29 € / mois', note:'Annulable à tout moment', features:['Monitoring multi-comptes','Alertes temps réel','Rapport hebdo'] },
    { title:'Annuel', price:'24 € / mois', note:'-17% • Facturé 288 €', features:['Tout du mensuel','Priorité support','Politique & docs inclus'] },
    { title:'Entreprise', price:'Sur devis', note:'Support dédié', features:['SLA & SSO','Accès API','Intégrations avancées'] },
  ]

  return (
    <div>
      <Header />
      <main className="container">
        <h1>Tarifs</h1>
        <p style={{color:'#9fb0c7'}}>Faites glisser d’un geste pour explorer les offres.</p>
        <Carousel>
          {plans.map((p,i)=>(<Plan key={i} {...p} />))}
        </Carousel>
        <div style={{height:20}}/>
      </main>
      <Footer />
    </div>
  )
}

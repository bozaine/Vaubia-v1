export default function TopicCards(){
  const items = [
    { title: 'Sécurité proactive', text: 'Détection des fuites et posture en temps réel.' },
    { title: 'Alertes & rapports', text: 'Notifications immédiates + rapport hebdo clair.' },
    { title: 'Conformité RGPD', text: 'Journal d’audit, registre des traitements, modèles.' },
  ]
  return (
    <div className="topics" aria-label="Points forts">
      {items.map((it, i)=> (
        <article className="topic" key={i}>
          <h4>{it.title}</h4>
          <p>{it.text}</p>
        </article>
      ))}
    </div>
  )
}

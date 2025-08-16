function seeded(seed){
  let t = Math.sin(seed) * 10000
  return t - Math.floor(t)
}

export function generateSeries(days=30, seed=42){
  const data=[]; let S=seed; let base=40+Math.round(seeded(S++)*60)
  for(let i=days-1;i>=0;i--){
    const attempts = Math.max(0, base + Math.round((seeded(S++)-.5)*12))
    const blocked = Math.max(0, Math.round(attempts*(0.6 + seeded(S++)*0.25)))
    data.push({ date: new Date(Date.now()-i*86400000), attempts, blocked })
  }
  return data
}

export function scoreFrom(series){
  const last = series.at(-1) || { attempts: 0, blocked: 0 }
  const rate = last.attempts ? last.blocked/last.attempts : 1
  return Math.round(55 + rate*45)
}

export function randomAlerts(n=5){
  const types = ['Phishing','Connexion suspecte','Malware']
  const statuses = ['Bloquée','Surveillée','Résolue']
  return Array.from({length:n}).map((_,i)=> ({
    id: i+1,
    time: new Date(Date.now()-i*3600e3).toLocaleTimeString('fr-FR',{hour:'2-digit', minute:'2-digit'}),
    type: types[i%types.length],
    status: statuses[i%statuses.length]
  }))
}

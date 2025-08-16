import React from 'react'
import KPI from '../components/KPI.jsx'
import TinyAreaChart from '../components/TinyAreaChart.jsx'
import { generateSeries } from '../mocks.js'

export default function Components(){
  const series = generateSeries(15, 77)
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-bold">Composants (storybook light)</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <KPI title="Score sécurité" value="86/100" hint="Plus c'est élevé, mieux c'est." trend={3.1}/>
        <KPI title="Tentatives (24h)" value="28" hint="Activités détectées"/>
        <KPI title="Bloquées" value="21" hint="Neutralisées automatiquement"/>
      </div>
      <TinyAreaChart series={series}/>
      <div className="card">
        <h3 className="text-lg font-semibold">Form controls</h3>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <div><label className="label">Email</label><input className="input" placeholder="vous@exemple.com"/></div>
          <div><label className="label">Sélecteur</label><select className="input"><option>A</option><option>B</option></select></div>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="btn">Bouton</button>
          <button className="btn primary">Bouton primaire</button>
        </div>
      </div>
    </div>
  )
}

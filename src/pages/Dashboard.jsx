import React, { useMemo, useState } from 'react'
import KPI from '../components/KPI.jsx'
import TinyAreaChart from '../components/TinyAreaChart.jsx'
import { generateSeries, scoreFrom, randomAlerts } from '../mocks.js'

export default function Dashboard(){
  const [seed,setSeed] = useState(123)
  const series = useMemo(()=> generateSeries(30, seed), [seed])
  const alerts = useMemo(()=> randomAlerts(6), [seed])
  const score = scoreFrom(series)
  const last = series.at(-1)
  const attempts = last?.attempts ?? 0
  const blocked = last?.blocked ?? 0

  return (
    <div className="grid grid-cols-12 gap-5">
      {/* KPIs */}
      <div className="col-span-12 grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-4">
          <KPI title="Score sécurité" value={`${score}/100`} hint="Plus c'est élevé, mieux c'est." trend={4.2} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <KPI title="Tentatives (24h)" value={attempts} hint="Activités détectées"/>
        </div>
        <div className="col-span-12 md:col-span-4">
          <KPI title="Bloquées" value={blocked} hint="Neutralisées automatiquement"/>
        </div>
      </div>

      {/* Chart + actions */}
      <div className="col-span-12">
        <div className="flex items-center justify-between mb-3">
          <div className="text-slate-300 text-sm">Évolution des menaces</div>
          <div className="flex gap-2">
            <button className="btn" onClick={()=>setSeed(s=>s+1)}>Rafraîchir</button>
            <button className="btn">Exporter CSV</button>
          </div>
        </div>
        <TinyAreaChart series={series} />
      </div>

      {/* Alerts + blocks */}
      <div className="col-span-12 grid md:grid-cols-2 gap-5">
        <div className="card">
          <div className="flex items-center justify-between mb-2"><div className="text-slate-300 text-sm">Alertes récentes</div><button className="text-brand-300 text-xs">Tout voir</button></div>
          <table className="w-full border-separate border-spacing-y-2" role="table" aria-label="Alertes récentes">
            <thead className="sr-only"><tr><th>Heure</th><th>Type</th><th>Statut</th></tr></thead>
            <tbody>
              {alerts.map(a=> (
                <tr key={a.id} className="bg-white/5 border border-white/10 rounded-xl">
                  <td className="px-3 py-2">{a.time}</td>
                  <td className="px-3 py-2">{a.type}</td>
                  <td className="px-3 py-2">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!alerts.length && <div className="text-slate-400 text-sm">Aucune alerte aujourd’hui.</div>}
        </div>

        <div className="card">
          <div className="text-slate-300 text-sm mb-2">Conseils</div>
          <ul className="list-disc pl-5 text-slate-300 space-y-1">
            <li>Activez le 2FA pour les comptes administrateurs.</li>
            <li>Planifiez un test de phishing interne.</li>
            <li>Révoquez les accès inactifs trimestriellement.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

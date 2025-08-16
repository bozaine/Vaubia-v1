import React from 'react'
import { ShieldCheck, AlertOctagon, MailWarning } from 'lucide-react'

const items = [
  { id: 1, icon: AlertOctagon, title: 'Tentative d'intrusion bloquée', meta: 'il y a 2 min', tone: 'rose' },
  { id: 2, icon: MailWarning, title: 'Phishing détecté sur Gmail', meta: 'il y a 17 min', tone: 'amber' },
  { id: 3, icon: ShieldCheck, title: 'MFA activée sur 2 comptes', meta: 'hier', tone: 'emerald' },
]

export default function RecentActivity(){
  return (
    <div className="card h-[280px]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-slate-300 text-sm">Activité récente</div>
        <button className="text-brand-300 text-xs hover:underline">Tout voir</button>
      </div>
      <div className="space-y-3">
        {items.map(it => (
          <div key={it.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/10 hover:bg-white/5 transition">
            <div className={`h-9 w-9 rounded-lg grid place-items-center bg-${it.tone}-500/15 text-${it.tone}-300`}>
              <it.icon size={18} />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm">{it.title}</div>
              <div className="text-slate-400 text-xs">{it.meta}</div>
            </div>
            <button className="text-slate-300 text-xs hover:text-white">Détails</button>
          </div>
        ))}
      </div>
    </div>
  )
}

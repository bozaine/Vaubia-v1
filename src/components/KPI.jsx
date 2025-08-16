import React from 'react'
import { ShieldCheck, MailWarning, ShieldAlert } from 'lucide-react'

const ICONS = {
  score: ShieldCheck,
  phishing: MailWarning,
  blocked: ShieldAlert
}

export default function KPI({type='score', title, value, trend}){
  const Icon = ICONS[type] || ShieldCheck
  const up = (trend ?? 0) >= 0
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="kpi-title">{title}</div>
        <div className="h-8 w-8 rounded-lg bg-white/5 grid place-items-center text-brand-300">
          <Icon size={18}/>
        </div>
      </div>
      <div className="mt-2 kpi-value">{value}</div>
      {trend !== undefined && (
        <div className={`badge mt-3 ${up ? 'up' : 'down'}`}>
          <span>{up ? '▲' : '▼'}</span>
          <span>{Math.abs(trend)}%</span>
          <span className="text-slate-300/70"> vs. sem. der.</span>
        </div>
      )}
    </div>
  )
}

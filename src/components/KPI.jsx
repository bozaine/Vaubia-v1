import React from 'react'
export default function KPI({title, value, hint, trend}){
  const up = (trend ?? 0) >= 0
  return (
    <div className="card" role="group" aria-label={title}>
      <div className="text-slate-300 text-sm">{title}</div>
      <div className="text-white text-2xl font-semibold mt-1">{value}</div>
      <div className="text-slate-400 text-xs mt-1">{hint}</div>
      {trend !== undefined && (
        <div className={`badge mt-2 ${up ? 'bg-emerald-500/15 text-emerald-300':'bg-rose-500/15 text-rose-300'}`}>
          <span>{up ? '▲' : '▼'}</span>
          <span>{Math.abs(trend)}%</span>
          <span className="text-slate-300/70"> vs. sem. der.</span>
        </div>
      )}
    </div>
  )
}

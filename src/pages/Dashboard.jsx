import React, { useMemo } from 'react'
import KPI from '../components/KPI.jsx'
import DonutChart from '../components/DonutChart.jsx'
import AreaChart from '../components/AreaChart.jsx'
import BarChart from '../components/BarChart.jsx'
import RecentActivity from '../components/RecentActivity.jsx'

export default function Dashboard(){
  const labels = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']
  const series = useMemo(()=>[
    { label:'Détections', data:[12,18,10,22,16,19,14], color:'rgba(31,164,143,1)' },
    { label:'Alertes', data:[6,8,5,12,7,9,5], color:'rgba(59,130,246,1)' }
  ],[])

  return (
    <div className="grid grid-cols-12 gap-5">
      {/* KPIs */}
      <div className="col-span-12 grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-4">
          <KPI type="score" title="Score sécurité" value="86/100" trend={4.2} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <KPI type="phishing" title="Tentatives de phishing" value="24 cette semaine" trend={-7.1} />
        </div>
        <div className="col-span-12 md:col-span-4">
          <KPI type="blocked" title="Attaques bloquées" value="152 ce mois" trend={6.5} />
        </div>
      </div>

      {/* Charts */}
      <div className="col-span-12 md:col-span-4">
        <DonutChart score={86} />
      </div>
      <div className="col-span-12 md:col-span-8">
        <AreaChart labels={labels} series={series} />
      </div>

      <div className="col-span-12 md:col-span-7">
        <BarChart labels={labels} dataValues={[4,9,6,11,7,12,8]} />
      </div>
      <div className="col-span-12 md:col-span-5">
        <RecentActivity />
      </div>
    </div>
  )
}

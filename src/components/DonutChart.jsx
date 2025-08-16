import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

export default function DonutChart({score=86}){
  const risk = 100 - score
  const data = {
    labels: ['Sécurité', 'Risque'],
    datasets: [{
      data: [score, risk],
      backgroundColor: ['rgba(31,164,143,1)', 'rgba(203,213,225,0.2)'],
      borderWidth: 0,
      cutout: '70%',
    }]
  }
  const options = {
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false
  }
  return (
    <div className="card h-[220px] flex items-center justify-center relative">
      <div className="absolute text-center">
        <div className="text-3xl font-semibold text-white">{score}%</div>
        <div className="text-slate-400 text-xs mt-1">Niveau de sécurité</div>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  )
}

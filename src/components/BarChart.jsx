import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function BarChart({labels, dataValues}){
  const data = {
    labels,
    datasets: [{
      label: 'Menaces bloquées',
      data: dataValues,
      backgroundColor: 'rgba(59,130,246,0.6)',
      borderRadius: 8,
    }]
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9ca3af' } }
    },
    plugins: {
      legend: { labels: { color: '#cbd5e1' } }
    }
  }
  return <div className="card h-[280px]"><Bar data={data} options={options} /></div>
}

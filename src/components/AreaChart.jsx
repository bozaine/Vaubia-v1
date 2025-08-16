import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export default function AreaChart({labels, series}){
  const data = useMemo(()=>{
    return {
      labels,
      datasets: series.map(s => ({
        label: s.label,
        data: s.data,
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 2,
        borderColor: s.color,
        backgroundColor: (ctx)=>{
          const { chart } = ctx
          const { ctx: c, chartArea } = chart
          if(!chartArea) return s.color
          const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, s.color.replace('1)', '0.35)'))
          gradient.addColorStop(1, s.color.replace('1)', '0.02)'))
          return gradient
        }
      }))
    }
  }, [labels, series])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9ca3af' }},
      y: { grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9ca3af' }}
    },
    plugins: {
      legend: { labels: { color: '#cbd5e1' } },
      tooltip: { intersect: false, mode: 'index' }
    }
  }

  return <div className="card h-[280px]"><Line data={data} options={options} /></div>
}

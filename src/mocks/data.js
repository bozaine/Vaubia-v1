export const genMetrics = () => {
  const phish = Math.floor(Math.random()*30)+5
  const blocked = Math.floor(phish*0.7)
  const score = Math.floor(80 + Math.random()*20)
  const series = Array.from({length:12}, (_,i)=>({ x: i+1, y: Math.max(0, Math.round(20+Math.sin(i/2)*10 + Math.random()*6)) }))
  return { phish, blocked, score, series }
}

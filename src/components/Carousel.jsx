import { useEffect, useRef, useState } from 'react'

export default function Carousel({ children }){
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const count = Array.isArray(children) ? children.length : 1

  // touch swipe
  useEffect(()=>{
    const el = trackRef.current
    if(!el) return
    let startX = 0, current = 0, dragging = false

    const onDown = (e) => {
      dragging = true
      startX = (e.touches ? e.touches[0].clientX : e.clientX)
    }
    const onMove = (e) => {
      if(!dragging) return
      const x = (e.touches ? e.touches[0].clientX : e.clientX)
      current = x - startX
      el.style.transition = 'none'
      el.style.transform = `translateX(${current - index*100}%)`
    }
    const onUp = () => {
      if(!dragging) return
      dragging = false
      el.style.transition = ''
      if (current < -30) setIndex((i)=> (i+1)%count)
      else if (current > 30) setIndex((i)=> (i-1+count)%count)
      else el.style.transform = `translateX(${-index*100}%)`
      current = 0
    }
    el.addEventListener('mousedown', onDown); el.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp)
    el.addEventListener('touchstart', onDown, {passive:true}); el.addEventListener('touchmove', onMove, {passive:true}); el.addEventListener('touchend', onUp)
    return ()=>{
      el.removeEventListener('mousedown', onDown); el.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp)
      el.removeEventListener('touchstart', onDown); el.removeEventListener('touchmove', onMove); el.removeEventListener('touchend', onUp)
    }
  }, [index, count])

  useEffect(()=>{
    const el = trackRef.current
    if (el) el.style.transform = `translateX(${-index*100}%)`
  }, [index])

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef}>
        {Array.isArray(children) ? children.map((c,i)=>(<div style={{minWidth:'100%'}} key={i}>{c}</div>)) : <div style={{minWidth:'100%'}}>{children}</div>}
      </div>
    </div>
  )
}

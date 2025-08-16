import { useEffect, useState } from 'react'
import { useLocale } from '../mocks/i18n'

export default function CookieBanner(){
  const [open, setOpen] = useState(false)
  const { t } = useLocale()

  useEffect(()=>{
    const seen = localStorage.getItem('cookie_choice')
    if(!seen) setOpen(true)
  },[])

  if(!open) return null
  return (
    <div className="cookie" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-desc">
      <strong id="cookie-title">{t('cookie_title')}</strong>
      <p id="cookie-desc">{t('cookie_desc')}</p>
      <div className="cookie-actions">
        <button className="btn primary" onClick={()=>{localStorage.setItem('cookie_choice','all'); setOpen(false)}}>{t('accept')}</button>
        <button className="btn ghost" onClick={()=>{localStorage.setItem('cookie_choice','none'); setOpen(false)}}>{t('deny')}</button>
        <button className="btn" onClick={()=>{localStorage.setItem('cookie_choice','prefs'); setOpen(false)}}>{t('prefs')}</button>
      </div>
    </div>
  )
}

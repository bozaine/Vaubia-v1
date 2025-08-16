import { useEffect, useState, useCallback } from 'react'

const KEY = 'vaubia_auth'

export function getUser(){
  try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null }
}

export function useAuth(){
  const [user, setUser] = useState(getUser())

  const login = useCallback((email, password)=>{
    if(!email || !password) throw new Error('Identifiants requis')
    const u = { id: cryptoRandom(), email, name: email.split('@')[0], plan: localStorage.getItem('vaubia_plan') || 'trial' }
    localStorage.setItem(KEY, JSON.stringify(u))
    setUser(u)
    return u
  }, [])

  const signupPending = useCallback((email, org)=>{
    localStorage.setItem('vaubia_pending', JSON.stringify({ email, org, ts: Date.now() }))
  }, [])

  const completePlan = useCallback((plan)=>{
    localStorage.setItem('vaubia_plan', plan)
    const pending = JSON.parse(localStorage.getItem('vaubia_pending')||'null')
    if(pending){
      login(pending.email, 'set-by-provider')
      localStorage.removeItem('vaubia_pending')
    }
  }, [login])

  const logout = useCallback(()=>{
    localStorage.removeItem(KEY)
    setUser(null)
  }, [])

  return { user, login, logout, signupPending, completePlan }
}

function cryptoRandom(){
  const arr = new Uint8Array(8); (window.crypto||window.msCrypto).getRandomValues(arr)
  return btoa(String.fromCharCode(...arr)).replace(/[^a-z0-9]/gi,'').slice(0,12)
}

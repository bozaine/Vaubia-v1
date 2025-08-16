import React, { useState } from 'react'
import { Search, Bell } from 'lucide-react'

export default function Topbar(){
  const [focused, setFocused] = useState(false)

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className={`flex items-center gap-2 glass px-3 py-2 transition-all ${focused ? 'ring-1 ring-brand-500/50' : ''}`}>
        <Search size={18} className="text-slate-300" />
        <input onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder="Rechercher…" className="bg-transparent outline-none text-sm placeholder:text-slate-400 w-56"/>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={18} className="text-slate-300" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-400"></span>
        </button>
        <img src="https://i.pravatar.cc/28?img=12" className="h-8 w-8 rounded-full border border-white/20" alt="avatar"/>
      </div>
    </header>
  )
}

import React from 'react'
import { Shield, LayoutGrid, LineChart, Bell, Cog, User, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import clsx from 'clsx'

const Item = ({to, icon:Icon, label}) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link to={to} className={clsx(
      'flex items-center gap-3 px-3 py-2 rounded-xl transition',
      active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
    )} aria-current={active ? 'page': undefined}>
      <Icon size={18} /><span className="text-sm">{label}</span>
    </Link>
  )
}

export default function Sidebar(){
  return (
    <aside className="h-full border-r border-white/10 bg-black/20 w-64">
      <div className="p-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-brand-500 to-sky-500 grid place-items-center">
          <Shield className="text-white" size={20}/>
        </div>
        <div className="font-semibold text-white">Vaubia</div>
      </div>
      <nav className="px-3 space-y-1">
        <Item to="/dashboard" icon={LayoutGrid} label="Dashboard"/>
        <Item to="/analytics" icon={LineChart} label="Analytique"/>
        <Item to="/alerts" icon={Bell} label="Alertes"/>
      </nav>
      <div className="px-3 mt-auto absolute bottom-4 w-64">
        <div className="border-t border-white/10 pt-4 space-y-2">
          <Item to="/settings" icon={Cog} label="Réglages"/>
          <Item to="/profile" icon={User} label="Profil"/>
          <Link to="/logout" className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white"><LogOut size={18}/>Déconnexion</Link>
        </div>
      </div>
    </aside>
  )
}

import React from 'react'
import { Shield, LayoutGrid, LineChart, Bell, Cog, User, LogOut } from 'lucide-react'

const NavItem = ({icon:Icon, label, active=false}) => (
  <div className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition
    ${active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>
    <Icon size={18} />
    <span className="text-sm">{label}</span>
  </div>
)

export default function Sidebar(){
  return (
    <aside className="h-full border-r border-white/10 bg-black/20">
      <div className="p-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-brand-500 to-sky-500 grid place-items-center">
          <Shield className="text-white" size={20}/>
        </div>
        <div className="font-semibold text-white">Vaubia</div>
      </div>
      <nav className="px-3 space-y-1">
        <NavItem icon={LayoutGrid} label="Dashboard" active />
        <NavItem icon={LineChart} label="Analytique" />
        <NavItem icon={Bell} label="Alertes" />
      </nav>
      <div className="px-3 mt-auto absolute bottom-4 w-[244px]">
        <div className="border-t border-white/10 pt-4 space-y-2">
          <NavItem icon={User} label="Profil" />
          <NavItem icon={Cog} label="Réglages" />
          <NavItem icon={LogOut} label="Déconnexion" />
        </div>
      </div>
    </aside>
  )
}

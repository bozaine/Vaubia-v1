import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'
import { Outlet } from 'react-router-dom'

export default function ProtectedLayout(){
  return (
    <div className="h-full grid grid-cols-[256px_1fr]">
      <Sidebar />
      <div className="flex flex-col overflow-hidden">
        <Topbar />
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

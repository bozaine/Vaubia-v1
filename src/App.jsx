import React from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import Dashboard from './pages/Dashboard.jsx'

export default function App(){
  return (
    <div className="h-full grid grid-cols-[260px_1fr]">
      <Sidebar />
      <div className="flex flex-col overflow-hidden">
        <Topbar />
        <main className="p-6 overflow-auto">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

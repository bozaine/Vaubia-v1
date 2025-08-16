import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Mentions from './pages/Legal/Mentions'
import Confidentialite from './pages/Legal/Confidentialite'
import CookiesPage from './pages/Legal/Cookies'
import { LocaleProvider } from './mocks/i18n'
import { auth } from './mocks/auth'

function Protected({ children }){
  const loc = useLocation()
  if(!auth.isAuthed()) return <Navigate to="/login" state={{ from: loc }} replace />
  return children
}

export default function App(){
  return (
    <LocaleProvider>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
        <Route path="/settings" element={<Protected><Settings/></Protected>} />
        <Route path="/mentions-legales" element={<Mentions/>} />
        <Route path="/politique-confidentialite" element={<Confidentialite/>} />
        <Route path="/cookies" element={<CookiesPage/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </LocaleProvider>
  )
}

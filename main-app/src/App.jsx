import React,{ useState } from "react"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import { getRole } from "./auth"

const MusicLibrary = React.lazy(() => import("musicLibrary/MusicLibrary"))

export default function App() {
  const [role, setRole] = useState(getRole())

  if (!role) return <Login onLogin={() => setRole(getRole())} />

  return (
    <div>
      <Navbar onLogout={() => setRole(null)} />
      <React.Suspense fallback={<div>Loading Music Library...</div>}>
        <MusicLibrary role={role} />
      </React.Suspense>
    </div>
  )
}

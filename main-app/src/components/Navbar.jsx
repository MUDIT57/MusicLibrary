import { getRole, logout } from "../auth"

export default function Navbar({ onLogout }) {
  return (
    <div className="flex justify-between p-4 bg-gray-200">
      <h1 className="font-bold">🎵 Music App</h1>
      <div>
        <span className="mr-4">Role: {getRole()}</span>
        <button className="px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => { logout(); onLogout() }}>Logout</button>
      </div>
    </div>
  )
}

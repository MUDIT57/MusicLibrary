import { getRole, logout } from "../auth";
import "/src/styles/navbar.css";

export default function Navbar({ onLogout }) {
  return (
    <div className="roleDiv">
      <span className="roleType">Role: {getRole()}</span>

      <button
        className="button"
        onClick={() => {
          logout();
          onLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
}

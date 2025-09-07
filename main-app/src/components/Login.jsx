import '/src/styles/login.css';
import { User, Shield, Lock } from "lucide-react";
import { login } from "../auth";

export default function Login({ onLogin }) {
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <div className="logo">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="title">Welcome Back</h1>
          <p className="subtitle">Choose your access level</p>
        </div>

        <div>
          <button
            className="button userButton"
            onClick={() => {
              login("user");
              onLogin();
            }}
          >
            <User size={20} />
            <span>Login as User</span>
          </button>

          <button
            className="button adminButton"
            onClick={() => {
              login("admin");
              onLogin();
            }}
          >
            <Shield size={20} />
            <span>Login as Admin</span>
          </button>
        </div>

        <div className="demoBox">
          <div className="demoHeader">
            <User size={16} />
            <p>Demo Access</p>
          </div>
          <div className="demoText">
            <p>
              <span className="user">User:</span> Standard dashboard access
            </p>
            <p>
              <span className="admin">Admin:</span> Full system privileges
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

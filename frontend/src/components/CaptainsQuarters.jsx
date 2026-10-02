import { useState } from "react";
import AdminLogin from "./AdminLogin.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

export default function CaptainsQuarters({ about, projects, socials, onRefresh, onClose }) {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("captain_token"));

  function handleLogout() {
    localStorage.removeItem("captain_token");
    setLoggedIn(false);
  }

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <button className="admin-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {loggedIn ? (
          <AdminDashboard
            about={about}
            projects={projects}
            socials={socials}
            onRefresh={onRefresh}
            onLogout={handleLogout}
          />
        ) : (
          <AdminLogin onLoggedIn={() => setLoggedIn(true)} />
        )}
      </div>
    </div>
  );
}

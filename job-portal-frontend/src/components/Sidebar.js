// Sidebar.js

import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuStyle = {
    padding: "12px",
    cursor: "pointer",
    borderBottom: "1px solid rgba(255,255,255,0.2)"
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#34495e",
        color: "white",
        minHeight: "100vh",
        padding: "20px"
      }}
    >
      <h3>Smart Job Portal</h3>

      <div style={menuStyle} onClick={() => navigate("/")}>
        Dashboard
      </div>

      <div style={menuStyle} onClick={() => navigate("/search-jobs")}>
        Search Jobs
      </div>

      <div style={menuStyle} onClick={() => navigate("/internships")}>
        Internships
      </div>

      <div style={menuStyle} onClick={() => navigate("/my-applications")}>
        My Applications
      </div>

      <div style={menuStyle} onClick={() => navigate("/profile")}>
        Profile
      </div>

      <div style={menuStyle} onClick={() => navigate("/notifications")}>
        Notifications
      </div>
    </div>
  );
}

export default Sidebar;
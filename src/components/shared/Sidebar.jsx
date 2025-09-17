import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ user }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: user.role === "student" ? "/student" : "/coordinator",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-dashboard" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"></path>
          <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"></path>
          <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1"></path>
          <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1"></path>
        </svg>
      )
    },
    ...(user.role === "student" ? [
      {
        name: "Upload Certificate",
        path: "/student/upload",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
            <path d="M7 9l5 -5l5 5"></path>
            <path d="M12 4l0 12"></path>
          </svg>
        )
      }
    ] : [])
  ];

  return (
    <aside className="sidebar" style={{
      width: "250px",
      backgroundColor: "white",
      borderRight: "1px solid #e5e7eb",
      padding: "24px 0",
      display: "flex",
      flexDirection: "column"
    }}>
      <div className="sidebar-header" style={{ padding: "0 20px 20px", borderBottom: "1px solid #e5e7eb", marginBottom: "16px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#374151" }}>Main Navigation</h3>
      </div>
      
      <nav className="sidebar-nav">
        <ul style={{ listStyle: "none" }}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(item.path)}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: isActive(item.path) ? "#eff6ff" : "transparent",
                  color: isActive(item.path) ? "#2563eb" : "#64748b",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: isActive(item.path) ? "500" : "400",
                  transition: "all 0.2s"
                }}
                onMouseOver={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.backgroundColor = "#f8fafc";
                    e.target.style.color = "#374151";
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive(item.path)) {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#64748b";
                  }
                }}
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
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
      path: `/${user.role}`,
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
        name: "Submit Activity",
        path: "/student/upload",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
            <path d="M7 9l5 -5l5 5"></path>
            <path d="M12 4l0 12"></path>
          </svg>
        )
      },
      {
        name: "My Submissions",
        path: "/student/submissions",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list-check" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3.5 5.5l1.5 1.5l2.5 -2.5"></path>
            <path d="M3.5 11.5l1.5 1.5l2.5 -2.5"></path>
            <path d="M3.5 17.5l1.5 1.5l2.5 -2.5"></path>
            <path d="M11 6l9 0"></path>
            <path d="M11 12l9 0"></path>
            <path d="M11 18l9 0"></path>
          </svg>
        )
      },
      {
        name: "Transcript",
        path: "/student/transcript",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-certificate" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
            <path d="M5 8v-3a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-5.5"></path>
            <path d="M11 21l-3 -3l3 -3l3 3z"></path>
          </svg>
        )
      }
    ] : []),
    ...(user.role === "coordinator" ? [
      {
        name: "Verify Submissions",
        path: "/coordinator/verify",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shield-check" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 12l2 2l4 -4"></path>
            <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
          </svg>
        )
      },
      {
        name: "Student Compliance",
        path: "/coordinator/compliance",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
          </svg>
        )
      },
      {
        name: "Reports",
        path: "/coordinator/reports",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-bar" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
          </svg>
        )
      }
    ] : []),
    ...(user.role === "hod" ? [
      {
        name: "Department Overview",
        path: "/hod/overview",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 21l18 0"></path>
            <path d="M5 21v-14l8 -4v18"></path>
            <path d="M19 21v-10l-6 -4"></path>
            <path d="M9 9l0 .01"></path>
            <path d="M9 12l0 .01"></path>
            <path d="M9 15l0 .01"></path>
            <path d="M9 18l0 .01"></path>
          </svg>
        )
      },
      {
        name: "Student Monitoring",
        path: "/hod/monitoring",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M21 12c-2.4 3.6 -6 6 -9 6c-3 0 -6.6 -2.4 -9 -6c2.4 -3.6 6 -6 9 -6c3 0 6.6 2.4 9 6"></path>
          </svg>
        )
      },
      {
        name: "Department Reports",
        path: "/hod/reports",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-report" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697"></path>
            <path d="M18 14v4h4"></path>
            <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2"></path>
            <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
            <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path d="M8 11h4"></path>
            <path d="M8 15h3"></path>
          </svg>
        )
      }
    ] : []),
    ...(user.role === "admin" ? [
      {
        name: "User Management",
        path: "/admin/users",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users-group" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
            <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
            <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
          </svg>
        )
      },
      {
        name: "Program Rules",
        path: "/admin/rules",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
          </svg>
        )
      },
      {
        name: "Activity Management",
        path: "/admin/activities",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-activity" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 12h4l3 8l4 -16l3 8h4"></path>
          </svg>
        )
      },
      {
        name: "University Reports",
        path: "/admin/reports",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-pie" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-6.8a2 2 0 0 1 -2 -2v-7a.9 .9 0 0 0 -1 -.8"></path>
            <path d="M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a1 1 0 0 1 -1 -1v-4.5"></path>
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
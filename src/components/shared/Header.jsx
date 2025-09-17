import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
    navigate("/login");
  };

  return (
    <header className="header" style={{
      height: "64px",
      backgroundColor: "white",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
    }}>
      <div className="header-left">
        <h2 style={{ 
          fontSize: "20px", 
          fontWeight: "600", 
          color: "#2563eb",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-certificate" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path>
            <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-5"></path>
            <path d="M6 9h12"></path>
            <path d="M6 12h3"></path>
            <path d="M6 15h2"></path>
          </svg>
          CertManage
        </h2>
      </div>
      
      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px",
          padding: "8px 12px",
          backgroundColor: "#f8fafc",
          borderRadius: "6px"
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "500",
            fontSize: "14px"
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "500" }}>{user?.name}</div>
            <div style={{ fontSize: "12px", color: "#64748b" }} className="capitalize">{user?.role}</div>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="btn-secondary"
          style={{ padding: "8px 12px", fontSize: "14px" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
            <path d="M9 12h12l-3 -3"></path>
            <path d="M18 15l3 -3"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
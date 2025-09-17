import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && user.role !== role) {
    const roleRoutes = {
      student: "/student",
      coordinator: "/coordinator", 
      hod: "/hod",
      admin: "/admin"
    };
    return <Navigate to={roleRoutes[user.role] || "/login"} replace />;
  }
  
  return children;
}
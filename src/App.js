import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import StudentDashboard from "./components/student/StudentDashboard";
import CoordinatorDashboard from "./components/coordinator/CoordinatorDashboard";
import HoDDashboard from "./components/hod/HoDDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import PrivateRoute from "./components/shared/PrivateRoute";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/student/*"
            element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/coordinator/*"
            element={
              <PrivateRoute role="coordinator">
                <CoordinatorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/hod/*"
            element={
              <PrivateRoute role="hod">
                <HoDDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
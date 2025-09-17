import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "admin") {
      navigate("/login");
      return;
    }
    setUser(userData);
    
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    setCertificates(storedCertificates);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  // Calculate university-wide statistics
  const universityStats = {
    totalStudents: 2500, // Mock data
    totalPrograms: 8,
    totalDepartments: 4,
    totalSubmissions: certificates.length,
    approvedSubmissions: certificates.filter(c => c.verified).length,
    pendingSubmissions: certificates.filter(c => !c.verified && !c.rejectionReason).length,
    complianceRate: certificates.length > 0 ? Math.round((certificates.filter(c => c.verified).length / certificates.length) * 100) : 0
  };

  return (
    <div className="page-container">
      <Sidebar user={user} />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header user={user} onLogout={handleLogout} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <AdminOverview stats={universityStats} />
            } />
            <Route path="/users" element={
              <UserManagement />
            } />
            <Route path="/rules" element={
              <ProgramRulesManagement />
            } />
            <Route path="/activities" element={
              <ActivityManagement />
            } />
            <Route path="/reports" element={
              <UniversityReports certificates={certificates} />
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Admin Overview Component
function AdminOverview({ stats }) {
  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">University Overview</h1>
        <p className="page-subtitle">Sanjivani University - MAP Management System Dashboard</p>
      </div>

      {/* University Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.totalStudents}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#f3e8ff", color: "#7c3aed" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.totalDepartments}</h3>
            <p>Departments</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#ecfdf5", color: "#065f46" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.totalPrograms}</h3>
            <p>Programs</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.totalSubmissions}</h3>
            <p>Total Submissions</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">System Management</h2>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
          <button className="btn-primary" style={{ padding: "20px", textAlign: "left" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
              Manage Users
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              Add, edit, or remove system users
            </div>
          </button>
          
          <button className="btn-secondary" style={{ padding: "20px", textAlign: "left" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
              Configure Rules
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              Set MAP requirements by program
            </div>
          </button>
          
          <button className="btn-secondary" style={{ padding: "20px", textAlign: "left" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
              Manage Activities
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              Configure activity types and points
            </div>
          </button>
          
          <button className="btn-secondary" style={{ padding: "20px", textAlign: "left" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
              Generate Reports
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              University-wide analytics
            </div>
          </button>
        </div>
      </div>

      {/* System Health */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">System Health</h2>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <div style={{ textAlign: "center", padding: "16px" }}>
            <div style={{ fontSize: "24px", color: "#10b981", marginBottom: "8px" }}>✓</div>
            <div style={{ fontSize: "14px", fontWeight: "500" }}>Database</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Connected</div>
          </div>
          
          <div style={{ textAlign: "center", padding: "16px" }}>
            <div style={{ fontSize: "24px", color: "#10b981", marginBottom: "8px" }}>✓</div>
            <div style={{ fontSize: "14px", fontWeight: "500" }}>File Storage</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Available</div>
          </div>
          
          <div style={{ textAlign: "center", padding: "16px" }}>
            <div style={{ fontSize: "24px", color: "#10b981", marginBottom: "8px" }}>✓</div>
            <div style={{ fontSize: "14px", fontWeight: "500" }}>Backup</div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>Up to date</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// User Management Component
function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "student", email: "john@example.com", status: "active" },
    { id: 2, name: "Dr. Smith", role: "coordinator", email: "smith@example.com", status: "active" },
    { id: 3, name: "Dr. Johnson", role: "hod", email: "johnson@example.com", status: "active" }
  ]);

  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">User Management</h1>
        <button className="btn-primary">Add New User</button>
      </div>

      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td><span className="badge badge-info capitalize">{user.role}</span></td>
                  <td>{user.email}</td>
                  <td><span className="badge badge-success">{user.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="btn-secondary" style={{ padding: "4px 8px", fontSize: "12px" }}>
                        Edit
                      </button>
                      <button className="btn-danger" style={{ padding: "4px 8px", fontSize: "12px" }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Program Rules Management Component
function ProgramRulesManagement() {
  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">Program Rules Management</h1>
        <button className="btn-primary">Add New Rule</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">MAP Requirements by Program</h2>
        </div>
        
        <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
          <p>Program-specific MAP requirements configuration would be displayed here.</p>
          <p>This would allow setting different point requirements for different programs and admission years.</p>
        </div>
      </div>
    </div>
  );
}

// Activity Management Component
function ActivityManagement() {
  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">Activity Management</h1>
        <button className="btn-primary">Add New Activity</button>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Activity Types and Point Values</h2>
        </div>
        
        <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
          <p>Activity management interface would be displayed here.</p>
          <p>This would allow configuring activity categories, subcategories, and point values by level.</p>
        </div>
      </div>
    </div>
  );
}

// University Reports Component
function UniversityReports({ certificates }) {
  const handleExportPDF = () => {
    alert("PDF export functionality would be implemented here");
  };

  const handleExportExcel = () => {
    alert("Excel export functionality would be implemented here");
  };

  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">University Reports</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={handleExportPDF} className="btn-primary">
            Export PDF
          </button>
          <button onClick={handleExportExcel} className="btn-secondary">
            Export Excel
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">University-wide MAP Analytics</h2>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
          <p>Comprehensive university reports and analytics would be displayed here.</p>
          <p>This would include department-wise comparisons, program-wise statistics, and trend analysis.</p>
        </div>
      </div>
    </div>
  );
}
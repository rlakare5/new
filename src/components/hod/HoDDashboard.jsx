import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";

export default function HoDDashboard() {
  const [user, setUser] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "hod") {
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

  // Calculate department statistics
  const departmentStats = {
    totalStudents: 120, // Mock data
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
              <HoDOverview stats={departmentStats} user={user} />
            } />
            <Route path="/overview" element={
              <HoDOverview stats={departmentStats} user={user} />
            } />
            <Route path="/monitoring" element={
              <StudentMonitoring certificates={certificates} />
            } />
            <Route path="/reports" element={
              <DepartmentReports certificates={certificates} user={user} />
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// HoD Overview Component
function HoDOverview({ stats, user }) {
  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">Department Overview</h1>
        <p className="page-subtitle">{user.department} Department - MAP Monitoring Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
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
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.totalSubmissions}</h3>
            <p>Total Submissions</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#d1fae5", color: "#065f46" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.approvedSubmissions}</h3>
            <p>Approved</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.pendingSubmissions}</h3>
            <p>Pending Review</p>
          </div>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Department Compliance Overview</h2>
        </div>
        
        <div style={{ padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", fontWeight: "700", color: "#2563eb", marginBottom: "8px" }}>
            {stats.complianceRate}%
          </div>
          <p style={{ fontSize: "16px", color: "#6b7280", marginBottom: "20px" }}>
            Overall Compliance Rate
          </p>
          
          <div style={{
            height: "12px",
            backgroundColor: "#e5e7eb",
            borderRadius: "6px",
            overflow: "hidden",
            maxWidth: "400px",
            margin: "0 auto"
          }}>
            <div style={{
              height: "100%",
              width: `${stats.complianceRate}%`,
              backgroundColor: stats.complianceRate >= 80 ? "#10b981" : stats.complianceRate >= 60 ? "#f59e0b" : "#ef4444",
              borderRadius: "6px",
              transition: "width 0.3s ease"
            }}></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <button className="btn-primary" style={{ padding: "16px", textAlign: "left" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
              View Class Reports
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              Detailed class-wise analysis
            </div>
          </button>
          
          <button className="btn-secondary" style={{ padding: "16px", textAlign: "left" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
              Monitor Students
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              Individual student progress
            </div>
          </button>
          
          <button className="btn-secondary" style={{ padding: "16px", textAlign: "left" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>
              Export Reports
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              Download department data
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// Student Monitoring Component
function StudentMonitoring({ certificates }) {
  const [selectedClass, setSelectedClass] = useState("all");
  
  // Mock student data grouped by class
  const classes = ["CSE-A", "CSE-B", "IT-A", "IT-B"];
  
  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">Student Monitoring</h1>
        <p className="page-subtitle">Monitor individual student MAP progress</p>
      </div>

      {/* Class Filter */}
      <div className="card">
        <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
          <label style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", display: "block" }}>
            Filter by Class:
          </label>
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px" }}
          >
            <option value="all">All Classes</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>PRN</th>
                <th>Class</th>
                <th>Total Points</th>
                <th>Submissions</th>
                <th>Compliance Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Mock data - in real app, this would be filtered student data */}
              <tr>
                <td>John Doe</td>
                <td>student123</td>
                <td>CSE-A</td>
                <td><span className="badge badge-primary">85</span></td>
                <td>12</td>
                <td><span className="badge badge-warning">In Progress</span></td>
                <td>
                  <button className="btn-secondary" style={{ padding: "4px 8px", fontSize: "12px" }}>
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>student124</td>
                <td>CSE-A</td>
                <td><span className="badge badge-primary">105</span></td>
                <td>15</td>
                <td><span className="badge badge-success">Completed</span></td>
                <td>
                  <button className="btn-secondary" style={{ padding: "4px 8px", fontSize: "12px" }}>
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Department Reports Component
function DepartmentReports({ certificates, user }) {
  const handleExportPDF = () => {
    alert("PDF export functionality would be implemented here");
  };

  const handleExportExcel = () => {
    alert("Excel export functionality would be implemented here");
  };

  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">Department Reports</h1>
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
          <h2 className="card-title">{user.department} Department Summary Report</h2>
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "4px" }}>
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Report content would go here */}
        <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
          <p>Detailed department reports and analytics would be displayed here.</p>
          <p>This would include class-wise breakdowns, compliance statistics, and trend analysis.</p>
        </div>
      </div>
    </div>
  );
}
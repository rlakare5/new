import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";
import ProgressBar from "./ProgressBar";
import CertificateUploadForm from "./CertificateUploadForm";
import CertificateList from "./CertificateList";

export default function StudentDashboard() {
  const [certificates, setCertificates] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "student") {
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

  const handleUpload = (cert) => {
    const updated = [...certificates, { ...cert, id: Date.now() }];
    setCertificates(updated);
    localStorage.setItem("certificates", JSON.stringify(updated));
  };

  if (!user) return null;

  const studentCertificates = certificates.filter((c) => c.student === user.prn);
  const totalPoints = studentCertificates
    .filter((c) => c.verified)
    .reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="page-container">
      <Sidebar user={user} />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header user={user} onLogout={handleLogout} />
        
        <main className="main-content">
          <div className="content-header">
            <h1 className="page-title">Student Dashboard - MAP System</h1>
            <div style={{ fontSize: "14px", color: "#64748b" }}>
              <p>{user.name} | {user.program} | {user.year} | Class: {user.class}</p>
            </div>
          </div>
          
          <Routes>
            <Route path="/" element={
              <>
                <ProgressBar points={totalPoints} />
                <MAPBreakdown certificates={studentCertificates} />
                <CertificateList certificates={studentCertificates} />
              </>
            } />
            <Route path="/upload" element={
              <CertificateUploadForm onUpload={handleUpload} />
            } />
            <Route path="/submissions" element={
              <MySubmissions certificates={studentCertificates} />
            } />
            <Route path="/transcript" element={
              <TranscriptView certificates={studentCertificates} user={user} />
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}
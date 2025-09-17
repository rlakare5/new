import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [prn, setPrn] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    if (!prn || !password) {
      setError("Please enter both PRN and password");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (prn === "student123" && password === "student") {
        const user = { role: "student", name: "John Doe", prn: "student123", program: "B.Tech CSE", year: "TY", class: "CSE-A" };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/student");
      } else if (prn === "coord123" && password === "coord") {
        const user = { role: "coordinator", name: "Dr. Smith", id: "coord123", department: "Computer Science", assignedClasses: ["CSE-A", "CSE-B"] };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/coordinator");
      } else if (prn === "hod123" && password === "hod") {
        const user = { role: "hod", name: "Dr. Johnson", id: "hod123", department: "Computer Science" };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/hod");
      } else if (prn === "admin123" && password === "admin") {
        const user = { role: "admin", name: "Admin User", id: "admin123" };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/admin");
      } else {
        setError("Invalid credentials");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
            <img 
              src="/sanjivani_university_logo-removebg-preview.png" 
              alt="Sanjivani University" 
              style={{ height: "60px", marginRight: "12px" }}
            />
          </div>
          <h1>MAP Management System</h1>
          <p>Mandatory Activity Points - Sanjivani University</p>
        </div>
        
        <form onSubmit={handleLogin}>
          {error && (
            <div style={{
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "16px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-alert-circle" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label className="form-label" htmlFor="prn">PRN Number</label>
            <input
              id="prn"
              type="text"
              placeholder="Enter your PRN"
              value={prn}
              onChange={(e) => setPrn(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", marginTop: "8px" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg className="animate-spin" style={{ height: "20px", width: "20px", marginRight: "8px" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : "Sign In"}
          </button>
        </form>
        
        <div style={{ marginTop: "24px", padding: "16px", backgroundColor: "#f0f9ff", borderRadius: "6px" }}>
          <h4 style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "#0369a1" }}>Demo Credentials</h4>
          <div style={{ fontSize: "13px", color: "#64748b" }}>
            <p><strong>Student:</strong> PRN: <strong>student123</strong>, Password: <strong>student</strong></p>
            <p><strong>Coordinator:</strong> ID: <strong>coord123</strong>, Password: <strong>coord</strong></p>
            <p><strong>HoD:</strong> ID: <strong>hod123</strong>, Password: <strong>hod</strong></p>
            <p><strong>Admin:</strong> ID: <strong>admin123</strong>, Password: <strong>admin</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
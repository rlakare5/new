import React from "react";

export default function ProgressBar({ points }) {
  const percentage = Math.min((points / 100) * 100, 100);
  
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Progress Tracking</h2>
      </div>
      
      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>Points Collected</span>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#2563eb" }}>{points}/100</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div style={{ 
          width: "60px", 
          height: "60px", 
          borderRadius: "50%", 
          backgroundColor: "#eff6ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "20px",
          flexShrink: 0
        }}>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#2563eb" }}>
            {percentage}%
          </span>
        </div>
      </div>
      
      <p style={{ fontSize: "14px", color: "#64748b" }}>
        {points >= 100 
          ? "Congratulations! You've reached the target of 100 points."
          : `${100 - points} more points needed to reach the target of 100 points.`
        }
      </p>
    </div>
  );
}
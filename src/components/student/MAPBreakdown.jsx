import React from "react";

export default function MAPBreakdown({ certificates }) {
  // Calculate points by category
  const categoryPoints = certificates.reduce((acc, cert) => {
    if (cert.verified) {
      const category = cert.mainCategory;
      acc[category] = (acc[category] || 0) + cert.points;
    }
    return acc;
  }, {});

  // MAP Requirements (based on typical university requirements)
  const mapRequirements = {
    "Technical Skills": { required: 40, color: "#3b82f6" },
    "Sports & Cultural": { required: 20, color: "#10b981" },
    "Community Outreach": { required: 15, color: "#f59e0b" },
    "Innovation / Entrepreneurship": { required: 15, color: "#8b5cf6" },
    "Leadership / Management": { required: 10, color: "#ef4444" }
  };

  const totalRequired = Object.values(mapRequirements).reduce((sum, req) => sum + req.required, 0);
  const totalEarned = Object.values(categoryPoints).reduce((sum, points) => sum + points, 0);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">MAP Points Breakdown</h2>
        <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
          Progress towards {totalRequired} required MAP points
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {Object.entries(mapRequirements).map(([category, req]) => {
          const earned = categoryPoints[category] || 0;
          const percentage = Math.min((earned / req.required) * 100, 100);
          
          return (
            <div key={category} style={{
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              backgroundColor: percentage >= 100 ? `${req.color}08` : "#fff"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", margin: 0 }}>
                  {category}
                </h4>
                <span style={{ 
                  fontSize: "12px", 
                  fontWeight: "600",
                  color: percentage >= 100 ? req.color : "#6b7280"
                }}>
                  {earned}/{req.required}
                </span>
              </div>
              
              <div style={{
                height: "8px",
                backgroundColor: "#e5e7eb",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "8px"
              }}>
                <div style={{
                  height: "100%",
                  width: `${percentage}%`,
                  backgroundColor: req.color,
                  borderRadius: "4px",
                  transition: "width 0.3s ease"
                }}></div>
              </div>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>
                  {percentage.toFixed(0)}% Complete
                </span>
                {percentage >= 100 && (
                  <span style={{ fontSize: "12px", color: req.color, fontWeight: "600" }}>
                    ✓ Target Met
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <div style={{
        padding: "20px",
        backgroundColor: "#f8fafc",
        borderRadius: "8px",
        textAlign: "center"
      }}>
        <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937", margin: "0 0 8px 0" }}>
          Overall MAP Progress
        </h3>
        <div style={{ fontSize: "32px", fontWeight: "700", color: totalEarned >= totalRequired ? "#10b981" : "#3b82f6", marginBottom: "8px" }}>
          {totalEarned} / {totalRequired}
        </div>
        <div style={{
          height: "12px",
          backgroundColor: "#e5e7eb",
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "12px",
          maxWidth: "300px",
          margin: "0 auto 12px auto"
        }}>
          <div style={{
            height: "100%",
            width: `${Math.min((totalEarned / totalRequired) * 100, 100)}%`,
            backgroundColor: totalEarned >= totalRequired ? "#10b981" : "#3b82f6",
            borderRadius: "6px",
            transition: "width 0.3s ease"
          }}></div>
        </div>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
          {totalEarned >= totalRequired 
            ? "🎉 Congratulations! You've met the MAP requirements!" 
            : `${totalRequired - totalEarned} more points needed to complete MAP requirements`
          }
        </p>
      </div>
    </div>
  );
}
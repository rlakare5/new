import React from "react";

export default function TranscriptView({ certificates, user }) {
  const approvedCertificates = certificates.filter(cert => cert.verified);
  const totalPoints = approvedCertificates.reduce((sum, cert) => sum + cert.points, 0);

  // Group by category
  const categoryGroups = approvedCertificates.reduce((acc, cert) => {
    const category = cert.mainCategory;
    if (!acc[category]) acc[category] = [];
    acc[category].push(cert);
    return acc;
  }, {});

  const handleDownloadPDF = () => {
    // In a real application, this would generate and download a PDF
    alert("PDF download functionality would be implemented here using libraries like jsPDF or react-pdf");
  };

  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">MAP Transcript</h1>
        <button onClick={handleDownloadPDF} className="btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "8px" }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download PDF
        </button>
      </div>

      <div className="card">
        {/* Header */}
        <div style={{ 
          textAlign: "center", 
          padding: "24px", 
          borderBottom: "2px solid #e5e7eb",
          backgroundColor: "#f8fafc"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
            <img 
              src="/sanjivani_university_logo-removebg-preview.png" 
              alt="Sanjivani University" 
              style={{ height: "60px", marginRight: "16px" }}
            />
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                Sanjivani University
              </h2>
              <p style={{ fontSize: "16px", color: "#6b7280", margin: "4px 0 0 0" }}>
                Mandatory Activity Points (MAP) Transcript
              </p>
            </div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "20px" }}>
            <div>
              <strong>Student Name:</strong> {user.name}
            </div>
            <div>
              <strong>PRN:</strong> {user.prn}
            </div>
            <div>
              <strong>Program:</strong> {user.program}
            </div>
            <div>
              <strong>Year:</strong> {user.year}
            </div>
            <div>
              <strong>Class:</strong> {user.class}
            </div>
            <div>
              <strong>Generated:</strong> {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ padding: "24px", borderBottom: "1px solid #e5e7eb" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Summary</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}>
            <div style={{ textAlign: "center", padding: "16px", backgroundColor: "#f0f9ff", borderRadius: "8px" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#2563eb" }}>{totalPoints}</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Total MAP Points</div>
            </div>
            <div style={{ textAlign: "center", padding: "16px", backgroundColor: "#f0fdf4", borderRadius: "8px" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: "#16a34a" }}>{approvedCertificates.length}</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Approved Activities</div>
            </div>
            <div style={{ textAlign: "center", padding: "16px", backgroundColor: totalPoints >= 100 ? "#f0fdf4" : "#fef3c7", borderRadius: "8px" }}>
              <div style={{ fontSize: "24px", fontWeight: "700", color: totalPoints >= 100 ? "#16a34a" : "#d97706" }}>
                {totalPoints >= 100 ? "✓" : "⚠"}
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                {totalPoints >= 100 ? "Requirements Met" : "In Progress"}
              </div>
            </div>
          </div>
        </div>

        {/* Category-wise Breakdown */}
        <div style={{ padding: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Category-wise Activities</h3>
          
          {Object.keys(categoryGroups).length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
              <p>No approved activities to display in transcript.</p>
            </div>
          ) : (
            Object.entries(categoryGroups).map(([category, certs]) => (
              <div key={category} style={{ marginBottom: "32px" }}>
                <h4 style={{ 
                  fontSize: "16px", 
                  fontWeight: "600", 
                  color: "#374151",
                  marginBottom: "12px",
                  padding: "8px 12px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "6px"
                }}>
                  {category} ({certs.reduce((sum, cert) => sum + cert.points, 0)} points)
                </h4>
                
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f9fafb" }}>
                        <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid #e5e7eb" }}>Activity</th>
                        <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid #e5e7eb" }}>Level</th>
                        <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid #e5e7eb" }}>Points</th>
                        <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid #e5e7eb" }}>Date</th>
                        <th style={{ padding: "8px 12px", textAlign: "left", border: "1px solid #e5e7eb" }}>Verified By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certs.map((cert) => (
                        <tr key={cert.id}>
                          <td style={{ padding: "8px 12px", border: "1px solid #e5e7eb" }}>{cert.subCategory}</td>
                          <td style={{ padding: "8px 12px", border: "1px solid #e5e7eb" }}>{cert.level || "N/A"}</td>
                          <td style={{ padding: "8px 12px", border: "1px solid #e5e7eb", fontWeight: "600" }}>{cert.points}</td>
                          <td style={{ padding: "8px 12px", border: "1px solid #e5e7eb" }}>
                            {cert.submittedAt ? new Date(cert.submittedAt).toLocaleDateString() : "N/A"}
                          </td>
                          <td style={{ padding: "8px 12px", border: "1px solid #e5e7eb" }}>{cert.verifiedBy || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ 
          padding: "24px", 
          borderTop: "2px solid #e5e7eb",
          backgroundColor: "#f8fafc",
          textAlign: "center",
          fontSize: "12px",
          color: "#6b7280"
        }}>
          <p>This is an official transcript generated by the Sanjivani University MAP Management System.</p>
          <p>Generated on {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
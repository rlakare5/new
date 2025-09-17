import React from "react";

export default function CertificateList({ certificates }) {
  if (certificates.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Your Certificates</h2>
        </div>
        <div style={{ 
          textAlign: "center", 
          padding: "40px 20px",
          color: "#64748b"
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-certificate" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px", opacity: 0.5 }}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path>
            <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-5"></path>
            <path d="M6 9h12"></path>
            <path d="M6 12h3"></path>
            <path d="M6 15h2"></path>
          </svg>
          <p>No certificates uploaded yet</p>
          <p style={{ fontSize: "14px", marginTop: "8px" }}>Upload your first certificate to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Your Certificates</h2>
        <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px" }}>
          {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} uploaded
        </p>
      </div>
      
      <div style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Organization</th>
              <th>Location</th>
              <th>Certificate</th>
              <th>Points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id}>
                <td>
                  <span className="badge badge-info capitalize">{cert.category}</span>
                </td>
                <td>
                  <a 
                    href={cert.orgLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb", textDecoration: "underline" }}
                  >
                    View
                  </a>
                </td>
                <td>{cert.geoTag || "N/A"}</td>
                <td>
                  <a 
                    href={cert.file} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb", textDecoration: "underline" }}
                  >
                    View Certificate
                  </a>
                </td>
                <td>{cert.points}</td>
                <td>
                  {cert.verified ? (
                    <span className="badge badge-success">Verified</span>
                  ) : (
                    <span className="badge badge-warning">Pending Verification</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
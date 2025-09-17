import React, { useState } from "react";

export default function MySubmissions({ certificates }) {
  const [filter, setFilter] = useState("all");

  const filteredCertificates = certificates.filter(cert => {
    if (filter === "all") return true;
    if (filter === "pending") return !cert.verified && !cert.rejectionReason;
    if (filter === "approved") return cert.verified;
    if (filter === "rejected") return cert.rejectionReason;
    return true;
  });

  const getStatusBadge = (cert) => {
    if (cert.verified) {
      return <span className="badge badge-success">Approved</span>;
    } else if (cert.rejectionReason) {
      return <span className="badge badge-danger">Rejected</span>;
    } else {
      return <span className="badge badge-warning">Pending</span>;
    }
  };

  const stats = {
    total: certificates.length,
    pending: certificates.filter(c => !c.verified && !c.rejectionReason).length,
    approved: certificates.filter(c => c.verified).length,
    rejected: certificates.filter(c => c.rejectionReason).length
  };

  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">My Submissions</h1>
        <p className="page-subtitle">Track the status of your MAP activity submissions</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.total}</h3>
            <p>Total Submissions</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.pending}</h3>
            <p>Pending Review</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#d1fae5", color: "#065f46" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.approved}</h3>
            <p>Approved</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon" style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-card-content">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="card">
        <div style={{ borderBottom: "1px solid #e5e7eb", padding: "16px 24px 0" }}>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { key: "all", label: "All Submissions", count: stats.total },
              { key: "pending", label: "Pending", count: stats.pending },
              { key: "approved", label: "Approved", count: stats.approved },
              { key: "rejected", label: "Rejected", count: stats.rejected }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                style={{
                  padding: "8px 0",
                  border: "none",
                  background: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: filter === tab.key ? "#2563eb" : "#6b7280",
                  borderBottom: filter === tab.key ? "2px solid #2563eb" : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {filteredCertificates.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: "16px", opacity: 0.5 }}>
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3>No submissions found</h3>
            <p>No activities match the selected filter.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Category</th>
                  <th>Level</th>
                  <th>Points</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((cert) => (
                  <tr key={cert.id}>
                    <td>
                      <div>
                        <strong>{cert.subCategory}</strong>
                        {cert.rejectionReason && (
                          <div style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>
                            <strong>Reason:</strong> {cert.rejectionReason}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-info">{cert.mainCategory}</span>
                    </td>
                    <td>{cert.level || "N/A"}</td>
                    <td>
                      <span className="badge badge-primary">{cert.points}</span>
                    </td>
                    <td>{getStatusBadge(cert)}</td>
                    <td>
                      {cert.submittedAt ? new Date(cert.submittedAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td>
                      <a 
                        href={cert.file} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ padding: "4px 8px", fontSize: "12px" }}
                      >
                        View Certificate
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
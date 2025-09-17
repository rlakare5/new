// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../shared/Header";
// import Sidebar from "../shared/Sidebar";

// export default function CoordinatorDashboard() {
//   const [certificates, setCertificates] = useState([]);
//   const [user, setUser] = useState(null);
//   const [selectedYear, setSelectedYear] = useState("all");
//   const [selectedCertificate, setSelectedCertificate] = useState(null);
//   const [rejectionReason, setRejectionReason] = useState("");
//   const [showRejectionModal, setShowRejectionModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || user.role !== "coordinator") {
//       navigate("/login");
//       return;
//     }
//     setUser(user);
    
//     const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
//     setCertificates(storedCertificates);
//   }, [navigate]);

//   // Extract student year from PRN - Fixed calculation
//   const getStudentYear = (prn) => {
//     if (!prn) return "Unknown";
    
//     // Extract the first two digits which represent the year of admission
//     const admissionYear = parseInt(prn.toString().substring(0, 2));
    
//     // Get current year (last two digits)
//     const currentYear = new Date().getFullYear() % 100;
    
//     // Calculate how many years have passed since admission
//     let yearDiff = currentYear - admissionYear;
    
//     // Adjust for academic year (typically starts in July/August)
//     const currentMonth = new Date().getMonth();
//     // If it's before July, consider the academic year hasn't fully advanced yet
//     if (currentMonth < 6) yearDiff--;
    
//     if (yearDiff < 0) return "Unknown";
//     if (yearDiff === 0) return "FY";
//     if (yearDiff === 1) return "SY";
//     if (yearDiff === 2) return "TY";
//     if (yearDiff >= 3) return "Final Year";
    
//     return "Unknown";
//   };

//   // Add year information to certificates
//   const certificatesWithYear = certificates.map(cert => ({
//     ...cert,
//     year: getStudentYear(cert.student)
//   }));

//   // Group certificates by year
//   const certificatesByYear = {
//     FY: certificatesWithYear.filter(cert => cert.year === "FY"),
//     SY: certificatesWithYear.filter(cert => cert.year === "SY"),
//     TY: certificatesWithYear.filter(cert => cert.year === "TY"),
//     "Final Year": certificatesWithYear.filter(cert => cert.year === "Final Year"),
//     Unknown: certificatesWithYear.filter(cert => cert.year === "Unknown")
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const handleVerify = (id) => {
//     const updated = certificates.map(cert => 
//       cert.id === id ? { 
//         ...cert, 
//         verified: true,
//         verifiedBy: user.name,
//         verifiedAt: new Date().toISOString(),
//         rejectionReason: null
//       } : cert
//     );
//     setCertificates(updated);
//     localStorage.setItem("certificates", JSON.stringify(updated));
//   };

//   const openRejectionModal = (cert) => {
//     setSelectedCertificate(cert);
//     setRejectionReason("");
//     setShowRejectionModal(true);
//   };

  
//   const handleReject = () => {
//     if (!rejectionReason.trim()) {
//       alert("Please provide a reason for rejection");
//       return;
//     }

//     const updated = certificates.map(cert => 
//       cert.id === selectedCertificate.id ? { 
//         ...cert, 
//         verified: false,
//         verifiedBy: user.name,
//         verifiedAt: new Date().toISOString(),
//         rejectionReason: rejectionReason.trim()
//       } : cert
//     );
    
//     setCertificates(updated);
//     localStorage.setItem("certificates", JSON.stringify(updated));
//     setShowRejectionModal(false);
//     setSelectedCertificate(null);
//     setRejectionReason("");
//   };

//   const getStats = () => {
//     const total = certificates.length;
//     const verified = certificates.filter(c => c.verified).length;
//     const pending = certificates.filter(c => !c.verified).length;
//     const rejected = certificates.filter(c => c.rejectionReason).length;
    
//     // Year-wise stats
//     const yearStats = {
//       FY: certificatesWithYear.filter(c => c.year === "FY").length,
//       SY: certificatesWithYear.filter(c => c.year === "SY").length,
//       TY: certificatesWithYear.filter(c => c.year === "TY").length,
//       FinalYear: certificatesWithYear.filter(c => c.year === "Final Year").length
//     };
    
//     return { total, verified, pending, rejected, yearStats };
//   };

//   const stats = getStats();

//   if (!user) return null;

//   // Year cards data
//   const yearCards = [
//     {
//       id: "FY",
//       title: "First Year",
//       count: certificatesByYear.FY.length,
//       verified: certificatesByYear.FY.filter(c => c.verified).length,
//       color: "#3b82f6",
//       icon: "🎓"
//     },
//     {
//       id: "SY",
//       title: "Second Year",
//       count: certificatesByYear.SY.length,
//       verified: certificatesByYear.SY.filter(c => c.verified).length,
//       color: "#8b5cf6",
//       icon: "📚"
//     },
//     {
//       id: "TY",
//       title: "Third Year",
//       count: certificatesByYear.TY.length,
//       verified: certificatesByYear.TY.filter(c => c.verified).length,
//       color: "#ec4899",
//       icon: "🔬"
//     },
//     {
//       id: "Final Year",
//       title: "Final Year",
//       count: certificatesByYear["Final Year"].length,
//       verified: certificatesByYear["Final Year"].filter(c => c.verified).length,
//       color: "#f97316",
//       icon: "🎯"
//     }
//   ];

//   return (
//     <div className="page-container">
//       <Sidebar user={user} />
      
//       <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
//         <Header user={user} onLogout={handleLogout} />
        
//         <main className="main-content">
//           <div className="content-header">
//             <h1 className="page-title">Coordinator Dashboard</h1>
//             <p className="page-subtitle">Manage certificates by academic year</p>
//           </div>

//           {/* Year Selection Cards */}
//           <div style={{ 
//             display: "grid", 
//             gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
//             gap: "20px", 
//             marginBottom: "30px" 
//           }}>
//             {yearCards.map(year => (
//               <div 
//                 key={year.id}
//                 className="year-card"
//                 style={{ 
//                   backgroundColor: selectedYear === year.id ? `${year.color}15` : "white",
//                   border: `2px solid ${selectedYear === year.id ? year.color : "#e5e7eb"}`,
//                   borderRadius: "12px",
//                   padding: "20px",
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                   boxShadow: selectedYear === year.id ? `0 4px 12px ${year.color}40` : "0 2px 8px rgba(0,0,0,0.08)"
//                 }}
//                 onClick={() => setSelectedYear(selectedYear === year.id ? "all" : year.id)}
//               >
//                 <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                   <div>
//                     <h3 style={{ 
//                       margin: "0 0 8px 0", 
//                       fontSize: "18px", 
//                       fontWeight: "600",
//                       color: "#1f2937"
//                     }}>
//                       {year.title}
//                     </h3>
//                     <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//                       <span style={{ 
//                         fontSize: "32px", 
//                         fontWeight: "700", 
//                         color: year.color 
//                       }}>
//                         {year.count}
//                       </span>
//                       <span style={{ 
//                         padding: "4px 8px", 
//                         backgroundColor: `${year.color}20`, 
//                         color: year.color,
//                         borderRadius: "20px",
//                         fontSize: "12px",
//                         fontWeight: "600"
//                       }}>
//                         {year.verified} verified
//                       </span>
//                     </div>
//                   </div>
//                   <span style={{ fontSize: "36px" }}>{year.icon}</span>
//                 </div>
//                 <div style={{ 
//                   height: "6px", 
//                   backgroundColor: "#e5e7eb", 
//                   borderRadius: "3px", 
//                   marginTop: "12px",
//                   overflow: "hidden"
//                 }}>
//                   <div style={{ 
//                     height: "100%", 
//                     width: `${year.count > 0 ? (year.verified / year.count) * 100 : 0}%`, 
//                     backgroundColor: year.color,
//                     borderRadius: "3px"
//                   }}></div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Certificate Sections by Year */}
//           {selectedYear === "all" ? (
//             // Show all years in separate sections
//             <>
//               {yearCards.map(year => (
//                 certificatesByYear[year.id].length > 0 && (
//                   <YearSection 
//                     key={year.id}
//                     year={year}
//                     certificates={certificatesByYear[year.id]}
//                     onVerify={handleVerify}
//                     onReject={openRejectionModal}
//                   />
//                 )
//               ))}
//             </>
//           ) : (
//             // Show selected year only
//             certificatesByYear[selectedYear].length > 0 ? (
//               <YearSection 
//                 year={yearCards.find(y => y.id === selectedYear)}
//                 certificates={certificatesByYear[selectedYear]}
//                 onVerify={handleVerify}
//                 onReject={openRejectionModal}
//               />
//             ) : (
//               <div className="card">
//                 <div style={{ 
//                   textAlign: "center", 
//                   padding: "40px 20px",
//                   color: "#64748b"
//                 }}>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-certificate-off" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px", opacity: 0.5 }}>
//                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//                     <path d="M12.876 12.881a3 3 0 0 0 4.243 4.243m.588 -3.42a3.012 3.012 0 0 0 -1.437 -1.423"></path>
//                     <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path>
//                     <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2m4 0h10a2 2 0 0 1 2 2v10"></path>
//                     <path d="M6 9h3m4 0h5"></path>
//                     <path d="M6 12h3"></path>
//                     <path d="M6 15h2"></path>
//                     <path d="M3 3l18 18"></path>
//                   </svg>
//                   <h3>No certificates found for {yearCards.find(y => y.id === selectedYear)?.title}</h3>
//                   <p>Students haven't submitted any certificates yet.</p>
//                 </div>
//               </div>
//             )
//           )}
//         </main>
//       </div>

//       {/* Rejection Modal */}
//       {showRejectionModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <div className="modal-header">
//               <h3>Reject Certificate</h3>
//               <button onClick={() => setShowRejectionModal(false)} className="modal-close">
//                 &times;
//               </button>
//             </div>
//             <div className="modal-body">
//               <p>Please provide a reason for rejecting this certificate:</p>
//               <textarea
//                 value={rejectionReason}
//                 onChange={(e) => setRejectionReason(e.target.value)}
//                 placeholder="Enter reason for rejection..."
//                 rows="4"
//                 style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px", marginTop: "8px" }}
//               />
//             </div>
//             <div className="modal-footer">
//               <button onClick={() => setShowRejectionModal(false)} className="btn-secondary">
//                 Cancel
//               </button>
//               <button onClick={handleReject} className="btn-danger">
//                 Confirm Rejection
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Year Section Component
// function YearSection({ year, certificates, onVerify, onReject }) {
//   const [expanded, setExpanded] = useState(true);

//   return (
//     <div className="card" style={{ marginBottom: "24px" }}>
//       <div 
//         className="card-header" 
//         style={{ 
//           cursor: "pointer",
//           backgroundColor: `${year.color}08`,
//           borderBottom: expanded ? `2px solid ${year.color}30` : "none"
//         }}
//         onClick={() => setExpanded(!expanded)}
//       >
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             <span style={{ fontSize: "24px" }}>{year.icon}</span>
//             <h2 className="card-title" style={{ color: year.color, margin: 0 }}>
//               {year.title} Students
//             </h2>
//             <span style={{ 
//               padding: "4px 10px", 
//               backgroundColor: `${year.color}20`, 
//               color: year.color,
//               borderRadius: "20px",
//               fontSize: "14px",
//               fontWeight: "600"
//             }}>
//               {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
//             </span>
//           </div>
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             width="24" 
//             height="24" 
//             viewBox="0 0 24 24" 
//             fill="none" 
//             stroke="currentColor" 
//             strokeWidth="2" 
//             strokeLinecap="round" 
//             strokeLinejoin="round"
//             style={{
//               transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
//               transition: "transform 0.3s ease"
//             }}
//           >
//             <polyline points="6 9 12 15 18 9"></polyline>
//           </svg>
//         </div>
//       </div>
      
//       {expanded && (
//         <div style={{ overflowX: "auto" }}>
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>Student ID</th>
//                 <th>Category</th>
//                 <th>Subcategory</th>
//                 <th>Organization</th>
//                 <th>Points</th>
//                 <th>Status</th>
//                 <th>Submitted</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {certificates.map((cert) => (
//                 <tr key={cert.id}>
//                   <td>
//                     <strong>{cert.student}</strong>
//                     {cert.rejectionReason && (
//                       <div style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>
//                         Rejected: {cert.rejectionReason}
//                       </div>
//                     )}
//                   </td>
//                   <td>
//                     <span className="badge badge-info capitalize">{cert.mainCategory}</span>
//                   </td>
//                   <td>{cert.subCategory}</td>
//                   <td>
//                     <a 
//                       href={cert.orgLink} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="link"
//                       onClick={(e) => {
//                         try {
//                           new URL(cert.orgLink);
//                         } catch {
//                           e.preventDefault();
//                           alert("Invalid organization URL");
//                         }
//                       }}
//                     >
//                       Visit Website
//                     </a>
//                   </td>
//                   <td>
//                     <span className="badge badge-primary">{cert.points}</span>
//                   </td>
//                   <td>
//                     {cert.verified ? (
//                       <span className="badge badge-success">
//                         Verified
//                         {cert.verifiedBy && (
//                           <div style={{ fontSize: "11px" }}>by {cert.verifiedBy}</div>
//                         )}
//                       </span>
//                     ) : cert.rejectionReason ? (
//                       <span className="badge badge-danger">Rejected</span>
//                     ) : (
//                       <span className="badge badge-warning">Pending</span>
//                     )}
//                   </td>
//                   <td>
//                     {cert.submittedAt ? new Date(cert.submittedAt).toLocaleDateString() : "N/A"}
//                   </td>
//                   <td>
//                     <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
//                       <a 
//                         href={cert.file} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="btn-secondary"
//                         style={{ padding: "6px 12px", fontSize: "13px", textAlign: "center" }}
//                       >
//                         View Certificate
//                       </a>
                      
//                       {!cert.verified && !cert.rejectionReason && (
//                         <div style={{ display: "flex", gap: "8px" }}>
//                           <button 
//                             className="btn-success"
//                             style={{ padding: "6px 12px", fontSize: "13px", flex: 1 }}
//                             onClick={() => onVerify(cert.id)}
//                           >
//                             Approve
//                           </button>
//                           <button 
//                             className="btn-danger"
//                             style={{ padding: "6px 12px", fontSize: "13px", flex: 1 }}
//                             onClick={() => onReject(cert)}
//                           >
//                             Reject
//                           </button>
//                         </div>
//                       )}
                      
//                       {cert.rejectionReason && (
//                         <button 
//                           className="btn-success"
//                           style={{ padding: "6px 12px", fontSize: "13px" }}
//                           onClick={() => onVerify(cert.id)}
//                         >
//                           Approve
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../shared/Header";
import Sidebar from "../shared/Sidebar";

export default function CoordinatorDashboard() {
  const [certificates, setCertificates] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "coordinator") {
      navigate("/login");
      return;
    }
    setUser(user);
    
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    setCertificates(storedCertificates);
  }, [navigate]);

  // Add year information to certificates - use the stored yearOfStudy field
  const certificatesWithYear = certificates.map(cert => ({
    ...cert,
    year: cert.yearOfStudy || "Unknown"
  }));

  // Group certificates by year
  const certificatesByYear = {
    FY: certificatesWithYear.filter(cert => cert.year === "FY"),
    SY: certificatesWithYear.filter(cert => cert.year === "SY"),
    TY: certificatesWithYear.filter(cert => cert.year === "TY"),
    "Final Year": certificatesWithYear.filter(cert => cert.year === "Final Year"),
    Unknown: certificatesWithYear.filter(cert => !cert.year || cert.year === "Unknown")
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleVerify = (id) => {
    const updated = certificates.map(cert => 
      cert.id === id ? { 
        ...cert, 
        verified: true,
        verifiedBy: user.name,
        verifiedAt: new Date().toISOString(),
        rejectionReason: null
      } : cert
    );
    setCertificates(updated);
    localStorage.setItem("certificates", JSON.stringify(updated));
  };

  const openRejectionModal = (cert) => {
    setSelectedCertificate(cert);
    setRejectionReason("");
    setShowRejectionModal(true);
  };

  
  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    const updated = certificates.map(cert => 
      cert.id === selectedCertificate.id ? { 
        ...cert, 
        verified: false,
        verifiedBy: user.name,
        verifiedAt: new Date().toISOString(),
        rejectionReason: rejectionReason.trim()
      } : cert
    );
    
    setCertificates(updated);
    localStorage.setItem("certificates", JSON.stringify(updated));
    setShowRejectionModal(false);
    setSelectedCertificate(null);
    setRejectionReason("");
  };

  const getStats = () => {
    const total = certificates.length;
    const verified = certificates.filter(c => c.verified).length;
    const pending = certificates.filter(c => !c.verified).length;
    const rejected = certificates.filter(c => c.rejectionReason).length;
    
    // Year-wise stats
    const yearStats = {
      FY: certificatesWithYear.filter(c => c.year === "FY").length,
      SY: certificatesWithYear.filter(c => c.year === "SY").length,
      TY: certificatesWithYear.filter(c => c.year === "TY").length,
      FinalYear: certificatesWithYear.filter(c => c.year === "Final Year").length
    };
    
    return { total, verified, pending, rejected, yearStats };
  };

  const stats = getStats();

  if (!user) return null;

  // Year cards data
  const yearCards = [
    {
      id: "FY",
      title: "First Year",
      count: certificatesByYear.FY.length,
      verified: certificatesByYear.FY.filter(c => c.verified).length,
      color: "#3b82f6",
      icon: "🎓"
    },
    {
      id: "SY",
      title: "Second Year",
      count: certificatesByYear.SY.length,
      verified: certificatesByYear.SY.filter(c => c.verified).length,
      color: "#8b5cf6",
      icon: "📚"
    },
    {
      id: "TY",
      title: "Third Year",
      count: certificatesByYear.TY.length,
      verified: certificatesByYear.TY.filter(c => c.verified).length,
      color: "#ec4899",
      icon: "🔬"
    },
    {
      id: "Final Year",
      title: "Final Year",
      count: certificatesByYear["Final Year"].length,
      verified: certificatesByYear["Final Year"].filter(c => c.verified).length,
      color: "#f97316",
      icon: "🎯"
    }
  ];

  return (
    <div className="page-container">
      <Sidebar user={user} />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header user={user} onLogout={handleLogout} />
        
        <main className="main-content">
          <div className="content-header">
            <h1 className="page-title">Coordinator Dashboard</h1>
            <p className="page-subtitle">Manage certificates by academic year</p>
          </div>

          {/* Year Selection Cards */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
            gap: "20px", 
            marginBottom: "30px" 
          }}>
            {yearCards.map(year => (
              <div 
                key={year.id}
                className="year-card"
                style={{ 
                  backgroundColor: selectedYear === year.id ? `${year.color}15` : "white",
                  border: `2px solid ${selectedYear === year.id ? year.color : "#e5e7eb"}`,
                  borderRadius: "12px",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: selectedYear === year.id ? `0 4px 12px ${year.color}40` : "0 2px 8px rgba(0,0,0,0.08)"
                }}
                onClick={() => setSelectedYear(selectedYear === year.id ? "all" : year.id)}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ 
                      margin: "0 0 8px 0", 
                      fontSize: "18px", 
                      fontWeight: "600",
                      color: "#1f2937"
                    }}>
                      {year.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ 
                        fontSize: "32px", 
                        fontWeight: "700", 
                        color: year.color 
                      }}>
                        {year.count}
                      </span>
                      <span style={{ 
                        padding: "4px 8px", 
                        backgroundColor: `${year.color}20`, 
                        color: year.color,
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        {year.verified} verified
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: "36px" }}>{year.icon}</span>
                </div>
                <div style={{ 
                  height: "6px", 
                  backgroundColor: "#e5e7eb", 
                  borderRadius: "3px", 
                  marginTop: "12px",
                  overflow: "hidden"
                }}>
                  <div style={{ 
                    height: "100%", 
                    width: `${year.count > 0 ? (year.verified / year.count) * 100 : 0}%`, 
                    backgroundColor: year.color,
                    borderRadius: "3px"
                  }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Sections by Year */}
          {selectedYear === "all" ? (
            // Show all years in separate sections
            <>
              {yearCards.map(year => (
                certificatesByYear[year.id].length > 0 && (
                  <YearSection 
                    key={year.id}
                    year={year}
                    certificates={certificatesByYear[year.id]}
                    onVerify={handleVerify}
                    onReject={openRejectionModal}
                  />
                )
              ))}
            </>
          ) : (
            // Show selected year only
            certificatesByYear[selectedYear].length > 0 ? (
              <YearSection 
                year={yearCards.find(y => y.id === selectedYear)}
                certificates={certificatesByYear[selectedYear]}
                onVerify={handleVerify}
                onReject={openRejectionModal}
              />
            ) : (
              <div className="card">
                <div style={{ 
                  textAlign: "center", 
                  padding: "40px 20px",
                  color: "#64748b"
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-certificate-off" width="48" height="48" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "16px", opacity: 0.5 }}>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12.876 12.881a3 3 0 0 0 4.243 4.243m.588 -3.42a3.012 3.012 0 0 0 -1.437 -1.423"></path>
                    <path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5"></path>
                    <path d="M10 19h-5a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2m4 0h10a2 2 0 0 1 2 2v10"></path>
                    <path d="M6 9h3m4 0h5"></path>
                    <path d="M6 12h3"></path>
                    <path d="M6 15h2"></path>
                    <path d="M3 3l18 18"></path>
                  </svg>
                  <h3>No certificates found for {yearCards.find(y => y.id === selectedYear)?.title}</h3>
                  <p>Students haven't submitted any certificates yet.</p>
                </div>
              </div>
            )
          )}
        </main>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Reject Certificate</h3>
              <button onClick={() => setShowRejectionModal(false)} className="modal-close">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Please provide a reason for rejecting this certificate:</p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                rows="4"
                style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "4px", marginTop: "8px" }}
              />
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowRejectionModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleReject} className="btn-danger">
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Year Section Component
function YearSection({ year, certificates, onVerify, onReject }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="card" style={{ marginBottom: "24px" }}>
      <div 
        className="card-header" 
        style={{ 
          cursor: "pointer",
          backgroundColor: `${year.color}08`,
          borderBottom: expanded ? `2px solid ${year.color}30` : "none"
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "24px" }}>{year.icon}</span>
            <h2 className="card-title" style={{ color: year.color, margin: 0 }}>
              {year.title} Students
            </h2>
            <span style={{ 
              padding: "4px 10px", 
              backgroundColor: `${year.color}20`, 
              color: year.color,
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600"
            }}>
              {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
            </span>
          </div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease"
            }}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      
      {expanded && (
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Category</th>
                <th>Subcategory</th>
                <th>Organization</th>
                <th>Points</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id}>
                  <td>
                    <strong>{cert.student}</strong>
                    {cert.rejectionReason && (
                      <div style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px" }}>
                        Rejected: {cert.rejectionReason}
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="badge badge-info capitalize">{cert.mainCategory}</span>
                  </td>
                  <td>{cert.subCategory}</td>
                  <td>
                    <a 
                      href={cert.orgLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link"
                      onClick={(e) => {
                        try {
                          new URL(cert.orgLink);
                        } catch {
                          e.preventDefault();
                          alert("Invalid organization URL");
                        }
                      }}
                    >
                      Visit Website
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-primary">{cert.points}</span>
                  </td>
                  <td>
                    {cert.verified ? (
                      <span className="badge badge-success">
                        Verified
                        {cert.verifiedBy && (
                          <div style={{ fontSize: "11px" }}>by {cert.verifiedBy}</div>
                        )}
                      </span>
                    ) : cert.rejectionReason ? (
                      <span className="badge badge-danger">Rejected</span>
                    ) : (
                      <span className="badge badge-warning">Pending</span>
                    )}
                  </td>
                  <td>
                    {cert.submittedAt ? new Date(cert.submittedAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
                      <a 
                        href={cert.file} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "13px", textAlign: "center" }}
                      >
                        View Certificate
                      </a>
                      
                      {!cert.verified && !cert.rejectionReason && (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            className="btn-success"
                            style={{ padding: "6px 12px", fontSize: "13px", flex: 1 }}
                            onClick={() => onVerify(cert.id)}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn-danger"
                            style={{ padding: "6px 12px", fontSize: "13px", flex: 1 }}
                            onClick={() => onReject(cert)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      
                      {cert.rejectionReason && (
                        <button 
                          className="btn-success"
                          style={{ padding: "6px 12px", fontSize: "13px" }}
                          onClick={() => onVerify(cert.id)}
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
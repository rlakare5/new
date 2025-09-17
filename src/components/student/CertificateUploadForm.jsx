import React, { useState } from "react";

export default function CertificateUploadForm({ onUpload }) {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [level, setLevel] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [orgLink, setOrgLink] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [geoTagPhoto, setGeoTagPhoto] = useState(null);
  const [geoTagPhotoName, setGeoTagPhotoName] = useState("");

  // Year of study options
  const yearOptions = ["FY", "SY", "TY", "Final Year"];

  // Mapping categories, subcategories and points
  const categories = {
    "Technical Skills": {
      "Paper Presentation": { College: 3, Zonal: 6, State: 9, National: 12, International: 15 },
      "Project Competition": { College: 3, Zonal: 6, State: 9, National: 12, International: 15 },
      "Hackathons/Ideathons": { College: 3, Zonal: 6, State: 9, National: 12, International: 15 },
      "Poster Competitions": { College: 3, Zonal: 6, State: 9, National: 12, International: 15 },
      "Competitive Programming": { College: 3, Zonal: 6, State: 9, National: 12, International: 15 },
      "Workshop": { College: 3, Zonal: 6, State: 9, National: 12, International: 15 },
      "Industrial Training/Case Studies": { College: 3, Zonal: 6, State: 9, National: 12, International: 15 },
      "MOOC with Final Assessment": { Fixed: 5 },
      "Internship/Professional Certification": { Fixed: 5 },
      "Industrial/Exhibition Visit": { Fixed: 5 },
      "Language Proficiency": { Fixed: 5 }, // can extend to max 10
    },
    "Sports & Cultural": {
      "Sports": { College: 3, Zonal: 5, State: 8, National: 12, International: 15 },
      "Cultural Activities": { College: 3, Zonal: 5, State: 8, National: 12, International: 15 },
    },
    "Community Outreach": {
      "Community Service (2 days)": { Fixed: 3 },
      "Community Service (1 week)": { Fixed: 6 },
      "Community Service (1 month)": { Fixed: 9 },
      "Community Service (1 semester/year)": { Fixed: 12 },
    },
    "Innovation / Entrepreneurship": {
      "Entrepreneurship/IPR Workshop": { Fixed: 5 },
      "MSME Programme": { Fixed: 5 },
      "Awards/Recognitions": { Fixed: 10 },
      "Completed Prototype Development": { Fixed: 15 },
      "Filed a Patent": { Fixed: 5 },
      "Published Patent": { Fixed: 10 },
      "Patent Granted": { Fixed: 15 },
      "Legally Registered Start-up": { Fixed: 10 },
      "Generated Revenue": { Fixed: 15 },
      "Attracted External Funding": { Fixed: 15 },
      "International Conference/Journals": { Fixed: 10 },
      "User/Industry Implementation": { Fixed: 15 },
      "Significant Social Innovation": { Fixed: 10 },
      "Business Hackathon": { Fixed: 10 },
      "Social Enterprise Pilot": { Fixed: 10 },
      "High Customer Review": { Fixed: 10 },
      "Developed Social Innovation": { Fixed: 10 },
    },
    "Leadership / Management": {
      "Club Member/Volunteer": { Dept: 3, University: 6 },
      "Club Coordinator": { Dept: 5, University: 10 },
      "Professional Societies": { Fixed: 5 },
      "Special Initiatives for University": { Fixed: 5 },
    },
  };

  const isValidUrl = (urlString) => {
    try {
      // Basic URL validation
      const url = new URL(urlString);
      
      // Check if it's HTTP or HTTPS
      if (!['http:', 'https:'].includes(url.protocol)) {
        return false;
      }
      
      // Check if it has a domain name
      if (!url.hostname || url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        return false;
      }
      
      // Additional checks for common TLDs
      const validTlds = ['.com', '.org', '.net', '.edu', '.gov', '.in', '.io'];
      const hasValidTld = validTlds.some(tld => url.hostname.endsWith(tld));
      
      if (!hasValidTld) {
        // Allow if it's an IP address (though unlikely for organizations)
        const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (!ipPattern.test(url.hostname)) {
          return false;
        }
      }
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleGeoTagPhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    setGeoTagPhoto(selectedFile);
    setGeoTagPhotoName(selectedFile ? selectedFile.name : "");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!mainCategory) newErrors.mainCategory = "Main category is required";
    if (!subCategory) newErrors.subCategory = "Subcategory is required";
    if (!yearOfStudy) newErrors.yearOfStudy = "Year of study is required";
    if (!file) newErrors.file = "Certificate file is required";
    if (!orgLink) {
      newErrors.orgLink = "Organization link is required";
    } else if (!isValidUrl(orgLink)) {
      newErrors.orgLink = "Please enter a valid website URL (e.g., https://example.com)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Check file type
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
      
      if (!allowedExtensions.includes(fileExtension)) {
        setErrors({ ...errors, file: "Only PDF, JPG, and PNG files are allowed" });
        setFile(null);
        setFileName("");
        return;
      }
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, file: "File size must be less than 5MB" });
        setFile(null);
        setFileName("");
        return;
      }
    }
    
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
    if (errors.file) setErrors({ ...errors, file: "" });
  };

  const calculatePoints = () => {
    if (!mainCategory || !subCategory) return 0;
    const data = categories[mainCategory][subCategory];
    if (!data) return 0;

    if (data.Fixed) return data.Fixed;
    if (level && data[level]) return data[level];
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      const cert = {
        id: Date.now(),
        student: user.prn,
        mainCategory,
        subCategory,
        level,
        yearOfStudy,
        orgLink,
        geoTagPhoto: geoTagPhoto ? URL.createObjectURL(geoTagPhoto) : null,
        file: URL.createObjectURL(file),
        points: calculatePoints(),
        verified: false,
      };

      onUpload(cert);

      // reset form
      setMainCategory("");
      setSubCategory("");
      setLevel("");
      setYearOfStudy("");
      setOrgLink("");
      setGeoTagPhoto(null);
      setGeoTagPhotoName("");
      setFile(null);
      setFileName("");
      setErrors({});
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-header" style={cardHeaderStyle}>
        <h2 className="card-title" style={titleStyle}>Upload New Certificate</h2>
        <p style={subtitleStyle}>
          Fill in the details of your certificate to earn points
        </p>
      </div>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGridStyle}>
          {/* Main Category */}
          <div className="form-group" style={formGroupStyle}>
            <label style={labelStyle}>Main Category</label>
            <select
              value={mainCategory}
              onChange={(e) => {
                setMainCategory(e.target.value);
                setSubCategory("");
                setLevel("");
              }}
              className="form-select"
              disabled={isSubmitting}
              style={selectStyle}
            >
              <option value="">Select Category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.mainCategory && <p className="error-text" style={errorStyle}>{errors.mainCategory}</p>}
          </div>

          {/* Subcategory */}
          {mainCategory && (
            <div className="form-group" style={formGroupStyle}>
              <label style={labelStyle}>Subcategory</label>
              <select
                value={subCategory}
                onChange={(e) => {
                  setSubCategory(e.target.value);
                  setLevel("");
                }}
                className="form-select"
                disabled={isSubmitting}
                style={selectStyle}
              >
                <option value="">Select Subcategory</option>
                {Object.keys(categories[mainCategory]).map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
              {errors.subCategory && <p className="error-text" style={errorStyle}>{errors.subCategory}</p>}
            </div>
          )}

          {/* Level Dropdown (only if needed) */}
          {mainCategory && subCategory && categories[mainCategory][subCategory] && !categories[mainCategory][subCategory].Fixed && (
            <div className="form-group" style={formGroupStyle}>
              <label style={labelStyle}>Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="form-select"
                disabled={isSubmitting}
                style={selectStyle}
              >
                <option value="">Select Level</option>
                {Object.keys(categories[mainCategory][subCategory]).map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Year of Study */}
          <div className="form-group" style={formGroupStyle}>
            <label style={labelStyle}>Year of Study</label>
            <select
              value={yearOfStudy}
              onChange={(e) => setYearOfStudy(e.target.value)}
              className="form-select"
              disabled={isSubmitting}
              style={selectStyle}
            >
              <option value="">Select Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {errors.yearOfStudy && <p className="error-text" style={errorStyle}>{errors.yearOfStudy}</p>}
          </div>

          {/* Org Link */}
          <div className="form-group" style={formGroupStyle}>
            <label style={labelStyle}>Organization Website</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={orgLink}
              onChange={(e) => {
                setOrgLink(e.target.value);
                // Clear error when user starts typing
                if (errors.orgLink) {
                  setErrors({ ...errors, orgLink: "" });
                }
              }}
              onBlur={(e) => {
                // Validate on blur
                if (e.target.value && !isValidUrl(e.target.value)) {
                  setErrors({ ...errors, orgLink: "Please enter a valid website URL" });
                }
              }}
              className="form-input"
              disabled={isSubmitting}
              style={orgLink ? (errors.orgLink ? {...inputStyle, ...inputErrorStyle} : {...inputStyle, ...inputSuccessStyle}) : inputStyle}
            />
            {errors.orgLink && <p className="error-text" style={errorStyle}>{errors.orgLink}</p>}
            {orgLink && !errors.orgLink && (
              <p style={helpTextStyle}>
                <span style={{color: '#10b981'}}>✓</span> Valid URL format
              </p>
            )}
          </div>

          {/* GeoTag Photo */}
          <div className="form-group" style={{...formGroupStyle, gridColumn: "1 / -1"}}>
            <label style={labelStyle}>Geo-Tag Photo (Optional)</label>
            <div style={fileUploadStyle}>
              <label htmlFor="geo-tag-upload" style={fileUploadLabelStyle}>
                {geoTagPhotoName ? geoTagPhotoName : "Upload location photo"}
              </label>
              <input
                id="geo-tag-upload"
                type="file"
                accept="image/*"
                onChange={handleGeoTagPhotoChange}
                disabled={isSubmitting}
                style={fileInputStyle}
              />
            </div>
            <p style={helpTextStyle}>Add a photo of your location for verification</p>
          </div>

          {/* File Upload */}
          <div className="form-group" style={{...formGroupStyle, gridColumn: "1 / -1"}}>
            <label style={labelStyle}>Certificate File</label>
            <div style={fileUploadStyle}>
              <label htmlFor="file-upload" style={fileUploadLabelStyle}>
                {fileName ? fileName : "Choose file (PDF, JPG, PNG only)"}
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                disabled={isSubmitting}
                style={fileInputStyle}
              />
            </div>
            {errors.file && <p className="error-text" style={errorStyle}>{errors.file}</p>}
            <div style={fileTypesStyle}>
              <span style={fileTypePillStyle}>PDF</span>
              <span style={fileTypePillStyle}>JPG</span>
              <span style={fileTypePillStyle}>PNG</span>
            </div>
          </div>
        </div>

        {/* Points Preview */}
        {(mainCategory && subCategory) && (
          <div style={pointsPreviewStyle}>
            <span style={pointsLabelStyle}>Estimated Points:</span>
            <span style={pointsValueStyle}>{calculatePoints()}</span>
          </div>
        )}

        {/* Submit */}
        <div style={submitContainerStyle}>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting}
            style={isSubmitting ? {...submitButtonStyle, ...submitButtonDisabledStyle} : submitButtonStyle}
          >
            {isSubmitting ? (
              <div style={loadingContainerStyle}>
                <span style={loadingSpinnerStyle}></span>
                Uploading...
              </div>
            ) : (
              "Upload Certificate"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// Styles (same as before)
const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  margin: '0 auto',
  maxWidth: '800px',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
};

const fileTypesStyle = {
  display: 'flex',
  gap: '8px',
  marginTop: '8px'
};

const fileTypePillStyle = {
  padding: '4px 8px',
  backgroundColor: '#e5e7eb',
  borderRadius: '12px',
  fontSize: '12px',
  color: '#4b5563',
  fontWeight: '500'
};
const inputErrorStyle = {
  borderColor: '#ef4444',
  boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
};

const inputSuccessStyle = {
  borderColor: '#10b981',
  boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
};
const cardHeaderStyle = {
  padding: '24px 24px 16px',
  borderBottom: '1px solid #e2e8f0'
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#1a202c',
  margin: '0 0 4px 0'
};

const subtitleStyle = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0'
};

const formStyle = {
  padding: '24px'
};

const formGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  marginBottom: '24px'
};

const formGroupStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const labelStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#374151',
  marginBottom: '6px'
};

const inputStyle = {
  padding: '10px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  fontSize: '14px',
  transition: 'all 0.2s ease',
  outline: 'none'
};

const selectStyle = {
  ...inputStyle,
  backgroundColor: 'white',
  cursor: 'pointer'
};

const errorStyle = {
  color: '#e53e3e',
  fontSize: '12px',
  margin: '4px 0 0 0'
};

const fileUploadStyle = {
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-block',
  width: '100%'
};

const fileUploadLabelStyle = {
  display: 'block',
  padding: '10px 12px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  backgroundColor: '#f9fafb',
  fontSize: '14px',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const fileInputStyle = {
  position: 'absolute',
  left: '-9999px'
};

const pointsPreviewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  marginBottom: '24px'
};

const pointsLabelStyle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#0369a1',
  marginRight: '8px'
};

const pointsValueStyle = {
  fontSize: '20px',
  fontWeight: '700',
  color: '#0369a1'
};

const submitContainerStyle = {
  display: 'flex',
  justifyContent: 'center'
};

const submitButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minWidth: '180px'
};

const submitButtonDisabledStyle = {
  backgroundColor: '#93c5fd',
  cursor: 'not-allowed'
};

const loadingContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const loadingSpinnerStyle = {
  width: '16px',
  height: '16px',
  border: '2px solid transparent',
  borderTop: '2px solid white',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginRight: '8px'
};

const helpTextStyle = {
  fontSize: '12px',
  color: '#6b7280',
  margin: '4px 0 0 0',
  fontStyle: 'italic'
};
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useJobStore from "../store/jobStore";
import Navbar from "../components/Navbar";

const CATEGORIES = [
  "Design",
  "Marketing",
  "Technology",
  "Engineering",
  "Business",
  "Finance",
  "Sales",
];
const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Remote",
  "Contract",
  "Internship",
];

const TAG_COLORS = {
  Marketing: { bg: "#FFE9CC", color: "#FFAB00" },
  Design: { bg: "#E8F9EF", color: "#56CDAD" },
  Business: { bg: "#E9EBFF", color: "#4640DE" },
  Technology: { bg: "#FFE9E9", color: "#FF6550" },
  Engineering: { bg: "#E9EBFF", color: "#4640DE" },
  Sales: { bg: "#E8F9EF", color: "#56CDAD" },
  Finance: { bg: "#FFE9CC", color: "#FFAB00" },
  Other: { bg: "#F3F4F8", color: "#515B6F" },
};

const EMPTY_FORM = {
  title: "",
  company: "",
  location: "",
  category: "Design",
  type: "Full Time",
  description: "",
};

const AdminPage = () => {
  const navigate = useNavigate();
  const { jobs, fetchJobs } = useJobStore();

  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [activeTab, setActiveTab] = useState("listings"); // "listings" | "add"

  useEffect(() => {
    fetchJobs();
  }, []);

  const allJobs = Array.isArray(jobs) ? jobs : [];

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
    setSuccessMsg("");
  };

  const handleAdd = async () => {
    const { title, company, location, category, type, description } = form;
    if (!title || !company || !location || !description) {
      setFormError("Title, company, location and description are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          company,
          location,
          category,
          type,
          description,
        }),
      });
      if (!res.ok) throw new Error("Failed to add job");
      setSuccessMsg(`"${title}" at ${company} has been added!`);
      setForm(EMPTY_FORM);
      fetchJobs(); // refresh store
    } catch (err) {
      setFormError("Failed to add job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (jobId, jobTitle) => {
    if (!window.confirm(`Delete "${jobTitle}"? This cannot be undone.`)) return;
    setDeletingId(jobId);
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      fetchJobs(); // refresh store
    } catch (err) {
      alert("Failed to delete job.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ backgroundColor: "#F8F8FD", minHeight: "100vh" }}>
      <Navbar />

      <style>{`
        .admin-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #D6DDEB;
          border-radius: 4px;
          font-family: var(--font-epilogue);
          font-size: 15px;
          color: #202430;
          background: #ffffff;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .admin-input:focus { border-color: #4640DE; }
        .admin-input::placeholder { color: #A8ADB7; }
        .admin-select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #D6DDEB;
          border-radius: 4px;
          font-family: var(--font-epilogue);
          font-size: 15px;
          color: #202430;
          background: #ffffff;
          outline: none;
          box-sizing: border-box;
          cursor: pointer;
          transition: border-color 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23515B6F' strokeWidth='1.5' strokeLinecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          padding-right: 40px;
        }
        .admin-select:focus { border-color: #4640DE; }
        .admin-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #D6DDEB;
          border-radius: 4px;
          font-family: var(--font-epilogue);
          font-size: 15px;
          color: #202430;
          background: #ffffff;
          outline: none;
          box-sizing: border-box;
          resize: vertical;
          min-height: 140px;
          transition: border-color 0.2s;
        }
        .admin-textarea:focus { border-color: #4640DE; }
        .admin-textarea::placeholder { color: #A8ADB7; }
        .admin-label {
          font-family: var(--font-epilogue);
          font-size: 13px;
          font-weight: 600;
          color: #515B6F;
          display: block;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .job-admin-row:hover { background-color: #FAFAFA !important; }
        .delete-btn:hover { background-color: #fff0f0 !important; color: #cc0000 !important; }
        .tab-btn { transition: all 0.2s; }
        @keyframes shimmer {
          0%,100% { opacity: 0.6; } 50% { opacity: 0.3; }
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Page header */}
      <div
        style={{
          padding: "48px clamp(24px, 8vw, 128px) 0",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 600,
                color: "#202430",
                margin: "0 0 6px 0",
              }}
            >
              Admin <span style={{ color: "#4640DE" }}>Dashboard</span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-epilogue)",
                fontSize: "15px",
                color: "#515B6F",
                margin: 0,
              }}
            >
              Manage job listings — {allJobs.length} jobs total
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "14px",
              fontWeight: 600,
              color: "#515B6F",
              background: "#ffffff",
              border: "1px solid #D6DDEB",
              borderRadius: "4px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            ← Back to site
          </button>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "0",
            borderBottom: "2px solid #D6DDEB",
          }}
        >
          {[
            { key: "listings", label: `All Listings (${allJobs.length})` },
            { key: "add", label: "+ Add New Job" },
          ].map((tab) => (
            <button
              key={tab.key}
              className="tab-btn"
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: "var(--font-epilogue)",
                fontSize: "15px",
                fontWeight: 600,
                color: activeTab === tab.key ? "#4640DE" : "#515B6F",
                background: "none",
                border: "none",
                borderBottom:
                  activeTab === tab.key
                    ? "2px solid #4640DE"
                    : "2px solid transparent",
                marginBottom: "-2px",
                padding: "12px 24px",
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "32px clamp(24px, 8vw, 128px) 80px",
          boxSizing: "border-box",
        }}
      >
        {/* ── LISTINGS TAB ── */}
        {activeTab === "listings" && (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #D6DDEB",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 140px 140px 120px 100px",
                gap: "16px",
                padding: "14px 24px",
                backgroundColor: "#F8F8FD",
                borderBottom: "1px solid #D6DDEB",
              }}
            >
              {["Job Title", "Company", "Location", "Category", "Action"].map(
                (h) => (
                  <span
                    key={h}
                    style={{
                      fontFamily: "var(--font-epilogue)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#A8ADB7",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {h}
                  </span>
                ),
              )}
            </div>

            {/* Rows */}
            {allJobs.length === 0 ? (
              <div style={{ padding: "60px", textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    color: "#515B6F",
                  }}
                >
                  No jobs yet. Add your first listing!
                </p>
              </div>
            ) : (
              allJobs.map((job, i) => {
                const tagStyle = TAG_COLORS[job.category] || TAG_COLORS.Other;
                return (
                  <div
                    key={job._id}
                    className="job-admin-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 140px 140px 120px 100px",
                      gap: "16px",
                      padding: "16px 24px",
                      borderBottom:
                        i < allJobs.length - 1 ? "1px solid #D6DDEB" : "none",
                      alignItems: "center",
                      transition: "background 0.15s",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-clash)",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#202430",
                          margin: "0 0 2px 0",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {job.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-epilogue)",
                          fontSize: "12px",
                          color: "#A8ADB7",
                          margin: 0,
                        }}
                      >
                        {job.type || "Full Time"}
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-epilogue)",
                        fontSize: "14px",
                        color: "#515B6F",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {job.company}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-epilogue)",
                        fontSize: "14px",
                        color: "#515B6F",
                        margin: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {job.location}
                    </p>
                    <span
                      style={{
                        fontFamily: "var(--font-epilogue)",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: tagStyle.color,
                        backgroundColor: tagStyle.bg,
                        borderRadius: "4px",
                        padding: "4px 10px",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      {job.category}
                    </span>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(job._id, job.title)}
                      disabled={deletingId === job._id}
                      style={{
                        fontFamily: "var(--font-epilogue)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#FF6550",
                        backgroundColor: "#FFF0EE",
                        border: "1px solid #FFCEC8",
                        borderRadius: "4px",
                        padding: "6px 14px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {deletingId === job._id ? "..." : "Delete"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── ADD JOB TAB ── */}
        {activeTab === "add" && (
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #D6DDEB",
              borderRadius: "4px",
              padding: "clamp(24px, 3vw, 40px)",
              maxWidth: "760px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "22px",
                fontWeight: 600,
                color: "#202430",
                margin: "0 0 32px 0",
              }}
            >
              Post a New Job
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {/* Title + Company */}
              <div className="form-grid">
                <div>
                  <label className="admin-label">Job Title *</label>
                  <input
                    className="admin-input"
                    name="title"
                    placeholder="e.g. Senior UI Designer"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="admin-label">Company *</label>
                  <input
                    className="admin-input"
                    name="company"
                    placeholder="e.g. Figma"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Location + Category */}
              <div className="form-grid">
                <div>
                  <label className="admin-label">Location *</label>
                  <input
                    className="admin-input"
                    name="location"
                    placeholder="e.g. Remote, New York, NY"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="admin-label">Category</label>
                  <select
                    className="admin-select"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Type */}
              <div style={{ maxWidth: "340px" }}>
                <label className="admin-label">Job Type</label>
                <select
                  className="admin-select"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="admin-label">Description *</label>
                <textarea
                  className="admin-textarea"
                  name="description"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* Messages */}
              {formError && (
                <p
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "14px",
                    color: "#FF6550",
                    margin: 0,
                  }}
                >
                  {formError}
                </p>
              )}
              {successMsg && (
                <p
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "14px",
                    color: "#56CDAD",
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  ✓ {successMsg}
                </p>
              )}

              {/* Buttons */}
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button
                  onClick={handleAdd}
                  disabled={submitting}
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#ffffff",
                    backgroundColor: submitting ? "#A8ADB7" : "#4640DE",
                    border: "none",
                    borderRadius: "4px",
                    padding: "14px 32px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) e.target.style.backgroundColor = "#3530c0";
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) e.target.style.backgroundColor = "#4640DE";
                  }}
                >
                  {submitting ? "Posting..." : "Post Job"}
                </button>
                <button
                  onClick={() => {
                    setForm(EMPTY_FORM);
                    setFormError("");
                    setSuccessMsg("");
                  }}
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#515B6F",
                    backgroundColor: "#ffffff",
                    border: "1px solid #D6DDEB",
                    borderRadius: "4px",
                    padding: "14px 24px",
                    cursor: "pointer",
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

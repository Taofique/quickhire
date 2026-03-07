import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useJobStore from "../store/jobStore";
import Navbar from "../components/Navbar";

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

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, fetchJobs, submitApplication, submitLoading } = useJobStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeUrl: "",
    coverNote: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!jobs || jobs.length === 0) fetchJobs();
  }, []);

  const job = Array.isArray(jobs) ? jobs.find((j) => j._id === id) : null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError("");
  };

  const handleSubmit = async () => {
    const { name, email, resumeUrl, coverNote } = form;
    if (!name || !email || !resumeUrl || !coverNote) {
      setFormError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email.");
      return;
    }

    try {
      await submitApplication({ jobId: id, name, email, resumeUrl, coverNote });
      setSubmitted(true);
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    }
  };

  const tagStyle = job
    ? TAG_COLORS[job.category] || TAG_COLORS.Other
    : TAG_COLORS.Other;

  if (!job) {
    return (
      <div style={{ backgroundColor: "#F8F8FD", minHeight: "100vh" }}>
        <Navbar forceWhite />
        <div style={{ paddingTop: "72px" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "48px" }}>🔍</p>
          <p
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "24px",
              fontWeight: 600,
              color: "#202430",
            }}
          >
            Loading job...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F8F8FD", minHeight: "100vh" }}>
      <Navbar forceWhite />
      <div style={{ paddingTop: "72px" }} />

      <style>{`
        .jd-input {
          width: 100%;
          padding: 14px 16px;
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
        .jd-input:focus { border-color: #4640DE; }
        .jd-input::placeholder { color: #A8ADB7; }
        .jd-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #D6DDEB;
          border-radius: 4px;
          font-family: var(--font-epilogue);
          font-size: 15px;
          color: #202430;
          background: #ffffff;
          outline: none;
          box-sizing: border-box;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.2s;
        }
        .jd-textarea:focus { border-color: #4640DE; }
        .jd-textarea::placeholder { color: #A8ADB7; }
        .jd-label {
          font-family: var(--font-epilogue);
          font-size: 14px;
          font-weight: 600;
          color: #515B6F;
          display: block;
          margin-bottom: 8px;
        }
        @media (max-width: 768px) {
          .jd-layout { flex-direction: column !important; }
          .jd-sidebar { width: 100% !important; position: static !important; }
        }
      `}</style>

      {/* Back */}
      <div
        style={{
          padding: "24px clamp(24px, 8vw, 128px) 0",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={() => navigate("/jobs")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-epilogue)",
            fontSize: "14px",
            fontWeight: 600,
            color: "#4640DE",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ← Back to jobs
        </button>
      </div>

      {/* Main layout */}
      <div
        className="jd-layout"
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          padding: "32px clamp(24px, 8vw, 128px) 80px",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT — job details */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Job header card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #D6DDEB",
              borderRadius: "4px",
              padding: "32px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "8px",
                    backgroundColor: tagStyle.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    flexShrink: 0,
                  }}
                >
                  {job.category === "Design"
                    ? "🎨"
                    : job.category === "Marketing"
                      ? "📣"
                      : job.category === "Technology"
                        ? "💻"
                        : job.category === "Engineering"
                          ? "⚙️"
                          : job.category === "Business"
                            ? "💼"
                            : job.category === "Finance"
                              ? "💰"
                              : job.category === "Sales"
                                ? "📈"
                                : "🏢"}
                </div>
                <div>
                  <h1
                    style={{
                      fontFamily: "var(--font-clash)",
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      fontWeight: 600,
                      color: "#202430",
                      margin: "0 0 6px 0",
                    }}
                  >
                    {job.title}
                  </h1>
                  <p
                    style={{
                      fontFamily: "var(--font-epilogue)",
                      fontSize: "16px",
                      color: "#515B6F",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <strong>{job.company}</strong>
                    <span style={{ color: "#D6DDEB" }}>·</span>
                    <span>📍 {job.location}</span>
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: tagStyle.color,
                    backgroundColor: tagStyle.bg,
                    borderRadius: "4px",
                    padding: "6px 14px",
                  }}
                >
                  {job.category}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#4640DE",
                    border: "1px solid #4640DE",
                    borderRadius: "4px",
                    padding: "6px 14px",
                  }}
                >
                  {job.type || "Full Time"}
                </span>
              </div>
            </div>
          </div>

          {/* Job description */}
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #D6DDEB",
              borderRadius: "4px",
              padding: "32px",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "22px",
                fontWeight: 600,
                color: "#202430",
                margin: "0 0 16px 0",
              }}
            >
              About this role
            </h2>
            <p
              style={{
                fontFamily: "var(--font-epilogue)",
                fontSize: "15px",
                color: "#515B6F",
                lineHeight: "180%",
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {job.description ||
                `${job.company} is looking for a talented ${job.title} to join their growing team. This is a fantastic opportunity to work with a world-class team and make a real impact.\n\nYou'll be responsible for contributing to key projects, collaborating with cross-functional teams, and driving meaningful outcomes in your domain.\n\nIf you're passionate about ${job.category?.toLowerCase()} and want to grow your career at ${job.company}, we'd love to hear from you.`}
            </p>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div style={{ marginTop: "32px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#202430",
                    margin: "0 0 16px 0",
                  }}
                >
                  Requirements
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {job.requirements.map((req, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "var(--font-epilogue)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#4640DE",
                        backgroundColor: "#E9EBFF",
                        borderRadius: "4px",
                        padding: "6px 14px",
                      }}
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Meta info */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid #D6DDEB",
              }}
            >
              {[
                { label: "Company", value: job.company },
                { label: "Location", value: job.location },
                { label: "Job Type", value: job.type || "Full Time" },
                { label: "Category", value: job.category },
                ...(job.salary ? [{ label: "Salary", value: job.salary }] : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: "var(--font-epilogue)",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#A8ADB7",
                      margin: "0 0 4px 0",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-epilogue)",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: label === "Salary" ? "#56CDAD" : "#202430",
                      margin: 0,
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Apply form */}
        <div
          className="jd-sidebar"
          style={{
            width: "380px",
            flexShrink: 0,
            position: "sticky",
            top: "100px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #D6DDEB",
              borderRadius: "4px",
              padding: "32px",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <p style={{ fontSize: "48px", margin: "0 0 16px 0" }}>🎉</p>
                <h3
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "#202430",
                    margin: "0 0 8px 0",
                  }}
                >
                  Application sent!
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "15px",
                    color: "#515B6F",
                    margin: "0 0 24px 0",
                  }}
                >
                  Good luck! {job.company} will be in touch.
                </p>
                <button
                  onClick={() => navigate("/jobs")}
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#4640DE",
                    backgroundColor: "transparent",
                    border: "2px solid #4640DE",
                    borderRadius: "4px",
                    padding: "12px 24px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Browse more jobs
                </button>
              </div>
            ) : (
              <>
                <h3
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#202430",
                    margin: "0 0 24px 0",
                  }}
                >
                  Apply Now
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div>
                    <label className="jd-label">Full Name *</label>
                    <input
                      className="jd-input"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="jd-label">Email Address *</label>
                    <input
                      className="jd-input"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="jd-label">Resume URL *</label>
                    <input
                      className="jd-input"
                      name="resumeUrl"
                      placeholder="https://drive.google.com/..."
                      value={form.resumeUrl}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="jd-label">Cover Note *</label>
                    <textarea
                      className="jd-textarea"
                      name="coverNote"
                      placeholder="Tell us why you're a great fit..."
                      value={form.coverNote}
                      onChange={handleChange}
                    />
                  </div>

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

                  <button
                    onClick={handleSubmit}
                    disabled={submitLoading}
                    style={{
                      fontFamily: "var(--font-epilogue)",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#ffffff",
                      backgroundColor: submitLoading ? "#A8ADB7" : "#4640DE",
                      border: "none",
                      borderRadius: "4px",
                      padding: "16px",
                      cursor: submitLoading ? "not-allowed" : "pointer",
                      transition: "background 0.2s",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      if (!submitLoading)
                        e.target.style.backgroundColor = "#3530c0";
                    }}
                    onMouseLeave={(e) => {
                      if (!submitLoading)
                        e.target.style.backgroundColor = "#4640DE";
                    }}
                  >
                    {submitLoading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;

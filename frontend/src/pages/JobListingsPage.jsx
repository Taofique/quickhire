import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CATEGORIES = [
  "All",
  "Design",
  "Marketing",
  "Technology",
  "Engineering",
  "Business",
  "Finance",
  "Sales",
];

const JobRow = ({ job }) => {
  const navigate = useNavigate();
  const tagStyle = TAG_COLORS[job.category] || TAG_COLORS.Other;

  return (
    <div
      className="job-row"
      onClick={() => navigate(`/jobs/${job._id}`)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px",
        backgroundColor: "#ffffff",
        border: "1px solid #D6DDEB",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      {/* Left — info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Category color dot */}
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "8px",
            flexShrink: 0,
            backgroundColor: (TAG_COLORS[job.category] || TAG_COLORS.Other).bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
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

        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(15px, 1.4vw, 18px)",
              fontWeight: 600,
              color: "#202430",
              margin: "0 0 4px 0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {job.title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "14px",
              color: "#515B6F",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: 600 }}>{job.company}</span>
            <span style={{ color: "#D6DDEB" }}>·</span>
            <span>📍 {job.location}</span>
          </p>
        </div>
      </div>

      {/* Right — tags + badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: "12px",
            fontWeight: 600,
            color: tagStyle.color,
            backgroundColor: tagStyle.bg,
            borderRadius: "4px",
            padding: "4px 12px",
          }}
        >
          {job.category}
        </span>
        <span
          style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: "12px",
            fontWeight: 600,
            color: "#4640DE",
            border: "1px solid #4640DE",
            borderRadius: "4px",
            padding: "4px 12px",
          }}
        >
          {job.type || "Full Time"}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/jobs/${job._id}`);
          }}
          style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: "14px",
            fontWeight: 700,
            color: "#ffffff",
            backgroundColor: "#4640DE",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#3530c0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4640DE")}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

const JobListingsPage = () => {
  const { jobs, loading, error, fetchJobs } = useJobStore();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchJobs();
  }, []);

  const allJobs = Array.isArray(jobs) ? jobs : [];

  const filtered = allJobs.filter((job) => {
    const matchSearch =
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.company?.toLowerCase().includes(search.toLowerCase());
    const matchLocation =
      !location || job.location?.toLowerCase().includes(location.toLowerCase());
    const matchCategory =
      activeCategory === "All" || job.category === activeCategory;
    return matchSearch && matchLocation && matchCategory;
  });

  return (
    <div style={{ backgroundColor: "#F8F8FD", minHeight: "100vh" }}>
      <Navbar forceWhite />
      <div style={{ paddingTop: "72px" }} />

      <style>{`
        .jl-search-input {
          flex: 1;
          border: none;
          outline: none;
          font-family: var(--font-epilogue);
          font-size: 16px;
          color: #202430;
          background: transparent;
          padding: 0 12px;
          min-width: 0;
        }
        .jl-search-input::placeholder { color: #A8ADB7; }
        .job-row:hover {
          border-color: #4640DE !important;
          box-shadow: 0 4px 20px rgba(70,64,222,0.08);
        }
        .cat-pill {
          font-family: var(--font-epilogue);
          font-size: 14px;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 20px;
          border: 1px solid #D6DDEB;
          background: #ffffff;
          color: #515B6F;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .cat-pill:hover { border-color: #4640DE; color: #4640DE; }
        .cat-pill.active { background: #4640DE; color: #ffffff; border-color: #4640DE; }
        .cat-pills-wrap {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: 4px;
        }
        .cat-pills-wrap::-webkit-scrollbar { display: none; }
        @keyframes shimmer {
          0%,100% { opacity: 0.6; } 50% { opacity: 0.3; }
        }
      `}</style>

      {/* Hero banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #4640DE 0%, #26A4FF 100%)",
          padding: "80px clamp(24px, 8vw, 128px) 60px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 600,
            color: "#ffffff",
            margin: "0 0 8px 0",
            lineHeight: "110%",
          }}
        >
          Find your <span style={{ color: "#FFE9CC" }}>dream job</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: "clamp(14px, 1.5vw, 18px)",
            color: "rgba(255,255,255,0.8)",
            margin: "0 0 40px 0",
          }}
        >
          {allJobs.length} jobs available — find the one that's right for you
        </p>

        {/* Search bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: "4px",
            padding: "8px 8px 8px 16px",
            maxWidth: "720px",
            gap: "8px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          <span style={{ fontSize: "18px", flexShrink: 0 }}>🔍</span>
          <input
            className="jl-search-input"
            placeholder="Job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            style={{
              width: "1px",
              height: "32px",
              background: "#D6DDEB",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: "18px", flexShrink: 0 }}>📍</span>
          <input
            className="jl-search-input"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            onClick={() => {}}
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffffff",
              backgroundColor: "#4640DE",
              border: "none",
              borderRadius: "4px",
              padding: "12px 24px",
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#3530c0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4640DE")}
          >
            Search
          </button>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          padding: "48px clamp(24px, 8vw, 128px)",
          boxSizing: "border-box",
        }}
      >
        {/* Category filter pills */}
        <div className="cat-pills-wrap" style={{ marginBottom: "32px" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-pill${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p
          style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: "15px",
            color: "#515B6F",
            marginBottom: "20px",
          }}
        >
          Showing{" "}
          <strong style={{ color: "#202430" }}>{filtered.length}</strong> jobs
          {activeCategory !== "All" && (
            <>
              {" "}
              in <strong style={{ color: "#4640DE" }}>{activeCategory}</strong>
            </>
          )}
          {search && (
            <>
              {" "}
              matching <strong style={{ color: "#202430" }}>"{search}"</strong>
            </>
          )}
        </p>

        {/* Loading */}
        {loading && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: "88px",
                  borderRadius: "4px",
                  backgroundColor: "#E8E9F0",
                  animation: "shimmer 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <p style={{ fontFamily: "var(--font-epilogue)", color: "#FF6550" }}>
            Could not load jobs — make sure the backend is running.
          </p>
        )}

        {/* Job list */}
        {!loading && !error && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontSize: "48px", margin: "0 0 16px 0" }}>🔍</p>
                <p
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#202430",
                    margin: "0 0 8px 0",
                  }}
                >
                  No jobs found
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    color: "#515B6F",
                  }}
                >
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              filtered.map((job) => <JobRow key={job._id} job={job} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListingsPage;

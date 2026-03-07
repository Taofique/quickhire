import { useEffect } from "react";
import useJobStore from "../store/jobStore";

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

const CategoryIcon = ({ category, size = 44 }) => {
  const icons = {
    Design: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="8" fill="#E8F0FF" />
        <path
          d="M14 30L20 14L26 30M16.5 25H23.5"
          stroke="#4640DE"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    Marketing: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="8" fill="#FFF4E5" />
        <path
          d="M14 22C14 22 18 16 22 22C26 28 30 22 30 22"
          stroke="#FF8C00"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="22" cy="22" r="3" fill="#FF8C00" />
      </svg>
    ),
    Technology: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="8" fill="#FFE9E9" />
        <rect
          x="13"
          y="16"
          width="18"
          height="13"
          rx="2"
          stroke="#FF6550"
          strokeWidth="2"
        />
        <path
          d="M19 29V31M25 29V31M17 31H27"
          stroke="#FF6550"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    Engineering: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="8" fill="#E9EBFF" />
        <path
          d="M17 22L20 19L23 22L20 25L17 22Z"
          stroke="#4640DE"
          strokeWidth="2"
        />
        <path
          d="M14 22H17M27 22H30M22 14V17M22 27V30"
          stroke="#4640DE"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    Business: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="8" fill="#E9EBFF" />
        <rect
          x="17"
          y="19"
          width="10"
          height="9"
          rx="1"
          stroke="#4640DE"
          strokeWidth="2"
        />
        <path
          d="M19 19V17H25V19"
          stroke="#4640DE"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14 26H30"
          stroke="#4640DE"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    Finance: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="8" fill="#FFF4E5" />
        <path
          d="M22 14V30M18 18H24C25.1 18 26 18.9 26 20C26 21.1 25.1 22 24 22H20C18.9 22 18 22.9 18 24C18 25.1 18.9 26 20 26H26"
          stroke="#FFAB00"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    Sales: (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="8" fill="#E8F9EF" />
        <path
          d="M14 28L20 22L24 26L30 18"
          stroke="#56CDAD"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="30" cy="18" r="2" fill="#56CDAD" />
      </svg>
    ),
  };
  return (
    icons[category] || (
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <rect width="44" height="44" rx="8" fill="#F3F4F8" />
        <circle cx="22" cy="22" r="6" stroke="#515B6F" strokeWidth="2" />
      </svg>
    )
  );
};

const JobCard = ({ job }) => {
  const tags = [job.category, job.type].filter(Boolean).slice(0, 2);

  return (
    <div className="job-card">
      {/* Icon + badge */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <CategoryIcon category={job.category} size={44} />
        <span className="job-badge">{job.type || "Full Time"}</span>
      </div>

      {/* Title + company */}
      <div>
        <h3 className="job-title">{job.title}</h3>
        <p className="job-meta">
          <span style={{ fontWeight: 500 }}>{job.company}</span>
          <span style={{ color: "#D6DDEB" }}>·</span>
          <span>{job.location}</span>
        </p>
      </div>

      {/* Description */}
      <p className="job-desc">
        {job.description ||
          `${job.company} is looking for ${job.title} to help the team...`}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {tags.map((tag) => {
          const s = TAG_COLORS[tag] || TAG_COLORS.Other;
          return (
            <span
              key={tag}
              className="job-tag"
              style={{ color: s.color, backgroundColor: s.bg }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const FeaturedJobsSection = () => {
  const { jobs, loading, error, fetchJobs } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, []);

  const featured = Array.isArray(jobs) ? jobs.slice(0, 8) : [];

  return (
    <section
      style={{
        width: "100%",
        padding: "80px clamp(24px, 8vw, 128px)",
        backgroundColor: "#F8F8FD",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        /* ── Job Card ── */
        .job-card {
          width: 100%;
          min-width: 0;
          height: clamp(240px, 22vw, 283px);
          padding: clamp(16px, 1.8vw, 24px);
          border: 1px solid #D6DDEB;
          border-radius: 4px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          flex-shrink: 0;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .job-card:hover {
          border-color: #4640DE;
          box-shadow: 0 4px 20px rgba(70,64,222,0.1);
        }

        .job-badge {
          font-family: var(--font-epilogue);
          font-size: clamp(10px, 1vw, 12px);
          font-weight: 600;
          color: #4640DE;
          border: 1px solid #4640DE;
          border-radius: 4px;
          padding: 4px 10px;
          white-space: nowrap;
        }

        .job-title {
          font-family: var(--font-clash);
          font-size: clamp(15px, 1.4vw, 18px);
          font-weight: 600;
          color: #202430;
          margin: 0 0 6px 0;
          line-height: 120%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .job-meta {
          font-family: var(--font-epilogue);
          font-size: clamp(12px, 1.1vw, 14px);
          color: #515B6F;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .job-desc {
          font-family: var(--font-epilogue);
          font-size: clamp(12px, 1.1vw, 14px);
          color: #7C8493;
          line-height: 160%;
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .job-tag {
          font-family: var(--font-epilogue);
          font-size: clamp(10px, 1vw, 12px);
          font-weight: 600;
          border-radius: 4px;
          padding: 4px 10px;
        }

        /* ── Grid ── */
        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 40px;
        }

        /* 3 col — medium screens */
        @media (max-width: 1100px) and (min-width: 701px) {
          .jobs-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        /* Mobile — horizontal scroll, fixed card width */
        @media (max-width: 700px) {
          .jobs-grid {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory;
            gap: 16px;
            padding-bottom: 12px;
            padding-left: clamp(24px, 8vw, 128px);
            padding-right: clamp(24px, 8vw, 128px);
            margin-left: calc(-1 * clamp(24px, 8vw, 128px));
            margin-right: calc(-1 * clamp(24px, 8vw, 128px));
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .jobs-grid::-webkit-scrollbar { display: none; }
          .job-card {
            width: 240px !important;
            min-width: 240px !important;
            height: auto !important;
            min-height: 260px;
            scroll-snap-align: start;
          }
        }

        /* shimmer */
        @keyframes shimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }

        /* scroll dots — mobile only */
        .scroll-dots { display: none; }
        @media (max-width: 700px) {
          .scroll-dots { display: flex; }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(24px, 3vw, 40px)",
            fontWeight: 600,
            color: "#202430",
            margin: 0,
            lineHeight: "120%",
          }}
        >
          Featured <span style={{ color: "#26A4FF" }}>jobs</span>
        </h2>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-epilogue)",
            fontSize: "clamp(14px, 1.2vw, 16px)",
            fontWeight: 600,
            color: "#4640DE",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Show all jobs <span>→</span>
        </button>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
            overflow: "hidden",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "clamp(220px, 22vw, 274px)",
                minWidth: "220px",
                height: "clamp(240px, 22vw, 283px)",
                borderRadius: "4px",
                backgroundColor: "#E8E9F0",
                animation: "shimmer 1.5s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <p
          style={{
            marginTop: "40px",
            fontFamily: "var(--font-epilogue)",
            color: "#FF6550",
            fontSize: "15px",
          }}
        >
          Could not load jobs — make sure the backend is running.
        </p>
      )}

      {/* Jobs grid */}
      {!loading && !error && (
        <>
          <div className="jobs-grid">
            {featured.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {/* Mobile scroll dots */}
          <div
            className="scroll-dots"
            style={{ justifyContent: "center", gap: "6px", marginTop: "16px" }}
          >
            {featured.slice(0, 5).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: i === 0 ? "#4640DE" : "#D6DDEB",
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedJobsSection;

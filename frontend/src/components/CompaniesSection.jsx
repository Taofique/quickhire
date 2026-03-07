const companies = [
  {
    name: "Vodafone",
    svg: (
      <svg
        viewBox="0 0 160 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "60px", width: "auto" }}
      >
        <circle
          cx="22"
          cy="22"
          r="16"
          stroke="#999"
          strokeWidth="2.5"
          fill="none"
        />
        <circle
          cx="22"
          cy="22"
          r="8"
          stroke="#999"
          strokeWidth="2.5"
          fill="none"
        />
        <text
          x="46"
          y="29"
          fontFamily="Arial, sans-serif"
          fontSize="18"
          fontWeight="600"
          fill="#999"
        >
          vodafone
        </text>
      </svg>
    ),
  },
  {
    name: "Intel",
    svg: (
      <svg
        viewBox="0 0 80 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "60px", width: "auto" }}
      >
        <text
          x="4"
          y="32"
          fontFamily="Georgia, serif"
          fontSize="28"
          fontWeight="700"
          fill="#999"
        >
          intel.
        </text>
      </svg>
    ),
  },
  {
    name: "Tesla",
    svg: (
      <svg
        viewBox="0 0 120 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "60px", width: "auto" }}
      >
        <text
          x="4"
          y="32"
          fontFamily="Arial, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill="#999"
          letterSpacing="6"
        >
          TESLA
        </text>
      </svg>
    ),
  },
  {
    name: "AMD",
    svg: (
      <svg
        viewBox="0 0 100 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "60px", width: "auto" }}
      >
        <text
          x="4"
          y="32"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="800"
          fill="#999"
        >
          AMD
        </text>
        <path
          d="M72 10 L84 10 L84 32"
          stroke="#999"
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Talkit",
    svg: (
      <svg
        viewBox="0 0 95 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "60px", width: "auto" }}
      >
        <text
          x="4"
          y="32"
          fontFamily="Arial, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill="#999"
        >
          Talkit
        </text>
      </svg>
    ),
  },
];

const track = [...companies, ...companies, ...companies, ...companies];

const CompaniesSection = () => {
  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        paddingTop: "40px",
        paddingBottom: "48px",
        borderBottom: "1px solid #E5E7F0",
      }}
    >
      <style>{`
        .carousel-outer {
          overflow: hidden;
          width: 100%;
          position: relative;
        }

        /* Fade edges - hidden on mobile */
        .carousel-outer::before,
        .carousel-outer::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 2;
          pointer-events: none;
        }
        .carousel-outer::before {
          left: 0;
          background: linear-gradient(to right, #ffffff, transparent);
        }
        .carousel-outer::after {
          right: 0;
          background: linear-gradient(to left, #ffffff, transparent);
        }

        /* Hide fade edges on mobile */
        @media (max-width: 768px) {
          .carousel-outer::before,
          .carousel-outer::after {
            width: 40px;
          }
        }

        @media (max-width: 480px) {
          .carousel-outer::before,
          .carousel-outer::after {
            width: 20px;
          }
        }

        .carousel-track {
          display: flex;
          align-items: center;
          gap: 80px;
          width: max-content;
          animation: infiniteScroll 25s linear infinite;
          will-change: transform;
        }

        /* Reduce gap on mobile */
        @media (max-width: 768px) {
          .carousel-track {
            gap: 40px;
          }
        }

        @media (max-width: 480px) {
          .carousel-track {
            gap: 30px;
          }
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        @keyframes infiniteScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }

        .company-item {
          flex-shrink: 0;
          opacity: 0.6;
          transition: opacity 0.3s ease;
          cursor: default;
          display: flex;
          align-items: center;
        }

        .company-item:hover {
          opacity: 1;
        }

        /* Adjust SVG sizes on mobile */
        @media (max-width: 768px) {
          .company-item svg {
            height: 50px !important;
          }
        }

        @media (max-width: 480px) {
          .company-item svg {
            height: 40px !important;
          }
        }
      `}</style>

      <p
        style={{
          fontFamily: "var(--font-epilogue)",
          fontSize: "14px",
          color: "#98A2B1",
          marginBottom: "36px",
          letterSpacing: "0.3px",
          paddingLeft: "clamp(24px, 8vw, 128px)",
          paddingRight: "clamp(24px, 8vw, 128px)",
          boxSizing: "border-box",
        }}
      >
        Companies we helped grow
      </p>

      {/* Carousel */}
      <div className="carousel-outer">
        <div className="carousel-track">
          {track.map((company, i) => (
            <div key={i} className="company-item">
              {company.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesSection;

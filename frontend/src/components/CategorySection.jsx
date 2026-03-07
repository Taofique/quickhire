import { useState } from "react";
import designIcon from "../assets/Explore_category_assets/designIcon.png";
import salesIcon from "../assets/Explore_category_assets/salesIcon.png";
import marketingIcon from "../assets/Explore_category_assets/marketingIcon.png";
import financeIcon from "../assets/Explore_category_assets/financeIcon.png";
import technologyIcon from "../assets/Explore_category_assets/technologyIcon.png";
import engineeringIcon from "../assets/Explore_category_assets/engineeringIcon.png";
import businessIcon from "../assets/Explore_category_assets/BusinesIcon.png";
import humanIcon from "../assets/Explore_category_assets/HumanIcon.png";

const categories = [
  { name: "Design", jobs: 235, icon: designIcon },
  { name: "Sales", jobs: 756, icon: salesIcon },
  { name: "Marketing", jobs: 140, icon: marketingIcon },
  { name: "Finance", jobs: 325, icon: financeIcon },
  { name: "Technology", jobs: 436, icon: technologyIcon },
  { name: "Engineering", jobs: 542, icon: engineeringIcon },
  { name: "Business", jobs: 211, icon: businessIcon },
  { name: "Human Resource", jobs: 346, icon: humanIcon },
];

const CategorySection = () => {
  const [activeCategory, setActiveCategory] = useState("Marketing");

  return (
    <section
      style={{
        backgroundColor: "#F8F8FD",
        width: "100%",
        padding: "80px clamp(24px, 8vw, 128px)",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .cat-card {
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          box-sizing: border-box;
          aspect-ratio: 274 / 214;
        }
        .cat-card:hover {
          border-color: #4640DE !important;
          box-shadow: 0 4px 20px rgba(70, 64, 222, 0.12);
        }
        .cat-card.active {
          border-color: transparent !important;
        }
        .cat-card.active:hover {
          box-shadow: 0 4px 24px rgba(70, 64, 222, 0.35);
        }
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          width: 100%;
        }
        @media (max-width: 900px) {
          .cat-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .cat-card {
            aspect-ratio: auto !important;
            min-height: 160px;
          }
        }
        @media (max-width: 540px) {
          .cat-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .cat-card {
            min-height: auto !important;
            aspect-ratio: auto !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 16px !important;
            padding: 20px 16px !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
            border-bottom: 1px solid #D6DDEB !important;
          }
          .cat-card.active {
            border-bottom: 1px solid transparent !important;
          }
          .cat-card-bottom {
            flex: 1;
          }
        }
      `}</style>

      {/* ── HEADER ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(26px, 3vw, 40px)",
            fontWeight: 600,
            color: "#202430",
            margin: 0,
            lineHeight: "120%",
          }}
        >
          Explore by <span style={{ color: "#26A4FF" }}>category</span>
        </h2>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--font-epilogue)",
            fontSize: "16px",
            fontWeight: 600,
            color: "#4640DE",
            background: "none",
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
            padding: 0,
          }}
        >
          Show all jobs <span>→</span>
        </button>
      </div>

      {/* ── GRID ── */}
      <div className="cat-grid">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;

          return (
            <div
              key={cat.name}
              className={`cat-card${isActive ? " active" : ""}`}
              onClick={() => setActiveCategory(cat.name)}
              style={{
                padding: "32px",
                border: `1px solid ${isActive ? "transparent" : "#D6DDEB"}`,
                borderRadius: "4px",
                backgroundColor: isActive ? "#4640DE" : "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Icon */}
              <img
                src={cat.icon}
                alt={cat.name}
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "contain",
                  filter: isActive
                    ? "brightness(0) invert(1)"
                    : "brightness(0) invert(21%) sepia(89%) saturate(2763%) hue-rotate(240deg) brightness(97%) contrast(89%)",
                }}
              />

              {/* Name + jobs */}
              <div className="cat-card-bottom">
                <h3
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "clamp(18px, 1.6vw, 24px)",
                    fontWeight: 600,
                    lineHeight: "120%",
                    color: isActive ? "#ffffff" : "#202430",
                    margin: "0 0 6px 0",
                  }}
                >
                  {cat.name}
                </h3>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-epilogue)",
                      fontSize: "clamp(14px, 1.2vw, 18px)",
                      fontWeight: 400,
                      lineHeight: "160%",
                      color: isActive ? "rgba(255,255,255,0.85)" : "#515B6F",
                    }}
                  >
                    {cat.jobs} jobs available
                  </span>
                  <span
                    style={{
                      color: isActive ? "#ffffff" : "#4640DE",
                      fontSize: "16px",
                      fontWeight: 600,
                    }}
                  >
                    →
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;

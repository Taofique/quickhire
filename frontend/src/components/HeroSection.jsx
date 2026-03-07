import { useState, useEffect } from "react";
import pattern from "../assets/Hero_assets/Pattern.png";
import heroPerson from "../assets/Hero_assets/Hero_person.png";
import rectangle from "../assets/Hero_assets/Rectangle.png";
import groupUnderline from "../assets/Hero_assets/Group.png";
import searchIcon from "../assets/Hero_assets/search_icon_header.png";
import locationIcon from "../assets/Hero_assets/location_icon_header.png";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        backgroundColor: "#F8F8FD",
        width: "100%",
        height: isMobile ? "auto" : "722px",
        minHeight: isMobile ? "100vh" : "722px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #E5E7F0",
      }}
    >
      {/* Pattern */}
      <img
        src={pattern}
        alt=""
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          height: isMobile ? "40%" : "100%",
          width: "auto",
          pointerEvents: "none",
          opacity: isMobile ? 0.5 : 1,
        }}
      />

      {/* Hero Person — hidden on mobile */}
      {!isMobile && (
        <img
          src={heroPerson}
          alt="Job seeker"
          style={{
            position: "absolute",
            bottom: 0,
            right: "6%",
            height: "90%",
            width: "auto",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}

      {/* Rectangle — hidden on mobile */}
      {!isMobile && (
        <img
          src={rectangle}
          alt=""
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "20%",
            zIndex: 20,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── LEFT CONTENT ── */}
      <div
        style={{
          position: isMobile ? "relative" : "absolute",
          top: isMobile ? "auto" : 0,
          left: isMobile ? "auto" : 0,
          height: isMobile ? "auto" : "110%",
          width: isMobile ? "100%" : "clamp(300px, 76%, 1800px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: isMobile ? "flex-start" : "center",
          paddingLeft: isMobile ? "24px" : "clamp(32px, 8vw, 128px)",
          paddingRight: isMobile ? "24px" : "32px",
          paddingTop: isMobile ? "80px" : 0,
          paddingBottom: isMobile ? "40px" : 0,
          zIndex: 30,
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: isMobile
              ? "clamp(36px, 8vw, 52px)"
              : "clamp(40px, 4.5vw, 72px)",
            fontWeight: 600,
            lineHeight: "110%",
            color: "#202430",
            margin: 0,
          }}
        >
          Discover <br />
          more than
        </h1>

        {/* 5000+ Jobs + underline */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginTop: "4px",
            marginBottom: isMobile ? "16px" : "24px",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: isMobile
                ? "clamp(36px, 8vw, 52px)"
                : "clamp(40px, 4.5vw, 72px)",
              fontWeight: 600,
              lineHeight: "110%",
              color: "#26A4FF",
              margin: 0,
            }}
          >
            5000+ Jobs
          </h1>
          <img
            src={groupUnderline}
            alt=""
            style={{
              position: isMobile ? "relative" : "absolute", // ← relative on mobile
              bottom: isMobile ? "auto" : "-55px",
              left: 0,
              marginTop: isMobile ? "8px" : "0", // ← natural gap on mobile
              width: isMobile ? "80%" : "clamp(180px, 55%, 400px)",
              pointerEvents: "none",
              display: "block",
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: "16px",
            lineHeight: "160%",
            color: "#515B6F",
            marginTop: isMobile ? "24px" : "32px",
            marginBottom: "0",
            maxWidth: isMobile ? "100%" : "clamp(260px, 30vw, 400px)",
          }}
        >
          Great platform for the job seeker that searching for new career
          heights and passionate about startups.
        </p>

        {/* ── SEARCH BAR ── */}
        {isMobile ? (
          // Mobile — stacked layout
          <div
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              marginTop: "32px",
              borderRadius: "8px",
              overflow: "hidden",
              zIndex: 40,
              position: "relative",
            }}
          >
            {/* Keyword input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                gap: "10px",
                borderBottom: "1px solid #F3F4F8",
              }}
            >
              <img
                src={searchIcon}
                alt=""
                style={{
                  width: "18px",
                  height: "18px",
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
              <input
                type="text"
                placeholder="Job title or keyword"
                style={{
                  border: "none",
                  borderBottom: "2px solid #D6DDEB",
                  outline: "none",
                  fontFamily: "var(--font-epilogue)",
                  fontSize: "14px",
                  color: "#202430",
                  backgroundColor: "transparent",
                  width: "100%",
                  paddingBottom: "4px",
                }}
              />
            </div>
            {/* Location */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                gap: "10px",
                borderBottom: "1px solid #F3F4F8",
              }}
            >
              <img
                src={locationIcon}
                alt=""
                style={{
                  width: "18px",
                  height: "18px",
                  opacity: 0.5,
                  flexShrink: 0,
                }}
              />
              <select
                style={{
                  border: "none",
                  borderBottom: "2px solid #D6DDEB",
                  outline: "none",
                  fontFamily: "var(--font-epilogue)",
                  fontSize: "14px",
                  color: "#515B6F",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  width: "100%",
                  paddingBottom: "4px",
                }}
              >
                <option>Florence, Italy</option>
                <option>New York, USA</option>
                <option>London, UK</option>
                <option>Berlin, Germany</option>
              </select>
            </div>
            {/* Button */}
            <button
              style={{
                backgroundColor: "#4640DE",
                color: "#ffffff",
                fontFamily: "var(--font-epilogue)",
                fontSize: "15px",
                fontWeight: 700,
                border: "none",
                width: "calc(100% - 32px)", // ← not full width, margin on sides
                height: "48px",
                margin: "8px 16px", // ← sits inside card
                borderRadius: "4px", // ← rounded corners
                cursor: "pointer",
              }}
            >
              Search my job
            </button>
          </div>
        ) : (
          // Desktop — horizontal layout
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              marginTop: "32px",
              height: "64px",
              position: "relative",
              zIndex: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                height: "100%",
                padding: "0 16px",
                gap: "10px",
              }}
            >
              <img
                src={searchIcon}
                alt=""
                style={{
                  width: "20px",
                  height: "20px",
                  flexShrink: 0,
                  opacity: 1,
                }}
              />
              <input
                type="text"
                placeholder="Job title or keyword"
                style={{
                  border: "none",
                  borderBottom: "2px solid #D6DDEB",
                  outline: "none",
                  fontFamily: "var(--font-epilogue)",
                  fontSize: "14px",
                  color: "#202430",
                  backgroundColor: "transparent",
                  width: "100%",
                  paddingBottom: "4px",
                }}
              />
            </div>
            <div
              style={{
                width: "1px",
                height: "32px",
                backgroundColor: "#D6DDEB",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                padding: "0 16px",
                gap: "8px",
                flex: 1,
              }}
            >
              <img
                src={locationIcon}
                alt=""
                style={{
                  width: "20px",
                  height: "20px",
                  flexShrink: 0,
                  opacity: 1,
                }}
              />
              <div
                style={{
                  flex: 1,
                  borderBottom: "2px solid #D6DDEB",
                  paddingBottom: "4px",
                }}
              >
                <select
                  style={{
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "14px",
                    color: "#515B6F",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  <option>Florence, Italy</option>
                  <option>New York, USA</option>
                  <option>London, UK</option>
                  <option>Berlin, Germany</option>
                </select>
              </div>
            </div>
            <button
              style={{
                backgroundColor: "#4640DE",
                color: "#ffffff",
                fontFamily: "var(--font-epilogue)",
                fontSize: "15px",
                fontWeight: 700,
                border: "none",
                height: "44px",
                padding: "0 24px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                borderRadius: "4px",
                margin: "0 8px",
              }}
            >
              Search my job
            </button>
          </div>
        )}

        {/* Popular tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "14px",
              color: "#202430",
              fontWeight: 500,
            }}
          >
            Popular :
          </span>
          {["UI Designer", "UX Researcher", "Android", "Admin"].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "var(--font-epilogue)",
                fontSize: "14px",
                color: "#515B6F",
                padding: "2px 8px",
                cursor: "pointer",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

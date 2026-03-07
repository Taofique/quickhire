import dashboardImg from "../assets/Post_Jobs_assets/Dashboard Company.png";

const StartPostingSection = () => {
  return (
    <section
      style={{
        width: "100%",
        padding: "60px clamp(24px, 8vw, 128px)",
        backgroundColor: "#F8F8FD",
        boxSizing: "border-box",
        overflow: "visible",
      }}
    >
      <style>{`
        .sps-wrapper {
          position: relative;
          width: 100%;
        }

        .sps-card {
          position: relative;
          width: 100%;
          background-color: #4640DE;
          border-radius: 0;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          min-height: 414px;
          clip-path: polygon(
            clamp(80px,12vw,160px) 0%,
            100% 0%,
            100% calc(100% - clamp(80px,12vw,160px)),
            calc(100% - clamp(80px,12vw,160px)) 100%,
            0% 100%,
            0% clamp(80px,12vw,160px)
          );
        }

        .sps-left {
          position: relative;
          z-index: 2;
          flex: 0 0 45%;
          padding: clamp(40px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        /* Dashboard sits OUTSIDE the card as absolute sibling */
        .sps-dashboard-wrapper {
          position: absolute;
          right: clamp(16px, 4vw, 60px);
          bottom: 0;
          width: 48%;
          max-width: 520px;
          z-index: 10;
          display: flex;
          align-items: flex-end;
          pointer-events: none;
        }

        .sps-dashboard {
          width: 100%;
          object-fit: contain;
          display: block;
          border-radius: 8px 8px 0 0;
          filter: drop-shadow(0 -8px 32px rgba(0,0,0,0.3));
          transform: translateY(-20px);
        }

        .sps-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 32px;
          border: 2px solid #ffffff;
          background: transparent;
          color: #ffffff;
          font-family: var(--font-epilogue);
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.2s ease, color 0.2s ease;
          margin-top: 32px;
          pointer-events: all;
        }
        .sps-btn:hover {
          background: #ffffff;
          color: #4640DE;
        }

        @media (max-width: 768px) {
          .sps-card {
            flex-direction: column;
            align-items: center;
            min-height: auto;
            clip-path: polygon(
              clamp(50px,12vw,80px) 0%,
              100% 0%,
              100% calc(100% - clamp(50px,12vw,80px)),
              calc(100% - clamp(50px,12vw,80px)) 100%,
              0% 100%,
              0% clamp(50px,12vw,80px)
            );
            padding-bottom: 240px;
          }
          .sps-left {
            flex: none;
            width: 100%;
            align-items: center;
            text-align: center;
            padding: 56px 24px 24px;
          }
          .sps-dashboard-wrapper {
            position: absolute;
            right: 50%;
            transform: translateX(50%);
            bottom: 0;
            width: 85%;
            max-width: 100%;
          }
          .sps-dashboard {
            transform: translateY(0);
          }
        }
      `}</style>

      {/* wrapper is the positioning parent — card + dashboard are siblings */}
      <div className="sps-wrapper">
        {/* CARD — clip-path only affects this */}
        <div className="sps-card">
          <div className="sps-left">
            <h2
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(28px, 3.5vw, 56px)",
                fontWeight: 600,
                lineHeight: "110%",
                color: "#ffffff",
                margin: 0,
              }}
            >
              Start posting
              <br />
              jobs today
            </h2>

            <p
              style={{
                fontFamily: "var(--font-epilogue)",
                fontSize: "clamp(14px, 1.2vw, 16px)",
                fontWeight: 400,
                lineHeight: "160%",
                color: "rgba(255,255,255,0.8)",
                marginTop: "16px",
                marginBottom: 0,
              }}
            >
              Start posting jobs for only $10.
            </p>

            <button className="sps-btn">Sign Up For Free</button>
          </div>
        </div>

        {/* DASHBOARD — sibling of card, NOT inside clip-path */}
        <div className="sps-dashboard-wrapper">
          <img
            src={dashboardImg}
            alt="QuickHire Dashboard"
            className="sps-dashboard"
          />
        </div>
      </div>
    </section>
  );
};

export default StartPostingSection;

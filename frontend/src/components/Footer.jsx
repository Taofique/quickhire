import { useState } from "react";
import logo from "../assets/Hero_assets/Logo_1.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    setSubscribed(true);
    setEmail("");
  };

  const links = {
    About: ["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"],
    Resources: ["Help Docs", "Guide", "Updates", "Contact Us"],
  };

  const socials = [
    {
      label: "Facebook",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.5"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      ),
    },
    {
      label: "Dribbble",
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#1A1A2E",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .footer-grid {
          padding: 64px clamp(24px, 8vw, 128px) 48px;
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1.4fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: start;
          box-sizing: border-box;
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        .footer-bottom {
          padding: 24px clamp(24px, 8vw, 128px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          box-sizing: border-box;
        }
        @media (max-width: 540px) {
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .footer-link {
          font-family: var(--font-epilogue);
          font-size: 15px;
          color: #D6DDEB;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          display: block;
        }
        .footer-link:hover { color: #ffffff; }

        .footer-social {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D6DDEB;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
        }
        .footer-social:hover {
          border-color: #4640DE;
          color: #ffffff;
          background: rgba(70,64,222,0.2);
        }

        .footer-subscribe-wrap {
          display: flex;
        }
        .footer-subscribe-input {
          flex: 1;
          padding: 14px 16px;
          border: none;
          outline: none;
          font-family: var(--font-epilogue);
          font-size: 14px;
          color: #202430;
          background: #ffffff;
          border-radius: 4px 0 0 4px;
          min-width: 0;
        }
        .footer-subscribe-input::placeholder { color: #A8ADB7; }
        .footer-subscribe-btn {
          padding: 14px 20px;
          background: #4640DE;
          color: #ffffff;
          border: none;
          border-radius: 0 4px 4px 0;
          font-family: var(--font-epilogue);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .footer-subscribe-btn:hover { background: #3530c0; }
      `}</style>

      <div className="footer-grid">
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <img
              src={logo}
              alt="QuickHire"
              style={{
                height: "32px",
                width: "auto",
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "15px",
              color: "#D6DDEB",
              lineHeight: "170%",
              margin: 0,
              maxWidth: "240px",
            }}
          >
            Great platform for the job seeker that passionate about startups.
            Find your dream job easier.
          </p>
        </div>

        {/* Col 2 — About */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              margin: "0 0 24px 0",
            }}
          >
            About
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {links.About.map((l) => (
              <button key={l} className="footer-link">
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Col 3 — Resources */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              margin: "0 0 24px 0",
            }}
          >
            Resources
          </h4>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {links.Resources.map((l) => (
              <button key={l} className="footer-link">
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Col 4 — Newsletter */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "16px",
              fontWeight: 600,
              color: "#ffffff",
              margin: "0 0 12px 0",
            }}
          >
            Get job notifications
          </h4>
          <p
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "14px",
              color: "#D6DDEB",
              lineHeight: "160%",
              margin: "0 0 20px 0",
            }}
          >
            The latest job news, articles, sent to your inbox weekly.
          </p>

          {subscribed ? (
            <p
              style={{
                fontFamily: "var(--font-epilogue)",
                fontSize: "14px",
                color: "#56CDAD",
                fontWeight: 600,
              }}
            >
              ✓ You're subscribed!
            </p>
          ) : (
            <div className="footer-subscribe-wrap">
              <input
                className="footer-subscribe-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
              />
              <button
                className="footer-subscribe-btn"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: "rgba(255,255,255,0.08)",
          margin: "0 clamp(24px, 8vw, 128px)",
        }}
      />

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p
          style={{
            fontFamily: "var(--font-epilogue)",
            fontSize: "14px",
            color: "#7C8493",
            margin: 0,
          }}
        >
          2024 @ QuickHire. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {socials.map((s) => (
            <button key={s.label} className="footer-social" title={s.label}>
              {s.icon}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

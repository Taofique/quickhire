import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Hero_assets/Logo_1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAuth, setActiveAuth] = useState("signup");
  const [hoveredNav, setHoveredNav] = useState(null);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(() => window.scrollY);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Find Jobs", path: "/" },
    { label: "Browse Companies", path: "/companies" },
  ];

  useEffect(() => {
    setVisible(true);
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
        setMenuOpen(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ transform: visible ? "translateY(0)" : "translateY(-100%)" }}
    >
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          border-radius: 10px;
          color: #515B6F;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .mobile-nav-link:hover {
          background-color: #F0F0FF;
          color: #4640DE;
          font-weight: 600;
        }
        .mobile-nav-link.active {
          color: #4640DE;
          font-weight: 600;
        }
      `}</style>

      <nav
        className="w-full border-b transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "#ffffff" : "transparent",
          borderBottomColor: scrolled ? "#D6DDEB" : "transparent",
        }}
      >
        {/* ── DESKTOP ── */}
        <div
          className="hidden md:flex items-center justify-between h-[72px] w-full"
          style={{
            paddingLeft: "clamp(32px, 8vw, 128px)",
            paddingRight: "clamp(32px, 8vw, 128px)",
          }}
        >
          {/* LEFT — Logo + Nav Links */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center shrink-0">
              <img src={logo} alt="QuickHire" className="h-8 w-auto" />
            </Link>

            <div className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path && hoveredNav === null;
                const isHovered = hoveredNav === link.label;
                const highlighted = isActive || isHovered;

                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onMouseEnter={() => setHoveredNav(link.label)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className="font-epilogue text-[16px] relative pb-1 transition-all duration-200 whitespace-nowrap"
                    style={{
                      color: highlighted ? "#4640DE" : "#515B6F",
                      fontWeight: highlighted ? 600 : 500,
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4640DE] transition-all duration-200"
                      style={{
                        opacity: highlighted ? 1 : 0,
                        transform: highlighted ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Login | divider | Sign Up */}
          <div className="flex items-center">
            <button
              onClick={() => setActiveAuth("login")}
              className="font-epilogue text-[16px] font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer rounded"
              style={{
                width: "108px",
                height: "50px",
                backgroundColor:
                  activeAuth === "login" ? "#4640DE" : "transparent",
                color: activeAuth === "login" ? "#ffffff" : "#4640DE",
              }}
            >
              Login
            </button>

            <div
              style={{
                width: "1px",
                height: "32px",
                backgroundColor: "#C0C9D9",
                flexShrink: 0,
                margin: "0 8px",
              }}
            />

            <button
              onClick={() => setActiveAuth("signup")}
              className="font-epilogue text-[16px] font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer rounded"
              style={{
                width: "108px",
                height: "50px",
                backgroundColor:
                  activeAuth === "signup" ? "#4640DE" : "transparent",
                color: activeAuth === "signup" ? "#ffffff" : "#4640DE",
              }}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* ── MOBILE top bar ── */}
        <div
          className="md:hidden flex items-center justify-between h-[72px]"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="QuickHire" className="h-8 w-auto" />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center transition-all duration-300"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: menuOpen ? "#4640DE" : "#ffffff",
              borderRadius: "50%",
              boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
              border: menuOpen ? "1.5px solid #4640DE" : "1.5px solid #D6DDEB",
              gap: "5px",
              padding: "14px",
            }}
          >
            <span
              style={{
                display: "block",
                height: "2px",
                borderRadius: "2px",
                backgroundColor: menuOpen ? "#ffffff" : "#202430",
                transition: "all 0.3s ease",
                width: "100%",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: "2px",
                borderRadius: "2px",
                backgroundColor: menuOpen ? "#ffffff" : "#202430",
                transition: "all 0.3s ease",
                width: "100%",
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                height: "2px",
                borderRadius: "2px",
                backgroundColor: "#202430",
                transition: "all 0.3s ease",
                width: "50%",
                alignSelf: "flex-start",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
              }}
            />
          </button>
        </div>

        {/* ── MOBILE DROPDOWN ── */}
        {menuOpen && (
          <div
            className="md:hidden absolute"
            style={{
              top: "80px",
              right: "16px",
              width: "260px",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
              zIndex: 100,
              animation: "dropIn 0.2s ease",
              padding: "8px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                onTouchStart={(e) => {
                  e.currentTarget.style.backgroundColor = "#F0F0FF";
                  e.currentTarget.style.color = "#4640DE";
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#515B6F";
                }}
                className="font-epilogue text-[15px]"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  color:
                    location.pathname === link.path ? "#4640DE" : "#515B6F",
                  backgroundColor: "transparent",
                  fontWeight: location.pathname === link.path ? 600 : 500,
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}

            <div
              style={{
                height: "1px",
                backgroundColor: "#F3F4F8",
                margin: "4px 8px",
              }}
            />

            <div
              style={{
                padding: "8px 0",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <button
                onClick={() => {
                  setActiveAuth("login");
                  setMenuOpen(false);
                }}
                className="font-epilogue text-[15px] font-semibold transition-all duration-200 w-full"
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  backgroundColor:
                    activeAuth === "login" ? "#4640DE" : "transparent",
                  color: activeAuth === "login" ? "#ffffff" : "#4640DE",
                  border: "1.5px solid #4640DE",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setActiveAuth("signup");
                  setMenuOpen(false);
                }}
                className="font-epilogue text-[15px] font-semibold transition-all duration-200 w-full"
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  backgroundColor:
                    activeAuth === "signup" ? "#4640DE" : "transparent",
                  color: activeAuth === "signup" ? "#ffffff" : "#4640DE",
                  border: "1.5px solid #4640DE",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

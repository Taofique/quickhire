import pattern from "../assets/Hero_assets/Pattern.png";

const HeroSection = () => {
  return (
    <section
      style={{
        backgroundColor: "#F8F8FD",
        width: "100%",
        height: "722px", // 794px total - 72px navbar = 722px visible
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #E5E7F0",
      }}
    >
      {/* Pattern — right 45% only */}
      <img
        src={pattern}
        alt=""
        style={{
          position: "absolute",
          top: "0px",
          right: "0px",
          height: "100%", // ← fill the full section height
          width: "auto", // ← width scales naturally from height
          pointerEvents: "none",
        }}
      />
    </section>
  );
};

export default HeroSection;

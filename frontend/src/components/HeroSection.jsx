import pattern from "../assets/Hero_assets/Pattern.png";
import heroPerson from "../assets/Hero_assets/Hero_person.png";

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
    </section>
  );
};

export default HeroSection;

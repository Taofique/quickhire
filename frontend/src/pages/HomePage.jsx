import CompaniesSection from "../components/CompaniesSection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/NavBar";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#F8F8FD" }}>
      <Navbar />
      {/* paddingTop offsets the fixed navbar so content isn't hidden behind it */}
      <div>
        <HeroSection />
        <CompaniesSection />
        {/* Temp spacer so page is scrollable to test navbar hide/show */}
        <div style={{ height: "1000px" }} />
      </div>
    </div>
  );
};

export default HomePage;

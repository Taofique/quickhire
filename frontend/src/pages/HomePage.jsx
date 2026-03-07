import CategorySection from "../components/CategorySection";
import CompaniesSection from "../components/CompaniesSection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import StartPostingSection from "../components/StartPostingSection";
import FeaturedJobSection from "../components/FeaturedJobsSection";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#F8F8FD" }}>
      <Navbar />
      {/* paddingTop offsets the fixed navbar so content isn't hidden behind it */}
      <div>
        <HeroSection />
        <CompaniesSection />
        <CategorySection />

        <StartPostingSection />
        <FeaturedJobSection />

        {/* Temp spacer so page is scrollable to test navbar hide/show */}
        <div style={{ height: "1000px" }} />
      </div>
    </div>
  );
};

export default HomePage;

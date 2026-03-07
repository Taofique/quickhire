import CategorySection from "../components/CategorySection";
import CompaniesSection from "../components/CompaniesSection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import StartPostingSection from "../components/StartPostingSection";
import FeaturedJobSection from "../components/FeaturedJobsSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#F8F8FD" }}>
      <Navbar />
      <div>
        <HeroSection />
        <CompaniesSection />
        <CategorySection />

        <StartPostingSection />
        <FeaturedJobSection />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

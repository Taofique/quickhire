import Navbar from "../components/NavBar";

const HomePage = () => {
  return (
    <div className="bg-[#F8F8FD] min-h-screen">
      <Navbar />
      {/* Offset for fixed navbar */}
      <div style={{ paddingTop: "72px" }}>
        <p className="p-8">Navbar test — scroll down to test hide/show</p>
        {/* Temp content to enable scrolling */}
        <div style={{ height: "2000px" }} />
      </div>
    </div>
  );
};

export default HomePage;

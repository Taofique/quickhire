import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobListingsPage from "./pages/JobListingsPage";
import JobDetailPage from "./pages/JobDetailPage";
import AdminPage from "./pages/AdminPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListingsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

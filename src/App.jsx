import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Importing from components folder!
import Footer from "./components/Footer"; // 🌟 Imported Footer component
import Home from "./pages/Home";
import Departments from "./pages/Departments";
import DepartmentDetail from "./pages/DepartmentDetail";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import TriageQueue from "./pages/TriageQueue";
import PatientDashboard from "./pages/PatientDashboard"; // 🌟 Added Patient Dashboard import

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:id" element={<DepartmentDetail />} />
            <Route path="/triage-queue" element={<TriageQueue />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/patient-dashboard" element={<PatientDashboard />} /> {/* 🌟 Added Patient Route */}
          </Routes>
        </main>
        <Footer /> {/* 🌟 Rendered Footer at the bottom of every page */}
      </div>
    </Router>
  );
}

export default App;
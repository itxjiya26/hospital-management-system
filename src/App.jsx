import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Importing from components folder!
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
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 75px)" }}>
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
    </Router>
  );
}

export default App;
 import { API_URL } from "../api"; // Adjust the path if needed depending on where the file is located in 'src' import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Stethoscope, Activity, CheckCircle2 } from "lucide-react";

export default function DepartmentDetail() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [patientName, setPatientName] = useState("");
  const [severity, setSeverity] = useState("Moderate");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) {
      setError("No department ID provided in route parameter.");
      setLoading(false);
      return;
    }

    setLoading(true);
    console.log("Fetching department with ID/Code:", id);

    fetch(`${API_URL}/api/departments/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Department with ID "${id}" not found.`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Department fetched successfully:", data);
        setDepartment(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ padding: "3rem", textAlign: "center", color: "#64748b" }}>Loading department details...</div>;
  }

  if (error || !department) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h2 style={{ color: "#dc2626" }}>{error || "Department Not Found"}</h2>
        <Link to="/departments" style={{ color: "#0ea5e9", marginTop: "1rem", display: "inline-block" }}>
          &larr; Back to Departments
        </Link>
      </div>
    );
  }

  const handleBedRequest = (e) => {
    e.preventDefault();
    if (!patientName.trim()) return;
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "2.5rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <Link
        to="/departments"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          color: "#0284c7",
          fontWeight: "600",
          fontSize: "0.95rem",
          marginBottom: "1.5rem",
          textDecoration: "none"
        }}
      >
        <ArrowLeft size={18} /> Back to Directory
      </Link>

      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e0f2fe",
          padding: "2rem",
          boxShadow: "0 4px 20px rgba(2, 132, 199, 0.04)",
          marginBottom: "2rem"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#0ea5e9", backgroundColor: "#e0f2fe", padding: "0.25rem 0.6rem", borderRadius: "6px" }}>
              {department.code}
            </span>
            <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0c4a6e", marginTop: "0.5rem", margin: 0 }}>
              {department.name}
            </h1>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.8rem", fontWeight: "800", color: (department.availableBeds || 0) > 0 ? "#0284c7" : "#dc2626" }}>
              {department.availableBeds || 0} Beds
            </div>
            <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Currently Available</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", padding: "1.25rem", backgroundColor: "#f0f9ff", borderRadius: "10px", border: "1px solid #bae6fd" }}>
          <div>
            <div style={{ fontSize: "0.82rem", color: "#0369a1", fontWeight: "600" }}>LEAD PHYSICIAN</div>
            <div style={{ fontSize: "1rem", fontWeight: "700", color: "#0c4a6e", display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
              <Stethoscope size={16} /> {department.leadDoctor || "Unassigned"}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.82rem", color: "#0369a1", fontWeight: "600" }}>ICU UNITS</div>
            <div style={{ fontSize: "1rem", fontWeight: "700", color: "#0c4a6e", display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.2rem" }}>
              <Activity size={16} /> {department.icuAvailable || 0} Units Available
            </div>
          </div>
        </div>
      </div>

      {/* Bed Reservation Form */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e0f2fe",
          padding: "2rem",
          boxShadow: "0 4px 20px rgba(2, 132, 199, 0.04)"
        }}
      >
        <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#0c4a6e", marginBottom: "0.5rem" }}>
          Emergency Bed Reservation Request
        </h3>
        <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          Submit patient intake details to hold an available bed in {department.name}.
        </p>

        {submitted ? (
          <div style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", padding: "1.25rem", borderRadius: "10px", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <CheckCircle2 size={24} />
            <div>
              <strong>Reservation Request Logged!</strong>
              <div style={{ fontSize: "0.9rem" }}>Patient: {patientName} ({severity} Priority). Bed hold active for 30 minutes.</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBedRequest} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.4rem" }}>
                Patient Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", color: "#0f172a", marginBottom: "0.4rem" }}>
                Triage Priority Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", outline: "none", backgroundColor: "#ffffff" }}
              >
                <option value="Critical">Critical (Immediate Care)</option>
                <option value="High">High (Urgent)</option>
                <option value="Moderate">Moderate (Standard)</option>
                <option value="Low">Low (Non-Emergency)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={(department.availableBeds || 0) === 0}
              style={{
                backgroundColor: (department.availableBeds || 0) > 0 ? "#0ea5e9" : "#94a3b8",
                color: "#ffffff",
                padding: "0.85rem",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "1rem",
                border: "none",
                cursor: (department.availableBeds || 0) > 0 ? "pointer" : "not-allowed",
                boxShadow: (department.availableBeds || 0) > 0 ? "0 4px 12px rgba(14, 165, 233, 0.3)" : "none"
              }}
            >
              {(department.availableBeds || 0) > 0 ? "Confirm Bed Request" : "No Available Beds"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
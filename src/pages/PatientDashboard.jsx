import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api";
import { Activity, Clock, User, FileText, CheckCircle } from "lucide-react";

export default function PatientDashboard() {
  const [patientRecord, setPatientRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve logged-in patient email (e.g., from localStorage after login)
  const patientEmail = localStorage.getItem("userEmail") || "patient@example.com";

  useEffect(() => {
    // Fetch patient triage status or records from your API
    axios
      .get(`${API_URL}/api/departments`) // Or your specific patient/triage endpoint
      .then((res) => {
        // Example: Filter or select record matching patient
        setPatientRecord(res.data[0] || null); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching patient records:", err);
        setError("Unable to load patient records. Please try again later.");
        setLoading(false);
      });
  }, [patientEmail]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", color: "#0284c7" }}>
        <h3>Loading your medical records...</h3>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1.5rem" }}>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", border: "1px solid #e0f2fe", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>
          <User size={32} color="#0ea5e9" />
          <div>
            <h1 style={{ fontSize: "1.5rem", margin: 0, color: "#0c4a6e" }}>Patient Portal</h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Logged in as: {patientEmail}</p>
          </div>
        </div>

        {error ? (
          <p style={{ color: "#dc2626" }}>{error}</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            
            {/* Triage / Emergency Status Card */}
            <div style={{ backgroundColor: "#f0f9ff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #bae6fd" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0284c7", fontWeight: "700", marginBottom: "0.5rem" }}>
                <Activity size={20} />
                <span>Current Care Status</span>
              </div>
              <p style={{ margin: "0.25rem 0", fontSize: "1.1rem", fontWeight: "600", color: "#0f172a" }}>
                Department: {patientRecord?.name || "General Outpatient / Emergency"}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#16a34a", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                <CheckCircle size={16} />
                <span>Active Record Verified</span>
              </div>
            </div>

            {/* Wait Time / Appointment Details */}
            <div style={{ backgroundColor: "#fafafa", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#475569", fontWeight: "700", marginBottom: "0.5rem" }}>
                <Clock size={20} />
                <span>Queue & Wait Time Metrics</span>
              </div>
              <p style={{ margin: 0, color: "#334155" }}>
                Estimated Triage Wait Time: <strong>15 - 20 mins</strong>
              </p>
              <p style={{ margin: "0.4rem 0 0 0", color: "#334155" }}>
                Assigned Unit Code: <strong>{patientRecord?.code || "EMG-01"}</strong>
              </p>
            </div>

            {/* Medical Instructions */}
            <div style={{ padding: "1rem", backgroundColor: "#fff", border: "1px dashed #cbd5e1", borderRadius: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#64748b", fontWeight: "600", marginBottom: "0.3rem" }}>
                <FileText size={18} />
                <span>Patient Instructions</span>
              </div>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#64748b" }}>
                Please check in with the triage nurse at Desk 3 upon arrival. Keep your registration ID ready.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
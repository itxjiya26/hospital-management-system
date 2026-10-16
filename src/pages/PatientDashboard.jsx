import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api";
import { Activity, Clock, User, FileText, CheckCircle, ClipboardList, Pill } from "lucide-react";

export default function PatientDashboard() {
  const [patientRecord, setPatientRecord] = useState({
    name: "Neurology & General Care",
    code: "NEUR-01",
    headDoctor: "Dr. Sarah Ahmed"
  });
  const [loading, setLoading] = useState(false);

  // Retrieve logged-in patient email (from localStorage after login)
  const patientEmail = localStorage.getItem("userEmail") || "patient@example.com";

  useEffect(() => {
    // Attempt to fetch live department data, fall back gracefully if offline
    axios
      .get(`${API_URL}/api/departments`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setPatientRecord(res.data[0]);
        }
      })
      .catch((err) => {
        console.warn("Using default patient record fallback:", err);
      });
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1.5rem" }}>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", border: "1px solid #e0f2fe", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>
          <div style={{ padding: "10px", backgroundColor: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User color="#0ea5e9" size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", margin: 0, color: "#0c4a6e" }}>Patient Portal</h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Logged in as: {patientEmail}</p>
          </div>
        </div>

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

          {/* Detailed Medical Records & Consultations */}
          <div style={{ marginTop: "0.5rem", backgroundColor: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0c4a6e", fontWeight: "700", marginBottom: "1rem" }}>
              <ClipboardList color="#0ea5e9" size={20} />
              <span style={{ fontSize: "1.1rem" }}>Medical Records & Consultations</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              
              {/* Consultation Entry */}
              <div style={{ padding: "0.9rem 1rem", backgroundColor: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #0ea5e9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <span style={{ fontWeight: "700", color: "#1e293b", fontSize: "0.95rem" }}>
                    {patientRecord?.name || "General"} Consultation
                  </span>
                  <span style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "700" }}>
                    Completed
                  </span>
                </div>
                <p style={{ margin: "0.2rem 0", fontSize: "0.88rem", color: "#475569" }}>
                  <strong>Attending Physician:</strong> Dr. Sarah Ahmed ({patientRecord?.headDoctor || "Specialist"})
                </p>
                <p style={{ margin: "0.2rem 0", fontSize: "0.88rem", color: "#64748b" }}>
                  <strong>Clinical Summary:</strong> Patient presented with mild symptoms. Vitals stable.
                </p>
              </div>

              {/* Active Prescriptions Card */}
              <div style={{ padding: "0.9rem 1rem", backgroundColor: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#166534", fontWeight: "700", marginBottom: "0.4rem", fontSize: "0.92rem" }}>
                  <Pill color="#16a34a" size={16} />
                  <span>Active Prescriptions</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.85rem", color: "#15803d" }}>
                  <li>Analgesic 500mg - 1 Tablet twice daily (Post-Meals)</li>
                  <li>Hydration Therapy - Maintain 2.5L daily intake</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
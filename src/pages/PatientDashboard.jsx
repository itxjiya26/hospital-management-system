import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api";
import { Activity, Clock, User, FileText, CheckCircle, ClipboardList, Pill, Stethoscope, HeartPulse, Thermometer, FileSpreadsheet } from "lucide-react";

export default function PatientDashboard() {
  const [patientRecord, setPatientRecord] = useState({
    name: "Neurology & General Care",
    code: "NEUR-01",
    headDoctor: "Dr. Sarah Ahmed"
  });

  const patientEmail = localStorage.getItem("userEmail") || "patient@example.com";

  useEffect(() => {
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
    <div style={{ maxWidth: "850px", margin: "2rem auto", padding: "1.5rem" }}>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", border: "1px solid #e0f2fe", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>
          <div style={{ padding: "10px", backgroundColor: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User color="#0ea5e9" size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", margin: 0, color: "#0c4a6e" }}>Patient Electronic Health Record (EHR)</h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Patient Email: {patientEmail} | ID: #CRG-94821</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          
          {/* Quick Metrics & Vitals Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            <div style={{ backgroundColor: "#f0f9ff", padding: "1rem", borderRadius: "12px", border: "1px solid #bae6fd" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#0284c7", fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.2rem" }}>
                <HeartPulse size={16} /> Blood Pressure
              </div>
              <p style={{ margin: 0, fontSize: "1.15rem", fontWeight: "700", color: "#0f172a" }}>120/80 mmHg</p>
            </div>
            <div style={{ backgroundColor: "#f0fdf4", padding: "1rem", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#16a34a", fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.2rem" }}>
                <Activity size={16} /> Heart Rate
              </div>
              <p style={{ margin: 0, fontSize: "1.15rem", fontWeight: "700", color: "#0f172a" }}>78 bpm (Normal)</p>
            </div>
            <div style={{ backgroundColor: "#fff7ed", padding: "1rem", borderRadius: "12px", border: "1px solid #ffedd5" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#c2410c", fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.2rem" }}>
                <Thermometer size={16} /> Temperature
              </div>
              <p style={{ margin: 0, fontSize: "1.15rem", fontWeight: "700", color: "#0f172a" }}>98.6 °F</p>
            </div>
          </div>

          {/* Current Care & Triage Status Card */}
          <div style={{ backgroundColor: "#fafafa", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0f172a", fontWeight: "700", marginBottom: "0.5rem" }}>
              <Stethoscope size={20} color="#0ea5e9" />
              <span>Assigned Department & Triage Metrics</span>
            </div>
            <p style={{ margin: "0.2rem 0", color: "#334155" }}>
              Department Unit: <strong>{patientRecord?.name}</strong> ({patientRecord?.code})
            </p>
            <p style={{ margin: "0.2rem 0", color: "#334155" }}>
              Attending Physician: <strong>{patientRecord?.headDoctor || "Dr. Sarah Ahmed"}</strong>
            </p>
            <p style={{ margin: "0.2rem 0", color: "#334155" }}>
              Estimated Queue Wait Time: <strong>15 - 20 mins</strong>
            </p>
          </div>

          {/* Precise Medical History & Lab Results */}
          <div style={{ backgroundColor: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0c4a6e", fontWeight: "700", marginBottom: "1rem" }}>
              <ClipboardList color="#0ea5e9" size={20} />
              <span style={{ fontSize: "1.1rem" }}>Clinical History & Diagnostics</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              
              {/* Consultation Record */}
              <div style={{ padding: "0.9rem 1rem", backgroundColor: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #0ea5e9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <span style={{ fontWeight: "700", color: "#1e293b", fontSize: "0.95rem" }}>
                    Initial Neurological Evaluation & Screening
                  </span>
                  <span style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "700" }}>
                    Verified
                  </span>
                </div>
                <p style={{ margin: "0.2rem 0", fontSize: "0.88rem", color: "#475569" }}>
                  <strong>Diagnosis:</strong> Acute migraine with secondary tension indicators. Vitals stable.
                </p>
                <p style={{ margin: "0.2rem 0", fontSize: "0.88rem", color: "#64748b" }}>
                  <strong>Lab Order Attached:</strong> Complete Blood Count (CBC) - <span style={{ color: "#16a34a", fontWeight: "600" }}>Cleared / Normal</span>
                </p>
              </div>

              {/* Precise Active Prescriptions */}
              <div style={{ padding: "0.9rem 1rem", backgroundColor: "#f0fdf4", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#166534", fontWeight: "700", marginBottom: "0.4rem", fontSize: "0.92rem" }}>
                  <Pill color="#16a34a" size={16} />
                  <span>Active Medication & Prescription Schedule</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.88rem", color: "#15803d" }}>
                  <div>• <strong>Sumatriptan 50mg:</strong> 1 tablet at onset of migraine (Max 2 per day)</div>
                  <div>• <strong>Magnesium Glycinate 400mg:</strong> Take 1 capsule nightly post-dinner</div>
                </div>
              </div>

            </div>
          </div>

          {/* Instructions */}
          <div style={{ padding: "1rem", backgroundColor: "#fff", border: "1px dashed #cbd5e1", borderRadius: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#64748b", fontWeight: "600", marginBottom: "0.3rem" }}>
              <FileText size={18} />
              <span>Next Follow-Up Appointment</span>
            </div>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#64748b" }}>
              Scheduled for <strong>November 12, 2026 at 10:30 AM</strong> with Dr. Sarah Ahmed at Desk 3.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
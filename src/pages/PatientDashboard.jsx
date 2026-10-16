import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api";
import { Activity, Clock, User, FileText, CheckCircle, ClipboardList, Pill, Stethoscope, HeartPulse, Thermometer } from "lucide-react";

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
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1.5rem" }}>
      <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "2rem", border: "1px solid #e0f2fe", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>
          <div style={{ padding: "10px", backgroundColor: "#e0f2fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User color="#0ea5e9" size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: "1.5rem", margin: 0, color: "#0c4a6e" }}>Patient Electronic Health Record (EHR)</h1>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Patient Email: {patientEmail} | Record ID: #CRG-94821</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Quick Vitals Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
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

          {/* Department & Triage Summary */}
          <div style={{ backgroundColor: "#fafafa", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0f172a", fontWeight: "700", marginBottom: "0.5rem" }}>
              <Stethoscope size={20} color="#0ea5e9" />
              <span>Current Care Assignment</span>
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

          {/* 📋 Complete Medical Record Tables */}
          <div style={{ backgroundColor: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0c4a6e", fontWeight: "700", marginBottom: "1rem" }}>
              <ClipboardList color="#0ea5e9" size={20} />
              <span style={{ fontSize: "1.1rem" }}>Comprehensive Clinical Records & History</span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #e2e8f0", color: "#475569" }}>
                    <th style={{ padding: "10px" }}>Date</th>
                    <th style={{ padding: "10px" }}>Category</th>
                    <th style={{ padding: "10px" }}>Diagnosis / Summary</th>
                    <th style={{ padding: "10px" }}>Physician</th>
                    <th style={{ padding: "10px" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px", color: "#334155" }}>Oct 16, 2026</td>
                    <td style={{ padding: "10px", fontWeight: "600", color: "#0284c7" }}>Neurology Screening</td>
                    <td style={{ padding: "10px", color: "#334155" }}>Acute migraine with secondary tension indicators. Vitals stable.</td>
                    <td style={{ padding: "10px", color: "#334155" }}>Dr. Sarah Ahmed</td>
                    <td style={{ padding: "10px" }}>
                      <span style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "0.2rem 0.5rem", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "700" }}>Verified</span>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px", color: "#334155" }}>Sep 28, 2026</td>
                    <td style={{ padding: "10px", fontWeight: "600", color: "#0284c7" }}>Lab Diagnostics (CBC)</td>
                    <td style={{ padding: "10px", color: "#334155" }}>Complete Blood Count within normal therapeutic ranges.</td>
                    <td style={{ padding: "10px", color: "#334155" }}>Pathology Lab</td>
                    <td style={{ padding: "10px" }}>
                      <span style={{ backgroundColor: "#dcfce7", color: "#166534", padding: "0.2rem 0.5rem", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "700" }}>Cleared</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 💊 Active Prescriptions Table */}
          <div style={{ backgroundColor: "#ffffff", padding: "1.25rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#166534", fontWeight: "700", marginBottom: "1rem" }}>
              <Pill color="#16a34a" size={20} />
              <span style={{ fontSize: "1.1rem" }}>Active Prescription Schedule</span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f0fdf4", borderBottom: "2px solid #bbf7d0", color: "#166534" }}>
                    <th style={{ padding: "10px" }}>Medication</th>
                    <th style={{ padding: "10px" }}>Dosage</th>
                    <th style={{ padding: "10px" }}>Frequency / Instructions</th>
                    <th style={{ padding: "10px" }}>Refills Left</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px", fontWeight: "600", color: "#1e293b" }}>Sumatriptan</td>
                    <td style={{ padding: "10px", color: "#334155" }}>50mg</td>
                    <td style={{ padding: "10px", color: "#334155" }}>1 tablet at onset of migraine (Max 2 per day)</td>
                    <td style={{ padding: "10px", color: "#334155" }}>2 Refills</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "10px", fontWeight: "600", color: "#1e293b" }}>Magnesium Glycinate</td>
                    <td style={{ padding: "10px", color: "#334155" }}>400mg</td>
                    <td style={{ padding: "10px", color: "#334155" }}>Take 1 capsule nightly post-dinner</td>
                    <td style={{ padding: "10px", color: "#334155" }}>3 Refills</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Follow-up Note */}
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
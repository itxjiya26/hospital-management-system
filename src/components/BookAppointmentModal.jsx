import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";
import { Calendar, Clock, User, FileText, CheckCircle, X } from "lucide-react";

export default function BookAppointmentModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: localStorage.getItem("userEmail") || "",
    department: "Neurology",
    doctorName: "Dr. Sarah Ahmed",
    appointmentDate: "",
    appointmentTime: "10:00 AM",
    reason: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post(`${API_URL}/api/appointments`, formData)
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      })
      .catch((err) => {
        console.error("Booking error:", err);
        setLoading(false);
        alert("Failed to book appointment. Please check connection.");
      });
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <div style={{ backgroundColor: "#ffffff", padding: "2rem", borderRadius: "16px", width: "90%", maxWidth: "500px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", position: "relative" }}>
        
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", border: "none", background: "none", cursor: "pointer" }}>
          <X size={20} color="#64748b" />
        </button>

        <h2 style={{ color: "#0c4a6e", marginTop: 0, marginBottom: "1rem" }}>📅 Book Clinical Appointment</h2>

        {success ? (
          <div style={{ textAlign: "center", padding: "2rem 0", color: "#16a34a" }}>
            <CheckCircle size={48} style={{ margin: "0 auto 1rem auto" }} />
            <h3>Appointment Scheduled Successfully!</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Full Patient Name"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              required
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />
            <input
              type="email"
              placeholder="Patient Email"
              value={formData.patientEmail}
              onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
              required
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            >
              <option value="Neurology">Neurology</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
            <input
              type="date"
              value={formData.appointmentDate}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              required
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />
            <input
              type="text"
              placeholder="Reason for Visit (e.g. Migraine Consultation)"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              required
              style={{ padding: "0.75rem", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{ padding: "0.85rem", backgroundColor: "#0ea5e9", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer", marginTop: "0.5rem" }}
            >
              {loading ? "Confirming..." : "Confirm Appointment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
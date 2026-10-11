import { useState } from "react";
import { Clock, PlusCircle, CheckCircle, ShieldAlert, UserPlus, AlertTriangle } from "lucide-react";

export default function TriageQueue() {
  const [queue, setQueue] = useState([
    { id: 101, name: "Zainab Bibi", priority: "Critical", waitTime: "5 mins", condition: "Severe Chest Pain / Shortness of Breath", department: "Cardiology" },
    { id: 102, name: "Usman Ali", priority: "High", waitTime: "12 mins", condition: "Head Trauma / Dizziness", department: "Neurology" },
    { id: 103, name: "Hamza Tariq", priority: "Moderate", waitTime: "25 mins", condition: "High Fever / Pediatric Intake", department: "Pediatrics" },
    { id: 104, name: "Saima Noor", priority: "Low", waitTime: "40 mins", condition: "Minor Laceration", department: "General Emergency" }
  ]);

  // Form State
  const [patientName, setPatientName] = useState("");
  const [priority, setPriority] = useState("High");
  const [condition, setCondition] = useState("");
  const [department, setDepartment] = useState("General Emergency");

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!patientName.trim() || !condition.trim()) return;

    const newPatient = {
      id: Date.now(),
      name: patientName,
      priority,
      waitTime: "Just Now",
      condition,
      department
    };

    setQueue([newPatient, ...queue]);
    setPatientName("");
    setCondition("");
  };

  const handleDischarge = (id) => {
    setQueue(queue.filter((patient) => patient.id !== id));
  };

  const getPriorityBadgeStyle = (level) => {
    switch (level) {
      case "Critical":
        return { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" };
      case "High":
        return { bg: "#fff7ed", text: "#ea580c", border: "#ffedd5" };
      case "Moderate":
        return { bg: "#f0f9ff", text: "#0284c7", border: "#bae6fd" };
      default:
        return { bg: "#f8fafc", text: "#64748b", border: "#e2e8f0" };
    }
  };

  return (
    <div style={{ padding: "2.5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0c4a6e", margin: "0 0 0.5rem 0" }}>
          Live Emergency Triage Queue
        </h1>
        <p style={{ color: "#64748b", margin: 0 }}>
          Realtime intake monitoring, priority categorization, and patient discharge workflow.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        
        {/* Left Column: Patient Intake Form */}
        <div>
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              border: "1px solid #e0f2fe",
              padding: "1.75rem",
              boxShadow: "0 4px 20px rgba(2, 132, 199, 0.04)",
              position: "sticky",
              top: "20px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem", color: "#0c4a6e" }}>
              <UserPlus size={22} color="#0ea5e9" />
              <h2 style={{ fontSize: "1.25rem", fontWeight: "700", margin: 0 }}>New Patient Triage Intake</h2>
            </div>

            <form onSubmit={handleAddPatient} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bilal Ahmed"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                  Triage Priority Level
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", outline: "none", backgroundColor: "#ffffff" }}
                >
                  <option value="Critical">🔴 Critical (Immediate)</option>
                  <option value="High">🟠 High Priority</option>
                  <option value="Moderate">🔵 Moderate Priority</option>
                  <option value="Low">⚪ Low Priority</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                  Assigned Unit
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", outline: "none", backgroundColor: "#ffffff" }}
                >
                  <option value="Cardiology">Cardiology & ICU</option>
                  <option value="Neurology">Neurology & Stroke</option>
                  <option value="Pediatrics">Pediatric Emergency</option>
                  <option value="General Emergency">General Emergency</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                  Chief Vitals / Medical Notes
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. BP 150/90, severe dizziness..."
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  style={{ width: "100%", padding: "0.7rem", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "0.95rem", outline: "none", resize: "none" }}
                />
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: "#0ea5e9",
                  color: "#ffffff",
                  padding: "0.8rem",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "0.95rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)"
                }}
              >
                <PlusCircle size={18} /> Add to Live Queue
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Queue List */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0c4a6e", margin: 0 }}>
              Active Patients ({queue.length})
            </h2>
            <span style={{ fontSize: "0.85rem", color: "#0284c7", backgroundColor: "#e0f2fe", padding: "0.2rem 0.6rem", borderRadius: "6px", fontWeight: "600" }}>
              Live Auto-Refresh Active
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {queue.length > 0 ? (
              queue.map((patient) => {
                const badge = getPriorityBadgeStyle(patient.priority);
                return (
                  <div
                    key={patient.id}
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "14px",
                      border: "1px solid #e0f2fe",
                      padding: "1.25rem",
                      boxShadow: "0 4px 16px rgba(2, 132, 199, 0.03)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem"
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: "700",
                            backgroundColor: badge.bg,
                            color: badge.text,
                            border: `1px solid ${badge.border}`,
                            padding: "0.2rem 0.5rem",
                            borderRadius: "6px"
                          }}
                        >
                          {patient.priority.toUpperCase()}
                        </span>
                        <span style={{ fontSize: "0.82rem", color: "#64748b", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Clock size={14} /> Wait: {patient.waitTime}
                        </span>
                      </div>

                      <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", margin: "0 0 0.2rem 0" }}>
                        {patient.name}
                      </h3>

                      <p style={{ fontSize: "0.88rem", color: "#475569", margin: "0 0 0.4rem 0" }}>
                        {patient.condition}
                      </p>

                      <div style={{ fontSize: "0.8rem", color: "#0284c7", fontWeight: "600" }}>
                        Unit: {patient.department}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDischarge(patient.id)}
                      title="Mark Treated / Discharge"
                      style={{
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        color: "#16a34a",
                        padding: "0.6rem 0.8rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "0.85rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        whiteSpace: "nowrap"
                      }}
                    >
                      <CheckCircle size={16} /> Treat & Clear
                    </button>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: "center", padding: "3rem", backgroundColor: "#ffffff", borderRadius: "14px", border: "1px solid #e0f2fe", color: "#64748b" }}>
                Queue is clear. No waiting patients.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
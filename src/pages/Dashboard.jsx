import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api";
import { PlusCircle, Edit, Trash2, Save, X, Building2, Bed, Check, Calendar, Stethoscope } from "lucide-react";
import { mockDepartments } from "../data/mockData";

export default function Dashboard() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("departments"); // "departments" or "appointments"
  const [appointments, setAppointments] = useState([]);

  // Form State for Editing Department
  const [editFormData, setEditFormData] = useState({
    name: "",
    code: "",
    totalBeds: 0,
    availableBeds: 0,
    leadDoctor: ""
  });

  // Form State for Adding New Department
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDept, setNewDept] = useState({
    name: "",
    code: "",
    totalBeds: 20,
    availableBeds: 10,
    icuAvailable: 2,
    leadDoctor: "",
    equipment: "Ventilator, ECG",
    description: "Emergency care unit."
  });

  // Fetch appointments on load
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get(`${API_URL}/api/appointments`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  };

  const updateAppointmentStatus = (id, newStatus) => {
    axios.put(`${API_URL}/api/appointments/${id}`, { status: newStatus })
      .then(() => fetchAppointments())
      .catch((err) => console.error("Error updating appointment status:", err));
  };

  // Start Editing Department
  const handleStartEdit = (dept) => {
    setEditingId(dept.id);
    setEditFormData({
      name: dept.name,
      code: dept.code,
      totalBeds: dept.totalBeds,
      availableBeds: dept.availableBeds,
      leadDoctor: dept.leadDoctor
    });
  };

  // Save Edit Department
  const handleSaveEdit = (id) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id
          ? {
              ...dept,
              name: editFormData.name,
              code: editFormData.code,
              totalBeds: Number(editFormData.totalBeds),
              availableBeds: Number(editFormData.availableBeds),
              leadDoctor: editFormData.leadDoctor
            }
          : dept
      )
    );
    setEditingId(null);
  };

  // Delete Department
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((dept) => dept.id !== id));
    }
  };

  // Add New Department
  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!newDept.name.trim()) return;

    const createdDept = {
      id: `dept-${Date.now()}`,
      name: newDept.name,
      code: newDept.code || `UNIT-${Math.floor(10 + Math.random() * 90)}`,
      totalBeds: Number(newDept.totalBeds),
      availableBeds: Number(newDept.availableBeds),
      icuAvailable: Number(newDept.icuAvailable),
      leadDoctor: newDept.leadDoctor || "Unassigned",
      equipment: newDept.equipment.split(",").map((item) => item.trim()),
      description: newDept.description
    };

    setDepartments([...departments, createdDept]);
    setShowAddModal(false);
    setNewDept({
      name: "",
      code: "",
      totalBeds: 20,
      availableBeds: 10,
      icuAvailable: 2,
      leadDoctor: "",
      equipment: "Ventilator, ECG",
      description: "Emergency care unit."
    });
  };

  return (
    <div style={{ padding: "2.5rem 2rem", maxWidth: "1150px", margin: "0 auto" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0c4a6e", margin: "0 0 0.5rem 0" }}>
            Hospital Management Dashboard
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Manage clinical unit configurations, bed allocation counters, and patient appointments.
          </p>
        </div>

        {activeTab === "departments" && (
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              backgroundColor: "#0ea5e9",
              color: "#ffffff",
              padding: "0.75rem 1.25rem",
              borderRadius: "10px",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "0 4px 14px rgba(14, 165, 233, 0.35)"
            }}
          >
            <PlusCircle size={18} /> Add New Department
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.75rem" }}>
        <button
          onClick={() => setActiveTab("departments")}
          style={{
            background: activeTab === "departments" ? "#0ea5e9" : "#f8fafc",
            color: activeTab === "departments" ? "#ffffff" : "#475569",
            border: activeTab === "departments" ? "none" : "1px solid #cbd5e1",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <Building2 size={18} /> Departments & Beds
        </button>
        <button
          onClick={() => setActiveTab("appointments")}
          style={{
            background: activeTab === "appointments" ? "#0ea5e9" : "#f8fafc",
            color: activeTab === "appointments" ? "#ffffff" : "#475569",
            border: activeTab === "appointments" ? "none" : "1px solid #cbd5e1",
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <Calendar size={18} /> Doctor Appointments ({appointments.length})
        </button>
      </div>

      {/* TAB 1: DEPARTMENTS CRUD */}
      {activeTab === "departments" && (
        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #e0f2fe", boxShadow: "0 4px 20px rgba(2, 132, 199, 0.04)", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.95rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f9ff", borderBottom: "1px solid #e0f2fe", color: "#0c4a6e" }}>
                <th style={{ padding: "1rem 1.25rem", fontWeight: "700" }}>Code & Name</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: "700" }}>Lead Doctor</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: "700" }}>Total Beds</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: "700" }}>Available Beds</th>
                <th style={{ padding: "1rem 1.25rem", fontWeight: "700", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => {
                const isEditing = editingId === dept.id;

                return (
                  <tr key={dept.id} style={{ borderBottom: "1px solid #f0f9ff" }}>
                    <td style={{ padding: "1rem 1.25rem" }}>
                      {isEditing ? (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <input type="text" style={{ width: "70px", padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} value={editFormData.code} onChange={(e) => setEditFormData({ ...editFormData, code: e.target.value })} />
                          <input type="text" style={{ flex: 1, padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} />
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontWeight: "700", color: "#0f172a" }}>{dept.name}</div>
                          <div style={{ fontSize: "0.78rem", color: "#0ea5e9", fontWeight: "600" }}>{dept.code}</div>
                        </div>
                      )}
                    </td>

                    <td style={{ padding: "1rem 1.25rem", color: "#475569" }}>
                      {isEditing ? (
                        <input type="text" style={{ width: "100%", padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} value={editFormData.leadDoctor} onChange={(e) => setEditFormData({ ...editFormData, leadDoctor: e.target.value })} />
                      ) : (
                        dept.leadDoctor
                      )}
                    </td>

                    <td style={{ padding: "1rem 1.25rem", color: "#334155" }}>
                      {isEditing ? (
                        <input type="number" style={{ width: "70px", padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} value={editFormData.totalBeds} onChange={(e) => setEditFormData({ ...editFormData, totalBeds: e.target.value })} />
                      ) : (
                        dept.totalBeds
                      )}
                    </td>

                    <td style={{ padding: "1rem 1.25rem" }}>
                      {isEditing ? (
                        <input type="number" style={{ width: "70px", padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }} value={editFormData.availableBeds} onChange={(e) => setEditFormData({ ...editFormData, availableBeds: e.target.value })} />
                      ) : (
                        <span style={{ fontWeight: "700", color: dept.availableBeds > 0 ? "#0284c7" : "#dc2626" }}>
                          {dept.availableBeds} Free
                        </span>
                      )}
                    </td>

                    <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                      {isEditing ? (
                        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                          <button onClick={() => handleSaveEdit(dept.id)} style={{ backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "0.4rem 0.6rem", borderRadius: "6px", cursor: "pointer" }}><Save size={16} /></button>
                          <button onClick={() => setEditingId(null)} style={{ backgroundColor: "#64748b", color: "#fff", border: "none", padding: "0.4rem 0.6rem", borderRadius: "6px", cursor: "pointer" }}><X size={16} /></button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                          <button onClick={() => handleStartEdit(dept)} style={{ backgroundColor: "#f0f9ff", color: "#0284c7", border: "1px solid #bae6fd", padding: "0.4rem 0.6rem", borderRadius: "6px", cursor: "pointer" }}><Edit size={16} /></button>
                          <button onClick={() => handleDelete(dept.id)} style={{ backgroundColor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", padding: "0.4rem 0.6rem", borderRadius: "6px", cursor: "pointer" }}><Trash2 size={16} /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: DOCTOR APPOINTMENTS SCHEDULE */}
      {activeTab === "appointments" && (
        <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "1.5rem", border: "1px solid #e0f2fe", boxShadow: "0 4px 20px rgba(2, 132, 199, 0.04)" }}>
          <h3 style={{ color: "#0c4a6e", marginTop: 0, marginBottom: "1rem" }}>🩺 Patient Appointments Schedule</h3>
          
          {appointments.length === 0 ? (
            <p style={{ color: "#64748b", padding: "2rem", textAlign: "center" }}>No appointments booked yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f0f9ff", borderBottom: "2px solid #e2e8f0", color: "#0c4a6e" }}>
                    <th style={{ padding: "10px" }}>Patient Name</th>
                    <th style={{ padding: "10px" }}>Email</th>
                    <th style={{ padding: "10px" }}>Department</th>
                    <th style={{ padding: "10px" }}>Date & Time</th>
                    <th style={{ padding: "10px" }}>Reason</th>
                    <th style={{ padding: "10px" }}>Status</th>
                    <th style={{ padding: "10px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((app) => (
                    <tr key={app._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "10px", fontWeight: "600", color: "#0f172a" }}>{app.patientName}</td>
                      <td style={{ padding: "10px", color: "#64748b" }}>{app.patientEmail}</td>
                      <td style={{ padding: "10px", color: "#0284c7", fontWeight: "600" }}>{app.department}</td>
                      <td style={{ padding: "10px", color: "#334155" }}>{app.appointmentDate} at {app.appointmentTime}</td>
                      <td style={{ padding: "10px", color: "#334155" }}>{app.reason}</td>
                      <td style={{ padding: "10px" }}>
                        <span style={{
                          padding: "0.2rem 0.6rem", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "700",
                          backgroundColor: app.status === "Completed" ? "#dcfce7" : app.status === "Cancelled" ? "#fee2e2" : "#dbeafe",
                          color: app.status === "Completed" ? "#15803d" : app.status === "Cancelled" ? "#991b1b" : "#1e40af"
                        }}>
                          {app.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px", textAlign: "right", display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                        <button onClick={() => updateAppointmentStatus(app._id, "Completed")} style={{ backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "0.35rem 0.6rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "600" }}>
                          Complete
                        </button>
                        <button onClick={() => updateAppointmentStatus(app._id, "Cancelled")} style={{ backgroundColor: "#dc2626", color: "#fff", border: "none", padding: "0.35rem 0.6rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "600" }}>
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Create New Department Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 100 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "2rem", borderRadius: "16px", maxWidth: "500px", width: "100%", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#0c4a6e", margin: 0 }}>Create Clinical Unit</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddDepartment} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.25rem" }}>Department Name</label>
                <input type="text" required placeholder="e.g. Orthopedic Trauma" value={newDept.name} onChange={(e) => setNewDept({ ...newDept, name: e.target.value })} style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.25rem" }}>Unit Code</label>
                  <input type="text" placeholder="ORTH-04" value={newDept.code} onChange={(e) => setNewDept({ ...newDept, code: e.target.value })} style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.25rem" }}>Lead Physician</label>
                  <input type="text" placeholder="Dr. Usman" value={newDept.leadDoctor} onChange={(e) => setNewDept({ ...newDept, leadDoctor: e.target.value })} style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.25rem" }}>Total Beds</label>
                  <input type="number" value={newDept.totalBeds} onChange={(e) => setNewDept({ ...newDept, totalBeds: e.target.value })} style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.25rem" }}>Available Beds</label>
                  <input type="number" value={newDept.availableBeds} onChange={(e) => setNewDept({ ...newDept, availableBeds: e.target.value })} style={{ width: "100%", padding: "0.65rem", borderRadius: "8px", border: "1px solid #cbd5e1" }} />
                </div>
              </div>

              <button type="submit" style={{ backgroundColor: "#0ea5e9", color: "#ffffff", padding: "0.75rem", borderRadius: "8px", fontWeight: "700", border: "none", cursor: "pointer", marginTop: "0.5rem" }}>
                Create Unit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
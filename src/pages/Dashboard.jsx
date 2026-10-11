import { useState } from "react";
import { PlusCircle, Edit, Trash2, Save, X, Building2, Bed, Check } from "lucide-react";
import { mockDepartments } from "../data/mockData";

export default function Dashboard() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [editingId, setEditingId] = useState(null);

  // Form State for Editing
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

  // Start Editing
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

  // Save Edit
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "#0c4a6e", margin: "0 0 0.5rem 0" }}>
            Hospital Operations CRUD Hub
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Manage clinical unit configurations, bed allocation counters, and head doctors.
          </p>
        </div>

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
      </div>

      {/* CRUD Data Table */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e0f2fe",
          boxShadow: "0 4px 20px rgba(2, 132, 199, 0.04)",
          overflowX: "auto"
        }}
      >
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
                  {/* Name & Code */}
                  <td style={{ padding: "1rem 1.25rem" }}>
                    {isEditing ? (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <input
                          type="text"
                          style={{ width: "70px", padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                          value={editFormData.code}
                          onChange={(e) => setEditFormData({ ...editFormData, code: e.target.value })}
                        />
                        <input
                          type="text"
                          style={{ flex: 1, padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        />
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontWeight: "700", color: "#0f172a" }}>{dept.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#0ea5e9", fontWeight: "600" }}>{dept.code}</div>
                      </div>
                    )}
                  </td>

                  {/* Doctor */}
                  <td style={{ padding: "1rem 1.25rem", color: "#475569" }}>
                    {isEditing ? (
                      <input
                        type="text"
                        style={{ width: "100%", padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                        value={editFormData.leadDoctor}
                        onChange={(e) => setEditFormData({ ...editFormData, leadDoctor: e.target.value })}
                      />
                    ) : (
                      dept.leadDoctor
                    )}
                  </td>

                  {/* Total Beds */}
                  <td style={{ padding: "1rem 1.25rem", color: "#334155" }}>
                    {isEditing ? (
                      <input
                        type="number"
                        style={{ width: "70px", padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                        value={editFormData.totalBeds}
                        onChange={(e) => setEditFormData({ ...editFormData, totalBeds: e.target.value })}
                      />
                    ) : (
                      dept.totalBeds
                    )}
                  </td>

                  {/* Available Beds */}
                  <td style={{ padding: "1rem 1.25rem" }}>
                    {isEditing ? (
                      <input
                        type="number"
                        style={{ width: "70px", padding: "0.4rem", borderRadius: "6px", border: "1px solid #cbd5e1" }}
                        value={editFormData.availableBeds}
                        onChange={(e) => setEditFormData({ ...editFormData, availableBeds: e.target.value })}
                      />
                    ) : (
                      <span style={{ fontWeight: "700", color: dept.availableBeds > 0 ? "#0284c7" : "#dc2626" }}>
                        {dept.availableBeds} Free
                      </span>
                    )}
                  </td>

                  {/* Action Buttons */}
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                    {isEditing ? (
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <button
                          onClick={() => handleSaveEdit(dept.id)}
                          style={{ backgroundColor: "#16a34a", color: "#fff", border: "none", padding: "0.4rem 0.6rem", borderRadius: "6px", cursor: "pointer" }}
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          style={{ backgroundColor: "#64748b", color: "#fff", border: "none", padding: "0.4rem 0.6rem", borderRadius: "6px", cursor: "pointer" }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <button
                          onClick={() => handleStartEdit(dept)}
                          style={{ backgroundColor: "#f0f9ff", color: "#0284c7", border: "1px solid #bae6fd", padding: "0.4rem 0.6rem", borderRadius: "6px", cursor: "pointer" }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(dept.id)}
                          style={{ backgroundColor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", padding: "0.4rem 0.6rem", borderRadius: "6px", cursor: "pointer" }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
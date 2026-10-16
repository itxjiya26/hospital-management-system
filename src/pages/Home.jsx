import { API_URL } from "../api"; // Adjust the path if needed depending on where the file is located in 'src'
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Activity, ShieldAlert, Bed, Ambulance, ArrowRight, Building2 } from "lucide-react";
import axios from "axios";

export default function Home() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/departments`)
      .then(res => setDepartments(res.data))
      .catch(err => console.error("Failed to load departments:", err));
  }, []);

  const totalBedsAvailable = departments.reduce(
    (acc, dept) => acc + (dept.availableBeds || 0),
    0
  );

  return (
    <div style={{ color: "#0f172a", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={{ 
        position: "relative",
        backgroundImage: "linear-gradient(rgba(12, 74, 110, 0.88), rgba(7, 89, 133, 0.92)), url('https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "5rem 2rem 4.5rem 2rem", 
        textAlign: "center",
        color: "#ffffff",
        borderBottom: "1px solid #e0f2fe"
      }}>
        <div style={{ 
          display: "inline-flex", 
          alignItems: "center", 
          gap: "0.5rem", 
          backgroundColor: "rgba(224, 242, 254, 0.15)", 
          border: "1px solid rgba(186, 230, 253, 0.3)",
          padding: "0.4rem 1rem", 
          borderRadius: "20px", 
          color: "#38bdf8", 
          fontSize: "0.88rem", 
          fontWeight: "600",
          marginBottom: "1.5rem" 
        }}>
          <Activity size={16} /> Real-Time Bed & Triage Network
        </div>
        
        <h1 style={{ fontSize: "2.75rem", margin: "0 0 1rem 0", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.03em" }}>
          Smart Clinical Ops & Emergency Dispatch
        </h1>
        
        <p style={{ maxWidth: "620px", margin: "0 auto 2.2rem auto", color: "#cbd5e1", fontSize: "1.1rem", lineHeight: "1.7" }}>
          Instant visibility into bed capacity, triage priorities, and critical equipment across hospital units.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/departments" style={{ 
            backgroundColor: "#0ea5e9", 
            color: "#ffffff", 
            padding: "0.85rem 1.6rem", 
            borderRadius: "10px", 
            textDecoration: "none", 
            fontWeight: "600", 
            boxShadow: "0 4px 14px rgba(14, 165, 233, 0.35)",
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem" 
          }}>
            Explore Departments <ArrowRight size={18} />
          </Link>
          <Link to="/triage-queue" style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.1)", 
            color: "#ffffff", 
            border: "1px solid rgba(186, 230, 253, 0.4)",
            padding: "0.85rem 1.6rem", 
            borderRadius: "10px", 
            textDecoration: "none", 
            fontWeight: "600", 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "0.5rem",
            backdropFilter: "blur(4px)"
          }}>
            Emergency Queue <Ambulance size={18} />
          </Link>
        </div>
      </section>

      {/* Stats Summary Row */}
      <section style={{ maxWidth: "1050px", margin: "2.5rem auto", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          
          <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "14px", border: "1px solid #e0f2fe", boxShadow: "0 4px 20px rgba(2, 132, 199, 0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "500" }}>Available Beds</span>
              <Bed size={20} color="#0ea5e9" />
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: "700", marginTop: "0.4rem", color: "#0c4a6e" }}>
              {totalBedsAvailable}
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "14px", border: "1px solid #e0f2fe", boxShadow: "0 4px 20px rgba(2, 132, 199, 0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "500" }}>Active Departments</span>
              <Building2 size={20} color="#0ea5e9" />
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: "700", marginTop: "0.4rem", color: "#0c4a6e" }}>
              {departments.length}
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "14px", border: "1px solid #e0f2fe", boxShadow: "0 4px 20px rgba(2, 132, 199, 0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: "500" }}>Network Status</span>
              <ShieldAlert size={20} color="#0284c7" />
            </div>
            <div style={{ fontSize: "1.25rem", fontWeight: "700", marginTop: "0.8rem", color: "#0369a1" }}>
              Operational
            </div>
          </div>

        </div>
      </section>

      {/* Department Cards Grid */}
      <section style={{ maxWidth: "1050px", margin: "0 auto", padding: "0 1.5rem 4rem 1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0c4a6e", marginBottom: "1.25rem" }}>
          Specialized Emergency Units
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {departments.map((dept) => (
            <div key={dept._id} style={{ 
              backgroundColor: "#ffffff", 
              border: "1px solid #e0f2fe", 
              borderRadius: "14px", 
              padding: "1.75rem",
              boxShadow: "0 4px 16px rgba(2, 132, 199, 0.03)"
            }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#0284c7", fontSize: "1.2rem", fontWeight: "700" }}>{dept.name}</h3>
              <p style={{ color: "#64748b", fontSize: "0.92rem", marginBottom: "1.25rem", lineHeight: "1.5" }}>
                {dept.description || "Comprehensive clinical unit equipped for specialized patient care."}
              </p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid #f0f9ff" }}>
                <span style={{ fontSize: "0.88rem", color: "#0369a1", fontWeight: "600", backgroundColor: "#f0f9ff", padding: "0.3rem 0.75rem", borderRadius: "6px" }}>
                  {dept.availableBeds ?? 0} Open Beds
                </span>
                <Link to="/departments" style={{ color: "#0ea5e9", fontWeight: "600", fontSize: "0.9rem", textDecoration: "none" }}>
                  Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
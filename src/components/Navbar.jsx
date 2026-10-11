import { NavLink } from "react-router-dom";
import { Activity } from "lucide-react";

export default function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Departments", path: "/departments" },
    { name: "Triage Queue", path: "/triage-queue" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Portal Login", path: "/auth" },
  ];

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0f2fe",
        padding: "0.9rem 2.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(2, 132, 199, 0.05)",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "38px",
            height: "38px",
            backgroundColor: "#0ea5e9",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)"
          }}
        >
          <Activity size={22} />
        </div>
        <span style={{ fontSize: "1.3rem", fontWeight: "700", color: "#0f172a", letterSpacing: "-0.02em" }}>
          CareGrid <span style={{ color: "#0ea5e9" }}>Health</span>
        </span>
      </div>

      <nav style={{ display: "flex", gap: "0.5rem" }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              color: isActive ? "#0284c7" : "#475569",
              fontWeight: isActive ? "600" : "500",
              fontSize: "0.95rem",
              padding: "0.55rem 1rem",
              borderRadius: "8px",
              backgroundColor: isActive ? "#e0f2fe" : "transparent",
              transition: "all 0.2s ease"
            })}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
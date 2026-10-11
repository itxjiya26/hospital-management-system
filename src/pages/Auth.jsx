import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Mail, User, Building, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Doctor / Triage Nurse");

  // State for Feedback Messages
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMessage("");

    // Form Validation Rules
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid hospital email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (!isLogin && !fullName.trim()) {
      setErrorMessage("Full Name is required for registration.");
      return;
    }

    // Process Submission
    if (isLogin) {
      setSuccessMsg("Authentication successful! Redirecting to Dashboard...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } else {
      setSuccessMsg("Account registered successfully! Please sign in.");
      setTimeout(() => {
        setIsLogin(true);
        setSuccessMsg("");
        setEmail("");
        setPassword("");
        setFullName("");
      }, 1500);
    }
  };

  return (
    <div
      style={{
        padding: "3rem 1.5rem",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e0f2fe",
          boxShadow: "0 10px 30px rgba(2, 132, 199, 0.08)",
          width: "100%",
          maxWidth: "460px",
          padding: "2.5rem"
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              backgroundColor: "#e0f2fe",
              color: "#0ea5e9",
              borderRadius: "14px",
              marginBottom: "1rem"
            }}
          >
            <Shield size={28} />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0c4a6e", margin: "0 0 0.4rem 0" }}>
            {isLogin ? "Staff Portal Login" : "Register Staff Account"}
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
            {isLogin
              ? "Access live emergency queue & department management"
              : "Create an authorized account for hospital personnel"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#f0f9ff",
            padding: "0.25rem",
            borderRadius: "10px",
            marginBottom: "1.5rem",
            border: "1px solid #bae6fd"
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setSuccessMsg("");
              setErrorMessage("");
            }}
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "700",
              fontSize: "0.9rem",
              cursor: "pointer",
              backgroundColor: isLogin ? "#ffffff" : "transparent",
              color: isLogin ? "#0284c7" : "#64748b",
              boxShadow: isLogin ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
              transition: "all 0.2s"
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setSuccessMsg("");
              setErrorMessage("");
            }}
            style={{
              flex: 1,
              padding: "0.6rem",
              borderRadius: "8px",
              border: "none",
              fontWeight: "700",
              fontSize: "0.9rem",
              cursor: "pointer",
              backgroundColor: !isLogin ? "#ffffff" : "transparent",
              color: !isLogin ? "#0284c7" : "#64748b",
              boxShadow: !isLogin ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
              transition: "all 0.2s"
            }}
          >
            Register
          </button>
        </div>

        {/* Visible Validation Error Alert */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              padding: "0.85rem",
              borderRadius: "10px",
              fontSize: "0.88rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem"
            }}
          >
            <AlertCircle size={18} />
            {errorMessage}
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div
            style={{
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#15803d",
              padding: "0.85rem",
              borderRadius: "10px",
              fontSize: "0.88rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem"
            }}
          >
            <CheckCircle2 size={18} />
            {successMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {!isLogin && (
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Full Name
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "0.65rem 0.8rem" }}>
                <User size={18} color="#0ea5e9" />
                <input
                  type="text"
                  placeholder="Dr. Sarah Ahmed"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ border: "none", outline: "none", width: "100%", fontSize: "0.92rem" }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
              Hospital Email
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "0.65rem 0.8rem" }}>
              <Mail size={18} color="#0ea5e9" />
              <input
                type="email"
                placeholder="staff@hospital.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: "none", outline: "none", width: "100%", fontSize: "0.92rem" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
              Password
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "0.65rem 0.8rem" }}>
              <Lock size={18} color="#0ea5e9" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "none", outline: "none", width: "100%", fontSize: "0.92rem" }}
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "0.3rem" }}>
                Designation / Role
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "0.65rem 0.8rem", backgroundColor: "#fff" }}>
                <Building size={18} color="#0ea5e9" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ border: "none", outline: "none", width: "100%", fontSize: "0.92rem", backgroundColor: "transparent" }}
                >
                  <option value="Doctor / Triage Nurse">Doctor / Triage Nurse</option>
                  <option value="Department Head">Department Head</option>
                  <option value="Hospital Administrator">Hospital Administrator</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "#0ea5e9",
              color: "#ffffff",
              padding: "0.85rem",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "0.98rem",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "0.5rem",
              boxShadow: "0 4px 12px rgba(14, 165, 233, 0.3)"
            }}
          >
            {isLogin ? "Sign In to Portal" : "Complete Registration"} <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.85rem", color: "#64748b" }}>
          {isLogin ? "Don't have staff credentials? " : "Already registered? "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setSuccessMsg("");
              setErrorMessage("");
            }}
            style={{ background: "none", border: "none", color: "#0ea5e9", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }}
          >
            {isLogin ? "Request Access" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
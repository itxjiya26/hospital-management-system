import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <footer style={{ backgroundColor: "#3b82f6", color: "#ffffff", padding: "3rem 2rem 2rem 2rem", marginTop: "auto" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
        
        {/* Column 1: Hospital Details */}
        <div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: "700", margin: "0 0 1rem 0", lineHeight: "1.2" }}>
            CareGrid<br />Health
          </h2>
          <p style={{ margin: "0.5rem 0", fontSize: "0.95rem", opacity: 0.95 }}>
            <strong>Address:</strong> STJIT, Ranebennur
          </p>
          <p style={{ margin: "0.5rem 0", fontSize: "0.95rem", opacity: 0.95 }}>
            <strong>Call Us:</strong> 9672574287
          </p>
          <p style={{ margin: "0.5rem 0", fontSize: "0.95rem", opacity: 0.95 }}>
            <strong>Email:</strong> hsptlmgmt@gmail.com
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "700", margin: "0 0 1.2rem 0" }}>
            Quick Links
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <li>
              <Link to="/" style={{ color: "#ffffff", textDecoration: "none", fontSize: "0.95rem", opacity: 0.9 }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/departments" style={{ color: "#ffffff", textDecoration: "none", fontSize: "0.95rem", opacity: 0.9 }}>
                Departments
              </Link>
            </li>
            <li>
              <Link to="/auth" style={{ color: "#ffffff", textDecoration: "none", fontSize: "0.95rem", opacity: 0.9 }}>
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Us Form */}
        <div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "700", margin: "0 0 1.2rem 0" }}>
            Contact Us
          </h3>

          {submitted ? (
            <div style={{ backgroundColor: "#ffffff", color: "#2563eb", padding: "1rem", borderRadius: "8px", fontWeight: "600", textAlign: "center" }}>
              Thank you! Your message has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #ffffff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #ffffff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
              />
              <textarea
                placeholder="Leave Your Message"
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "8px", border: "1px solid #ffffff", fontSize: "0.9rem", outline: "none", resize: "none", boxSizing: "border-box" }}
              ></textarea>
              <button
                type="submit"
                style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "none", backgroundColor: "#ffffff", color: "#2563eb", fontWeight: "700", fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s ease" }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </footer>
  );
}
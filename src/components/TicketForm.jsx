import React, { useState } from "react";
import { submitTicket } from "../services/api";

export default function TicketForm({ onSubmit }) {
  const [form, setForm] = useState({
    user_email: "",
    issue_description: "",
    category: "General",
    priority: "Medium",
    status: "New",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await submitTicket(form);
      onSubmit({ ...form, ...data });
    } catch (err) {
      console.error(err);
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    form: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "30px",
      background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
      border: "1px solid #e9ecef",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      transition: "all 0.3s ease",
    },
    label: {
      display: "block",
      marginBottom: "20px",
      color: "#2b2d42",
      fontSize: "15px",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      marginTop: "8px",
      border: "2px solid #e9ecef",
      borderRadius: "10px",
      fontSize: "15px",
      transition: "all 0.3s ease",
      background: "#ffffff",
      outline: "none",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "14px 16px",
      marginTop: "8px",
      border: "2px solid #e9ecef",
      borderRadius: "10px",
      fontSize: "15px",
      transition: "all 0.3s ease",
      background: "#ffffff",
      outline: "none",
      minHeight: "120px",
      resize: "vertical",
      fontFamily: "inherit",
      boxSizing: "border-box",
    },
    select: {
  width: "100%",
  padding: "14px 16px",
  marginTop: "8px",
  border: "2px solid #e9ecef",
  borderRadius: "10px",
  fontSize: "15px",
  backgroundColor: "#ffffff",
  color: "#2b2d42",
  appearance: "none",
  
  backgroundOrigin: "border-box",
  backgroundClip: "padding-box, border-box",
  outline: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxSizing: "border-box",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  backgroundSize: "14px auto",
},

    button: {
      width: "100%",
      padding: "16px",
      background: "linear-gradient(135deg, #4361ee, #3f37c9)",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "10px",
      boxShadow: "0 4px 12px rgba(67, 97, 238, 0.3)",
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 15px rgba(67, 97, 238, 0.4)",
    },
    buttonDisabled: {
      background: "linear-gradient(135deg, #adb5bd, #6c757d)",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },
    error: {
      color: "#e63946",
      fontSize: "14px",
      marginTop: "15px",
      padding: "12px",
      background: "rgba(230, 57, 70, 0.1)",
      borderRadius: "8px",
      border: "1px solid rgba(230, 57, 70, 0.2)",
      textAlign: "center",
    },
    heading: {
      textAlign: "center",
      color: "#2b2d42",
      marginBottom: "30px",
      fontSize: "28px",
      fontWeight: "700",
      background: "linear-gradient(135deg, #4361ee, #4cc9f0)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    fieldGroup: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginBottom: "25px",
    },
  };

  const getInputStyle = (baseStyle) => ({
    ...baseStyle,
    ...(loading ? { opacity: 0.7, cursor: "not-allowed" } : {}),
  });

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h2 style={styles.heading}>Create Support Ticket</h2>

      <label style={styles.label}>
        Email Address:
        <input
          type="email"
          name="user_email"
          value={form.user_email}
          onChange={handleChange}
          required
          disabled={loading}
          style={getInputStyle(styles.input)}
          placeholder="Enter your email address"
        />
      </label>

      <label style={styles.label}>
        Issue Description:
        <textarea
          name="issue_description"
          value={form.issue_description}
          onChange={handleChange}
          required
          disabled={loading}
          style={getInputStyle(styles.textarea)}
          placeholder="Please describe your issue in detail..."
        />
      </label>

      <div style={styles.fieldGroup}>
        <label style={styles.label}>
          Category:
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            disabled={loading}
            style={getInputStyle(styles.input)}
            placeholder="General"
          />
        </label>

        <label style={styles.label}>
          Priority:
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            disabled={loading}
            style={getInputStyle(styles.select)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </div>

      <label style={styles.label}>
        Status:
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          disabled={loading}
          style={getInputStyle(styles.select)}
        >
          <option value="New">New</option>
          <option value="Resolved">Resolved</option>
          <option value="Escalated">Escalated</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={loading}
        style={{
          ...styles.button,
          ...(loading ? styles.buttonDisabled : {}),
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.target.style.transform = styles.buttonHover.transform;
            e.target.style.boxShadow = styles.buttonHover.boxShadow;
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.target.style.transform = "none";
            e.target.style.boxShadow = styles.button.boxShadow;
          }
        }}
      >
        {loading ? (
          <>
            <span style={{ marginRight: "8px" }}>⏳</span>
            Submitting Ticket...
          </>
        ) : (
          <>
            <span style={{ marginRight: "8px" }}>🚀</span>
            Submit Ticket
          </>
        )}
      </button>

      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
}

import React from "react";

export default function TicketCard({ ticket }) {
  if (!ticket) return null;

  const {
    ticket_id = "N/A",
    user_email = "Not provided",
    issue_description = "Not provided",
    priority = "Not provided"
  } = ticket;

  const styles = {
    card: {
      maxWidth: "600px",
      margin: "20px auto",
      padding: "30px",
      background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
      border: "1px solid #e9ecef",
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      animation: "slideUp 0.6s ease-out",
      position: "relative",
      overflow: "hidden"
    },
    successBadge: {
      position: "absolute",
      top: "0",
      right: "0",
      background: "linear-gradient(135deg, #4ade80, #22c55e)",
      color: "white",
      padding: "8px 16px",
      fontSize: "12px",
      fontWeight: "600",
      borderBottomLeftRadius: "12px",
      boxShadow: "0 2px 10px rgba(74, 222, 128, 0.3)"
    },
    heading: {
      textAlign: "center",
      color: "#2b2d42",
      marginBottom: "25px",
      fontSize: "24px",
      fontWeight: "700",
      background: "linear-gradient(135deg, #4361ee, #4cc9f0)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px"
    },
    ticketId: {
      background: "linear-gradient(135deg, #4361ee, #3f37c9)",
      color: "white",
      padding: "12px 20px",
      borderRadius: "10px",
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "18px",
      fontWeight: "600",
      boxShadow: "0 4px 12px rgba(67, 97, 238, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    },
    detailRow: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "20px",
      padding: "16px",
      background: "#ffffff",
      borderRadius: "10px",
      border: "1px solid #f1f3f4",
      transition: "all 0.3s ease"
    },
    detailRowHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      borderColor: "#4361ee"
    },
    label: {
      fontWeight: "600",
      color: "#2b2d42",
      minWidth: "80px",
      fontSize: "14px",
      marginRight: "15px"
    },
    value: {
      color: "#4b5563",
      fontSize: "15px",
      lineHeight: "1.5",
      flex: "1"
    },
    priorityBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    priorityLow: {
      background: "rgba(34, 197, 94, 0.1)",
      color: "#16a34a",
      border: "1px solid rgba(34, 197, 94, 0.3)"
    },
    priorityMedium: {
      background: "rgba(245, 158, 11, 0.1)",
      color: "#d97706",
      border: "1px solid rgba(245, 158, 11, 0.3)"
    },
    priorityHigh: {
      background: "rgba(239, 68, 68, 0.1)",
      color: "#dc2626",
      border: "1px solid rgba(239, 68, 68, 0.3)"
    },
    icon: {
      marginRight: "8px",
      fontSize: "14px"
    },
    footer: {
      textAlign: "center",
      marginTop: "25px",
      padding: "16px",
      background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      borderRadius: "10px",
      fontSize: "14px",
      color: "#6b7280",
      border: "1px solid #e5e7eb"
    },
    animation: `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
    `
  };

  const getPriorityStyle = (priority) => {
    const priorityMap = {
      'Low': styles.priorityLow,
      'Medium': styles.priorityMedium,
      'High': styles.priorityHigh
    };
    return { ...styles.priorityBadge, ...priorityMap[priority] || styles.priorityMedium };
  };

  const getPriorityIcon = (priority) => {
    const iconMap = {
      'Low': '🔵',
      'Medium': '🟡',
      'High': '🔴'
    };
    return iconMap[priority] || '⚪';
  };

  return (
    <>
      <style>{styles.animation}</style>
      <div 
        style={styles.card}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = styles.card.boxShadow;
        }}
      >
        <div style={styles.successBadge}>
          ✅ Success
        </div>
        
        <h3 style={styles.heading}>
          <span>🎫</span>
          Ticket Submitted Successfully!
        </h3>
        
        <div style={styles.ticketId}>
          <span>🆔</span>
          Ticket ID: {ticket_id}
        </div>
        
        <div 
          style={styles.detailRow}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = styles.detailRowHover.transform;
            e.currentTarget.style.boxShadow = styles.detailRowHover.boxShadow;
            e.currentTarget.style.borderColor = styles.detailRowHover.borderColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = styles.detailRow.borderColor;
          }}
        >
          <span style={styles.label}>📧 Email:</span>
          <span style={styles.value}>{user_email}</span>
        </div>
        
        <div 
          style={styles.detailRow}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = styles.detailRowHover.transform;
            e.currentTarget.style.boxShadow = styles.detailRowHover.boxShadow;
            e.currentTarget.style.borderColor = styles.detailRowHover.borderColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = styles.detailRow.borderColor;
          }}
        >
          <span style={styles.label}>📝 Issue:</span>
          <span style={styles.value}>{issue_description}</span>
        </div>
        
        <div 
          style={styles.detailRow}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = styles.detailRowHover.transform;
            e.currentTarget.style.boxShadow = styles.detailRowHover.boxShadow;
            e.currentTarget.style.borderColor = styles.detailRowHover.borderColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = styles.detailRow.borderColor;
          }}
        >
          <span style={styles.label}>⚡ Priority:</span>
          <span style={styles.value}>
            <span style={getPriorityStyle(priority)}>
              <span style={styles.icon}>{getPriorityIcon(priority)}</span>
              {priority}
            </span>
          </span>
        </div>
        
        <div style={styles.footer}>
          🕒 Our team will review your ticket and get back to you within 24 hours.
        </div>
      </div>
    </>
  );
}
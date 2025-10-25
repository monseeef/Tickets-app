// In src/components/TicketCard.jsx
import React from "react";
import "./TicketCard.css"; // We'll create this next

const TicketCard = ({ ticket, onDelete, onEdit }) => {
  // The prompt requires specific colors.
  // We add a class based on the status.
  const getStatusClass = (status) => {
    switch (status) {
      case "open":
        return "status-open"; // Green
      case "in_progress":
        return "status-in-progress"; // Amber
      case "closed":
        return "status-closed"; // Gray
      default:
        return "";
    }
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className={`ticket-status ${getStatusClass(ticket.status)}`}>{ticket.status.replace("_", " ")}</span>
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <p className="ticket-description">{ticket.description || "No description"}</p>
      <div className="ticket-actions">
        <button className="btn-edit" onClick={onEdit}>
          Edit
        </button>
        <button className="btn-delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TicketCard;

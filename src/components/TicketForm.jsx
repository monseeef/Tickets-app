// In src/components/TicketForm.jsx
import React, { useState, useEffect } from "react";
import "./TicketForm.css"; // We'll create this next

const TicketForm = ({ onSubmit, onCancel, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState(initialData?.status || "open"); // Default to 'open'
  const [error, setError] = useState("");

  // 3. This effect updates the form if the ticket-to-edit changes
  // (e.g., you close the modal and open a *different* ticket)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    } else {
      // If we're creating a new one, reset the form
      setTitle("");
      setDescription("");
      setStatus("open");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // This is our inline validation!
    if (!title || !status) {
      setError("Title and status fields are mandatory.");
      return;
    }

    // Pass the data up to the parent component
    // The parent will call the useTickets.createTicket function
    const validationError = onSubmit({ title, description, status });

    if (validationError) {
      setError(validationError);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      {/* This is our inline error display */}
      {error && <div className="form-error-inline">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="status">Status *</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          Save Ticket
        </button>
      </div>
    </form>
  );
};

export default TicketForm;

import React, { useState } from "react";
import { useTickets } from "../hooks/useTickets";
import TicketCard from "../components/TicketCard";
import Modal from "../components/Modal";
import TicketForm from "../components/TicketForm";
import "./Tickets.css";
import toast from "react-hot-toast";

const Tickets = () => {
  const { tickets, loading, error, createTicket, deleteTicket, updateTicket } = useTickets();

  // State for controlling the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ticketToEdit, setTicketToEdit] = useState(null);

  const handleTicketSubmit = (ticketData) => {
    let validationError = null;

    if (ticketToEdit) {
      // We are in "Edit" mode
      validationError = updateTicket(ticketToEdit.id, ticketData);
      if (!validationError) {
        toast.success("Ticket updated successfully!"); // <-- 2. Add toast
      }
    } else {
      // We are in "Create" mode
      validationError = createTicket(ticketData);
      if (!validationError) {
        toast.success("Ticket created successfully!"); // <-- 2. Add toast
      }
    }

    if (validationError) {
      return validationError; // Show error in form
    } else {
      handleCloseModal(); // All good, close modal
      return null;
    }
  };
  const handleOpenCreateModal = () => {
    setTicketToEdit(null); // Make sure it's null (for create mode)
    setIsModalOpen(true);
  };
  const handleOpenEditModal = (ticket) => {
    setTicketToEdit(ticket); // Set the ticket to edit
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTicketToEdit(null); // Always clear the edit state on close
  };
  // 2. Create the delete handler
  const handleDeleteTicket = (id) => {
    // Use a simple built-in confirm box, as required
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      deleteTicket(id);
      toast.success("Ticket deleted.");
    }
  };

  return (
    <div className="tickets-page-container">
      <header className="tickets-header">
        <h2>Ticket Management</h2>
        {/* We will make this button open a modal */}
        <button className="btn-primary-action" onClick={handleOpenCreateModal}>
          Create New Ticket
        </button>
      </header>

      {/* Handle loading and error states */}
      {loading && <p>Loading tickets...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Handle no tickets */}
      {!loading && !error && tickets.length === 0 && (
        <div className="no-tickets-found">
          <p>No tickets found. Get started by creating one!</p>
        </div>
      )}

      {/* The main ticket list */}
      {!loading && !error && tickets.length > 0 && (
        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDelete={() => handleDeleteTicket(ticket.id)}
              onEdit={() => handleOpenEditModal(ticket)}
            />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Ticket">
        <TicketForm onSubmit={handleTicketSubmit} onCancel={handleCloseModal} initialData={ticketToEdit} />
      </Modal>
    </div>
  );
};

export default Tickets;

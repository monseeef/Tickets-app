// In src/hooks/useTickets.js
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // For creating unique IDs

const TICKETS_KEY = "ticketapp_tickets"; // Our localStorage key

// A little helper function to get tickets from localStorage
const getInitialData = () => {
  try {
    const storedData = localStorage.getItem(TICKETS_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Failed to parse tickets from localStorage", error);
    return [];
  }
};

// This is our new hook!
export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load tickets from localStorage on first render
  useEffect(() => {
    setTickets(getInitialData());
    setLoading(false);
  }, []);

  // Helper function to save updates to state AND localStorage
  const saveTickets = (newTickets) => {
    try {
      localStorage.setItem(TICKETS_KEY, JSON.stringify(newTickets));
      setTickets(newTickets);
      setError(null);
    } catch (error) {
      console.error("Failed to save tickets", error);
      setError("Failed to save tickets.");
    }
  };

  // --- CREATE Function ---
  // We'll return an error message string for validation
  const createTicket = (ticketData) => {
    const { title, status } = ticketData;

    // Validation per the rules
    if (!title || !status) {
      return "Title and status are mandatory.";
    }
    const validStatuses = ["open", "in_progress", "closed"];
    if (!validStatuses.includes(status)) {
      return 'Status must be "open", "in_progress", or "closed".';
    }

    // All good, create the ticket
    const newTicket = {
      id: uuidv4(), // Generate a unique ID
      ...ticketData,
      createdAt: new Date().toISOString(),
    };

    saveTickets([...tickets, newTicket]);
    return null; // No error!
  };

  // --- UPDATE Function ---
  const updateTicket = (id, updatedData) => {
    const { title, status } = updatedData;

    // Validation per the rules
    if (!title || !status) {
      return "Title and status are mandatory.";
    }
    const validStatuses = ["open", "in_progress", "closed"];
    if (!validStatuses.includes(status)) {
      return 'Status must be "open", "in_progress", or "closed".';
    }

    // Find and update the ticket
    const newTickets = tickets.map((ticket) => (ticket.id === id ? { ...ticket, ...updatedData } : ticket));

    saveTickets(newTickets);
    return null; // No error!
  };

  // --- DELETE Function ---
  const deleteTicket = (id) => {
    // Confirmation is handled in the UI
    const newTickets = tickets.filter((ticket) => ticket.id !== id);
    saveTickets(newTickets);
  };

  // --- EXPORT THE NEW FUNCTIONS ---
  return {
    tickets,
    loading,
    error,
    createTicket,
    updateTicket,
    deleteTicket,
  };
};

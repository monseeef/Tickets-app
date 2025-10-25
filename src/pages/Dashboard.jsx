// In src/pages/DashboardPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // For navigation
import { useAuth } from "../context/AuthContext"; // For logout
import { useTickets } from "../hooks/useTickets";
import "./Dashboard.css"; // Import our new styles

const Dashboard = () => {
  const { session, logout } = useAuth(); // Get session info and logout function
  const { tickets } = useTickets();

  // Mock data for the stats.
  // Later, this data will come from our ticket management system.
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    resolved: tickets.filter((t) => t.status === "closed").length,
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        {/* Show who is logged in */}
        <h2>Welcome, {session}!</h2>

        {/* The visible Logout button */}
        <button onClick={logout} className="btn-logout">
          Log Out
        </button>
      </header>

      <h3>Your Ticket Summary</h3>

      {/* Summary Statistics */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Open Tickets</h3>
          <p className="stat-number">{stats.open}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved Tickets</h3>
          <p className="stat-number">{stats.resolved}</p>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="dashboard-nav">
        <h3>Manage Your Tickets</h3>
        <p>View, create, edit, and delete your support tickets.</p>
        <Link to="/tickets" className="btn-primary-action">
          Go to Ticket Management
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;

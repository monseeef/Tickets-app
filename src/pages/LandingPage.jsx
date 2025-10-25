import { useNavigate } from "react-router-dom";
import "./LandingPage";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* 1. Hero Section */}
      <section className="hero-section">
        {/* This will be our decorative circle */}
        <div className="deco-circle circle-1"></div>

        <div className="hero-content">
          <h1>Welcome to TicketApp 🎟️</h1>
          <p>Your one-stop solution for managing customer support tickets.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/auth/login")}>
              Login
            </button>
            <button className="btn-secondary" onClick={() => navigate("/auth/signup")}>
              Get Started
            </button>
          </div>
        </div>
        <div className="hero-wave"></div>
      </section>

      {/* 2. Features Section (with boxes) */}
      <section className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-box">
            <h3>Manage Tickets</h3>
            <p>Easily create, view, update, and delete tickets.</p>
          </div>
          <div className="feature-box">
            <h3>Track Status</h3>
            <p>Know the status of every ticket at a glance.</p>
          </div>
          <div className="feature-box">
            <h3>Secure Auth</h3>
            <p>Your data is safe and secure with our system.</p>
          </div>
        </div>
        {/* Another decorative circle */}
        <div className="deco-circle circle-2"></div>
      </section>
    </div>
  );
};

export default LandingPage;

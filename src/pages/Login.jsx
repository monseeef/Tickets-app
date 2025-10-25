// In src/pages/LoginPage.jsx
import React, { useState } from "react"; // <-- Import useState
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- Import useAuth
import "./AuthForm.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For failed logins
  const { login } = useAuth(); // Get the login function

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear old errors

    // Validation per instructions
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    // Try to log in
    const success = login(email, password); // This is our mock function

    if (!success) {
      // This is our "inline error message"
      setError("Invalid credentials. (Hint: test@user.com, password123)");
    }
    // If login IS successful, the AuthContext handles the redirect
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          {/* Simple inline error message */}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>
        <p className="auth-switch-link">
          Don't have an account? <Link to="/auth/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

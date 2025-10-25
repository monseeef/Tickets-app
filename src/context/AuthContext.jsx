// In src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// 1. Create the Context
const AuthContext = createContext(null);

const SESSION_KEY = "ticketapp_session";

// 2. Create the Provider
export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // On app load, check if a session already exists in localStorage
  useEffect(() => {
    const storedSession = localStorage.getItem(SESSION_KEY);
    if (storedSession) {
      setSession(storedSession);
    }
  }, []);

  // --- The Login Function ---
  const login = (email, password) => {
    // For this task, we'll accept a "test user"
    if (email === "test@user.com" && password === "password123") {
      // The "token" is just the email for this simulation
      const mockToken = email;

      localStorage.setItem(SESSION_KEY, mockToken); // <-- REQUIRED STEP
      setSession(mockToken);
      navigate("/dashboard");
      toast.success("Logged in successfully!");
      return true;
    }

    // Failed login
    return false;
  };

  // --- The Signup Function (bonus, good to have) ---
  const signup = (name, email, password) => {
    // We'll just log them in immediately
    const mockToken = email;
    localStorage.setItem(SESSION_KEY, mockToken); // <-- REQUIRED STEP
    setSession(mockToken);
    navigate("/dashboard");
    return true;
  };

  // --- The Logout Function ---
  const logout = () => {
    localStorage.removeItem(SESSION_KEY); // <-- REQUIRED STEP
    setSession(null);
    navigate("/auth/login");
    toast.success("Logged out.");
  };

  // The "value" is what all child components get
  const value = {
    session,
    isAuthenticated: !!session,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

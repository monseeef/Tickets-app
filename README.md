TicketApp - React Implementation

This is the React.js implementation of the Multi-Framework Ticket Web App. It is a complete, standalone application built with React, Vite, and React Router.

The app features a complete user authentication flow (simulated with localStorage) and full CRUD (Create, Read, Update, Delete) functionality for managing support tickets.

Features

Landing Page: A responsive hero page with a CSS-wave background.

Authentication: Secure login and signup pages.

Protected Routes: Dashboard and Ticket pages are only accessible to logged-in users.

Dashboard: Displays real-time summary statistics based on ticket status.

Ticket Management (CRUD):

Create: Create new tickets via a modal form.

Read: View all tickets in a responsive card grid.

Update: Edit existing tickets using the same modal form.

Delete: Remove tickets with a confirmation prompt.

Notifications: User-friendly success/error toasts for all actions.

Persistence: All user sessions and ticket data are persisted in localStorage.

Tech Stack (Frameworks & Libraries)

Core: React 18

Build Tool: Vite

Routing: react-router-dom

Global State (Auth): React Context

Local State (Tickets): Custom Hook (useTickets)

Notifications: react-hot-toast

Unique IDs: uuid

Styling: Plain CSS with a component-based structure.

Data Storage: localStorage

Setup & Running the App

Navigate to the directory:

cd ticket-react-app


Install dependencies:

npm install


Run the development server:

npm run dev


Open in your browser:
The app will be running at http://localhost:5173 (or the next available port).

Test User Credentials

You can use the following hard-coded test user to log in:

Email: test@user.com

Password: password123

Alternatively, you can create a new account on the "Sign Up" page. Any email/password will work, and you will be logged in immediately.

Project Structure & State

src/pages: Contains the top-level components for each route (e.g., LandingPage, Dashboard, Tickets).

src/components: Contains reusable UI elements used across various pages (e.g., MainLayout, TicketCard, Modal, TicketForm, ProtectedRoute).

src/context/AuthContext.jsx: A global state manager for authentication. It uses React Context to provide the session token, isAuthenticated boolean, and login()/logout() functions to the entire app. The session is persisted to localStorage under the key ticketapp_session.

src/hooks/useTickets.js: A custom hook that encapsulates all business logic for ticket management (CRUD). It manages the array of tickets, validates data, and syncs all changes to localStorage under the key ticketapp_tickets.

Notes

Accessibility: Basic accessibility is implemented using semantic HTML (<header>, <section>), form labels, and button elements. Focus states are browser defaults.

Known Issues: This is a frontend-only simulation. All data is stored in localStorage, which is not secure and is limited to the user's browser. The test user (test@user.com) is hard-coded in AuthContext.jsx.

Other Versions: This is the React version of the project. The other implementations can be found in the /vue-app and /twig-app folders in the root directory.
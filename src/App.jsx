import React, { useState } from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';

import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

function PrivateRoute({ authenticated, children }) {
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Navigation({ onLogout }) {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
      <NavLink to="/home" style={({ isActive }) => ({ marginRight: 10, color: isActive ? 'blue' : 'black' })}>
        Home
      </NavLink>
      <NavLink to="/about" style={({ isActive }) => ({ marginRight: 10, color: isActive ? 'blue' : 'black' })}>
        About Us
      </NavLink>
      <NavLink to="/contact" style={({ isActive }) => ({ marginRight: 10, color: isActive ? 'blue' : 'black' })}>
        Contact Us
      </NavLink>
      <button onClick={onLogout} style={{ marginLeft: 20, cursor: 'pointer' }}>
        Logout
      </button>
    </nav>
  );
}

export default function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const login = user => {
    setAuthenticatedUser(user);
  };

  const logout = () => {
    setAuthenticatedUser(null);
  };

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/login"
          element={
            authenticatedUser ? <Navigate to="/home" replace /> : <Login onLogin={login} />
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute authenticated={!!authenticatedUser}>
              <>
                <Navigation onLogout={logout} />
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

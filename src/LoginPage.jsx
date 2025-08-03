// src/LoginPage.jsx

import React from 'react';
import './index.css'; // Ensure your CSS is imported

export default function LoginPage({
  handleLogin,
  handleRegister,
  isRegistering,
  setIsRegistering,
  username,
  setUsername,
  password,
  setPassword
}) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission and page reload
    if (isRegistering) {
      handleRegister(username, password);
    } else {
      handleLogin(username, password);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">{isRegistering ? 'Register' : 'Login'}</h1>
        <p className="login-description">
          Please provide your credentials to continue.
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button
            type="submit"
            className="submit-button"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </form>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="toggle-mode-button"
        >
          {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
        </button>
      </div>
    </div>
  );
}
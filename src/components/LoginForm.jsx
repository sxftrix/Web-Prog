// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const DEFAULT_PASSWORD = 'password123';
    
    // Using a hardcoded user list to avoid API issues.
    const MOCK_USERS = [
      { id: 1, email: 'george.bluth@reqres.in', first_name: 'George', last_name: 'Bluth' },
      { id: 2, email: 'janet.weaver@reqres.in', first_name: 'Janet', last_name: 'Weaver' },
      { id: 3, email: 'emma.wong@reqres.in', first_name: 'Emma', last_name: 'Wong' },
    ];
    
    // Find the user by email in the mock data
    const userExists = MOCK_USERS.some((user) => user.email === email);

    if (password !== DEFAULT_PASSWORD) {
      setError('Invalid password.');
      setLoading(false);
      return;
    }

    if (userExists) {
      login();
      navigate('/dashboard');
    } else {
      setError('Invalid email or user not found.');
    }
    
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button form-button-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

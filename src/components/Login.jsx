import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const USERS = [
  { username: 'test', password: 'pass123' },

];

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const user = USERS.find(u => u.username === username && u.password === password);
    if (user) {
      onLogin(user);
      navigate('/home', { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: 400, marginTop: '6rem' }}>
      <h1>Welcome Back</h1>
      <form onSubmit={handleSubmit} aria-label="Login form">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
          required
          autoFocus
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        {error && <div className="error-message" role="alert">{error}</div>}
        <button type="submit" className="primary">Log In</button>
      </form>
    </div>
  );
}
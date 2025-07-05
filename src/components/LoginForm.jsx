import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('https://reqres.in/api/users');
        const data = await response.json();

        const user = data.data.find(user => user.email === email && password === "password123");
        
        if (user) {
            login();
            // Redirect to dashboard
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default LoginForm;

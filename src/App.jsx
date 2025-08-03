import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage.jsx';
import Dashboard from './Dashboard.jsx';
import './index.css';

import { auth, db } from './firebaseConfig.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setUsername('');
      setPassword('');
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading application...</div>;
  }

  return (
    <div>
      {user ? (
        <Dashboard user={user} handleLogout={handleLogout} db={db} />
      ) : (
        <LoginPage
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  );
}
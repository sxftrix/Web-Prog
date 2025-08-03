// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave, onCancel }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setAvatar(user.avatar);
    } else {
      setFirstName('');
      setLastName('');
      setEmail('');
      setAvatar('https://placehold.co/60x60/f0f0f0/666?text=New');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: user ? user.id : null,
      first_name,
      last_name,
      email,
      avatar,
    });
  };

  return (
    <div className="form-container">
      <h2>{user ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="avatar">Avatar URL:</label>
          <input
            type="text"
            id="avatar"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <button type="submit" className="form-button form-button-primary">Save</button>
        <button type="button" onClick={onCancel} className="form-button form-button-secondary">Cancel</button>
      </form>
    </div>
  );
};

export default UserForm;

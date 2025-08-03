// src/components/UserCard.jsx
import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <img
        src={user.avatar || 'https://via.placeholder.com/150'}
        alt={`${user.first_name} ${user.last_name}'s avatar`}
        className="user-card-avatar"
      />
      <div className="user-card-info">
        <h3>{user.first_name} {user.last_name}</h3>
        <p>{user.email}</p>
        <div className="user-card-actions">
          <button onClick={() => onEdit(user)} className="user-card-actions edit-button">Edit</button>
          <button onClick={() => onDelete(user.id)} className="user-card-actions delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

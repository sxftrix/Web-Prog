import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
    return (
        <div>
            <img src={user.avatar} alt={user.name} />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button onClick={() => onEdit(user.id, { ...user, name: 'New Name' })}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
    );
};

export default UserCard;

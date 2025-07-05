import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, avatar });
        setName('');
        setEmail('');
        setAvatar('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Avatar URL" />
            <button type="submit">Add User</button>
        </form>
    );
};

export default UserForm;

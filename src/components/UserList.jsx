import React, { useEffect, useRef } from 'react';
import UserCard from './UserCard.jsx';
import UserForm from './UserForm.jsx';

const UserList = () => {
    const usersRef = useRef([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://reqres.in/api/users');
            const data = await response.json();
            usersRef.current = data.data;
        };
        fetchUsers();
    }, []);

    const addUser  = (user) => {
        usersRef.current.push(user);
        // Update UI
    };

    const editUser  = (id, updatedUser ) => {
        const index = usersRef.current.findIndex(user => user.id === id);
        usersRef.current[index] = updatedUser ;
        // Update UI
    };

    const deleteUser  = (id) => {
        usersRef.current = usersRef.current.filter(user => user.id !== id);
        // Update UI
    };

    return (
        <div>
            <User Form onSubmit={addUser } />
            {usersRef.current.map(user => (
                <User Card key={user.id} user={user} onEdit={editUser } onDelete={deleteUser } />
            ))}
        </div>
    );
};

export default UserList;

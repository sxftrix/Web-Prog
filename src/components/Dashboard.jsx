// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import UserCard from './UserCard';
import UserForm from './UserForm';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const MOCK_USERS = [
    { id: 1, email: 'george.bluth@reqres.in', first_name: 'George', last_name: 'Bluth', avatar: 'https://reqres.in/img/faces/1-image.jpg' },
    { id: 2, email: 'janet.weaver@reqres.in', first_name: 'Janet', last_name: 'Weaver', avatar: 'https://reqres.in/img/faces/2-image.jpg' },
    { id: 3, email: 'emma.wong@reqres.in', first_name: 'Emma', last_name: 'Wong', avatar: 'https://reqres.in/img/faces/3-image.jpg' },
    { id: 4, email: 'eve.holt@reqres.in', first_name: 'Eve', last_name: 'Holt', avatar: 'https://reqres.in/img/faces/4-image.jpg' },
    { id: 5, email: 'charles.morris@reqres.in', first_name: 'Charles', last_name: 'Morris', avatar: 'https://reqres.in/img/faces/5-image.jpg' },
    { id: 6, email: 'tracey.ramos@reqres.in', first_name: 'Tracey', last_name: 'Ramos', avatar: 'https://reqres.in/img/faces/6-image.jpg' },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchUsers = setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(fetchUsers);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSaveUser = (user) => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map(u => (u.id === user.id ? user : u)));
    } else {
      // Add new user with a unique ID
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { ...user, id: newId }]);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  if (loading) {
    return <div className="dashboard-message">Loading users...</div>;
  }

  if (error) {
    return <div className="dashboard-message error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div>
          <button className="dashboard-button dashboard-button-primary" onClick={handleAddUser}>
            Add User
          </button>
          <button className="dashboard-button dashboard-button-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {showForm ? (
        <UserForm
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={() => { setShowForm(false); setEditingUser(null); }}
        />
      ) : (
        <div className="user-card-grid">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))
          ) : (
            <div className="dashboard-message">No users found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

// src/components/UserList.js
import React, { useState, useEffect, useRef } from 'react';
import UserCard from './UserCard';
import UserForm from './UserForm';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const usersRef = useRef([]); // Store users with useRef
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // User being edited

  const { logout } = useAuth();
  const navigate = useNavigate();

  // useEffect to fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users?page=1&per_page=12'); // Fetch more users if needed
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        usersRef.current = data.data; // Assign fetched data to ref
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  // Helper to trigger re-render after ref update (since useRef doesn't trigger re-renders)
  const [refreshKey, setRefreshKey] = useState(0);
  const forceRender = () => setRefreshKey(prev => prev + 1);

  const handleAddUser = () => {
    setEditingUser(null); // Ensure we're adding a new user
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      usersRef.current = usersRef.current.filter(user => user.id !== id);
      // In a real app, you'd make an API call here. reqres.in delete doesn't persist.
      forceRender(); // Force re-render after modifying ref
      alert('User deleted (locally).');
    }
  };

  const handleSaveUser = (newUser) => {
    if (editingUser) {
      // Edit existing user
      usersRef.current = usersRef.current.map(user =>
        user.id === newUser.id ? { ...user, ...newUser } : user
      );
      // In a real app, you'd make an API PUT/PATCH call here.
      alert('User updated (locally).');
    } else {
      // Add new user
      usersRef.current = [...usersRef.current, newUser];
      // In a real app, you'd make an API POST call here.
      alert('User added (locally).');
    }
    setShowForm(false);
    setEditingUser(null);
    forceRender(); // Force re-render after modifying ref
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading users...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>User Dashboard</h2>
        <div>
          <button onClick={handleAddUser} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>Add New User</button>
          <button onClick={handleLogout} style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {showForm && (
        <UserForm
          userToEdit={editingUser}
          onSubmit={handleSaveUser}
          onCancel={handleCancelForm}
        />
      )}

      <div key={refreshKey} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {usersRef.current.length > 0 ? (
          usersRef.current.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))
        ) : (
          <p>No users found. Add a new user!</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
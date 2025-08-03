// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
// Create the context
export const AuthContext = createContext();
// Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// Create the provider component
export const AuthProvider = ({ children }) => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
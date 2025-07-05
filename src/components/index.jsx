import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './styles.css';
ReactDOM.render(
    <React.StrictMode>
        <AuthProvider> {/* Wrap App with AuthProvider */}
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
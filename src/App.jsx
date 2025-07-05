import React from 'react';
import { useAuth } from './context/AuthContext'; 
import LoginForm from './components/LoginForm';
import UserList from './components/UserList';
const App = () => {
    const { isLoggedIn } = useAuth(); 
    return (
        <div>
            {isLoggedIn ? <User List /> : <LoginForm />}
        </div>
    );
};
export default App;
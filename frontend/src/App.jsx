// frontend/src/App.jsx

import React from 'react';
import './App.css';
import { useAuth } from './context/AuthContext.jsx';
import AuthForm from './components/AuthForm.jsx';

function App() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <header>
        <h1>Thinkora</h1>
      </header>

      {isAuthenticated ? (
        // --- AUTHENTICATED VIEW ---
        <div className="protected-container">
          <h2>
            Welcome, <span className="username" title={user.username}>{user.username}</span>!
          </h2>
          <p>
            Email: <span className="user-email" title={user.email}>{user.email}</span>
          </p>
          <p>You have successfully connected the React Frontend to the secured Django Backend.</p>
          <p>This is a protected view, accessible only with a valid JWT.</p>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      ) : (
        // --- UNAUTHENTICATED VIEW ---
        <AuthForm />
      )}
    </div>
  );
}

export default App;

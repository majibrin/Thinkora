// frontend/src/components/AuthForm.jsx

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx'; // <-- FIXED: Now imports .jsx
import { registerUser } from '../services/authService.js';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);

    if (isLogin) {
      // --- LOGIN LOGIC ---
      const result = await login({ email, password, username });
      if (result.success) {
        setMessage('Login successful! Redirecting...');
      } else {
        setMessage(`Login Failed: ${result.error?.detail || 'Check credentials'}`);
      }
    } else {
      // --- REGISTRATION LOGIC ---
      try {
        await registerUser({ email, username, password });
        setMessage('Registration successful! Please log in.');
        setIsLogin(true); 
      } catch (error) {
        const errorData = error.response?.data;
        const errorMessage = errorData 
          ? Object.entries(errorData).map(([key, value]) => `${key}: ${value}`).join('; ')
          : 'Registration failed.';
        setMessage(errorMessage);
      }
    }
    setIsSubmitting(false);
  };

  const formTitle = isLogin ? 'Login' : 'Register';
  const submitButtonText = isSubmitting 
    ? (isLogin ? 'Logging In...' : 'Registering...')
    : formTitle;

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{formTitle} to Thinkora</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        {!isLogin && (
          <div style={{ marginBottom: '10px' }}>
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required={!isLogin}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
        )}
        <div style={{ marginBottom: '20px' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        
        <button type="submit" disabled={isSubmitting} style={{ padding: '10px 15px', width: '100%', background: isSubmitting ? '#ccc' : 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {submitButtonText}
        </button>

        {message && <p style={{ marginTop: '15px', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;

import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    return () => {
      
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location = '/habits';
    } catch (err) { 
      alert(err.response?.data?.message || 'Login failed'); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-heading">Welcome Back</h1>
        <p className="login-subtitle">Login to your Habit Tracker</p>
        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
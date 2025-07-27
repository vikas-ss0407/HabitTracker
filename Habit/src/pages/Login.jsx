import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', formData);
      localStorage.setItem('token', res.data); // Save the JWT token
      alert("Login successful!");
      navigate('/habits'); // Replace with your dashboard route
    } catch (err) {
      alert(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-heading">Welcome Back</h1>
        <p className="login-subtitle">Login to Habit Tracker</p>
        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="login-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

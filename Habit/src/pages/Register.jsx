import React, { useState, useEffect } from 'react';
import '../styles/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', formData);
      navigate('/login');
    } catch (err) { 
      alert(err.response?.data?.message || 'Registration failed'); 
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-card">
        <h1 className="reg-heading">Create Account</h1>
        <p className="reg-subtitle">Join the Habit Tracker</p>
        <form className="reg-form" onSubmit={handleRegister}>
          <label className="reg-label">Name</label>
          <input
            className="reg-input"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="reg-label">Email</label>
          <input
            className="reg-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="reg-label">Password</label>
          <input
            className="reg-input"
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="reg-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
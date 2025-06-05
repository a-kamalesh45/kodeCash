import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-nav.png'
import Navbar from './Navbar';


const Login = ({ isLoggedIn, setIsLoggedIn, isDark, setIsDark }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setFormData({ ...formData, email: value });
    } else if (name === 'password') {
      setFormData({ ...formData, password: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    const user = registeredUsers.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }

    setIsLoggedIn(true);
  };

  return (
    <div className="auth-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  isDark={isDark} setIsDark={setIsDark}/>
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <img src={logo} alt="KodeCash" />
            <div>
              <span className="logo-text-1">Kode</span>
              <span className="logo-text-2">Cash</span>
            </div>
          </div>
          <h2>Welcome Back</h2>
          <p>Sign in to manage your expenses</p>
        </div>

        {error && (
          <div className="auth-error-message">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="auth-form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="" className="auth-forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

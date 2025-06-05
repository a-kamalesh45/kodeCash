import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import logo from '../assets/logo-nav.png';
import Navbar from './Navbar';


const Signup = ({ isLoggedIn, setIsLoggedIn, isDark, setIsDark }) => {
  const [formData, setFormData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      setFormData(prevState => ({ ...prevState, firstName: value }));
    } else if (name === 'lastName') {
      setFormData(prevState => ({ ...prevState, lastName: value }));
    } else if (name === 'email') {
      setFormData(prevState => ({ ...prevState, email: value }));
    } else if (name === 'password') {
      setFormData(prevState => ({ ...prevState, password: value }));
    } else if (name === 'confirmPassword') {
      setFormData(prevState => ({ ...prevState, confirmPassword: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsSubmitting(false);
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userExists = existingUsers.some(user => user.email === email);

    if (userExists) {
      setError('User with this email already exists');
      setIsSubmitting(false);
      return;
    }

    const newUser = {
      userId: Date.now(),
      firstName,
      lastName,
      email,
      password,
      name: `${firstName} ${lastName}`,
      registeredAt: new Date().toISOString()
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');

    setSuccess('Account created successfully! Redirecting...');
    setFormData({
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    setIsLoggedIn(true);

    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="auth-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isDark={isDark} setIsDark={setIsDark} />
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <img src={logo} alt="KodeCash" />
            <div>
              <span className="logo-text-1">Kode</span>
              <span className="logo-text-2">Cash</span>
            </div>
          </div>
          <h2>Create Account</h2>
          <p>Start tracking your expenses today</p>
        </div>

        {error && <div className="auth-error-message">{error}</div>}
        {success && <div className="auth-success-message">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-row">
            <div className="auth-form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </div>
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="auth-form-options">
            <label className="checkbox-container">
              <input type="checkbox" required />
              <span className="checkmark"></span>
              I agree to the <Link to="">Terms of Service</Link> and <Link to="">Privacy Policy</Link>
            </label>
          </div>

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

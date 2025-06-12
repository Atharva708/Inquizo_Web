// src/login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import customLoginImage from './login.png'; // Assuming login.png is in src/

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginAs, setLoginAs] = useState('recruiter');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password, loginAs });

    // --- FOR DEMONSTRATION: Always redirect to dashboard ---
    // In a real application, you would perform authentication here (e.g., API call)
    // and only navigate if authentication is successful.
    console.log('Login successful! Redirecting to dashboard...');
    navigate('/dashboard');
  };

  // Function to handle the click event for the "New User?" button
  const handleNewUserClick = () => {
    console.log('New User? button clicked! Redirecting to signup...');
    // In a real application, you would navigate to a signup/registration page
    // For demonstration, let's just log it or navigate to a placeholder route
    navigate('/signup'); // Assuming you have a /signup route
  };

  return (
    <div className="login-page">
      <div className="admin-header">
        INQUIZO
      </div>
      <div className="login-container">
        <div className="login-image-section">
          <img src={customLoginImage} alt="Custom login illustration" />
        </div>
        <div className="login-form-section">
          <div className="form-brand">
            <h1 className="brand-logo">LOGO</h1> {/* Re-added LOGO text */}
            <span className="brand-text">Form Builder</span> {/* Re-added Form Builder text */}
            <div className="brand-underline"></div>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">
              LOGIN{' '}
              <select
                className="login-as-dropdown"
                value={loginAs}
                onChange={(e) => setLoginAs(e.target.value)}
              >
                <option value="recruiter">as recruiter</option>
                <option value="applicant">as Applicant</option>
              </select>
            </h2>
            <p className="welcome-message">Welcome ! Please enter your details</p>

            <div className="form-group">
              <input
                type="text"
                placeholder={loginAs === 'applicant' ? 'LOGIN ID' : 'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={loginAs === 'applicant' ? 'PASSWORD' : 'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-options">
              <label className="show-password-label">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />{' '}
                Show Password
              </label>
              
              <a href="#" className="forgot-password-link">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
            {/* New User? button added below the Login button */}
            <button
              type="button" // Use type="button" to prevent form submission
              className="login-button new-user-button" // Add a new class for specific styling
              onClick={handleNewUserClick}
            >
              New User?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

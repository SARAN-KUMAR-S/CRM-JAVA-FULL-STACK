import React, { useState } from 'react';
import './Component.css';

const API_URL = 'http://localhost:8080/users';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!loginData.email || !loginData.password) {
      setError('Email and password are required');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(`Welcome back, ${data.user.name}!`);
        setLoginData({ email: '', password: '' });
        setTimeout(() => {
          if (onLogin) onLogin();
        }, 1000);
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Error logging in:', err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.role) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      setSuccess('Account created successfully! You can now login.');
      setSignupData({
        name: '',
        email: '',
        password: '',
        role: ''
      });
      setTimeout(() => setIsLogin(true), 2000);
    } catch (err) {
      setError(err.message);
      console.error('Error signing up:', err);
    }
  };

  return (
    <div className="component-container login-container">
      <h2>{isLogin ? 'Login' : 'Create Account'}</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="auth-toggle">
        <button
          className={isLogin ? 'auth-btn active' : 'auth-btn'}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? 'auth-btn active' : 'auth-btn'}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <div className="form-container auth-form">
          <form onSubmit={handleLogin}>
            <div className="form-column">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                className="form-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="form-input"
              />
              <button type="submit" className="btn-add btn-auth">
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-container auth-form">
          <form onSubmit={handleSignup}>
            <div className="form-column">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={signupData.name}
                onChange={handleSignupChange}
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
                className="form-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                className="form-input"
              />
              <input
                type="text"
                name="role"
                placeholder="Role (e.g., Manager, Admin)"
                value={signupData.role}
                onChange={handleSignupChange}
                className="form-input"
              />
              <button type="submit" className="btn-add btn-auth">
                Create Account
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="auth-info">
        <p>CRM Management System</p>
        <p style={{ fontSize: '12px', color: 'var(--ink-300)', marginTop: '8px' }}>
          Manage your customers and deals efficiently
        </p>
      </div>
    </div>
  );
}

export default Login;

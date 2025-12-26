import React, { useState } from 'react';
import './Login.css';
import { authenticateUser, getCredentials } from './auth';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = authenticateUser(email, password);

    if (user) {
      onLogin(user.role, email);
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
    }
  };

  const fillCredentials = (userEmail, userPassword) => {
    setSelectedCredential(userEmail);
    setEmail(userEmail);
    setPassword(userPassword);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <div className="logo">CH</div>
          <h1>Curelex HealthTech</h1>
          <p>Admin Portal Access</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {error && (
            <div className="error">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>Demo Accounts</h3>
          <p className="subtitle">Click to auto-fill credentials</p>
          <div className="credentials-grid">
            {Object.entries(getCredentials()).map(([userEmail, userData]) => (
              <div 
                key={userEmail}
                className={`credential-card ${selectedCredential === userEmail ? 'selected' : ''}`}
                onClick={() => fillCredentials(userEmail, userData.password)}
              >
                <div className="role-badge">{userData.role}</div>
                <div className="email">{userEmail.split('@')[0]}</div>
                <div className="action">Click to use</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
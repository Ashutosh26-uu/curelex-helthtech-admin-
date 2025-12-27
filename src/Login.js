import React, { useState, useEffect } from 'react';
import './Login.css';
import { authenticateUser, getCredentials, resetPassword, checkEmailExists } from './auth';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1200));

    const user = authenticateUser(email.trim(), password);

    if (user) {
      onLogin(user.role, email.trim());
    } else {
      setError('Invalid credentials. Please check your email and password.');
      setIsLoading(false);
      // Clear password on failed attempt
      setPassword('');
    }
  };

  const fillCredentials = (userEmail, userPassword) => {
    setSelectedCredential(userEmail);
    setEmail(userEmail);
    setPassword(userPassword);
    setError('');
    setShowDemo(false);
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setSelectedCredential(null);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!resetEmail.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!checkEmailExists(resetEmail.trim())) {
      setError('Email address not found in our system');
      return;
    }
    
    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Simulate password reset process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = resetPassword(resetEmail.trim(), newPassword);
    
    if (result.success) {
      setError('');
      setShowResetModal(false);
      setResetEmail('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Show success message
      alert('Password reset successful! You can now login with your new password.');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      <div className="login-card">
        <div className="logo-section">
          <div className="logo">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h1>Curelex HealthTech Admin</h1>
          <p>Secure Portal Access</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className={`form-group ${emailFocused || email ? 'focused' : ''}`}>
            <label>Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className={`form-group password-group ${passwordFocused || password ? 'focused' : ''}`}>
            <label>Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  {showPassword ? (
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                  ) : (
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </>
              )}
            </button>

            {(email || password) && (
              <button type="button" className="clear-btn" onClick={clearForm}>
                Clear Form
              </button>
            )}
            
            <button 
              type="button" 
              className="reset-password-btn"
              onClick={() => setShowResetModal(true)}
            >
              Forgot Password?
            </button>
          </div>
        </form>

        <div className="divider">
          <span>Demo Access</span>
        </div>

        <div className="demo-section">
          <button
            type="button"
            className={`demo-toggle ${showDemo ? 'active' : ''}`}
            onClick={() => setShowDemo(!showDemo)}
          >
            <span>Quick Login Options</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className={showDemo ? 'rotated' : ''}>
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>

          <div className={`credentials-container ${showDemo ? 'expanded' : ''}`}>
            <div className="dropdown-menu">
              <label htmlFor="role-select">Select Role to Auto-Login:</label>
              <select 
                id="role-select" 
                className="role-dropdown"
                onChange={(e) => {
                  const selectedEmail = e.target.value;
                  if (selectedEmail) {
                    const userData = getCredentials()[selectedEmail];
                    fillCredentials(selectedEmail, userData.password);
                  }
                }}
                value={selectedCredential || ''}
              >
                <option value="">Choose a demo account...</option>
                {Object.entries(getCredentials()).map(([userEmail, userData]) => (
                  <option key={userEmail} value={userEmail}>
                    {userData.role} - {userEmail.split('@')[0]}
                  </option>
                ))}
              </select>
              
              {selectedCredential && (
                <div className="selected-account">
                  <div className="account-info">
                    <div className="account-role">{getCredentials()[selectedCredential]?.role}</div>
                    <div className="account-email">{selectedCredential}</div>
                  </div>
                  <button 
                    type="button" 
                    className="clear-selection"
                    onClick={() => {
                      setSelectedCredential(null);
                      setEmail('');
                      setPassword('');
                      document.getElementById('role-select').value = '';
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
          <div className="reset-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Reset Password</h2>
              <button 
                className="modal-close"
                onClick={() => setShowResetModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handlePasswordReset} className="reset-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password (min 8 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="8"
                />
              </div>
              
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowResetModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="reset-btn">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
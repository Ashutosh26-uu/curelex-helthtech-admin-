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
          <div className="logo">✓</div>
          <h1>Curelex Admin</h1>
          <p>Secure Portal Access</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className={`form-group ${emailFocused || email ? 'focused' : ''}`}>
            <label>Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">✉</span>
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
              <span className="input-icon">🔒</span>
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
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠</span>
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
                  <span>→</span>
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
            <span className={showDemo ? 'rotated' : ''}>▼</span>
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
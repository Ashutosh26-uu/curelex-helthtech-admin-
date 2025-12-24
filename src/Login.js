import React, { useState } from 'react';
import './Login.css';
import { authenticateUser, getCredentials } from './auth';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [particles, setParticles] = useState([]);
  const [typingEffect, setTypingEffect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = authenticateUser(email, password);

    if (user) {
      onLogin(user.role, email);
    } else {
      setError('Invalid credentials');
      setIsLoading(false);
    }
  };

  const fillCredentials = (userEmail, userPassword) => {
    setSelectedCredential(userEmail);
    setTypingEffect(true);
    setError('');
    
    // Typing animation effect
    let emailIndex = 0;
    let passIndex = 0;
    setEmail('');
    setPassword('');
    
    const emailInterval = setInterval(() => {
      if (emailIndex < userEmail.length) {
        setEmail(userEmail.slice(0, emailIndex + 1));
        emailIndex++;
      } else {
        clearInterval(emailInterval);
        const passInterval = setInterval(() => {
          if (passIndex < userPassword.length) {
            setPassword(userPassword.slice(0, passIndex + 1));
            passIndex++;
          } else {
            clearInterval(passInterval);
            setTypingEffect(false);
          }
        }, 50);
      }
    }, 50);
    
    // Create particle effect
    createParticles();
  };
  
  const createParticles = () => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 2 + 1
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  return (
    <div className="login-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
      <div className="login-card">
        <div className="logo-animation">
          <div className="pulse-ring"></div>
          <div className="pulse-ring delay-1"></div>
          <div className="pulse-ring delay-2"></div>
        </div>
        <h1>Curelex HealthTech Admin Portal</h1>
        <p>Role-Based Access Control System</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className={`form-group ${focusedField === 'email' ? 'focused' : ''} ${typingEffect ? 'typing' : ''}`}>
            <label>📧 Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              required
            />
            <div className="input-underline"></div>
          </div>

          <div className={`form-group password-group ${focusedField === 'password' ? 'focused' : ''} ${typingEffect ? 'typing' : ''}`}>
            <label>🔒 Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField('')}
              required
            />
            <div className="input-underline"></div>
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && (
            <div className="error animate-shake">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button type="submit" className={`login-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span>
                <span className="loading-dots">Authenticating<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></span>
              </>
            ) : (
              <>
                <span className="btn-icon">🚀</span>
                Login to Dashboard
              </>
            )}
          </button>
        </form>

        <div className="demo-credentials">
          <h3>🚀 Quick Login - Demo Credentials</h3>
          <p className="subtitle">Click any card to auto-fill credentials</p>
          <div className="credentials-grid">
            {Object.entries(getCredentials()).map(([userEmail, userData]) => (
              <div 
                key={userEmail}
                className={`credential-card ${selectedCredential === userEmail ? 'selected' : ''}`}
                onClick={() => fillCredentials(userEmail, userData.password)}
              >
                <div className="card-shine"></div>
                <div className="role-badge">{userData.role}</div>
                <div className="email">{userEmail.split('@')[0]}</div>
                <div className="action">✨ Click to use</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
// Timing-safe string comparison to prevent timing attacks
const timingSafeEqual = (a, b) => {
  if (!a || !b || a.length !== b.length) return false;
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

// Fallback credentials for demo (in production, these should be in environment variables)
const fallbackCredentials = {
  'ceo@healthtech.com': { password: 'Shriyansh@123C.E.O.', role: 'C.E.O.' },
  'coo@healthtech.com': { password: 'Aman@123C.O.O', role: 'C.O.O.' },
  'cto@healthtech.com': { password: 'Ashuutosh@123C.T.O.', role: 'C.T.O.' },
  'cfo@healthtech.com': { password: 'cfo123', role: 'C.F.O.' },
  'chro@healthtech.com': { password: 'chro123', role: 'C.H.R.O.' },
  'cmo@healthtech.com': { password: 'Ishan@123C.M.O.', role: 'C.M.O.' },
  'clo@healthtech.com': { password: 'Sandhya@123C.L.O.', role: 'C.L.O.' }
};

// Load credentials from environment variables or fallback
const getCredentials = () => {
  // Try to load from environment variables first
  const envCredentials = {};
  
  if (process.env.REACT_APP_CEO_EMAIL && process.env.REACT_APP_CEO_PASSWORD) {
    envCredentials[process.env.REACT_APP_CEO_EMAIL] = { 
      password: process.env.REACT_APP_CEO_PASSWORD, 
      role: 'C.E.O.' 
    };
  }
  
  if (process.env.REACT_APP_COO_EMAIL && process.env.REACT_APP_COO_PASSWORD) {
    envCredentials[process.env.REACT_APP_COO_EMAIL] = { 
      password: process.env.REACT_APP_COO_PASSWORD, 
      role: 'C.O.O.' 
    };
  }
  
  if (process.env.REACT_APP_CTO_EMAIL && process.env.REACT_APP_CTO_PASSWORD) {
    envCredentials[process.env.REACT_APP_CTO_EMAIL] = { 
      password: process.env.REACT_APP_CTO_PASSWORD, 
      role: 'C.T.O.' 
    };
  }
  
  if (process.env.REACT_APP_CFO_EMAIL && process.env.REACT_APP_CFO_PASSWORD) {
    envCredentials[process.env.REACT_APP_CFO_EMAIL] = { 
      password: process.env.REACT_APP_CFO_PASSWORD, 
      role: 'C.F.O.' 
    };
  }
  
  if (process.env.REACT_APP_CHRO_EMAIL && process.env.REACT_APP_CHRO_PASSWORD) {
    envCredentials[process.env.REACT_APP_CHRO_EMAIL] = { 
      password: process.env.REACT_APP_CHRO_PASSWORD, 
      role: 'C.H.R.O.' 
    };
  }
  
  if (process.env.REACT_APP_CMO_EMAIL && process.env.REACT_APP_CMO_PASSWORD) {
    envCredentials[process.env.REACT_APP_CMO_EMAIL] = { 
      password: process.env.REACT_APP_CMO_PASSWORD, 
      role: 'C.M.O.' 
    };
  }
  
  if (process.env.REACT_APP_CLO_EMAIL && process.env.REACT_APP_CLO_PASSWORD) {
    envCredentials[process.env.REACT_APP_CLO_EMAIL] = { 
      password: process.env.REACT_APP_CLO_PASSWORD, 
      role: 'C.L.O.' 
    };
  }
  
  // Use environment credentials if available, otherwise fallback
  return Object.keys(envCredentials).length > 0 ? envCredentials : fallbackCredentials;
};

// Secure authentication function
export const authenticateUser = (email, password) => {
  const users = getCredentials();
  const user = users[email];
  
  if (!user) return null;
  
  // Use timing-safe comparison to prevent timing attacks
  if (timingSafeEqual(user.password, password)) {
    return { role: user.role, email };
  }
  
  return null;
};

export { getCredentials };
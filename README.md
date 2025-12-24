# HealthTech Admin Portal - Role-Based Access Control System

> A comprehensive React.js application implementing role-based authentication and access control for HealthTech platform administrators.

## 🔐 Security Updates

**IMPORTANT**: This application now uses secure credential management:
- Credentials are stored in environment variables (`.env` file)
- Timing-safe password comparison prevents timing attacks
- `.gitignore` prevents credential exposure in version control

### Setup Environment Variables

1. **Copy the example file:**
   ```bash
   copy .env.example .env
   ```

2. **Edit `.env` with your actual credentials** (file is already configured for demo)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Setup

1. **Navigate to project directory:**
   ```bash
   cd "C:\Users\Ashutosh Mishra\OneDrive\Desktop\admin login section"
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Access the application:**
   - Opens automatically at: `http://localhost:3000`
   - If not, manually navigate to the URL

## 🔐 Authentication System

### Demo Login Credentials

| Role | Email | Password | Access Level |
|------|-------|----------|-------------|
| **CEO** | ceo@healthtech.com | ceo123 | Full System Authority |
| **COO** | coo@healthtech.com | coo123 | Full System Authority |
| **CTO** | cto@healthtech.com | cto123 | Full Technical Authority |
| **CFO** | cfo@healthtech.com | cfo123 | Finance-Only |
| **CHRO** | chro@healthtech.com | chro123 | HR-Only |
| **CMO** | cmo@healthtech.com | cmo123 | Marketing & Growth |
| **CLO** | clo@healthtech.com | clo123 | Legal, Risk & Compliance |

## 🏗️ Project Architecture

```
admin login section/
├── package.json          # Dependencies & scripts
├── README.md            # This file
├── public/
│   └── index.html       # HTML entry point
└── src/
    ├── index.js         # React entry point
    ├── App.js           # Main component (auth logic)
    ├── Login.js         # Login screen component
    ├── Login.css        # Login styles
    ├── Dashboard.js     # Dashboard component
    ├── Dashboard.css    # Dashboard styles
    └── App.css          # Global styles
```

## ✨ Features

### 🔒 Security & Authentication
- ✅ Role-based login system
- ✅ Session management
- ✅ Secure logout functionality
- ✅ Input validation

### 📊 Dashboard & Access Control
- ✅ Interactive role access matrix
- ✅ Real-time role switching (for comparison)
- ✅ Color-coded access levels
- ✅ Comprehensive permission display

### 🎨 User Experience
- ✅ Responsive design (mobile-friendly)
- ✅ Modern UI with smooth animations
- ✅ Intuitive navigation
- ✅ Professional styling

## 🎯 Role-Based Access Control

### Authority Levels

**🔴 Full System Authority (CEO, COO)**
- Complete access to all CXO portals
- Patient data and analytics
- Cross-functional oversight
- Policy and governance control

**🟣 Full Technical Authority (CTO)**
- Infrastructure and backend systems
- Product development and releases
- Data analytics and AI systems
- Patient volume metrics

**🟡 Functional Domain Access (CFO, CHRO, CMO, CLO)**
- Restricted to specific departmental functions
- No cross-functional access
- Domain-specific dashboards and reports

## 🛠️ Technical Stack

- **Frontend**: React 18.2.0
- **State Management**: React Hooks (useState)
- **Styling**: CSS3 with Flexbox/Grid
- **Build Tool**: Create React App (react-scripts)
- **Authentication**: Client-side validation

## 📝 Usage Instructions

1. **Login**: Use any credential from the table above
2. **Dashboard**: View your role-specific access rights
3. **Explore**: Click other roles to compare access levels
4. **Logout**: Use logout button to return to login screen

## 🔧 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Install dependencies
npm install

# Check for security vulnerabilities
npm audit
```

## 📋 Policy Statement

> "In our HealthTech platform, CEO and COO (Founders) have full system authority, the CTO governs all technology, product, and data with patient-volume visibility, and all other CXOs—including the CLO—operate strictly within their functional domains to ensure compliance and ethical governance."

## ⚠️ Important Notes

- **npm warnings**: Normal for React projects, won't affect functionality
- **Vulnerabilities**: From dependencies, non-critical for development
- **Production**: Run `npm run build` for optimized production build
- **Browser compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Then restart
npm start
```

**Dependencies issues:**
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For technical issues or questions about the role-based access control system, refer to the component documentation in the source files.
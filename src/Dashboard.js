import React, { useState } from 'react';
import './Dashboard.css';

const roleData = {
  ceo: {
    title: "CEO (Founder)",
    level: "Full System Authority",
    color: "#e74c3c",
    canAccess: [
      "All CXO portals and dashboards",
      "Total number of patients (real-time + trends)",
      "Technology, operations, finance, HR, marketing, legal",
      "Policy approval and governance",
      "Audit and compliance reports"
    ],
    cannotAccess: ["Clinical diagnosis or prescriptions"]
  },
  coo: {
    title: "COO (Founder)",
    level: "Full System Authority",
    color: "#e74c3c",
    canAccess: [
      "All CXO portals and dashboards",
      "Total number of patients",
      "Operations, logistics, scheduling",
      "Technology, finance, HR, marketing, legal",
      "Emergency overrides (non-clinical)"
    ],
    cannotAccess: ["Medical diagnosis or reports"]
  },
  cto: {
    title: "CTO (Technology, Product & Data Head)",
    level: "Full Technical Authority",
    color: "#9b59b6",
    canAccess: [
      "Infrastructure, backend, APIs",
      "DevOps, cybersecurity, system health",
      "Product features and releases",
      "Data analytics and dashboards",
      "AI systems and automation",
      "Total number of patients (same as CEO/COO)"
    ],
    cannotAccess: [
      "Financial approvals",
      "HR personal records",
      "Marketing budgets",
      "Medical diagnosis data"
    ]
  },
  cfo: {
    title: "CFO (Finance Head)",
    level: "Finance-Only",
    color: "#f39c12",
    canAccess: [
      "Revenue, expenses, burn rate",
      "Runway and unit economics",
      "Grants, equity, and compliance finance",
      "Billing and payment reports"
    ],
    cannotAccess: [
      "Technology systems",
      "HR records (except payroll)",
      "Operations scheduling",
      "Patient analytics beyond finance aggregates"
    ]
  },
  chro: {
    title: "CHRO (Human Resources Head)",
    level: "HR-Only",
    color: "#3498db",
    canAccess: [
      "Attendance and leave systems",
      "Hiring and onboarding",
      "Performance reviews",
      "Workforce analytics"
    ],
    cannotAccess: ["Finance", "Technology", "Operations", "Patient data"]
  },
  cmo: {
    title: "CMO (Chief Marketing Officer)",
    level: "Marketing & Growth",
    color: "#e67e22",
    canAccess: [
      "Campaign performance",
      "User acquisition funnels",
      "Conversion metrics",
      "Patient acquisition numbers (aggregated)",
      "Brand and outreach analytics"
    ],
    cannotAccess: [
      "Finance controls",
      "Technical systems",
      "HR data",
      "Operations or scheduling",
      "Medical or diagnostic data"
    ]
  },
  clo: {
    title: "CLO (Chief Legal Officer)",
    level: "Legal, Risk & Compliance",
    color: "#34495e",
    canAccess: [
      "Legal documents and contracts",
      "Regulatory compliance dashboards",
      "Audit logs and access trails",
      "Consent management records",
      "Policy and terms management"
    ],
    cannotAccess: [
      "Financial controls",
      "Technical system configuration",
      "HR personal performance records",
      "Patient medical data"
    ]
  }
};

function Dashboard({ userRole, userEmail, onLogout }) {
  const [selectedRole, setSelectedRole] = useState(userRole);
  const currentRole = roleData[selectedRole];
  const userRoleData = roleData[userRole];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>HealthTech Admin Dashboard</h1>
          <p>Welcome, {userRoleData.title} ({userEmail})</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>

      <div className="dashboard-content">
        <div className="role-selector">
          <h2>Role Access Matrix</h2>
          <div className="roles-grid">
            {Object.entries(roleData).map(([key, role]) => (
              <button
                key={key}
                className={`role-btn ${selectedRole === key ? 'active' : ''}`}
                onClick={() => setSelectedRole(key)}
              >
                {role.title}
              </button>
            ))}
          </div>
        </div>

        <div className="access-panel">
          <div className="role-header">
            <h2>{currentRole.title}</h2>
            <span className="access-badge" style={{ backgroundColor: currentRole.color }}>
              {currentRole.level}
            </span>
          </div>

          <div className="access-content">
            <div className="access-section can-access">
              <h3>✅ Can Access</h3>
              <ul>
                {currentRole.canAccess.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="access-section cannot-access">
              <h3>❌ Cannot Access</h3>
              <ul>
                {currentRole.cannotAccess.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
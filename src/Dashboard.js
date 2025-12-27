import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const roleData = {
  'C.E.O.': {
    title: "CEO (Founder)",
    level: "Full System Authority",
    color: "#e74c3c",
    sections: ['dashboard', 'users', 'patients', 'appointments', 'finance', 'reports', 'settings'],
  },
  'C.O.O.': {
    title: "COO (Founder)",
    level: "Full System Authority",
    color: "#e74c3c",
    sections: ['dashboard', 'patients', 'appointments', 'staff', 'operations', 'reports'],
  },
  'C.T.O.': {
    title: "CTO (Technology Head)",
    level: "Full Technical Authority",
    color: "#9b59b6",
    sections: ['dashboard', 'analytics', 'system', 'reports'],
  },
  'C.F.O.': {
    title: "CFO (Finance Head)",
    level: "Finance-Only",
    color: "#f39c12",
    sections: ['dashboard', 'finance', 'billing', 'reports'],
  },
  'C.H.R.O.': {
    title: "CHRO (HR Head)",
    level: "HR-Only",
    color: "#3498db",
    sections: ['dashboard', 'staff', 'payroll'],
  },
  'C.M.O.': {
    title: "CMO (Marketing Head)",
    level: "Marketing & Growth",
    color: "#e67e22",
    sections: ['dashboard', 'marketing', 'campaigns'],
  },
  'C.L.O.': {
    title: "CLO (Legal Head)",
    level: "Legal & Compliance",
    color: "#34495e",
    sections: ['dashboard', 'legal', 'compliance'],
  }
};

function Dashboard({ userRole, userEmail, onLogout }) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  
  const [stats, setStats] = useState({
    totalPatients: 1247,
    todayAppointments: 89,
    revenue: 284000,
    activeStaff: 156,
    pendingTasks: 23,
    satisfaction: 94.2
  });
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. John Smith', email: 'john@healthtech.com', role: 'Doctor', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@healthtech.com', role: 'Nurse', status: 'Active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@healthtech.com', role: 'Admin', status: 'Inactive' },
    { id: 4, name: 'Dr. Emily Chen', email: 'emily@healthtech.com', role: 'Pharmacist', status: 'Active' },
    { id: 5, name: 'Dr. Robert Kumar', email: 'robert@healthtech.com', role: 'Pathologist', status: 'Active' }
  ]);
  
  const [patients, setPatients] = useState([
    { id: 'P001', name: 'Michael Brown', age: 45, lastVisit: '2024-01-15', status: 'Active' },
    { id: 'P002', name: 'Emily Davis', age: 32, lastVisit: '2024-01-14', status: 'Follow-up' },
    { id: 'P003', name: 'Robert Johnson', age: 58, lastVisit: '2024-01-13', status: 'Active' }
  ]);
  
  const [appointments, setAppointments] = useState([
    { id: 1, time: '09:00 AM', patient: 'John Doe', type: 'Consultation', doctor: 'Dr. Smith', status: 'Confirmed' },
    { id: 2, time: '10:30 AM', patient: 'Jane Wilson', type: 'Follow-up', doctor: 'Dr. Johnson', status: 'Pending' },
    { id: 3, time: '02:00 PM', patient: 'Bob Miller', type: 'Check-up', doctor: 'Dr. Brown', status: 'Confirmed' }
  ]);
  
  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. Alice Smith', department: 'Cardiology', position: 'Senior Doctor', salary: 120000, status: 'Active' },
    { id: 2, name: 'Nurse Betty Johnson', department: 'Emergency', position: 'Head Nurse', salary: 65000, status: 'Active' },
    { id: 3, name: 'Tom Wilson', department: 'Administration', position: 'Manager', salary: 75000, status: 'On Leave' }
  ]);
  
  const userRoleData = roleData[userRole];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalPatients: prev.totalPatients + Math.floor(Math.random() * 2),
        todayAppointments: Math.max(0, prev.todayAppointments + Math.floor(Math.random() * 3 - 1)),
        revenue: prev.revenue + Math.floor(Math.random() * 1000),
        satisfaction: Math.max(90, Math.min(100, prev.satisfaction + (Math.random() - 0.5) * 0.3))
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (modalType === 'user') {
      if (editingItem) {
        setUsers(prev => prev.map(u => u.id === editingItem.id ? { ...u, ...data } : u));
      } else {
        setUsers(prev => [...prev, { id: Date.now(), ...data, status: 'Active' }]);
      }
    } else if (modalType === 'patient') {
      if (editingItem) {
        setPatients(prev => prev.map(p => p.id === editingItem.id ? { ...p, ...data } : p));
      } else {
        setPatients(prev => [...prev, { id: `P${Date.now()}`, ...data, status: 'Active', lastVisit: new Date().toISOString().split('T')[0] }]);
      }
    } else if (modalType === 'appointment') {
      if (editingItem) {
        setAppointments(prev => prev.map(a => a.id === editingItem.id ? { ...a, ...data } : a));
      } else {
        setAppointments(prev => [...prev, { id: Date.now(), ...data, status: 'Pending' }]);
      }
    } else if (modalType === 'staff') {
      if (editingItem) {
        setStaff(prev => prev.map(s => s.id === editingItem.id ? { ...s, ...data } : s));
      } else {
        setStaff(prev => [...prev, { id: Date.now(), ...data, status: 'Active' }]);
      }
    }
    
    closeModal();
  };
  
  const deleteItem = (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'user') setUsers(prev => prev.filter(u => u.id !== id));
      else if (type === 'patient') setPatients(prev => prev.filter(p => p.id !== id));
      else if (type === 'appointment') setAppointments(prev => prev.filter(a => a.id !== id));
      else if (type === 'staff') setStaff(prev => prev.filter(s => s.id !== id));
    }
  };
  
  const renderModal = () => {
    if (!showModal) return null;
    
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{editingItem ? 'Edit' : 'Add'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h3>
            <button className="modal-close" onClick={closeModal}>×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="modal-form">
            {modalType === 'user' && (
              <>
                <input name="name" placeholder="Full Name" defaultValue={editingItem?.name} required />
                <input name="email" type="email" placeholder="Email" defaultValue={editingItem?.email} required />
                <select name="role" defaultValue={editingItem?.role} required>
                  <option value="">Select Role</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Admin">Admin</option>
                  {(userRole === 'C.E.O.' || userRole === 'C.O.O.') && (
                    <>
                      <option value="Pharmacist">Pharmacist</option>
                      <option value="Pathologist">Pathologist</option>
                    </>
                  )}
                </select>
              </>
            )}
            
            {modalType === 'patient' && (
              <>
                <input name="name" placeholder="Patient Name" defaultValue={editingItem?.name} required />
                <input name="age" type="number" placeholder="Age" defaultValue={editingItem?.age} required />
                <input name="phone" placeholder="Phone Number" defaultValue={editingItem?.phone} />
                <input name="address" placeholder="Address" defaultValue={editingItem?.address} />
              </>
            )}
            
            {modalType === 'appointment' && (
              <>
                <input name="time" type="time" defaultValue={editingItem?.time} required />
                <input name="patient" placeholder="Patient Name" defaultValue={editingItem?.patient} required />
                <select name="type" defaultValue={editingItem?.type} required>
                  <option value="">Select Type</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Check-up">Check-up</option>
                </select>
                <input name="doctor" placeholder="Doctor" defaultValue={editingItem?.doctor} required />
              </>
            )}
            
            {modalType === 'staff' && (
              <>
                <input name="name" placeholder="Staff Name" defaultValue={editingItem?.name} required />
                <input name="department" placeholder="Department" defaultValue={editingItem?.department} required />
                <input name="position" placeholder="Position" defaultValue={editingItem?.position} required />
                <input name="salary" type="number" placeholder="Salary" defaultValue={editingItem?.salary} required />
              </>
            )}
            
            <div className="modal-actions">
              <button type="button" onClick={closeModal} className="btn-cancel">Cancel</button>
              <button type="submit" className="btn-save">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Dashboard Overview</h2>
              <div className="breadcrumb">Home / Dashboard</div>
            </div>
            
            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.totalPatients.toLocaleString()}</div>
                  <div className="stat-label">Total Patients</div>
                </div>
                <div className="stat-trend">+12%</div>
              </div>
              
              <div className="stat-box">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.todayAppointments}</div>
                  <div className="stat-label">Today's Appointments</div>
                </div>
                <div className="stat-trend">+5%</div>
              </div>
              
              {userRoleData.sections.includes('finance') && (
                <div className="stat-box">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <div className="stat-number">${(stats.revenue / 1000).toFixed(0)}K</div>
                    <div className="stat-label">Monthly Revenue</div>
                  </div>
                  <div className="stat-trend">+18%</div>
                </div>
              )}
              
              <div className="stat-box">
                <div className="stat-icon">⭐</div>
                <div className="stat-info">
                  <div className="stat-number">{stats.satisfaction.toFixed(1)}%</div>
                  <div className="stat-label">Satisfaction</div>
                </div>
                <div className="stat-trend">+2%</div>
              </div>
            </div>
            
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <div className="activity-title">New patient registered</div>
                      <div className="activity-time">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <div className="activity-title">Appointment confirmed</div>
                      <div className="activity-time">5 minutes ago</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-content">
                      <div className="activity-title">Payment received</div>
                      <div className="activity-time">10 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-card">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button className="action-btn" onClick={() => openModal('patient')}>Add New Patient</button>
                  <button className="action-btn" onClick={() => openModal('appointment')}>Schedule Appointment</button>
                  <button className="action-btn" onClick={() => setActiveSection('reports')}>Generate Report</button>
                  <button className="action-btn" onClick={() => setActiveSection('analytics')}>View Analytics</button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'users':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>User Management</h2>
              <div className="breadcrumb">Home / Users</div>
              <button className="btn-primary" onClick={() => openModal('user')}>Add New User</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td><span className={`status ${user.status.toLowerCase()}`}>{user.status}</span></td>
                      <td>
                        <button className="btn-sm" onClick={() => openModal('user', user)}>Edit</button>
                        <button className="btn-sm btn-danger" onClick={() => deleteItem('user', user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'patients':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Patient Records</h2>
              <div className="breadcrumb">Home / Patients</div>
              <button className="btn-primary" onClick={() => openModal('patient')}>Add New Patient</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Last Visit</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <tr key={patient.id}>
                      <td>#{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>{patient.lastVisit}</td>
                      <td><span className={`status ${patient.status.toLowerCase().replace('-', '')}`}>{patient.status}</span></td>
                      <td>
                        <button className="btn-sm" onClick={() => openModal('patient', patient)}>Edit</button>
                        <button className="btn-sm btn-danger" onClick={() => deleteItem('patient', patient.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'appointments':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Appointments</h2>
              <div className="breadcrumb">Home / Appointments</div>
              <button className="btn-primary" onClick={() => openModal('appointment')}>Schedule New</button>
            </div>
            <div className="appointments-grid">
              {appointments.map(appointment => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-time">{appointment.time}</div>
                  <div className="appointment-patient">{appointment.patient}</div>
                  <div className="appointment-type">{appointment.type}</div>
                  <div className="appointment-doctor">{appointment.doctor}</div>
                  <div className="appointment-actions">
                    <button className="btn-sm" onClick={() => openModal('appointment', appointment)}>Edit</button>
                    <button className="btn-sm btn-danger" onClick={() => deleteItem('appointment', appointment.id)}>Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'staff':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Staff Management</h2>
              <div className="breadcrumb">Home / Staff</div>
              <button className="btn-primary" onClick={() => openModal('staff')}>Add New Staff</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map(member => (
                    <tr key={member.id}>
                      <td>{member.name}</td>
                      <td>{member.department}</td>
                      <td>{member.position}</td>
                      <td>${member.salary?.toLocaleString()}</td>
                      <td><span className={`status ${member.status.toLowerCase().replace(' ', '')}`}>{member.status}</span></td>
                      <td>
                        <button className="btn-sm" onClick={() => openModal('staff', member)}>Edit</button>
                        <button className="btn-sm btn-danger" onClick={() => deleteItem('staff', member.id)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'finance':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Financial Overview</h2>
              <div className="breadcrumb">Home / Finance</div>
            </div>
            <div className="finance-cards">
              <div className="finance-card">
                <h4>Total Revenue</h4>
                <div className="finance-amount">${stats.revenue.toLocaleString()}</div>
                <div className="finance-change">+15% from last month</div>
              </div>
              <div className="finance-card">
                <h4>Outstanding</h4>
                <div className="finance-amount">$45,230</div>
                <div className="finance-change">-8% from last month</div>
              </div>
              <div className="finance-card">
                <h4>Expenses</h4>
                <div className="finance-amount">$156,780</div>
                <div className="finance-change">+3% from last month</div>
              </div>
            </div>
            
            <div className="dashboard-card" style={{marginTop: '24px'}}>
              <h3>Recent Transactions</h3>
              <div className="transaction-list">
                <div className="transaction-item">
                  <span className="transaction-desc">Patient Payment - John Doe</span>
                  <span className="transaction-amount">+$250</span>
                </div>
                <div className="transaction-item">
                  <span className="transaction-desc">Equipment Purchase</span>
                  <span className="transaction-amount">-$1,200</span>
                </div>
                <div className="transaction-item">
                  <span className="transaction-desc">Insurance Claim</span>
                  <span className="transaction-amount">+$850</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>System Settings</h2>
              <div className="breadcrumb">Home / Settings</div>
            </div>
            
            <div className="settings-grid">
              <div className="settings-card">
                <h3>General Settings</h3>
                <div className="setting-item">
                  <label>System Name</label>
                  <input type="text" defaultValue="Curelex HealthTech" />
                </div>
                <div className="setting-item">
                  <label>Time Zone</label>
                  <select defaultValue="UTC-5">
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC-6">Central Time (UTC-6)</option>
                    <option value="UTC-7">Mountain Time (UTC-7)</option>
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Language</label>
                  <select defaultValue="en">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <button className="btn-primary">Save Changes</button>
              </div>
              
              <div className="settings-card">
                <h3>Security Settings</h3>
                <div className="setting-item">
                  <label>Two-Factor Authentication</label>
                  <div className="toggle-switch">
                    <input type="checkbox" id="2fa" defaultChecked />
                    <label htmlFor="2fa" className="toggle-label">Enabled</label>
                  </div>
                </div>
                <div className="setting-item">
                  <label>Session Timeout (minutes)</label>
                  <input type="number" defaultValue="30" min="5" max="120" />
                </div>
                <div className="setting-item">
                  <label>Password Policy</label>
                  <select defaultValue="strong">
                    <option value="basic">Basic (8 characters)</option>
                    <option value="strong">Strong (12 characters + symbols)</option>
                    <option value="enterprise">Enterprise (16 characters + MFA)</option>
                  </select>
                </div>
                <button className="btn-primary">Update Security</button>
              </div>
              
              <div className="settings-card">
                <h3>Notification Settings</h3>
                <div className="setting-item">
                  <label>Email Notifications</label>
                  <div className="toggle-switch">
                    <input type="checkbox" id="email" defaultChecked />
                    <label htmlFor="email" className="toggle-label">Enabled</label>
                  </div>
                </div>
                <div className="setting-item">
                  <label>SMS Alerts</label>
                  <div className="toggle-switch">
                    <input type="checkbox" id="sms" />
                    <label htmlFor="sms" className="toggle-label">Disabled</label>
                  </div>
                </div>
                <div className="setting-item">
                  <label>System Alerts</label>
                  <div className="toggle-switch">
                    <input type="checkbox" id="alerts" defaultChecked />
                    <label htmlFor="alerts" className="toggle-label">Enabled</label>
                  </div>
                </div>
                <button className="btn-primary">Save Preferences</button>
              </div>
              
              <div className="settings-card">
                <h3>System Information</h3>
                <div className="info-item">
                  <span className="info-label">Version:</span>
                  <span className="info-value">v2.1.4</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Update:</span>
                  <span className="info-value">January 15, 2024</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Database Status:</span>
                  <span className="info-value status-online">Online</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Server Status:</span>
                  <span className="info-value status-online">Healthy</span>
                </div>
                <button className="btn-primary">Check for Updates</button>
              </div>
            </div>
          </div>
        );
        
      case 'reports':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Reports & Analytics</h2>
              <div className="breadcrumb">Home / Reports</div>
              <button className="btn-primary">Generate Report</button>
            </div>
            
            <div className="reports-grid">
              <div className="report-card">
                <div className="report-icon">📊</div>
                <h3>Patient Analytics</h3>
                <p>Comprehensive patient data analysis and trends</p>
                <div className="report-stats">
                  <span>Last 30 days: +15% growth</span>
                </div>
                <button className="btn-primary">View Report</button>
              </div>
              
              <div className="report-card">
                <div className="report-icon">💰</div>
                <h3>Financial Report</h3>
                <p>Revenue, expenses, and financial performance</p>
                <div className="report-stats">
                  <span>Monthly Revenue: $284K</span>
                </div>
                <button className="btn-primary">View Report</button>
              </div>
              
              <div className="report-card">
                <div className="report-icon">👥</div>
                <h3>Staff Performance</h3>
                <p>Employee productivity and performance metrics</p>
                <div className="report-stats">
                  <span>Average Rating: 4.8/5</span>
                </div>
                <button className="btn-primary">View Report</button>
              </div>
              
              <div className="report-card">
                <div className="report-icon">📈</div>
                <h3>Operational Metrics</h3>
                <p>System performance and operational efficiency</p>
                <div className="report-stats">
                  <span>Uptime: 99.9%</span>
                </div>
                <button className="btn-primary">View Report</button>
              </div>
            </div>
            
            <div className="dashboard-card" style={{marginTop: '24px'}}>
              <h3>Recent Reports</h3>
              <div className="report-list">
                <div className="report-item">
                  <div className="report-info">
                    <div className="report-name">Monthly Patient Summary</div>
                    <div className="report-date">Generated: Jan 15, 2024</div>
                  </div>
                  <button className="btn-sm">Download</button>
                </div>
                <div className="report-item">
                  <div className="report-info">
                    <div className="report-name">Financial Quarter Report</div>
                    <div className="report-date">Generated: Jan 10, 2024</div>
                  </div>
                  <button className="btn-sm">Download</button>
                </div>
                <div className="report-item">
                  <div className="report-info">
                    <div className="report-name">Staff Performance Review</div>
                    <div className="report-date">Generated: Jan 8, 2024</div>
                  </div>
                  <button className="btn-sm">Download</button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'analytics':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Advanced Analytics</h2>
              <div className="breadcrumb">Home / Analytics</div>
            </div>
            
            <div className="analytics-dashboard">
              <div className="analytics-card">
                <h3>Patient Flow Analysis</h3>
                <div className="chart-placeholder">
                  <div className="chart-bar" style={{height: '60%'}}></div>
                  <div className="chart-bar" style={{height: '80%'}}></div>
                  <div className="chart-bar" style={{height: '45%'}}></div>
                  <div className="chart-bar" style={{height: '90%'}}></div>
                  <div className="chart-bar" style={{height: '70%'}}></div>
                </div>
                <div className="chart-labels">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
                </div>
              </div>
              
              <div className="analytics-card">
                <h3>Revenue Trends</h3>
                <div className="trend-chart">
                  <div className="trend-line"></div>
                  <div className="trend-points">
                    <div className="trend-point" style={{left: '10%', bottom: '30%'}}></div>
                    <div className="trend-point" style={{left: '30%', bottom: '50%'}}></div>
                    <div className="trend-point" style={{left: '50%', bottom: '40%'}}></div>
                    <div className="trend-point" style={{left: '70%', bottom: '70%'}}></div>
                    <div className="trend-point" style={{left: '90%', bottom: '80%'}}></div>
                  </div>
                </div>
                <div className="analytics-summary">
                  <span className="trend-up">↗ +18% this month</span>
                </div>
              </div>
              
              <div className="analytics-card">
                <h3>Department Performance</h3>
                <div className="performance-list">
                  <div className="performance-item">
                    <span>Cardiology</span>
                    <div className="performance-bar">
                      <div className="performance-fill" style={{width: '92%'}}></div>
                    </div>
                    <span>92%</span>
                  </div>
                  <div className="performance-item">
                    <span>Emergency</span>
                    <div className="performance-bar">
                      <div className="performance-fill" style={{width: '88%'}}></div>
                    </div>
                    <span>88%</span>
                  </div>
                  <div className="performance-item">
                    <span>Pediatrics</span>
                    <div className="performance-bar">
                      <div className="performance-fill" style={{width: '95%'}}></div>
                    </div>
                    <span>95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'system':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>System Management</h2>
              <div className="breadcrumb">Home / System</div>
            </div>
            
            <div className="system-grid">
              <div className="system-card">
                <h3>Server Status</h3>
                <div className="system-metrics">
                  <div className="metric">
                    <span className="metric-label">CPU Usage</span>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{width: '45%', backgroundColor: '#27ae60'}}></div>
                    </div>
                    <span className="metric-value">45%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Memory</span>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{width: '62%', backgroundColor: '#f39c12'}}></div>
                    </div>
                    <span className="metric-value">62%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Storage</span>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{width: '78%', backgroundColor: '#e74c3c'}}></div>
                    </div>
                    <span className="metric-value">78%</span>
                  </div>
                </div>
              </div>
              
              <div className="system-card">
                <h3>Database Status</h3>
                <div className="status-grid">
                  <div className="status-item">
                    <span className="status-dot status-online"></span>
                    <span>Primary Database</span>
                  </div>
                  <div className="status-item">
                    <span className="status-dot status-online"></span>
                    <span>Backup Database</span>
                  </div>
                  <div className="status-item">
                    <span className="status-dot status-warning"></span>
                    <span>Cache Server</span>
                  </div>
                  <div className="status-item">
                    <span className="status-dot status-online"></span>
                    <span>File Storage</span>
                  </div>
                </div>
                <button className="btn-primary">Run Diagnostics</button>
              </div>
              
              <div className="system-card">
                <h3>System Logs</h3>
                <div className="log-list">
                  <div className="log-item">
                    <span className="log-time">14:32:15</span>
                    <span className="log-level info">INFO</span>
                    <span className="log-message">User login successful</span>
                  </div>
                  <div className="log-item">
                    <span className="log-time">14:28:42</span>
                    <span className="log-level warning">WARN</span>
                    <span className="log-message">High memory usage detected</span>
                  </div>
                  <div className="log-item">
                    <span className="log-time">14:25:18</span>
                    <span className="log-level info">INFO</span>
                    <span className="log-message">Database backup completed</span>
                  </div>
                </div>
                <button className="btn-primary">View All Logs</button>
              </div>
            </div>
          </div>
        );
        
      case 'billing':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Billing Management</h2>
              <div className="breadcrumb">Home / Billing</div>
              <button className="btn-primary">Create Invoice</button>
            </div>
            
            <div className="billing-stats">
              <div className="billing-card">
                <h4>Outstanding Invoices</h4>
                <div className="billing-amount">$45,230</div>
                <div className="billing-count">23 invoices</div>
              </div>
              <div className="billing-card">
                <h4>Paid This Month</h4>
                <div className="billing-amount">$189,450</div>
                <div className="billing-count">156 payments</div>
              </div>
              <div className="billing-card">
                <h4>Overdue</h4>
                <div className="billing-amount">$12,890</div>
                <div className="billing-count">8 invoices</div>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>Recent Invoices</h3>
              <div className="invoice-list">
                <div className="invoice-item">
                  <div className="invoice-info">
                    <div className="invoice-number">#INV-2024-001</div>
                    <div className="invoice-patient">John Doe - Consultation</div>
                  </div>
                  <div className="invoice-amount">$250.00</div>
                  <div className="invoice-status paid">Paid</div>
                </div>
                <div className="invoice-item">
                  <div className="invoice-info">
                    <div className="invoice-number">#INV-2024-002</div>
                    <div className="invoice-patient">Jane Smith - Surgery</div>
                  </div>
                  <div className="invoice-amount">$1,200.00</div>
                  <div className="invoice-status pending">Pending</div>
                </div>
                <div className="invoice-item">
                  <div className="invoice-info">
                    <div className="invoice-number">#INV-2024-003</div>
                    <div className="invoice-patient">Bob Wilson - Check-up</div>
                  </div>
                  <div className="invoice-amount">$150.00</div>
                  <div className="invoice-status overdue">Overdue</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'payroll':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Payroll Management</h2>
              <div className="breadcrumb">Home / Payroll</div>
              <button className="btn-primary">Process Payroll</button>
            </div>
            
            <div className="payroll-summary">
              <div className="payroll-card">
                <h4>Total Payroll</h4>
                <div className="payroll-amount">$89,450</div>
                <div className="payroll-period">Current Month</div>
              </div>
              <div className="payroll-card">
                <h4>Employees</h4>
                <div className="payroll-amount">156</div>
                <div className="payroll-period">Active Staff</div>
              </div>
              <div className="payroll-card">
                <h4>Pending</h4>
                <div className="payroll-amount">12</div>
                <div className="payroll-period">Approvals</div>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>Payroll Schedule</h3>
              <div className="schedule-list">
                <div className="schedule-item">
                  <div className="schedule-date">January 31, 2024</div>
                  <div className="schedule-type">Monthly Salary</div>
                  <div className="schedule-amount">$89,450</div>
                  <div className="schedule-status processed">Processed</div>
                </div>
                <div className="schedule-item">
                  <div className="schedule-date">February 15, 2024</div>
                  <div className="schedule-type">Bonus Payments</div>
                  <div className="schedule-amount">$15,200</div>
                  <div className="schedule-status pending">Pending</div>
                </div>
                <div className="schedule-item">
                  <div className="schedule-date">February 28, 2024</div>
                  <div className="schedule-type">Monthly Salary</div>
                  <div className="schedule-amount">$91,200</div>
                  <div className="schedule-status scheduled">Scheduled</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'marketing':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Marketing Dashboard</h2>
              <div className="breadcrumb">Home / Marketing</div>
              <button className="btn-primary">New Campaign</button>
            </div>
            
            <div className="marketing-stats">
              <div className="marketing-card">
                <h4>Website Visitors</h4>
                <div className="marketing-number">12,450</div>
                <div className="marketing-change">+15% this month</div>
              </div>
              <div className="marketing-card">
                <h4>Lead Conversion</h4>
                <div className="marketing-number">8.5%</div>
                <div className="marketing-change">+2.1% improvement</div>
              </div>
              <div className="marketing-card">
                <h4>Active Campaigns</h4>
                <div className="marketing-number">6</div>
                <div className="marketing-change">2 launching soon</div>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>Campaign Performance</h3>
              <div className="campaign-list">
                <div className="campaign-item">
                  <div className="campaign-info">
                    <div className="campaign-name">Health Checkup Promotion</div>
                    <div className="campaign-dates">Jan 1 - Jan 31, 2024</div>
                  </div>
                  <div className="campaign-metrics">
                    <span>Reach: 15K</span>
                    <span>Conversions: 234</span>
                  </div>
                  <div className="campaign-status active">Active</div>
                </div>
                <div className="campaign-item">
                  <div className="campaign-info">
                    <div className="campaign-name">Vaccination Drive</div>
                    <div className="campaign-dates">Dec 15 - Jan 15, 2024</div>
                  </div>
                  <div className="campaign-metrics">
                    <span>Reach: 8.5K</span>
                    <span>Conversions: 156</span>
                  </div>
                  <div className="campaign-status completed">Completed</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'campaigns':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Campaign Management</h2>
              <div className="breadcrumb">Home / Campaigns</div>
              <button className="btn-primary">Create Campaign</button>
            </div>
            
            <div className="campaigns-grid">
              <div className="campaign-card">
                <div className="campaign-header">
                  <h3>Winter Health Package</h3>
                  <span className="campaign-status active">Active</span>
                </div>
                <div className="campaign-details">
                  <p>Comprehensive health checkup package for winter season</p>
                  <div className="campaign-metrics">
                    <div className="metric-item">
                      <span className="metric-label">Budget:</span>
                      <span className="metric-value">$5,000</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Spent:</span>
                      <span className="metric-value">$3,200</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Leads:</span>
                      <span className="metric-value">156</span>
                    </div>
                  </div>
                </div>
                <div className="campaign-actions">
                  <button className="btn-sm">Edit</button>
                  <button className="btn-sm">Analytics</button>
                </div>
              </div>
              
              <div className="campaign-card">
                <div className="campaign-header">
                  <h3>Pediatric Care Awareness</h3>
                  <span className="campaign-status draft">Draft</span>
                </div>
                <div className="campaign-details">
                  <p>Educational campaign about pediatric healthcare</p>
                  <div className="campaign-metrics">
                    <div className="metric-item">
                      <span className="metric-label">Budget:</span>
                      <span className="metric-value">$3,500</span>
                    </div>
                    <div className="metric-item">
                      <span className="metric-label">Launch:</span>
                      <span className="metric-value">Feb 15</span>
                    </div>
                  </div>
                </div>
                <div className="campaign-actions">
                  <button className="btn-sm">Launch</button>
                  <button className="btn-sm">Edit</button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'legal':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Legal Affairs</h2>
              <div className="breadcrumb">Home / Legal</div>
              <button className="btn-primary">New Document</button>
            </div>
            
            <div className="legal-grid">
              <div className="legal-card">
                <h3>Contracts & Agreements</h3>
                <div className="legal-stats">
                  <div className="legal-stat">
                    <span className="stat-number">45</span>
                    <span className="stat-label">Active Contracts</span>
                  </div>
                  <div className="legal-stat">
                    <span className="stat-number">8</span>
                    <span className="stat-label">Pending Review</span>
                  </div>
                </div>
                <button className="btn-primary">Manage Contracts</button>
              </div>
              
              <div className="legal-card">
                <h3>Compliance Status</h3>
                <div className="compliance-list">
                  <div className="compliance-item">
                    <span className="compliance-name">HIPAA Compliance</span>
                    <span className="compliance-status compliant">✓ Compliant</span>
                  </div>
                  <div className="compliance-item">
                    <span className="compliance-name">Data Protection</span>
                    <span className="compliance-status compliant">✓ Compliant</span>
                  </div>
                  <div className="compliance-item">
                    <span className="compliance-name">Medical Licensing</span>
                    <span className="compliance-status warning">⚠ Review Required</span>
                  </div>
                </div>
              </div>
              
              <div className="legal-card">
                <h3>Legal Documents</h3>
                <div className="document-list">
                  <div className="document-item">
                    <span className="document-name">Privacy Policy</span>
                    <span className="document-date">Updated: Jan 10, 2024</span>
                  </div>
                  <div className="document-item">
                    <span className="document-name">Terms of Service</span>
                    <span className="document-date">Updated: Dec 15, 2023</span>
                  </div>
                  <div className="document-item">
                    <span className="document-name">Patient Consent Forms</span>
                    <span className="document-date">Updated: Jan 5, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'compliance':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Compliance Management</h2>
              <div className="breadcrumb">Home / Compliance</div>
              <button className="btn-primary">Run Audit</button>
            </div>
            
            <div className="compliance-dashboard">
              <div className="compliance-overview">
                <div className="compliance-score">
                  <div className="score-circle">
                    <div className="score-number">94%</div>
                    <div className="score-label">Compliance Score</div>
                  </div>
                </div>
                <div className="compliance-summary">
                  <div className="summary-item">
                    <span className="summary-number">12</span>
                    <span className="summary-label">Policies</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-number">3</span>
                    <span className="summary-label">Audits</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-number">1</span>
                    <span className="summary-label">Issues</span>
                  </div>
                </div>
              </div>
              
              <div className="compliance-checklist">
                <h3>Compliance Checklist</h3>
                <div className="checklist-item completed">
                  <span className="checklist-icon">✓</span>
                  <span className="checklist-text">HIPAA Privacy Rule Implementation</span>
                  <span className="checklist-date">Completed: Jan 15, 2024</span>
                </div>
                <div className="checklist-item completed">
                  <span className="checklist-icon">✓</span>
                  <span className="checklist-text">Staff Training on Data Protection</span>
                  <span className="checklist-date">Completed: Jan 10, 2024</span>
                </div>
                <div className="checklist-item pending">
                  <span className="checklist-icon">⏳</span>
                  <span className="checklist-text">Annual Security Assessment</span>
                  <span className="checklist-date">Due: Feb 1, 2024</span>
                </div>
                <div className="checklist-item pending">
                  <span className="checklist-icon">⏳</span>
                  <span className="checklist-text">Medical License Renewal</span>
                  <span className="checklist-date">Due: Mar 15, 2024</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'operations':
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>Operations Management</h2>
              <div className="breadcrumb">Home / Operations</div>
            </div>
            
            <div className="operations-grid">
              <div className="operations-card">
                <h3>Facility Management</h3>
                <div className="facility-stats">
                  <div className="facility-item">
                    <span className="facility-label">Room Occupancy</span>
                    <span className="facility-value">78%</span>
                  </div>
                  <div className="facility-item">
                    <span className="facility-label">Equipment Status</span>
                    <span className="facility-value status-good">Good</span>
                  </div>
                  <div className="facility-item">
                    <span className="facility-label">Maintenance Due</span>
                    <span className="facility-value">3 items</span>
                  </div>
                </div>
              </div>
              
              <div className="operations-card">
                <h3>Supply Chain</h3>
                <div className="supply-list">
                  <div className="supply-item">
                    <span className="supply-name">Medical Supplies</span>
                    <div className="supply-bar">
                      <div className="supply-fill" style={{width: '85%'}}></div>
                    </div>
                    <span className="supply-level">85%</span>
                  </div>
                  <div className="supply-item">
                    <span className="supply-name">Pharmaceuticals</span>
                    <div className="supply-bar">
                      <div className="supply-fill" style={{width: '45%', backgroundColor: '#f39c12'}}></div>
                    </div>
                    <span className="supply-level">45%</span>
                  </div>
                  <div className="supply-item">
                    <span className="supply-name">PPE Equipment</span>
                    <div className="supply-bar">
                      <div className="supply-fill" style={{width: '92%'}}></div>
                    </div>
                    <span className="supply-level">92%</span>
                  </div>
                </div>
              </div>
              
              <div className="operations-card">
                <h3>Quality Metrics</h3>
                <div className="quality-metrics">
                  <div className="quality-item">
                    <span className="quality-label">Patient Satisfaction</span>
                    <span className="quality-score">4.8/5</span>
                  </div>
                  <div className="quality-item">
                    <span className="quality-label">Wait Time Average</span>
                    <span className="quality-score">12 min</span>
                  </div>
                  <div className="quality-item">
                    <span className="quality-label">Service Quality</span>
                    <span className="quality-score">96%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-container">
      {renderModal()}
      
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo">CH</div>
          <div className="logo-text">
            <div className="company-name">Curelex</div>
            <div className="company-sub">HealthTech</div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {userRoleData.sections.map(section => (
            <button
              key={section}
              className={`nav-link ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
            >
              <span className="nav-icon">
                {section === 'dashboard' && '📊'}
                {section === 'users' && '👥'}
                {section === 'patients' && '🏥'}
                {section === 'appointments' && '📅'}
                {section === 'finance' && '💰'}
                {section === 'reports' && '📈'}
                {section === 'settings' && '⚙️'}
                {section === 'staff' && '👨‍⚕️'}
                {section === 'operations' && '🔧'}
                {section === 'analytics' && '📊'}
                {section === 'system' && '💻'}
                {section === 'billing' && '🧾'}
                {section === 'payroll' && '💳'}
                {section === 'marketing' && '📢'}
                {section === 'campaigns' && '🎯'}
                {section === 'legal' && '⚖️'}
                {section === 'compliance' && '✅'}
              </span>
              <span className="nav-text">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">{userEmail.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <div className="user-name">{userRoleData.title}</div>
              <div className="user-email">{userEmail}</div>
            </div>
          </div>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h1>Admin Portal</h1>
            <div className="header-status">
              <span className="status-dot"></span>
              <span>System Online</span>
            </div>
          </div>
          
          <div className="header-right">
            <div className="header-actions">
              <button className="header-btn">🔔</button>
              <button className="header-btn">⚙️</button>
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
          </div>
        </header>
        
        <div className="admin-content">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
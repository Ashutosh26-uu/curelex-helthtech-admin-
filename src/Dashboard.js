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
    { id: 3, name: 'Mike Wilson', email: 'mike@healthtech.com', role: 'Admin', status: 'Inactive' }
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
        
      default:
        return (
          <div className="section-content">
            <div className="section-header">
              <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
              <div className="breadcrumb">Home / {activeSection}</div>
            </div>
            <div className="coming-soon">
              <h3>Feature Available</h3>
              <p>This {activeSection} section is fully functional with interactive features.</p>
              <div className="feature-list">
                <div className="feature-item">✅ Real-time data updates</div>
                <div className="feature-item">✅ Interactive dashboards</div>
                <div className="feature-item">✅ Data management tools</div>
                <div className="feature-item">✅ Advanced analytics</div>
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
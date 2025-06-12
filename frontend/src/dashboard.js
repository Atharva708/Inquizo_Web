// src/dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './dashboard.css'; // Create this CSS file for dashboard styling

const Dashboard = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  // Removed: const [isDropdownOpen, setIsDropdownOpen] = useState(false); // No longer needed for direct button
  const navigate = useNavigate(); // Initialize navigate hook

  const templates = [
    { name: 'Blank Form', icon: '➕', imageUrl: 'https://via.placeholder.com/150x150?text=Blank+Form', path: '/forms' },
    { name: 'Quiz', icon: '📝', imageUrl: 'https://via.placeholder.com/150x150?text=Quiz' },
    { name: 'Party Invitation', icon: '🎉', imageUrl: 'https://via.placeholder.com/150x150?text=Party+Invite' },
    { name: 'RSVP', icon: '📅', imageUrl: 'https://via.placeholder.com/150x150?text=RSVP' },
    { name: 'Contact', icon: '📞', imageUrl: 'https://via.placeholder.com/150x150?text=Contact' },
  ];

  const workspaceForms = [
    { id: 1, name: 'My form 1', response: 0, completion: '05 June 2025', updated: '05 June 2025' },
    { id: 2, name: 'Project Feedback', response: 12, completion: '01 June 2025', updated: '03 June 2025' },
    { id: 3, name: 'Customer Survey', response: 75, completion: '28 May 2025', updated: '30 May 2025' },
    { id: 4, name: 'Event Registration', response: 30, completion: '20 May 2025', updated: '25 May 2025' },
    { id: 5, name: 'Employee Satisfaction', response: 45, completion: '15 May 2025', updated: '20 May 2025' },
  ];

  const handleCreateFormClick = () => {
    navigate('/forms');// Redirect to FormBuilder page
  };

  // Removed: const toggleDropdown = () => { setIsDropdownOpen(!isDropdownOpen); };

  const handleLogout = () => {
    // In a real application, you would also clear any user session data (e.g., localStorage, cookies)
    console.log('Logging out...');
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-left">
          <span className="admin-breadcrumb">Admin / Dashboard</span>
          <h1 className="logo-text">INQUIZO</h1>
        </div>
        <div className="header-right">
          <button className="view-plan-button">View Plan</button>
          {/* Direct Logout Button */}
          <button className="direct-logout-button" onClick={handleLogout}>
            Logout
          </button>
          <div className="profile-section"> {/* No longer a dropdown trigger */}
            <div className="profile-icon">JD</div>
            <span>John Doe</span>
            <span className="profile-dropdown-arrow">▼</span> {/* Arrow might be removed or styled differently if no dropdown */}
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="templates-section">
          <h3>Start from a template</h3>
          <div className="templates-grid">
            {templates.map((template, index) => (
              <div
                key={index}
                className="template-card"
                onClick={() => template.path && navigate(template.path)}
              >
                {template.imageUrl ? (
                  <img src={template.imageUrl} alt={template.name} className="template-image" />
                ) : (
                  <span className="template-icon">{template.icon}</span>
                )}
                <span className="template-name">{template.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="workspace-section">
          <h3>My Workspace</h3>
          <div className="workspace-controls">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search" />
            </div>
            <div className="workspace-actions">
              <button className="create-form-button" onClick={handleCreateFormClick}>+ Create Form</button>
              <div className="view-toggle">
                <button
                  className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
                <button
                  className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'list' ? (
            <div className="workspace-table">
              <div className="table-header">
                <div className="checkbox-col"></div>
                <div className="name-col">Name</div>
                <div className="response-col">Response</div>
                <div className="completion-col">Completion</div>
                <div className="updated-col">Last Updated</div>
                <div className="actions-col"></div>
              </div>
              {workspaceForms.map((form) => (
                <div key={form.id} className="table-row">
                  <div className="checkbox-col">
                    <input type="checkbox" />
                  </div>
                  <div className="name-col">{form.name}</div>
                  <div className="response-col">{form.response}</div>
                  <div className="completion-col">{form.completion}</div>
                  <div className="updated-col">{form.updated}</div>
                  <div className="actions-col">
                    <button className="more-options-button">...</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="workspace-grid">
              {workspaceForms.map((form) => (
                <div key={form.id} className="form-card">
                  <div className="form-card-header">
                    <div className="checkbox-col">
                      <input type="checkbox" />
                    </div>
                    <h4 className="form-card-name">{form.name}</h4>
                    <button className="more-options-button">...</button>
                  </div>
                  <div className="form-card-body">
                    <div className="form-card-detail">
                      <span>Response:</span>
                      <strong>{form.response}</strong>
                    </div>
                    <div className="form-card-detail">
                      <span>Completion:</span>
                      <strong>{form.completion}</strong>
                    </div>
                    <div className="form-card-detail">
                      <span>Last Updated:</span>
                      <strong>{form.updated}</strong>
                    </div>
                  </div>
                  <div className="form-card-actions">
                    <button className="form-card-button edit-button">Edit</button>
                    <button className="form-card-button view-button-card">View</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
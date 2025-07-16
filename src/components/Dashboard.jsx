import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const username = 'Srieevathsan'; // Replace with dynamic username if needed
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth (optional)
    localStorage.removeItem('token');
    document.cookie = 'jwt=; Max-Age=0; path=/;';
    navigate('/login');
  };

  const goToUpload = () => {
    navigate('/upload');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">📄 <span className="app-title">Trocare</span></div>

        <nav className="nav-links">
          <button className="nav-btn active">📊 Dashboard</button>
          <button className="nav-btn" onClick={goToUpload}>📁 Upload Files</button>
        </nav>

        <div className="user-section">
          <span className="username">👤 {username}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <h1>Welcome back, {username}!</h1>
        <p>Ready to upload and analyze your documents?</p>

        <div className="dashboard-card">
          <div className="doc-icon">📄</div>
          <h2>Ready to Get Started?</h2>
          <p>Upload your first document to begin analyzing and querying your content with AI.</p>
          <button className="upload-doc-btn" onClick={goToUpload}>
            Upload Document →
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
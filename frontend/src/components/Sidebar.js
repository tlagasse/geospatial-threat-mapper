import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar({ 
  statsContent, 
  filterContent, 
  timelineContent 
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('stats');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        <span className="material-icons">
          {isOpen ? '☰' : '☰'}
        </span>
      </button>
      
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🌍</span>
            {isOpen && <span className="logo-text">Threat Intel</span>}
          </div>
        </div>

        <ul className="nav-links">
          <li className={activeSection === 'stats' ? 'active' : ''}>
            <a onClick={() => setActiveSection('stats')}>
              <span className="icon">📊</span>
              {isOpen && <span className="link-text">Statistics</span>}
            </a>
          </li>
          
          <li className={activeSection === 'filters' ? 'active' : ''}>
            <a onClick={() => setActiveSection('filters')}>
              <span className="icon">🔍</span>
              {isOpen && <span className="link-text">Filters</span>}
            </a>
          </li>
          
          <li className={activeSection === 'timeline' ? 'active' : ''}>
            <a onClick={() => setActiveSection('timeline')}>
              <span className="icon">📅</span>
              {isOpen && <span className="link-text">Timeline</span>}
            </a>
          </li>

          <li className={activeSection === 'about' ? 'active' : ''}>
    <a onClick={() => setActiveSection('about')}>
      <span className="icon">ℹ️</span>
      {isOpen && <span className="link-text">About</span>}
    </a>
  </li>
</ul>  


        {isOpen && (
          <div className="sidebar-panel">
            {activeSection === 'stats' && statsContent}
            {activeSection === 'filters' && filterContent}
            {activeSection === 'timeline' && timelineContent}
            {activeSection === 'about' && (
              <div className="about-section">
                <h3>About This Project</h3>
                <p>
                  This platform visualizes real-time cyber threat intelligence by combining 
                  geospatial analysis techniques with modern web technologies.
                </p>
        
                <h4>Key Features</h4>
                <ul>
                  <li>Live threat data from AbuseIPDB</li>
                  <li>Interactive geospatial visualization</li>
                  <li>Marker clustering & animations</li>
                  <li>Historical timeline filtering</li>
                  <li>Advanced search & filtering</li>
                </ul>
        
                <h4>Technologies Used</h4>
                <ul>
                  <li>React 19 + Leaflet.js</li>
                  <li>Python Flask REST API</li>
                  <li>SQLite with geospatial data</li>
                  <li>AbuseIPDB threat intelligence</li>
                </ul>  
                <div className="about-links">
                  <a href="mailto:tlagasse@live.com" className="about-link">📧 Contact</a>
                  <a href="https://github.com/tlagasse" target="_blank" rel="noopener noreferrer" className="about-link">💼 GitHub</a>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Sidebar;

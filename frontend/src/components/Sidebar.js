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
        </ul>

        {isOpen && (
          <div className="sidebar-panel">
            {activeSection === 'stats' && statsContent}
            {activeSection === 'filters' && filterContent}
            {activeSection === 'timeline' && timelineContent}
          </div>
        )}
      </nav>
    </>
  );
}

export default Sidebar;

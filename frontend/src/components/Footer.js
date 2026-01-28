import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Geospatial Threat Intelligence Mapper</h3>
          <p>Real-time cyber threat visualization combining geospatial analysis with modern web technologies.</p>
        </div>
        
        <div className="footer-section">
          <h4>Technologies</h4>
          <ul>
            <li>React + Leaflet.js</li>
            <li>Python Flask API</li>
            <li>AbuseIPDB Integration</li>
            <li>SQLite Database</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li>📧 <a href="mailto:tlagasse@live.com">tlagasse@live.com</a></li>
            <li>💼 <a href="https://github.com/tlagasse" target="_blank" rel="noopener noreferrer">GitHub Portfolio</a></li>
            <li>🔗 <a href="https://github.com/tlagasse/geospatial-threat-mapper" target="_blank" rel="noopener noreferrer">Project Repository</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Tyler Lagasse | Built with React, Flask & Leaflet.js</p>
      </div>
    </footer>
  );
}

export default Footer;

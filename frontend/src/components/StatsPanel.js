import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StatsPanel.css';

function StatsPanel() {
  const [stats, setStats] = useState(null);
  const [totalThreats, setTotalThreats] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get stats from API
        const statsResponse = await axios.get('http://localhost:5000/api/stats');
        setStats(statsResponse.data);
        
        // Get total threats
        const threatsResponse = await axios.get('http://localhost:5000/api/threats');
        setTotalThreats(threatsResponse.data.length);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="stats-panel">Loading statistics...</div>;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="stats-panel">
      <div className="stat-card">
        <div className="stat-value">{totalThreats}</div>
        <div className="stat-label">Total Threats</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">100%</div>
        <div className="stat-label">Avg Confidence</div>
      </div>
      
      <div className="stat-card top-countries">
        <div className="stat-label">Top Countries</div>
        <div className="country-list">
          {stats.top_countries.slice(0, 5).map((country, index) => (
            <div key={index} className="country-item">
              <span className="country-name">{country.country}</span>
              <span className="country-count">{country.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Last Updated</div>
        <div className="stat-value-small">
          {stats.last_update ? new Date(stats.last_update).toLocaleString() : 'N/A'}
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-value">{stats.top_countries.length}</div>
        <div className="stat-label">Countries</div>
      </div>
    </div>
  );
}

export default StatsPanel;

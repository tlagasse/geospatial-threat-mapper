import React, { useState, useEffect } from 'react';
import './Timeline.css';

function Timeline({ threats, onTimeRangeChange }) {
  const [timeRange, setTimeRange] = useState('all');
  const [customDays, setCustomDays] = useState(7);

  useEffect(() => {
    filterByTimeRange(timeRange);
  }, [timeRange, customDays]);

  const filterByTimeRange = (range) => { 
    if (range === 'all') {
      onTimeRangeChange(threats);
      return;
    }

    const now = new Date();
    let cutoffDate;

    switch(range) {
      case '24h':
        cutoffDate = new Date(now - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoffDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoffDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'custom':
        cutoffDate = new Date(now - customDays * 24 * 60 * 60 * 1000);
        break;
      default:
        onTimeRangeChange(threats);
        return;
    }

    const filtered = threats.filter(threat => {
      const threatDate = new Date(threat.timestamp);
      return threatDate >= cutoffDate;
    });
    
    onTimeRangeChange(filtered);
  };

  const getThreatsInRange = (range) => {
    const now = new Date();
    let cutoffDate;

    switch(range) {
      case '24h':
        cutoffDate = new Date(now - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoffDate = new Date(now - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoffDate = new Date(now - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        return threats.length;
    }

    return threats.filter(t => new Date(t.timestamp) >= cutoffDate).length;
  };

  return (
    <div className="timeline-panel">
      <div className="timeline-header">
        <span className="timeline-icon">📅</span>
        <span className="timeline-label">Time Range:</span>
      </div>

      <div className="timeline-buttons">
              <button
          className={`timeline-btn ${timeRange === '24h' ? 'active' : ''}`}
          onClick={() => setTimeRange('24h')}
        >
          Last 24 Hours
          <span className="threat-count">{getThreatsInRange('24h')}</span>
        </button>

        <button
          className={`timeline-btn ${timeRange === '7d' ? 'active' : ''}`}
          onClick={() => setTimeRange('7d')}
        >
          Last 7 Days
          <span className="threat-count">{getThreatsInRange('7d')}</span>
        </button>

        <button
          className={`timeline-btn ${timeRange === '30d' ? 'active' : ''}`}
          onClick={() => setTimeRange('30d')}
        >
          Last 30 Days
          <span className="threat-count">{getThreatsInRange('30d')}</span>
        </button>

        <button
          className={`timeline-btn ${timeRange === 'all' ? 'active' : ''}`}
          onClick={() => setTimeRange('all')}
        >
          All Time
          <span className="threat-count">{threats.length}</span>
        </button>
    </div>

      {timeRange === 'custom' && (
        <div className="custom-range">
          <label>Custom Days: {customDays}</label>
          <input
            type="range"
            min="1"
            max="90"
            value={customDays}
            onChange={(e) => setCustomDays(parseInt(e.target.value))}
          />
        </div>
      )}
    </div>
  );
}

export default Timeline;

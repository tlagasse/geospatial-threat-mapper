import Sidebar from './components/Sidebar';
import Timeline from './components/Timeline';
import React, { useState, useEffect } from 'react';
import './App.css';
import ThreatMap from './components/ThreatMap';
import StatsPanel from './components/StatsPanel';
import FilterPanel from './components/FilterPanel';
import axios from 'axios';

function App() {
  const [allThreats, setAllThreats] = useState([]);
  const [filteredThreats, setFilteredThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [countryFilter, setCountryFilter] = useState(null);
  const [timeFilter, setTimeFilter] = useState(null);

  
  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/threats');
        setAllThreats(response.data);
        setFilteredThreats(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching threats:', err);
        setLoading(false);
      }
    };

    fetchThreats();
  }, []);

  const handleFilterChange = (filtered) => {
    setCountryFilter(filtered)
    applyAllFilters(filtered, timeFilter);
  };
  
  const handleTimeRangeChange = (filtered) => {
    setTimeFilter(filtered);
    applyAllFilters(countryFilter, filtered);
  };

  const applyAllFilters = (countryFiltered, timeFiltered) => {
  let result = allThreats;
  
  // Apply country/search filter if exists
  if (countryFiltered) {
    result = countryFiltered;
  }
  
  // Then apply time filter on top of that
  if (timeFiltered && countryFiltered) {
    // Find IPs that exist in BOTH filters
    const timeFilteredIPs = new Set(timeFiltered.map(t => t.ip));
    result = countryFiltered.filter(t => timeFilteredIPs.has(t.ip));
  } else if (timeFiltered) {
    result = timeFiltered;
  }
  
  setFilteredThreats(result);
};

  const handleRefresh = async () => {
  setRefreshing(true);
  try {
    // Call backend to collect new data
    await axios.post('http://localhost:5000/api/refresh');
    
    // Wait a moment for collection to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Fetch updated threats
    const response = await axios.get('http://localhost:5000/api/threats');
    setAllThreats(response.data);
    setFilteredThreats(response.data);
    setRefreshing(false);
  } catch (err) {
    console.error('Error refreshing data:', err);
    setRefreshing(false);
    alert('Failed to refresh data. Please try again.');
  }
};

if (loading) {
  return <div className="loading">Loading threat data...</div>;
}

return (
  <div className="App">
    <header className="app-header">
      <div className="header-content">
        <div>
          <h1>🌍 Geospatial Threat Intelligence Mapper</h1>
          <p>Real-time visualization of cyber threats worldwide</p>
        </div>
        <div className="header-actions">
          <span className="threat-count-badge">
            Showing {filteredThreats.length} threats
          </span>
        <button 
          onClick={handleRefresh} 
          disabled={refreshing}
          className="refresh-button"
        >
          {refreshing ? '🔄 Refreshing...' : '🔄 Refresh Data'}
        </button>
      </div>
    </div>
  </header>
   
  <Sidebar 
    statsContent={<StatsPanel />}
    filterContent={
      <FilterPanel 
        threats={allThreats} 
        onFilterChange={handleFilterChange}
      />
    }
    timelineContent={
      <Timeline 
        threats={allThreats}
        onTimeRangeChange={handleTimeRangeChange}
      />
    }
  />
    
    
    <div className="map-wrapper">
      <ThreatMap filteredThreats={filteredThreats} />
    </div>
  </div>
);

}

export default App;

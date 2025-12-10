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
    setFilteredThreats(filtered);
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
          <button 
            onClick={handleRefresh} 
            disabled={refreshing}
            className="refresh-button"
          >
            {refreshing ? '🔄 Refreshing...' : '🔄 Refresh Data'}
          </button>
        </div>
      </header>    
      
      <StatsPanel />
      <FilterPanel 
        threats={allThreats} 
        onFilterChange={handleFilterChange}
      />
      <ThreatMap filteredThreats={filteredThreats} />
    </div>
  );
}

export default App;

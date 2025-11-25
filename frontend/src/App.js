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

  if (loading) {
    return <div className="loading">Loading threat data...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌍 Geospatial Threat Intelligence Mapper</h1>
        <p>Real-time visualization of cyber threats worldwide</p>
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

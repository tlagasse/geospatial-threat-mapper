import React from 'react';
import './App.css';
import ThreatMap from './components/ThreatMap';
import StatsPanel from './components/StatsPanel';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🌍 Geospatial Threat Intelligence Mapper</h1>
        <p>Real-time visualization of cyber threats worldwide</p>
      </header>
      <StatsPanel />
      <ThreatMap />
    </div>
  );
}

export default App;

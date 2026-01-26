import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import './MarkerCluster.css';
import './ThreatMap.css';
import L from 'leaflet';
import axios from 'axios';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom threat marker colors
const getThreatIcon = (confidenceScore) => {
  // Color-code by confidence score
  let color = 'blue'; // default
  
  if (confidenceScore >= 95) {
    color = 'red';      // Critical
  } else if (confidenceScore >= 85) {
    color = 'orange';   // High
  } else if (confidenceScore >= 75) {
    color = 'gold';     // Medium (yellow/gold)
  }
  
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

function ThreatMap({ filteredThreats }) {
  const [allThreats, setAllThreats] = useState([]);
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch threats from Flask backend
    const fetchThreats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/threats');
	setAllThreats(response.data);
        setThreats(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch threat data');
        setLoading(false);
        console.error('Error fetching threats:', err);
      }
    };

    fetchThreats();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchThreats, 30000);
    return () => clearInterval(interval);
  }, []);

// Update threats when filter changes
useEffect(() => {
  if (filteredThreats) {
    setThreats(filteredThreats);
  } else {
    setThreats(allThreats);
  }
}, [filteredThreats, allThreats]);

  if (loading) {
    return <div className="loading">Loading threat data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
  <div className="map-container">
    <MapContainer
        key={threats.length}
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      
      <MarkerClusterGroup
        key={'cluster-${threats.length}'}
        showCoverageOnHover={false}
        spiderfyDistanceMultiplier={2}
        maxClusterRadius={50}
      >
        {threats.map((threat) => (
        <Marker
          key={threat.id}
          position={[threat.latitude, threat.longitude]}
          icon={getThreatIcon(threat.confidence_score)}
        >
            <Popup>
              <div>
                <h3>🚨 Threat Detected</h3>
                <p><strong>IP:</strong> {threat.ip}</p>
                <p><strong>Location:</strong> {threat.city}, {threat.country}</p>
                <p><strong>Confidence:</strong> {threat.confidence_score}%</p>
                <p><strong>Type:</strong> {threat.threat_type}</p>
                <p><strong>Last Seen:</strong> {new Date(threat.last_seen).toLocaleString()}</p>
              </div>
          </Popup>
        </Marker>
        ))}
      </MarkerClusterGroup>


      </MapContainer>
    </div>
  );
}

export default ThreatMap;

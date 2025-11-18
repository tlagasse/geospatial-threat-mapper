import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
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
const getThreatIcon = (threatType) => {
  const colors = {
    malware: 'red',
    phishing: 'orange',
    ddos: 'purple',
    default: 'blue'
  };
  
  const color = colors[threatType] || colors.default;
  
  return L.icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

function ThreatMap() {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch threats from Flask backend
    const fetchThreats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/threats');
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

  if (loading) {
    return <div className="loading">Loading threat data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="map-container">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {threats.map((threat) => (
          <Marker
            key={threat.id}
            position={[threat.latitude, threat.longitude]}
            icon={getThreatIcon(threat.threat_type)}
          >
            <Popup>
              <div>
                <h3>Threat Detected</h3>
                <p><strong>IP:</strong> {threat.ip}</p>
                <p><strong>Type:</strong> {threat.threat_type}</p>
                <p><strong>Time:</strong> {new Date(threat.timestamp).toLocaleString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default ThreatMap;

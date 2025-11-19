# 🌍 Geospatial Threat Intelligence Mapper

A production-ready web platform that visualizes real cyber threats on an interactive map, combining geospatial intelligence analysis techniques with modern cybersecurity threat hunting.

## 🚀 Project Status
✅ **LIVE WITH REAL DATA** - Displaying 50+ real malicious IPs from AbuseIPDB

## ✨ Current Features

- **🗺️ Interactive World Map**: Real-time visualization of cyber threats using Leaflet.js
- **📍 Live Threat Data**: Pulls actual malicious IPs from AbuseIPDB API
- **🌐 Global Coverage**: Threats from 20+ countries across all continents
- **🎯 Intelligent Geolocation**: Automatic IP-to-location mapping
- **💾 SQLite Database**: Stores threat data with metadata (IP, location, confidence, timestamp)
- **🔴 Threat Markers**: Red pins showing confirmed malicious activity
- **📊 Detailed Popups**: Click markers to view IP address, location, threat type, and confidence score
- **🔄 REST API**: Flask backend serving threat data to frontend
- **📱 Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Leaflet.js (interactive mapping)
- Axios (API calls)
- Modern CSS with gradient styling

**Backend:**
- Python Flask
- Flask-CORS (cross-origin requests)
- SQLite database
- Geocoder library for IP geolocation

**Data Sources:**
- AbuseIPDB API (real-time threat intelligence)
- ipinfo.io (IP geolocation)

## 🔧 Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm
- AbuseIPDB API key (free tier)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/tlagasse/geospatial-threat-mapper.git
cd geospatial-threat-mapper

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Create .env file with your API key
echo "ABUSEIPDB_API_KEY=your_api_key_here" > .env

# Collect initial threat data
python backend/collect_threats.py

# Run Flask backend
python backend/app.py
```

Backend runs on `http://localhost:5000`

### Frontend Setup
```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

Frontend runs on `http://localhost:3000`

## 📊 API Endpoints

- `GET /api/health` - Health check
- `GET /api/threats` - Retrieve all threats from database
- `GET /api/stats` - Get threat statistics (total count, top countries)

## 🗺️ Current Data

- **50+ real malicious IPs** from AbuseIPDB
- **20+ countries** represented
- **100% confidence score** threats only
- Updated via manual script execution (automation coming soon)

## 🗺️ Roadmap

### Phase 1: Foundation ✅ COMPLETE
- [x] Set up GitHub repository
- [x] Create Flask REST API
- [x] Build React frontend with Leaflet
- [x] Display threat data on interactive map
- [x] Integrate AbuseIPDB API
- [x] Implement IP geolocation
- [x] Create SQLite database
- [x] Store and retrieve real threat data
- [x] Add statistics endpoint

### Phase 2: Enhanced Features 🚧 IN PROGRESS
- [ ] Automated data collection (cron job/scheduler)
- [ ] Filter threats by country
- [ ] Filter threats by confidence score
- [ ] Filter threats by date range
- [ ] Search functionality (IP, country, city)
- [ ] Different colored markers by threat severity
- [ ] Statistics dashboard
- [ ] Top countries chart

### Phase 3: Advanced Visualization
- [ ] Heat map overlay
- [ ] Timeline/historical view
- [ ] Threat clustering
- [ ] Animation of threats over time
- [ ] Country-level statistics
- [ ] Threat type categorization

### Phase 4: Intelligence Features
- [ ] Pattern-of-life analysis for persistent IPs
- [ ] Threat actor attribution
- [ ] ASN (Autonomous System Number) tracking
- [ ] Geofencing alerts
- [ ] Export reports (PDF/CSV/JSON)
- [ ] Threat feed integration (multiple sources)

### Phase 5: Production & Deployment
- [ ] Migrate to PostgreSQL with PostGIS
- [ ] Add user authentication
- [ ] Rate limiting on API
- [ ] Caching layer (Redis)
- [ ] Docker containerization
- [ ] Deploy to AWS/Heroku/DigitalOcean
- [ ] CI/CD pipeline
- [ ] Comprehensive documentation
- [ ] Demo video

## 🎓 Skills Demonstrated

- **Full-stack Development**: React frontend + Flask backend
- **API Integration**: External threat intelligence services
- **Database Design**: SQLite schema for geospatial data
- **Data Visualization**: Interactive maps with Leaflet.js
- **Cybersecurity**: Threat intelligence analysis
- **Geospatial Analysis**: IP geolocation and mapping
- **RESTful API Design**: Clean, documented endpoints
- **Git Version Control**: Proper branching and commits
- **Problem Solving**: Rate limiting, error handling, data validation

## 📸 Screenshots

### Global Threat View
50+ malicious IPs visualized across the world
![App Screenshot](screenshots/full_map_view.png)

### Threat Details
Click any marker to see IP address, location, confidence score, and timestamp
![App Screenshot](screenshots/threat_details.png)

## 🔄 Data Updates

To refresh threat data:
```bash
python backend/collect_threats.py
```

This fetches the latest 50 high-confidence threats from AbuseIPDB.

## 🤝 Contributing

This is a personal portfolio project.

## 📝 License

MIT License - See LICENSE file for details

## 📧 Contact

Tyler Lagasse - tlagasse@live.com

**Portfolio**: [GitHub Profile](https://github.com/tlagasse)

**LinkedIn**: [Add your LinkedIn URL]

---

*Last Updated: November 2025 - Project actively under development*

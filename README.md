# 🌍 Geospatial Threat Intelligence Mapper

A production-ready web platform that visualizes real cyber threats on an interactive map, combining geospatial intelligence analysis techniques with modern cybersecurity threat hunting.

![Full Application](screenshots/full-application.png)

## 🚀 Project Status
✅ **PRODUCTION-READY** - Automated collection of 100+ real malicious IPs every 6 hours from AbuseIPDB

## ✨ Current Features

- **🗺️ Interactive World Map**: Real-time visualization using Leaflet.js with smooth zoom and pan
- **📍 Live Threat Intelligence**: Integrated with AbuseIPDB API - displays actual malicious IPs with confidence scores
- **🌐 Global Coverage**: Threats from 10+ countries across all continents
- **🎯 Intelligent Geolocation**: Automatic IP-to-location mapping with city-level precision
- **💾 SQLite Database**: Persistent storage with automated cleanup (30-day expiration)
- **🎨 Color-Coded Markers**: Dynamic threat severity visualization - red (90-100%), orange (75-90%), yellow (50-75%)
- **🕷️ Marker Clustering**: Automatic grouping of nearby threats with count badges - click to expand and explore
- **🎨 Smooth Animations**: Fade-in effects for markers, smooth cluster transitions, and hover effects
- **📊 Statistics Dashboard**: Real-time metrics showing total threats, average confidence, top countries, and last update time
- **🔍 Advanced Filtering**: 
  - Filter by country dropdown with full country names
  - Search by IP address or city name
  - Confidence score slider (50-100%)
  - Real-time threat counter
- **🔄 Manual Refresh**: One-click data refresh to fetch latest threats from AbuseIPDB
- **🤖 Automated Data Collection**: Background service runs every 6 hours via systemd
- **🗑️ Data Management**: Automatic deduplication and 30-day threat expiration
- **📱 Responsive Design**: Fully functional on desktop, tablet, and mobile devices
- **🚀 RESTful API**: Flask backend with `/threats`, `/stats`, and `/refresh` endpoints
- **⚡ Performance Optimized**: Limited to 100 most recent threats for fast loading
- **📅 Timeline Filtering**: Filter threats by time range - Last 24 Hours, 7 Days, 30 Days, or All Time with threat counts for each period

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Leaflet.js (interactive mapping)
- Axios (API calls)
- Modern CSS with gradient styling and glassmorphism

**Backend:**
- Python Flask
- Flask-CORS (cross-origin requests)
- SQLite database with optimized queries
- Geocoder library for IP geolocation
- Schedule library for automation

**Data Sources:**
- AbuseIPDB API (real-time threat intelligence)
- ipinfo.io (IP geolocation)

## 🎯 Background

This project combines my experience as a former military intelligence analyst (FMV/GEOINT) with cybersecurity, applying pattern-of-life analysis and geospatial techniques to threat intelligence. The goal is to provide SOC analysts and security researchers with an intuitive visual tool for understanding global threat landscapes.

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

### Optional: Set Up Automated Data Collection

On Linux systems, enable the systemd service for automatic updates every 6 hours:
```bash
sudo cp threat-collector.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable threat-collector.service
sudo systemctl start threat-collector.service
```

## 📊 API Endpoints

- `GET /api/health` - Health check
- `GET /api/threats` - Retrieve 100 most recent threats from database
- `GET /api/stats` - Get threat statistics (total count, top countries, last update time)
- `POST /api/refresh` - Manually trigger data collection from AbuseIPDB

## 📸 Screenshots

### Full Application Overview
![Full Application](screenshots/full-application.png)
*Complete threat intelligence dashboard featuring real-time statistics, interactive filtering, and global threat visualization*

### Statistics Dashboard
![Statistics Dashboard](screenshots/stats-dashboard.png)
*Live metrics showing total threats, average confidence score, and top 5 affected countries*

### Interactive Filtering System
![Active Filters](screenshots/filters-active.png)
*Filter threats by country, search by IP address or city name, adjust confidence threshold with slider*

### Detailed Threat Information
![Threat Details](screenshots/threat-detail-popup.png)
*Click any marker to view comprehensive threat intelligence*

## 🗺️ Development Roadmap

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

### Phase 2: Enhanced Features ✅ COMPLETE
- [x] Automated data collection (runs every 6 hours)
- [x] Manual data refresh button
- [x] Increase threat collection to 100 IPs
- [x] Data deduplication logic
- [x] Data expiration (30-day cleanup)
- [x] Filter by country dropdown
- [x] IP/city search functionality
- [x] Clear filters button
- [x] Real-time threat counter
- [x] Confidence score slider filter
- [x] Color-coded markers by severity
- [x] Statistics dashboard with live metrics
- [x] Last updated timestamp display

### Phase 3: Advanced Visualization 🚧 NEXT
- [x] Marker clustering for dense areas
- [x] Cluster count badges
- [x] Fade-in animations for marker
- [x] Smooth cluster animations on hover
- [x] Timeline/historical view (24h, 7d, 30d, All Time)
- [ ] Animation of threats over time
- [ ] Threat type categorization

### Phase 4: Intelligence Features
- [ ] Pattern-of-life analysis for persistent IPs
- [ ] Threat actor attribution
- [ ] ASN (Autonomous System Number) tracking
- [ ] Geofencing alerts
- [ ] Export reports (PDF/CSV/JSON)
- [ ] Multi-source threat feed integration

### Phase 5: Production & Deployment
- [ ] Migrate to PostgreSQL with PostGIS
- [ ] Add user authentication
- [ ] Rate limiting on API
- [ ] Caching layer (Redis)
- [ ] Docker containerization
- [ ] Deploy to cloud (AWS/DigitalOcean)
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Comprehensive API documentation
- [ ] Demo video

## 🎓 Skills Demonstrated

- **Full-stack Development**: React frontend + Flask backend
- **API Integration**: External threat intelligence services
- **Database Design**: SQLite schema for geospatial data with automated cleanup
- **Data Visualization**: Interactive maps with Leaflet.js
- **Cybersecurity**: Threat intelligence analysis and data collection
- **Geospatial Analysis**: IP geolocation and mapping techniques from GEOINT background
- **System Administration**: Systemd service configuration and automation
- **RESTful API Design**: Clean, documented endpoints
- **Performance Optimization**: Query optimization and data limiting
- **Git Version Control**: Proper commits and documentation

## 🔄 Data Updates

The automated service collects fresh threat data every 6 hours. You can also manually refresh:

**Via UI**: Click the "Refresh Data" button in the header

**Via CLI**:
```bash
python backend/collect_threats.py
```

**Service management**:
```bash
# Check status
sudo systemctl status threat-collector.service

# View logs
sudo journalctl -u threat-collector.service -f

# Restart service
sudo systemctl restart threat-collector.service
```

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📝 License

MIT License - See LICENSE file for details

## 📧 Contact

Tyler Lagasse - tlagasse@live.com

**GitHub**: [github.com/tlagasse](https://github.com/tlagasse)

---

*Last Updated: January 2026 - Production-ready with automated threat collection*

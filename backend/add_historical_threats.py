import sqlite3
from datetime import datetime, timedelta
import random

def add_historical_threats():
    """Add threats with timestamps spread over the last 30 days"""
    conn = sqlite3.connect('data/threats.db')
    cursor = conn.cursor()
    
    # Sample locations with coordinates
    locations = [
        ('45.142.212.61', 51.5074, -0.1278, 'GB', 'London'),
        ('185.220.101.45', 48.8566, 2.3522, 'FR', 'Paris'),
        ('103.251.167.20', 35.6762, 139.6503, 'JP', 'Tokyo'),
        ('167.172.44.255', 40.7128, -74.0060, 'US', 'New York'),
        ('91.203.5.146', 55.7558, 37.6173, 'RU', 'Moscow'),
        ('194.61.53.189', -33.8688, 151.2093, 'AU', 'Sydney'),
        ('88.99.123.45', 52.5200, 13.4050, 'DE', 'Berlin'),
        ('200.100.50.25', -23.5505, -46.6333, 'BR', 'São Paulo'),
        ('115.200.100.50', 39.9042, 116.4074, 'CN', 'Beijing'),
        ('202.88.77.66', 1.3521, 103.8198, 'SG', 'Singapore'),
    ]
    
    threat_types = ['malware', 'phishing', 'ddos', 'spam', 'ransomware']
    
    added = 0
    
    # Create threats for each of the last 30 days
    for days_ago in range(30):
        # Add 2-5 random threats per day
        num_threats = random.randint(2, 5)
        
        for _ in range(num_threats):
            location = random.choice(locations)
            ip, lat, lng, country, city = location
            
            # Random time during that day
            hours_ago = (days_ago * 24) + random.randint(0, 23)
            timestamp = datetime.now() - timedelta(hours=hours_ago)
            
            threat_type = random.choice(threat_types)
            confidence = random.randint(75, 100)
            
            # Create unique IP by adding random numbers
            unique_ip = f"{ip.split('.')[0]}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}"
            
            try:
                cursor.execute('''
                    INSERT INTO threats 
                    (ip, latitude, longitude, threat_type, confidence_score, country, city, timestamp, last_seen)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    unique_ip, lat, lng, threat_type, confidence, 
                    country, city, timestamp.isoformat(), timestamp.isoformat()
                ))
                added += 1
            except sqlite3.IntegrityError:
                # Skip if IP already exists
                pass
    
    conn.commit()
    
    # Show summary
    cursor.execute('SELECT COUNT(*) FROM threats')
    total = cursor.fetchone()[0]
    
    cursor.execute('SELECT MIN(timestamp), MAX(timestamp) FROM threats')
    date_range = cursor.fetchone()
    
    conn.close()
    
    print(f"✅ Added {added} historical threats")
    print(f"📊 Total threats in database: {total}")
    print(f"📅 Date range: {date_range[0]} to {date_range[1]}")

if __name__ == '__main__':
    add_historical_threats()

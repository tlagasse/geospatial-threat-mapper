import sqlite3
from datetime import datetime

# Sample IPs with varied confidence scores
test_threats = [
    ('45.142.212.61', 51.5074, -0.1278, 'phishing', 52, 'United Kingdom', 'London'),
    ('185.220.101.45', 48.8566, 2.3522, 'malware', 65, 'France', 'Paris'),
    ('103.251.167.20', 35.6762, 139.6503, 'ddos', 78, 'Japan', 'Tokyo'),
    ('167.172.44.255', 40.7128, -74.0060, 'spam', 82, 'United States', 'New York'),
    ('91.203.5.146', 55.7558, 37.6173, 'malware', 88, 'Russia', 'Moscow'),
    ('194.61.53.189', -33.8688, 151.2093, 'phishing', 91, 'Australia', 'Sydney'),
]

def add_test_threats():
    conn = sqlite3.connect('data/threats.db')
    cursor = conn.cursor()
    
    for threat in test_threats:
        ip, lat, lng, threat_type, confidence, country, city = threat
        
        try:
            cursor.execute('''
                INSERT OR REPLACE INTO threats 
                (ip, latitude, longitude, threat_type, confidence_score, country, city, timestamp, last_seen)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                ip, lat, lng, threat_type, confidence, country, city,
                datetime.now().isoformat(),
                datetime.now().isoformat()
            ))
            print(f"✅ Added: {ip} ({confidence}%) in {city}, {country}")
        except Exception as e:
            print(f"❌ Error adding {ip}: {e}")
    
    conn.commit()
    conn.close()
    print(f"\n🎉 Added {len(test_threats)} test threats with varied confidence scores!")

if __name__ == '__main__':
    add_test_threats()

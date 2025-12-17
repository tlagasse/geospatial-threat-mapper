import os
import requests
import sqlite3
from datetime import datetime
from dotenv import load_dotenv
import geocoder
import time

# Load environment variables
load_dotenv()

ABUSEIPDB_API_KEY = os.getenv('ABUSEIPDB_API_KEY')
ABUSEIPDB_URL = 'https://api.abuseipdb.com/api/v2/blacklist'

def init_database():
    """Initialize SQLite database"""
    conn = sqlite3.connect('data/threats.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS threats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT UNIQUE NOT NULL,
            latitude REAL,
            longitude REAL,
            threat_type TEXT,
            confidence_score INTEGER,
            country TEXT,
            city TEXT,
            timestamp TEXT,
            last_seen TEXT
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Database initialized")

def cleanup_old_threats():
    """Remove threats older than 29 days and handle duplicates"""
    conn = sqlite3.connect('data/threats.db')
    cursor = conn.cursor()
    
    # Delete threats older than 29 days
    cursor.execute('''
        DELETE FROM threats
        WHERE datetime(timestamp) < datetime('now', '-29 days')
    ''')
    deleted_old = cursor.rowcount
    
    # Remove duplicate IPs, keeping only the most recent
    cursor.execute('''
        DELETE FROM threats
        WHERE id NOT IN (
            SELECT MIN(id)
            FROM threats
            GROUP BY ip
        )
    ''')
    deleted_dupes = cursor.rowcount
    
    conn.commit()
    conn.close()
    
    if deleted_old > 0:
        print(f"🗑️  Removed {deleted_old} threats older than 29 days")
    if deleted_dupes > 0:
        print(f"🗑️  Removed {deleted_dupes} duplicate entries")
    
    if deleted_old == 0 and deleted_dupes == 0:
        print("✅ No old or duplicate threats to remove")

def get_ip_location(ip):
    """Get latitude and longitude for an IP address"""
    try:
        # Use ipinfo.io (free, no API key needed for basic use)
        g = geocoder.ip(ip)
        
        if g.ok and g.latlng:
            return {
                'latitude': g.latlng[0],
                'longitude': g.latlng[1],
                'country': g.country if g.country else 'Unknown',
                'city': g.city if g.city else 'Unknown'
            }
        
        time.sleep(0.5)  # Small delay to avoid rate limiting
        
    except Exception as e:
        pass
    
    return {'latitude': None, 'longitude': None, 'country': 'Unknown', 'city': 'Unknown'}

def fetch_threats():
    """Fetch threats from AbuseIPDB"""
    if not ABUSEIPDB_API_KEY:
        print("❌ Error: ABUSEIPDB_API_KEY not found in .env file")
        return []
    
    headers = {
        'Key': ABUSEIPDB_API_KEY,
        'Accept': 'application/json'
    }
    
    params = {
        'limit': 100,
        'confidenceMinimum': 90
    }
    
    try:
        print("🔍 Fetching threats from AbuseIPDB...")
        response = requests.get(ABUSEIPDB_URL, headers=headers, params=params, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            threats = data.get('data', [])
            print(f"✅ Found {len(threats)} threats\n")
            return threats
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return []
    
    except Exception as e:
        print(f"❌ Error fetching threats: {e}")
        return []

def store_threats(threats):
    """Store threats in database with geolocation"""
    conn = sqlite3.connect('data/threats.db')
    cursor = conn.cursor()
    
    stored_count = 0
    updated_count = 0
    skipped_count = 0
    
    for i, threat in enumerate(threats, 1):
        ip = threat.get('ipAddress')
        confidence = threat.get('abuseConfidenceScore', 0)
        
        print(f"📍 [{i}/{len(threats)}] Processing: {ip} (Confidence: {confidence}%)", end=' ')
        
        # Get geolocation
        location = get_ip_location(ip)
        
        if location['latitude'] and location['longitude']:
            try:
                # Check if IP already exists
                cursor.execute('SELECT id FROM threats WHERE ip = ?', (ip,))
                existing = cursor.fetchone()
                
                if existing:
                    # Update existing threat with new last_seen time
                    cursor.execute('''
                        UPDATE threats 
                        SET last_seen = ?, confidence_score = ?
                        WHERE ip = ?
                    ''', (
                        datetime.now().isoformat(),
                        confidence,
                        ip
                    ))
                    updated_count += 1
                    print(f"🔄 Updated: {location['city']}, {location['country']}")
                else:
                    # Insert new threat
                    cursor.execute('''
                        INSERT INTO threats 
                        (ip, latitude, longitude, threat_type, confidence_score, country, city, timestamp, last_seen)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        ip,
                        location['latitude'],
                        location['longitude'],
                        'malware',
                        confidence,
                        location['country'],
                        location['city'],
                        datetime.now().isoformat(),
                        datetime.now().isoformat()
                    ))
                    stored_count += 1
                    print(f"✅ Stored: {location['city']}, {location['country']}")
            except Exception as e:
                print(f"⚠️  Error: {e}")
                skipped_count += 1
        else:
            print(f"⚠️  Skipped (no location)")
            skipped_count += 1
    
    conn.commit()
    conn.close()
    
    print(f"\n{'='*60}")
    print(f"✅ New threats stored: {stored_count}")
    print(f"🔄 Existing threats updated: {updated_count}")
    print(f"⚠️  Skipped: {skipped_count}")

def main():
    print("=" * 60)
    print("🌍 Geospatial Threat Intelligence Mapper - Data Collection")
    print("=" * 60 + "\n")
    
    # Initialize database
    init_database()

    # Clean up old and duplicate threats
    cleanup_old_threats()

    threats = fetch_threats()
    
    if threats:
        store_threats(threats)
        
        # Show final stats
        conn = sqlite3.connect('data/threats.db')
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) FROM threats')
        total = cursor.fetchone()[0]
        conn.close()
        
        print(f"📊 Total threats in database: {total}")
    else:
        print("❌ No threats to store")
    
    print("\n✅ Data collection complete!")
    print("=" * 60)

if __name__ == '__main__':
    main()

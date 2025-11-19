from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect('data/threats.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'ok',
        'message': 'Geospatial Threat Mapper API is running'
    })

@app.route('/api/threats')
def get_threats():
    """Get all threats from database"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM threats ORDER BY confidence_score DESC')
        rows = cursor.fetchall()
        conn.close()
        
        threats = []
        for row in rows:
            threats.append({
                'id': row['id'],
                'ip': row['ip'],
                'latitude': row['latitude'],
                'longitude': row['longitude'],
                'threat_type': row['threat_type'],
                'confidence_score': row['confidence_score'],
                'country': row['country'],
                'city': row['city'],
                'timestamp': row['timestamp'],
                'last_seen': row['last_seen']
            })
        
        return jsonify(threats)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats')
def get_stats():
    """Get threat statistics"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Total threats
        cursor.execute('SELECT COUNT(*) as total FROM threats')
        total = cursor.fetchone()['total']
        
        # Threats by country
        cursor.execute('''
            SELECT country, COUNT(*) as count 
            FROM threats 
            GROUP BY country 
            ORDER BY count DESC 
            LIMIT 10
        ''')
        by_country = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        
        return jsonify({
            'total_threats': total,
            'top_countries': by_country
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

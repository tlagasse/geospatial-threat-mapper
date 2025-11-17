from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/health')
def health_check():
    return jsonify({
        'status': 'ok',
        'message': 'Geospatial Threat Mapper API is running'
    })

@app.route('/api/threats')
def get_threats():
    # Placeholder data - we'll replace this with real data later
    sample_threats = [
        {
            'id': 1,
            'ip': '192.168.1.1',
            'latitude': 37.7749,
            'longitude': -122.4194,
            'threat_type': 'malware',
            'timestamp': '2025-11-17T10:30:00Z'
        }
    ]
    return jsonify(sample_threats)

if __name__ == '__main__':
    app.run(debug=True, port=5000)

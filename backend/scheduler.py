import schedule
import time
import subprocess
import os
from datetime import datetime

def collect_threat_data():
    """Run the threat collection script"""
    print(f"\n{'='*60}")
    print(f"🕐 Starting scheduled data collection - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}\n")
    
    try:
        # Get the path to the collect_threats script
        script_path = os.path.join(os.path.dirname(__file__), 'collect_threats.py')
        
        # Run the collection script
        result = subprocess.run(
            ['python', script_path],
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )
        
        # Print output
        print(result.stdout)
        
        if result.returncode == 0:
            print(f"\n✅ Data collection completed successfully at {datetime.now().strftime('%H:%M:%S')}")
        else:
            print(f"\n❌ Data collection failed:")
            print(result.stderr)
    
    except Exception as e:
        print(f"\n❌ Error during data collection: {e}")
    
    print(f"\n{'='*60}")
    print(f"Next collection scheduled in 6 hours")
    print(f"{'='*60}\n")

def main():
    print(f"{'='*60}")
    print("🤖 Automated Threat Intelligence Collection Service")
    print(f"{'='*60}")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("Schedule: Every 6 hours")
    print(f"{'='*60}\n")
    
    # Run immediately on startup
    print("Running initial data collection...")
    collect_threat_data()
    
    # Schedule to run every 6 hours
    schedule.every(6).hours.do(collect_threat_data)
    
    print("\n✅ Scheduler is running. Press Ctrl+C to stop.\n")
    
    # Keep the script running
    while True:
        schedule.run_pending()
        time.sleep(60)  # Check every minute

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n🛑 Scheduler stopped by user")
        print("Goodbye!")

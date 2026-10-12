"""
Simple script to create a clean SQLite database (Recreated)
"""
import sqlite3
import os

def create_simple_db():
    print("=" * 60)
    print("Creating Simple SQLite Database")
    print("=" * 60)
    
    # Database path
    instance_dir = os.path.join(os.getcwd(), 'instance')
    db_path = os.path.join(instance_dir, 'farmer_app.db')
    
    # Create instance directory
    os.makedirs(instance_dir, exist_ok=True)
    print(f"✅ Instance directory: {instance_dir}")
    
    # Remove old database if exists
    if os.path.exists(db_path):
        try:
            os.remove(db_path)
            print(f"✅ Removed old database")
        except Exception as e:
            print(f"❌ Could not remove old DB: {e}")
    
    # Create connection
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        print(f"✅ Connected to database: {db_path}")
        
        # Create farmers table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS farmers (
                id TEXT PRIMARY KEY,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                phone TEXT,
                is_verified INTEGER DEFAULT 0,
                created_at TEXT,
                last_login TEXT
            )
        ''')
        print("✅ Created 'farmers' table")
        
        # Create email_otps table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS email_otps (
                id TEXT PRIMARY KEY,
                farmer_id TEXT NOT NULL,
                otp_code TEXT NOT NULL,
                expires_at TEXT NOT NULL,
                is_used INTEGER DEFAULT 0,
                FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
            )
        ''')
        print("✅ Created 'email_otps' table")
        
        # Create login_sessions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS login_sessions (
                id TEXT PRIMARY KEY,
                farmer_id TEXT NOT NULL,
                ip_address TEXT,
                user_agent TEXT,
                created_at TEXT,
                expires_at TEXT,
                FOREIGN KEY (farmer_id) REFERENCES farmers(id)
            )
        ''')
        print("✅ Created 'login_sessions' table")
        
        # Commit and close
        conn.commit()
        conn.close()
        print("\n✅ Database creation complete!")
        
    except Exception as e:
        print(f"❌ Database creation failed: {e}")

if __name__ == '__main__':
    create_simple_db()

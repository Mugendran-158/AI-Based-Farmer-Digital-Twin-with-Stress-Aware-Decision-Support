import sqlite3
import os

db_path = "instance/site_v2.db"

if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if tables exist
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("Tables in database:")
    for table in tables:
        print(f"  - {table[0]}")
    
    # Check farmers table schema
    if any('farmers' in str(t) for t in tables):
        cursor.execute("PRAGMA table_info(farmers);")
        columns = cursor.fetchall()
        print("\nFarmers table schema:")
        for col in columns:
            print(f"  {col[1]} ({col[2]})")
    
    # Check login_sessions table schema
    if any('login_sessions' in str(t) for t in tables):
        cursor.execute("PRAGMA table_info(login_sessions);")
        columns = cursor.fetchall()
        print("\nLogin_sessions table schema:")
        for col in columns:
            print(f"  {col[1]} ({col[2]})")
    
    conn.close()
else:
    print(f"Database not found at {db_path}")

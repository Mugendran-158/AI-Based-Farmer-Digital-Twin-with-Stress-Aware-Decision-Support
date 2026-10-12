import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

DB_URL = os.getenv("DATABASE_URL")

print(f"Checking PostgreSQL connection...")
print(f"URL: {DB_URL}")

try:
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    print("✅ Connection Successful!")
    
    # Check permissions
    try:
        cur.execute("CREATE TABLE IF NOT EXISTS test_perm (id serial PRIMARY KEY);")
        print("✅ Create Table Permission: GRANTED")
        cur.execute("DROP TABLE test_perm;")
    except Exception as e:
        print(f"❌ Create Table Permission: DENIED ({e})")
        
    conn.close()
except Exception as e:
    print(f"❌ Connection Failed: {e}")

import sqlite3
import os

db_path = 'instance/site_v2.db'
if not os.path.exists(db_path):
    print(f"DB NOT FOUND at {db_path}")
    # try current dir
    db_path = 'site_v2.db'
    if not os.path.exists(db_path):
        print("DB NOT FOUND in current dir either.")
        exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("PRAGMA table_info(users)")
cols = cursor.fetchall()
print(f"Columns in {db_path} 'users' table:")
for c in cols:
    print(c)
conn.close()

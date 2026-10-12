import sqlite3
import os

db_path = 'instance/site_v2.db'
if not os.path.exists(db_path):
    db_path = 'site_v2.db'

conn = sqlite3.connect(db_path)
cursor = conn.cursor()
cursor.execute("SELECT id, email, name FROM users")
users = cursor.fetchall()
print("Registered Users:")
for u in users:
    print(u)
conn.close()

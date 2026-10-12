import sqlite3
import os

db_path = 'instance/site_v2.db'

if not os.path.exists(db_path):
    print(f"Error: Database {db_path} not found.")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    print("Checking users table columns...")
    cursor.execute("PRAGMA table_info(users)")
    columns = [col[1] for col in cursor.fetchall()]
    print(f"Current columns: {columns}")

    needed_columns = {
        'phone_number': 'TEXT',
        'role': 'TEXT',
        'profile_image': 'TEXT',
        'last_readiness': 'TEXT',
        'status': 'TEXT',
        'last_login': 'DATETIME'
    }

    for col_name, col_type in needed_columns.items():
        if col_name not in columns:
            print(f"Adding missing column: {col_name}")
            cursor.execute(f"ALTER TABLE users ADD COLUMN {col_name} {col_type}")
            conn.commit()
            print(f"Added {col_name} successfully.")
        else:
            print(f"Column {col_name} already exists.")

    print("Success: Database schema updated.")
except Exception as e:
    print(f"Error updating database: {e}")
finally:
    conn.close()

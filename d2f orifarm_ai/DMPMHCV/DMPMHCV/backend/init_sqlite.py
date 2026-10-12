import os
import sys
from app import app
from extensions import db
import traceback

def init_sqlite():
    print("[INIT] Initializing SQLite Database...")
    
    # Ensure instance directory exists
    if not os.path.exists('instance'):
        print("Creating 'instance' directory...")
        os.makedirs('instance')
        
    with app.app_context():
        try:
            print(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")
            db.create_all()
            print("[SUCCESS] SQLite database initialized successfully!")
            
            # Verify tables
            inspector = db.inspect(db.engine)
            tables = inspector.get_table_names()
            print(f"Tables created: {', '.join(tables)}")
            
        except Exception as e:
            print("[ERROR] Initialization failed - check init_error.log")
            error_msg = traceback.format_exc()
            with open('init_error.log', 'w', encoding='utf-8') as f:
                f.write(error_msg)
            sys.exit(1)

if __name__ == "__main__":
    init_sqlite()

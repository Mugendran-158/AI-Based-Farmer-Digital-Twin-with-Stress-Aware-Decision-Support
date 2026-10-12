from app import app
from extensions import db

def init_db():
    print("[INIT] Initializing PostgreSQL Database (Zero-Trust Schema)...")
    with app.app_context():
        try:
            db.create_all()
            print("[SUCCESS] Tables verified/created successfully.")
            print("- Farmers Table (UUID, Biometrics)")
            print("- LoginSessions Table (Trust Score)")
            print("- EmailOTPs Table")
        except Exception as e:
            print(f"[ERROR] Database Initialization Failed: {e}")

if __name__ == "__main__":
    init_db()

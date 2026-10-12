import os
import sys
from flask import Flask
from extensions import db, bcrypt
from models import Farmer

# Setup direct path to db for check
db_path = os.path.join(os.getcwd(), 'instance', 'farmer_app.db')
print(f"Checking database at: {db_path}")
if not os.path.exists(db_path):
    print("❌ Database file does not exist!")
    
try:
    from app import app
    print("✅ App imported successfully")
except Exception as e:
    print(f"❌ Failed to import app: {e}")
    sys.exit(1)

def test_db_write():
    print("\n--- Testing Direct Database Write ---")
    with app.app_context():
        try:
            # Check if table exists
            inspector = db.inspect(db.engine)
            tables = inspector.get_table_names()
            print(f"Tables found: {tables}")
            
            if 'farmers' not in tables:
                print("❌ 'farmers' table missing! Creating tables...")
                db.create_all()
            
            # Try to add a user
            test_email = "diag_test@example.com"
            existing = Farmer.query.filter_by(email=test_email).first()
            if existing:
                print("Test user already exists, removing...")
                db.session.delete(existing)
                db.session.commit()
            
            new_farmer = Farmer(
                full_name="Diag Test",
                email=test_email,
                password_hash="hash",
                phone="1234567890",
                is_verified=True
            )
            db.session.add(new_farmer)
            db.session.commit()
            print("✅ Successfully wrote to database!")
            
            # Clean up
            db.session.delete(new_farmer)
            db.session.commit()
            print("✅ Successfully cleaned up test user")
            return True
            
        except Exception as e:
            print(f"❌ Database insert failed: {e}")
            import traceback
            traceback.print_exc()
            return False

def test_api_register():
    print("\n--- Testing API Registration Route ---")
    client = app.test_client()
    
    # Payload
    data = {
        "email": "api_test@example.com",
        "password": "Password123!",
        "name": "API Tester",
        "phone": "5555555555"
    }
    
    try:
        # First ensure user doesn't exist
        with app.app_context():
            existing = Farmer.query.filter_by(email=data['email']).first()
            if existing:
                db.session.delete(existing)
                db.session.commit()

        # Call API
        response = client.post('/api/auth/register', json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.get_json()}")
        
        if response.status_code == 201:
            print("✅ API Registration Successful")
            return True
        else:
            print("❌ API Registration Failed")
            return False
    except Exception as e:
        print(f"❌ API Request Exception: {e}")
        return False

if __name__ == "__main__":
    db_ok = test_db_write()
    if db_ok:
        api_ok = test_api_register()
        if api_ok:
            print("\n✨ DIAGNOSTIC COMPLETE: SYSTEM IS HEALTHY ✨")
        else:
            print("\n⚠️ Database works, but API failed")
    else:
        print("\nCRITICAL: Database is broken")

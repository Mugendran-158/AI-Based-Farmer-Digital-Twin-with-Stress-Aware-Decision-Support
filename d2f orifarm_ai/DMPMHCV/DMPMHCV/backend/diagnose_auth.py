"""
Standalone test to debug authentication issues
"""
import sys
import traceback
from flask import Flask
from flask_cors import CORS
from extensions import db, bcrypt
from models import User
import secrets

# Create test app
app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configuration
app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)

print("=" * 70)
print("DEBUGING AUTHENTICATION SYSTEM")
print("=" * 70)

# Test database connection
with app.app_context():
    try:
        print("\n1. Testing database connection...")
        db.create_all()
        print("   ✓ Database initialized successfully")
        
        # Test user count
        user_count = User.query.count()
        print(f"   ✓ Current users in database: {user_count}")
        
    except Exception as e:
        print(f"   ✗ Database error: {e}")
        traceback.print_exc()
        sys.exit(1)
    
    # Test bcrypt
    try:
        print("\n2. Testing password hashing...")
        test_password = "TestPassword123"
        hashed = bcrypt.generate_password_hash(test_password).decode('utf-8')
        print(f"   ✓ Password hashed: {hashed[:20]}...")
        
        is_valid = bcrypt.check_password_hash(hashed, test_password)
        print(f"   ✓ Password verification: {is_valid}")
        
    except Exception as e:
        print(f"   ✗ Bcrypt error: {e}")
        traceback.print_exc()
        sys.exit(1)
    
    # Test user creation
    try:
        print("\n3. Testing user registration...")
        test_email = "debug_test@farm.com"
        
        # Check if user exists
        existing_user = User.query.filter_by(email=test_email).first()
        if existing_user:
            print(f"   - Deleting existing test user...")
            db.session.delete(existing_user)
            db.session.commit()
        
        # Create new user
        hashed_password = bcrypt.generate_password_hash("DebugPass123").decode('utf-8')
        new_user = User(
            email=test_email,
            password_hash=hashed_password,
            name="Debug Test User",
            role="Farmer"
        )
        
        db.session.add(new_user)
        db.session.commit()
        print(f"   ✓ User created with ID: {new_user.id}")
        
        # Verify user was created
        fetched_user = User.query.filter_by(email=test_email).first()
        if fetched_user:
            print(f"   ✓ User retrieved: {fetched_user.name} ({fetched_user.email})")
            print(f"   ✓ User dict: {fetched_user.to_dict()}")
        else:
            print(f"   ✗ Could not retrieve user after creation")
            
    except Exception as e:
        print(f"   ✗ User creation error: {e}")
        traceback.print_exc()
        db.session.rollback()
        sys.exit(1)
    
    # Test login logic
    try:
        print("\n4. Testing login logic...")
        user = User.query.filter_by(email=test_email).first()
        
        if user:
            is_valid = bcrypt.check_password_hash(user.password_hash, "DebugPass123")
            print(f"   ✓ Password check: {is_valid}")
            
            if is_valid:
                print(f"   ✓ Login would succeed for {user.email}")
            else:
                print(f"   ✗ Login would fail - password mismatch")
        else:
            print(f"   ✗ User not found")
            
    except Exception as e:
        print(f"   ✗ Login logic error: {e}")
        traceback.print_exc()

print("\n" + "=" * 70)
print("DIAGNOSIS COMPLETE")
print("=" * 70)
print("\nIf all tests passed, the authentication system should work.")
print("Check the Flask app logs for actual error messages during API calls.")

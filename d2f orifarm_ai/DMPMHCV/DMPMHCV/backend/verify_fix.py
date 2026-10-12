from extensions import db, bcrypt
from models import User
from app import app
import json

with app.app_context():
    print("Testing DB connection and User query...")
    try:
        users = User.query.all()
        print(f"Total users found: {len(users)}")
        if users:
            test_user = users[0]
            print(f"Test user: {test_user.email}, Role: {test_user.role}, Phone: {test_user.phone_number}")
            # Verify serialization
            user_dict = test_user.to_dict()
            print(f"Serialized user: {json.dumps(user_dict, indent=2)}")
        print("Success: DB query and serialization working.")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

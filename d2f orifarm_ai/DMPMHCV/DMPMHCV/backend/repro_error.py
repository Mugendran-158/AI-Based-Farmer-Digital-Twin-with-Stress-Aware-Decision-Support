import sys
from app import app, db, User, bcrypt

print("STARTING DIRECT DB TEST")
try:
    with app.app_context():
        # recreate db just to be sure
        db.create_all()
        print("DB Verified.")
        
        email = "crash_test@test.com"
        password = "test"
        name = "Crash Test"
        role = "Farmer"
        
        # Check if user exists
        if User.query.filter_by(email=email).first():
             print("User exists, cleaning up...")
             User.query.filter_by(email=email).delete()
             db.session.commit()

        print("Hashing password...")
        pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        
        print("Creating User object...")
        user = User(email=email, password_hash=pw_hash, name=name, role=role)
        
        print("Adding to session...")
        db.session.add(user)
        
        print("Committing...")
        db.session.commit()
        print("SUCCESS! User created.")
except Exception as e:
    print("\n" + "!"*30)
    print("CAPTURED ERROR:")
    print("!"*30)
    with open("error.log", "w") as f:
        import traceback
        f.write(traceback.format_exc())
    print("Error written to error.log")

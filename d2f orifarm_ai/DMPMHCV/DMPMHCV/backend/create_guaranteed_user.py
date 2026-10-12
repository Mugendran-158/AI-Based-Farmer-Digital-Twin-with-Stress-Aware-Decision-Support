from extensions import db, bcrypt
from models import User
from app import app
import os

with app.app_context():
    email = "farmer@farm.com"
    password = "farmer123"
    
    # Check if exists
    existing = User.query.filter_by(email=email).first()
    if existing:
        db.session.delete(existing)
        db.session.commit()
        print(f"Removed existing {email}")

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(
        email=email, 
        password_hash=hashed_password, 
        name="Farmer Joe", 
        role="Farmer"
    )
    
    db.session.add(new_user)
    db.session.commit()
    print(f"User {email} created successfully with password {password}")

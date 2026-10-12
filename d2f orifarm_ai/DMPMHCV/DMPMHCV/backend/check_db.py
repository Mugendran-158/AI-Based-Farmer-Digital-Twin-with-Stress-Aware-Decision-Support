from app import app
from models import User
from extensions import db

with app.app_context():
    users = User.query.all()
    print(f"Total users: {len(users)}")
    for user in users:
        print(f"User: {user.email}, Name: {user.name}")

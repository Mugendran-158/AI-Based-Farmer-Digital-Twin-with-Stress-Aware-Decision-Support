from flask import Flask
from extensions import db
from models import Farmer
import os
import uuid
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    print("Testing DB Connection & Insert...")
    try:
        new_farmer = Farmer(
            full_name="Test User",
            email=f"test_{uuid.uuid4().hex[:6]}@example.com",
            password_hash="hash",
            phone="123"
        )
        db.session.add(new_farmer)
        db.session.commit()
        print(f"✅ Success! Created Farmer ID: {new_farmer.id}")
    except Exception as e:
        print(f"❌ Failed: {e}")

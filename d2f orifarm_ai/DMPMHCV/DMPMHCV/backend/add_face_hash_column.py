import os
from dotenv import load_dotenv
from flask import Flask
from extensions import db
from sqlalchemy import text

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

def add_column():
    with app.app_context():
        try:
            # Check if column exists
            query = text("SELECT column_name FROM information_schema.columns WHERE table_name='farmers' AND column_name='face_id_hash';")
            result = db.session.execute(query).fetchone()
            
            if not result:
                print("Adding face_id_hash column to farmers table...")
                db.session.execute(text("ALTER TABLE farmers ADD COLUMN face_id_hash VARCHAR(64) UNIQUE;"))
                db.session.execute(text("CREATE INDEX idx_farmers_face_id_hash ON farmers (face_id_hash);"))
                db.session.commit()
                print("Column added successfully.")
            else:
                print("Column face_id_hash already exists.")
        except Exception as e:
            print(f"Error: {e}")
            db.session.rollback()

if __name__ == "__main__":
    add_column()

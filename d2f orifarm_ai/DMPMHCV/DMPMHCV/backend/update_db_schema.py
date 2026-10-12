from extensions import db
from flask import Flask
from models import Farmer
import os
from sqlalchemy import text
from dotenv import load_dotenv

# Load env from the same directory as this script
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

def update_schema():
    with app.app_context():
        try:
            # Check if column exists
            with db.engine.connect() as conn:
                result = conn.execute(text("SELECT column_name FROM information_schema.columns WHERE table_name='farmers' AND column_name='security_code'"))
                if result.rowcount == 0:
                    print("Adding security_code column to farmers table...")
                    conn.execute(text("ALTER TABLE farmers ADD COLUMN security_code VARCHAR(10)"))
                    conn.commit()
                    print("Column added successfully.")
                else:
                    print("Column security_code already exists.")
        except Exception as e:
            print(f"Error updating schema: {e}")

if __name__ == '__main__':
    update_schema()

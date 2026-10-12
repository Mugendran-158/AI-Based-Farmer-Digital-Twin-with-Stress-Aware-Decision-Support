from app import app
from extensions import db
import traceback

with app.app_context():
    try:
        print(f"Connecting to: {app.config['SQLALCHEMY_DATABASE_URI']}")
        db.create_all()
        print("Success!")
    except Exception:
        with open("db_debug.txt", "w") as f:
            f.write(traceback.format_exc())
        print("Failed - check db_debug.txt")

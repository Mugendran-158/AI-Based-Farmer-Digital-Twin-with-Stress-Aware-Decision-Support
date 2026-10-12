from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os

db = SQLAlchemy(session_options={"expire_on_commit": False})
bcrypt = Bcrypt()
jwt = JWTManager()

# Configure rate limiter with Redis if available, otherwise use in-memory
redis_url = os.getenv('REDIS_URL')
if redis_url:
    limiter = Limiter(
        key_func=get_remote_address,
        default_limits=["200 per day", "50 per hour"],
        storage_uri=redis_url
    )
else:
    limiter = Limiter(
        key_func=get_remote_address,
        default_limits=["200 per day", "50 per hour"]
    )

import jwt
import datetime
from flask import request, jsonify
from functools import wraps
from models import User
from extensions import db
import os

# Configuration (should be in .env but defaults provided for safety)
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default-dev-secret-key-change-in-prod')
JWT_ACCESS_EXPIRATION_MINUTES = 60
JWT_REFRESH_EXPIRATION_DAYS = 7

def create_access_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=JWT_ACCESS_EXPIRATION_MINUTES),
        'type': 'access'
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')

def create_refresh_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=JWT_REFRESH_EXPIRATION_DAYS),
        'type': 'refresh'
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Check Authorization header
        auth_header = request.headers.get('Authorization')
        if auth_header:
            parts = auth_header.split()
            if len(parts) == 2 and parts[0] == 'Bearer':
                token = parts[1]
        
        if not token:
            return jsonify({'error': 'Authentication token is missing'}), 401
        
        try:
            data = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
            if data.get('type') != 'access':
                 return jsonify({'error': 'Invalid token type'}), 401
                 
            current_user = User.query.get(data['user_id'])
            if not current_user:
                return jsonify({'error': 'User not found'}), 401
                
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401
        except Exception as e:
            return jsonify({'error': 'Token validation failed'}), 500
            
        return f(current_user, *args, **kwargs)
    
    return decorated

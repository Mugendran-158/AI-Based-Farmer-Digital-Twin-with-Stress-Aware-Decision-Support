from extensions import db, bcrypt
from datetime import datetime, timezone
import uuid
from sqlalchemy import String, LargeBinary

class Farmer(db.Model):
    __tablename__ = 'farmers'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.Text, nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    
    # Biometric Data (Zero-Trust Layer 1)
    face_embedding = db.Column(db.LargeBinary, nullable=True) # Encrypted face embedding
    voice_embedding = db.Column(db.LargeBinary, nullable=True) # Encrypted voice embedding
    face_id_hash = db.Column(db.String(64), unique=True, nullable=True, index=True) # Unique stable hash for face
    
    # Security Status
    is_verified = db.Column(db.Boolean, default=False)
    risk_score = db.Column(db.Float, default=0.0) # 0.0 to 100.0 (High Risk)
    
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    last_login = db.Column(db.DateTime(timezone=True), nullable=True)
    last_security_check = db.Column(db.DateTime(timezone=True), nullable=True)
    
    # Conversational Login
    security_code = db.Column(db.String(128), nullable=True) 

    def to_dict(self):
        return {
            'id': str(self.id),
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'age': self.age,
            'is_verified': self.is_verified,
            'risk_score': self.risk_score,
            'has_face_id': self.face_embedding is not None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class EmailOTP(db.Model):
    __tablename__ = 'email_otps'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    farmer_id = db.Column(db.String(36), db.ForeignKey('farmers.id', ondelete='CASCADE'))
    otp_code = db.Column(db.String(6), nullable=False)
    expires_at = db.Column(db.DateTime(timezone=True), nullable=False)
    is_used = db.Column(db.Boolean, default=False)

class LoginSession(db.Model):
    """
    Zero-Trust Session Tracking
    """
    __tablename__ = 'login_sessions'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    farmer_id = db.Column(db.String(36), db.ForeignKey('farmers.id'))
    
    ip_address = db.Column(db.Text, nullable=True)
    user_agent = db.Column(db.Text, nullable=True)
    device_fingerprint = db.Column(db.Text, nullable=True) # Browser fingerprint hash
    
    trust_score = db.Column(db.Float, default=100.0) # Session specific trust
    
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    expires_at = db.Column(db.DateTime(timezone=True), nullable=True)


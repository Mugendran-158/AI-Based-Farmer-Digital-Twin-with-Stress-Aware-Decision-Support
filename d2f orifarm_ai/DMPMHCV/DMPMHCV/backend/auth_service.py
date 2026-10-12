from models import Farmer, LoginSession
from extensions import db
from datetime import datetime, timezone, timedelta
import secrets

class ZeroTrustGuardian:
    """
    Zero-Trust Security Engine
    Evaluates every request for risk, trust, and anomaly detection.
    """
    
    @staticmethod
    def calculate_login_risk(email, ip_address, user_agent, human_score=0):
        """
        Calculates risk score (0-100) for a login attempt.
        """
        risk_score = 0.0
        
        # Factor 1: User Existence check
        farmer = Farmer.query.filter_by(email=email).first()
        if not farmer:
            return 100.0, "User not found"
            
        # Factor 2: Device Familiarity (Mock logic for now, real DB query)
        # Check if this IP/UA combination has been seen before
        known_session = LoginSession.query.filter_by(
            farmer_id=farmer.id,
            ip_address=ip_address,
            user_agent=user_agent
        ).first()
        
        if not known_session:
            risk_score += 30.0 # New device/location penalty
            
        # Factor 3: Time Anomaly (Midnight logins might be riskier?)
        current_hour = datetime.now(timezone.utc).hour
        if 1 <= current_hour <= 4:
            risk_score += 10.0
            
        # Factor 4: Previous Account Risk
        if farmer.risk_score > 50.0:
            risk_score += 20.0

        # Factor 5: Human Presence Verification (Soft CAPTCHA)
        if human_score < 30:
            risk_score += 40.0 # High Bot Likelihood
        elif human_score > 80:
            risk_score -= 10.0 # High Human Likelihood (Bonus Trust)
            
        # Cap at 100
        return min(max(risk_score, 0.0), 100.0), farmer

    @staticmethod
    def create_session(farmer, ip_address, user_agent):
        """
        Creates a new tracked session with trust score.
        """
        # Base trust starts high if low risk, low if high risk
        initial_trust = 100.0 - farmer.risk_score
        
        new_session = LoginSession(
            farmer_id=farmer.id,
            ip_address=ip_address,
            user_agent=user_agent,
            trust_score=initial_trust,
            expires_at=datetime.now(timezone.utc) + timedelta(hours=2),
            device_fingerprint=secrets.token_hex(16) # Simulate fingerprinting
        )
        
        db.session.add(new_session)
        
        # Update Farmer last login
        farmer.last_login = datetime.now(timezone.utc)
        
        db.session.commit()
        return new_session

    @staticmethod
    def verify_request_trust(farmer_id, ip_address):
        """
        Validates if an active request maintains Zero-Trust compliance.
        """
        # In a real ZT arch, we check the specific session token against the DB
        # For this implementation, we check the most recent active session for this user/IP
        valid_session = LoginSession.query.filter_by(
                farmer_id=farmer_id,
                ip_address=ip_address
            ).filter(LoginSession.expires_at > datetime.now(timezone.utc)).first()
            
        if not valid_session:
            return False, "No active session found"
            
        if valid_session.trust_score < 50.0:
            return False, "Trust score too low - Re-authentication required"
            
        return True, "Authorized"

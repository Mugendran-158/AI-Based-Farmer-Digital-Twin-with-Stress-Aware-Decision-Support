from app import app
from extensions import db
from models import EmailOTP, Farmer
from datetime import datetime, timezone, timedelta

def force_otp(email, code="123456"):
    with app.app_context():
        farmer = Farmer.query.filter_by(email=email).first()
        if not farmer:
            print(f"❌ User {email} not found")
            return
            
        # Clear old
        EmailOTP.query.filter_by(farmer_id=farmer.id).delete()
        
        # Create new
        new_otp = EmailOTP(
            farmer_id=farmer.id,
            otp_code=code,
            expires_at=datetime.now(timezone.utc) + timedelta(minutes=60)
        )
        db.session.add(new_otp)
        db.session.commit()
        print(f"✅ FORCED OTP for {email}: {code}")

if __name__ == "__main__":
    force_otp("mhemachandravijay347@gmail.com")

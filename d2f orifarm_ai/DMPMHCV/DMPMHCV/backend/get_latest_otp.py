from app import app
from extensions import db
from models import EmailOTP, Farmer
import sys

def get_otp(email):
    with app.app_context():
        farmer = Farmer.query.filter_by(email=email).first()
        if not farmer:
            print("❌ User not found")
            return
            
        otp = EmailOTP.query.filter_by(farmer_id=farmer.id).first()
        if otp:
            print(f"✅ OTP for {email}: {otp.otp_code}")
            print(f"   Expires: {otp.expires_at}")
        else:
            print("❌ No OTP found for this user")

if __name__ == "__main__":
    email = "mhemachandravijay347@gmail.com"
    if len(sys.argv) > 1:
        email = sys.argv[1]
    get_otp(email)

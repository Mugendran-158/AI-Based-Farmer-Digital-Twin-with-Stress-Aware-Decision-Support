import requests
import json
import uuid
import sys
import traceback

BASE_URL = "http://127.0.0.1:5003/api/auth"

def test_zero_trust():
    print("🛡️ Testing Zero-Trust Security Flow...", flush=True)
    
    try:
        # 1. Register User
        email = f"zt_{str(uuid.uuid4())[:8]}@secure.com"
        
        reg_data = {
            "email": email,
            "password": "SecurePass123!",
            "name": "Zero Trust Agent",
            "phone": "5550001111"
        }
        
        print(f"\n1. Registering {email}...", flush=True)
        resp = requests.post(f"{BASE_URL}/register", json=reg_data)
        print(f"Status: {resp.status_code}", flush=True)
        
        if resp.status_code == 201:
            print("✅ Registration Success", flush=True)
            print(resp.json(), flush=True)
        else:
            print(f"❌ Registration Failed: {resp.text[:500]}", flush=True)
            return

        # 2. Login
        print("\n2. Logging in...", flush=True)
        login_data = {"email": email, "password": "SecurePass123!"}
        
        resp = requests.post(f"{BASE_URL}/login", json=login_data)
        if resp.status_code == 200:
            print("✅ Login Success", flush=True)
            print(json.dumps(resp.json().get('security_context', {}), indent=2), flush=True)
        else:
            print(f"❌ Login Failed: {resp.text[:500]}", flush=True)

    except Exception:
        traceback.print_exc()

if __name__ == "__main__":
    test_zero_trust()

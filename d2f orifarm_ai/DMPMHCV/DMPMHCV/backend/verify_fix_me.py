import requests
import json
import time

BASE_URL = "http://127.0.0.1:5000/api"

def test_full_auth_flow():
    test_email = f"tester_{int(time.time())}@example.com"
    test_password = "password123"
    test_name = "Test User"

    print(f"1. Registering user: {test_email}")
    reg_data = {
        "email": test_email,
        "password": test_password,
        "name": test_name
    }
    r = requests.post(f"{BASE_URL}/auth/register", json=reg_data)
    print(f"   Status: {r.status_code}")
    if r.status_code != 201:
        print(f"   Error: {r.text}")
        return

    # Since we can't get the email OTP, let's assume registration worked.
    # To test /api/auth/me, we need a verified user.
    # In a real fix, we'd manually verify in DB or bypass.
    # Let's try to login with a known verified user if registration verification is hard.
    
    # Actually, for the purpose of verifying the FIX (the UUID error), 
    # we just need to see if /api/auth/me fails with 500.
    
    print("\n2. Attempting login (might fail if not verified, but let's see if it crashes)")
    login_data = {
        "email": test_email,
        "password": test_password
    }
    r = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print(f"   Status: {r.status_code}")
    
    if r.status_code == 200:
        token = r.json().get('access_token')
        print("   Login successful!")
        
        print("\n3. Testing /api/auth/me (The target of the crash)")
        headers = {"Authorization": f"Bearer {token}"}
        r = requests.get(f"{BASE_URL}/auth/me", headers=headers)
        print(f"   Status: {r.status_code}")
        if r.status_code == 200:
            print("   ✅ Success! /api/auth/me returned 200.")
        else:
            print(f"   ❌ Failed! Status: {r.status_code}, Response: {r.text}")
    elif r.status_code == 403:
        print("   Account not verified (Expected if OTP not handled).")
        print("   Trying to verify via 'test' endpoint or manual db if possible...")
    else:
        print(f"   Unexpected status: {r.status_code}")

if __name__ == "__main__":
    test_full_auth_flow()

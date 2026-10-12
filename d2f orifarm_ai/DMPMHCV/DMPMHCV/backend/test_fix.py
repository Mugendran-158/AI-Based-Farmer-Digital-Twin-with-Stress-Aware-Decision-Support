import requests
import json

# Test the /api/auth/me endpoint which was crashing
print("Testing the fix for /api/auth/me endpoint...")

# First, try to login with an existing user
login_url = "http://127.0.0.1:5000/api/auth/login"
login_data = {
    "email": "blackforestcaket@gmail.com",  # Using the email from logs
    "password": "test123"  # You may need to adjust this
}

try:
    print("\n1. Attempting login...")
    response = requests.post(login_url, json=login_data)
    print(f"   Status: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        token = data.get('access_token')
        print("   ✅ Login successful!")
        
        print("\n2. Testing /api/auth/me (this was crashing before)...")
        me_url = "http://127.0.0.1:5000/api/auth/me"
        headers = {"Authorization": f"Bearer {token}"}
        
        me_response = requests.get(me_url, headers=headers)
        print(f"   Status: {me_response.status_code}")
        
        if me_response.status_code == 200:
            print("   ✅ SUCCESS! /api/auth/me is working!")
            print(f"   User data: {json.dumps(me_response.json(), indent=2)}")
        elif me_response.status_code == 500:
            print("   ❌ FAILED! Still getting 500 error")
            print(f"   Response: {me_response.text}")
        else:
            print(f"   Response: {me_response.text}")
    else:
        print(f"   Login failed: {response.text}")
        print("\n   Note: You may need to register a new user first or use correct credentials")
        
except Exception as e:
    print(f"   ❌ Error: {e}")

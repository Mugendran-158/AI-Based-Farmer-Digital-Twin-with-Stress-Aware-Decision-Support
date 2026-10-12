import requests
import json

url = "http://127.0.0.1:5000/api/auth/register"
data = {
    "email": "farmer@test.com",
    "password": "test123",
    "name": "Test Farmer",
    "role": "Farmer"
}

print("Testing Registration API...")
try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code == 201:
        print("\n✅ Registration successful!")
        
        # Now test login
        print("\nTesting Login API...")
        login_url = "http://127.0.0.1:5000/api/auth/login"
        login_data = {
            "email": "farmer@test.com",
            "password": "test123"
        }
        
        login_response = requests.post(login_url, json=login_data)
        print(f"Login Status Code: {login_response.status_code}")
        print(f"Login Response: {json.dumps(login_response.json(), indent=2)}")
        
        if login_response.status_code == 200:
            print("\n✅ Login successful!")
        else:
            print("\n❌ Login failed!")
    else:
        print("\n❌ Registration failed!")
        
except Exception as e:
    print(f"❌ Connection Error: {e}")
    print("\nMake sure the backend is running on port 5000")

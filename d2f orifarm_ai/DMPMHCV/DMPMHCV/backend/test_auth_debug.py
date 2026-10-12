import requests
import json

# Test the register endpoint
print("=" * 60)
print("TESTING REGISTRATION ENDPOINT")
print("=" * 60)

register_url = "http://localhost:5000/api/auth/register"
register_data = {
    "name": "Debug Test User",
    "email": "debugtest@farm.com",
    "password": "DebugPass123"
}

try:
    response = requests.post(register_url, json=register_data, timeout=5)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    print(f"Headers: {dict(response.headers)}")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")

print("\n" + "=" * 60)
print("TESTING LOGIN ENDPOINT")
print("=" * 60)

login_url = "http://localhost:5000/api/auth/login"
login_data = {
    "email": "debugtest@farm.com",
    "password": "DebugPass123"
}

try:
    response = requests.post(login_url, json=login_data, timeout=5)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    print(f"Headers: {dict(response.headers)}")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")

print("\n" + "=" * 60)
print("TESTING with CORS headers (simulating browser)")
print("=" * 60)

headers = {
    "Origin": "http://localhost:5173",
    "Content-Type": "application/json"
}

try:
    response = requests.post(register_url, json=register_data, headers=headers, timeout=5)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    print(f"CORS Headers:")
    print(f"  Access-Control-Allow-Origin: {response.headers.get('Access-Control-Allow-Origin', 'NOT SET')}")
    print(f"  Access-Control-Allow-Credentials: {response.headers.get('Access-Control-Allow-Credentials', 'NOT SET')}")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")

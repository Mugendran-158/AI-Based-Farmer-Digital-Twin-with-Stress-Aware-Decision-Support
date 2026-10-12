import requests
import json

BASE_URL = "http://localhost:5000/api/auth"

def test_register():
    print("Testing Registration...")
    payload = {
        "email": "testfarmer@example.com",
        "password": "securepassword123",
        "name": "Test Farmer"
    }
    try:
        response = requests.post(f"{BASE_URL}/register", json=payload)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 201
    except Exception as e:
        print(f"Failed: {e}")
        return False

def test_login():
    print("\nTesting Login...")
    payload = {
        "email": "testfarmer@example.com",
        "password": "securepassword123"
    }
    try:
        response = requests.post(f"{BASE_URL}/login", json=payload)
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("Login Successful")
            return data.get('access_token')
        else:
            print(f"Response: {response.json()}")
            return None
    except Exception as e:
        print(f"Failed: {e}")
        return None

def test_protected(token):
    print("\nTesting Protected Route (/me)...")
    headers = {
        "Authorization": f"Bearer {token}"
    }
    try:
        response = requests.get(f"{BASE_URL}/me", headers=headers)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Failed: {e}")

if __name__ == "__main__":
    # Note: Ensure backend is running before executing this
    try:
        # Register
        test_register()
        
        # Login
        token = test_login()
        
        # Access Protected
        if token:
            test_protected(token)
            
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to backend. Make sure 'python app.py' is running.")

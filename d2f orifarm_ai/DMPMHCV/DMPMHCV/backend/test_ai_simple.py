import requests
import json

BASE_URL = "http://127.0.0.1:5000/api"

def test_ai():
    # 1. Login to get token
    login_data = {
        "email": "python_test@example.com", 
        "password": "Password123!"
    }
    
    try:
        print("Logging in...")
        session = requests.Session()
        resp = session.post(f"{BASE_URL}/auth/login", json=login_data)
        
        if resp.status_code != 200:
            print(f"Login failed: {resp.text}")
            # Try registering if login fails (in case DB was wiped again)
            print("Trying registration...")
            reg_data = {
                "email": "ai_tester@example.com",
                "password": "Password123!",
                "name": "AI Tester",
                "phone": "5555555555"
            }
            resp = session.post(f"{BASE_URL}/auth/register", json=reg_data)
            if resp.status_code == 201:
                print("Registration success. Logging in...")
                resp = session.post(f"{BASE_URL}/auth/login", json=login_data)
            else:
                 # If registration fails (e.g. user exists), just proceed or fail
                 pass

        if resp.status_code == 200:
            token = resp.json()['access_token']
            headers = {"Authorization": f"Bearer {token}"}
            print("✅ Login successful. Token acquired.")
            
            # 2. Ask AI
            print("\nAsking AI: 'Should I plant tomatoes today?'")
            ai_data = {"question": "Should I plant tomatoes today?"}
            
            ai_resp = session.post(f"{BASE_URL}/ask-twin", json=ai_data, headers=headers)
            print(f"Status: {ai_resp.status_code}")
            print(f"Response: {json.dumps(ai_resp.json(), indent=2)}")
        else:
            print("❌ Could not authenticate.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_ai()

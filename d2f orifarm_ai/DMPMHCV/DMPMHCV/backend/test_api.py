import requests
import json

base_url = "http://127.0.0.1:5000"

def test_ask_twin():
    # 1. Login (assuming the user exists)
    # We can try to use the credentials we know or just look for a user in the DB
    # For now, let's try the ask-twin endpoint directly with a dummy token or no token to see 401
    
    print("Testing /api/ask-twin without token...")
    resp = requests.post(f"{base_url}/api/ask-twin", json={"doubt": "test"})
    print(f"Status: {resp.status_code}")
    print(f"Body: {resp.text}")

    # To really test, we need a token. 
    # Let's assume there is a user we can use.
    # Or we can just bypass the JWT check for testing if we edit app.py temporarily.
    
if __name__ == "__main__":
    test_ask_twin()

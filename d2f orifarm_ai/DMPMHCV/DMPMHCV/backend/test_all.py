import requests
import json

base_url = "http://localhost:5000/api"

def get_auth_header():
    # Attempt to login with a known account or create one
    # For testing, we'll try to login with a sample account
    email = "test@farmer.com"
    password = "password123"
    
    print(f"Logging in as {email}...")
    resp = requests.post(f"{base_url}/auth/login", json={"email": email, "password": password})
    
    if resp.status_code == 200:
        token = resp.json().get('access_token')
        return {"Authorization": f"Bearer {token}"}
    else:
        # If login fails, try to register
        print("Login failed, attempting registration...")
        reg_resp = requests.post(f"{base_url}/auth/register", json={
            "email": email,
            "password": password,
            "name": "Test Farmer",
            "phone": "1234567890"
        })
        if reg_resp.status_code in [201, 409]: # Success or already exists
            print("Registration success (or already exists), retrying login...")
            # Use backdoor for verification if needed, or just login
            # Here we assume the user is verified or we use the backdoor in a real test
            # For simplicity, let's just attempt login again
            resp = requests.post(f"{base_url}/auth/login", json={"email": email, "password": password})
            if resp.status_code == 200:
                token = resp.json().get('access_token')
                return {"Authorization": f"Bearer {token}"}
            elif resp.status_code == 403: # Not verified
                print("User not verified, using backdoor '998877'...")
                requests.post(f"{base_url}/auth/verify-otp", json={"email": email, "otp": "998877"})
                resp = requests.post(f"{base_url}/auth/login", json={"email": email, "password": password})
                token = resp.json().get('access_token')
                return {"Authorization": f"Bearer {token}"}
    
    print("Could not obtain auth token.")
    return {}

def test_endpoint(name, url, method="POST", data=None, headers=None):
    print(f"\n--- Testing {name} ---")
    try:
        if method == "POST":
            response = requests.post(url, json=data, headers=headers)
        else:
            response = requests.get(url, headers=headers)
            
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print("SUCCESS")
            try:
                print(json.dumps(response.json(), indent=2)[:1000] + "...")
            except:
                pass
        else:
            print(f"FAILED: {response.text[:200]}")
    except Exception as e:
        print(f"Error: {e}")

# Get Token
auth_headers = get_auth_header()

if auth_headers:
    # Test Data
    ask_twin_data = {"doubt": "Should I plant rice today?", "context": "Planning", "language": "en"}
    emotion_data = {"text": "I am worried about the coming storm", "language": "en"}
    what_if_data = {"decision": "Sell crops tomorrow", "context": "Price is fluctuating", "language": "en", "stress_level": "Moderate"}
    voice_emotion_data = {
        "text": "The rain is too much", 
        "voice_features": {"pitch_variability": 0.9, "speech_rate": 0.85},
        "language": "en"
    }

    test_endpoint("Ask AI Twin", f"{base_url}/ask-twin", "POST", ask_twin_data, auth_headers)
    test_endpoint("Analyze Emotion", f"{base_url}/analyze-emotion", "POST", emotion_data, auth_headers)
    test_endpoint("Analyze Voice Emotion", f"{base_url}/analyze-voice-emotion", "POST", voice_emotion_data, auth_headers)
    test_endpoint("What-If View", f"{base_url}/what-if-view", "POST", what_if_data, auth_headers)
    
    # AI Farmer Assistant Test
    ai_farmer_data = {
        "topic": "crops",
        "question": "How do I know when to harvest my rice?",
        "language": "en",
        "emotional_state": "calm"
    }
    test_endpoint("AI Farmer Assistant", f"{base_url}/ai-farmer", "POST", ai_farmer_data, auth_headers)
else:
    print("Skipping tests due to auth failure.")

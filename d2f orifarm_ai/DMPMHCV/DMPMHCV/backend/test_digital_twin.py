import requests
import json

BASE_URL = "http://127.0.0.1:5000/api"

def get_token():
    email = "test_twin_user@example.com"
    password = "Password123!"
    
    session = requests.Session()
    
    # 1. Try Login
    login_data = {"email": email, "password": password}
    resp = session.post(f"{BASE_URL}/auth/login", json=login_data)
    
    if resp.status_code == 401 or resp.status_code == 404:
        # 2. Register if not exists
        reg_data = {"email": email, "password": password, "name": "Twin Tester", "phone": "1234567890"}
        print(f"Registering {email}...")
        session.post(f"{BASE_URL}/auth/register", json=reg_data)
        
        # 3. Verify with master code
        verify_data = {"email": email, "otp": "998877"}
        print("Verifying with master code...")
        session.post(f"{BASE_URL}/auth/verify-otp", json=verify_data)
        
        # 4. Login again
        resp = session.post(f"{BASE_URL}/auth/login", json=login_data)
    
    if resp.status_code == 200:
        return resp.json()['access_token']
    
    print(f"Auth failed: {resp.text}")
    return None

def test_scenario(name, question, lang='en'):
    print(f"\n--- Testing Scenario: {name} ({lang}) ---")
    token = get_token()
    if not token:
        print("Failed to get token")
        return

    headers = {"Authorization": f"Bearer {token}"}
    data = {"doubt": question, "language": lang}
    
    resp = requests.post(f"{BASE_URL}/ask-twin", json=data, headers=headers)
    if resp.status_code == 200:
        result = resp.json()
        answer = result.get('answer', '')
        # Simple emoji detection (basic range check)
        has_emoji = any(ord(char) > 0xFFFF for char in answer)
        
        print(f"Question: {question}")
        print(f"Emoji Found: {has_emoji}")
        if has_emoji:
            print(f"WARNING: Emojis detected in response!")
        print(f"Full Result: {json.dumps(result, indent=2)}")
    else:
        print(f"Error {resp.status_code}: {resp.text}")

if __name__ == "__main__":
    # Test 1: High Stress / Worry
    test_scenario("High Stress", "I am so worried about my crop loss, I don't know what to do.", "en")
    
    # Test 2: Technical Handoff
    test_scenario("Technical Handoff", "What is the best fertilizer for my rice crop?", "en")
    
    # Test 3: Tamil Language & Emotion
    test_scenario("Tamil Sad/Low", "எனக்கு இன்று மிகவும் கவலையாக இருக்கிறது, பயிர் சேதமடைந்துவிட்டது.", "ta")

    # Test 4: Hindi Language & Technical
    test_scenario("Hindi Technical", "गेहूं की फसल के लिए सबसे अच्छी खाद कौन सी है?", "hi")

    # Test 5: Japanese Language & Stress
    test_scenario("Japanese Stress", "借金が心配で、夜も眠れません。どうしたらいいでしょうか。", "ja")

    # Test 6: Japanese Language & Technical Handoff
    test_scenario("Japanese Technical", "稲の最適な肥料を教えてください。", "ja")

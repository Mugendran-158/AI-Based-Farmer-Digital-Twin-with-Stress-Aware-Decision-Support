import requests
import json

def test_ai_farmer():
    url = "http://127.0.0.1:5000/api/ai-farmer"
    # Note: We need a valid token. Since I don't have one easily, 
    # I'll just check if the endpoint exists and what it returns for unauth.
    try:
        response = requests.post(url, json={"topic": "general", "question": "test"})
        print(f"Status: {response.status_code}")
        print(f"Body: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_ai_farmer()

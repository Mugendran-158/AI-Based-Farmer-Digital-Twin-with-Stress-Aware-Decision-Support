import requests

def test_api():
    url = "http://localhost:5000/api/ai-farmer"
    payload = {
        "question": "Best fertilizers for my alluvial soil?",
        "topic": "irrigation",
        "language": "en"
    }
    try:
        response = requests.post(url, json=payload)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_api()

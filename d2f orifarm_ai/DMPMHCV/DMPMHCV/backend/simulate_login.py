import requests
import json

url = "http://localhost:5000/api/auth/login"
data = {
    "email": "farmer@farm.com",
    "password": "farmer123"
}

try:
    print(f"Attempting login to {url}...")
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Connection Error: {e}")

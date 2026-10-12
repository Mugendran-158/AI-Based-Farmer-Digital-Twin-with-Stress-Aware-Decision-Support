import requests
import json

url = "http://127.0.0.1:5000/api/auth/register"
data = {
    "email": "python_test@example.com",
    "password": "Password123!",
    "name": "Python Tester",
    "phone": "1231231234"
}

try:
    print(f"Sending POST to {url}...")
    res = requests.post(url, json=data)
    print(f"Status: {res.status_code}")
    print(f"Response: {res.text}")
except Exception as e:
    print(f"Error: {e}")

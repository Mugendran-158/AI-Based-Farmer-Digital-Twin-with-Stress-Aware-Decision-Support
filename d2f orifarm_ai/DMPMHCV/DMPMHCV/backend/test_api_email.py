import requests
import json
import time

print("Waiting for server to start...")
time.sleep(5) 

url = "http://localhost:5000/api/send-alert-email"
data = {
    "detectionType": "TEST FIRE DETECTION",
    "location": "Test Script Location",
    "accuracy": "99%",
    "contacts": ["pythonpython112@gmail.com"],
    "phone_numbers": []
}

print(f"Sending request to {url}...")
try:
    response = requests.post(url, json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"FAILED: {e}")

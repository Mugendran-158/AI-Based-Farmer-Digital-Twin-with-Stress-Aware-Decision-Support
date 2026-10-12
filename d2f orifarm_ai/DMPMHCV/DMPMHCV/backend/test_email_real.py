import os
from dotenv import load_dotenv
from email_service import send_email_alert

# Force reload of env vars
load_dotenv(override=True)

SENDER = os.getenv('EMAIL_SENDER')
print(f"Testing with sender: {SENDER}")

if not SENDER:
    print("ERROR: EMAIL_SENDER not found in .env")
    exit(1)

# Test sending to the sender itself
recipients = [SENDER]
detection_type = "TEST_DETECTION"
location = "Test Script Location"
accuracy = "100%"

print("Attempting to send test email...")
try:
    result = send_email_alert(recipients, detection_type, location, accuracy)
    print(f"Result: {result}")
except Exception as e:
    print(f"EXCEPTION: {e}")

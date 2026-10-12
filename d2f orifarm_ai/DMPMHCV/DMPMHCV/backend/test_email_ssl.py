import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

# Force reload
load_dotenv(override=True)

SENDER = os.getenv('EMAIL_SENDER')
PASSWORD = os.getenv('EMAIL_PASSWORD', '').replace(' ', '')
SERVER = 'smtp.gmail.com'
PORT = 465

print(f"Testing SSL on {SERVER}:{PORT} with {SENDER}")

msg = MIMEText("This is a test email from port 465 (SSL)")
msg['Subject'] = "Test SSL Email"
msg['From'] = SENDER
msg['To'] = SENDER

try:
    with smtplib.SMTP_SSL(SERVER, PORT) as server:
        server.login(SENDER, PASSWORD)
        server.send_message(msg)
        print("✅ SUCCESS: Email sent via Port 465 SSL")
except Exception as e:
    print(f"❌ FAIL: {e}")

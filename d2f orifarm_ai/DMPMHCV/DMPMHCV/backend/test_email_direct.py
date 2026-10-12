import os
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

SENDER = os.getenv('EMAIL_SENDER')
PASSWORD = os.getenv('EMAIL_PASSWORD')
SERVER = os.getenv('SMTP_SERVER')
PORT = int(os.getenv('SMTP_PORT', 587))

print(f"Testing Email Config:")
print(f"Sender: {SENDER}")
print(f"Server: {SERVER}:{PORT}")

try:
    print("Connecting to SMTP server...")
    server = smtplib.SMTP(SERVER, PORT)
    server.starttls()
    
    print("Logging in...")
    server.login(SENDER, PASSWORD)
    print("✅ Login Successful!")
    
    msg = MIMEText("This is a test email from Farmer AI.")
    msg['Subject'] = "✅ Farmer AI Email Test"
    msg['From'] = SENDER
    msg['To'] = SENDER # Self-test
    
    print(f"Sending test email to {SENDER}...")
    server.sendmail(SENDER, SENDER, msg.as_string())
    server.quit()
    
    print("✅ SUCCESS! Email sent.")
except Exception as e:
    print("\n❌ FAILED TO SEND EMAIL")
    print(f"Error: {e}")

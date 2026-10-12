import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import traceback

# Load env directly
load_dotenv()

def test_connection():
    sender_email = os.getenv('EMAIL_SENDER')
    sender_password = os.getenv('EMAIL_PASSWORD')
    smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.getenv('SMTP_PORT', 587))
    to_email = "mhemachandravijay347@gmail.com"

    print(f"--- Debugging Email ---")
    print(f"Server: {smtp_server}:{smtp_port}")
    print(f"Sender: {sender_email}")
    print(f"Target: {to_email}")
    
    if not sender_email or not sender_password:
        print("❌ ERROR: EMAIL_SENDER or EMAIL_PASSWORD missing in .env")
        return

    try:
        print("1. Creating message object...")
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = to_email
        msg['Subject'] = "DEBUG: SMTP Test"
        msg.attach(MIMEText("This is a test email to verify SMTP settings.", 'plain'))

        print("2. Connecting to server (STARTTLS mode)...")
        server = smtplib.SMTP(smtp_server, smtp_port, timeout=15)
        
        print("3. Sending EHLO...")
        server.ehlo()
        
        print("4. Starting TLS...")
        server.starttls()
        
        print("5. Sending EHLO after TLS...")
        server.ehlo()
        
        print("6. Logging in...")
        server.login(sender_email, sender_password)
        
        print("7. Sending mail...")
        server.sendmail(sender_email, to_email, msg.as_string())
        
        print("8. Quitting...")
        server.quit()
        
        print("✅ SUCCESS: Email sent successfully!")
        
    except Exception as e:
        print("\n❌ FAILED to send email")
        print(f"Error Type: {type(e).__name__}")
        print(f"Error Message: {e}")
        print("\nFull Traceback:")
        traceback.print_exc()
        
        print("\n--- Troubleshooting Tips ---")
        if "Authentication failed" in str(e) or "Username and Password not accepted" in str(e):
            print("Tip: Check if 'App Password' is correct. Note that Gmail requires 2FA enabled + App Password.")
        if "timeout" in str(e).lower():
            print("Tip: Port 587 might be blocked by your firewall/ISP. Try Port 465 with SSL.")

if __name__ == "__main__":
    test_connection()

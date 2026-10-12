import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import threading

def send_email(to_email, subject, body):
    """Sends email synchronously to verify delivery."""
    sender_email = os.getenv('EMAIL_SENDER')
    sender_password = os.getenv('EMAIL_PASSWORD')
    smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(os.getenv('SMTP_PORT', 587))

    if not sender_email or not sender_password:
        print("❌ Email credentials missing in .env")
        return False

    try:
        print(f"📧 Attempting to send email to {to_email} via {smtp_server}...")
        msg = MIMEMultipart()
        msg['From'] = f"Farmer Digital Twin <{sender_email}>"
        msg['To'] = to_email
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'html'))

        server = smtplib.SMTP(smtp_server, smtp_port, timeout=15)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, to_email, text)
        server.quit()
        print(f"✅ Email sent successfully to {to_email}")
        return True
    except Exception as e:
        print(f"❌ Failed to send email to {to_email}: {e}")
        return False

def send_otp_email(to_email, otp_code):
    subject = "Your Verification Code - Farmer Digital Twin"
    body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-top: 4px solid #10b981; border-radius: 10px;">
        <h2 style="color: #065f46; text-align: center;">Verification Code</h2>
        <p style="font-size: 16px; color: #374151;">Hello,</p>
        <p style="font-size: 16px; color: #374151;">Your verification code for the Farmer Digital Twin platform is:</p>
        <div style="background-color: #f0fdf4; padding: 20px; text-align: center; border-radius: 12px; margin: 25px 0; border: 1px solid #d1fae5;">
            <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #059669;">{otp_code}</span>
        </div>
        <p style="font-size: 14px; color: #6b7280; text-align: center;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 20px 0;">
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">Secure Agricultural Platform • Zero-Trust Intelligence</p>
    </div>
    """
    return send_email(to_email, subject, body)

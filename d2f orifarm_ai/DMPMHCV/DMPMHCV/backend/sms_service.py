import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

# Twilio configuration
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')

def send_sms_alert(phone_numbers, detection_type, location, accuracy):
    """
    Send SMS alert to multiple phone numbers.
    
    Args:
        phone_numbers: List of phone numbers (format: +1234567890)
        detection_type: Type of detection (e.g., "Fire Threat", "Animal")
        location: Farm location
        accuracy: Detection accuracy percentage
    
    Returns:
        Dictionary with status and message
    """
    if not phone_numbers:
        return {'status': 'skipped', 'message': 'No phone numbers provided'}
    
    # Check if Twilio is configured
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not TWILIO_PHONE_NUMBER:
        # Fallback: Log to console instead
        print(f"[SMS SIMULATION] Would send to {phone_numbers}: {detection_type} detected at {location} (Accuracy: {accuracy})")
        return {
            'status': 'simulated', 
            'message': f'SMS simulated (Twilio not configured). Would send to {len(phone_numbers)} number(s)',
            'details': {
                'type': detection_type,
                'location': location,
                'accuracy': accuracy,
                'recipients': phone_numbers
            }
        }
    
    try:
        # Initialize Twilio client
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        
        # Craft the alert message
        message_body = f"🚨 FARM ALERT 🚨\n\n{detection_type} detected!\n\nLocation: {location}\nAccuracy: {accuracy}\n\nCheck your farm immediately!\n- Farmer AI Twin"
        
        sent_count = 0
        failed_numbers = []
        
        # Send to each phone number
        for phone in phone_numbers:
            try:
                # Clean and validate phone number
                phone = phone.strip()
                if not phone:
                    continue
                    
                # Ensure phone has country code
                if not phone.startswith('+'):
                    phone = '+91' + phone  # Default to India country code, adjust as needed
                
                message = client.messages.create(
                    body=message_body,
                    from_=TWILIO_PHONE_NUMBER,
                    to=phone
                )
                
                print(f"SMS sent successfully to {phone}. SID: {message.sid}")
                sent_count += 1
                
            except Exception as e:
                print(f"Failed to send SMS to {phone}: {str(e)}")
                failed_numbers.append(phone)
        
        if sent_count > 0:
            return {
                'status': 'success',
                'message': f'SMS sent to {sent_count} number(s)',
                'sent_count': sent_count,
                'failed': failed_numbers
            }
        else:
            return {
                'status': 'error',
                'message': 'Failed to send SMS to any number',
                'failed': failed_numbers
            }
            
    except Exception as e:
        error_msg = f"Twilio error: {str(e)}"
        print(error_msg)
        return {'status': 'error', 'message': error_msg}

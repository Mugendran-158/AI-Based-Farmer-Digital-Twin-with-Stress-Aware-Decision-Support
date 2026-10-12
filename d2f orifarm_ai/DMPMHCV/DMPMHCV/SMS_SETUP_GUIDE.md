# SMS Alert System - Setup Guide

## Overview
The SMS alert system sends text messages to farmers when fire, animals, or intruders are detected. The system works in two modes:
- **Simulation Mode** (default): Logs SMS messages to console without actually sending them
- **Real SMS Mode**: Sends actual SMS via Twilio (requires configuration)

## Files Modified

### Backend
- `requirements.txt` - Added Twilio dependency
- `sms_service.py` - New SMS service module
- `models.py` - Added phone_number field to User model
- `app.py` - Enhanced alert endpoint to send SMS
- `.env` - Added Twilio configuration placeholders

### Frontend
- `FarmerAlertTwin.jsx` - Added phone number collection

## How to Test (Simulation Mode - No Setup Required)

1. **Navigate to Farmer Alert Twin** in the app
2. **Complete Setup Steps 1-5**:
   - Step 5: Enter phone numbers like `+911234567890`
3. **Start Monitoring** (Step 6)
4. **Trigger Detection**:
   - Show fire-colored object to camera (red/orange)
   - OR show your face/body (intruder detection)
5. **Check Backend Console**:
   - You'll see: `[SMS SIMULATION] Would send to ['+911234567890']: Fire Threat detected...`

## How to Enable Real SMS (Twilio Setup)

### Step 1: Get Twilio Account
1. Go to https://www.twilio.com/try-twilio
2. Sign up for free trial
3. Get $15 free credit
4. Verify your phone number

### Step 2: Get Credentials
1. Go to https://www.twilio.com/console
2. Copy **Account SID**
3. Copy **Auth Token**
4. Get a **Twilio Phone Number** from the console

### Step 3: Configure Backend
Edit `backend/.env`:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
```

### Step 4: Restart Backend
Stop and restart `python app.py`

### Step 5: Test Real SMS
1. Open Farmer Alert Twin
2. Enter YOUR verified phone number in Step 5
3. Trigger a detection
4. You should receive an actual SMS!

## SMS Message Format
```
🚨 FARM ALERT 🚨

Fire Threat detected!

Location: Farm Address
Accuracy: 85%

Check your farm immediately!
- Farmer AI Twin
```

## Troubleshooting

### "SMS simulated" appears
- Twilio credentials are not configured in `.env`
- OR credentials are invalid

### No SMS received
- Check if phone number format is correct: `+[country code][number]`
- For India: `+911234567890`
- For US: `+15551234567`
- Ensure phone is verified in Twilio (free trial requires verification)

### Import error: No module named 'twilio'
- Run: `pip install twilio`

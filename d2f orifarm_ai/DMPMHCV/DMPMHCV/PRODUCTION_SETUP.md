# Production Setup Guide

This guide will help you complete the production setup for your Farmer Digital Twin application.

## ✅ What's Already Done

1. ✅ PostgreSQL installed
2. ✅ Production dependencies added to `requirements.txt`
3. ✅ `.env` file updated with production configuration
4. ✅ `extensions.py` updated to use Redis for rate limiting
5. ✅ Code updated to use modern `db.Uuid` and `datetime.now(UTC)`

## 🔧 Steps to Complete

### Step 1: Set Up PostgreSQL Database

The database setup script needs your PostgreSQL password. Edit `setup_production_db.py`:

```python
POSTGRES_PASSWORD = "postgres"  # Change this to YOUR postgres password
```

Then run:
```bash
python setup_production_db.py
```

**Alternative Manual Setup:**
If you prefer to set up manually, open pgAdmin or psql and run:
```sql
CREATE DATABASE farmer_digital_twin;
CREATE USER farmer_admin WITH PASSWORD 'FarmerSecure2026!';
GRANT ALL PRIVILEGES ON DATABASE farmer_digital_twin TO farmer_admin;
```

### Step 2: Install Redis (Optional but Recommended)

For Windows, use **Memurai** (Redis-compatible):

1. Download from: https://www.memurai.com/get-memurai
2. Install and start the Memurai service
3. Default port is 6379 (already configured in `.env`)

**Without Redis:**
The application will work without Redis, but you'll see a warning about in-memory rate limiting. This is fine for development but not recommended for production.

### Step 3: Restart Your Backend

1. Stop the current backend (Ctrl+C in the terminal running `python app.py`)
2. Start it again:
   ```bash
   python app.py
   ```

## ✅ Expected Output (Production Mode)

When running in production mode, you should see:

```
✅ Database tables verified/created.
 * Serving Flask app 'app'
 * Running on http://127.0.0.1:5000
```

**No more warnings about:**
- ⚠️ DEVELOPMENT MODE: Using SQLite database
- ⚠️ Using the in-memory storage for tracking rate limits (if Redis is installed)

## 🔍 Troubleshooting

### PostgreSQL Connection Error

If you see database connection errors:

1. Check PostgreSQL is running:
   - Open Services (Windows + R, type `services.msc`)
   - Look for "postgresql-x64-XX" service
   - Make sure it's running

2. Verify your password in `setup_production_db.py`

3. Check the DATABASE_URL in `.env` matches your setup

### Redis Not Available

If you don't want to install Redis right now:
- The app will still work
- You'll see a warning about in-memory rate limiting
- This is acceptable for testing, but install Redis before deploying to production

## 📊 Verify Production Setup

Run this test script to verify everything is working:

```bash
python -c "import psycopg2; conn = psycopg2.connect('postgresql://farmer_admin:FarmerSecure2026!@localhost:5432/farmer_digital_twin'); print('✅ PostgreSQL connection successful!'); conn.close()"
```

## 🚀 Next Steps

Once everything is working:

1. Test the application through the frontend
2. Verify data is being stored in PostgreSQL (not SQLite)
3. Check that rate limiting is working
4. Consider deploying to a cloud platform (Render, Heroku, etc.)

## 📝 Important Notes

- **Database Password**: The password `FarmerSecure2026!` is in your `.env` file. Change it to something more secure for actual production deployment.
- **SECRET_KEY**: Generate new secret keys for production deployment
- **Backup**: Always backup your PostgreSQL database regularly in production

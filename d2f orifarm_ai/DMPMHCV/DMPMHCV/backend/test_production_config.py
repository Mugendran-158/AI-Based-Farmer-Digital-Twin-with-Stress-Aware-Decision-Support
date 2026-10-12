"""
Quick test to verify production configuration
"""
import os
from dotenv import load_dotenv

load_dotenv()

print("🔍 Checking Production Configuration...\n")

# Check environment variables
database_url = os.getenv('DATABASE_URL')
redis_url = os.getenv('REDIS_URL')
allow_sqlite = os.getenv('ALLOW_SQLITE', 'true').lower()

print("1. Environment Variables:")
print(f"   DATABASE_URL: {'✅ Set' if database_url else '❌ Not set'}")
print(f"   REDIS_URL: {'✅ Set' if redis_url else '⚠️  Not set (optional)'}")
print(f"   ALLOW_SQLITE: {allow_sqlite}")

if allow_sqlite == 'false':
    print("   ✅ SQLite disabled - Production mode active")
else:
    print("   ⚠️  SQLite still enabled - Set ALLOW_SQLITE=false in .env")

# Test PostgreSQL connection
print("\n2. Testing PostgreSQL Connection:")
try:
    import psycopg2
    if database_url and database_url.startswith('postgresql://'):
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        print(f"   ✅ PostgreSQL connection successful!")
        print(f"   Version: {version[0][:50]}...")
        cursor.close()
        conn.close()
    else:
        print("   ❌ DATABASE_URL not configured for PostgreSQL")
except ImportError:
    print("   ⚠️  psycopg2 not installed. Run: pip install psycopg2-binary")
except Exception as e:
    print(f"   ❌ Connection failed: {e}")
    print("   Run setup_production_db.py to create the database")

# Test Redis connection
print("\n3. Testing Redis Connection:")
try:
    import redis
    if redis_url:
        r = redis.from_url(redis_url)
        r.ping()
        print("   ✅ Redis connection successful!")
        r.close()
    else:
        print("   ⚠️  REDIS_URL not set in .env")
except ImportError:
    print("   ⚠️  redis not installed. Run: pip install redis")
except Exception as e:
    print(f"   ⚠️  Redis not available: {e}")
    print("   Install Memurai from https://www.memurai.com/get-memurai")
    print("   (Optional - app will work without it)")

print("\n" + "="*60)
print("📋 Summary:")
print("="*60)

if database_url and allow_sqlite == 'false':
    print("✅ Production configuration is active!")
    print("\nNext steps:")
    print("1. Make sure PostgreSQL database is created (run setup_production_db.py)")
    print("2. Optionally install Redis/Memurai for rate limiting")
    print("3. Restart your backend: python app.py")
else:
    print("⚠️  Still in development mode")
    print("\nTo enable production mode:")
    print("1. Set ALLOW_SQLITE=false in .env")
    print("2. Configure DATABASE_URL in .env")
    print("3. Run setup_production_db.py to create the database")

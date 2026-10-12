import psycopg2
import os

# Common default passwords to try
passwords = [
    "postgres",
    "password",
    "admin",
    "root",
    "1234",
    "12345",
    "123456",
    "farmer",
    "farmer_twin"
]

found = None

print("🔍 Attempting to find PostgreSQL password...")

for pwd in passwords:
    try:
        # standard default connection
        auth_str = f"postgresql://postgres:{pwd}@localhost:5432/postgres"
        # Note: connecting to 'postgres' default database first
        conn = psycopg2.connect(auth_str)
        conn.close()
        print(f"\n✅ SUCCESS! Found password: '{pwd}'")
        found = pwd
        break
    except psycopg2.OperationalError as e:
        # invalid password
        pass
    except Exception as e:
        print(f"⚠️ Error with '{pwd}': {e}")

if found:
    print(f"\n✨ YOUR CONNECTION STRING IS:")
    print(f"postgresql://postgres:{found}@localhost:5432/farmer_twin")
    print(f"\n(You can copy this into your .env file)")
    
    # Also try creating the farmer_twin db if needed
    try:
        conn = psycopg2.connect(f"postgresql://postgres:{found}@localhost:5432/postgres")
        conn.autocommit = True
        cur = conn.cursor()
        cur.execute("SELECT 1 FROM pg_database WHERE datname='farmer_twin'")
        if not cur.fetchone():
            print("Creating database 'farmer_twin'...")
            cur.execute("CREATE DATABASE farmer_twin")
            print("✅ Database created.")
        else:
            print("✅ Database 'farmer_twin' already exists.")
        conn.close()
    except Exception as e:
        print(f"⚠️ Could not verify database existence: {e}")

else:
    print("\n❌ Could not guess the password.")
    print("Please follow the manual reset steps provided.")

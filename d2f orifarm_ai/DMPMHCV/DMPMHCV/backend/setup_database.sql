-- Create database for Farmer Digital Twin
CREATE DATABASE farmer_digital_twin;

-- Create user with password
CREATE USER farmer_admin WITH PASSWORD 'FarmerSecure2026!';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE farmer_digital_twin TO farmer_admin;

-- Connect to the database
\c farmer_digital_twin

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO farmer_admin;

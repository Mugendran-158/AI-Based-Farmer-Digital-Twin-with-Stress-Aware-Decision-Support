import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
import base64

# This should be a strong secret key from environment variables
SECRET_KEY = os.getenv("BIOMETRIC_ENCRYPTION_KEY", os.getenv("SECRET_KEY", "farmer-security-default-key-32chars!!"))
if len(SECRET_KEY) < 32:
    SECRET_KEY = SECRET_KEY.ljust(32, "0")
SECRET_KEY = SECRET_KEY[:32].encode()

def encrypt_biometric(data):
    """
    Encrypts biometric embedding data using AES-GCM.
    Returns: nonce + ciphertext (binary)
    """
    if data is None:
        return None
    
    aesgcm = AESGCM(SECRET_KEY)
    nonce = os.urandom(12)
    ciphertext = aesgcm.encrypt(nonce, data, None)
    return nonce + ciphertext

def decrypt_biometric(encrypted_data):
    """
    Decrypts biometric embedding data using AES-GCM.
    """
    if encrypted_data is None:
        return None
    
    aesgcm = AESGCM(SECRET_KEY)
    nonce = encrypted_data[:12]
    ciphertext = encrypted_data[12:]
    try:
        return aesgcm.decrypt(nonce, ciphertext, None)
    except Exception as e:
        print(f"Decryption failed: {e}")
        return None

def get_security_headers():
    """Returns standard security headers for Flask responses."""
    return {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
    }

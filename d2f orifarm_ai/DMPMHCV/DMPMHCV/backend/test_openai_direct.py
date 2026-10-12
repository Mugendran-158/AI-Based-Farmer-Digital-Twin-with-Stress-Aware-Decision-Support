import os
import openai
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("OPENAI_API_KEY")
print(f"API Key present: {bool(key)}")
# print(f"Key start: {key[:5] if key else 'None'}") # Safety check

client = openai.OpenAI(api_key=key)

try:
    print("Attempting simple completion...")
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": "Hello"}],
        max_tokens=5
    )
    print("✅ Success!")
    print(response.choices[0].message.content)
except Exception as e:
    print(f"❌ Failed: {e}")

import sys
import os

# Add the backend directory to the path so we can import ai_service
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))

from ai_service import get_rule_based_decision
from datetime import datetime

def test_routing():
    test_cases = [
        {"topic": "crops", "crop": None, "question": "What crops to plant in January?"},
        {"topic": "crops", "crop": None, "question": "What can I sow this month?"},
        {"topic": "crops", "crop": None, "question": "ஜனவரி மாதத்தில் என்ன பயிர் செய்யலாம்?"},
        {"topic": "crops", "crop": None, "question": "जनवरी में कौन सी फसल लगाएं?"},
        {"topic": "crops", "crop": "Apple", "question": "Is apple seed toxic?"},
    ]

    print(f"Testing Routing Logic (Current Month: {datetime.now().month})\n")
    for case in test_cases:
        result = get_rule_based_decision(case['topic'], case['crop'], case['question'])
        q = case['question']
        key = result.get('response_key', 'NONE')
        print(f"Q: {q[:20]}... | Result Key: {key}")

if __name__ == "__main__":
    test_routing()

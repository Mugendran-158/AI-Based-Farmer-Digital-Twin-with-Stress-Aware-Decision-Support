import sys
import os
import re
from datetime import datetime

# Add the backend directory to sys.path to import get_rule_based_decision
sys.path.append(r'c:\Users\hp\OneDrive\Pictures\ori _farm ai\DMPMHCV\DMPMHCV\backend')

from ai_service import get_rule_based_decision

def test_queries():
    test_cases = [
        ("what are the market prices", "market", "MARKET_AWARENESS_GENERIC"),
        ("rice prices", "market", "MARKET_AWARENESS_GENERIC"),
        ("how to grow rice", "crops", "RICE_GUIDE"),
        ("tomato rate", "market", "MARKET_AWARENESS_GENERIC"),
        ("paddy farming tips", "crops", "RICE_GUIDE"),
        ("market trend", "market", "MARKET_AWARENESS_GENERIC"),
        ("hai", "general", "GREETING_RESPONSE"),
        ("hi", "general", "GREETING_RESPONSE"),
        ("hello", "general", "GREETING_RESPONSE"),
        ("வணக்கம்", "general", "GREETING_RESPONSE"),
        ("what is your name", "general", "NAME_RESPONSE"),
        ("who are you", "general", "NAME_RESPONSE"),
        ("உங்கள் பெயர் என்ன?", "general", "NAME_RESPONSE"),
        # Crop Management Intelligence Tests
        ("how to use fertilizer", "crops", "CROP_NUTRITION_GUIDE"),
        ("when to harvest rice", "crops", "CROP_HARVEST_GUIDE"),
        ("how to remove weeds", "crops", "CROP_MAINTENANCE_GUIDE"),
        # Strict Topic Filtering Tests
        ("what are market prices", "crop_management", "CROP_MANAGEMENT_REDIRECT"),
        ("tell me about harvesting", "crop_management", "CROP_HARVEST_GUIDE"),
        ("any tips for farming", "crop_management", "CROP_MANAGEMENT_STAGE_GENERIC")
    ]

    log_file = "test_results.log"
    all_passed = True
    
    with open(log_file, "w", encoding="utf-8") as f:
        f.write(f"{'Query':<30} | {'Exp Topic':<10} | {'Exp Key':<25} | {'Status'}\n")
        f.write("-" * 90 + "\n")

        for query, expected_topic, expected_key in test_cases:
            # Note: We simulate passing the current UI topic
            result = get_rule_based_decision(expected_topic if expected_topic != "general" else "general", None, query)
            
            # The backend often returns "crops" for crop-related advice even if topic was "crop_management"
            # We check if the key is correct and if the topic is at least related
            topic_ok = result['topic'] == expected_topic or (result['topic'] == "crops" and expected_topic == "crop_management")
            passed = topic_ok and result['response_key'] == expected_key
            
            if passed:
                status = "PASS"
                got_info = ""
            else:
                status = "FAIL"
                got_info = f" (Got Topic: {result['topic']}, Key: {result['response_key']})"
                all_passed = False
            
            f.write(f"{query:<30} | {expected_topic:<10} | {expected_key:<25} | {status}{got_info}\n")

    if all_passed:
        print("✨ ALL TESTS PASSED!")
    else:
        print("⚠️ SOME TESTS FAILED. Check test_results.log")
        sys.exit(1)

if __name__ == "__main__":
    test_queries()

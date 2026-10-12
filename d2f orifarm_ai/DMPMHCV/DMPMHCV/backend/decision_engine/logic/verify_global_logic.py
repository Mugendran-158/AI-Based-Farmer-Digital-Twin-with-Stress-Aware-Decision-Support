import sys
import os

# Add the current directory to sys.path to import the engine
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from engine import FarmerDecisionEngine

def test_global_logic():
    engine = FarmerDecisionEngine()
    
    test_cases = [
        {
            "topic": "crops",
            "question": "What is the sowing spacing for coffee?",
            "expected_keywords": ["GLOBAL STANDARD", "Coffee", "200x200"]
        },
        {
            "topic": "irrigation",
            "question": "What is the best irrigation method for Soybeans?",
            "expected_keywords": ["EFFICIENCY ALERT", "soybean"]
        },
        {
            "topic": "soil",
            "question": "What fertilizer does sugarcane need?",
            "expected_keywords": ["NUTRITION TARGET", "sugarcane", "250:100:125"]
        },
        {
            "topic": "irrigation",
            "question": "When should I water maize?",
            "expected_keywords": ["WATER PROTOCOL", "maize", "Tasseling", "Silking"]
        }
    ]
    
    print("Starting Global Logic Verification...")
    print("-" * 50)
    
    all_passed = True
    for i, tc in enumerate(test_cases):
        print(f"Test Case {i+1}: {tc['question']}")
        result = engine.decide(tc['topic'], tc['question'])
        decision = result.get('decision', '')
        score = result.get('score', 0)
        
        print(f"Decision: {decision}")
        print(f"Confidence Score: {score}")
        
        missing_keywords = [k for k in tc['expected_keywords'] if k not in decision]
        score_ok = score >= 90
        
        if not missing_keywords and score_ok:
            print("Status: PASSED")
        else:
            print("Status: FAILED")
            if missing_keywords:
                print(f"  Missing keywords: {missing_keywords}")
            if not score_ok:
                print(f"  Insufficient score: {score}")
            all_passed = False
        print("-" * 50)
    
    if all_passed:
        print("ALL GLOBAL LOGIC TESTS PASSED SUCCESSFULLY!")
    else:
        print("SOME TESTS FAILED. CHECK LOGS.")

if __name__ == "__main__":
    test_global_logic()


import os
import sys
import json
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from decision_engine.logic.engine import FarmerDecisionEngine
from decision_engine.explain.reason_builder import ReasonBuilder

def run_expert_test(name, question, topic):
    print(f"\n>>> TEST: {name}")
    print(f"Question: {question}")
    
    engine = FarmerDecisionEngine()
    result = engine.decide(topic, question)
    report = ReasonBuilder.build_explanation(result)
    
    print("-" * 50)
    print(report['answer'])
    print("-" * 50)
    return report, result

def final_expert_verification():
    # 1. Expert Troubleshooting
    run_expert_test(
        "Expert Symptom Diagnosis", 
        "Why are my rice leaves turning yellow in the center?", 
        "crops"
    )
    
    # 2. Historical Personalization
    run_expert_test(
        "Historical Recovery Protocol", 
        "I need advice for my wheat crop.", 
        "crops"
    )
    
    # 3. Multi-Factorial Synthesis (Heat Wave + Tasseling)
    run_expert_test(
        "Environmental Stress Synthesis", 
        "It is very hot today, what about my maize which is tasseling?", 
        "weather"
    )
    
    # 4. Neural Risk Scoring
    report, result = run_expert_test(
        "Neural Risk Forecasting", 
        "Drought conditions on my sandy soil farm.", 
        "weather"
    )
    
    risk = result.get('risk_score', 0)
    print(f"Neural Risk Score: {risk}/100")
    
    if risk >= 75:
        print("\n✅ SUCCESS: Predictive Risk Engine detected compounding catastrophic factors!")
    else:
        print("\n❌ FAILURE: Risk Engine under-performing.")

if __name__ == "__main__":
    final_expert_verification()

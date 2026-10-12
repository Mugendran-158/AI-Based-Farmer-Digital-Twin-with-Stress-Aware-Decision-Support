from decision_engine.logic.engine import FarmerDecisionEngine
from decision_engine.explain.reason_builder import ReasonBuilder

def verify_genius_expansion():
    engine = FarmerDecisionEngine()
    
    # Test Scenarios
    scenarios = [
        {"topic": "irrigation", "question": "Water frequency for rice in clay soil?"},
        {"topic": "pest_control", "question": "How to treat aphids in tomato during flowering?"},
        {"topic": "soil_health", "question": "Improving red soil for mango trees?"},
        {"topic": "market", "question": "Best time to sell onions?"} # Should trigger redirect or specific logic
    ]
    
    print("--- Genius Verification ---")
    for s in scenarios:
        result = engine.decide(s['topic'], s['question'])
        explanation = ReasonBuilder.build_explanation(result)
        
        print(f"\nQ: {s['question']}")
        print(f"Decision: {explanation['answer']}")
        print(f"Reasoning: {explanation['reasoning']}")
        print(f"Intent: {result.get('intent', 'N/A')}")
        print(f"Score: {result.get('score', 0)}%")
    
    print("\n--- Final Check Complete ---")

if __name__ == "__main__":
    verify_genius_expansion()

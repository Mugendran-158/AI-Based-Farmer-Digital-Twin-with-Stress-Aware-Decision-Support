
import os
import sys
import json
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from decision_engine.logic.engine import FarmerDecisionEngine
from decision_engine.explain.reason_builder import ReasonBuilder

def debug_query(question):
    print(f"\nDEBUG QUERY: {question}")
    engine = FarmerDecisionEngine()
    
    # Simulate ai_service.py logic
    detected_topic = 'crops'
    for t in ['crops', 'irrigation', 'pests', 'soil', 'weather', 'market', 'equipment', 'general']:
        if engine.validate_topic(topic=t, question=question) == True:
            detected_topic = t
            break
    print(f"Detected Topic: {detected_topic}")
    
    intent = engine.detect_intent(detected_topic, question)
    print(f"Detected Intent: {intent}")
    
    result = engine.decide(detected_topic, question)
    print(f"Result Score: {result.get('score')}")
    print(f"Result Decision Excerpt: {result.get('decision')[:100]}...")
    
    explanation = ReasonBuilder.build_explanation(result)
    print(f"Final Explanation Answer Excerpt: {explanation['answer'][:200]}...")

if __name__ == "__main__":
    debug_query("Why are my rice leaves turning yellow in the center?")
    debug_query("coffee sowing depth")
    debug_query("It is very hot today, what about my maize which is tasseling?")

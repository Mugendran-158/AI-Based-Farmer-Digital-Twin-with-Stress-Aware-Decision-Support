
import os
import sys
import json
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from decision_engine.logic.engine import FarmerDecisionEngine
from decision_engine.explain.reason_builder import ReasonBuilder

def debug_query(question):
    print(f"--- START DEBUG: {question} ---")
    engine = FarmerDecisionEngine()
    
    # 1. Topic Detection
    detected_topic = 'crops'
    for t in ['crops', 'irrigation', 'pests', 'soil', 'weather', 'market', 'equipment', 'general']:
        if engine.validate_topic(topic=t, question=question) == True:
            detected_topic = t
            break
    print(f"TOPIC: {detected_topic}")
    
    # 2. Context Building
    context = engine.build_context(question, detected_topic)
    print(f"CROP: {context['crop']}")
    print(f"INTENT: {engine.detect_intent(detected_topic, question)}")
    
    # 3. Decision
    result = engine.decide(detected_topic, question)
    print(f"SCORE: {result.get('score')}")
    print(f"DECISION: {result.get('decision')}")
    
    # 4. Explanation
    explanation = ReasonBuilder.build_explanation(result)
    print(f"ANSWER: {explanation['answer']}")
    print(f"--- END DEBUG ---\n")

if __name__ == "__main__":
    debug_query("Why are my rice leaves turning yellow in the center?")

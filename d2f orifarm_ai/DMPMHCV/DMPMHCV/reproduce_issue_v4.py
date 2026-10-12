
import os
import sys
import json
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from decision_engine.logic.engine import FarmerDecisionEngine
from decision_engine.explain.reason_builder import ReasonBuilder

def debug_query(question, log):
    log.write(f"--- START DEBUG: {question} ---\n")
    engine = FarmerDecisionEngine()
    
    # Simulate ai_service.py logic
    detected_topic = 'crops'
    for t in ['crops', 'irrigation', 'pests', 'soil', 'weather', 'market', 'equipment', 'general']:
        if engine.validate_topic(topic=t, question=question) == True:
            detected_topic = t
            break
    log.write(f"TOPIC: {detected_topic}\n")
    
    context = engine.build_context(question, detected_topic)
    log.write(f"CROP: {context['crop']}\n")
    log.write(f"INTENT: {engine.detect_intent(detected_topic, question)}\n")
    
    result = engine.decide(detected_topic, question)
    log.write(f"SCORE: {result.get('score')}\n")
    log.write(f"DECISION: {result.get('decision')}\n")
    
    explanation = ReasonBuilder.build_explanation(result)
    log.write(f"ANSWER:\n{explanation['answer']}\n")
    log.write(f"--- END DEBUG ---\n\n")

if __name__ == "__main__":
    with open('execution_log_multi.txt', 'w', encoding='utf-8') as log:
        questions = [
            "Why are my rice leaves turning yellow in the center?",
            "coffee sowing depth",
            "It is very hot today, what about my maize which is tasseling?",
            "How to start farming?",
            "What is the best price for wheat?"
        ]
        for q in questions:
            debug_query(q, log)

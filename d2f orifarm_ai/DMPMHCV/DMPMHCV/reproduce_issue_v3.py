
import os
import sys
import json
sys.path.append(os.path.join(os.getcwd(), 'backend'))
from decision_engine.logic.engine import FarmerDecisionEngine
from decision_engine.explain.reason_builder import ReasonBuilder

def debug_query(question):
    with open('execution_log.txt', 'w', encoding='utf-8') as log:
        log.write(f"--- START DEBUG: {question} ---\n")
        engine = FarmerDecisionEngine()
        
        # 1. Topic Detection
        detected_topic = 'crops'
        for t in ['crops', 'irrigation', 'pests', 'soil', 'weather', 'market', 'equipment', 'general']:
            if engine.validate_topic(topic=t, question=question) == True:
                detected_topic = t
                break
        log.write(f"TOPIC: {detected_topic}\n")
        
        # 2. Context Building
        context = engine.build_context(question, detected_topic)
        log.write(f"CROP: {context['crop']}\n")
        log.write(f"INTENT: {engine.detect_intent(detected_topic, question)}\n")
        log.write(f"CONTEXT_CLIMATE: {context.get('climate')}\n")
        log.write(f"CONTEXT_SOIL: {context.get('soil')}\n")
        
        # 3. Decision
        result = engine.decide(detected_topic, question)
        log.write(f"SCORE: {result.get('score')}\n")
        log.write(f"DECISION: {result.get('decision')}\n")
        
        # 4. Explanation
        explanation = ReasonBuilder.build_explanation(result)
        log.write(f"ANSWER: {explanation['answer']}\n")
        log.write(f"--- END DEBUG ---\n")

if __name__ == "__main__":
    debug_query("Why are my rice leaves turning yellow in the center?")

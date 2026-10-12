import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

try:
    from ai_service import get_rule_based_decision
except ImportError:
    print("Could not import ai_service. Make sure you are in the project root.")
    sys.exit(1)

with open('verification_output.txt', 'w', encoding='utf-8') as f:
    def test_module(topic, question):
        result = get_rule_based_decision(topic, question=question)
        output = f"Topic: {topic:15} | Question: {question:20} | Detected Key: {result['response_key']}\n"
        print(output, end='')
        f.write(output)

    f.write("--- STARTING VERIFICATION ---\n")
    print("--- STARTING VERIFICATION ---")

    # 1. On-topic tests (Granular)
    test_module("general", "How to do organic farming?")
    test_module("crop_management", "What is intercropping?")
    test_module("crop_management", "How to increase yield?")
    test_module("soil", "How to test soil pH?")
    test_module("weather", "drought risks")
    test_module("market", "when to sell tomato for profit?")
    test_module("market", "storage in mandi")
    test_module("pests", "pest symptoms")
    test_module("irrigation", "drip irrigation tech")
    test_module("equipment", "manual vs mechanized tools")

    # 2. Basic On-topic tests
    test_module("soil", "soil health")
    test_module("market", "market prices")
    test_module("equipment", "tractor maintenance")

    # 3. Strict redirection tests (Off-topic)
    test_module("soil", "tomato market prices")
    test_module("crops", "weather rain")
    test_module("pests", "irrigation pump")

    # 4. Multilingual redirection & Granular
    test_module("crops", "மண்ணின் வளம்") # Redirection
    test_module("soil", "ஊட்டச்சத்து குறைபாடு") # SOIL_NUTRIENT_GUIDE
    test_module("general", "जैविक खेती") # GENERAL_ORGANIC_GUIDE
    test_module("market", "मुनाफा कैसे कमाएं") # MARKET_PROFIT_GUIDE

    f.write("--- VERIFICATION COMPLETE ---\n")
    print("--- VERIFICATION COMPLETE ---")

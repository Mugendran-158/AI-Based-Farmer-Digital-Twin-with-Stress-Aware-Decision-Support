
import sys
sys.path.append(r'c:\Users\hp\OneDrive\Pictures\ori _farm ai\DMPMHCV\DMPMHCV\backend')
from ai_service import get_rule_based_decision

res = get_rule_based_decision("crop_management", None, "any tips for farming")
print(f"Result: {res}")

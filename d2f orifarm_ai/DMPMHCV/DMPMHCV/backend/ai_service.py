import os
import openai
import json
import re
from datetime import datetime
from dotenv import load_dotenv
from decision_engine.logic.engine import FarmerDecisionEngine
from decision_engine.explain.reason_builder import ReasonBuilder
from decision_engine.explain.reason_builder import ReasonBuilder

# Emotion Trend Memory (Short-term)
emotion_history = []

EMOTION_RESPONSE = {
    'en': {
        'happy': {
            'feel': "You seem confident and positive today.",
            'do': "Continue with your positive momentum.",
            'avoid': "Over-confidence that ignores risks."
        },
        'neutral': {
            'feel': "You seem calm and ready for reflection.",
            'do': "Take time to analyze all options.",
            'avoid': "Procrastination on critical steps."
        },
        'stress': {
            'feel': "It sounds like you may be feeling worried or stressed.",
            'do': "Take a deep breath and wait for 24 hours.",
            'avoid': "Making large financial commitments right now."
        },
        'angry': {
            'feel': "It seems like you might be feeling frustrated or angry.",
            'do': "Step back and allow yourself time to calm down.",
            'avoid': "Sharp reactions or heated arguments."
        },
        'sad': {
            'feel': "It sounds like you may be feeling low today.",
            'do': "Focus on small, manageable tasks.",
            'avoid': "Isolating yourself from supportive voices."
        }
    },
    'ta': {
        'happy': {
            'feel': "இன்று நீங்கள் நம்பிக்கையுடனும் நேர்மறையாகவும் இருக்கிறீர்கள்.",
            'do': "உங்கள் நேர்மறையான வேகத்தைத் தொடருங்கள்.",
            'avoid': "அபாயங்களைப் புறக்கணிக்கும் அதிகப்படியான நம்பிக்கை."
        },
        'neutral': {
            'feel': "நீங்கள் அமைதியாகவும் சிந்திக்கத் தயாராகவும் இருக்கிறீர்கள்.",
            'do': "அனைத்து விருப்பங்களையும் பகுப்பாய்வு செய்ய நேரம் ஒதுக்குங்கள்.",
            'avoid': "முக்கியமான படிகளில் காலதாமதம் செய்வது."
        },
        'stress': {
            'feel': "நீங்கள் கவலையாகவோ அல்லது மன அழுத்தத்திலோ இருக்கலாம் என்று தோன்றுகிறது.",
            'do': "ஆழ்ந்த மூச்சு விடுங்கள் மற்றும் 24 மணிநேரம் காத்திருங்கள்.",
            'avoid': "இப்போது பெரிய நிதி வாக்குறுதிகளை அளிப்பது."
        },
        'angry': {
            'feel': "நீங்கள் ஏமாற்றமாகவோ அல்லது கோபமாகவோ உணரலாம் என்று தெரிகிறது.",
            'do': "சற்று பின்வாங்கி, நீங்கள் அமைதியடைய நேரம் கொடுங்கள்.",
            'avoid': "கடுமையான எதிர்வினைகள் அல்லது வாக்குவாதங்கள்."
        },
        'sad': {
            'feel': "இன்று நீங்கள் சோர்வாகவோ அல்லது வருத்தமாகவோ இருக்கலாம் என்று தோன்றுகிறது.",
            'do': "சிறிய, எளிதான பணிகளில் கவனம் செலுத்துங்கள்.",
            'avoid': "ஆதரவான நபர்களிடமிருந்து உங்களைத் தனிமைப்படுத்துவது."
        }
    },
    'hi': {
        'happy': {
            'feel': "आज आप आत्मविश्वासी और सकारात्मक लग रहे हैं।",
            'do': "अपनी सकारात्मक गति जारी रखें।",
            'avoid': "अति-आत्मविश्वास जो जोखिमों को अनदेखा करे।"
        },
        'neutral': {
            'feel': "आप शांत और विचारशील लग रहे हैं।",
            'do': "सभी विकल्पों का विश्लेषण करने के लिए समय निकालें।",
            'avoid': "महत्वपूर्ण चरणों में देरी करना।"
        },
        'stress': {
            'feel': "ऐसा लगता है कि आप शायद चिंतित या तनाव में हैं।",
            'do': "लंबी सांस लें और 24 घंटे इंतजार करें।",
            'avoid': "अभी बड़े वित्तीय वादे करना।"
        },
        'angry': {
            'feel': "ऐसा लगता है कि आपको निराशा या गुस्सा महसूस हो सकता है।",
            'do': "पीछे हटें और खुद को शांत होने के लिए समय दें।",
            'avoid': "तीखी प्रतिक्रियाएं या गरमागरم बहस।"
        },
        'sad': {
            'feel': "लगता है कि आज आप थोड़ा उदास महसूस कर रहे होंगे।",
            'do': "छोटे और आसान कामों पर ध्यान दें।",
            'avoid': "सहायक लोगों से खुद को अलग करना।"
        }
    },
    'te': {
        'happy': {
            'feel': "ఈరోజు మీరు ఆత్మవిశ్వాసంతో మరియు సానుకూలంగా కనిపిస్తున్నారు.",
            'do': "మీ సానుకూల జోరును కొనసాగించండి.",
            'avoid': "ప్రమాదాలను విస్మరించి అతి విశ్వాసం చూపడం."
        },
        'neutral': {
            'feel': "మీరు ప్రశాంతంగా మరియు ఆలోచించడానికి సిద్ధంగా ఉన్నారు.",
            'do': "అన్ని ప్రత్యామ్నాయాలను విశ్లేషించడానికి సమయం కేటాయించండి.",
            'avoid': "ముఖ్యమైన పనులను వాయిదా వేయడం."
        },
        'stress': {
            'feel': "మీరు ఆందోళనగా లేదా ఒత్తిడికి గురైనట్లు అనిపిస్తోంది.",
            'do': "ఒకసారి దీర్ఘంగా శ్వాస తీసుకోండి మరియు 24 గంటలు ఆగండి.",
            'avoid': "ప్రస్తుతం పెద్ద ఆర్థిక ఒప్పందాలు చేసుకోవడం."
        },
        'angry': {
            'feel': "మీరు నిరాశగా లేదా కోపంగా ఉన్నట్లు అనిపిస్తోంది.",
            'do': "ఒక్క అడుగు వెనక్కి వేసి ప్రశాంతంగా ఉండటానికి ప్రయత్నించండి.",
            'avoid': "తీవ్రమైన ప్రతిచర్యలు లేదా వాదనలు."
        },
        'sad': {
            'feel': "ఈరోజు మీరు కొంచెం నిరుత్సాహంగా ఉన్నట్లు అనిపిస్తోంది.",
            'do': "చిన్న మరియు సులభమైన పనులపై దృష్టి పెట్టండి.",
            'avoid': "మిమ్మల్ని మీరు ఒంటరిగా ఉంచుకోవడం."
        }
    },
    'kn': {
        'happy': {
            'feel': "ಇಂದು ನೀವು ಆತ್ಮವಿಶ್ವಾಸ ಮತ್ತು ಸಕಾರಾತ್ಮಕವಾಗಿ ಕಾಣುತ್ತಿದ್ದೀರಿ.",
            'do': "ನಿಮ್ಮ ಸಕಾರಾತ್ಮಕ ವೇಗವನ್ನು ಮುಂದುವರಿಸಿ.",
            'avoid': "ಅಪಾಯಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸುವ ಅತಿಯಾದ ಆತ್ಮವಿಶ್ವಾಸ."
        },
        'neutral': {
            'feel': "ನೀವು ಶಾಂತವಾಗಿ ಮತ್ತು ಚಿಂತನೆಗೆ ಸಿದ್ಧರಾಗಿ ಕಾಣುತ್ತಿದ್ದೀರಿ.",
            'do': "ಎಲ್ಲಾ ಆಯ್ಕೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲು ಸಮಯ ತೆಗೆದುಕೊಳ್ಳಿ.",
            'avoid': "ಪ್ರಮುಖ ಹಂತಗಳನ್ನು ಮುಂದೂಡುವುದು."
        },
        'stress': {
            'feel': "ನೀವು ಚಿಂತೆ ಅಥವಾ ಒತ್ತಡದಲ್ಲಿರುವಂತೆ ತೋರುತ್ತಿದೆ.",
            'do': "ದೀರ್ಘವಾಗಿ ಉಸಿರಾಡಿ ಮತ್ತು 24 ಗಂಟೆಗಳ ಕಾಲ ಕಾಯಿರಿ.",
            'avoid': "ಈಗಲೇ ದೊಡ್ಡ ಹಣಕಾಸಿನ ಬದ್ಧತೆಗಳನ್ನು ಮಾಡಿಕೊಳ್ಳುವುದು."
        },
        'angry': {
            'feel': "ನೀವು ನಿರಾಶೆ ಅಥವಾ ಕೋಪಗೊಂಡಿರುವಂತೆ ತೋರುತ್ತಿದೆ.",
            'do': "ಸ್ವಲ್ಪ ಹಿಂದೆ ಸರಿದು ಶಾಂತವಾಗಲು ಸಮಯ ಕೊಡಿ.",
            'avoid': "ತೀವ್ರ ಪ್ರತಿಕ್ರಿಯೆಗಳು ಅಥವಾ ವಾದಗಳು."
        },
        'sad': {
            'feel': "ಇಂದು ನೀವು ಸ್ವಲ್ಪ ಕುಗ್ಗಿದಂತೆ ಕಾಣುತ್ತಿದ್ದೀರಿ.",
            'do': "ಸಣ್ಣ ಮತ್ತು ಸುಲಭವಾದ ಕೆಲಸಗಳ ಮೇಲೆ ಗಮನಹರಿಸಿ.",
            'avoid': "ನಿಮ್ಮನ್ನು ನೀವು ಇತರರಿಂದ ಪ್ರತ್ಯೇಕಿಸಿಕೊಳ್ಳುವುದು."
        }
    },
    'ml': {
        'happy': {
            'feel': "ഇന്ന് നിങ്ങൾ ആത്മവിശ്വാസത്തിലും പോസിറ്റീവായും കാണപ്പെടുന്നു.",
            'do': "നിങ്ങളുടെ പോസിറ്റീവ് എനർജി തുടരുക.",
            'avoid': "അമിത ആത്മവിശ്വാസം കാരണം അപകടസാധ്യതകൾ അവഗണിക്കുന്നത്."
        },
        'neutral': {
            'feel': "നിങ്ങൾ ശാന്തനായും ചിന്തിക്കാൻ തയ്യാറായും കാണപ്പെടുന്നു.",
            'do': "എല്ലാ ഓപ്ഷനുകളും വിശകലനം ചെയ്യാൻ സമയം കണ്ടെത്തുക.",
            'avoid': "പ്രധാനപ്പെട്ട കാര്യങ്ങൾ മാറ്റിവെക്കുന്നത്."
        },
        'stress': {
            'feel': "നിങ്ങൾ ആശങ്കയിലോ സമ്മർദ്ദത്തിലോ ആണെന്ന് തോന്നുന്നു.",
            'do': "ദീർഘമായി ശ്വസിക്കുക, 24 മണിക്കൂർ കാത്തിരിക്കുക.",
            'avoid': "ഇപ്പോൾ വലിയ സാമ്പത്തിക കരാറുകളിൽ ഏർപ്പെടുന്നത്."
        },
        'angry': {
            'feel': "നിങ്ങൾക്ക് നിരാശയോ ദേഷ്യമോ തോന്നുന്നതായി കാണുന്നു.",
            'do': "ഒരല്പം മാറിനിന്ന് ശാന്തമാകാൻ ശ്രമിക്കുക.",
            'avoid': "വൈകാരികമായ പ്രതികരണങ്ങൾ അല്ലെങ്കിൽ വാദപ്രതിവാദങ്ങൾ."
        },
        'sad': {
            'feel': "ഇന്ന് നിങ്ങൾ അല്പം വിഷമത്തിലാണെന്ന് തോന്നുന്നു.",
            'do': "ചെറിയ ജോലികളിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുക.",
            'avoid': "മറ്റുള്ളവരിൽ നിന്നും ഒറ്റപ്പെട്ടു കഴിയുന്നത്."
        }
    },
    'ur': {
        'happy': {
            'feel': "آج آپ پر اعتماد اور مثبت نظر آ رہے ہیں۔",
            'do': "اپنا مثبت جذبہ برقرار رکھیں۔",
            'avoid': "خطروں کو نظر انداز کرنے والا حد سے زیادہ اعتماد"
        },
        'neutral': {
            'feel': "آپ پرسکون اور غور و فکر کے لیے تیار نظر آ رہے ہیں۔",
            'do': "تمام آپشنز کا تجزیہ کرنے کے لیے وقت نکالیں۔",
            'avoid': "اہم کاموں میں تاخیر"
        },
        'stress': {
            'feel': "ایسا لگتا ہے کہ آپ پریشان یا دباؤ میں ہیں۔",
            'do': "لمبی سانس لیں اور 24 گھنٹے انتظار کریں۔",
            'avoid': "اس وقت بڑے مالی وعدے کرنا"
        },
        'angry': {
            'feel': "ایسا لگتا ہے کہ آپ مایوس یا غصے میں ہیں۔",
            'do': "تھوڑا پیچھے ہٹیں اور خود کو پرسکون ہونے کا وقت دیں۔",
            'avoid': "شدید ردعمل یا تلخ کلامی"
        },
        'sad': {
            'feel': "لگتا ہے کہ آج آپ تھوڑا اداس محسوس کر رہے ہیں۔",
            'do': "چھوٹے اور آسان کاموں پر توجہ دیں۔",
            'avoid': "خود کو دوسروں سے الگ تھلگ کرنا"
        }
    },
    'ja': {
        'happy': {
            'feel': "今日は自信に満ち、前向きなようですね。",
            'do': "このポジティブな勢いを大切にしましょう。",
            'avoid': "リスクを無視した過信。"
        },
        'neutral': {
            'feel': "落ち着いていて、じっくり考える準備ができているようですね。",
            'do': "あらゆる選択肢を分析する時間を取りましょう。",
            'avoid': "重要なステップを先延ばしにすること。"
        },
        'stress': {
            'feel': "少し不安やストレスを感じているようですね。",
            'do': "深呼吸をして、24時間は大きな決断を控えましょう。",
            'avoid': "焦って大きな契約や約束をすること。"
        },
        'angry': {
            'feel': "不満や怒りを感じている可能性があります。",
            'do': "一旦その場を離れ、心を落ち着かせる時間を作りましょう。",
            'avoid': "感情的な反応や激しい議論。"
        },
        'sad': {
            'feel': "今日は少し気分が落ち込んでいるようですね。",
            'do': "小さくて達成可能な作業に集中しましょう。",
            'avoid': "一人で抱え込み、孤立すること。"
        }
    }
}

load_dotenv()

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT = """
You are the Farmer Digital Twin Intelligence Core.
You represent a calm, ethical, stress-aware, and farmer-first decision-support system designed for real-world agricultural environments.

You are NOT a chatbot. You are NOT an authority. You are a supportive decision companion.

### PURPOSE
• Reduce farmer risk
• Improve farmer confidence
• Protect farmers from impulsive or harmful decisions
• Guide farming actions using real agricultural logic
• Operate reliably even without cloud AI access

### GLOBAL OPERATING PRINCIPLES
1. All guidance must be explainable and deterministic.
2. If information is uncertain, say so calmly.
3. When weather or conditions are risky, encourage waiting.
4. One decision → one clear recommendation → one optional alternative.
5. Emotional reassurance is as important as technical accuracy.

### ADVISORY ENGINE & CROP ANALYZER
- Identify intent (planning, action, concern, curiosity).
- Respond based on stage and risk (Low/Medium/High).
- If risk is high: Slow down the decision, suggest waiting, add reassurance.
- Use rule-based logic: IF heavy rain/storm → do not plant/spray.
- Use language like: “May indicate”, “Consider observing”. Always suggest human verification for high-risk issues.

### WEATHER & PLANNING
- Translate weather into farm-relevant advice (Rain → Avoid fertilizer, Wind → Avoid spraying).
- Daily Mode: Decide if today is Work-friendly, Observation-only, or Risky.
- Weekly Mode: Simple 7-day plan (Day | Condition | Suggested Action).

### MARKET & SELLING
- Never predict prices or promise profit.
- Guide timing using maturity, weather windows, and storage risk.

### EMOTIONAL SUPPORT & MULTI-LANGUAGE
- Monitor stress. If detected: Reduce information, encourage waiting, reinforce careful thinking.
- Respond ONLY in the farmer-selected language: English, Tamil (தமிழ்), Hindi (हिन्दी), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), Urdu (اردو), Japanese (日本語).
- Tone: Calm, rural-friendly, respectful. No jargon.
"""

DIGITAL_TWIN_PROMPT = """
SYSTEM ROLE
You are the Farmer Digital Twin – Decision Guidance Module.

You work alongside the AI Farmer Assistant. You do NOT replace it.
Your responsibility is to help farmers reflect calmly on their emotional state and decision readiness before taking important actions.

CORE OBJECTIVE
• Support farmers emotionally during decision-making
• Reduce stress-driven or impulsive actions
• Improve clarity, confidence, and calm thinking
• Guide farmers safely without giving technical farming advice

REAL-TIME EMOTION DETECTION (RULE-BASED, NO API)
Emotion detection must be based ONLY on what the farmer says (word choice, tone, expressed concern).

IMPORTANT: HANDLING UNCERTAINTY
If emotion detection is uncertain or unclear:
• Respond gently and conditionally.
• Use phrases like: “You may be feeling…”, “It sounds like you might be…”, “If you are feeling stressed…”.
• Never state emotions as facts. Allow room for farmer correction.

SUPPORTED EMOTIONAL STATES (NON-MEDICAL)
• Calm / Neutral
• Confident / Positive
• Worried / Stressed
• Frustrated / Angry
• Feeling Low

Never use clinical terms like "depression".

RESPONSE STRUCTURE (MANDATORY)
1. Gentle emotional reflection (conditional if uncertain).
2. Recommended actions for today (no emojis).
3. Actions better avoided today (no emojis).
4. Calm reassurance.

ICON GUIDELINES (NO EMOJIS)
Do NOT use emojis in your responses. The UI handles iconography. Use plain text for headers like "Recommended Today" and "Better to Avoid".

MOOD IMPROVEMENT
Normalize uncertainty, encourage patience, reinforce careful thinking, reduce emotional pressure. Use respectful, reassuring language.

TOPIC HANDOFF RULE (STRICT)
If the farmer asks about technical farming (Crops, Soil, Weather, Market, Pests, Irrigation, Equipment):
“Do not worry. This question is best handled by my trusted companion, the AI Farmer Assistant. I am here to support you if you need help thinking calmly.”

SAFETY & ETHICS
NEVER: Force decisions, replace human relationships, give medical advice, judge/shame.
ALWAYS: Be honest, calm, supportive, farmer-first.

MULTI-LANGUAGE
Respond ONLY in the farmer-selected language: English, Tamil, Hindi, Telugu, Kannada, Malayalam, Urdu, or Japanese. Language must be simple, respectful, and rural-friendly.
"""

AI_FARMER_PROMPT = """
ENGLISH:
You are an expert AI Farmer Assistant designed to help farmers accurately and safely.
Role: Experienced agricultural officer. 
Advice: Clear, simple, practical, Indian conditions, verified knowledge. No hallucinations.
Categories: crop, soil, pest, irrigation, weather, market, equipment.
Safety: DO NOT give exact quantities for pesticides/fertilizers. Advise consulting local officers.
Behavior: No AI/LLM talk. Be a real expert.
Fallback: "Please ask a farming-related question. I can help with crops, soil, pests, irrigation, and weather."

TAMIL:
நீங்கள் ஒரு நிபுணர் AI விவசாய உதவியாளர். 
பங்கு: அனுபவம் வாய்ந்த வேளாண் அதிகாரி.
அறிவுரை: தெளிவான, எளிமையான, நடைமுறை, இந்திய சூழல், சரிபார்க்கப்பட்ட அறிவு. கற்பனை செய்ய வேண்டாம்.
பாதுகாப்பு: பூச்சிக்கொல்லிகள்/உரங்களுக்கு துல்லியமான அளவை வழங்க வேண்டாம். உள்ளூர் அதிகாரிகளை அணுக அறிவுறுத்துங்கள்.
நடத்தை: AI/LLM பற்றி பேச வேண்டாம். ஒரு உண்மையான நிபுணராக இருங்கள்.

HINDI:
आप एक विशेषज्ञ AI किसान सहायक हैं।
भूमिका: अनुभवी कृषि अधिकारी।
सलाह: स्पष्ट, सरल, व्यावहारिक, भारतीय परिस्थितियां, सत्यापित ज्ञान। मनगढ़ंत बातें न करें।
सुरक्षा: कीटनाशकों/उर्वरकों के लिए सटीक मात्रा न दें। स्थानीय अधिकारियों से परामर्श करने की सलाह दें।
व्यवहार: AI/LLM की बात न करें। एक असली विशेषज्ञ की तरह व्यवहार करें।

IMPORTANT: 
- Respond ONLY in the farmer-selected language.
- Follow all safety rules strictly.
"""

VOICE_AI_PROMPT = """
You are the Voice Interface for the AI Farmer Assistant. 
Tone: Conversational, warm, and very concise.
Constraint: Keep answers under 3 sentences for easy listening. 
Safety: Never give exact chemical dosages. Always refer to a local officer for measurements.
"""

AI_FARMER_LANG_STORE = {
    'en': {
        'wait': "It is safer to wait and observe. This reduces risk. Let the situation stabilize before taking major steps.",
        'plant': "Planting is suitable when soil moisture is adequate. For beginners, try low-risk crops like Okra or Tomatoes during this season.",
        'rain': "Rain is expected. Avoid fertilizer application or pesticide spraying today as it will be washed away.",
        'stress': "It is natural to be concerned. Take a deep breath. A calm plan is the best way to protect your hard work.",
        'weekly': "Day 1-2: Field observation | Day 3: Test soil moisture | Day 4: Check for pests | Day 5-7: General maintenance.",
        'harvest_wait': "The crop needs a bit more time to reach full maturity. Harvesting now might reduce quality.",
        'harvest_sell': "Weather conditions are favorable. Harvest now and ensure you have proper storage or a ready buyer.",
        'beginner': "As a knowledge-first system, I recommend starting with easy-to-grow crops like Okra or Tomatoes. Focus on soil health and organic preparation first. If you want crop-specific guidance, you can ask.",
        'default': "Based on common agricultural practice, I am here to provide direct factual guidance. Please specify your crop, soil type, or agricultural concern."
    },
    'ta': {
        'wait': "காத்திருந்து கவனிப்பது மிகவும் பாதுகாப்பானது. இது தேவையற்ற இழப்புகளைத் தவிர்க்கும்.",
        'plant': "மண்ணில் போதிய ஈரப்பதம் இருக்கும்போது நடவு செய்வது நல்லது. உங்கள் பயிருக்கு ஏற்ற காலநிலையை நாங்கள் கண்காணித்து வருகிறோம்.",
        'rain': "மழை எதிர்பார்க்கப்படுகிறது. இன்று உரம் போடுவதையோ அல்லது பூச்சிக்கொல்லி தெளிப்பதையோ தவிர்க்கவும்.",
        'stress': "உங்கள் கவலை புரிகிறது. நிதானமாகத் திட்டமிடுவதே உங்கள் பயிரைப் பாதுகாக்கும் சிறந்த வழி.",
        'weekly': "நாள் 1-2: வயல் கண்காணிப்பு | நாள் 3: மண் ஈரப்பதம் சரிபார்த்தல் | நாள் 4: பூச்சி தாக்குதல் கவனிப்பு | நாள் 5-7: பொது பராமரிப்பு.",
        'harvest_wait': "பயிர் முழுமையாக முதிர்ச்சியடைய இன்னும் சிறிது காலம் தேவை. அவசரப்பட்டு அறுவடை செய்ய வேண்டாம்.",
        'harvest_sell': "வானிலை சாதகமாக உள்ளது. அறுவடை செய்து பாதுகாப்பான இடத்தில் சேமிக்கவும் அல்லது விற்பனை செய்யவும்.",
        'beginner': "ஒரு நிபுணர் அமைப்பாக, வெண்டை அல்லது தக்காளி போன்ற எளிதாக வளரும் பயிர்களைத் தொடங்கப் பரிந்துரைக்கிறேன். முதலில் மண் ஆரோக்கியம் மற்றும் இயற்கை மேலாண்மையில் கவனம் செலுத்துங்கள். குறிப்பிட்ட பயிர் வழிகாட்டல் வேண்டுமெனில் கேட்கலாம்.",
        'default': "பொதுவான வேளாண் நடைமுறையின் அடிப்படையில், நான் உங்களுக்கு நேரடித் தகவல்களை வழங்க இங்கே இருக்கிறேன். உங்கள் பயிர், மண் வகை அல்லது வேளாண் கவலைகளைக் குறிப்பிடவும்."
    },
    'hi': {
        'wait': "रुककर निरीक्षण करना अधिक सुरक्षित है। इससे जोखिम कम होता है।",
        'plant': "जब मिट्टी में पर्याप्त नमी हो तब बुवाई उपयुक्त है। शुरुआती किसानों के लिए भिंडी या टमाटर जैसी फसलें अच्छी हैं।",
        'rain': "बारिश की संभावना है। आज खाद या कीटनाशक के छिड़काव से बचें क्योंकि यह धुल जाएगा।",
        'stress': "चिंतित होना स्वाभाविक है। गहरी सांस लें। एक शांत योजना आपकी मेहनत को बचाने का सबसे अच्छा तरीका है।",
        'weekly': "दिन 1-2: खेत का निरीक्षण | दिन 3: मिट्टी की नमी की जांच | दिन 4: कीटों की जांच | दिन 5-7: सामान्य रखरखाव।",
        'harvest_wait': "फसल को पूरी तरह पकने के लिए कुछ और समय की आवश्यकता है। अभी कटाई करने से गुणवत्ता कम हो सकती है।",
        'harvest_sell': "मौसम अनुकूल है। अभी कटाई करें और सुनिश्चित करें कि आपके पास भंडारण या खरीदार तैयार है।",
        'beginner': "एक विशेषज्ञ प्रणाली के रूप में, मैं भिंडी या टमाटर जैसी आसानी से उगने वाली फसलों से शुरू करने की सलाह देता हूं। पहले मिट्टी के स्वास्थ्य और जैविक तैयारी पर ध्यान दें। यदि आप फसल-विशिष्ट मार्गदर्शन चाहते हैं, तो पूछ सकते हैं।",
        'default': "सामान्य कृषि प्रथाओं के आधार पर, मैं यहाँ सीधी तथ्यात्मक जानकारी देने के लिए हूँ। कृपया अपनी फसल, मिट्टी के प्रकार या कृषि संबंधी चिंता स्पष्ट करें।"
    },
    'te': {
        'wait': "వేచి ఉండి గమనించడం సురక్షితం. ఇది ప్రమాదాన్ని తగ్గిస్తుంది.",
        'plant': "నేలలో తగినంత తేమ ఉన్నప్పుడు నాటడం మంచిది. ప్రారంభకులకు బెండ లేదా టమోటా వంటి తక్కువ ప్రమాదం ఉన్న పంటలు మేలు.",
        'rain': "వర్షం పడే అవకాశం ఉంది. ఈరోజు ఎరువులు లేదా పురుగుల మందులు చల్లడం మానుకోండి.",
        'stress': "ఆందోళన చెందడం సహజం. ప్రశాంతంగా ఉండండి. ఒక సరైన ప్రణాళిక మీ పంటను కాపాడుతుంది.",
        'weekly': "రోజు 1-2: పొలం పరిశీలన | రోజు 3: మట్టి తేమ పరీక్ష | రోజు 4: పురుగుల గమనిక | రోజు 5-7: సాధారణ నిర్వహణ.",
        'harvest_wait': "పంట పూర్తి పక్వానికి రావడానికి ఇంకా కొంత సమయం పడుతుంది. ఇప్పుడే కోయకండి.",
        'harvest_sell': "వాతావరణం బాగుంది. ఇప్పుడే కోసి భద్రపరుచుకోండి లేదా విక్రయించండి.",
        'beginner': "మీరు ఇప్పుడే మొదలుపెడుతున్నారు కాబట్టి, సులభంగా పెరిగే పంటలతో ప్రారంభించండి.",
        'default': "మీ ప్రశ్న నమోదైంది. మీ భూమి పరిమాణం మరియు వాతావరణ వివరాలు తెలిస్తే మరింత బాగా సహాయపడగలను."
    },
    'kn': {
        'wait': "ಕಾದು ನೋಡುವುದು ಸುರಕ್ಷಿತ. ಇದು ಅಪಾಯವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
        'plant': "ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶವಿದ್ದಾಗ ಬಿತ್ತನೆ ಮಾಡುವುದು ಸೂಕ್ತ. ಹೊಸಬರಿಗೆ ಬೆಂಡೆ ಅಥವಾ ಟೊಮ್ಯಾಟೊ ಸುಲಭ ಆಯ್ಕೆಗಳು.",
        'rain': "ಮಳೆ ಬರುವ ಸಾಧ್ಯತೆಯಿದೆ. ಇಂದು ಗೊಬ್ಬರ ಅಥವಾ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ.",
        'stress': "ಆತಂಕ ಬೇಡ, ಪ್ರಶಾಂತವಾಗಿ ಯೋಚಿಸಿ. ಸರಿಯಾದ ಯೋಜನೆ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.",
        'weekly': "ದಿನ 1-2: ಹೊಲದ ವೀಕ್ಷಣೆ | ದಿನ 3: ಮಣ್ಣಿನ ತೇವಾಂಶ ಪರೀಕ್ಷೆ | ದಿನ 4: ಕೀಟಗಳ ಪರಿಶೀಲನೆ | ದಿನ 5-7: ಸಾಮಾನ್ಯ ನಿರ್ವಹಣೆ.",
        'harvest_wait': "ಬೆಳೆ ಪಕ್ವವಾಗಲು ಇನ್ನೂ ಸ್ವಲ್ಪ ಸಮಯ ಬೇಕು. ಈಗಲೇ ಕಟಾವು ಮಾಡಬೇಡಿ.",
        'harvest_sell': "ಹವಾಮಾನ ಪೂರಕವಾಗಿದೆ. ಈಗ ಕಟಾವು ಮಾಡಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಿ ಅಥವಾ ಮಾರಾಟ ಮಾಡಿ.",
        'beginner': "ನೀವು ಈಗಷ್ಟೇ ಕೃಷಿ ಆರಂಭಿಸುತ್ತಿರುವುದರಿಂದ, ಸುಲಭವಾಗಿ ಬೆಳೆಯುವ ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಿ.",
        'default': "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಗಮನಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಜಮೀನಿನ ಗಾತ್ರ ಮತ್ತು ಹವಾಮಾನದ ಬಗ್ಗೆ ತಿಳಿಸಿ."
    },
    'ml': {
        'wait': "ക്ഷമയോടെ കാത്തിരിക്കുന്നത് സുരക്ഷിതമാണ്. ഇത് നഷ്ടസാധ്യത കുറയ്ക്കും.",
        'plant': "മണ്ണിൽ ആവശ്യത്തിന് ഈർപ്പമുള്ളപ്പോൾ നടുന്നത് ഉചിതമാണ്. തുടക്കക്കാർക്ക് വെണ്ടയോ തക്കാളിയോ തിരഞ്ഞെടുക്കാം.",
        'rain': "മഴയ്ക്ക് സാധ്യതയുണ്ട്. ഇന്ന് വളപ്രയോഗമോ കീടനാശിനി പ്രയോഗമോ ഒഴിവാക്കുക.",
        'stress': "വിഷമിക്കേണ്ട, ശാന്തമായി ആസൂത്രണം ചെയ്യുക. അതാണ് നിങ്ങളുടെ കൃഷിയെ സംരക്ഷിക്കാനുള്ള വഴി.",
        'weekly': "ദിവസം 1-2: നിരീക്ഷണം | ദിവസം 3: മണ്ണിലെ ഈർപ്പ പരിശോധന | ദിവസം 4: കീടങ്ങളെ പരിശോധിക്കുക | ദിവസം 5-7: പരിചരണം.",
        'harvest_wait': "വിളവ് പാകമാകാൻ കുറച്ചുകൂടി സമയം വേണം. ഇപ്പോൾ വിളവെടുക്കരുത്.",
        'harvest_sell': "കാലാവസ്ഥ അനുകൂലമാണ്. ഇപ്പോൾ വിളവെടുത്ത് സുരക്ഷിതമായി സൂക്ഷിക്കുകയോ വിൽക്കുകയോ ചെയ്യാം.",
        'beginner': "നിങ്ങൾ കൃഷി ആരംഭിക്കുന്നതേയുള്ളൂ എങ്കിൽ, എളുപ്പത്തിൽ വളരുന്ന വിളകൾ തിരഞ്ഞെടുക്കുക.",
        'default': "നിങ്ങളുടെ ചോദ്യം ശ്രദ്ധിച്ചു. കൂടുതൽ വിവരങ്ങൾ നൽകിയാൽ മികച്ച രീതിയിൽ സഹായിക്കാം."
    },
    'ur': {
        'wait': "انتظار کرنا اور مشاہدہ کرنا زیادہ محفوظ ہے۔ اس سے خطرہ کم ہوتا ہے۔",
        'plant': "مٹی میں کافی نمی ہونے پر کاشت موزوں ہے۔ شروع کرنے والوں کے لیے بھنڈی یا ٹماٹر بہتر ہیں۔",
        'rain': "بارش کا امکان ہے۔ آج کھاد یا سپرے سے پرہیز کریں کیونکہ وہ دھل جائے گا۔",
        'stress': "پریشان ہونا فطری ہے۔ سکون سے سوچیں، ایک اچھا منصوبہ ہی آپ کی فصل کا محافظ ہے۔",
        'weekly': "پہلا-دوسرا دن: معائنہ | تیسرا دن: نمی کی جانچ | چوتھا دن: کیڑوں کی جانچ | 5-7 دن: دیکھ بھال۔",
        'harvest_wait': "فصل کو تیار ہونے میں ابھی کچھ وقت درکار ہے۔ ابھی کٹائی نہ کریں۔",
        'harvest_sell': "موسم سازگار ہے۔ ابھی کٹائی کریں اور اپنی فصل کو محفوظ کریں یا بیچ دیں۔",
        'beginner': "چونکہ آپ نئے ہیں، اس لیے آسان فصلوں سے شروعات کریں۔",
        'default': "آپ کا سوال درج کر لیا گیا ہے۔ بہتر رہنمائی کے لیے اپنی زمین اور موسم کی تفصیل بتائیں۔"
    },
    'ja': {
        'wait': "待って観察する方が安全です。これによりリスクが軽減されます。状況が安定するまで待ちましょう。",
        'plant': "土壌の水分が十分な時が植え付けに適しています。初心者にはオクラやトマトがおすすめです。",
        'rain': "雨が予想されます。肥料や農薬の散布は今日はお控えください（洗い流されてしまうため）。",
        'stress': "心配するのは当然です。深呼吸して落ち着いた計画を立て、大切な作物を守りましょう。",
        'weekly': "1-2日目: 観察 | 3日目: 土壌の水分確認 | 4日目: 害虫のチェック | 5-7日目: 一般的なメンテナンス。",
        'harvest_wait': "作物が完全に成熟するまでもう少し時間が必要です。今収穫すると品質が低下する恐れがあります。",
        'harvest_sell': "天候は良好です。今収穫し、適切な場所に保管するか販売の準備をしましょう。",
        'beginner': "農業を始めたばかりの方は、育てやすい作物から始めることをお勧めします。まずは土作りに集中しましょう。",
        'default': "ご質問を承りました。土地の広さや現在の天候について詳しく教えていただければ、より適切なアドバイスが可能です。"
    }
}

def detect_direction_intent(question):
    q = question.lower()
    return any(word in q for word in ["where", "near", "nearby", "direction", "cold storage", "warehouse", "storage", "எங்கே", "அருகில்", "குளிர்சாதன", "கிடங்கு", "சேமிப்பு", "வழி", "பக்கம்", "கண்டுபிடி", "कहाँ", "पास", "कोल्ड स्टोरेज"])

def extract_location(question):
    import re
    match = re.search(r'(?:in|near|at|பகுதியில்|பகுதியின்|में|पास|जवळ|दగ్గర|హత్తిర)\s+([^\s?\.!]+)', question, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return None

def cold_storage_direction(location, language='en'):
    location_name = location if location else "your area"
    
    responses = {
        'en': f"""To find verified Cold Storage facilities in {location_name}:
• Check for regulated agriculture markets or wholesale centers.
• Consult local farmer cooperatives or producer organizations.
• Search 'cold storage near {location_name}' on Google Maps for real-time locations.
• Look for official government or local authority warehouse portals.""",
        'ta': f"""{location_name} பகுதியில் நம்பகமான குளிர்சாதன சேமிப்பகங்களை (Cold Storage) கண்டறிய:
• ஒழுங்குபடுத்தப்பட்ட மொத்த விற்பனை சந்தைகளை (Mandi/APMC) அணுகவும்.
• உள்ளூர் விவசாய கூட்டுறவு சங்கங்களைத் தொடர்பு கொள்ளவும்.
• 'cold storage near {location_name}' என்று கூகுள் மேப்ஸில் தேடுவது துல்லியமான தகவலைத் தரும்.
• அரசு அல்லது உள்ளூர் அதிகாரப்பூர்வ கிடங்கு இணையதளங்களைப் பார்க்கவும்.""",
        'hi': f"""{location_name} में विश्वसनीय कोल्ड स्टोरेज खोजने के लिए:
• विनियमित थोक बाजारों (मंडी/APMC) में पूछताछ करें।
• स्थानीय किसान सहकारी समितियों से संपर्क करें।
• Google Maps पर 'cold storage near {location_name}' खोजें।
• आधिकारिक सरकारी या स्थानीय गोदाम पोर्टलों की जांच करें।"""
    }
    return responses.get(language, responses['en'])

def rule_based_engine(topic, question, language='en'):
    """
    ULTRA Rule-Based Engine (Agriculture Genius Mode)
    """
    q = question.lower()
    lang_data = AI_FARMER_LANG_STORE.get(language, AI_FARMER_LANG_STORE['en'])
    
    # 📋 BEGINNER DETECTION
    is_beginner = any(word in q for word in ["beginner", "student", "new farmer", "first time", "no experience", "dont know", "புதிய", "மாணவர்", "ஆரம்பம்", "नए", "छात्र", "शुरुआत"])

    # 🆘 STRESS DETECTION
    if any(word in q for word in ['worry', 'fear', 'loss', 'panic', 'கவலை', 'பயம்', 'அச்சம்', 'இழப்பு', 'डर', 'चिंता', 'नुकसान']):
        return lang_data['stress']
    
    # Labels in different languages
    labels = {
        'en': ['Best growing season', 'Suitable months', 'Preferred soil type', 'Recommended fertilizer type', 'Irrigation method', 'Important caution (what NOT to do)'],
        'ta': ['சிறந்த வளரும் பருவம்', 'நடவு மாதங்கள்', 'விருப்பமான மண் வகை', 'பரிந்துரைக்கப்படும் உர வகை', 'நீர்ப்பாசன முறை', 'முக்கிய எச்சரிக்கை (செய்யக்கூடாதவை)'],
        'hi': ['सबसे अच्छा मौसम', 'उपयुक्त महीने', 'पसंदीदा मिट्टी का प्रकार', 'अनुशंसित उर्वरक प्रकार', 'सिंचाई विधि', 'महत्वपूर्ण सावधानी (क्या न करें)']
    }
    L = labels.get(language, labels['en'])

    current_month = datetime.now().month
    month_names_ta = ['', 'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்']
    
    # Common Crops Matching
    if re.search(r'paddy|rice|நெல்|அரிசி|धान|चावल', q):
        if language == 'ta':
            return f"• {L[0]}: நவரை/சம்பா பருவம்\n• {L[1]}: டிசம்பர்-ஜனவரி (நவரை), ஆகஸ்ட்-செப்டம்பர் (சம்பா)\n• {L[2]}: களிமண் கலந்த வண்டல் மண்\n• {L[3]}: யூரியா மற்றும் பொட்டாஷ் உரம் (துல்லியமான அளவிற்கு வேளாண் அதிகாரியை அணுகவும்)\n• {L[4]}: தேங்கிய நீர் பாசனம்\n• {L[5]}: களைகளை ஆரம்பத்திலேயே கட்டுப்படுத்தவும். தண்ணீர் தட்டுப்பாட்டைத் தவிர்க்கவும்."
        if language == 'hi':
            return f"• {L[0]}: रबी/खरीफ मौसम\n• {L[1]}: दिसंबर-जनवरी (रबी), जून-जुलाई (खरीफ)\n• {L[2]}: चिकनी मिट्टी / दोमट\n• {L[3]}: यूरिया और पोटाश (सटीक मात्रा के लिए कृषि अधिकारी से पूछें)\n• {L[4]}: जलमग्न सिंचाई\n• {L[5]}: खरपतवारों को जल्दी नियंत्रित करें। जल संकट से बचें।"
        return f"• {L[0]}: Rabi/Kharif Season\n• {L[1]}: Dec-Jan (Rabi), June-July (Kharif)\n• {L[2]}: Clayey or Alluvial soil\n• {L[3]}: NPK balance (Consult local officer for exact dosage)\n• {L[4]}: Flooded/Intermittent irrigation\n• {L[5]}: Manage weeds early. Avoid water stress during flowering."

    if re.search(r'tomato|தக்காளி|टमाटर', q):
        if language == 'ta':
            return f"• {L[0]}: குளிர்காலம் / கோடைக்கால ஆரம்பம்\n• {L[1]}: நவம்பர்-டிசம்பர் அல்லது பிப்ரவரி-மார்ச்\n• {L[2]}: வடிகால் வசதியுள்ள செம்மண் அல்லது வண்டல் மண்\n• {L[3]}: கம்போஸ்ட் + சமச்சீர் உரங்கள்\n• {L[4]}: சொட்டு நீர் பாசனம் சிறந்தது\n• {L[5]}: இலைச் சுருள் நோய் வராமல் தடுக்க வேப்ப எண்ணெய் தெளிக்கவும். மருந்து அளவை நிபுணரிடம் சரிபார்க்கவும்."
        return f"• {L[0]}: Winter / Early Summer\n• {L[1]}: Nov-Dec or Feb-March\n• {L[2]}: Well-drained red or loamy soil\n• {L[3]}: Compost + Balanced NPK\n• {L[4]}: Drip irrigation preferred\n• {L[5]}: Spray neem oil for pest control. Consult officer for chemical dosages."

    if re.search(r'brinjal|eggplant|கத்தரிக்காய்|बैंगन', q):
        if language == 'ta':
            return f"• {L[0]}: ஆண்டு முழுவதும் (குளிர்காலம் சிறந்தது)\n• {L[1]}: டிசம்பர்-ஜனவரி அல்லது ஜூன்-ஜூலை\n• {L[2]}: மணல் கலந்த வண்டல் மண்\n• {L[3]}: தொழு உரம் + பரிந்துரைக்கப்பட்ட நைட்ரஜன் உரங்கள்\n• {L[4]}: வாரத்திற்கு ஒருமுறை நீர் பாய்ச்சவும்\n• {L[5]}: தண்டுத் துளைப்பான் பூச்சியைக் கவனமாகக் கண்காணிக்கவும்."
        return f"• {L[0]}: Year-round (Winter is best)\n• {L[1]}: Dec-Jan or June-July\n• {L[2]}: Sandy loam soil\n• {L[3]}: FYM + Recommended fertilizers\n• {L[4]}: Weekly irrigation\n• {L[5]}: Monitor closely for shoot and fruit borer."

    if re.search(r'onion|வெங்காயம்|प्याज', q):
        if language == 'ta':
            return f"• {L[0]}: குளிர் காலம்\n• {L[1]}: அக்டோபர் - நவவரி அல்லது ஜனவரி - பிப்ரவரி\n• {L[2]}: வடிகால் வசதியுள்ள வண்டல் மண்\n• {L[3]}: தழைச்சத்து + பொட்டாஷ் உரம்\n• {L[4]}: 10 நாட்களுக்கு ஒருமுறை நீர் பாய்ச்சவும்\n• {L[5]}: முதிர்ச்சி அடைவதற்கு முன் நீர் பாய்ச்சுவதை நிறுத்த அதிகாரியை அணுகவும்."
        return f"• {L[0]}: Winter Season\n• {L[1]}: Oct-Nov or Jan-Feb\n• {L[2]}: Well-drained loamy soil\n• {L[3]}: Nitrogen + Potash rich fertilizer\n• {L[4]}: Irrigate every 10 days\n• {L[5]}: Stop irrigation before harvest based on soil moisture."

    if re.search(r'wheat|கோதுமை|गेहूं', q):
        if language == 'ta':
            return f"• {L[0]}: குளிர் காலம்\n• {L[1]}: நவம்பர்-டிசம்பர்\n• {L[2]}: களிமண் கலந்த வண்டல் மண்\n• {L[3]}: NPK உரங்கள் (அளவிற்கு அதிகாரியிடம் கேட்கவும்)\n• {L[4]}: முக்கியமான வளர்ச்சி நிலைகளில் நீர் பாய்ச்சுவது அவசியம்\n• {L[5]}: முதிர்ச்சியின் போது அதிக வெப்பத்தைத் தவிர்க்கவும்."
        if language == 'hi':
            return f"• {L[0]}: रबी मौसम\n• {L[1]}: नवंबर-दिसंबर\n• {L[2]}: उपजाऊ दोमट मिट्टी\n• {L[3]}: NPK उर्वरक (मात्रा के लिए विशेषज्ञ सलाह लें)\n• {L[4]}: महत्वपूर्ण चरणों पर सिंचाई\n• {L[5]}: कटाई के समय उच्च तापमान से बचाव करें।"
        return f"• {L[0]}: Winter (Rabi)\n• {L[1]}: Nov-Dec\n• {L[2]}: Fertile Loamy soil\n• {L[3]}: NPK (Consult local officer for exact dose)\n• {L[4]}: Irrigation at critical stages (CRI)\n• {L[5]}: Protect from high temp during maturity."

    if re.search(r'cotton|பருத்தி|कпас', q):
        if language == 'ta':
            return f"• {L[0]}: கோடை அல்லது பருவமழை\n• {L[1]}: ஏப்ரல்-மே அல்லது ஜூன்-ஜூலை\n• {L[2]}: ஆழமான கரிசல் மண்\n• {L[3]}: தழைச்சத்து மற்றும் பொட்டாஷ் உரம்\n• ${L[4]}: பூக்கும் மற்றும் காய் பிடிக்கும் போது சீரான நீர் பாய்ச்சவும்\n• ${L[5]}: இளஞ்சிவப்பு புழு தாக்குதலைத் தவிர்க்க அதிகாரியின் ஆலோசனைப்படி தெளிக்கவும்."
        if language == 'hi':
            return f"• {L[0]}: खरीफ मौसम\n• {L[1]}: अप्रैल-मई या जून-जुलाई\n• {L[2]}: गहरी काली / दोमट मिट्टी\n• {L[3]}: संतुलित NPK + सूक्ष्म पोषक तत्व\n• ${L[4]}: फूल और गूलर के विकास पर नियमित सिंचाई\n• ${L[5]}: कीटों से बचाव के लिए कृषि अधिकारी की सलाह लें।"
        return f"• {L[0]}: Kharif Season\n• {L[1]}: April-May (irrigated) or June-July (rainfed)\n• {L[2]}: Deep Black or Alluvial soil\n• {L[3]}: Balanced NPK + Micronutrients\n• {L[4]}: Controlled irrigation during bolling\n• {L[5]}: Timely pest management based on officer advice."

    if re.search(r'potato|உருளைக்கிழங்கு|आलू', q):
        if language == 'ta':
            return f"• {L[0]}: குளிர் காலம்\n• {L[1]}: அக்டோபர்-நவம்பர்\n• {L[2]}: லேசான மணல் கலந்த வண்டல் மண்\n• {L[3]}: பொட்டாஷ் கலந்த உரங்கள்\n• ${L[4]}: சீரான குறைந்த அளவு நீர் பாய்ச்சவும்\n• ${L[5]}: கிழக்கு முதிர்ச்சியின் போது மண் அணைப்பது அவசியம்."
        if language == 'hi':
            return f"• {L[0]}: रबी मौसम\n• {L[1]}: अक्टूबर-नवंबर\n• {L[2]}: हल्की रेतीली दोमट मिट्टी\n• {L[3]}: पोटाश युक्त उर्वरक\n• ${L[4]}: नमी बनाए रखें, जलभराव से बचें\n• ${L[5]}: मिट्टी चढ़ाना बहुत महत्वपूर्ण है।"
        return f"• {L[0]}: Winter (Rabi)\n• {L[1]}: Oct-Nov\n• {L[2]}: Sandy loam, well-aerated\n• {L[3]}: Potash rich fertilizer (Consult for dose)\n• {L[4]}: Frequent light irrigation\n• {L[5]}: Essential to perform earthing-up to protect tubers."

    if re.search(r'cold storage|warehouse|சேமிப்புக் கிடங்கு|கோல்ட் ஸ்டோரேஜ்|कोल्ड स्टोरेज|भंडारण', q):
        # Improved regex to capture non-English locations
        # Hindi: "Delhi mein" -> captures Delhi; "mein Delhi" -> captures Delhi
        # Tamil: "Chennaiyil" (captures Chennai from suffix il) or "in Chennai"
        location_match = re.search(r'in\s+([a-zA-Z\s]+)|([\S\s]+?)[\s]*ல்|([\S\s]+?)\s*में|में\s+([\S\s]+)', q)
        
        location = "your area"
        if location_match:
            # Check which group matched and clean it
            if location_match.group(1): location = location_match.group(1).strip()
            elif location_match.group(2): location = location_match.group(2).strip()
            elif location_match.group(3): location = location_match.group(3).strip()
            elif location_match.group(4): location = location_match.group(4).strip()
        
        # Clean up if location captured "cold storage" itself due to greedy matching
        if any(x in location for x in ['cold', 'storage', 'கிடங்கு', 'कोल्ड']):
             location = "your area"

        
        if language == 'ta':
            return f"• {location} பகுதியில் நம்பகமான குளிர்சாதன சேமிப்பகங்களை (Cold Storage) கண்டறிய:\n• ஒழுங்குபடுத்தப்பட்ட மொத்த விற்பனை சந்தைகளை (Mandi) அணுகவும்.\n• உள்ளூர் விவசாய கூட்டுறவு சங்கங்களை தொடர்பு கொள்ளவும்.\n• அரசு வேளாண் இணையதளங்களில் (e-NAM) தேடவும்.\n• 'cold storage near {location}' என்று கூகுள் மேப்ஸில் தேடுவது துல்லியமான தகவலைத் தரும்."
        if language == 'hi':
            return f"• {location} में विश्वसनीय कोल्ड स्टोरेज (Cold Storage) खोजने के लिए:\n• विनियमित थोक बाजारों (मंडी) से पूछताछ करें।\n• स्थानीय किसान सहकारी समितियों से संपर्क करें।\n• सरकारी कृषि पोर्टलों (e-NAM) की जांच करें।\n• Google Maps पर 'cold storage near {location}' खोजें।"
        return f"• To find verified Cold Storage facilities in {location}:\n• Contact regulated wholesale markets (Mandis).\n• Consult local farmer cooperative societies.\n• Check official government portals (like e-NAM).\n• Searching 'cold storage near {location}' on Maps will provide real-time locations."

    if re.search(r'mango|மாம்பழம்|आम', q):
        if language == 'ta':
            return f"• {L[0]}: கோடைக்காலம்\n• {L[1]}: ஜனவரி-மார்ச் (பூக்கும் பருவம்)\n• {L[2]}: ஆழமான வண்டல் மண் அல்லது செம்மண்\n• {L[3]}: தொழு உரம் + அதிக பொட்டாஷ்\n• {L[4]}: பூக்கும் போது நீர் பாய்ச்சுவதைக் குறைக்கவும்\n• {L[5]}: பூக்கும் காலத்தில் பூச்சிக்கொல்லி தெளிப்பதைத் தவிர்க்கவும்."
        return f"• {L[0]}: Summer Season\n• {L[1]}: Jan-March (Flowering)\n• {L[2]}: Deep alluvial or red loamy soil\n• {L[3]}: Organic manure + High Potash\n• {L[4]}: Reduce irrigation during flowering\n• {L[5]}: Avoid chemical sprays during peak flowering to protect pollinators."

    if re.search(r'banana|வாழை|केला', q):
        if language == 'ta':
            return f"• {L[0]}: ஆண்டு முழுவதும் (பருவமழை சிறந்தது)\n• {L[1]}: ஜூன்-ஜூலை அல்லது அக்-நவ\n• {L[2]}: வளமான வண்டல் மண்\n• {L[3]}: தொழு உரம் + NPK (மாதந்தோறும்)\n• {L[4]}: அதிக நீர் தேவை (வாரம் இருமுறை)\n• {L[5]}: பலத்த காற்றிலிருந்து பாதுகாக்கவும். நீர் தேங்காமல் பார்த்துக் கொள்ளவும்."
        return f"• {L[0]}: Year-round (Monsoon preferred)\n• {L[1]}: June-July or Oct-Nov\n• {L[2]}: Rich well-drained loamy soil\n• {L[3]}: FYM + Monthly NPK doses\n• {L[4]}: High water requirement (twice weekly)\n• {L[5]}: Protect from strong winds. Ensure zero waterlogging."

    if re.search(r'coconut|tender coconut|இளநீர்|தென்னை|नारियल', q):
        if language == 'ta':
            return f"• {L[0]}: பருவமழை/கோடைக்கால இறுதி\n• {L[1]}: ஜூன்-ஜூலை அல்லது டிசம்பர்-ஜனவரி\n• {L[2]}: மணல் கலந்த வண்டல் மண்\n• {L[3]}: இயற்கை உரம் + பொட்டாஷ் கலந்த NPK\n• {L[4]}: வாய்க்கால் அல்லது சொட்டு நீர் பாசனம்\n• {L[5]}: தேக்கமடைந்த நீர் மற்றும் வறண்ட நிலத்தைத் தவிர்க்கவும்."
        if language == 'hi':
            return f"• {L[0]}: मानसून/देर से गर्मी\n• {L[1]}: जून-जुलाई या दिसंबर-जनवरी\n• {L[2]}: रेतीली दोमट / जलोढ़\n• {L[3]}: जैविक खाद + पोटाश युक्त NPK\n• {L[4]}: बेसिन या ड्रिप सिंचाई\n• {L[5]}: जलभराव और शुष्क स्थिर मिट्टी से बचें।"
        return f"• {L[0]}: Monsoon/Late Summer\n• {L[1]}: June-July or Dec-Jan\n• {L[2]}: Sandy loam / Alluvial\n• {L[3]}: Organic manure + potash rich NPK\n• {L[4]}: Basin or Drip irrigation\n• {L[5]}: Avoid waterlogging and dry stagnant soil."
    
    if re.search(r'okra|ladyfinger|வெண்டை|भिंडी', q):
        if language == 'ta':
            return f"• {L[0]}: கோடை / பருவமழை\n• {L[1]}: ஜூன்-ஜூலை, அக்-நவ, பிப்-மார்ச்\n• {L[2]}: வடிகால் வசதியுள்ள மணல் கலந்த வண்டல் மண்\n• {L[3]}: தொழு உரம் + NPK (வளர்ச்சி நிலைக்கேற்ப)\n• {L[4]}: சொட்டு நீர் பாசனம் சிறந்தது\n• {L[5]}: உறைபனி மற்றும் நீர் தேக்கத்திற்கு அதிக உணர்திறன் கொண்டது."
        if language == 'hi':
            return f"• {L[0]}: गर्मी / मानसून\n• {L[1]}: जून-जुलाई, अक्टूबर-नवंबर, फरवरी-मार्च\n• {L[2]}: अच्छी तरह से सूखी रेतीली दोमट\n• {L[3]}: गोबर की खाद + NPK (चरण-वार)\n• {L[4]}: ड्रिप सिंचाई पसंद की जाती है\n• {L[5]}: पाले और जलभराव के प्रति अत्यधिक संवेदनशीलता।"
        return f"• {L[0]}: Summer / Monsoon\n• {L[1]}: June-July, Oct-Nov, Feb-March\n• {L[2]}: Well-drained sandy loam\n• {L[3]}: Farmyard manure + NPK (stage-wise)\n• {L[4]}: Drip irrigation preferred\n• {L[5]}: High sensitivity to frost and waterlogging."

    if re.search(r'watermelon|தர்பூசணி|तरबूज', q):
        if language == 'ta':
            return f"• {L[0]}: கோடை காலம்\n• {L[1]}: ஜன-பிப் (வெப்பமண்டல), ஏப்-மே (மிதவெப்ப)\n• {L[2]}: வடிகால் வசதியுள்ள மணல் கலந்த நிலம்\n• {L[3]}: இயற்கை உரம் + சமச்சீர் NPK\n• {L[4]}: சொட்டு நீர் பாசனம் சிறந்தது\n• {L[5]}: பழம் பழுக்கும் போது அதிகப்படியான நீரைத் தவிர்க்கவும்."
        if language == 'hi':
            return f"• {L[0]}: गर्मी\n• {L[1]}: जन-फर (उष्णकटिबंधीय), अप्रैल-मई (समशीतोष्ण)\n• {L[2]}: रेतीली दोमट, अच्छी तरह से सूखी\n• {L[3]}: जैविक खाद + संतुलित NPK प्रारंभिक विकास पर\n• {L[4]}: ड्रिप सिंचाई पसंद की जाती है\n• {L[5]}: फलों के पकने के दौरान अत्यधिक पानी से बचें।"
        return f"• {L[0]}: Summer\n• {L[1]}: Jan-Feb (tropical), April-May (temperate)\n• {L[2]}: Sandy loam, well-drained\n• {L[3]}: Organic manure + balanced NPK at early growth\n• {L[4]}: Drip irrigation preferred\n• {L[5]}: Avoid excessive water during fruit ripening."

    if re.search(r'chilli|pepper|மிளகாய்|मिर्च', q):
        if language == 'ta':
            return f"• {L[0]}: பருவமழை / குளிர் காலம்\n• {L[1]}: ஜூன்-ஜூலை அல்லது அக்-நவ\n• {L[2]}: வடிகால் வசதியுள்ள கரிசல் அல்லது செம்மண்\n• {L[3]}: இயற்கை உரம் + நைட்ரஜன்/பொட்டாஷ்\n• {L[4]}: கட்டுப்படுத்தப்பட்ட சொட்டு நீர் அல்லது வாய்க்கால் பாசனம்\n• {L[5]}: அதிக நைட்ரஜன் உரம் பூப்பதைப் பாதிக்கும் என்பதால் தவிர்க்கவும்."
        if language == 'hi':
            return f"• {L[0]}: मानसून / सर्दी\n• {L[1]}: जून-जुलाई या अक्टूबर-नवंबर\n• {L[2]}: अच्छी तरह से सूखी काली या लाल दोमट\n• {L[3]}: जैविक खाद + नाइट्रोजन/पोटाश आधार\n• {L[4]}: नियंत्रित ड्रिप या फरो सिंचाई\n• {L[5]}: अत्यधिक नाइट्रोजन से बचें क्योंकि यह फूल आने को कम करता है।"
        return f"• {L[0]}: Monsoon / Winter\n• {L[1]}: June-July or Oct-Nov\n• {L[2]}: Well-drained black or red loam\n• {L[3]}: Organic manure + Nitrogen/Potash base\n• {L[4]}: Controlled drip or furrow irrigation\n• {L[5]}: Avoid excessive nitrogen as it reduces flowering."

    if re.search(r'aloe vera|சோற்றுக்கற்றாழை|एलोवेरा', q):
        if language == 'ta':
            return f"• {L[0]}: ஆண்டு முழுவதும்\n• {L[1]}: மிதமான நீர் வசதியுள்ள எந்த நேரமும்\n• {L[2]}: மணல் கலந்த, அதிக வடிகால் வசதியுள்ள மண்\n• {L[3]}: இயற்கை உரம் மட்டுமே சிறந்தது\n• {L[4]}: லேசான சொட்டு நீர் பாசனம், அதிக நீரைத் தவிர்க்கவும்\n• {L[5]}: நீர் தேக்கத்திற்கு மிக அதிக உணர்திறன் கொண்டது. அதிக சூரிய ஒளி தேவை."
        if language == 'hi':
            return f"• {L[0]}: साल भर (उष्णकटिबंधीय)\n• {L[1]}: मध्यम पानी के साथ किसी भी समय\n• {L[2]}: रेतीली, उच्च जल निकासी वाली मिट्टी\n• {L[3]}: केवल जैविक खाद\n• {L[4]}: हल्की ड्रिप सिंचाई, अधिक पानी देने से बचें\n• {L[5]}: जलभराव के प्रति अत्यधिक संवेदनशील। तेज़ धूप की ज़रूरत है।"
        return f"• {L[0]}: Year-round (Tropical)\n• {L[1]}: Any time with moderate water\n• {L[2]}: Sandy, high-drainage soil\n• {L[3]}: strictly Organic manure only\n• {L[4]}: Light drip, avoid over-watering\n• {L[5]}: Extremely sensitive to waterlogging. Needs high sun."

    if re.search(r'neem|வேப்பமரம்|नीम', q):
        if language == 'ta':
            return f"• {L[0]}: கோடைக்காலம்\n• {L[1]}: ஜூன்-ஜூலை (பருவமழை ஆரம்பம் சிறந்தது)\n• {L[2]}: அனைத்து மண் வகைகளிலும் வளரும், கரிசல் மண் சிறந்தது\n• {L[3]}: இயற்கை உரம் (ஆரம்ப நிலையில்)\n• {L[4]}: ஆரம்பத்தில் மட்டும் நீர் தேவை, பிறகு வறட்சியைத் தாங்கும்\n• {L[5]}: அதிகப்படியான நீர் தேங்குவதைத் தவிர்க்கவும்."
        return f"• {L[0]}: Summer / Tropical\n• {L[1]}: June-July (Best during early monsoon)\n• {L[2]}: Adaptable to all soils, black cotton soil is best\n• {L[3]}: Organic manure (initial stage only)\n• {L[4]}: Minimal once established, drought tolerant\n• {L[5]}: Avoid heavy waterlogging in early stages."

    if re.search(r'turmeric|மஞ்சள்|हल्दी', q):
        if language == 'ta':
            return f"• {L[0]}: பருவமழை முடியும் தருணம்\n• {L[1]}: மே-ஜூன் மாதம்\n• {L[2]}: வடிகால் வசதியுள்ள செம்மண் அல்லது வண்டல் மண்\n• {L[3]}: தொழு உரம் மற்றும் பரிந்துரைக்கப்பட்ட உரங்கள்\n• {L[4]}: மிதமான நீர் தேவை (10 நாட்கள் இடைவெளி)\n• {L[5]}: தண்ணீர் நிலத்தில் தேங்கினால் கிழங்கு அழுகும் அபாயம் உண்டு."
        return f"• {L[0]}: Late Monsoon\n• {L[1]}: May-June\n• {L[2]}: Well-drained sandy or clayey loam\n• {L[3]}: Farmyard manure + Recommended NPK (Consult officer for doses)\n• {L[4]}: Regular irrigation (10-day intervals)\n• {L[5]}: Extremely sensitive to waterlogging (rhizome rot risk)."

    if re.search(r'tulsi|துளசி|तुलसी', q):
        if language == 'ta':
            return f"• {L[0]}: ஆண்டு முழுவதும்\n• {L[1]}: ஜூன்-ஜூலை சிறந்தது\n• {L[2]}: மணல் கலந்த வண்டல் மண்\n• {L[3]}: இயற்கை உரம் மட்டுமே\n• {L[4]}: தினமும் மிதமான நீர்\n• {L[5]}: அதிகப்படியான ரசாயன உரங்களைத் தவிர்க்கவும்."
        return f"• {L[0]}: Year-round\n• {L[1]}: June-July is ideal for sowing\n• {L[2]}: Sandy loam with good drainage\n• {L[3]}: strictly Organic manure\n• {L[4]}: Moderate daily watering\n• {L[5]}: Avoid heavy chemical fertilizers for better aroma and potency."

    if re.search(r'medicinal|herbs|மருத்துவ தாவரங்கள்|மூலிகை|जड़ी-बूटी', q):
        if language == 'ta':
            return f"• {L[0]}: பயிரைப் பொறுத்து மாறுபடும்\n• {L[1]}: பருவமழை ஆரம்பம் சிறந்தது\n• {L[2]}: வடிகால் வசதியுள்ள வளமான மண்\n• {L[3]}: இயற்கை உரம் மட்டுமே சிறந்தது\n• {L[4]}: கட்டுப்படுத்தப்பட்ட சொட்டு நீர் பாசனம்\n• {L[5]}: நீங்கள் இப்போதுதான் தொடங்குகிறீர்கள் என்றால், முதலில் சிறிய அளவில் முயற்சிக்கவும்."
        return f"• {L[0]}: Varies by plant\n• {L[1]}: Early monsoon is generally best\n• {L[2]}: Well-drained, nutrient-rich soil\n• {L[3]}: strictly Organic manure preferred\n• {L[4]}: Controlled drip irrigation\n• {L[5]}: If you are a beginner, suggest starting with small-scale cultivation."

    if re.search(r'which crop|what to grow|when to plant|best season|plant|growing|crops|எந்த பயிர்|என்ன வளர்க்க|எப்போது|பருவ|நேரம்|காலம்|மாத|நடவு|சாகுபடி|பயிரிட|உகந்த|பருவத்தில்|பயிர்களை|कौन सी फसल|क्या उगाएं|कब लगाएं', q):
        # Month-aware smart logic
        if current_month == 1: # January
            if language == 'ta':
                recommendation = "தற்போது ஜனவரி மாதம். **தர்பூசணி (Watermelon)**, **கத்தரிக்காய்**, அல்லது **பயறு வகைகள்** நடவு செய்ய இது மிகச்சிறந்த காலம்."
            elif language == 'hi':
                recommendation = "अभी जनवरी है। **तरबूज**, **बैंगन**, या **दालें** लगाने का यह सबसे अच्छा समय है।"
            else:
                recommendation = "It is currently January. This is the best time to plant **Watermelon**, **Brinjal**, or **Pulses**."
        else:
            recommendation = ""

        # Structured general planting advice
        if language == 'ta':
            response = f"{recommendation}\n• {L[0]}: பயிரைப் பொறுத்து மாறுபடும்\n• {L[1]}: குறிப்பிட்ட பயிர் தேவைகளைச் சரிபார்க்கவும்\n• {L[2]}: பொதுவாக வடிகால் வசதியுள்ள வண்டல் மண்\n• {L[3]}: இயற்கை உரம் அடிப்படை\n• {L[4]}: சொட்டு நீர் அல்லது கட்டுப்படுத்தப்பட்ட நீர் வசதி\n• {L[5]}: விதைப்பதற்கு முன் எப்போதும் உள்ளூர் வானிலையைச் சரிபார்க்கவும்."
        elif language == 'hi':
            response = f"{recommendation}\n• {L[0]}: फसल के अनुसार बदलता रहता है\n• {L[1]}: विशिष्ट फसल आवश्यकताओं की जाँच करें\n• {L[2]}: आम तौर पर अच्छी जल निकासी वाली दोमट मिट्टी\n• {L[3]}: जैविक खाद आधार\n• {L[4]}: ड्रिप या नियंत्रित पानी देना\n• {L[5]}: बुवाई से पहले हमेशा स्थानीय मौसम की जाँच करें।"
        else:
            response = f"{recommendation}\n• {L[0]}: Varies by crop\n• {L[1]}: Check specific crop needs\n• {L[2]}: Generally well-drained loam\n• {L[3]}: Organic manure base\n• {L[4]}: Drip or controlled watering\n• {L[5]}: Always check local weather before sowing."
        
        if is_beginner:
            return lang_data['beginner'] + "\n" + response
        return response

    # 💰 PROFIT / INCOME / MARKET
    if any(word in q for word in ["profit", "income", "money", "earn", "market", "இலாபம்", "வருமானம்", "பணம்", "சந்தை", "சம்பாதிக்க", "लाभ", "कमाई"]):
        return lang_data.get('profit', lang_data['default'])

    # 📅 WEEKLY PLANNING
    if any(word in q for word in ['week', 'plan', 'வாரம்', 'திட்டம்', 'हफ्ता', 'योजना']):
        return lang_data['weekly']
        
    # 🚜 HARVEST / SELL TIMING (What-If Structure)
    # Updated Hindi regex to match 'bechna', 'bechni', 'bech'
    if any(word in q for word in ['harvest', 'sell', 'அறுவடை', 'விற்க', 'कटाई', 'बेच']):
        if language == 'ta':
            return """**சந்தையை பகுப்பாய்வு செய்தல்:**

**நீங்கள் இப்போது முடிவு எடுத்தால்:**
தற்போது உங்களுக்கு உடனடி பணம் கிடைக்கும், ஆனால் சந்தை விலை இன்னும் உயர வாய்ப்பு இருப்பதால் இலாபம் குறைவாக இருக்கலாம்.

**நீங்கள் சிறிது காலம் காத்திருந்தால்:**
பயிர் முழுமையாக முதிர்ச்சியடைந்து தரமான விளைச்சல் கிடைக்கும். வரும் வாரங்களில் சந்தை விலை அதிகரிக்க வாய்ப்புள்ளது, இது அதிக இலாபத்தைத் தரும்."""
        if language == 'hi':
            return """**बाजार विश्लेषण:**

**यदि आप अभी निर्णय लेते हैं:**
आपको तुरंत नकद मिल जाएगा, लेकिन लाभ कम हो सकता है क्योंकि बाजार की कीमतों में और वृद्धि होने की संभावना है।

**यदि आप कुछ समय प्रतीक्षा करते हैं:**
फसल पूरी तरह से पक जाएगी और बेहतर गुणवत्ता मिलेगी। आने वाले हफ्तों में कीमतें बढ़ने की उम्मीद है, जिससे अधिक लाभ होगा।"""
        return """**Analyzing Market Conditions:**

**If you act now:**
You will get immediate cash flow, but the profit might be lower as market prices are expected to rise further.

**If you wait a little:**
The crop will reach full maturity and better quality. Prices are likely to increase in the coming weeks, leading to much higher profits."""
        
    # ⛈️ WEATHER-AWARE
    if topic == 'weather' or any(word in q for word in ['rain', 'மழை', 'बारिश', 'வானிலை', 'weather', 'मौसम']):
        return lang_data['rain']
        
    # 🏗️ GENERAL FALLBACK
    if is_beginner:
        return lang_data['beginner']
        
def get_ai_farmer_advice(topic, question, language='en', emotional_state='calm', mode='text', location=None):
    """
    Generates advice for the AI Farmer Assistant.
    Uses FarmerDecisionEngine for high-fidelity local logic synced with global institutions.
    """
    engine = FarmerDecisionEngine()
    result = engine.decide(topic, question, location)
    
    explanation = ReasonBuilder.build_explanation(result, language)
    
    # Final Structured Response for Frontend
    return {
        "answer": explanation['answer'],
        "reasoning": explanation['reasoning'],
        "guidance": explanation['guidance'],
        "safety_warning": explanation['safety_warning'],
        "closing": explanation.get('closing', ''),
        "confidence_score": f"{result.get('score', 98)}%",
        "topic": topic,
        "metadata": {
            "engine": "Digital Twin V9.2",
            "datasets": ["FAOSTAT", "Data.gov.in", "BUMI", "PlantVillage", "USDA"]
        }
    }

def analyze_emotion(text, language='en'):
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = f"Analyze the emotional state: {text} in {language}. Respond in JSON."
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        return json.loads(response.choices[0].message.content)
    except:
        return {"emotion": "Calm", "stress_level": "Low"}

def analyze_voice_emotion(text, voice_features, language='en'):
    """
    Simulation of institutional voice stress analysis for agricultural environments.
    """
    # Simple logic based on pitch and rate variability
    pitch = voice_features.get('pitch_variability', 0.5)
    rate = voice_features.get('speech_rate', 1.0)
    
    emotion = "neutral"
    if pitch > 0.8 or rate < 0.7:
        emotion = "stress"
    elif pitch < 0.3:
        emotion = "sad"
        
    responses = EMOTION_RESPONSE.get(language, EMOTION_RESPONSE['en']).get(emotion, EMOTION_RESPONSE['en']['neutral'])
    
    return {
        "emotion": emotion.capitalize(),
        "confidence": 0.88,
        "recommendation": responses['do'],
        "advice_to_avoid": responses['avoid'],
        "voice_clarity": "High"
    }

def get_decision_consequences(decision, context, language='en', stress_level='Low'):
    """
    Generates institutional projections for farmer decisions.
    """
    # This would ideally be a call to a forecasting model or LLM
    # Here we provide structured institutional guidance
    
    projections = {
        "en": [
            "Immediate resource allocation will be required for this action.",
            "Potential shift in the 14-day harvesting window.",
            "Soil biological activity should be closely monitored post-execution."
        ],
        "ta": [
            "இந்தச் செயலுக்கு உடனடி ஆதார ஒதுக்கீடு தேவைப்படும்.",
            "14 நாள் அறுவடை கால அட்டவணையில் மாற்றம் ஏற்பட வாய்ப்புள்ளது.",
            "செயல்படுத்திய பிறகு மண்ணின் உயிரியல் செயல்பாட்டை உன்னிப்பாகக் கவனிக்க வேண்டும்."
        ]
    }
    
    return {
        "decision": decision,
        "consequences": projections.get(language, projections['en']),
        "risk_assessment": "Moderate" if stress_level != 'Low' else "Low",
        "institutional_guidance": "Proceed with decentralized verification."
    }

def detect_emotion(text):
    q = text.lower()
    if any(word in q for word in ['happy', 'good', 'confident', 'profit', 'மகிழ்ச்சி', 'खुश', 'సంతోషం', 'ಲಾಭ', 'സന്തോഷം', 'خوش', '嬉']): return "happy"
    if any(word in q for word in ['stress', 'worried', 'fear', 'panic', 'கவலை', 'चिंता', '心配', 'ఆందోళన', 'ಒತ್ತಡ', 'പേടി', 'پریشان']): return "stress"
    if any(word in q for word in ['angry', 'frustrated', 'கோபம்', 'गुस्सा', '怒り', 'కోపం', 'ಸಿಟ್ಟು', 'ദേഷ്യം', 'غصہ']): return "angry"
    if any(word in q for word in ['sad', 'tired', 'loss', 'துக்கம்', 'उदासी', '悲しい', 'బాధ', 'ಬೇಸರ', 'വിഷമം', 'اداس']): return "sad"
    return "neutral"

def store_emotion(emotion):
    global emotion_history
    emotion_history.append({"emotion": emotion, "date": datetime.now().isoformat()})
    if len(emotion_history) > 30: emotion_history.pop(0)

def analyze_emotion_trend():
    if not emotion_history: return "trend_neutral"
    recent = [e['emotion'] for e in emotion_history[-5:]]
    if recent.count("sad") + recent.count("stress") + recent.count("angry") >= 3: return "trend_low"
    if recent.count("happy") >= 3: return "trend_positive"
    return "trend_neutral"

def calculate_confidence(emotion):
    return {"happy": 80, "neutral": 60, "stress": 40, "sad": 30, "angry": 25}.get(emotion, 50)

def rest_day_check(emotion, trend):
    return emotion in ["sad", "angry"] or trend == "trend_low"

def get_digital_twin_emotion_advice(question, language='en'):
    emotion = detect_emotion(question)
    store_emotion(emotion)
    trend = analyze_emotion_trend()
    confidence = calculate_confidence(emotion)
    lang_code = language if language in EMOTION_RESPONSE else 'en'
    
    # ADVANCED BRIDGE: Check if this is an agricultural question
    engine = FarmerDecisionEngine()
    
    # Try to find the best topic
    detected_topic = 'crops' # Default to crops for wider scanning if general fails
    for t in ['crops', 'irrigation', 'pests', 'soil', 'weather', 'market', 'equipment', 'general']:
        if engine.validate_topic(topic=t, question=question) == True:
            detected_topic = t
            break
            
    intent_detected = engine.detect_intent(topic=detected_topic, question=question)
    context = engine.build_context(question=question, selected_topic=detected_topic)
    
    if context.get('crop') != 'general' or (intent_detected and intent_detected != 'general_inquiry'):
        # Get expert advice locally
        result = engine.decide(topic=detected_topic, question=question)
        if result.get('score', 0) >= 85:
            explanation = ReasonBuilder.build_explanation(result)
            return {
                "answer": f"I am sensing your inquiry about {context.get('crop', 'farming')}. Here is what our core intelligence recommends:\n\n{explanation['answer']}",
                "reasoning": explanation['reasoning'],
                "guidance": explanation['guidance'],
                "safety_warning": explanation['safety_warning'],
                "closing": f"I am here to help you stay calm while you process this guidance. {explanation.get('closing', '')}",
                "emotion": emotion,
                "confidence": result['score'],
                "trend": trend,
                "metadata": {
                    "engine": "Digital Twin V9.2",
                    "datasets": ["FAOSTAT", "Data.gov.in", "BUMI", "PlantVillage", "USDA"]
                }
            }

    # Fallback response if no expert logic found
    res = EMOTION_RESPONSE.get(lang_code, EMOTION_RESPONSE['en']).get(emotion)
    return {
        "answer": res['feel'] + "\n\nDo: " + res['do'] + "\nAvoid: " + res['avoid'],
        "reasoning": f"Emotional state analysis: {emotion}",
        "guidance": [res['do']],
        "safety_warning": "Maintaining emotional stability is critical for field operations.",
        "closing": "Your Digital Twin is monitoring your well-being.",
        "emotion": emotion,
        "confidence": confidence,
        "trend": trend,
        "metadata": {
             "engine": "Digital Twin V9.2",
             "datasets": ["FAOSTAT", "Data.gov.in", "BUMI", "PlantVillage", "USDA"]
        }
    }

def get_rule_based_decision(topic, crop=None, question=None):
    """
    Returns a deterministic response key based on the topic and input.
    Language-agnostic.
    """
    topic_key = topic.lower().replace(" ", "_").strip()
    q = question.lower() if question else ""
    
    # --- 8-MODULE KEYWORD DEFINITIONS ---
    module_keywords = {
        "general": ['farm', 'farming', 'agriculture', 'rotation', 'chemical', 'practice', 'tip', 'advice', 'general', 'organic', 'commercial', 'dos', 'donts', 'விவசாயம்', 'kheti', 'खेती', 'किसानी'],
        "crop_management": ['sow', 'sowing', 'plant', 'planting', 'spacing', 'depth', 'harvest', 'harvesting', 'maturity', 'picking', 'yield', 'rabi', 'kharif', 'zaid', 'intercropping', 'improvement', 'நடவு', 'விதைப்பு', 'அறுவடை', 'बुवाई', 'रोपण', 'कटाई', 'उपज'],
        "soil": ['soil', 'dirt', 'mud', 'ph', 'fertility', 'nutrient', 'deficiency', 'organic', 'compost', 'manure', 'testing', 'nitrogen', 'phosphorus', 'potassium', 'npk', 'மண்', 'வளம்', 'मिट्टी', 'उर्वरता', 'खाद'],
        "weather": ['weather', 'rain', 'temperature', 'monsoon', 'storm', 'climate', 'wind', 'frost', 'drought', 'heatwave', 'risk', 'வானிலை', 'மழை', 'मौसम', 'बारिश'],
        "market": ['price', 'prices', 'market', 'cost', 'costs', 'sell', 'rate', 'rates', 'money', 'profit', 'mandi', 'timing', 'seasonality', 'storage', 'விலை', 'சந்தை', 'बाजार', 'भाव'],
        "pests": ['pest', 'insect', 'bug', 'worm', 'attack', 'disease', 'spray', 'neem', 'fungus', 'symptoms', 'identification', 'chemical', 'pesticide', 'fungicide', 'பூச்சி', 'நோய்', 'कीट', 'बीमारी'],
        "irrigation": ['water', 'irrigate', 'irrigation', 'drip', 'sprinkler', 'pipe', 'pump', 'moisture', 'wet', 'dry', 'scheduling', 'frequency', 'நீர்', 'பாசனம்', 'पानी', 'सिंचाई'],
        "equipment": ['tool', 'machine', 'machinery', 'tractor', 'plough', 'leveler', 'pump', 'mechanized', 'manual', 'selection', 'கருவி', 'இயந்திரம்', 'औजार', 'मशीन', 'ट्रैक्टर']
    }
    
    # 🌟 00. GREETINGS (SUPER HIGH PRIORITY - ALLOWED ANYWHERE)
    greeting_latin = ['hai', 'hi', 'hello', 'hey']
    greeting_non_latin = ['வணக்கம்', 'नमस्ते', 'हेलो']
    is_greeting = any(re.search(rf'\b{re.escape(w)}\b', q) for w in greeting_latin) or \
                  any(w in q for w in greeting_non_latin)
    if is_greeting:
        return {"topic": "general", "response_key": "GREETING_RESPONSE", "confidence": 0.99}

    # 🌟 01. NAME (HIGH PRIORITY)
    if any(re.search(rf'\b{re.escape(w)}\b', q) for w in ['name', 'who are you']) or \
       any(w in q for w in ['உன் பெயர்', 'உங்கள் பெயர்', 'யார் நீ', 'आपका नाम', 'तुम कौन हो']):
        return {"topic": "general", "response_key": "NAME_RESPONSE", "confidence": 0.99}

    # 🌟 02. STRICT TOPIC ENFORCEMENT & REDIRECTION
    # If the user is in one topic but asks about another, redirect them.
    detected_topic = None
    
    # Check for strongest keyword match
    for mod, keywords in module_keywords.items():
        if any(re.search(rf'\b{re.escape(w)}\b', q) for w in keywords):
            detected_topic = mod
            break
            
    # Normalize selected topic for comparison
    active_topic = "crop_management" if topic_key in ["crops", "crop_management"] else topic_key
    
    # If a question belongs to a DIFFERENT module, refuse and redirect
    if detected_topic and detected_topic != active_topic:
        # Special case: Greetings and Name are handled above and allowed everywhere.
        # Otherwise, redirect to the detected module.
        return {
            "topic": active_topic,
            "response_key": f"REFUSAL_{detected_topic.upper()}",
            "confidence": 0.99
        }

    # 🌟 08. EQUIPMENT INTELLIGENCE
    if active_topic == "equipment":
        if any(w in q for w in ['select', 'choose', 'buy', 'வாங்க', 'தேர்வு', 'खरीदें', 'चुनाव']):
            return {"topic": "equipment", "response_key": "EQUIPMENT_SELECTION_GUIDE", "confidence": 0.98}
        if any(w in q for w in ['manual', 'hand', 'mechanized', 'கை', 'இயந்திர', 'हाथ', 'मशीनी']):
            return {"topic": "equipment", "response_key": "EQUIPMENT_TECH_GUIDE", "confidence": 0.98}
        return {"topic": "equipment", "response_key": "EQUIPMENT_GUIDE_GENERAL", "confidence": 0.98}

    # 🌟 03. CROP MANAGEMENT SUB-STAGES
    if active_topic == "crop_management":
        # Intercropping
        if any(w in q for w in ['intercrop', 'intercropping', 'mix', 'ஊடுபயிர்', 'मिश्रित']):
            return {"topic": "crops", "response_key": "CROP_INTERCROP_GUIDE", "confidence": 0.98}
        # Yield Improvement
        if any(w in q for w in ['yield', 'increase', 'improve', 'உயர்த்த', 'அதிகரிக்க', 'उपज', 'बढ़ाएं']):
            return {"topic": "crops", "response_key": "CROP_YIELD_GUIDE", "confidence": 0.98}
        # Sowing
        if any(re.search(rf'\b{re.escape(w)}\b', q) for w in ['sow', 'sowing', 'plant', 'planting', 'spacing', 'depth', 'நடவு', 'விதைப்பு', 'बुवाई', 'रोपण']):
            return {"topic": "crops", "response_key": "CROP_SOWING_GUIDE", "confidence": 0.98}
        # Harvesting
        if any(re.search(rf'\b{re.escape(w)}\b', q) for w in ['harvest', 'harvesting', 'maturity', 'picking', 'அறுவடை', 'कटाई', 'तैयार']):
            return {"topic": "crops", "response_key": "CROP_HARVEST_GUIDE", "confidence": 0.98}
        # Maintenance
        if any(re.search(rf'\b{re.escape(w)}\b', q) for w in ['weed', 'weeding', 'weeds', 'thinning', 'pruning', 'maintenance', 'கலை', 'பராமரிப்பு', 'निराई', 'छंटाई', 'रखरखाव']):
            return {"topic": "crops", "response_key": "CROP_MAINTENANCE_GUIDE", "confidence": 0.98}
        return {"topic": "crops", "response_key": "CROP_MANAGEMENT_STAGE_GENERIC", "confidence": 0.9}

    # 🌟 05. MARKET & PRICES (Granular Logic within Topic)
    if active_topic == "market":
        if any(w in q for w in ['sell', 'profit', 'timing', 'மிற்க', 'லாபம்', 'बेचना', 'मुनाफा']):
            return {"topic": "market", "response_key": "MARKET_PROFIT_GUIDE", "confidence": 0.98}
        if any(w in q for w in ['storage', 'warehouse', 'mandi', 'சேமிப்பு', 'கிடங்கு', 'भंडारण', 'गोदाम']):
            return {"topic": "market", "response_key": "MARKET_STORAGE_GUIDE", "confidence": 0.98}
        return {"topic": "market", "response_key": "MARKET_AWARENESS_GENERIC", "confidence": 0.98}

    # 🌟 1. SPECIFIC CROP GUIDES (Multilingual - Word Boundary Protected)
    crop_intents = {
        "RICE_GUIDE": ['rice', 'paddy', 'धान', 'चावल', 'அரிசி', 'நெல்'],
        "WHEAT_GUIDE": ['wheat', 'गेहूं', 'कनक', 'கோதுமை'],
        "MAIZE_GUIDE": ['maize', 'corn', 'मक्का', 'சோளம்', 'மக்காச்சோளம்'],
        "SORGHUM_GUIDE": ['sorghum', 'jowar', 'ज्वार', 'சோளம்'],
        "BAJRA_GUIDE": ['bajra', 'pearl millet', 'बाजरा', 'கம்பு'],
        "RAGI_GUIDE": ['ragi', 'finger millet', 'रागी', 'மந்தூவா', 'கேழ்வரகு', 'ராகி'],
        "BARLEY_GUIDE": ['barley', 'जौ', 'பார்லி'],
        "OATS_GUIDE": ['oats', 'जई', 'ஓட்ஸ்'],
        "RYE_GUIDE": ['rye', 'राई', 'ராய்'],
        "SUGARCANE_GUIDE": ['sugarcane', 'sugar cane', 'गன்னா', 'கரும்பு'],
        "POTATO_GUIDE": ['potato', 'आलू', 'உருளைக்கிழங்கு'],
        "TOMATO_GUIDE": ['tomato', 'टमाटर', 'தக்காளி'],
        "ONION_GUIDE": ['onion', 'प्याज', 'வெங்காயம்'],
        "GARLIC_GUIDE": ['garlic', 'लहसुन', 'பூண்டு'],
        "CHILLI_GUIDE": ['chilli', 'chili', 'pepper', 'मिर्च', 'மிளகாய்'],
        "CABBAGE_GUIDE": ['cabbage', 'पत्तागोभी', 'முட்டைக்கோஸ்'],
        "CAULIFLOWER_GUIDE": ['cauliflower', 'फूलगोभी', 'காலிபிளவர்'],
        "SPINACH_GUIDE": ['spinach', 'पालक', 'பசலைக்கீரை'],
        "BANANA_GUIDE": ['banana', 'केला', 'வாழை'],
        "MANGO_GUIDE": ['mango', 'आम', 'மாம்பழம்', 'மாங்காய்'],
        "APPLE_GUIDE": ['apple', 'सेब', 'ஆப்பிள்'],
        "GROUNDNUT_GUIDE": ['groundnut', 'peanut', 'मूंगफली', 'நிலக்கடலை', 'வேர்க்கடலை'],
        "CASHEW_GUIDE": ['cashew', 'काजू', 'முந்திரி'],
        "COCONUT_GUIDE": ['coconut', 'नारियल', 'தேங்காய்', 'தென்னை'],
        "WALNUT_GUIDE": ['walnut', 'अखरोट', 'வால்நட்'],
        "ALMOND_GUIDE": ['almond', 'बादाम', 'பாதாம்'],
        "BERMUDA_GRASS_GUIDE": ['bermuda grass', 'दूब', 'அருகம்புல்'],
        "NAPIER_GRASS_GUIDE": ['napier grass', 'elephant grass', 'नेपियर', 'நேப்பியர்'],
        "LEMONGRASS_GUIDE": ['lemongrass', 'लेमनग्रास', 'எலுமிச்சை புல்']
    }

    for response_key, keywords in crop_intents.items():
        if any(re.search(rf'\b{re.escape(w)}\b', q) for w in keywords):
            return {
                "topic": "crops",
                "response_key": response_key,
                "confidence": 0.98
            }
    
    # 🌟 0a. TEMPORAL & MONTHLY PLANNING (High Priority)
    months_en = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
    months_hi = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']
    months_ta = ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்']
    
    current_month_index = datetime.now().month - 1
    detected_month_index = -1

    # Check for "this month" or "current month" or "now"
    if any(w in q for w in ['this month', 'current month', 'now', 'இப்போ', 'இந்த மாதம்', 'इस महीने', 'अभी']):
        detected_month_index = current_month_index
    else:
        # Check for specific month names
        for i, m in enumerate(months_en):
            if m in q: detected_month_index = i; break
        if detected_month_index == -1:
            for i, m in enumerate(months_hi):
                if m in q: detected_month_index = i; break
        if detected_month_index == -1:
            for i, m in enumerate(months_ta):
                if m in q: detected_month_index = i; break

    if detected_month_index != -1 and any(w in q for w in ['plant', 'grow', 'sow', 'crop', 'نبات', 'விவசாயம்', 'நடவு', 'खेती', 'लगाएं']):
        month_key = months_en[detected_month_index].upper()
        return {
            "topic": "crops",
            "response_key": f"MONTHLY_PLANTING_GUIDE_{month_key}",
            "confidence": 0.99
        }

    # 🌟 0b. Soil Granular
    if active_topic == "soil":
        if any(w in q for w in ['ph', 'test', 'acid', 'alkaline', 'பரிசோதனை', 'अम्लीय']):
            return {"topic": "soil", "response_key": "SOIL_TEST_PH_GUIDE", "confidence": 0.98}
        if any(w in q for w in ['nutrient', 'deficiency', 'npk', 'சத்து', 'குறைபாடு', 'पोषक तत्व', 'कमी']):
            return {"topic": "soil", "response_key": "SOIL_NUTRIENT_GUIDE", "confidence": 0.98}
        return {"topic": "soil", "response_key": "SOIL_HEALTH_GENERAL", "confidence": 0.98}

    # 2. Weather Granular
    if active_topic == "weather":
        if any(w in q for w in ['frost', 'drought', 'heatwave', 'பனி', 'வறட்சி', 'வெப்பம்', 'पाला', 'सूखा', 'लू']):
            return {"topic": "weather", "response_key": "WEATHER_RISK_GUIDE", "confidence": 0.98}
        return {"topic": "weather", "response_key": "WEATHER_IMPACT_GENERAL", "confidence": 0.98}

    # Remove redundant Market block if already handled above
        
    # 4. Pests & Insects Granular
    if active_topic == "pests":
        if any(w in q for w in ['symptom', 'sign', 'identify', 'அறிகுறி', 'அடையாளம்', 'लक्षण', 'पहचान']):
            return {"topic": "pests", "response_key": "PEST_SYMPTOMS_GUIDE", "confidence": 0.98}
        if any(w in q for w in ['chemical', 'spray', 'pesticide', 'மருந்து', 'தெளிப்பு', 'रसायन', 'कीटनाशक']):
            return {"topic": "pests", "response_key": "PEST_CHEMICAL_GUIDE", "confidence": 0.98}
        return {"topic": "pests", "response_key": "PEST_CONTROL_SAFE", "confidence": 0.98}


    # 5a. Irrigation Granular Logic
    if active_topic == "irrigation":
        if any(w in q for w in ['schedule', 'timing', 'frequency', 'நேரம்', 'அதிர்வெண்', 'समय', 'तालिका']):
            return {"topic": "irrigation", "response_key": "IRRIGATION_SCHEDULE_GUIDE", "confidence": 0.98}
        if any(w in q for w in ['drip', 'sprinkler', 'சொட்டு', 'தெளிப்பான்', 'ड्रिप', 'छिड़काव']):
            return {"topic": "irrigation", "response_key": "IRRIGATION_TECH_GUIDE", "confidence": 0.98}
    
    # 5b. Irrigation & Water (General)
    if any(w in q for w in ['water', 'irrigate', 'irrigation', 'drip', 'sprinkler', 'pipe', 'pump', 'moisture', 'wet', 'dry', 'நீர்', 'பாசனம்', 'पानी', 'सिंचाई']):
        return {
            "topic": "irrigation",
            "response_key": "IRRIGATION_GENERAL",
            "confidence": 0.98
        }
        
    # 6. Seed Selection (Specific - must come BEFORE general crop management)
    # English + Tamil + Hindi keywords
    seed_keywords = ['seed', 'விதை', 'விதைகள்', 'बीज']
    selection_keywords = [
        'choose', 'quality', 'select', 'good', 'best', 'certified', 'buy', 'purchase',
        'தேர்வு', 'தரம்', 'நல்ல', 'சான்றளிக்கப்பட்ட', 'வாங்க',
        'चुनें', 'गुणवत्ता', 'अच्छे', 'प्रमाणित', 'खरीदें'
    ]
    
    if any(sw in q for sw in seed_keywords) and any(sk in q for sk in selection_keywords):
        return {
            "topic": "general",
            "response_key": "SEED_SELECTION_GUIDE",
            "confidence": 0.97
        }
    
    # 6a. Land Preparation Guide
    if any(w in q for w in ['land', 'prepare', 'preparation', 'plough', 'plow', 'till', 'level', 'நிலம்', 'தயாரிப்பு', 'உழவு', 'भूमि', 'तैयारी', 'जुताई']):
        return {
            "topic": "general",
            "response_key": "LAND_PREPARATION_GUIDE",
            "confidence": 0.96
        }
    
    # 6b. Crop Rotation Guide
    if any(w in q for w in ['rotation', 'rotate', 'cycle', 'மாற்றம்', 'சுழற்சி', 'चक्र', 'बदलना']):
        return {
            "topic": "general",
            "response_key": "CROP_ROTATION_GUIDE",
            "confidence": 0.96
        }
    
    
    # 6c. Soil Care Guide (water management moved up before irrigation)
    if any(w in q for w in ['soil care', 'fertility', 'maintain', 'பராமரி', 'வளம்', 'उर्वरता', 'बनाए']):
        return {
            "topic": "general",
            "response_key": "SOIL_CARE_GUIDE",
            "confidence": 0.96
        }
    
    # 6f. General Farming Enhancement
    if active_topic == "general":
        if any(w in q for w in ['organic', 'natural', 'இயற்கை', 'जैविक']):
            return {"topic": "general", "response_key": "GENERAL_ORGANIC_GUIDE", "confidence": 0.96}
        if any(w in q for w in ['dos', 'donts', 'rules', 'விதிகள்', 'नियम']):
            return {"topic": "general", "response_key": "GENERAL_RULES_GUIDE", "confidence": 0.96}
        return {"topic": "general", "response_key": "GENERAL_FARMING_BASE", "confidence": 0.9}
    
    # 6f. Sustainable Farming Guide
    if any(w in q for w in ['sustainable', 'sustain', 'நிலைத்த', 'सतत', 'टिकाऊ']):
        return {
            "topic": "general",
            "response_key": "SUSTAINABLE_FARMING_GUIDE",
            "confidence": 0.96
        }
    
    # 6g. Climate Awareness Guide
    if any(w in q for w in ['climate', 'affect', 'காலநிலை', 'பாதி', 'जलवायु', 'प्रभावित']):
        return {
            "topic": "general",
            "response_key": "CLIMATE_AWARENESS_GUIDE",
            "confidence": 0.96
        }
    
    # 6h. Input Cost Management Guide
    if any(w in q for w in ['input', 'cost', 'reduce', 'செலவு', 'குறை', 'लागत', 'कम']):
        return {
            "topic": "general",
            "response_key": "INPUT_COST_MANAGEMENT_GUIDE",
            "confidence": 0.96
        }
    
    
    # --- FALLBACK TO SELECTED TOPIC (If question is ambiguous) ---
    # 2. Topic: Crop Management
    if topic_key == "crop_management" or topic_key == "crops":
        return {"topic": topic, "response_key": "CROP_MANAGEMENT_STAGE_GENERIC", "confidence": 0.92}

    # 1. Topic: General Farming
    if topic_key == "general" or topic_key == "general_farming":
        return {"topic": topic, "response_key": "GENERAL_FARMING_BASE", "confidence": 0.95}

    # 8. General Farming (Explicit)
    if any(re.search(rf'\b{re.escape(w)}\b', q) for w in general_farming_keywords):
        return {"topic": "general", "response_key": "GENERAL_FARMING_BASE", "confidence": 0.95}

    # 7. Crop Management (Generic) - Deprecated as moved up

    # 3. Topic: Soil Health
    if topic_key == "soil_health" or topic_key == "soil":
        return {
            "topic": topic,
            "response_key": "SOIL_HEALTH_GENERAL",
            "confidence": 0.90
        }

    # 4. Topic: Weather Impact
    if topic_key == "weather" or topic_key == "weather_impact":
        return {
            "topic": topic,
            "response_key": "WEATHER_IMPACT_GENERAL",
            "confidence": 0.88
        }

    # 5. Topic: Market Prices
    # Updated to use Regex Word Boundary for all remaining blocks
    if topic_key == "market_prices" or topic_key == "market":
        return {
            "topic": topic,
            "response_key": "MARKET_AWARENESS_GENERIC",
            "confidence": 0.85
        }
        
    # 6. Topic: Pest Control
    if topic_key == "pest_control" or topic_key == "pests":
        return {
            "topic": topic,
            "response_key": "PEST_CONTROL_SAFE",
            "confidence": 0.96
        }

    # 7. Topic: Irrigation
    if topic_key == "irrigation":
        return {
            "topic": topic,
            "response_key": "IRRIGATION_GENERAL",
            "confidence": 0.94
        }

    # Default Fallback
    return {
        "topic": topic,
        "response_key": "DEFAULT_ERROR",
        "confidence": 0.50
    }

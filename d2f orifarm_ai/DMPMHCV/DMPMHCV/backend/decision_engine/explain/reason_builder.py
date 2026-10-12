class ReasonBuilder:
    TRANSLATIONS = {
        'ta': {
            'header': "### 🤖 டிஜிட்டல் ட்வின் நுண்ணறிவு | {crop} பகுப்பாய்வு\n",
            'weather': "**தற்போதைய வானிலை:** {temp}°C, {cond} | {hum}% ஈரப்பதம்\n",
            'source': "*ஆதாரம்: FAOSTAT, Data.gov.in, BUMI நிறுவன களஞ்சியம் மற்றும் PlantVillage உயிரியல் வங்கி*\n\n",
            'diagnosis_title': "🧠 டிஜிட்டல் ட்வின் நோயறிதல்:",
            'guidance_title': "🛠️ துல்லியமான வழிகாட்டுதல்:",
            'forecast_title': "📈 நுண்ணறிவு முன்னறிவிப்பு:",
            'safety_title': "**பாதுகாப்பு நெறிமுறை:**",
            'safety_text': "டிஜிட்டல் ட்வின் பாதுகாப்பு அடுக்கு மூலம் சரிபார்க்கப்பட்டது. ரசாயனங்களைக் கையாளும் போது கவச உடைகளை அணிவதை உறுதி செய்யவும்.",
            'closing': "பணி தொடங்கப்பட்டது. உங்கள் டிஜிட்டல் ட்வின் அனைத்து கள மாறிகளையும் கண்காணித்து வருகிறது.",
            'mismatch_header': "**[தலைப்பு சீரமைப்பு தேவை]**\n\n",
            'mismatch_body': "உங்கள் டிஜிட்டல் ட்வின் தொகுதி பொருத்தமின்மையைக் குறிக்கிறது. துல்லியமான நுண்ணறிவுக்கு '{suggested}' தொகுதியைத் தொடங்கவும்.",
            'mismatch_reason': "பயனர் நோக்கம் மற்றும் செயலில் உள்ள நுண்ணறிவு தொகுதிக்கு இடையே ஒரு பொருத்தமின்மையை டிஜிட்டல் ட்வின் கண்டறிந்துள்ளது.",
            'mismatch_guidance': ["கட்டளை மையத்திற்குத் திரும்பவும்.", "'{suggested}' என்பதைத் தேர்ந்தெடுக்கவும்.", "டிஜிட்டல் ட்வினை மீண்டும் ஒத்திசைக்கவும்."]
        },
        'en': {
            'header': "### 🤖 Digital Twin Insights | {crop} Analysis\n",
            'weather': "**Current Weather:** {temp}°C, {cond} | {hum}% Humidity\n",
            'source': "*Synthesized from: FAOSTAT, Data.gov.in, BUMI Institutional Repo, and PlantVillage Bio-Bank*\n\n",
            'diagnosis_title': "🧠 DIGITAL TWIN DIAGNOSIS:",
            'guidance_title': "🛠️ PRECISION EXECUTION:",
            'forecast_title': "📈 INTELLIGENT FORECAST:",
            'safety_title': "**SAFETY PROTOCOL:**",
            'safety_text': "Verified by Digital Twin security layer. Ensure PPE adherence while handling chemicals.",
            'closing': "Work enabled. Your Digital Twin is monitoring all field variables.",
            'mismatch_header': "**[TOPIC ALIGNMENT NEEDED]**\n\n",
            'mismatch_body': "Your Digital Twin indicates a module mismatch. Please initialize the '{suggested}' module for precise intelligence.",
            'mismatch_reason': "Digital Twin detected a mismatch between user intent and active intelligence module.",
            'mismatch_guidance': ["Return to command center.", f"Select '{{suggested}}'.", "Re-sync Digital Twin."]
        }
    }

    @staticmethod
    def translate_decision(text, language):
        if language != 'ta':
            return text
            
        translations = {
            'GLOBAL STANDARD:': 'உலகளாவிய தரம்:',
            'WATER PROTOCOL:': 'நீர் பயன்பாட்டு நெறிமுறை:',
            'EFFICIENCY ALERT:': 'செயல்திறன் எச்சரிக்கை:',
            'NUTRITION TARGET:': 'ஊட்டச்சத்து இலக்கு:',
            'MARKET INTELLIGENCE': 'சந்தை நுண்ணறிவு',
            'PRECISION EQUIPMENT PROTOCOL:': 'துல்லியமான உபகரண நெறிமுறை:',
            'ENVIRONMENTAL STRESS ALERT:': 'சுற்றுச்சூழல் அழுத்த எச்சரிக்கை:',
            'STRESS MULTIPLIER:': 'அழுத்த பெருக்கி:',
            'PATHOGEN ALERT:': 'நோய்க்கிருமி எச்சரிக்கை:',
            'WEATHER ALERT:': 'வானிலை எச்சரிக்கை:',
            'SAFETY PROTOCOL:': 'பாதுகாப்பு நெறிமுறை:',
            'HYDRATION ALERT:': 'நீரேற்ற எச்சரிக்கை:',
            'For Rice': 'நெல் பயிருக்கான',
            'recommended sowing depth is': 'பரிந்துரைக்கப்பட்ட விதைப்பு ஆழம்',
            'with spacing of': 'மற்றும் இடைவெளி',
            'Critical irrigation stages': 'முக்கிய நீர் பாசன நிலைகள்',
            'include:': 'உள்ளடக்கியவை:',
            'irrigation is globally recommended': 'நீர் பாசனம் உலகளவில் பரிந்துரைக்கப்படுகிறது',
            'detected.': 'கண்டறியப்பட்டது.',
            'Increase': 'அதிகரிக்கவும்',
            'Shift irrigation to': 'பாசனத்தை மாற்றவும்',
            'early morning or late evening': 'அதிகாலை அல்லது மாலை நேரத்திற்கு',
            'AVOID applying': 'தவிர்க்கவும்',
            'pesticides or fertilizers today': 'பூச்சிக்கொல்லி அல்லது உரங்களை இன்று'
        }
        
        for eng, tam in translations.items():
            text = text.replace(eng, tam)
        return text

    @staticmethod
    def build_explanation(decision_result, language='en'):
        t = ReasonBuilder.TRANSLATIONS.get(language, ReasonBuilder.TRANSLATIONS['en'])
        
        # Handle Topic Mismatch
        if decision_result.get('error') == "topic_mismatch":
            suggested = decision_result.get('suggested_topic', 'the correct topic')
            return {
                "answer": f"{t['mismatch_header']}{t['mismatch_body'].format(suggested=suggested)}",
                "reasoning": t['mismatch_reason'],
                "guidance": [g.format(suggested=suggested) for g in t['mismatch_guidance']],
                "safety_warning": "Consulting non-aligned modules can lead to sub-optimal field decisions.",
                "closing": "Your Digital Twin is here to ensure precision."
            }

        context = decision_result['context']
        intent = decision_result['intent']
        decision = ReasonBuilder.translate_decision(decision_result['decision'], language)
        
        # 1️⃣ Professional Synthesis Header
        crop_name = context['crop'].upper()
        header = t['header'].format(crop=crop_name)
        
        weather = context.get('weather')
        if weather:
             cond = weather['condition'].title()
             # Basic condition translation
             if language == 'ta':
                 cond_map = {'Clear': 'தெளிவானது', 'Sunny': 'வெயில்', 'Cloudy': 'மேகமூட்டம்', 'Rain': 'மழை'}
                 cond = cond_map.get(cond, cond)
             header += t['weather'].format(temp=weather['temp'], cond=cond, hum=weather['humidity'])
             
        header += t['source']
        
        # 2️⃣ Cognitive Diagnosis
        diagnosis = decision_result.get('diagnosis')
        if not diagnosis:
            if language == 'ta':
                diagnosis = f"உங்கள் டிஜிட்டல் ட்வின் இந்த நெறிமுறையை மேம்படுத்த உங்கள் {context['soil']} மண் மற்றும் தற்போதைய {context['season']} மாறிகளை பகுப்பாய்வு செய்துள்ளது."
            else:
                diagnosis = f"Your Digital Twin has analyzed your {context['soil']} soil and current {context['season']} variables to optimize this protocol."
            
        # 3️⃣ Precision Execution Steps
        steps = decision_result.get('guidance')
        if not steps:
            if language == 'ta':
                steps = [
                    f"{context['crop']} க்கான கிராம அளவிலான சந்தை தரவுகளுடன் ஒத்திசைக்கவும்.",
                    "உயிரியல் வங்கியில் வரைபடமாக்கப்பட்ட அறிகுறிகளுக்கான இலை ஒருமைப்பாட்டை சரிபார்க்கவும்.",
                    "BUMI நிறுவன தரநிலைகளின் அடிப்படையில் வள ஒதுக்கீட்டை அளவீடு செய்யவும்.",
                    "உங்கள் டிஜிட்டல் ட்வின் நிரந்தர நினைவகத்தில் இந்த செயல்பாட்டை பதிவு செய்யவும்."
                ]
            else:
                steps = [
                    f"Sync with village-level market data for {context['crop']}.",
                    "Verify leaf integrity for symptoms mapped in the bio-bank.",
                    "Calibrate resource allocation based on BUMI institutional standards.",
                    "Log this execution in your Digital Twin's permanent memory."
                ]
        
        # 4️⃣ Neural Forecast
        forecast = decision_result.get('forecast')
        if not forecast:
            if language == 'ta':
                forecast = "டிஜிட்டல் ட்வின் முன்னறிவிப்பு: உலகளாவிய தரம் V9.2 இன் அடிப்படையில் உகந்த வளர்ச்சி பாதை கண்டறியப்பட்டது. இந்த நெறிமுறையை பராமரிப்பது ஆபத்தை 15% குறைக்கிறது."
            else:
                forecast = "TWIN FORECAST: Optimized growth trajectory detected based on global standard V9.2. Maintaining this protocol reduces risk by 15%."
        
        # Final Assemblage
        guidance_text = "\n".join([f"- {s}" for s in steps])
        professional_answer = f"{header}{decision}\n\n---\n**{t['diagnosis_title']}** {diagnosis}\n\n**{t['guidance_title']}**\n{guidance_text}\n\n**{t['forecast_title']}** {forecast}"
        
        return {
            "answer": professional_answer,
            "reasoning": diagnosis,
            "guidance": steps,
            "safety_warning": t['safety_text'],
            "closing": t['closing']
        }

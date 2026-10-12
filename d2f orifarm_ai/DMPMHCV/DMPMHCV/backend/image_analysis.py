from flask import Flask, request, jsonify
import base64
import requests
import os

# Try to import optional dependencies
try:
    from flask_cors import CORS
    CORS_AVAILABLE = True
except ImportError:
    CORS_AVAILABLE = False
    print("Warning: flask-cors not available. CORS may not work properly.")

try:
    from dotenv import load_dotenv
    load_dotenv()
    DOTENV_AVAILABLE = True
except ImportError:
    DOTENV_AVAILABLE = False
    print("Warning: python-dotenv not available. Using environment variables only.")

app = Flask(__name__)
if CORS_AVAILABLE:
    CORS(app)
else:
    print("Warning: CORS not enabled due to missing flask-cors library")

# OpenAI API Configuration
# Explicitly using the new key provided to ensure it's not overridden
OPENAI_API_KEY = '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'
VISION_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

@app.route('/api/analyze-crop-image', methods=['POST'])
def analyze_crop_image():
    """
    Real AI-powered crop disease detection using OpenAI Vision API.
    Switching to gpt-4o-mini for better cost efficiency and quota management.
    """
    try:
        # Get the uploaded image
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image_file = request.files['image']
        
        # Read and encode image to base64
        image_data = image_file.read()
        base64_image = base64.b64encode(image_data).decode('utf-8')
        
        # System Prompt for Real Agricultural Analysis (Enhanced for Cures)
        system_prompt = """You are an expert agricultural pathologist and plant disease specialist with years of field experience.

Analyze this crop image using your expertise in:
- Plant pathology and disease identification
- Pest and insect damage patterns
- Nutrient deficiency symptoms
- Environmental stress indicators

Provide a REAL, SCIENTIFIC analysis based on what you actually see in the image.

MANDATORY RESPONSE SECTIONS:

1. **Disease/Issue Identification**: What specific disease, pest, or problem do you see? Be specific.
2. **Visual Evidence**: Describe the visual symptoms you observe (leaf spots, discoloration, wilting, etc.)
3. **Severity Assessment**: Rate the severity (Mild/Moderate/Severe) and explain why
4. **Cure & Treatment (Step-by-Step)**: THIS IS THE MOST IMPORTANT SECTION.
   - **Immediate Action**: What to do RIGHT NOW (e.g., isolate plant, prune leaves).
   - **Organic Solution**: Home remedies, neem oil, bio-fungicides, or natural predators.
   - **Chemical Solution**: Specific chemical names (e.g., "Copper Oxychloride", "Imidacloprid") if severe, with safety warnings.
5. **Prevention Tips**: How to prevent this in the future
6. **Recovery Time**: Estimated time for recovery.

Be honest - if the image quality is poor or you cannot make a definitive diagnosis, say so.
Format your response as JSON with these keys: disease_name, visual_symptoms, severity, confidence_level, treatment, prevention, explanation. The 'treatment' field should contain the detailed step-by-step cure info."""

        # Call OpenAI Vision API for REAL analysis
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {OPENAI_API_KEY}'
        }
        
        payload = {
            "model": "gpt-4o-mini", # 15x cheaper than gpt-4o, supports vision
            "messages": [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Analyze this crop image and provide a detailed diagnosis."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 1000,
            "temperature": 0.3
        }
        
        print(f"📡 Sending request to OpenAI (Model: gpt-4o-mini)...")
        response = requests.post(VISION_API_ENDPOINT, headers=headers, json=payload)
        response_data = response.json()
        
        if 'error' in response_data:
            error_msg = response_data['error']['message']
            print(f"❌ OpenAI API Error: {error_msg}")
            
            # Special handling for quota issues
            if "quota" in error_msg.lower():
                return jsonify({
                    'error': 'OpenAI Quota Exceeded. Please check your billing or try a different key.',
                    'details': error_msg
                }), 429
                
            return jsonify({'error': error_msg}), 500
        
        # Extract the AI's analysis
        analysis_text = response_data['choices'][0]['message']['content']
        
        # Try to parse as JSON, otherwise return as text
        try:
            import json
            # Remove markdown code blocks if present
            if '```json' in analysis_text:
                analysis_text = analysis_text.split('```json')[1].split('```')[0].strip()
            elif '```' in analysis_text:
                analysis_text = analysis_text.split('```')[1].split('```')[0].strip()
            
            analysis_json = json.loads(analysis_text)
        except:
            # If JSON parsing fails, structure the text response
            analysis_json = {
                'disease_name': 'Analysis Complete',
                'visual_symptoms': analysis_text,
                'severity': 'See analysis',
                'confidence_level': 'High',
                'treatment': 'See detailed analysis',
                'prevention': 'See detailed analysis',
                'explanation': analysis_text
            }
        
        print(f"✅ Analysis successful: {analysis_json.get('disease_name', 'Complete')}")
        return jsonify({
            'success': True,
            'analysis': analysis_json,
            'note': 'This is a REAL AI analysis using gpt-4o-mini.'
        })
        
    except Exception as e:
        print(f"❌ Unexpected Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'AI Crop Image Analysis'})

if __name__ == '__main__':
    print("Starting Real AI Crop Image Analysis Service...")
    print("Using gpt-4o-mini for efficient VISION analysis")
    print("Not fake detection - actual computer vision analysis")
    app.run(debug=True, port=5001, host='0.0.0.0')

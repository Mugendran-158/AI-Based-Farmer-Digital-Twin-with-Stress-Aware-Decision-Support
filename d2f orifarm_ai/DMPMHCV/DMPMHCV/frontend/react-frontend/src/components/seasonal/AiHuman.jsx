import React, { useState, useEffect, useRef } from 'react';

/**
 * AiHuman.jsx
 * Multilingual Voice-Interactive Assistant for farmers.
 * Supports English and Tamil.
 */
const AiHuman = ({ season, language, weather, bioState }) => {
    const [isListening, setIsListening] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                processFarmerInput(transcript);
            };

            recognitionRef.current.onend = () => setIsListening(false);
        }
    }, []);

    const speakResponse = (text, lang) => {
        if (!synthRef.current) return;
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (lang === 'ta') utterance.lang = 'ta-IN';
        else if (lang === 'ja') utterance.lang = 'ja-JP';
        else utterance.lang = 'en-US';
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        synthRef.current.speak(utterance);
    };

    const processFarmerInput = (input) => {
        let response = '';
        let systemLang = 'en';

        // Detect Language (Basic heuristic)
        if (/[அ-ஔ]/.test(input) || input.includes('vanakkam') || input.includes('tamil')) {
            systemLang = 'ta';
        } else if (/[ぁ-んァ-ヶ]/.test(input) || input.includes('こんにちは') || input.includes('japanese')) {
            systemLang = 'ja';
        }

        const isWeatherQuery = /weather|rain|temp|வானிலை|மழை|வெப்பம்|天気|雨|気温/i.test(input);
        const isCropQuery = /crop|plant|growth|health|பயிர்|செடி|வளர்ச்சி|ஆரோக்கியம்|作物|植物|成長|健康/i.test(input);
        const isSeasonQuery = /season|time|பருவம்|காலம்|季節|時期/i.test(input);

        if (isWeatherQuery) {
            if (systemLang === 'ta') {
                response = `தற்போதைய வானிலை ${weather?.condition || 'சாதாரணம்'}. வெப்பநிலை ${weather?.temp || '--'} டிகிரி செல்சியஸ்.`;
            } else if (systemLang === 'ja') {
                response = `現在の天気は ${weather?.condition || '安定'} です。気温は ${weather?.temp || '--'} 度です。`;
            } else {
                response = `The current weather is ${weather?.condition || 'stable'}. Temperature is ${weather?.temp || '--'} degrees Celsius.`;
            }
        } else if (isCropQuery) {
            const hydration = Math.round(bioState?.indicators?.waterUptake * 100) || 0;
            if (systemLang === 'ta') {
                response = `பயிர்களின் நீர் உறிஞ்சுதல் ${hydration} சதவீதம். ${bioState?.interpretation?.hint || ''}`;
            } else if (systemLang === 'ja') {
                response = `作物の吸水率は ${hydration} パーセントです。 ${bioState?.interpretation?.hint || ''}`;
            } else {
                response = `Crop water uptake is at ${hydration} percent. ${bioState?.interpretation?.hint || ''}`;
            }
        } else if (isSeasonQuery) {
            if (systemLang === 'ta') {
                response = `இது ${season} பருவம். இந்த காலத்தில் விவசாயம் செய்ய நான் உங்களுக்கு உதவுவேன்.`;
            } else if (systemLang === 'ja') {
                response = `今は ${season} の季節です。この期間の農作業をサポートします。`;
            } else {
                response = `This is the ${season} season. I am here to guide your farming activities during this time.`;
            }
        } else {
            if (systemLang === 'ta') {
                response = "வணக்கம்! நான் உங்கள் விவசாய உதவியாளர். வானிலை அல்லது பயிர்களைப் பற்றி என்னிடம் கேளுங்கள்.";
            } else if (systemLang === 'ja') {
                response = "こんにちは！私はAIヒューマン・アシスタントです。天気や作物、季節のガイダンスについて聞いてください。";
            } else {
                response = "Hello! I am your AI Human Assistant. Ask me about weather, crops, or seasonal guidance.";
            }
        }

        setAiResponse(response);
        speakResponse(response, systemLang);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setAiResponse('');
            try {
                recognitionRef.current?.start();
                setIsListening(true);
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div className="relative group cursor-pointer" onClick={toggleListening}>
            {/* Holographic Projection Base */}
            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-6 rounded-full blur-2xl animate-pulse transition-colors duration-1000 ${isSpeaking ? 'bg-nature-light/30' : 'bg-nature-medium/20'}`}></div>

            {/* AI Human Visual Avatar */}
            <div className={`relative w-24 h-48 flex flex-col items-center transition-all duration-1000 ${isSpeaking ? 'scale-105 filter drop-shadow-[0_0_15px_rgba(141,162,143,0.4)]' : ''}`}>

                {/* Energy Core / Head */}
                <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${isListening ? 'animate-ping border-nature-light' : 'border-nature-light/30 bg-nature-deep shadow-[0_0_40px_rgba(141,162,143,0.2)]'}`}>
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-nature-light via-trust-blue to-nature-medium shadow-inner ${isSpeaking ? 'animate-pulse scale-110' : ''}`}></div>
                </div>

                {/* Body Column */}
                <div className="w-1.5 h-24 bg-gradient-to-b from-nature-light/60 via-nature-medium/40 to-transparent shadow-[0_0_20px_rgba(141,162,143,0.3)] mt-2"></div>

                {/* Floating Knowledge Rings */}
                <div className="absolute top-20 w-20 h-20 border border-nature-light/10 rounded-full animate-[spin_12s_linear_infinite]"></div>
                <div className="absolute top-18 w-24 h-24 border border-harvest-gold/10 rounded-full animate-[spin_18s_linear_infinite_reverse]"></div>

                {/* AI Label */}
                <div className="absolute -bottom-10 whitespace-nowrap bg-nature-deep/80 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/5 shadow-2xl">
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-nature-light">Institutional Field Advisor</span>
                </div>
            </div>

            {/* Response Panel */}
            {aiResponse && (
                <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-72 bg-white/95 dark:bg-nature-deep/95 backdrop-blur-3xl p-6 rounded-[2rem] border border-nature-light/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-4 fade-in duration-500">
                    <p className={`text-xs leading-relaxed font-bold italic ${isDarkMode ? 'text-white/90' : 'text-nature-deep'}`}>
                        "{aiResponse}"
                    </p>
                    <div className="mt-4 pt-3 border-t border-nature-light/10 flex justify-between items-center">
                        <span className={`text-[8px] uppercase font-black tracking-widest ${isDarkMode ? 'text-white/30' : 'text-nature-deep/30'}`}>Direct Field Audio</span>
                        <div className="flex gap-1.5">
                            <div className={`w-1.5 h-4 bg-nature-light rounded-full ${isSpeaking ? 'animate-[bounce_0.6s_infinite]' : 'opacity-20'}`}></div>
                            <div className={`w-1.5 h-6 bg-nature-medium rounded-full ${isSpeaking ? 'animate-[bounce_0.6s_infinite_0.1s]' : 'opacity-20'}`}></div>
                            <div className={`w-1.5 h-3 bg-nature-light rounded-full ${isSpeaking ? 'animate-[bounce_0.6s_infinite_0.2s]' : 'opacity-20'}`}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Microphone Status */}
            {isListening && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]"></div>
                    <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest">Listening...</span>
                </div>
            )}

            {/* Mandatory Disclaimer (Embedded for Context) */}
            <div className="hidden group-hover:block absolute top-[110%] left-1/2 -translate-x-1/2 w-48 text-center">
                <p className="text-[6px] text-white/40 leading-tight uppercase font-medium">
                    "AI Human provides decision support, not guarantees. Derived from real data models."
                </p>
            </div>
        </div>
    );
};

export default AiHuman;

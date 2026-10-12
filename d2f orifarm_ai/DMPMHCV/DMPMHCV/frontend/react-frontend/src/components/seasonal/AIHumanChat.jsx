import React, { useState, useEffect, useRef, useCallback } from 'react';
import { initSpeechRecognition, speak } from '../../utils/VoiceInputModule';

import { SEASONAL_DATA } from '../../data/seasonalData';

/**
 * AIHumanChat - A premium, calm, and professional agricultural assistant interface.
 */
const AIHumanChat = ({ isOpen, onClose, season, language: initialLanguage }) => {
    const [language, setLanguage] = useState(initialLanguage || 'en');
    const [messages, setMessages] = useState([]);
    const [isListening, setIsListening] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    const scrollViewRef = useRef(null);
    const recognitionRef = useRef(null);

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting = language === 'ta'
                ? "வணக்கம், விவசாயி. நான் உங்கள் AI மனித உதவியாளர். இந்த பருவத்தில் என்ன பயிரிடலாம் என்று நான் உங்களுக்கு உதவ முடியும்."
                : "Greetings, farmer. I am your AI Human Assistant. I can help you decide what to grow this season and explain the best soil conditions.";
            setMessages([{ role: 'ai', text: greeting }]);
            speak(greeting, language);
        }
    }, [isOpen, language]);

    // Cleanup speech on close
    useEffect(() => {
        if (!isOpen) {
            window.speechSynthesis.cancel();
            recognitionRef.current?.stop();
        }
    }, [isOpen]);

    // Auto-scroll
    useEffect(() => {
        scrollViewRef.current?.scrollTo({ top: scrollViewRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, isThinking]);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setMessages([]); // Reset chat for fresh language context
    };

    const generateResponse = useCallback((query) => {
        const data = SEASONAL_DATA[language][season];
        const lowerQuery = query.toLowerCase();

        let response = "";

        // Month detection
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentMonth = months[new Date().getMonth()];

        if (language === 'ta') {
            const taMonths = ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"];
            const taMonth = taMonths[new Date().getMonth()];

            if (lowerQuery.includes('மண்') || lowerQuery.includes('soil')) {
                const item = data.crops[0];
                response = `${item.name} பயிருக்கு ${item.soil} வகை மண் சிறந்தது. ${item.grow_guide} என்பது எனது பரிந்துரை.`;
            } else if (lowerQuery.includes('பழம்') || lowerQuery.includes('fruit')) {
                const fruit = data.fruits[Math.floor(Math.random() * data.fruits.length)];
                response = `இந்த ${taMonth} மாதத்தில் ${fruit.name} பழங்களை வளர்க்கலாம். இதற்கு ${fruit.soil} மண் தேவை.`;
            } else if (lowerQuery.includes('காய்கறி') || lowerQuery.includes('vegetable')) {
                const veg = data.vegetables[0];
                response = `நிச்சயமாக, ${veg.name} போன்ற காய்கறிகள் இப்போது நன்றாக வளரும். ${veg.soil} மண்ணைப் பயன்படுத்தவும்.`;
            } else {
                response = `தற்போது ${taMonth} மாதம் மற்றும் இது ${data.label} பருவம். நான் உங்களுக்கு ${data.crops[0].name} அல்லது ${data.medicinal[0].name} பயிரிட பரிந்துரைக்கிறேன். இவற்றுக்கு ${data.crops[0].soil} மண் மிகவும் பொருத்தமானது.`;
            }
            response += " கவனிக்கவும்: உள்ளூர் தட்பவெப்ப நிலையைப் பொறுத்து இவை மாறுபடலாம்.";
        } else {
            if (lowerQuery.includes('soil') || lowerQuery.includes('dirt')) {
                const item = data.crops[0];
                response = `For ${item.name}, ${item.soil} is the ideal soil type. ${item.grow_guide}`;
            } else if (lowerQuery.includes('fruit')) {
                const fruit = data.fruits[Math.floor(Math.random() * data.fruits.length)];
                response = `In ${currentMonth}, you can cultivate ${fruit.name}. It thrives best in ${fruit.soil}.`;
            } else if (lowerQuery.includes('vegetable')) {
                const veg = data.vegetables[0];
                response = `${veg.name} is a great choice right now. Ensure your soil is ${veg.soil} for best results.`;
            } else if (lowerQuery.includes('medicinal') || lowerQuery.includes('herb')) {
                const herb = data.medicinal[0];
                response = `I suggest growing ${herb.name}. It requires ${herb.soil} and takes about ${herb.duration}.`;
            } else {
                response = `It is currently ${currentMonth}, during the ${data.label} season. I recommend growing ${data.crops[0].name} or ${data.fruits[0].name}. Both prefer ${data.crops[0].soil} soil.`;
            }
            response += " Please note: Recommendations may vary based on local conditions.";
        }

        return response;
    }, [language, season]);

    const handleUserMessage = async (text) => {
        if (!text.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text }]);
        setIsThinking(true);

        // Simulate AI thinking
        setTimeout(() => {
            const aiResponse = generateResponse(text);
            setIsThinking(false);
            setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
            speak(aiResponse, language);
        }, 800);
    };

    const toggleVoice = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            const rec = initSpeechRecognition(language, (transcript) => {
                handleUserMessage(transcript);
            }, () => setIsListening(false));

            if (rec) {
                rec.start();
                setIsListening(true);
                recognitionRef.current = rec;
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
            <div className="relative w-full max-w-3xl h-[85vh] bg-slate-900/40 border border-white/10 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">

                {/* 🎨 Header Section */}
                <div className="p-10 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-400/30">
                            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-blue-400">
                                <path d="M50 20C38 20 28 30 28 42C28 52 32 60 38 65C38 72 32 80 25 82V85H75V82C68 80 62 72 62 65C68 60 72 52 72 42C72 30 62 20 50 20Z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-white tracking-tight">
                                {language === 'ta' ? 'AI உதவியாளர்' : 'AI Human Assistant'}
                            </h2>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-blue-400/60 font-black">
                                {language === 'ta' ? 'அமைதியான & நம்பகமான வழிகாட்டி' : 'CALM & TRUSTED ADVISOR'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Selector */}
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                            <button
                                onClick={() => handleLanguageChange('en')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-blue-500 text-white' : 'text-white/40 hover:text-white'}`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => handleLanguageChange('ta')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'ta' ? 'bg-blue-500 text-white' : 'text-white/40 hover:text-white'}`}
                            >
                                தமிழ்
                            </button>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* 💬 Chat Messages Area */}
                <div
                    ref={scrollViewRef}
                    className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide"
                >
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                            <div className={`max-w-[75%] p-6 rounded-[2rem] text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none shadow-lg'
                                : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}


                    {isThinking && (
                        <div className="flex justify-start">
                            <div className="bg-white/5 px-6 py-4 rounded-full border border-white/10 flex gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                </div>

                {/* 🎤 Input & Micro-Interactions */}
                <div className="p-10 bg-black/20 border-t border-white/5">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={toggleVoice}
                            className={`group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${isListening
                                ? 'bg-red-500 scale-110 shadow-[0_0_40px_rgba(239,68,68,0.4)]'
                                : 'bg-blue-500 hover:bg-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.3)]'
                                }`}
                        >
                            <span className="text-3xl animate-pulse">{isListening ? '🛑' : '🎤'}</span>
                            <div className={`absolute inset-0 rounded-full border-4 border-white/20 ${isListening ? 'animate-ping' : ''}`} />
                        </button>

                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder={language === 'ta' ? 'இங்கே கேளுங்கள்...' : 'Ask your agricultural question...'}
                                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-8 text-white text-base focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value) {
                                        handleUserMessage(e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 text-[10px] font-bold uppercase tracking-widest text-white">
                                ENTER TO SEND
                            </div>
                        </div>
                    </div>

                    {/* 📜 Ethics Footer */}
                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <p className="text-[10px] text-white/30 font-medium uppercase tracking-[0.1em]">
                            Recommendations are based on general agricultural knowledge and seasonal patterns. Local conditions may vary.
                        </p>
                    </div>
                </div>
            </div>

            {/* ❄️ Cold Storage Intelligence Modal */}

        </div>
    );
};

export default AIHumanChat;

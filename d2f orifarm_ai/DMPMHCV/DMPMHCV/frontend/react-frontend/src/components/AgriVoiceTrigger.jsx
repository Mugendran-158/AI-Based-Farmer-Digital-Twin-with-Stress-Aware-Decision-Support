import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Waves, X, Command, Play } from 'lucide-react';

const AgriVoiceTrigger = ({ t, language, isDarkMode }) => {
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [showPulse, setShowPulse] = useState(false);
    const navigate = useNavigate();
    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.warn("Speech recognition not supported");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setTranscript('');
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onresult = (event) => {
            const current = event.results[0][0].transcript;
            setTranscript(current);

            if (event.results[0].isFinal) {
                handleCommand(current.toLowerCase());
            }
        };

        recognitionRef.current = recognition;
    }, [language]);

    const handleCommand = (cmd) => {
        setIsProcessing(true);

        // Navigation Map
        const routes = [
            { keys: ['farm assistant', 'assistant', 'advice', 'விவசாய உதவியாளர்', 'உதவியாளர்'], path: '/ai-farmer' },
            { keys: ['crop scanner', 'scanner', 'detect', 'disease', 'பயிர் ஸ்கேனர்', 'ஸ்கேனர்'], path: '/crop-analyzer' },
            { keys: ['market prices', 'prices', 'mandi', 'சந்தை விலை', 'விலை'], path: '/market-prices' },
            { keys: ['safety monitor', 'safety', 'intruder', 'fire', 'பாதுகாப்பு'], path: '/safety-twin' },
            { keys: ['smart workspace', 'workspace', 'map', 'farm map', 'பண்ணை வரைபடம்', 'வரைபடம்'], path: '/world' },
            { keys: ['expert system', 'expert', 'decision', 'நிபுணர் அமைப்பு', 'நிபுணர்'], path: '/twin-intelligence' }
        ];

        const match = routes.find(r => r.keys.some(k => cmd.includes(k)));

        if (match) {
            setTimeout(() => {
                navigate(match.path);
                setIsProcessing(false);
                setTranscript('');
            }, 1000);
        } else {
            setIsProcessing(false);
            // Optional: Add feedback that command wasn't understood
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-[6000] flex flex-col items-end gap-6">

            {/* Status Feedback Hud */}
            {(isListening || isProcessing || transcript) && (
                <div className={`
                    p-6 rounded-[2.5rem] border backdrop-blur-3xl shadow-2xl animate-in slide-in-from-bottom-8 duration-500 w-72
                    ${isDarkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white/90 border-slate-200'}
                `}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40">
                                {isListening ? (language === 'ta' ? 'கேட்கிறது' : 'Listening') : (language === 'ta' ? 'செயலாக்குகிறது' : 'Processing')}
                            </span>
                        </div>
                        <button onClick={() => { setIsListening(false); recognitionRef.current?.stop(); setTranscript(''); }} className="opacity-20 hover:opacity-100 transition-opacity">
                            <X size={14} />
                        </button>
                    </div>

                    <div className="min-h-[40px] flex items-center justify-center">
                        {transcript ? (
                            <p className={`text-sm font-bold italic text-center ${isDarkMode ? 'text-white/80' : 'text-slate-600'}`}>"{transcript}"</p>
                        ) : (
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* The Professional Omni-Command Button */}
            <div className="relative group">
                {/* Orbiting Ring */}
                <div className={`absolute inset-[-8px] rounded-full border border-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-1000 ${isListening ? 'animate-spin' : ''}`} />

                <button
                    onClick={toggleListening}
                    className={`
                        relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 active:scale-90
                        ${isListening
                            ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                            : isDarkMode
                                ? 'bg-[#0F172A] border border-white/10 text-emerald-400 hover:border-emerald-500/40'
                                : 'bg-white border border-slate-200 text-emerald-600 shadow-xl hover:border-emerald-500/20'}
                    `}
                >
                    {isListening ? <MicOff size={24} /> : <Mic size={24} />}

                    {/* Ripple Effect when Listening */}
                    {isListening && (
                        <div className="absolute inset-0 rounded-2xl animate-ping bg-red-500 opacity-20 pointer-events-none" />
                    )}

                    {/* Technical Status Corner */}
                    <div className="absolute top-1 right-1">
                        <div className={`w-1 h-1 rounded-full ${isListening ? 'bg-white' : 'bg-emerald-500'} animate-pulse`} />
                    </div>
                </button>

                {/* Hover Label */}
                {!isListening && (
                    <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none transform translate-x-4 group-hover:translate-x-0">
                        <div className={`px-4 py-2 rounded-xl backdrop-blur-xl border border-emerald-500/10 whitespace-nowrap ${isDarkMode ? 'bg-slate-900/80 shadow-black' : 'bg-white/80 shadow-xl'}`}>
                            <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {language === 'ta' ? 'குரல் கட்டளை' : 'Voice Command Center'}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AgriVoiceTrigger;

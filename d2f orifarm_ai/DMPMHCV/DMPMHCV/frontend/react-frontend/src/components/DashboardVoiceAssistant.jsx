import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, X, Repeat, TrendingDown, Navigation, Search, HelpCircle, Shield, Play, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTTS } from '../hooks/useTTS';
import axios from 'axios';

const DashboardVoiceAssistant = ({ language = 'en', isDarkMode = true, t }) => {
    const navigate = useNavigate();
    const { speak, cancel, isSpeaking } = useTTS(language);
    const [isActive, setIsActive] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [response, setResponse] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [lastResponse, setLastResponse] = useState('');
    const [speechRate, setSpeechRate] = useState(1.0);
    const recognitionRef = useRef(null);
    const vt = t('voiceSystem') || {};

    const getSafeVtValue = (path, fallback = '') => {
        const keys = path.split('.');
        let val = vt;
        for (const k of keys) {
            val = val?.[k];
        }
        return val || fallback;
    };

    // Initialize Speech Recognition
    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.warn("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const currentTranscript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setTranscript(currentTranscript);

            if (event.results[0].isFinal) {
                handleCommand(currentTranscript.toLowerCase());
            }
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, [language]);

    const handleToggle = () => {
        if (!isActive) {
            setIsActive(true);
            speak(getSafeVtValue('greet', 'Hello'));
        } else {
            setIsActive(false);
            setIsListening(false);
            if (recognitionRef.current) recognitionRef.current.stop();
            cancel();
        }
    };

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            setResponse('');
            recognitionRef.current.start();
        }
    };

    const handleCommand = async (cmd) => {
        setIsProcessing(true);
        console.log("Voice Command Received:", cmd);

        // 1. Navigation Commands
        const navMap = {
            en: [
                { keys: ['farm assistant', 'assistant', 'advice'], path: '/ai-farmer', name: getSafeVtValue('modules.aiFarmer', 'Assistant') },
                { keys: ['crop scanner', 'scanner', 'detect', 'disease'], path: '/crop-analyzer', name: getSafeVtValue('modules.cropAnalyzer', 'Scanner') },
                { keys: ['market prices', 'prices', 'mandi'], path: '/market-prices', name: getSafeVtValue('modules.marketPrices', 'Prices') },
                { keys: ['safety monitor', 'safety', 'intruder', 'fire'], path: '/safety-twin', name: getSafeVtValue('modules.safetyTwin', 'Safety') },
                { keys: ['smart workspace', 'workspace', 'map', 'farm map'], path: '/world', name: getSafeVtValue('modules.smartWorkspace', 'Map') },
                { keys: ['expert system', 'expert', 'decision'], path: '/twin-intelligence', name: getSafeVtValue('modules.expertSystem', 'System') }
            ],
            ta: [
                { keys: ['விவசாய உதவியாளர்', 'உதவியாளர்', 'ஆலோசனை'], path: '/ai-farmer', name: getSafeVtValue('modules.aiFarmer', 'Assistant') },
                { keys: ['பயிர் ஸ்கேனர்', 'ஸ்கேனர்', 'நோய்'], path: '/crop-analyzer', name: getSafeVtValue('modules.cropAnalyzer', 'Scanner') },
                { keys: ['சந்தை விலை', 'விலை'], path: '/market-prices', name: getSafeVtValue('modules.marketPrices', 'Prices') },
                { keys: ['பண்ணை பாதுகாப்பு', 'பாதுகாப்பு'], path: '/safety-twin', name: getSafeVtValue('modules.safetyTwin', 'Safety') },
                { keys: ['பண்ணை வரைபடம்', 'வரைபடம்'], path: '/world', name: getSafeVtValue('modules.smartWorkspace', 'Map') },
                { keys: ['நிபுணர் அமைப்பு', 'நிபுணர்'], path: '/twin-intelligence', name: getSafeVtValue('modules.expertSystem', 'System') }
            ]
        };

        const currentNavs = navMap[language] || navMap.en;
        const match = currentNavs.find(nav => nav.keys.some(k => cmd.includes(k)));

        if (match) {
            const msg = getSafeVtValue('navigatingTo', 'Opening module.').replace('[module]', match.name);
            speak(msg, () => {
                navigate(match.path);
                setIsActive(false);
            });
            setResponse(msg);
            setIsProcessing(false);
            return;
        }

        // 2. Explanation Commands
        const explMap = {
            en: [
                { keys: ['what is', 'explain', 'tell me about'], module: 'aiFarmer' },
                { keys: ['what is the crop scanner', 'explain scanner'], module: 'cropAnalyzer' },
                { keys: ['what is market prices', 'explain prices'], module: 'marketPrices' },
                { keys: ['what is safety monitor', 'explain safety'], module: 'safetyTwin' },
                { keys: ['what is smart workspace', 'explain workspace'], module: 'smartWorkspace' },
                { keys: ['what is expert system', 'explain expert'], module: 'expertSystem' }
            ],
            ta: [
                { keys: ['விவசாய உதவியாளர் என்றால் என்ன', 'உதவியாளர் விளக்கு'], module: 'aiFarmer' },
                { keys: ['பயிர் ஸ்கேனர் என்றால் என்ன', 'ஸ்கேனர் விளக்கு'], module: 'cropAnalyzer' },
                { keys: ['சந்தை விலை என்றால் என்ன', 'விலை விளக்கு'], module: 'marketPrices' },
                { keys: ['பாதுகாப்பு கண்காணிப்பு என்றால் என்ன', 'பாதுகாப்பு விளக்கு'], module: 'safetyTwin' },
                { keys: ['வரைபடம் என்றால் என்ன', 'வரைபடம் விளக்கு'], module: 'smartWorkspace' },
                { keys: ['நிபுணர் அமைப்பு என்றால் என்ன', 'நிபுணர் விளக்கு'], module: 'expertSystem' }
            ]
        };

        const currentExpls = explMap[language] || explMap.en;
        const explMatch = currentExpls.find(ex => ex.keys.some(k => cmd.includes(k)));

        if (explMatch) {
            const explanation = getSafeVtValue(`explanations.${explMatch.module}`, 'Explanation unavailable.');
            speak(explanation);
            setResponse(explanation);
            setLastResponse(explanation);
            setIsProcessing(false);
            return;
        }

        // 3. Control Commands (Repeat / Slow)
        const repeatKeys = language === 'ta' ? ['மீண்டும்', 'திரும்ப'] : ['repeat', 'say again'];
        const slowKeys = language === 'ta' ? ['மெதுவாக', 'மெது'] : ['slow down', 'speak slowly'];

        if (repeatKeys.some(k => cmd.includes(k))) {
            speak(getSafeVtValue('repeatLast', 'Repeating.'), () => speak(lastResponse, null, { rate: speechRate }));
            setIsProcessing(false);
            return;
        }

        if (slowKeys.some(k => cmd.includes(k))) {
            const newRate = 0.7;
            setSpeechRate(newRate);
            speak(getSafeVtValue('slowDown', 'Speaking slower.'), () => speak(lastResponse, null, { rate: newRate }));
            setIsProcessing(false);
            return;
        }

        // 4. Fallback to Farming Q&A
        try {
            const res = await axios.post('/api/ask-twin', {
                doubt: cmd,
                context: 'Global dashboard voice command',
                language: language
            });
            const answer = res.data.answer;
            setResponse(answer);
            setLastResponse(answer);
            speak(answer, null, { rate: speechRate });
        } catch (error) {
            console.error("Voice Q&A Error:", error);
            speak(getSafeVtValue('notUnderstood', "Sorry, I didn't understand."));
            setResponse(getSafeVtValue('notUnderstood', "Sorry, I didn't understand."));
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed bottom-24 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none">
            {/* HUD Overlay */}
            {isActive && (
                <div className={`p-6 rounded-[2.5rem] border backdrop-blur-3xl shadow-2xl transition-all duration-500 transform pointer-events-auto w-80 mb-4 animate-scale-in ${isDarkMode ? 'bg-[#0F172A]/90 border-white/10 text-white' : 'bg-white/90 border-slate-200 text-slate-900'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-nature-medium'}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                                {isListening ? getSafeVtValue('listening', 'Listening') : isProcessing ? getSafeVtValue('processing', 'Processing') : language === 'ta' ? 'தமிழ்' : 'English'}
                            </span>
                        </div>
                        <button onClick={() => setIsActive(false)} className="opacity-20 hover:opacity-100 transition-opacity">
                            <X size={16} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {transcript && (
                            <p className="text-sm font-bold opacity-60 italic leading-tight">
                                "{transcript}"
                            </p>
                        )}
                        {response && (
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                                <p className="text-sm font-black leading-relaxed">
                                    {response}
                                </p>
                            </div>
                        )}
                        {!transcript && !response && (
                            <p className="text-[11px] font-black uppercase tracking-wider opacity-30 text-center py-4">
                                {language === 'ta' ? 'எப்படி உதவ முடியும்?' : 'Awaiting Command...'}
                            </p>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex gap-2 mt-6">
                        <button onClick={() => handleCommand(language === 'ta' ? 'மீண்டும்' : 'repeat')} className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                            <Repeat size={14} />
                            <span className="text-[9px] font-black uppercase">Repeat</span>
                        </button>
                        <button onClick={() => handleCommand(language === 'ta' ? 'மெதுவாக' : 'slow down')} className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                            <TrendingDown size={14} />
                            <span className="text-[9px] font-black uppercase">Slower</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Main Trigger Button */}
            <div className="pointer-events-auto">
                {isListening && (
                    <div className="absolute inset-0 w-full h-full rounded-full bg-red-500/20 animate-ping -z-10" />
                )}
                <button
                    onClick={handleToggle}
                    title={isActive ? "Disable Voice" : "Enable Voice Assistant"}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-700 shadow-2xl group ${isActive
                        ? isListening ? 'bg-red-600 scale-110' : 'bg-nature-medium scale-105'
                        : isDarkMode ? 'bg-white/5 hover:bg-nature-medium' : 'bg-white hover:bg-nature-medium text-slate-900 hover:text-white border border-slate-200'
                        }`}
                >
                    {isActive ? (
                        isListening ? <Mic size={32} className="text-white animate-pulse" /> : <MicOff size={32} className="text-white" />
                    ) : (
                        <Mic size={32} className="text-white group-hover:scale-110 transition-transform" />
                    )}

                    {/* AI Symbol Badge */}
                    <div className={`absolute -bottom-1 -left-1 w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-500 z-20 shadow-lg ${isDarkMode ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200 shadow-emerald-500/20'} group-hover:scale-110 group-hover:-rotate-12`}>
                        <Cpu size={14} className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
                    </div>

                    {/* Status Dot */}
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-4 ${isDarkMode ? 'border-[#0B1120]' : 'border-slate-50'} flex items-center justify-center text-[10px] font-black ${language === 'ta' ? 'bg-nature-medium text-white' : 'bg-nature-deep text-white'}`}>
                        {language === 'ta' ? 'த' : 'E'}
                    </div>

                    {!isActive && (
                        <div className="absolute -left-28 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-nature-medium text-white text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 shadow-lg">
                            {language === 'ta' ? 'பேசவும்' : 'Speak to AI'}
                        </div>
                    )}
                </button>

                {/* Secondary Start Button (One-tap listen when active but idle) */}
                {isActive && !isListening && (
                    <button
                        onClick={startListening}
                        className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-nature-deep text-white flex items-center justify-center shadow-lg animate-bounce hover:scale-110 transition-transform"
                    >
                        <Play size={16} fill="currentColor" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default DashboardVoiceAssistant;

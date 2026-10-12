import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, X, Repeat, TrendingDown, Play, ShieldCheck, History, Activity, AlertCircle, CheckCircle2, Info, Compass, CloudRain, Thermometer, Droplets, Wind, MapPin, ChevronDown, Cpu } from 'lucide-react';
import IntelligenceCard from './legendary/IntelligenceCard';
import { SEASONAL_DATA } from '../data/seasonalData';
import { TN_LOCATION_DATA } from '../data/tamilnaduLocations';
import { useTTS } from '../hooks/useTTS';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IntelligenceHub = ({ t, language, isDarkMode, selectedDistrict, setSelectedDistrict, selectedTown, setSelectedTown }) => {
    const navigate = useNavigate();
    const { speak, cancel, isSpeaking } = useTTS(language);

    // --- INSIGHT STATE ---
    const [isInsightOpen, setIsInsightOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('guardian');
    const [weatherData, setWeatherData] = useState(null);
    const [isWeatherLoading, setIsWeatherLoading] = useState(false);
    const [showTownList, setShowTownList] = useState(false);
    const [showDistrictList, setShowDistrictList] = useState(false);

    // --- VOICE ASSISTANT STATE ---
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [voiceResponse, setVoiceResponse] = useState('');
    const [isVoiceProcessing, setIsVoiceProcessing] = useState(false);
    const [lastVoiceResponse, setLastVoiceResponse] = useState('');
    const [speechRate, setSpeechRate] = useState(1.0);
    const recognitionRef = useRef(null);
    const vt = t('voiceSystem') || {};

    const townMapping = TN_LOCATION_DATA;

    const getSafeVtValue = (path, fallback = '') => {
        const keys = path.split('.');
        let val = vt;
        for (const k of keys) {
            val = val?.[k];
        }
        return val || fallback;
    };

    // --- INITIALIZATION ---

    // Real-time Weather Fetch
    useEffect(() => {
        const fetchWeather = async () => {
            if (selectedTown && selectedDistrict) {
                setIsWeatherLoading(true);
                try {
                    const res = await axios.get(`/api/weather?location=${selectedTown},${selectedDistrict}`);
                    setWeatherData(res.data);
                } catch (err) {
                    console.error("Weather Fetch Error:", err);
                } finally {
                    setIsWeatherLoading(false);
                }
            }
        };
        fetchWeather();
    }, [selectedTown, selectedDistrict]);

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
                handleVoiceCommand(currentTranscript.toLowerCase());
            }
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, [language]);

    // --- ACTIONS ---

    const handleVoiceToggle = () => {
        if (!isVoiceActive) {
            setIsVoiceActive(true);
            setIsInsightOpen(false); // Close insight if opening voice
            speak(getSafeVtValue('greet', 'Hello'));
        } else {
            setIsVoiceActive(false);
            setIsListening(false);
            if (recognitionRef.current) recognitionRef.current.stop();
            cancel();
        }
    };

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            setVoiceResponse('');
            recognitionRef.current.start();
        }
    };

    const handleVoiceCommand = async (cmd) => {
        setIsVoiceProcessing(true);

        // Navigation Commands
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
                setIsVoiceActive(false);
            });
            setVoiceResponse(msg);
            setIsVoiceProcessing(false);
            return;
        }

        // Explanation Commands
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
            setVoiceResponse(explanation);
            setLastVoiceResponse(explanation);
            setIsVoiceProcessing(false);
            return;
        }

        // Control Commands
        const repeatKeys = language === 'ta' ? ['மீண்டும்', 'திரும்ப'] : ['repeat', 'say again'];
        const slowKeys = language === 'ta' ? ['மெதுவாக', 'மெது'] : ['slow down', 'speak slowly'];

        if (repeatKeys.some(k => cmd.includes(k))) {
            speak(getSafeVtValue('repeatLast', 'Repeating.'), () => speak(lastVoiceResponse, null, { rate: speechRate }));
            setIsVoiceProcessing(false);
            return;
        }

        if (slowKeys.some(k => cmd.includes(k))) {
            const newRate = 0.7;
            setSpeechRate(newRate);
            speak(getSafeVtValue('slowDown', 'Speaking slower.'), () => speak(lastVoiceResponse, null, { rate: newRate }));
            setIsVoiceProcessing(false);
            return;
        }

        // Fallback Q&A
        try {
            const res = await axios.post('/api/ask-twin', {
                doubt: cmd,
                context: 'Hub voice command',
                language: language
            });
            const answer = res.data.answer;
            setVoiceResponse(answer);
            setLastVoiceResponse(answer);
            speak(answer, null, { rate: speechRate });
        } catch (error) {
            speak(getSafeVtValue('notUnderstood', "Sorry, I didn't understand."));
            setVoiceResponse(getSafeVtValue('notUnderstood', "Sorry, I didn't understand."));
        } finally {
            setIsVoiceProcessing(false);
        }
    };

    // --- DATA HELPERS ---

    const getSeasonGuardianData = () => {
        const month = new Date().getMonth();
        let season = 'SUMMER';
        if (month >= 5 && month <= 8) season = 'RAINY';
        else if (month >= 9 && month <= 10) season = 'AUTUMN';
        else if (month === 11 || month <= 1) season = 'WINTER';

        const data = SEASONAL_DATA[language]?.[season] || SEASONAL_DATA['en'][season];
        return {
            season: data.label,
            advisory: data.advisory,
            riskLevel: t('featureHub.riskLevel.safe'),
            action: data.advisory.general
        };
    };

    const getFieldMemory = () => {
        const month = new Date().getMonth();
        const seasonNames = {
            en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            ta: ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"]
        };
        const displayLang = seasonNames[language] ? language : 'en';
        const currentMonthName = seasonNames[displayLang][month];

        if (language === 'ta') {
            return `கடந்த ஆண்டு ${currentMonthName} மாதத்தில், உங்கள் பயிருக்குத் தேவையான ஊட்டச்சத்துக்களைப் பெற்று ஆரோக்கியமாக வளர்ந்தது.`;
        }
        return `Last year in ${currentMonthName}, your field conditions were stable and crop health was optimal.`;
    };

    const getDecisionConfidence = () => [
        { id: 'sell', label: t('sellCrop'), status: 'safe', reason: language === 'ta' ? 'சந்தை விலை சீராக உள்ளது.' : 'Market price is stable.' },
        { id: 'invest', label: t('buyFertilizer'), status: 'caution', reason: language === 'ta' ? 'விலை மாற்றம் எதிர்பார்க்கப்படுகிறது.' : 'Price fluctuations expected.' },
        { id: 'wait', label: t('waitObserve'), status: 'safe', reason: language === 'ta' ? 'வானிலை சாதகமாக உள்ளது.' : 'Weather is favorable.' }
    ];

    const guardianData = getSeasonGuardianData();
    const memoryText = getFieldMemory();
    const confidenceSignals = getDecisionConfidence();

    return (
        <div className="fixed bottom-12 right-12 z-[1000] flex flex-col items-end gap-6">

            {/* 1. VOICE HUD OVERLAY */}
            {isVoiceActive && (
                <div className={`p-8 rounded-[3rem] border backdrop-blur-3xl shadow-2xl transition-all duration-500 w-80 animate-in slide-in-from-bottom-8 ${isDarkMode ? 'bg-[#0F172A]/90 border-white/10 text-white' : 'bg-white/90 border-slate-200 text-slate-900'}`}>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-red-500 animate-pulse scale-125' : 'bg-nature-medium'}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                                {isListening ? getSafeVtValue('listening', 'Listening') : isVoiceProcessing ? getSafeVtValue('processing', 'Processing') : language === 'ta' ? 'தமிழ்' : 'English'}
                            </span>
                        </div>
                        <button onClick={() => setIsVoiceActive(false)} className="p-2 opacity-20 hover:opacity-100 hover:bg-black/5 rounded-full transition-all">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {transcript && <p className="text-sm font-bold opacity-60 italic leading-tight">"{transcript}"</p>}
                        {voiceResponse && (
                            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                <p className="text-sm font-black leading-relaxed">{voiceResponse}</p>
                            </div>
                        )}
                        {!transcript && !voiceResponse && (
                            <p className="text-[11px] font-black uppercase tracking-wider opacity-30 text-center py-6">
                                {language === 'ta' ? 'எப்படி உதவ முடியும்?' : 'Awaiting Command...'}
                            </p>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex gap-3 mt-8">
                        <button onClick={() => handleVoiceCommand(language === 'ta' ? 'மீண்டும்' : 'repeat')} className="flex-1 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex items-center justify-center gap-2">
                            <Repeat size={14} />
                            <span className="text-[9px] font-black uppercase">Repeat</span>
                        </button>
                        <button onClick={() => handleVoiceCommand(language === 'ta' ? 'மெதுவாக' : 'slow down')} className="flex-1 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all flex items-center justify-center gap-2">
                            <TrendingDown size={14} />
                            <span className="text-[9px] font-black uppercase">Slower</span>
                        </button>
                    </div>
                </div>
            )}

            {/* 2. INSIGHT PANEL OVERLAY */}
            {isInsightOpen && (
                <div className="w-80 md:w-[440px] animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <IntelligenceCard
                        title={t('featureHub.iconLabel')}
                        subtitle="Institutional Insight Stream"
                        depth="modal"
                        isDarkMode={isDarkMode}
                        icon={Compass}
                        className="border-nature-medium/20"
                    >
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar-minimal pr-2 -mr-2">
                            {/* District Selection Area */}
                            <div className="mb-8 border-b border-black/5 dark:border-white/5 pb-8">
                                <div className="flex flex-col gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <button onClick={() => { setShowDistrictList(!showDistrictList); setShowTownList(false); }} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                                <span className="text-xs font-bold uppercase">{t(`featureHub.districts.${selectedDistrict}`)}</span>
                                                <ChevronDown size={14} />
                                            </button>
                                            {showDistrictList && (
                                                <div className={`absolute bottom-full left-0 right-0 mb-3 rounded-2xl border backdrop-blur-3xl z-[150] overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#0D1611]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
                                                    <div className="max-h-60 overflow-y-auto p-2">
                                                        {Object.keys(townMapping).map(d => (
                                                            <button key={d} onClick={() => { setSelectedDistrict(d); setSelectedTown(townMapping[d][0]); setShowDistrictList(false); }} className={`w-full px-4 py-3 rounded-xl text-left text-[10px] font-black uppercase tracking-widest transition-colors ${selectedDistrict === d ? 'bg-nature-medium text-white' : 'hover:bg-white/5'}`}>
                                                                {t(`featureHub.districts.${d}`)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <button onClick={() => { setShowTownList(!showTownList); setShowDistrictList(false); }} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                                <span className="text-xs font-bold uppercase">{t(`featureHub.towns.${selectedTown}`)}</span>
                                                <ChevronDown size={14} />
                                            </button>
                                            {showTownList && (
                                                <div className={`absolute bottom-full left-0 right-0 mb-3 rounded-2xl border backdrop-blur-3xl z-[150] overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#0D1611]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
                                                    <div className="max-h-60 overflow-y-auto p-2">
                                                        {townMapping[selectedDistrict].map(town => (
                                                            <button key={town} onClick={() => { setSelectedTown(town); setShowTownList(false); }} className={`w-full px-4 py-3 rounded-xl text-left text-[10px] font-black uppercase tracking-widest transition-colors ${selectedTown === town ? 'bg-nature-medium text-white' : 'hover:bg-white/5'}`}>
                                                                {t(`featureHub.towns.${town}`)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Weather Grid */}
                                    {weatherData && (
                                        <div className="grid grid-cols-4 gap-3">
                                            {[
                                                { icon: Thermometer, val: `${weatherData.temp}°`, color: 'text-orange-500' },
                                                { icon: Droplets, val: `${weatherData.humidity}%`, color: 'text-blue-500' },
                                                { icon: Wind, val: weatherData.wind, color: 'text-emerald-500' },
                                                { icon: CloudRain, val: weatherData.condition, color: 'text-harvest-gold', isText: true }
                                            ].map((item, i) => (
                                                <div key={i} className={`p-4 rounded-2xl border flex flex-col items-center gap-1 ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                                                    <item.icon size={14} className={item.color} />
                                                    <span className={`text-${item.isText ? '[9px]' : '[12px]'} font-bold text-center leading-tight`}>{item.val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* TABS */}
                            <div className="flex gap-2 mb-8 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5">
                                {['guardian', 'memory', 'confidence'].map(tab => (
                                    <button key={tab} onClick={() => { setActiveTab(tab); cancel(); }} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-nature-medium text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}>
                                        {language === 'ta' ? (tab === 'guardian' ? 'பாதுகாப்பு' : tab === 'memory' ? 'நினைவு' : 'சமிக்ஞை') : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <div className="min-h-[220px]">
                                {activeTab === 'guardian' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{guardianData.season}</span>
                                                <h4 className="text-sm font-bold">{t('featureHub.seasonGuardian')}</h4>
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase border border-emerald-500/20">{guardianData.riskLevel}</div>
                                        </div>
                                        <p className="text-xs leading-relaxed opacity-70 font-medium">{guardianData.action}</p>
                                        <div className="p-4 rounded-2xl bg-nature-medium/5 border border-nature-medium/10">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle size={14} className="text-nature-medium mt-0.5" />
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-nature-medium">Institutional Alert</span>
                                                    <span className="text-[10px] font-bold leading-tight opacity-70">{guardianData.advisory.pest_alert}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'memory' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-harvest-gold/10 text-harvest-gold"><History size={16} /></div>
                                            <h4 className="text-sm font-bold">{t('featureHub.fieldMemory')}</h4>
                                        </div>
                                        <p className={`text-xs leading-relaxed font-medium italic opacity-70`}>"{memoryText}"</p>
                                        <div className="pt-4 border-t border-black/5 dark:border-white/5"><span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">Field Integrity: 100% Truth Verified</span></div>
                                    </div>
                                )}

                                {activeTab === 'confidence' && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <h4 className="text-sm font-bold mb-4">{t('featureHub.decisionConfidence')}</h4>
                                        {confidenceSignals.map(signal => (
                                            <div key={signal.id} className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] font-black uppercase tracking-wider">{signal.label}</span>
                                                    {signal.status === 'safe' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Info size={14} className="text-harvest-gold" />}
                                                </div>
                                                <p className="text-[10px] font-medium opacity-60 leading-tight">{signal.reason}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </IntelligenceCard>
                </div>
            )}

            {/* 3. MAIN UNIFIED TRIGGER SYMBOL */}
            <div className="relative group">
                {/* Secondary Voice Action Button (appears when hovering hub) */}
                <button
                    onClick={handleVoiceToggle}
                    className={`absolute -top-20 right-0 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl scale-0 group-hover:scale-100 delay-75 ${isVoiceActive ? 'bg-red-500 scale-100' : 'bg-emerald-600 hover:bg-emerald-500'} text-white z-[1100]`}
                >
                    {isVoiceActive ? <MicOff size={24} /> : <Mic size={24} />}
                </button>

                {/* Primary Hub Trigger - THE OMNI-NODE (GLOBAL ENTERPRISE) */}
                <div className="relative group">
                    <style>{`
                        @keyframes orbital-spin {
                            0% { transform: rotate(0deg) translateX(44px) rotate(0deg); }
                            100% { transform: rotate(360deg) translateX(44px) rotate(-360deg); }
                        }
                        @keyframes liquid-pulse {
                            0%, 100% { opacity: 0.3; transform: scale(1); }
                            50% { opacity: 0.8; transform: scale(1.1); filter: blur(2px); }
                        }
                        @keyframes scan-line-hub {
                            0% { transform: translateY(-100%); opacity: 0; }
                            50% { opacity: 1; }
                            100% { transform: translateY(100%); opacity: 0; }
                        }
                    `}</style>

                    <button
                        onClick={() => { setIsInsightOpen(!isInsightOpen); if (isVoiceActive) setIsVoiceActive(false); }}
                        className={`
                            relative p-3 rounded-[1.2rem] border transition-all duration-1000 active:scale-90
                            ${isDarkMode
                                ? 'bg-[#040806]/90 border-emerald-500/40 shadow-[0_0_40px_rgba(0,0,0,1)]'
                                : 'bg-white/80 border-nature-deep/10 shadow-2xl backdrop-blur-xl'
                            }
                            ${isInsightOpen ? 'border-emerald-400 ring-4 ring-emerald-500/10 shadow-[0_0_60px_rgba(16,185,129,0.4)]' : 'hover:border-emerald-400/80'}
                        `}
                    >
                        {/* THE LIQUID BORDER FX */}
                        <div className="absolute inset-[-1px] rounded-[1.2rem] bg-gradient-to-tr from-emerald-500/40 via-transparent to-emerald-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* GLOBAL UPLINK ORBITALS */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="absolute w-[80px] h-[80px] border-[0.5px] border-emerald-500/10 rounded-full animate-[spin_15s_linear_infinite]" />
                            <div className="absolute w-[80px] h-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_12px_#34d399] animate-[orbital-spin_8s_linear_infinite]" />
                            </div>
                        </div>

                        {/* OMNI-CORE VISUAL ARCHITECTURE */}
                        <div className="relative w-11 h-11 flex items-center justify-center overflow-hidden rounded-xl">
                            {/* Scanning Laser HUD */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-[scan-line-hub_3s_linear_infinite] z-20" />

                            {/* THE CPU CHIPSET SYMBOL */}
                            <Cpu
                                size={38}
                                className={`absolute transform transition-all duration-1000 ${isInsightOpen ? 'scale-110 text-emerald-300 rotate-180 brightness-150' : 'text-emerald-500/20 opacity-30 group-hover:opacity-100 group-hover:scale-105'}`}
                                strokeWidth={0.4}
                            />

                            {/* CORE TELEMETRY INDICATORS */}
                            <div className="relative flex items-center gap-2 z-30">
                                <div className="flex flex-col items-center">
                                    <Compass
                                        size={18}
                                        strokeWidth={1}
                                        className={`transition-all duration-700 ${isInsightOpen ? 'text-emerald-300 scale-125 drop-shadow-[0_0_10px_#34d399]' : 'text-emerald-600/60 dark:text-emerald-400/40 group-hover:rotate-[360deg] group-hover:text-emerald-400'}`}
                                    />
                                </div>

                                <div className={`w-[0.5px] h-4 transition-all duration-1000 ${isInsightOpen || isVoiceActive ? 'bg-emerald-400 h-6' : 'bg-emerald-500/10'}`} />

                                <div className="flex flex-col items-center">
                                    <Mic
                                        size={18}
                                        strokeWidth={1}
                                        className={`transition-all duration-700 ${isVoiceActive ? 'text-red-400 scale-125 drop-shadow-[0_0_10px_#f87171]' : 'text-emerald-600/60 dark:text-emerald-400/40 group-hover:scale-110 group-hover:text-emerald-400'}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* HIGH-PRECISION STATUS PINS */}
                        <div className="absolute top-1 right-1 flex gap-0.5">
                            <div className={`w-0.5 h-2 rounded-full ${isInsightOpen ? 'bg-emerald-400' : 'bg-emerald-500/20'} transition-colors duration-1000`} />
                            <div className={`w-0.5 h-2 rounded-full ${isVoiceActive ? 'bg-red-400' : 'bg-emerald-500/20'} transition-colors duration-1000 delay-100`} />
                        </div>
                    </button>

                    {/* ENTERPRISE-LEVEL HOLOGRAPHIC LABELS */}
                    {!isInsightOpen && !isVoiceActive && (
                        <div className="absolute right-full mr-10 top-1/2 -translate-y-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none transform translate-x-10 group-hover:translate-x-0">
                            <div className="flex flex-col items-end gap-1">
                                <div className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                                    <span className="text-[7px] font-black text-emerald-400 uppercase tracking-[0.3em]">Institutional_Grid_Live</span>
                                </div>
                                <div className="px-5 py-3 rounded-[1.2rem] bg-black/90 backdrop-blur-[100px] border border-emerald-400/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">OMNI_LINK v10.0</span>
                                        </div>
                                        <span className="text-[6px] font-bold uppercase tracking-[0.2em] text-emerald-500/40">Sovereign Intelligent Nexus • Global Access</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-12 h-[0.5px] bg-gradient-to-l from-emerald-500 via-emerald-500/20 to-transparent" />
                        </div>
                    )}
                </div>

                {/* One-tap voice listen (only if active) */}
                {isVoiceActive && !isListening && (
                    <button
                        onClick={startListening}
                        className="absolute -top-32 right-3 w-10 h-10 rounded-full bg-nature-deep text-white flex items-center justify-center shadow-lg animate-bounce hover:scale-110 transition-transform z-[1200]"
                    >
                        <Play size={16} fill="currentColor" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default IntelligenceHub;

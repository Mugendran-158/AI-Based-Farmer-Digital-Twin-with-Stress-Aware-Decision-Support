import React, { useState, useEffect } from 'react';
import { ShieldCheck, History, Activity, AlertCircle, CheckCircle2, Info, Compass, CloudRain, Thermometer, Droplets, Wind, MapPin, ChevronDown, Search, Cpu } from 'lucide-react';
import IntelligenceCard from './legendary/IntelligenceCard';
import { SEASONAL_DATA } from '../data/seasonalData';
import { TN_LOCATION_DATA } from '../data/tamilnaduLocations';

const FarmerInsightIcon = ({ t, language, isDarkMode, selectedDistrict, setSelectedDistrict, selectedTown, setSelectedTown }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('guardian'); // 'guardian', 'memory', 'confidence'
    const [weatherData, setWeatherData] = useState(null);
    const [isWeatherLoading, setIsWeatherLoading] = useState(false);
    const [showTownList, setShowTownList] = useState(false);
    const [showDistrictList, setShowDistrictList] = useState(false);

    const townMapping = TN_LOCATION_DATA;

    // Real-time Weather Fetch
    useEffect(() => {
        const fetchWeather = async () => {
            if (selectedTown && selectedDistrict) {
                setIsWeatherLoading(true);
                try {
                    const axios = (await import('axios')).default;
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
            ta: ["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"],
            hi: ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"],
            ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        };
        const supportedLangs = Object.keys(seasonNames);
        const displayLang = supportedLangs.includes(language) ? language : 'en';
        const currentMonthName = seasonNames[displayLang][month];

        if (language === 'ta') {
            return `கடந்த ஆண்டு ${currentMonthName} மாதத்தில், உங்கள் பயிருக்குத் தேவையான ஊட்டச்சத்துக்களைப் பெற்று ஆரோக்கியமாக வளர்ந்தது. இந்த ஆண்டும் அதே தட்பவெப்ப நிலை நிலவுவதால், உங்கள் முந்தைய அறுவடை முறையைப் பின்பற்றுவது நல்ல பலனைத் தரும்.`;
        }
        if (language === 'ja') {
            return `去年の${currentMonthName}、あなたの圃場の状態は安定しており、作物の健康状態は最適でした。現在の季節の指標に基づき、以前の灌漑のタイミングを再現することが、一貫した収穫量のために推奨されます。`;
        }
        return `Last year in ${currentMonthName}, your field conditions were stable and crop health was optimal. Based on current seasonal markers, replicating your previous irrigation timing is advised for consistent yield.`;
    };

    const getDecisionConfidence = () => {
        return [
            { id: 'sell', label: t('sellCrop'), status: 'safe', reason: language === 'ta' ? 'சந்தை விலை வரலாற்று சராசரியை விட 5% அதிகமாக உள்ளது.' : 'Market price is 5% above historical baseline.' },
            { id: 'invest', label: t('buyFertilizer'), status: 'caution', reason: language === 'ta' ? 'அடுத்த வாரம் விலை குறைய வாய்ப்புள்ளது.' : 'Input prices are expected to drop next week.' },
            { id: 'wait', label: t('waitObserve'), status: 'safe', reason: language === 'ta' ? 'அடுத்த சில நாட்களில் வானிலை சீராக இருக்கும்.' : 'Weather pattern is stable for the next 7 days.' }
        ];
    };

    const guardianData = getSeasonGuardianData();
    const memoryText = getFieldMemory();
    const confidenceSignals = getDecisionConfidence();

    return (
        <div className="fixed bottom-48 right-12 z-[1000]">
            <button
                id="farmer-insight-trigger"
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative p-6 rounded-[2.5rem] border transition-all duration-700 hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-nature-deep/40 border-white/5 shadow-2xl' : 'bg-white border-nature-deep/10 shadow-xl'}`}
            >
                <div className="absolute inset-0 rounded-[2.5rem] bg-nature-medium/5 blur-xl group-hover:bg-nature-medium/10 transition-colors" />
                <Compass size={36} strokeWidth={1} className={`relative z-10 transition-transform duration-700 group-hover:rotate-45 ${isDarkMode ? 'text-nature-light' : 'text-nature-deep'}`} />
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-nature-medium border-2 border-inherit animate-pulse z-20" />

                {/* AI Symbol Badge */}
                <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-500 z-20 shadow-lg ${isDarkMode ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200 shadow-emerald-500/20'} group-hover:scale-110 group-hover:rotate-12`}>
                    <Cpu size={14} className="text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
                </div>

                <span className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isDarkMode ? 'bg-black/60 text-white' : 'bg-white/80 text-nature-deep shadow-sm'}`}>
                    {t('featureHub.iconLabel')}
                </span>
            </button>

            {isOpen && (
                <div className="absolute bottom-24 right-0 w-80 md:w-[440px] animate-in slide-in-from-bottom-10 fade-in duration-500">
                    <IntelligenceCard
                        title={t('featureHub.iconLabel')}
                        subtitle="Institutional Insight Stream"
                        depth="modal"
                        isDarkMode={isDarkMode}
                        icon={Compass}
                        className="border-nature-medium/20"
                    >
                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar-minimal pr-2 -mr-2">
                            {/* 📍 DISTRICT SELECTION HEADER - RELOCATED & ENHANCED */}
                            <div className="mb-8 border-b border-black/5 dark:border-white/5 pb-8">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-emerald-500" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{t('featureHub.selectDistrict')}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Activity size={16} className="text-blue-500" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{t('featureHub.selectTown')}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[8px] font-black uppercase tracking-widest opacity-30">Live Uplink</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    setShowDistrictList(!showDistrictList);
                                                    setShowTownList(false);
                                                }}
                                                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                                            >
                                                <span className="text-xs font-bold tracking-tight uppercase">
                                                    {t(`featureHub.districts.${selectedDistrict}`)}
                                                </span>
                                                <ChevronDown size={14} className={`transition-transform duration-500 ${showDistrictList ? 'rotate-180' : ''}`} />
                                            </button>

                                            {showDistrictList && (
                                                <div className={`absolute top-full left-0 right-0 mt-3 rounded-2xl border backdrop-blur-3xl z-[110] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#0D1611]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
                                                    <div className="grid grid-cols-1 gap-1 p-2 max-h-72 overflow-y-auto custom-scrollbar-minimal">
                                                        {Object.keys(townMapping).map(d => (
                                                            <button
                                                                key={d}
                                                                onClick={() => {
                                                                    setSelectedDistrict(d);
                                                                    setSelectedTown(townMapping[d][0]);
                                                                    setShowDistrictList(false);
                                                                }}
                                                                className={`px-4 py-3 rounded-xl text-left text-[10px] font-black uppercase tracking-widest transition-colors ${selectedDistrict === d ? 'bg-nature-medium text-white shadow-lg' : (isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-slate-100 text-slate-600')}`}
                                                            >
                                                                {t(`featureHub.districts.${d}`)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative">
                                            <button
                                                onClick={() => {
                                                    setShowTownList(!showTownList);
                                                    setShowDistrictList(false);
                                                }}
                                                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                                            >
                                                <span className="text-xs font-bold tracking-tight uppercase">
                                                    {t(`featureHub.towns.${selectedTown}`)}
                                                </span>
                                                <ChevronDown size={14} className={`transition-transform duration-500 ${showTownList ? 'rotate-180' : ''}`} />
                                            </button>

                                            {showTownList && (
                                                <div className={`absolute top-full left-0 right-0 mt-3 rounded-2xl border backdrop-blur-3xl z-[110] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 ${isDarkMode ? 'bg-[#0D1611]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
                                                    <div className="grid grid-cols-1 gap-1 p-2 max-h-72 overflow-y-auto custom-scrollbar-minimal">
                                                        {townMapping[selectedDistrict].map(town => (
                                                            <button
                                                                key={town}
                                                                onClick={() => {
                                                                    setSelectedTown(town);
                                                                    setShowTownList(false);
                                                                }}
                                                                className={`px-4 py-3 rounded-xl text-left text-[10px] font-black uppercase tracking-widest transition-colors ${selectedTown === town ? 'bg-nature-medium text-white shadow-lg' : (isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-slate-100 text-slate-600')}`}
                                                            >
                                                                {t(`featureHub.towns.${town}`)}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Weather Data Integrated - Grid Layout */}
                                    {isWeatherLoading ? (
                                        <div className="flex items-center justify-center py-6">
                                            <Activity size={24} className="text-nature-medium animate-spin" />
                                        </div>
                                    ) : weatherData && (
                                        <div className="grid grid-cols-4 gap-3">
                                            <div className={`p-4 rounded-2xl border flex flex-col items-center gap-1 ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                                                <Thermometer size={14} className="text-orange-500" />
                                                <span className="text-[12px] font-bold">{weatherData.temp}°</span>
                                            </div>
                                            <div className={`p-4 rounded-2xl border flex flex-col items-center gap-1 ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                                                <Droplets size={14} className="text-blue-500" />
                                                <span className="text-[12px] font-bold">{weatherData.humidity}%</span>
                                            </div>
                                            <div className={`p-4 rounded-2xl border flex flex-col items-center gap-1 ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                                                <Wind size={14} className="text-emerald-500" />
                                                <span className="text-[12px] font-bold">{weatherData.wind}</span>
                                            </div>
                                            <div className={`p-4 rounded-2xl border flex flex-col items-center gap-1 ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                                                <CloudRain size={14} className="text-harvest-gold" />
                                                <span className="text-[9px] font-black uppercase text-center leading-none mt-1">{weatherData.condition}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* TABS */}
                            <div className="flex gap-2 mb-8 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 sticky top-0 z-10 backdrop-blur-sm">
                                <button onClick={() => setActiveTab('guardian')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'guardian' ? 'bg-nature-medium text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}>
                                    {language === 'ta' ? 'பாதுகாப்பு' : 'Guardian'}
                                </button>
                                <button onClick={() => setActiveTab('memory')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'memory' ? 'bg-nature-medium text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}>
                                    {language === 'ta' ? 'நினைவு' : 'Recall'}
                                </button>
                                <button onClick={() => setActiveTab('confidence')} className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${activeTab === 'confidence' ? 'bg-nature-medium text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}>
                                    {language === 'ta' ? 'சமிக்ஞை' : 'Signal'}
                                </button>
                            </div>

                            <div className="min-h-[220px]">
                                {activeTab === 'guardian' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{guardianData.season}</span>
                                                <h4 className="text-sm font-bold">{t('featureHub.seasonGuardian')}</h4>
                                            </div>
                                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">{guardianData.riskLevel}</div>
                                        </div>
                                        <p className={`text-xs leading-relaxed font-medium ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>{guardianData.action}</p>
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
                                        <p className={`text-xs leading-relaxed font-medium italic ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}>"{memoryText}"</p>
                                        <div className="pt-4 border-t border-black/5 dark:border-white/5"><span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">Field Integrity: 100% Truth</span></div>
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

                        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex items-center gap-3">
                            <ShieldCheck size={14} className="text-nature-medium" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-30">Real-Time Data Uplink • Truth-Verified</span>
                        </div>

                    </IntelligenceCard>
                </div>
            )}
        </div>
    );
};

export default FarmerInsightIcon;

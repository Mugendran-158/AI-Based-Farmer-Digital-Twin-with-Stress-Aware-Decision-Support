import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import GenerativeFarmWorld from './GenerativeFarmWorld';
import SeasonToggleButton from './seasonal/SeasonToggleButton';
import SeasonController from './seasonal/SeasonController';
import SeasonalInsightPortal from './seasonal/SeasonalInsightPortal';
import AIHumanButton from './seasonal/AIHumanButton';
import AIHumanChat from './seasonal/AIHumanChat';
import { useAuth } from '../context/AuthContext';
// NEW: Import Language Data
import { TRANSLATIONS } from '../data/translations';
import IntrusionAlertManager from './intrusion/IntrusionAlertManager';
import ReportIntrusionModal from './intrusion/ReportIntrusionModal';
import LiveCameraMonitor from './intrusion/LiveCameraMonitor';
import {
    LayoutDashboard,
    ShieldAlert,
    Video,
    Moon,
    Sun,
    Languages,
    CloudSun,
    X,
    Compass
} from 'lucide-react';


const SmartAgricultureWorld = ({ isDarkMode: globalIsDarkMode }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeZone, setActiveZone] = useState(null);
    const [activeSeason, setActiveSeason] = useState('SUMMER'); // Default Season
    const [showSeasonalPortal, setShowSeasonalPortal] = useState(false);
    // NEW: State for Multi-Language Support
    const [language, setLanguage] = useState('en'); // Default: English ('en', 'ta', 'hi')

    // Dark/Light Mode State
    const [isDarkMode, setIsDarkMode] = useState(globalIsDarkMode ?? true);

    useEffect(() => {
        setIsDarkMode(globalIsDarkMode ?? true);
    }, [globalIsDarkMode]);

    // Save theme preference
    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('appTheme', newMode ? 'dark' : 'light');
        window.dispatchEvent(new CustomEvent('themeChange', { detail: newMode ? 'dark' : 'light' }));
    };

    // Day Cycle State
    const [showAiChat, setShowAiChat] = useState(false);
    const [showSeasons, setShowSeasons] = useState(false);

    // Intrusion Alert State
    const [showReportModal, setShowReportModal] = useState(false);
    const [activeAlert, setActiveAlert] = useState(null);
    const [showCamera, setShowCamera] = useState(false);

    const handleNewAlert = (alert) => {
        setActiveAlert(alert);
        // Auto-clear after 10 seconds
        setTimeout(() => setActiveAlert(null), 10000);
    };

    const handleCameraDetection = async (detection) => {
        // Automatically report to backend
        try {
            const response = await fetch('http://127.0.0.1:5000/api/intrusion/report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    animal: detection.animal,
                    severity: 'High',
                    location: { name: 'Live Camera Feed' },
                    timestamp: new Date().toISOString()
                })
            });
            // Note: Use the SSE event to show the banner to avoid duplicate logic
            if (response.ok) {
                console.log("Camera alert reported");
            }
        } catch (e) {
            console.error(e);
        }
    };


    // Contextual readiness state
    const readiness = user?.last_readiness || 'READY';

    const handleZoneClick = (zone) => {
        const zoneDetails = {
            crops: {
                id: 'crops',
                label: 'Bioluminescent Crops',
                icon: '🌱',
                type: 'Biological',
            },
            tractor: {
                id: 'tractor',
                label: 'Autonomous Tractor',
                icon: '🚜',
                type: 'Robotics',
                warning: readiness === 'CAUTION'
            },
            drone: {
                id: 'drone',
                label: 'Spectral Scanner',
                icon: '🛸',
                type: 'Surveillance'
            },
            monolith: {
                id: 'monolith',
                label: 'Data Monolith',
                icon: '❖',
                type: 'Core System'
            }
        };
        setActiveZone(zoneDetails[zone]);
    };

    const closeModal = () => setActiveZone(null);

    return (
        <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className={`text-4xl font-black tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                            Institutional <span className="opacity-40">Ecosystem</span>
                        </h1>
                        <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${isDarkMode ? 'text-nature-light' : 'text-nature-medium'}`}>
                            Growth Orchestration & Remote Intelligence Management
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-white border border-slate-200 shadow-sm hover:border-emerald-500/50'}`}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-400" />}
                        </button>
                    </div>
                </div>

                <div className={`relative rounded-[3.5rem] overflow-hidden border shadow-2xl min-h-[650px] transition-all duration-1000 ${isDarkMode ? 'bg-black/60 border-white/5' : 'bg-white border-nature-deep/5'}`}>
                    <GenerativeFarmWorld
                        activeZone={activeZone}
                        activeSeason={activeSeason}
                        showSeasonalPortal={showSeasonalPortal}
                        onZoneClick={handleZoneClick}
                        onCaveClick={() => setShowSeasonalPortal(true)}
                        language={language}
                        setLanguage={setLanguage}
                        timeOverride={null}
                        isDarkMode={isDarkMode}
                        activeAlert={activeAlert}
                    />

                    {/* Season Toggle Overlay */}
                    <div className="absolute top-8 right-8 z-50">
                        <button
                            onClick={() => setShowSeasons(!showSeasons)}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl border ${isDarkMode ? 'bg-nature-deep border-white/10 hover:border-white/20' : 'bg-white border-nature-deep/10 hover:border-nature-deep/20'} hover:scale-110 active:scale-95`}
                        >
                            <CloudSun className={`w-5 h-5 ${isDarkMode ? 'text-nature-light' : 'text-nature-medium'}`} />
                        </button>
                    </div>
                </div>

                {/* --- STANDARD GRID-COMPATIBLE ALERTS --- */}
                {activeAlert && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between text-red-700 dark:text-red-300">
                        <div className="flex items-center gap-3">
                            <ShieldAlert className="w-5 h-5 animate-pulse" />
                            <div>
                                <h3 className="font-bold text-sm uppercase tracking-wider">Security Protocol Active</h3>
                                <p className="text-xs opacity-80">{activeAlert.animal} detected in {activeAlert.location.name || 'Sector 1'}</p>
                            </div>
                        </div>
                        <button onClick={() => setActiveAlert(null)} className="p-2 hover:bg-red-500/10 rounded-full transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* LOGIC & MODALS */}
                <IntrusionAlertManager onAlert={handleNewAlert} />

                <AIHumanChat
                    isOpen={showAiChat}
                    onClose={() => setShowAiChat(false)}
                    season={activeSeason}
                    language={language}
                />

                {showSeasonalPortal && (
                    <SeasonalInsightPortal
                        season={activeSeason}
                        onClose={() => setShowSeasonalPortal(false)}
                        language={language}
                    />
                )}

                {activeZone && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-nature-deep/40 backdrop-blur-xl" onClick={closeModal}>
                        <div className={`relative rounded-[3rem] p-12 max-w-lg w-full shadow-2xl border transition-all duration-700 animate-scale-in ${isDarkMode ? 'bg-black/80 border-white/10' : 'bg-white border-nature-deep/10'}`} onClick={e => e.stopPropagation()}>
                            <button onClick={closeModal} className={`absolute top-6 right-6 p-3 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/5 text-white/40 hover:text-white' : 'hover:bg-nature-deep/5 text-nature-deep/40 hover:text-nature-deep'}`}><X size={20} /></button>

                            <div className={`flex items-start gap-6 mb-8 pb-8 border-b ${isDarkMode ? 'border-white/5' : 'border-nature-deep/5'}`}>
                                <div className="text-6xl filter drop-shadow-lg">{activeZone.icon}</div>
                                <div>
                                    <h3 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{activeZone.label}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="w-2 h-2 rounded-full bg-nature-medium animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-medium">{activeZone.type} Thread</span>
                                    </div>
                                </div>
                            </div>
                            <p className={`system-body text-base leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-nature-deep/60'}`}>Detailed metrics for the {activeZone.label.toLowerCase()} subsystem are currently aggregating from the distributed sensor node network within this sector.</p>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-12 py-6 text-center border-t border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                        All visual indicators are derived from real environmental data.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SmartAgricultureWorld;

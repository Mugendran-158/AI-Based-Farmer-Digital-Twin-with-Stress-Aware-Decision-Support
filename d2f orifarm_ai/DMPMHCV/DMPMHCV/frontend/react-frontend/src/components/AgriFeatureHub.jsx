import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Brain,
    Dna,
    Mic,
    ShieldAlert,
    CircleDollarSign,
    Globe,
    Workflow,
    Search,
    X,
    ChevronRight,
    Command,
    Activity,
    Cpu,
    ArrowRight,
    Wifi,
    Zap
} from 'lucide-react';

const AgriFeatureHub = ({ t, language, isDarkMode, onAskDoubt, onEnterWorld, isLoading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);
    const navigate = useNavigate();

    // Monitor connectivity in real-time
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Strictly Localized Modules
    const modules = useMemo(() => [
        {
            id: 'ai-farmer',
            name: t('modules.aiFarmer'),
            summary: t('modules.aiFarmerSub'),
            description: t('modules.aiFarmerDesc'),
            icon: <Brain />,
            path: '/ai-farmer',
            accent: '#10b981'
        },
        {
            id: 'crop-analyzer',
            name: t('modules.cropAnalyzer'),
            summary: t('modules.cropAnalyzerSub'),
            description: t('modules.cropAnalyzerDesc'),
            icon: <Dna />,
            path: '/crop-analyzer',
            accent: '#22c55e'
        },
        {
            id: 'voice-assistant',
            name: t('modules.voiceAssistant'),
            summary: t('modules.voiceAssistantSub'),
            description: t('modules.voiceAssistantDesc'),
            icon: <Mic />,
            path: '/voice-assistant',
            accent: '#3b82f6'
        },
        {
            id: 'safety-twin',
            name: t('modules.safetyTwin'),
            summary: t('modules.safetyTwinSub'),
            description: t('modules.safetyTwinDesc'),
            icon: <ShieldAlert />,
            path: '/safety-twin',
            accent: '#f43f5e'
        },
        {
            id: 'market-prices',
            name: t('modules.marketIntel'),
            summary: t('modules.marketIntelSub'),
            description: t('modules.marketIntelDesc'),
            icon: <CircleDollarSign />,
            path: '/market-prices',
            accent: '#f59e0b'
        },
        {
            id: 'smart-workspace',
            name: t('modules.smartWorkspace'),
            summary: t('modules.smartWorkspaceSub'),
            description: t('modules.smartWorkspaceDesc'),
            action: onEnterWorld,
            icon: <Globe />,
            accent: '#06b6d4'
        },
        {
            id: 'expert-system',
            name: t('modules.expertSystem'),
            summary: t('modules.expertSystemSub'),
            description: t('modules.expertSystemDesc'),
            action: onAskDoubt,
            icon: <Workflow />,
            accent: '#6366f1'
        }
    ], [t, language, onAskDoubt, onEnterWorld]);

    const filteredModules = modules.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFeatureClick = (mod) => {
        if (mod.path) {
            navigate(mod.path);
        } else if (mod.action) {
            mod.action();
        }
        setIsOpen(false);
    };

    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[60vh] py-12">

            {/* 1. THE FEATURE HUB ICON (CENTRAL OMNI-NODE) */}
            <div className="relative group perspective-[1000px]">
                <button
                    onClick={() => setIsOpen(true)}
                    className={`
                        relative w-48 h-48 rounded-[4rem] flex items-center justify-center transition-all duration-[1s] ease-out shadow-2xl active:scale-95
                        ${isDarkMode
                            ? 'bg-[#0F172A] border border-white/10 shadow-black'
                            : 'bg-white border border-slate-200 shadow-[0_45px_100px_rgba(16,46,34,0.15)]'}
                        group-hover:rotate-[15deg] group-hover:scale-110
                    `}
                >
                    {/* Background Halo for Visibility */}
                    {!isDarkMode && <div className="absolute inset-0 bg-emerald-500/5 rounded-full blur-3xl -z-10 group-hover:opacity-100 transition-opacity duration-1000" />}

                    {/* Status Indicator Pin */}
                    <div className="absolute top-0 right-0 z-50">
                        <div className="relative">
                            <div className={`absolute inset-0 rounded-full animate-ping opacity-25 ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            <div className={`relative px-4 py-1.5 rounded-full border-[3px] flex items-center gap-2 shadow-lg transition-colors duration-500 ${isOnline ? 'bg-emerald-500 border-white dark:border-[#020617]' : 'bg-rose-500 border-white dark:border-[#020617]'}`}>
                                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
                                    {isOnline
                                        ? (language === 'ta' ? 'ஆன்லைன்' : 'ONLINE')
                                        : (language === 'ta' ? 'ஆஃப்லைன்' : 'OFFLINE')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Architectural Orbitals */}
                    <div className="absolute inset-[-40px] rounded-[4.5rem] border border-emerald-500/10 animate-[spin_30s_linear_infinite] pointer-events-none" />
                    <div className="absolute inset-[-80px] rounded-[6rem] border border-blue-500/5 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />

                    {/* The Core Hub Symbol */}
                    <div className={`relative transition-all duration-1000 group-hover:scale-125 group-hover:-rotate-[39deg] ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        <Command size={64} strokeWidth={1} className="drop-shadow-2xl" />
                        <div className="absolute inset-0 bg-emerald-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>

                    {/* Holographic Tooltip Label */}
                    <div className="absolute top-[120%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-y-8 group-hover:translate-y-0 pointer-events-none min-w-[240px] flex flex-col items-center">
                        <div className={`px-8 py-3 rounded-2xl backdrop-blur-3xl border shadow-2xl flex flex-col items-center gap-1 ${isDarkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white/95 border-slate-200 shadow-emerald-900/5'}`}>
                            <span className={`text-[12px] font-black uppercase tracking-[0.6em] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {language === 'ta' ? 'அம்ச மையம்' : 'Feature Hub'}
                            </span>
                            <div className="flex gap-2 mt-1">
                                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                                <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                                <div className="w-1 h-1 rounded-full bg-emerald-500/10" />
                            </div>
                        </div>
                        <div className={`w-px h-16 bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent mt-[-10px]`} />
                    </div>
                </button>
            </div>

            {/* 2. SMART FARMER ACTION BUTTON (DIRECT ACCESS) */}
            <div className="mt-16 animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
                <button
                    onClick={() => navigate('/ai-farmer')}
                    className={`
                        group flex items-center gap-6 px-10 py-5 rounded-[2rem] border transition-all duration-700 active:scale-95
                        ${isDarkMode
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)]'
                            : 'bg-slate-900 border-slate-900 text-white hover:bg-emerald-600 hover:border-emerald-600 shadow-xl shadow-slate-900/10'}
                    `}
                >
                    <div className="relative">
                        <Brain size={22} className="group-hover:animate-pulse" />
                        <div className="absolute -inset-2 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-opacity">
                            {language === 'ta' ? 'அறிவு மையம்' : 'Intelligence Core'}
                        </span>
                        <span className="text-[13px] font-black uppercase tracking-widest mt-1.5">
                            {language === 'ta' ? 'ஸ்மார்ட் விவசாயி' : 'Smart Farmer'}
                        </span>
                    </div>
                    <ArrowRight size={18} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
            </div>

            {/* 3. THE PROFESSIONAL FEATURE PANEL (MODAL OVERLAY) */}
            {isOpen && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 md:p-16 overflow-hidden">
                    {/* Deep Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-[60px] animate-in fade-in duration-1000"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Content Container */}
                    <div className={`
                        relative w-full max-w-7xl max-h-[90vh] rounded-[5rem] border shadow-[0_120px_200px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-32 duration-1000
                        ${isDarkMode ? 'bg-[#040809] border-white/5' : 'bg-white border-slate-200/50'}
                    `}>
                        {/* Panel Header */}
                        <header className={`px-16 py-12 flex flex-col md:flex-row items-center justify-between border-b gap-8 ${isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-slate-100 bg-slate-50/50'}`}>
                            <div className="flex items-center gap-10">
                                <div className={`p-5 rounded-[2rem] shadow-2xl ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-emerald-600 text-white'}`}>
                                    <Command size={28} />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className={`text-3xl font-black uppercase tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                        {language === 'ta' ? 'அம்ச தொகுப்பு' : 'Operational Suite'}
                                    </h2>
                                    <div className="flex items-center gap-3 mt-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                        <span className={`text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                            AgriIntel Institutional Portal v12.0
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className={`relative flex-1 md:flex-initial flex items-center px-8 py-4 rounded-[2rem] border transition-all min-w-[320px] ${isDarkMode ? 'bg-white/5 border-white/10 focus-within:border-emerald-500/40 focus-within:bg-white/[0.08]' : 'bg-white border-slate-200 focus-within:border-emerald-500'}`}>
                                    <Search size={18} className="text-slate-400 mr-4 shrink-0" />
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder={language === 'ta' ? 'தொகுதியைத் தேடுக...' : 'Find operational module...'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`bg-transparent border-none focus:ring-0 text-base font-bold w-full ${isDarkMode ? 'placeholder:text-white/10' : 'placeholder:text-slate-300'}`}
                                    />
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className={`p-5 rounded-[2rem] transition-all border active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'}`}
                                >
                                    <X size={28} strokeWidth={1.5} />
                                </button>
                            </div>
                        </header>

                        {/* Panel Body */}
                        <div className="flex-1 overflow-y-auto p-16 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                {filteredModules.map((mod) => (
                                    <button
                                        key={mod.id}
                                        onClick={() => handleFeatureClick(mod)}
                                        className={`
                                            group relative p-12 rounded-[4rem] border text-left flex flex-col gap-10 transition-all duration-1000
                                            ${isDarkMode
                                                ? 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-emerald-500/40 shadow-2xl'
                                                : 'bg-white border-slate-200/50 hover:border-emerald-500/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] shadow-sm'}
                                            active:scale-95
                                        `}
                                    >
                                        <div
                                            className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none"
                                            style={{ backgroundColor: mod.accent }}
                                        />

                                        <div className="flex items-center justify-between relative z-10">
                                            <div
                                                className={`p-8 rounded-[2.2rem] transition-all duration-1000 group-hover:scale-110 group-hover:rotate-[15deg] shadow-2xl`}
                                                style={{
                                                    backgroundColor: isDarkMode ? `${mod.accent}08` : `${mod.accent}05`,
                                                    color: mod.accent,
                                                    border: `1.5px solid ${mod.accent}15`
                                                }}
                                            >
                                                {React.cloneElement(mod.icon, { size: 40, strokeWidth: 1 })}
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-1000 transform translate-x-8 group-hover:translate-x-0">
                                                <ChevronRight size={32} strokeWidth={1} style={{ color: mod.accent }} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 relative z-10">
                                            <div className="flex items-center gap-4">
                                                <div className="w-1 h-3 rounded-full" style={{ backgroundColor: mod.accent }} />
                                                <span className={`text-[11px] font-black uppercase tracking-[0.5em] opacity-40 ${isDarkMode ? 'text-white' : 'text-slate-500'}`}>
                                                    {mod.summary}
                                                </span>
                                            </div>
                                            <h3 className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                {mod.name}
                                            </h3>
                                            <p className={`text-sm font-bold leading-relaxed opacity-50 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
                                                {mod.description}
                                            </p>
                                        </div>

                                        <div className={`mt-auto pt-10 border-t flex items-center justify-between relative z-10 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                            <div className="flex items-center gap-3">
                                                <Zap size={12} className="opacity-30" style={{ color: mod.accent }} />
                                                <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-20">Secure_Path_Enabled</span>
                                            </div>
                                            <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center transition-all duration-1000 ${isDarkMode ? 'bg-white/5 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-slate-50 group-hover:bg-slate-900 group-hover:text-white shadow-inner'}`}>
                                                <ArrowRight size={20} strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Panel Footer */}
                        <footer className={`px-16 py-10 border-t flex flex-col md:flex-row items-center justify-between gap-6 ${isDarkMode ? 'border-white/5 bg-white/[0.01]' : 'border-slate-100 bg-slate-50/50'}`}>
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-3">
                                    <Wifi size={16} className={isOnline ? 'text-emerald-500' : 'text-rose-500'} />
                                    <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                                        {isOnline ? (language === 'ta' ? 'இணைப்பு சீராக உள்ளது' : 'Uplink Stable') : (language === 'ta' ? 'இணைப்பு துண்டிக்கப்பட்டது' : 'Uplink Severed')}
                                    </span>
                                </div>
                                <div className="w-px h-6 bg-white/5 hidden md:block" />
                                <div className="flex items-center gap-3">
                                    <Activity size={16} className="text-blue-500" />
                                    <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                                        Bio-Sync Active
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className={`text-[10px] font-black uppercase tracking-[1em] opacity-10 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    Sovereign Node v12.5
                                </span>
                                <div className={`px-5 py-2 rounded-full border text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'border-white/5 bg-white/5 text-white/20' : 'border-slate-200 bg-white text-slate-400'}`}>
                                    AES-256 Quantum Vault
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.4); border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            `}</style>

        </div>
    );
};

export default AgriFeatureHub;

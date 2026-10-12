import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConversationalRegister from '../components/ConversationalRegister';
import ConversationalLogin from '../components/ConversationalLogin';
import { Languages, ShieldCheck, UserPlus, LogIn, ArrowLeft, Orbit, Globe, Cpu } from 'lucide-react';

const TelemetryHUD = ({ label, value }) => (
    <div className="institutional-telemetry-vertical">
        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{label}</span>
        <span className="text-[12px] font-black text-white/60 uppercase tracking-widest">{value}</span>
    </div>
);

const FarmerAuth = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('select_lang'); // select_lang, choice, register, login
    const [language, setLanguage] = useState(null); // 'en' or 'ta'

    // Professional Institutional Theme
    const isDarkMode = false;

    const selectLanguage = (lang) => {
        setLanguage(lang);
        setMode('choice');
        try {
            const silent = new SpeechSynthesisUtterance('');
            silent.volume = 0;
            window.speechSynthesis.speak(silent);
        } catch (e) { }
    };

    const handleBack = () => {
        if (mode === 'choice') setMode('select_lang');
        else if (mode === 'register' || mode === 'login') setMode('choice');
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className={`min-h-screen relative flex flex-col font-sans transition-all duration-1000 overflow-hidden bg-[#FDFCF9] text-slate-900`}>

            {/* Premium Atmospheric Layout */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                <div className={`absolute top-0 left-0 w-full h-[60vh] opacity-30 transition-all duration-1000 bg-gradient-to-b from-emerald-50 to-transparent`} />
                <div className={`absolute inset-0 opacity-[0.03]`}
                    style={{ backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`, backgroundSize: '120px 120px' }}
                />
            </div>

            {/* Institutional Header */}
            <header className="px-12 py-10 z-[100] flex items-center justify-between backdrop-blur-3xl border-b border-slate-200/50 sticky top-0 transition-all duration-500 bg-white/70">
                <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Cpu className="text-white" size={28} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-black tracking-tight leading-none uppercase text-slate-900">AgriIntel</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mt-1">Institutional Portal</span>
                    </div>
                </div>

                <div className="flex items-center gap-12">
                    <div className="hidden lg:flex items-center gap-10 opacity-60">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">TERMINAL</span>
                            <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">SECURE_v13</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">UPLINK</span>
                            <span className="text-[12px] font-black text-emerald-600 uppercase tracking-widest font-mono">STABLE</span>
                        </div>
                    </div>
                    <button
                        onClick={handleBackToHome}
                        className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-200"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
                <div className="w-full max-w-[1200px] transition-all duration-1000">

                    {mode === 'select_lang' && (
                        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center gap-4 px-8 py-2.5 rounded-full border border-emerald-500/10 bg-emerald-500/[0.03] mb-8">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-emerald-600">System Ready • Select Locale</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-slate-900">
                                    Global <span className="opacity-10 font-light">Agri Node</span>
                                </h1>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <button
                                    onClick={() => selectLanguage('en')}
                                    className="group relative p-20 rounded-[5rem] bg-white border border-slate-100 hover:border-emerald-500/40 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center gap-10"
                                >
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-700">
                                        <Globe className="text-slate-400 opacity-40 group-hover:opacity-100 group-hover:text-emerald-500" size={48} strokeWidth={1} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-5xl font-black uppercase tracking-tight text-slate-900">English</h3>
                                        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-20 group-hover:opacity-100 transition-opacity">International Registry</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => selectLanguage('ta')}
                                    className="group relative p-20 rounded-[5rem] bg-white border border-slate-100 hover:border-emerald-500/40 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center gap-10"
                                >
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-700">
                                        <Languages className="text-slate-400 opacity-40 group-hover:opacity-100 group-hover:text-emerald-500" size={48} strokeWidth={1} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-5xl font-black uppercase tracking-tight text-slate-900">தமிழ்</h3>
                                        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-20 group-hover:opacity-100 transition-opacity">பிராந்திய அறிவு</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {mode === 'choice' && (
                        <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center gap-4 px-8 py-2.5 rounded-full border border-emerald-500/10 bg-emerald-500/[0.03] mb-8">
                                    <ShieldCheck size={16} className="text-emerald-500" />
                                    <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-emerald-600">Protocol Established • {language.toUpperCase()}</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-slate-900">
                                    Access <span className="opacity-10 font-light">Gateway</span>
                                </h1>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <button
                                    onClick={() => setMode('register')}
                                    className="group relative p-20 rounded-[5rem] bg-white border border-slate-100 hover:border-emerald-500/40 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center gap-10"
                                >
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-700">
                                        <UserPlus className="text-slate-400 opacity-40 group-hover:opacity-100 group-hover:text-emerald-500" size={48} strokeWidth={1} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-5xl font-black uppercase tracking-tight text-slate-900">{language === 'en' ? 'Register' : 'பதிவு'}</h3>
                                        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-20 group-hover:opacity-100 transition-opacity">New Identity Seed</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setMode('login')}
                                    className="group relative p-20 rounded-[5rem] bg-white border border-slate-100 hover:border-emerald-500/40 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center gap-10"
                                >
                                    <div className="w-24 h-24 rounded-[2.5rem] bg-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-700">
                                        <LogIn className="text-slate-400 opacity-40 group-hover:opacity-100 group-hover:text-emerald-500" size={48} strokeWidth={1} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-5xl font-black uppercase tracking-tight text-slate-900">{language === 'en' ? 'Login' : 'உள்நுழை'}</h3>
                                        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 opacity-20 group-hover:opacity-100 transition-opacity">Resume Command</p>
                                    </div>
                                </button>
                            </div>

                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={handleBack}
                                    className="px-12 py-5 rounded-3xl bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-all hover:bg-slate-200 text-[11px] font-black uppercase tracking-[0.5em]"
                                >
                                    Back to Locale Selection
                                </button>
                            </div>
                        </div>
                    )}

                    {(mode === 'register' || mode === 'login') && (
                        <div className="w-full flex flex-col items-center animate-in fade-in duration-1000">
                            <div className="w-full max-w-5xl rounded-[5rem] bg-white border border-slate-100 p-10 md:p-20 shadow-[0_50px_120px_rgba(0,0,0,0.05)]">
                                {mode === 'register' ? (
                                    <ConversationalRegister
                                        language={language}
                                        onSwitchToLogin={() => setMode('login')}
                                        onBack={() => setMode('choice')}
                                    />
                                ) : (
                                    <ConversationalLogin
                                        language={language}
                                        onSwitchToRegister={() => setMode('register')}
                                        onBack={() => setMode('choice')}
                                    />
                                )}
                            </div>

                            <button
                                onClick={handleBack}
                                className="mt-16 px-12 py-6 rounded-3xl text-slate-400 hover:text-slate-900 text-[12px] font-black uppercase tracking-[1em] transition-all hover:bg-slate-50"
                            >
                                <ArrowLeft size={24} className="inline mr-4" /> Back to Choice
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Institutional Footer */}
            <footer className="px-12 py-10 opacity-30 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.8em] text-slate-400">
                <span>AgriIntel v13.9</span>
                <div className="h-px flex-1 mx-20 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <span>Tier Alpha Zero-Trust</span>
            </footer>

            <style>{`
                @keyframes float {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(100px, 100px); }
                }
            `}</style>
        </div>
    );
};

export default FarmerAuth;

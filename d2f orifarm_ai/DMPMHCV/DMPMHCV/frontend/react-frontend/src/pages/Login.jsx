import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import MoodCheckIn from '../components/MoodCheckIn';
import TinyWinMessage from '../components/TinyWinMessage';
import { CognitiveReadinessTracker } from '../utils/cognitiveReadiness';
import { Sprout, AlertTriangle, ArrowRight, Mail, Lock, Shield, ShieldCheck, Cpu, Waves, Mic, Languages } from 'lucide-react';
import { useHumanPresence } from '../hooks/useHumanPresence';
import { authTranslations } from '../utils/authTranslations';

const Login = ({ isDarkMode: globalIsDarkMode, language: propLanguage }) => {
    const [language, setLanguage] = useState(propLanguage || 'en');
    const t = authTranslations[language];

    useEffect(() => {
        if (propLanguage) setLanguage(propLanguage);
    }, [propLanguage]); // Get translations

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, verifyOtp, error } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [step, setStep] = useState('login');
    const [otp, setOtp] = useState('');

    // Theme state synchronized with global theme
    const [isDarkMode, setIsDarkMode] = useState(globalIsDarkMode ?? true);

    // Soft CAPTCHA Hook
    const { humanScore } = useHumanPresence();

    const trackerRef = useRef(new CognitiveReadinessTracker());
    const [readinessState, setReadinessState] = useState(null);

    useEffect(() => {
        setIsDarkMode(globalIsDarkMode ?? true);
    }, [globalIsDarkMode]);

    const handleMoodSelect = (moodId) => {
        localStorage.setItem('tempMood', moodId);
    };

    const handleKeyDown = (e) => {
        trackerRef.current.trackInput(e);
    };

    const [isScanning, setIsScanning] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const readiness = trackerRef.current.calculateReadiness();
        setReadinessState(readiness.state);

        const result = await login(email, password, readiness.state, humanScore);

        if (result.success) {
            setIsSubmitting(false);
            setIsScanning(true);

            setTimeout(() => {
                setShowSuccess(true);
                setTimeout(() => navigate('/'), 2000);
            }, 3000);
        } else if (result.needsVerification) {
            setStep('verify');
            setIsSubmitting(false);
        } else {
            setIsSubmitting(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await verifyOtp(email, otp);
        if (result.success) {
            const loginResult = await login(email, password);
            if (loginResult.success) {
                setIsScanning(true);
                setTimeout(() => {
                    setShowSuccess(true);
                    setTimeout(() => navigate('/'), 2000);
                }, 3000);
            }
        }
        setIsSubmitting(false);
    };

    return (
        <div className={`min-h-screen relative flex flex-col font-sans transition-all duration-1000 overflow-x-hidden ${isDarkMode ? 'bg-[#040D08] text-white' : 'bg-[#FDFCF9] text-slate-900'}`}>

            {/* Ambient Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
                <div className={`absolute top-0 left-0 w-full h-[60vh] opacity-20 transition-all duration-1000 ${isDarkMode ? 'bg-gradient-to-b from-emerald-900/40 to-transparent' : 'bg-gradient-to-b from-emerald-50 to-transparent'}`} />
                <div className={`absolute inset-0 opacity-[0.02] ${isDarkMode ? 'invert' : ''}`}
                    style={{ backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`, backgroundSize: '120px 120px' }}
                />
            </div>


            <main className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 relative z-10">

                {showSuccess && <TinyWinMessage />}

                <div className="w-full max-w-[620px] transition-all duration-1000">
                    <div className={`
                        relative overflow-hidden rounded-[5rem] transition-all duration-1000 p-1 md:p-1.5
                        ${isDarkMode
                            ? 'bg-gradient-to-b from-white/10 to-transparent shadow-[0_60px_100px_rgba(0,0,0,0.8)]'
                            : 'bg-white shadow-[0_50px_100px_rgba(0,0,0,0.04)] border border-slate-100'
                        }
                    `}>
                        <div className={`rounded-[4.9rem] p-12 md:p-20 space-y-16 ${isDarkMode ? 'bg-[#08150D]/95' : 'bg-white'}`}>

                            <div className="flex flex-col items-center text-center space-y-10">
                                <div className="w-20 h-20 rounded-[2.5rem] bg-emerald-100/10 border border-emerald-500/20 flex items-center justify-center">
                                    <Lock size={36} className="text-emerald-500" strokeWidth={1} />
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
                                        {t.loginHeader} <br />
                                        <span className="opacity-30">{t.loginSub}</span>
                                    </h1>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full" />
                                        <span className="text-[11px] font-bold uppercase tracking-[0.5em] opacity-40">
                                            Institutional Tier • Biometric Encryption • Zero-Trust
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {step === 'login' ? (
                                <form className="space-y-14" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold p-6 rounded-3xl flex items-center gap-6 animate-in slide-in-from-top duration-500 uppercase tracking-widest">
                                            <AlertTriangle size={20} />
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end px-2">
                                                <label className={`text-[11px] font-bold uppercase tracking-[0.3em] opacity-40`}>{t.emailLabel}</label>
                                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-20">Communication Uplink</span>
                                            </div>
                                            <div className="relative group">
                                                <Mail className={`absolute left-8 top-1/2 -translate-y-1/2 transition-colors duration-500 ${isDarkMode ? 'text-white/10 group-focus-within:text-emerald-500' : 'text-slate-200 group-focus-within:text-emerald-600'}`} size={22} />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={`w-full h-20 rounded-[2.5rem] pl-20 pr-10 border transition-all duration-500 text-lg font-bold ${isDarkMode ? 'bg-[#0A1810] border-white/5 text-white focus:border-emerald-500/50' : 'bg-slate-50 border-slate-100 text-slate-800 focus:border-emerald-600 focus:bg-white'}`}
                                                    placeholder="NAME@INSTITUTION.AGRI"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end px-2">
                                                <label className={`text-[11px] font-bold uppercase tracking-[0.3em] opacity-40`}>{t.passwordLabel}</label>
                                                <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-20">Secure Passcode</span>
                                            </div>
                                            <div className="relative group">
                                                <Lock className={`absolute left-8 top-1/2 -translate-y-1/2 transition-colors duration-500 ${isDarkMode ? 'text-white/10 group-focus-within:text-emerald-500' : 'text-slate-200 group-focus-within:text-emerald-600'}`} size={22} />
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={`w-full h-20 rounded-[2.5rem] pl-20 pr-10 border transition-all duration-500 text-lg font-bold ${isDarkMode ? 'bg-[#0A1810] border-white/5 text-white focus:border-emerald-500/50' : 'bg-slate-50 border-slate-100 text-slate-800 focus:border-emerald-600 focus:bg-white'}`}
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full h-20 rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.5em] transition-all duration-700 flex items-center justify-center gap-6 shadow-2xl active:scale-95 ${isDarkMode ? 'bg-emerald-700 text-white hover:bg-emerald-600 shadow-emerald-900/40' : 'bg-slate-900 text-white hover:bg-black shadow-slate-200'}`}
                                        >
                                            {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : t.loginButton}
                                            {!isSubmitting && <ArrowRight size={20} />}
                                        </button>

                                        <div className="flex flex-col items-center gap-10">
                                            <div className="w-full flex items-center gap-6 opacity-10">
                                                <div className="h-[1px] flex-1 bg-current" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Advised Authorization</span>
                                                <div className="h-[1px] flex-1 bg-current" />
                                            </div>

                                            <div className="w-full">
                                                <MoodCheckIn onMoodSelect={handleMoodSelect} isDarkMode={isDarkMode} />
                                            </div>

                                            <Link to="/farmer-auth" className={`w-full p-8 rounded-[3rem] border flex items-center justify-between group transition-all duration-700 ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:bg-emerald-500/10' : 'bg-slate-50 border-slate-100 hover:bg-emerald-50 hover:border-emerald-200'}`}>
                                                <div className="flex items-center gap-8">
                                                    <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
                                                        <Mic size={28} className="animate-pulse" />
                                                    </div>
                                                    <div className="text-left space-y-1">
                                                        <div className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{t.tamilFarmerAccess}</div>
                                                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{t.voiceLoginSub}</div>
                                                    </div>
                                                </div>
                                                <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2" />
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <form className="space-y-16" onSubmit={handleVerifyOtp}>
                                    <div className="flex flex-col items-center gap-10">
                                        <div className="w-24 h-24 rounded-[3rem] bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <ShieldCheck size={48} strokeWidth={1} />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-3xl font-bold tracking-tight uppercase">Identity Verification</h2>
                                            <p className="text-[11px] font-bold uppercase tracking-[0.4em] opacity-40 max-w-[320px] mx-auto">Enter 6-digit secure token transmitted to your registered terminal</p>
                                        </div>
                                    </div>

                                    <div className="space-y-12">
                                        <input
                                            type="text"
                                            maxLength="6"
                                            required
                                            className={`w-full h-32 rounded-[3.5rem] border text-center text-6xl font-mono font-bold tracking-[0.8em] transition-all duration-700 outline-none ${isDarkMode
                                                ? 'bg-[#0A1810] border-white/5 text-white focus:border-emerald-500/50'
                                                : 'bg-slate-50 border-slate-100 text-slate-800 focus:bg-white focus:border-emerald-600 shadow-inner'
                                                }`}
                                            placeholder="000000"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                        />

                                        <div className="space-y-6">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || otp.length < 6}
                                                className={`w-full h-20 rounded-[2.5rem] text-[13px] font-black uppercase tracking-[0.5em] transition-all duration-700 flex items-center justify-center gap-6 shadow-2xl active:scale-95 ${isDarkMode ? 'bg-emerald-700 text-white hover:bg-emerald-600 shadow-emerald-900/40' : 'bg-slate-900 text-white hover:bg-black shadow-slate-200'}`}
                                            >
                                                {isSubmitting ? 'Verifying...' : 'Verify Uplink'}
                                                {!isSubmitting && <Shield size={20} />}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setStep('login')}
                                                className={`w-full py-6 text-[11px] font-bold uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-all ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
                                            >
                                                Abort Access Protocol
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="mt-20 flex flex-col items-center gap-6 transition-opacity duration-1000">
                        <div className="flex gap-1.5">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className={`w-10 h-[2px] rounded-full transition-all duration-1000 ${isDarkMode ? 'bg-white/5' : 'bg-slate-200'} ${isScanning && i % 2 === 0 ? 'bg-emerald-500 scale-x-125' : ''}`} />
                            ))}
                        </div>
                        <div className={`px-10 py-3 rounded-full border transition-all duration-1000 backdrop-blur-3xl ${isDarkMode ? 'bg-emerald-500/[0.03] border-emerald-500/10 text-white/20' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <span className="text-[10px] font-black uppercase tracking-[0.8em]">Secured by Institutional Intelligence v9.0</span>
                        </div>
                    </div>
                </div>

                {/* Zero-Trust Scanning Overlay */}
                {isScanning && !showSuccess && (
                    <div className={`fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-3xl animate-in fade-in duration-1000 ${isDarkMode ? 'bg-[#040D08]/95' : 'bg-white/95'}`}>
                        <div className="text-center space-y-20 relative">
                            <div className="relative mx-auto w-64 h-64">
                                <div className="absolute inset-0 rounded-[4rem] border-2 border-emerald-500/20 animate-ping" />
                                <div className="absolute inset-4 rounded-[3.5rem] border border-emerald-500/30 animate-[spin_8s_linear_infinite]" />
                                <div className="absolute inset-10 rounded-[3rem] border border-emerald-500/40 animate-[spin_6s_linear_infinite_reverse]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <ShieldCheck className="text-emerald-500" size={80} strokeWidth={1} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-4xl font-black uppercase tracking-[0.6em]">Trust Matrix</h2>
                                <p className="text-emerald-500 font-bold text-sm uppercase tracking-[1em] animate-pulse">Establishing Field Uplink...</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Login;

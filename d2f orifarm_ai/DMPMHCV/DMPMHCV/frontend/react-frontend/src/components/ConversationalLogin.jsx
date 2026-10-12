import React, { useState, useEffect, useRef } from 'react';
import { Mic, Lock, ArrowRight, UserCheck, KeyRound, Languages, Activity, ShieldCheck, Fingerprint, Sparkles, Orbit, Zap, AlertCircle, Cpu, ShieldAlert, Terminal, Globe, Atom, Box, Binary, Wifi, Database, Shield, Zap as PulseIcon, Scan, Power, Command, ShieldX, Dna } from 'lucide-react';
import SequentialFaceVerification from './SequentialFaceVerification';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authTranslations } from '../utils/authTranslations';
import { useTTS } from '../hooks/useTTS';
import { useTamilVoice } from '../hooks/useTamilVoice';

const VoicePulse = ({ isActive, color = '#3b82f6' }) => (
    <div className="voice-pulse-zone" style={{ '--pulse-color': color }}>
        {[...Array(15)].map((_, i) => (
            <div
                key={i}
                className="voice-pulse-bar"
                style={{
                    height: isActive ? `${25 + Math.random() * 75}px` : '6px',
                    animationDelay: `${i * 0.05}s`,
                    opacity: isActive ? 1 : 0.2,
                    background: color,
                    boxShadow: `0 0 20px ${color}`
                }}
            />
        ))}
        {isActive && <div className="ping-shockwave" style={{ borderColor: color }} />}
    </div>
);

const TelemetryHUD = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{label}</span>
        <span className="text-[12px] font-black text-slate-900 uppercase tracking-widest">{value}</span>
    </div>
);

const ConversationalLogin = ({ onSwitchToRegister, onBack, language = 'en' }) => {
    const [step, setStep] = useState('unlock');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [revealedCode, setRevealedCode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const t = authTranslations[language];

    const { loginWithToken } = useAuth();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false); // Enterprise standard
    const { speak, isSpeaking, cancel } = useTTS(language);
    // Tamil STT hook — browser first (ta-IN), Python backend fallback
    const { listen, isListening } = useTamilVoice(language);


    const handleInitialUnlock = () => {
        console.log('[CONV/LOGIN] Unlocking interface...');
        setStep('greet');
        // Welcome them and transition
        speak(t.greetLogin, () => {
            setStep('name');
            // Re-prompt specifically for name on the name screen
            speak(t.whatIsNameShort);
        });
    };

    const handleLogin = async (codeOverride = null) => {
        setIsLoading(true);
        const finalCode = typeof codeOverride === 'string' ? codeOverride : code;

        try {
            setError(null);
            const res = await axios.post('/api/auth/conversational-login', {
                name: name,
                code: finalCode
            });
            const { access_token, user } = res.data;
            loginWithToken(access_token, user);
            speak(t.loginSuccess(user.full_name || name), () => navigate('/'));
        } catch (err) {
            setError(err.response?.data?.error || "ACCESS_DENIED");
            speak(t.errorSystem);
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotCode = () => {
        setStep('forgot_info');
        speak(t.forgotCodeIntro);
    };

    return (
        <div className="w-full space-y-20 flex flex-col items-center">

            <div className="w-full flex justify-between items-center opacity-40">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Auth Uplink</span>
                    <span className="text-[12px] font-black uppercase tracking-widest text-slate-800">{step.toUpperCase()}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Status</span>
                    <span className="text-[12px] font-black uppercase tracking-widest text-emerald-600">Active</span>
                </div>
            </div>

            <div className="w-full min-h-[400px] flex flex-col items-center justify-center">
                {step === 'unlock' && (
                    <div className="text-center space-y-16 flex flex-col items-center animate-scale-in">
                        <div className="w-40 h-40 rounded-[3.5rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-inner">
                            <Power size={60} className="text-emerald-500 opacity-20 animate-pulse" strokeWidth={1} />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tight text-slate-900">{t.initialize}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Identity Command Ready</p>
                        </div>
                        <button
                            onClick={handleInitialUnlock}
                            className="px-16 py-6 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-black uppercase tracking-[0.4em] transition-all shadow-xl shadow-emerald-900/10 flex items-center gap-6 active:scale-95"
                        >
                            {t.authorize} <ArrowRight size={20} />
                        </button>
                    </div>
                )}

                {step === 'greet' && (
                    <div className="text-center space-y-16 flex flex-col items-center animate-scale-in">
                        <div className="h-40 flex items-center justify-center">
                            <VoicePulse isActive={isSpeaking} color="#10b981" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tight text-slate-900">{isSpeaking ? t.syncing : t.welcome}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Neural Matrix Synchronization</p>
                        </div>
                        {/* Manual fallback if voice gets stuck */}
                        {!isSpeaking && (
                            <button
                                onClick={() => setStep('name')}
                                className="text-[10px] font-black uppercase tracking-widest text-emerald-600 animate-pulse mt-8"
                            >
                                {t.continue} (Manual Skip)
                            </button>
                        )}
                    </div>
                )}

                {step === 'name' && (
                    <div className="w-full space-y-16 text-center flex flex-col items-center animate-scale-in">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tight text-slate-900">{t.whatIsName}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Identify Authority</p>
                        </div>

                        <div className="w-full max-w-2xl relative py-4">
                            <input
                                type="text"
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t.enterName}
                                className="w-full bg-transparent border-none text-6xl text-slate-900 text-center focus:outline-none placeholder:text-slate-100 font-black uppercase tracking-tighter"
                            />
                            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mt-8" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl pt-8">
                            <button
                                onClick={() => listen((val) => {
                                    setName(val);
                                    if (val) {
                                        // Acknowledge name and move to code entry
                                        speak(t.nameConfirmed, () => {
                                            setStep('code');
                                            // Explicitly ask for the code on its screen
                                            speak(t.enterSecurityCode);
                                        });
                                    }
                                })}
                                className={`flex-1 py-10 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-4 transition-all duration-500 ${isListening ? 'bg-emerald-500/10 border-emerald-500' : 'hover:bg-slate-100'}`}
                            >
                                <Mic size={40} className={`${isListening ? 'text-emerald-500 animate-pulse' : 'text-slate-300'} transition-all`} strokeWidth={1} />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">{isListening ? t.listening : t.voice}</span>
                            </button>

                            <button
                                onClick={() => { if (name) { setStep('code'); speak(t.enterSecurityCode); } }}
                                disabled={!name}
                                className="flex-1 rounded-3xl bg-slate-900 text-white font-black uppercase tracking-[0.4em] text-[13px] disabled:opacity-20 flex items-center justify-center gap-6 shadow-xl active:scale-95"
                            >
                                {t.decrypt} <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'code' && (
                    <div className="w-full space-y-16 text-center flex flex-col items-center animate-scale-in">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tight text-slate-900">{t.enterSecurityCode}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Authorization Sequence</p>
                        </div>

                        <div className="flex justify-center gap-8">
                            {[0, 1, 2].map((idx) => (
                                <input
                                    key={idx}
                                    type="password"
                                    maxLength="1"
                                    value={code[idx] || ''}
                                    onChange={(e) => {
                                        const newCode = code.split('');
                                        newCode[idx] = e.target.value;
                                        const codeString = newCode.join('');
                                        setCode(codeString);

                                        if (e.target.value && idx < 2) {
                                            const next = e.target.nextElementSibling;
                                            next?.focus();
                                        }

                                        if (codeString.length === 3) {
                                            handleLogin(codeString);
                                        }
                                    }}
                                    className="w-24 h-24 bg-slate-50 border border-slate-200 rounded-3xl text-5xl text-emerald-600 font-black text-center focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                                />
                            ))}
                        </div>

                        <div className="flex flex-col gap-10 w-full max-w-3xl mt-8">
                            <button
                                onClick={() => handleLogin()}
                                disabled={code.length < 3 || isLoading}
                                className="w-full py-10 rounded-3xl bg-emerald-600 text-white font-black uppercase tracking-[0.4em] text-[15px] disabled:opacity-20 flex justify-center items-center gap-6 shadow-xl active:scale-95 shadow-emerald-900/10"
                            >
                                {isLoading ? t.syncing : t.authorize} <ShieldCheck size={28} />
                            </button>

                            <button
                                onClick={handleForgotCode}
                                className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-300 hover:text-slate-900 transition-all"
                            >
                                {t.identityRecovery}
                            </button>
                        </div>
                    </div>
                )}

                {(step === 'forgot_info' || step === 'forgot_verify' || step === 'revealed_code') && (
                    <div className="w-full space-y-16 animate-scale-in">
                        {step === 'forgot_info' && (
                            <div className="text-center space-y-12 flex flex-col items-center">
                                <div className="w-40 h-40 rounded-[3.5rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                                    <KeyRound size={60} strokeWidth={1} className="opacity-40 animate-pulse" />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">{t.recoverIdentity}</h2>
                                    <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                        {t.biometricVerifyRequired}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setStep('forgot_verify')}
                                    className="px-16 py-6 rounded-3xl bg-emerald-600 text-white text-[13px] font-black uppercase tracking-[0.4em] flex items-center gap-6 shadow-xl shadow-emerald-900/10 active:scale-95"
                                >
                                    {t.initiateRecovery} <ShieldCheck size={24} />
                                </button>
                            </div>
                        )}

                        {step === 'forgot_verify' && (
                            <div className="w-full flex flex-col items-center">
                                <h2 className="text-4xl font-black uppercase tracking-tight mb-12 text-slate-900">{t.recoveryScan}</h2>
                                <div className="w-full max-w-3xl p-1.5 rounded-[4.5rem] border border-slate-100 bg-slate-50 shadow-inner">
                                    <SequentialFaceVerification
                                        language={language}
                                        onComplete={(img, seq) => {
                                            const recover = async () => {
                                                try {
                                                    const res = await axios.post('/api/auth/recover-code', {
                                                        name: name,
                                                        face_embedding: img,
                                                        liveness_sequence: seq
                                                    });
                                                    setRevealedCode(res.data.security_code);
                                                    setStep('revealed_code');
                                                    const codeAudio = String(res.data.security_code).split('').join(' ');
                                                    speak(`${t.codeRecoverySuccess}. ${t.codeReveal(codeAudio)}`);
                                                } catch (e) { setError("RECOVERY_LINK_FAILED"); speak(t.errorSystem); }
                                            };
                                            recover();
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 'revealed_code' && (
                            <div className="text-center space-y-16 flex flex-col items-center">
                                <div className="space-y-4">
                                    <h2 className="text-5xl font-black uppercase tracking-tight text-slate-900">{t.codeRecoverySuccess}</h2>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Identity Key Cleartext</p>
                                </div>

                                <div className="p-16 rounded-[4.5rem] bg-slate-50 border border-slate-100 w-full max-w-2xl shadow-inner">
                                    <div className="text-[10rem] font-black text-emerald-600 leading-none tracking-widest">
                                        {revealedCode}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep('code')}
                                    className="px-16 py-6 rounded-3xl bg-slate-900 text-white text-[13px] font-black uppercase tracking-[0.4em] flex items-center gap-6 shadow-2xl active:scale-95"
                                >
                                    {t.executeLogin} <ArrowRight size={24} />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {error && (
                    <div className="mt-12 p-8 rounded-3xl bg-red-50 border border-red-100 text-red-600 text-center animate-shake flex flex-col items-center gap-4">
                        <ShieldAlert size={40} className="opacity-30" />
                        <span className="text-[11px] font-black uppercase tracking-widest">{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationalLogin;

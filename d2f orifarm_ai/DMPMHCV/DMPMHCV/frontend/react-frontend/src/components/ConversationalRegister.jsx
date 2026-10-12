import React, { useState, useEffect, useRef } from 'react';
import { Mic, User, ShieldCheck, ArrowRight, Activity, Cpu, Languages, Sparkles, Orbit, Fingerprint, Zap, CheckCircle2, AlertCircle, Box, Terminal, Globe, Atom, Binary, Wifi, Database, Sun, Wind, Droplets, Shield, Zap as PulseIcon, Scan, Power, Lock, Command, Dna } from 'lucide-react';
import BiometricEnrollment from './BiometricEnrollment';
import SequentialFaceVerification from './SequentialFaceVerification';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authTranslations } from '../utils/authTranslations';
import { useTTS } from '../hooks/useTTS';
import { useTamilVoice } from '../hooks/useTamilVoice';
import { useAuth } from '../context/AuthContext';

const VoicePulse = ({ isActive, color = '#10b981' }) => (
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

const ConversationalRegister = ({ onSwitchToLogin, onBack, language = 'en' }) => {
    const navigate = useNavigate();
    const { loginWithToken } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { speak, isSpeaking, cancel } = useTTS(language);
    // Tamil STT hook — browser first, Python backend fallback
    const { listen, isListening, transcript } = useTamilVoice(language);

    const [step, setStep] = useState('unlock');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState(null);

    const t = authTranslations[language];

    const handleInitialUnlock = () => {
        console.log('[CONV/REG] Unlocking registration interface...');
        // Just transition to greet and let its effect handle the speech
        setStep('greet');
        speak(t.welcomeRegister, () => {
            setStep('name');
        });
    };

    const handleRegister = async (biometricData) => {
        setIsLoading(true);
        try {
            setError(null);
            const res = await axios.post('/api/auth/conversational-register', {
                name: name,
                age: age,
                face_embedding: biometricData.face,
                liveness_sequence: biometricData.liveness
            });
            const recCode = res.data.security_code;
            setGeneratedCode(recCode);
            setStep('reveal');

            const codeString = String(recCode).split('').join(' ');
            speak(`${t.regSuccess} ${t.codeReveal(codeString)}. ${t.redirectingToLogin}`);

            setTimeout(() => {
                onSwitchToLogin();
            }, 10000);

        } catch (err) {
            setError(err.response?.data?.error || "REGISTRATION_REJECTED");
            speak(t.errorSystem);
            setStep('name');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full space-y-20 flex flex-col items-center text-slate-900">

            <div className="w-full flex justify-between items-center opacity-40">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Registry Uplink</span>
                    <span className="text-[12px] font-black uppercase tracking-widest text-slate-800">{step.toUpperCase()}</span>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Security</span>
                    <span className="text-[12px] font-black uppercase tracking-widest text-emerald-600">Biometric Ready</span>
                </div>
            </div>

            <div className="w-full min-h-[500px] flex flex-col items-center justify-center">
                {step === 'unlock' && (
                    <div className="text-center space-y-16 flex flex-col items-center animate-scale-in">
                        <div className="w-40 h-40 rounded-[3.5rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-inner">
                            <Power size={60} className="text-emerald-500 opacity-20 animate-pulse" strokeWidth={1} />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tight">{t.initialize}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Identity Registry Protocol</p>
                        </div>
                        <button
                            onClick={handleInitialUnlock}
                            className="px-16 py-6 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-black uppercase tracking-[0.4em] transition-all shadow-xl shadow-emerald-900/10 flex items-center gap-6 active:scale-95"
                        >
                            {t.engage} <ArrowRight size={20} />
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
                    <div className="w-full space-y-20 text-center flex flex-col items-center animate-scale-in">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tight">{t.whatIsName}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Legal Name Registry</p>
                        </div>

                        <div className="w-full max-w-2xl relative py-4">
                            <input
                                type="text"
                                autoFocus
                                value={isListening && transcript ? transcript : name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={t.enterName}
                                className="w-full bg-transparent border-none text-6xl text-slate-900 text-center focus:outline-none placeholder:text-slate-100 font-black uppercase tracking-tighter"
                            />
                            {isConfirming && (
                                <div className="absolute top-full left-0 right-0 text-center animate-pulse">
                                    <span className="text-emerald-500 text-sm font-black uppercase tracking-widest">{t.validating}</span>
                                </div>
                            )}
                            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mt-8" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl pt-8">
                            <button
                                onClick={() => listen((val) => {
                                    setName(val);
                                    if (val) {
                                        setIsConfirming(true);
                                        // Acknowledge name and move to age screen
                                        speak(t.nameConfirmed, () => {
                                            setIsConfirming(false);
                                            setStep('age');
                                            // Trigger next prompt immediately on the new screen
                                            speak(t.howOldAreYou);
                                        });
                                    }
                                })}
                                className={`flex-1 py-10 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-4 transition-all duration-500 ${isListening ? 'bg-emerald-500/10 border-emerald-500' : 'hover:bg-slate-100 text-slate-400'} ${isConfirming ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isConfirming}
                            >
                                <Mic size={40} className={`${isListening ? 'text-emerald-500 animate-pulse' : 'text-slate-300'} transition-all`} strokeWidth={1} />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em]">{isListening ? t.listening : t.voice}</span>
                            </button>

                            <button
                                onClick={() => { if (name) { setStep('age'); speak(t.howOldAreYou); } }}
                                disabled={!name || isConfirming}
                                className="flex-1 rounded-3xl bg-slate-900 text-white font-black uppercase tracking-[0.4em] text-[13px] disabled:opacity-20 flex items-center justify-center gap-6 shadow-xl active:scale-95"
                            >
                                {t.validate} <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'age' && (
                    <div className="w-full space-y-20 text-center flex flex-col items-center animate-scale-in">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tight">{t.howOldAreYou}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Biological Metadata</p>
                        </div>

                        <div className="w-full max-w-xs relative py-4">
                            <input
                                type="number"
                                autoFocus
                                value={isListening && transcript ? (transcript.replace(/\D/g, '') || transcript) : age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="--"
                                className="w-full bg-transparent border-none text-6xl text-slate-900 text-center focus:outline-none placeholder:text-slate-100 font-black uppercase tracking-tighter"
                            />
                            {isConfirming && (
                                <div className="absolute top-full left-0 right-0 text-center animate-pulse">
                                    <span className="text-emerald-500 text-sm font-black uppercase tracking-widest">{t.validating}</span>
                                </div>
                            )}
                            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent mt-8" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl pt-8">
                            <button
                                onClick={() => listen((val) => {
                                    const num = val.replace(/\D/g, '');
                                    if (num) {
                                        setAge(num);
                                        setIsConfirming(true);
                                        // Acknowledge age and move to biometrics
                                        speak(t.ageConfirmed, () => {
                                            setIsConfirming(false);
                                            setStep('biometric');
                                            // Describe the next biometric step
                                            speak(t.bioTrustDesc);
                                        });
                                    }
                                })}
                                className={`flex-1 py-10 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-4 transition-all duration-500 ${isListening ? 'bg-emerald-500/10 border-emerald-500' : 'hover:bg-slate-100 text-slate-400'} ${isConfirming ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isConfirming}
                            >
                                <Mic size={40} className={`${isListening ? 'text-emerald-500 animate-pulse' : 'text-slate-300'} transition-all`} strokeWidth={1} />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em]">{isListening ? t.listening : t.voice}</span>
                            </button>

                            <button
                                onClick={() => { if (age) { setStep('biometric'); speak(t.bioTrustDesc); } }}
                                disabled={!age || isConfirming}
                                className="flex-1 rounded-3xl bg-slate-900 text-white font-black uppercase tracking-[0.4em] text-[13px] disabled:opacity-20 flex items-center justify-center gap-6 shadow-xl active:scale-95"
                            >
                                {t.confirm} <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'biometric' && (
                    <div className="w-full space-y-12 animate-scale-in">
                        <div className="text-center space-y-4 mb-8">
                            <h2 className="text-4xl font-black uppercase tracking-tight">{t.biometrics}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Heuristic Extraction Layer</p>
                        </div>
                        <div className="w-full max-w-3xl mx-auto p-1.5 rounded-[4.5rem] border border-slate-100 bg-slate-50 shadow-inner">
                            <BiometricEnrollment
                                language={language}
                                onComplete={(data) => {
                                    setStep('face');
                                    speak(t.faceVerificationTitle);
                                }}
                            />
                        </div>
                    </div>
                )}

                {step === 'face' && (
                    <div className="w-full space-y-12 animate-scale-in">
                        <div className="text-center space-y-4 mb-8">
                            <h2 className="text-4xl font-black uppercase tracking-tight">{t.livenessScan}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Optical Symmetry Scan</p>
                        </div>
                        <div className="w-full max-w-3xl mx-auto p-1.5 rounded-[4.5rem] border border-slate-100 bg-slate-50 shadow-inner">
                            <SequentialFaceVerification
                                language={language}
                                onComplete={(img, seq) => handleRegister({ face: img, liveness: seq })}
                            />
                        </div>
                    </div>
                )}

                {step === 'reveal' && (
                    <div className="text-center space-y-16 flex flex-col items-center animate-scale-in">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black uppercase tracking-tight">{t.regSuccess}</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400">Institutional Access Key</p>
                        </div>

                        <div className="p-16 rounded-[4.5rem] bg-slate-50 border border-slate-100 w-full max-w-2xl shadow-inner">
                            <div className="text-[10rem] font-black text-emerald-600 leading-none tracking-widest">
                                {generatedCode}
                            </div>
                        </div>

                        <div className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 flex items-center gap-6">
                            <ArrowRight size={20} className="animate-bounce" /> {t.redirectingToLogin}
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mt-12 p-8 rounded-3xl bg-red-50 border border-red-100 text-red-600 text-center animate-shake flex flex-col items-center gap-4">
                        <AlertCircle size={40} className="opacity-30" />
                        <span className="text-[11px] font-black uppercase tracking-widest">{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConversationalRegister;

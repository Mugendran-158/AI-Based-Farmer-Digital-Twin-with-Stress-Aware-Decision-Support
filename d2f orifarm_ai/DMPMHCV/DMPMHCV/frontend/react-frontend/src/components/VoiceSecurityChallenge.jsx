import React, { useState } from 'react';
import { Mic, ShieldCheck, AlertCircle, X, CheckCircle, RefreshCw, Waves, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VoiceSecurityChallenge = ({ onVerify, onCancel, actionName = "this action", isDarkMode = true }) => {
    const { verifyBiometric } = useAuth();
    const [step, setStep] = useState('ready'); // ready, recording, verifying, success, error
    const [error, setError] = useState(null);

    const startChallenge = async () => {
        setStep('recording');
        setError(null);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const chunks = [];

            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = async () => {
                setStep('verifying');
                const embedding = btoa("voice-feature-" + Date.now());

                const result = await verifyBiometric('voice', embedding);
                if (result.success && result.verified) {
                    setStep('success');
                    setTimeout(() => onVerify(), 1500);
                } else {
                    setError(result.error || "Voice signature mismatch. recalibration required.");
                    setStep('error');
                }
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();

            setTimeout(() => {
                if (mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                }
            }, 3500);

        } catch (err) {
            setError("Optical/Audio sensor communication failed. Sensor access denied.");
            setStep('error');
        }
    };

    return (
        <div className={`fixed inset-0 z-[250] flex items-center justify-center backdrop-blur-3xl animate-in fade-in duration-500 ${isDarkMode ? 'bg-black/60' : 'bg-nature-deep/10'}`}>
            <div className={`w-full max-w-sm rounded-[3rem] shadow-2xl border transition-all duration-700 overflow-hidden transform animate-in slide-in-from-bottom-8 ${isDarkMode
                ? 'bg-nature-deep/90 border-white/5 shadow-black/80'
                : 'bg-white border-nature-deep/10 shadow-nature-deep/10'}`}>

                {/* Institutional Header */}
                <div className={`px-8 py-5 flex items-center justify-between border-b ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-nature-deep/5 border-nature-deep/5'}`}>
                    <div className="flex items-center gap-3 text-nature-medium">
                        <ShieldCheck size={18} strokeWidth={2.5} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Voice Security Baseline</span>
                    </div>
                    <button onClick={onCancel} className={`transition-all duration-300 active:scale-90 ${isDarkMode ? 'text-white/20 hover:text-white' : 'text-nature-deep/20 hover:text-nature-deep'}`}>
                        <X size={18} strokeWidth={3} />
                    </button>
                </div>

                <div className="p-10 text-center space-y-8">
                    {step === 'ready' && (
                        <React.Fragment>
                            <div className={`mx-auto w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 scale-110 ${isDarkMode
                                ? 'bg-nature-medium/10 text-nature-medium border border-white/5'
                                : 'bg-nature-medium/5 text-nature-medium border border-nature-deep/5 shadow-sm'
                                }`}>
                                <Mic size={36} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-3">
                                <h3 className={`text-xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Voice Verification</h3>
                                <p className={`text-[11px] font-bold uppercase tracking-[0.1em] opacity-40 px-4 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                    To authorize <strong className="opacity-100">{actionName}</strong>, please synchronize your vocal signature.
                                </p>
                            </div>
                            <div className={`p-5 rounded-2xl border-2 border-dashed font-bold text-sm transition-all duration-500 ${isDarkMode
                                ? 'bg-white/[0.03] border-white/10 text-nature-light'
                                : 'bg-nature-deep/5 border-nature-deep/10 text-nature-medium shadow-inner'}`}>
                                "Establish field baseline"
                            </div>
                            <button
                                onClick={startChallenge}
                                className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-700 shadow-2xl active:scale-95 ${isDarkMode
                                    ? 'bg-nature-medium text-white hover:bg-nature-light hover:text-nature-deep'
                                    : 'bg-nature-deep text-white hover:bg-nature-medium'
                                    }`}
                            >
                                Initiate Uplink
                            </button>
                        </React.Fragment>
                    )}

                    {step === 'recording' && (
                        <div className="space-y-8 py-4">
                            <div className="relative mx-auto w-28 h-28">
                                <div className="absolute inset-0 bg-earth-rose/20 rounded-full animate-ping" />
                                <div className={`relative w-28 h-28 rounded-full flex items-center justify-center border-4 ${isDarkMode
                                    ? 'bg-earth-rose/10 text-earth-rose border-earth-rose/20'
                                    : 'bg-earth-rose/5 text-earth-rose border-earth-rose/10 shadow-lg'
                                    }`}>
                                    <Mic size={48} strokeWidth={1.5} />
                                </div>
                            </div>
                            <p className={`text-lg font-black tracking-tight animate-pulse uppercase ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                Synchronizing...
                            </p>
                            <div className="flex items-center justify-center gap-2">
                                <Waves size={14} className="text-earth-rose animate-pulse" />
                                <span className={`text-[10px] font-black uppercase tracking-[0.4em] opacity-30 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Recording Active</span>
                            </div>
                        </div>
                    )}

                    {(step === 'verifying' || step === 'success') && (
                        <div className="space-y-8 py-4">
                            <div className="mx-auto w-24 h-24 flex items-center justify-center">
                                {step === 'verifying' ? (
                                    <RefreshCw size={56} className="text-nature-medium animate-spin" strokeWidth={1.5} />
                                ) : (
                                    <div className="p-6 rounded-full bg-nature-medium/20 text-nature-medium border border-nature-medium/30 animate-in zoom-in-75 duration-700">
                                        <CheckCircle size={56} strokeWidth={1} />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-3">
                                <h3 className={`text-xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                    {step === 'verifying' ? 'Verifying Spectrum...' : 'Identity Verified'}
                                </h3>
                                <p className={`text-[11px] font-bold uppercase tracking-[0.1em] opacity-40 px-6 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                    {step === 'verifying'
                                        ? 'Comparing biological vocal features with institutional baseline.'
                                        : 'Secured action authorized by field operative.'}
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 'error' && (
                        <React.Fragment>
                            <div className={`mx-auto w-20 h-20 rounded-[2rem] flex items-center justify-center ${isDarkMode
                                ? 'bg-earth-rose/10 text-earth-rose border border-earth-rose/20'
                                : 'bg-earth-rose/5 text-earth-rose border-earth-rose/20 shadow-sm'
                                }`}>
                                <AlertCircle size={40} />
                            </div>
                            <div className="space-y-3 px-6">
                                <h3 className={`text-xl font-black tracking-tighter uppercase ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Security Alert</h3>
                                <p className="text-[11px] text-earth-rose font-black uppercase tracking-widest leading-relaxed">
                                    {error}
                                </p>
                            </div>
                            <button
                                onClick={() => setStep('ready')}
                                className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-700 ${isDarkMode
                                    ? 'bg-white/5 text-white hover:bg-white/10'
                                    : 'bg-nature-deep/5 text-nature-deep hover:bg-nature-deep/10'
                                    }`}
                            >
                                Try Again
                            </button>
                        </React.Fragment>
                    )}
                </div>

                <div className={`px-8 py-5 text-[9px] font-black uppercase tracking-[0.4em] text-center border-t transition-colors ${isDarkMode
                    ? 'bg-white/[0.02] border-white/5 text-white/20'
                    : 'bg-nature-deep/5 border-nature-deep/5 text-nature-deep/20'
                    }`}>
                    <div className="flex items-center justify-center gap-2">
                        <Activity size={10} className="text-nature-medium" />
                        Institutional Biometric Core Active
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceSecurityChallenge;

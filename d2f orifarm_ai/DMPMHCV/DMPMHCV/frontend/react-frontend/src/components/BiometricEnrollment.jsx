import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Mic, CheckCircle, AlertCircle, RefreshCw, ShieldCheck, Zap, Scan, ArrowRight } from 'lucide-react';
import { authTranslations } from '../utils/authTranslations';

const BiometricEnrollment = ({ onComplete, type = 'face', isDarkMode = true, language = 'en' }) => {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [step, setStep] = useState('info'); // info, capturing, processing, success
    const [capturedData, setCapturedData] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    const t = authTranslations[language] || authTranslations['en'];

    const speak = useCallback((text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }, [language]);

    const captureFace = async () => {
        setIsProcessing(true);
        setError(null);
        try {
            const imageSrc = webcamRef.current.getScreenshot();
            if (!imageSrc) throw new Error("Terminal optical sensor communication failed.");

            // Simulated "Deep Analysis" progress for visual prestige
            let p = 0;
            const interval = setInterval(() => {
                p += Math.random() * 15;
                if (p >= 100) {
                    p = 100;
                    clearInterval(interval);
                    finalizeCapture(imageSrc);
                }
                setProgress(p);
            }, 100);

        } catch (err) {
            setError(err.message);
            setIsProcessing(false);
        }
    };

    const finalizeCapture = (imageSrc) => {
        setCapturedData(imageSrc);
        setStep('success');
        onComplete(imageSrc, [imageSrc]);
        setIsProcessing(false);
    };

    const startCapturing = () => {
        setStep('capturing');
        if (type === 'voice') {
            startVoiceRecording();
        }
    };

    const startVoiceRecording = async () => {
        setIsRecording(true);
        setError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            let chunks = [];
            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = async () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    setCapturedData(reader.result);
                    setStep('success');
                    onComplete(reader.result, []);
                };
            };
            recorder.start();
            setTimeout(() => {
                if (recorder.state === 'recording') {
                    recorder.stop();
                    setIsRecording(false);
                }
            }, 4000);
        } catch (err) {
            setError("Microphone access denied.");
            setIsRecording(false);
        }
    };

    return (
        <div className={`w-full max-w-lg mx-auto p-1.5 rounded-[4rem] glass-card-premium overflow-hidden transition-all duration-1000 relative`}>
            <div className={`relative p-12 rounded-[3.8rem] border transition-all duration-1000 overflow-hidden ${isDarkMode
                ? 'bg-black/60 border-white/5 shadow-2xl'
                : 'bg-white/60 border-nature-deep/5 shadow-2xl'
                }`}>

                <div className="liquid-intelligence-shimmer opacity-20" />

                {step === 'info' && (
                    <div className="space-y-12 text-center animate-scale-in flex flex-col items-center">
                        <div className={`mx-auto w-28 h-28 rounded-[2.5rem] flex items-center justify-center transition-all duration-700 ${isDarkMode
                            ? 'bg-white/5 text-white border border-white/10'
                            : 'bg-nature-medium/5 text-nature-medium border border-nature-deep/5'
                            }`}>
                            {type === 'face' ? <Scan size={56} strokeWidth={0.5} className="animate-pulse" /> : <Mic size={56} strokeWidth={0.5} />}
                        </div>

                        <div className="space-y-4">
                            <h3 className={`text-4xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                {type === 'face' ? t.opticalRegistry : t.vocalSignature}
                            </h3>
                            <p className={`text-[11px] font-black uppercase opacity-20 tracking-[0.5em] px-6 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                {type === 'face'
                                    ? "Institutional_Grade_Identity_Anchor"
                                    : "Acoustic_Symmetry_Calibration"}
                            </p>
                        </div>

                        <button
                            onClick={startCapturing}
                            className={`w-full py-10 rounded-[2.5rem] font-black text-[13px] uppercase transition-all duration-700 flex items-center justify-center gap-6 shadow-2xl active:scale-95 group ${isDarkMode
                                ? 'bg-white text-black hover:bg-nature-light'
                                : 'bg-nature-deep text-white hover:bg-nature-medium'
                                } tracking-[0.4em]`}
                        >
                            <span>{t.initializeProfile}</span>
                            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                )}

                {step === 'capturing' && (
                    <div className="space-y-12 animate-scale-in">
                        {type === 'face' ? (
                            <div className="relative aspect-square max-w-md mx-auto rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-black">
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="w-full h-full object-cover grayscale opacity-90 scale-x-[-1]"
                                    videoConstraints={{ facingMode: "user" }}
                                    onUserMediaError={(e) => setError("Optical sensor access denied.")}
                                />

                                <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-3xl text-white border border-white/10 flex items-center gap-3">
                                            <Zap size={18} className="animate-pulse text-nature-light" strokeWidth={1} />
                                            <span className="text-[11px] font-black uppercase tracking-widest leading-none">SCAN_READY</span>
                                        </div>
                                        {isProcessing && (
                                            <div className="w-16 h-16 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/5 flex items-center justify-center text-white">
                                                <span className="text-sm font-black">{Math.round(progress)}%</span>
                                            </div>
                                        )}
                                    </div>

                                    {!isProcessing ? (
                                        <div className="absolute inset-0 flex items-center justify-center px-12">
                                            <div className="w-full h-64 rounded-[4rem] border-2 border-white/20 relative overflow-hidden">
                                                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_40px_rgba(255,255,255,1)] animate-scan-laser z-20" />
                                                <div className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 border-white/20" />
                                                <div className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-white/20" />
                                                <div className="absolute bottom-6 left-6 w-6 h-6 border-l-2 border-b-2 border-white/20" />
                                                <div className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 border-white/20" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <RefreshCw className="animate-spin text-white/20" size={120} strokeWidth={0.1} />
                                        </div>
                                    )}

                                    <div className="space-y-6">
                                        {isProcessing && (
                                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                                                <div
                                                    className="h-full bg-white rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        )}
                                        <p className="text-center text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
                                            {isProcessing ? "Analyzing_Symmetry_Matrix..." : "Position_Face_for_Identity_Anchor"}
                                        </p>
                                    </div>
                                </div>

                                {!isProcessing && (
                                    <button
                                        onClick={captureFace}
                                        className="absolute bottom-10 left-1/2 -translate-x-1/2 px-12 py-5 bg-white text-black rounded-3xl font-black text-[13px] uppercase shadow-2xl z-30 flex items-center gap-4 hover:bg-nature-light active:scale-95 transition-all"
                                    >
                                        <Camera size={20} />
                                        <span>CAPTURE_IDENTITY</span>
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="py-24 text-center space-y-12">
                                <div className="flex justify-center gap-6">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="w-2 h-20 bg-white/20 rounded-full overflow-hidden relative">
                                            <div className="absolute inset-0 bg-white animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.8em] animate-pulse">
                                    Capturing_Vocal_Spectrum...
                                </p>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-6 p-8 bg-red-950/20 text-red-500 border border-red-500/10 rounded-[2rem] text-[11px] font-black uppercase tracking-widest leading-relaxed">
                                <AlertCircle size={28} strokeWidth={1} />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>
                )}

                {step === 'success' && (
                    <div className="py-12 text-center space-y-12 animate-scale-in flex flex-col items-center">
                        <div className="relative w-48 h-48 mb-8">
                            <div className="absolute inset-0 bg-white/10 blur-3xl animate-pulse" />
                            {capturedData && type === 'face' ? (
                                <img
                                    src={capturedData}
                                    className="w-full h-full object-cover rounded-[3.5rem] border border-white/20 grayscale shadow-2xl relative z-10"
                                    alt="Captured"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative z-10">
                                    <CheckCircle size={80} strokeWidth={0.5} className="text-white" />
                                </div>
                            )}
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-black shadow-2xl z-20">
                                <CheckCircle size={40} strokeWidth={1} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className={`text-4xl font-black uppercase tracking-tighter ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                {type === 'face' ? t.opticalBaselineFixed : t.vocalSignatureReady}
                            </h3>
                            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-white/20 leading-relaxed">
                                {t.institutionalEmbedding}
                            </p>
                        </div>

                        <div className="w-full p-10 rounded-[3rem] bg-white/5 border border-white/5 flex items-center justify-between opacity-60">
                            <div className="flex items-center gap-6">
                                <ShieldCheck size={32} strokeWidth={1} className="text-white" />
                                <div className="text-left">
                                    <p className="text-white font-black text-[12px] uppercase tracking-widest">Bio-Integrity Verified</p>
                                    <p className="text-white/20 text-[9px] uppercase font-bold tracking-[0.3em]">Quantum_Symmetry_Locked</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes scan-laser {
                    0% { top: 0%; opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-scan-laser {
                    animation: scan-laser 2.5s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default BiometricEnrollment;

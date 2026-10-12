import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, ShieldCheck, Activity, Scan, AlertCircle, CheckCircle, RefreshCw, ArrowRight, Sparkles, Orbit, Binary, Atom } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';

const SequentialFaceVerification = ({ onComplete, language = 'en' }) => {
    const webcamRef = useRef(null);
    const [step, setStep] = useState('prepare'); // prepare, scanning, completed
    const [progress, setProgress] = useState(0);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { speak } = useTTS(language);

    const t = {
        en: {
            title: "SECURITY_SCAN",
            subtitle: "Institutional_Verification_Pulse",
            prepare: "Postion face within the symmetry field",
            start: "BEGIN_SECURE_SCAN",
            scanning: "Biometric_Matrix_Syncing...",
            completed: "PROTOCOL_SUCCESS",
            desc: "Liveness sequence captured and encrypted.",
            establishing: "ESTABLISHING_IDENTITY...",
            error: "Optical sync failed. Re-centering...",
        },
        ta: {
            title: "பாதுகாப்பு_ஸ்கேன்",
            subtitle: "நிறுவன_சரிபார்ப்பு_துடிப்பு",
            prepare: "முகத்தை சட்டகத்திற்குள் வைக்கவும்",
            start: "ஸ்கேனை_தொடங்கவும்",
            scanning: "பயோமெட்ரிக் மேட்ரிக்ஸ் ஒத்திசைக்கப்படுகிறது...",
            completed: "வெற்றி",
            desc: "உயிரியல் வரிசை குறியாக்கம் செய்யப்பட்டது.",
            establishing: "அடையாளத்தை நிறுவுகிறது...",
            error: "தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்...",
        }
    }[language];

    const startScan = useCallback(() => {
        setStep('scanning');
        setProgress(0);
        speak(t.scanning);

        const duration = 3000;
        const interval = 30;
        const totalSteps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const p = (currentStep / totalSteps) * 100;
            setProgress(p);

            if (p >= 100) {
                clearInterval(timer);
                completeScan();
            }
        }, interval);
    }, [language, speak, t.scanning]);

    const completeScan = () => {
        setIsProcessing(true);
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                setCapturedImage(imageSrc);
                setStep('completed');
                onComplete(imageSrc, [imageSrc]);
            } else {
                setStep('prepare');
                speak(t.error);
            }
        }
        setIsProcessing(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-1.5 rounded-[4rem] glass-card-premium overflow-hidden transition-all duration-1000">
            <div className="relative p-12 rounded-[3.8rem] bg-black/60 border border-white/5 min-h-[550px] flex flex-col justify-center overflow-hidden">
                <div className="liquid-intelligence-shimmer opacity-20" />

                {step === 'prepare' && (
                    <div className="space-y-12 text-center animate-scale-in flex flex-col items-center">
                        <div className="relative mb-4">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-2xl">
                                <Scan size={64} strokeWidth={0.5} className="animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-4xl font-black tracking-tighter uppercase text-white leading-none">{t.title}</h3>
                            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">{t.subtitle}</p>
                        </div>

                        <div className="relative aspect-video w-full max-w-md rounded-[2.5rem] overflow-hidden border border-white/5 grayscale opacity-20">
                            <Webcam audio={false} className="w-full h-full object-cover" />
                        </div>

                        <button
                            onClick={startScan}
                            className="quantum-btn-cosmic w-full py-10"
                        >
                            <span>{t.start}</span>
                            <ArrowRight size={24} className="inline-block ml-4" />
                        </button>
                    </div>
                )}

                {step === 'scanning' && (
                    <div className="space-y-10 animate-scale-in">
                        <div className="relative aspect-square max-w-md mx-auto rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-2xl">
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="w-full h-full object-cover grayscale opacity-90"
                            />

                            <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-3xl text-white border border-white/10 flex items-center gap-3">
                                        <Activity size={18} className="animate-pulse" strokeWidth={1} />
                                        <span className="text-[11px] font-black uppercase tracking-widest leading-none">ANALYZING</span>
                                    </div>
                                    <div className="w-16 h-16 rounded-2xl bg-black/60 backdrop-blur-3xl border border-white/5 flex items-center justify-center text-white">
                                        <span className="text-sm font-black">{Math.round(progress)}%</span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center px-12">
                                    <div className="w-full h-64 rounded-[4rem] border-2 border-white/20 relative overflow-hidden">
                                        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_40px_rgba(255,255,255,1)] animate-scan-laser z-20" />
                                        <div className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 border-white/20" />
                                        <div className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-white/20" />
                                        <div className="absolute bottom-6 left-6 w-6 h-6 border-l-2 border-b-2 border-white/20" />
                                        <div className="absolute bottom-6 right-6 w-6 h-6 border-r-2 border-b-2 border-white/20" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                                        <div
                                            className="h-full bg-white rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-center text-white/40 text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">
                                        {t.establishing}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'completed' && (
                    <div className="text-center space-y-12 animate-scale-in flex flex-col items-center">
                        <div className="relative w-48 h-48">
                            <div className="absolute inset-0 bg-white/10 blur-3xl animate-pulse" />
                            {capturedImage && (
                                <img
                                    src={capturedImage}
                                    className="w-full h-full object-cover rounded-[3.5rem] border border-white/20 grayscale shadow-2xl relative z-10"
                                    alt="Captured"
                                />
                            )}
                            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black shadow-2xl z-20">
                                <CheckCircle size={32} strokeWidth={1} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-5xl font-black tracking-tighter uppercase text-white leading-none">{t.completed}</h3>
                            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20 leading-relaxed px-12">{t.desc}</p>
                        </div>

                        <div className="w-full p-10 rounded-[3rem] bg-white/5 border border-white/5 flex items-center justify-between opacity-60">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white">
                                    <ShieldCheck size={28} strokeWidth={1} />
                                </div>
                                <div className="text-left">
                                    <p className="text-white font-black text-[12px] uppercase tracking-widest">Biometric_Hash_Generated</p>
                                    <p className="text-white/20 text-[9px] uppercase font-bold tracking-[0.3em]">Institutional_Storage_Sync</p>
                                </div>
                            </div>
                            <Orbit className="text-white animate-spin-slow opacity-20" size={24} strokeWidth={1} />
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
                    animation: scan-laser 2s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default SequentialFaceVerification;

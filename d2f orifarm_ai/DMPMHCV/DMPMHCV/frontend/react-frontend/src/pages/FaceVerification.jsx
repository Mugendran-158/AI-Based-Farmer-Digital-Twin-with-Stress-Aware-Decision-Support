import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SequentialFaceVerification from '../components/SequentialFaceVerification';
import { ArrowLeft, ShieldCheck, Orbit, Cpu, Binary, Atom, Zap, Scan } from 'lucide-react';

const TelemetryHUD = ({ label, value }) => (
    <div className="institutional-telemetry-vertical">
        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{label}</span>
        <span className="text-[12px] font-black text-white/60 uppercase tracking-widest">{value}</span>
    </div>
);

const FaceVerification = () => {
    const navigate = useNavigate();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleComplete = (image, sequence) => {
        console.log("Verification sequence captured:", sequence.length);
        setIsVerified(true);
        // Simulate a delay before redirecting
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6 bg-[#020617] perspective-container text-white">
            {/* LEVEL 13 ATMOSPHERE */}
            <div className="neural-warp" />
            {[...Array(6)].map((_, i) => (
                <div key={i} className="dna-stream" style={{ left: `${15 + i * 15}%`, animationDelay: `${i * 2}s` }} />
            ))}

            <div className="absolute top-0 left-0 w-full h-full opacity-[0.015] pointer-events-none select-none overflow-hidden">
                <div className="sovereign-z-text" style={{ top: '10%', left: '-2%', transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}>OPTICAL</div>
                <div className="sovereign-z-text" style={{ bottom: '10%', right: '-2%', transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}>VERIFY</div>
            </div>

            {/* HUD */}
            <div className="absolute top-10 left-10 z-50 flex gap-12 opacity-40">
                <TelemetryHUD label="TERM" value="LIVENESS_ACTIVE" />
                <TelemetryHUD label="AUTH" value="BIOMETRIC_v13" />
            </div>

            <div className="relative z-10 w-full max-w-[1600px] flex flex-col items-center">
                <div
                    className="w-full max-w-4xl perspective-3d"
                    style={{ transform: `rotateY(${mousePos.x * 0.05}deg) rotateX(${mousePos.y * -0.05}deg)` }}
                >
                    {isVerified ? (
                        <div className="text-center space-y-16 animate-scale-in flex flex-col items-center">
                            <div className="relative">
                                <div className="w-64 h-64 rounded-[4rem] bg-nature-medium/20 border-2 border-nature-medium flex items-center justify-center text-nature-medium shadow-[0_0_100px_rgba(76,107,79,0.3)] animate-pulse">
                                    <ShieldCheck size={120} strokeWidth={0.5} />
                                </div>
                                <div className="absolute -inset-8 border-2 border-nature-medium/10 rounded-[5rem] animate-[ping_3s_infinite]" />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
                                    ACCESS_GRANTED
                                </h1>
                                <p className="text-nature-light/40 text-[12px] font-black uppercase tracking-[1.5em]">
                                    Identity_Integrity_Confirmed
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <span className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">SECURE_HANDSHAKE_COMPLETE</span>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-16 flex flex-col items-center">
                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
                                    <Scan size={14} className="text-nature-light" />
                                    <span>LIVENESS_PROTOCOL_ENGAGED</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
                                    OPTICAL_HUB
                                </h1>
                                <p className="text-white/20 text-[11px] font-black uppercase tracking-[1em] max-w-2xl mx-auto leading-relaxed">
                                    Position face within the neural symmetry field for liveness validation.
                                </p>
                            </div>

                            <SequentialFaceVerification
                                onComplete={handleComplete}
                                language="en"
                            />

                            <button
                                onClick={() => navigate(-1)}
                                className="text-white/10 hover:text-white text-[12px] font-black uppercase tracking-[1em] transition-all flex items-center gap-4 mt-8"
                            >
                                <ArrowLeft size={20} /> ABORT_VERIFICATION
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* INSTITUTIONAL FOOTER */}
            <footer className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-10 pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[3em] text-white">GATEWAY_STABLE_v13.9</span>
                <div className="h-px flex-1 mx-12 bg-gradient-to-r from-transparent via-white to-transparent" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-nature-light">TIER_ALPHA</span>
            </footer>
        </div>
    );
};

export default FaceVerification;

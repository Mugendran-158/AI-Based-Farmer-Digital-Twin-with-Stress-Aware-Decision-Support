import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Camera, Mic, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';
import BiometricEnrollment from '../components/BiometricEnrollment';

const SecuritySettings = ({ isDarkMode: globalIsDarkMode }) => {
    const navigate = useNavigate();
    const { user, enrollBiometrics } = useAuth();
    const [activeEnrollment, setActiveEnrollment] = useState(null); // null, 'face', 'voice'

    const isDarkMode = globalIsDarkMode ?? true;

    const handleComplete = async (embedding) => {
        const typeField = activeEnrollment === 'face' ? 'face_embedding' : 'voice_embedding';
        await enrollBiometrics({ [typeField]: embedding });
        setActiveEnrollment(null);
    };

    return (
        <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${isDarkMode ? 'bg-[#050505]' : 'bg-slate-50'}`}>
            {/* Atmospheric Background Layer */}
            <div className={`absolute inset-0 pointer-events-none opacity-20 ${isDarkMode ? 'bg-[radial-gradient(circle_at_50%_0%,#1A2E22_0%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_0%,#4C6B4F_0%,transparent_70%)]'}`} />
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/')}
                    className={`flex items-center gap-2 mb-12 font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-nature-deep'}`}
                >
                    <ArrowLeft size={14} strokeWidth={3} />
                    System Dashboard
                </button>

                <div className="space-y-8">
                    <div className="flex flex-col gap-3 mb-16 relative z-10">
                        <div className={`px-3 py-1 rounded-full border mb-2 w-fit flex items-center gap-2 ${isDarkMode ? 'bg-nature-medium/10 border-nature-medium/20 text-nature-medium' : 'bg-nature-medium/5 border-nature-medium/10 text-nature-deep'}`}>
                            <Shield size={10} />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em]">Security & Privacy Matrix</span>
                        </div>
                        <h1 className={`text-5xl md:text-7xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>PROTECTION <span className="opacity-40 font-light">CORE</span></h1>
                        <p className={`text-lg font-medium opacity-60 max-w-2xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Configure multi-layered biometric identity registry for decentralized agricultural protection.
                        </p>
                    </div>

                    {activeEnrollment ? (
                        <div className="animate-in fade-in zoom-in-95 duration-500 relative z-10">
                            <div className="flex items-center justify-between mb-6 px-4">
                                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-nature-medium' : 'text-nature-deep'}`}>
                                    Configuring {activeEnrollment === 'face' ? 'Optical Registry' : 'Vocal Signature'}
                                </span>
                                <button
                                    onClick={() => setActiveEnrollment(null)}
                                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-nature-deep'}`}
                                >
                                    Terminate
                                </button>
                            </div>
                            <div className={`p-1 rounded-[3rem] border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-2xl'}`}>
                                <BiometricEnrollment type={activeEnrollment} onComplete={handleComplete} isDarkMode={isDarkMode} />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Face ID Card */}
                            <div className={`p-10 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden ${isDarkMode ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl'}`}>
                                <div className="flex items-start justify-between mb-10">
                                    <div className={`p-5 rounded-2xl transition-all duration-500 ${isDarkMode ? 'bg-nature-medium/10 text-nature-medium' : 'bg-nature-medium/5 text-nature-deep shadow-inner'}`}>
                                        <Camera size={28} strokeWidth={1.5} />
                                    </div>
                                    {user?.has_face_id ? (
                                        <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-emerald-500/20">
                                            Registered
                                        </span>
                                    ) : (
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'bg-white/5 text-white/30' : 'bg-slate-100 text-slate-400'}`}>
                                            Inactive
                                        </span>
                                    )}
                                </div>
                                <h3 className={`text-2xl font-black mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Optical Registry</h3>
                                <p className={`text-sm font-medium mb-10 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Sovereign visual liveness matching for password-less verification and account restoration.
                                </p>
                                <button
                                    onClick={() => setActiveEnrollment('face')}
                                    className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${user?.has_face_id
                                        ? (isDarkMode ? 'bg-white/[0.05] border border-white/10 text-white hover:bg-white/10' : 'bg-slate-50 border border-slate-200 text-nature-deep hover:bg-slate-100')
                                        : 'bg-nature-medium text-white hover:bg-nature-deep shadow-lg shadow-nature-medium/20'}`}
                                >
                                    {user?.has_face_id ? 'Recalibrate Vision' : 'Initialize Registry'}
                                </button>
                            </div>

                            {/* Voice ID Card */}
                            <div className={`p-10 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden ${isDarkMode ? 'bg-white/[0.03] border-white/5 hover:bg-white/[0.05]' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl'}`}>
                                <div className="flex items-start justify-between mb-10">
                                    <div className={`p-5 rounded-2xl transition-all duration-500 ${isDarkMode ? 'bg-trust-blue/10 text-trust-blue' : 'bg-trust-blue/5 text-trust-blue shadow-inner'}`}>
                                        <Mic size={28} strokeWidth={1.5} />
                                    </div>
                                    {user?.has_voice_id ? (
                                        <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-emerald-500/20">
                                            Registered
                                        </span>
                                    ) : (
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'bg-white/5 text-white/30' : 'bg-slate-100 text-slate-400'}`}>
                                            Optional
                                        </span>
                                    )}
                                </div>
                                <h3 className={`text-2xl font-black mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Vocal Signature</h3>
                                <p className={`text-sm font-medium mb-10 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Spectrum analysis of vocal biomarkers for authorization of high-priority transactions.
                                </p>
                                <button
                                    onClick={() => setActiveEnrollment('voice')}
                                    className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-500 ${user?.has_voice_id
                                        ? (isDarkMode ? 'bg-white/[0.05] border border-white/10 text-white hover:bg-white/10' : 'bg-slate-50 border border-slate-200 text-nature-deep hover:bg-slate-100')
                                        : 'bg-trust-blue text-white hover:bg-[#1A3F50] shadow-lg shadow-trust-blue/20'}`}
                                >
                                    {user?.has_voice_id ? 'Update Signature' : 'Setup Signature'}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className={`p-10 rounded-[2.5rem] border relative overflow-hidden transition-all duration-700 ${isDarkMode ? 'bg-emerald-500/[0.03] border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
                        <div className="flex gap-8 items-start">
                            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white text-emerald-600 shadow-sm'}`}>
                                <Shield className="animate-pulse" size={24} />
                            </div>
                            <div>
                                <h4 className={`text-lg font-black mb-2 tracking-tight ${isDarkMode ? 'text-emerald-400' : 'text-emerald-800'}`}>
                                    Bio-Integrity Protocol Active
                                </h4>
                                <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-emerald-300/50' : 'text-emerald-700'}`}>
                                    Strategic monitoring sub-routines are currently auditing behavior patterns for anomalies. <br className="hidden md:block" />
                                    Your institutional biometric core ensures maximum asset protection and identity sovereignty.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;

import React, { useState, useEffect } from 'react';
import { User, Shield, Sparkles, Heart } from 'lucide-react';

import mentorImg from '../assets/avatars/mentor.png';
import protectorImg from '../assets/avatars/protector.png';
import helperImg from '../assets/avatars/helper.png';
import guardianImg from '../assets/avatars/guardian.png';
import roboImg from '../assets/avatars/robo_farmer.png';

const AnimeAvatar = ({
    state = 'idle', // 'idle', 'listening', 'thinking', 'speaking', 'success'
    isSpeaking = false,
    style = 'mentor', // 'mentor', 'protector', 'helper', 'guardian'
    isDarkMode = false,
    targetModule = null, // To coordinate pointing
    isPointing = false
}) => {
    const [blink, setBlink] = useState(false);
    const [headTilt, setHeadTilt] = useState(0);

    // Random blinking logic
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setBlink(true);
            setTimeout(() => setBlink(false), 150);
        }, Math.random() * 3000 + 4000);
        return () => clearInterval(blinkInterval);
    }, []);

    // Subtle head movement logic
    useEffect(() => {
        const tiltInterval = setInterval(() => {
            setHeadTilt(Math.random() * 10 - 5);
        }, 5000);
        return () => clearInterval(tiltInterval);
    }, []);

    const avatars = {
        mentor: {
            name: 'Silvers Rayleigh',
            role: 'The Dark King',
            image: mentorImg,
            color: 'from-emerald-400 to-teal-600',
            icon: <Sparkles size={16} />
        },
        protector: {
            name: 'Roronoa Zoro',
            role: 'Pirate Hunter',
            image: protectorImg,
            color: 'from-blue-500 to-indigo-700',
            icon: <Shield size={16} />
        },
        helper: {
            name: 'Monkey D. Luffy',
            role: 'Joy Boy',
            image: helperImg,
            color: 'from-orange-400 to-red-500',
            icon: <Heart size={16} />
        },
        guardian: {
            name: 'Kozuki Momonosuke',
            role: 'Shogun of Wano',
            image: guardianImg,
            color: 'from-slate-500 to-slate-800',
            icon: <User size={16} />
        },
        robo: {
            name: 'BUMI V2.0',
            role: 'Robo Farmer',
            image: roboImg,
            color: 'from-emerald-500 to-blue-600',
            icon: <Sparkles size={16} />
        }
    };

    const activeAvatar = avatars[style] || avatars.mentor;

    return (
        <div className="relative flex flex-col items-center">
            {/* Aura/Halo Effects */}
            <div className={`absolute -inset-4 rounded-full blur-[60px] opacity-30 transition-all duration-1000 ${state === 'listening' ? 'bg-emerald-500 scale-110 opacity-50' :
                state === 'thinking' ? 'bg-blue-500 animate-pulse' :
                    state === 'speaking' ? 'bg-amber-500 scale-125' :
                        'bg-slate-400'
                }`} />

            {/* Main Avatar Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                {/* Shadow */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 blur-xl rounded-full" />

                {/* The Image / Procedural Character */}
                <div className={`relative w-full h-full transition-all duration-700 ${state === 'listening' ? 'scale-105 -translate-y-2' :
                    state === 'speaking' ? 'animate-robo-speaking' :
                        'animate-float'
                    }`}>

                    {style === 'robo' ? (
                        /* BUMI V2.0 - PROCEDURAL COMPANION */
                        <div className="relative w-full h-full flex items-center justify-center">
                            <div className={`relative w-48 h-64 md:w-56 md:h-72 transition-all duration-500 ${state === 'speaking' ? 'scale-105' : ''} animate-robo-breathing`}>
                                {/* Head */}
                                <div
                                    className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl border-4 border-emerald-500/30 shadow-2xl z-20 transition-transform duration-[2000ms] animate-robo-head-sway"
                                    style={{ transform: `translateX(-50%) rotate(${headTilt}deg)` }}
                                >
                                    <div className="absolute inset-2 bg-slate-900 rounded-2xl flex flex-col items-center justify-center gap-2 overflow-hidden">
                                        {/* Digital Eyes */}
                                        <div className="flex gap-4">
                                            <div className={`w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] transition-all duration-200 ${blink ? 'scale-y-[0.1]' : (state === 'thinking' ? 'animate-ping' : 'animate-pulse')}`} />
                                            <div className={`w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] transition-all duration-200 ${blink ? 'scale-y-[0.1]' : (state === 'thinking' ? 'animate-ping' : 'animate-pulse')}`} />
                                        </div>
                                        {/* Digital Mouth / Speech Line */}
                                        <div className={`w-12 h-1 bg-emerald-400/50 rounded-full transition-all duration-300 ${state === 'speaking' ? 'h-3 w-10 animate-robo-talk-mouth' : ''}`} />
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent animate-robo-scan-line" />
                                    </div>
                                    {/* Antenna */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-slate-400">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                    </div>
                                </div>

                                {/* Body / Chassis */}
                                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-32 h-36 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2.5rem] border-4 border-white/20 shadow-xl z-10 overflow-hidden">
                                    <div className="absolute inset-4 border border-white/10 rounded-2xl bg-black/20 flex flex-col items-center justify-center gap-1">
                                        <Sparkles size={16} className="text-emerald-400 animate-pulse" />
                                        <div className="text-[6px] font-black text-white/40 tracking-[0.2em]">BUMI v2.0</div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>

                                {/* Arms */}
                                <div className={`absolute top-24 -left-4 w-6 h-20 bg-emerald-700/80 rounded-full border-2 border-white/10 origin-top ${isPointing ? 'animate-robo-point-left' : 'animate-robo-arm-left'}`} />
                                <div className={`absolute top-24 -right-4 w-6 h-20 bg-emerald-700/80 rounded-full border-2 border-white/10 origin-top ${isPointing ? 'animate-robo-point-right' : 'animate-robo-arm-right'}`} />

                                {/* Legs (Walking Mechanics) */}
                                <div className={`absolute -bottom-4 left-1/4 w-8 h-20 bg-slate-800 rounded-full border-2 border-white/10 origin-top ${state === 'thinking' ? 'animate-robo-walking-legs-fast' : 'animate-robo-walking-legs'}`} />
                                <div className={`absolute -bottom-4 right-1/4 w-8 h-20 bg-slate-800 rounded-full border-2 border-white/10 origin-top ${state === 'thinking' ? 'animate-robo-walking-legs-fast' : 'animate-robo-walking-legs'}`} style={{ animationDelay: '0.375s' }} />

                                {/* Ground Shadow */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/20 blur-md rounded-full animate-robo-shadow" />
                            </div>
                        </div>
                    ) : (
                        /* Standard Character Image */
                        <>
                            <img
                                src={activeAvatar.image}
                                alt={activeAvatar.name}
                                className={`w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 ${blink ? 'brightness-110 saturate-110' : ''}`}
                            />
                            {/* Mouth Movement (Simulated for Speaking) */}
                            {state === 'speaking' && (
                                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[15%] h-[5%] bg-red-400/20 blur-md animate-pulse rounded-full" />
                            )}
                        </>
                    )}
                </div>

                {/* State Indicators */}
                <div className="absolute -right-4 top-1/4 space-y-2">
                    {state === 'listening' && (
                        <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-lg shadow-emerald-500/30 animate-in slide-in-from-right duration-300">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        </div>
                    )}

                    {state === 'thinking' && (
                        <div className="bg-blue-500 text-white p-3 rounded-2xl shadow-lg shadow-blue-500/30 animate-spin-slow">
                            <Sparkles size={20} />
                        </div>
                    )}
                </div>
            </div>

            {/* Nameplate */}
            <div className={`mt-6 px-6 py-2 rounded-full border backdrop-blur-md transition-all duration-500 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/80 border-slate-200'
                }`}>
                <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-lg bg-gradient-to-br ${activeAvatar.color} text-white`}>
                        {activeAvatar.icon}
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                            {activeAvatar.role}
                        </span>
                        <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            {activeAvatar.name}
                        </span>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.5deg); }
        }
        @keyframes robo-breathing {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes robo-head-sway {
          0%, 100% { transform: translateX(-50%) rotate(-2deg); }
          50% { transform: translateX(-50%) rotate(2deg); }
        }
        @keyframes robo-walking-legs {
          0%, 100% { transform: rotate(10deg); }
          50% { transform: rotate(-10deg); }
        }
        @keyframes robo-walking-legs-fast {
          0%, 100% { transform: rotate(30deg); }
          50% { transform: rotate(-30deg); }
        }
        @keyframes robo-arm-left {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(15deg); }
        }
        @keyframes robo-arm-right {
            0%, 100% { transform: rotate(5deg); }
            50% { transform: rotate(-15deg); }
        }
        @keyframes robo-point-right {
            0%, 100% { transform: rotate(-90deg) translateX(10px); }
            50% { transform: rotate(-95deg) translateX(12px); }
        }
        @keyframes robo-point-left {
            0%, 100% { transform: rotate(90deg) translateX(-10px); }
            50% { transform: rotate(95deg) translateX(-12px); }
        }
        @keyframes robo-talk-mouth {
            0%, 100% { transform: scaleY(1); opacity: 0.5; }
            50% { transform: scaleY(3); opacity: 1; filter: blur(1px); }
        }
        @keyframes robo-scan-line {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        @keyframes robo-shadow {
            0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.2; }
            50% { transform: translateX(-50%) scale(1.1); opacity: 0.1; }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-robo-breathing { animation: robo-breathing 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        
        .animate-robo-head-sway { animation: robo-head-sway 3s ease-in-out infinite; }
        .animate-robo-walking-legs { animation: robo-walking-legs 1.5s ease-in-out infinite; }
        .animate-robo-walking-legs-fast { animation: robo-walking-legs-fast 0.5s ease-in-out infinite; }
        .animate-robo-arm-left { animation: robo-arm-left 2s ease-in-out infinite; }
        .animate-robo-arm-right { animation: robo-arm-right 2s ease-in-out infinite; }
        .animate-robo-point-right { animation: robo-point-right 1s ease-in-out infinite; }
        .animate-robo-point-left { animation: robo-point-left 1s ease-in-out infinite; }
        .animate-robo-talk-mouth { animation: robo-talk-mouth 0.2s ease-in-out infinite; }
        .animate-robo-scan-line { animation: robo-scan-line 2s linear infinite; }
        .animate-robo-shadow { animation: robo-shadow 1.5s ease-in-out infinite; }
      `}</style>
        </div>
    );
};

export default AnimeAvatar;

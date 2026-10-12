import React, { useMemo, useState } from 'react';
import BioluminescentLayer from '../BioluminescentLayer';
import { calculateBiologicalState } from '../BiologicalInferenceEngine';

/**
 * Procedural Realistic Plant
 * Renders high-fidelity stalks and organic shapes for crops using SVG paths.
 * NO IMAGES USED.
 */
const GenerativePlant = ({ type = 'WHEAT', scale = 1, season, weather, farmerActions, growthStage, sun }) => {
    const [isExplaining, setIsExplaining] = useState(false);
    const config = useMemo(() => {
        const isWinter = season === 'WINTER';
        switch (type) {
            case 'RICE':
                return {
                    name: 'Paddy Rice',
                    color: isWinter ? '#64748b' : '#065f46',
                    glow: 'rgba(5, 150, 105, 0.2)',
                    stalks: 5
                };
            case 'APPLE':
                return {
                    name: 'Orchard Crop',
                    color: isWinter ? '#94a3b8' : '#7f1d1d',
                    glow: 'rgba(239, 68, 68, 0.1)',
                    stalks: 3
                };
            default: // WHEAT
                return {
                    name: 'Golden Wheat',
                    color: isWinter ? '#475569' : '#854d0e',
                    glow: 'rgba(234, 179, 8, 0.2)',
                    stalks: 6
                };
        }
    }, [type, season]);

    const bioState = useMemo(() => {
        return calculateBiologicalState({
            season,
            weather,
            timeOfDay: sun || { isDay: true, altitude: 1 },
            cropType: type,
            actions: farmerActions || { irrigated: false, fertilized: false, observedStress: false },
            growthStage: growthStage || 'VEGETATIVE'
        });
    }, [season, weather, sun, type, farmerActions, growthStage]);

    const stalks = useMemo(() => {
        return [...Array(config.stalks)].map((_, i) => ({
            x: 50 + (i - config.stalks / 2) * 8,
            height: 60 + Math.random() * 30,
            curve: (Math.random() - 0.5) * 20,
            delay: Math.random() * 2
        }));
    }, [config]);

    const windEffect = weather?.windSpeed ? Math.max(0.5, 3 - weather.windSpeed / 6) : 2.5;

    return (
        <div
            className="group relative flex flex-col items-center pointer-events-auto cursor-help"
            style={{
                transform: `scale(${scale})`,
                transformStyle: 'preserve-3d'
            }}
            onClick={(e) => {
                e.stopPropagation();
                setIsExplaining(!isExplaining);
            }}
        >
            {/* BIOLUMINESCENT LAYER (Metaphorical Indicator) */}
            <BioluminescentLayer state={bioState} />

            {/* Click-to-Learn Modal Overlay (Persistent on Click) */}
            {isExplaining && (
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 z-[100] animate-in zoom-in-95 duration-300">
                    <div className="bg-slate-900 border-2 border-emerald-500/50 p-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-tighter">Learning Insight</span>
                            <button onClick={() => setIsExplaining(false)} className="text-white/40 hover:text-white text-xs">×</button>
                        </div>
                        <p className="text-[10px] text-white/90 font-medium leading-relaxed italic mb-2">
                            "{bioState.interpretation.hint}"
                        </p>
                        <div className="text-[7px] text-white/40 uppercase font-bold border-t border-white/5 pt-1.5 flex flex-col gap-1">
                            <div className="flex justify-between">
                                <span>Metabolism</span>
                                <span className="text-emerald-400">{(bioState.indicators.metabolicActivity * 100).toFixed(0)}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Hydration</span>
                                <span className={`text-cyan-400 ${bioState.indicators.waterUptake < 0.4 ? 'text-amber-400' : ''}`}>
                                    {(bioState.indicators.waterUptake * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Speech Bubble Arrow */}
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-slate-900 absolute top-full left-1/2 -translate-x-1/2 mt-[-1px]"></div>
                </div>
            )}

            {/* PROCEDURAL STALK SYSTEM */}
            <div className="animate-sway origin-bottom transition-all duration-1000" style={{ animationDuration: `${windEffect}s` }}>
                <svg width="100" height="120" viewBox="0 0 100 120" className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                    {stalks.map((s, i) => (
                        <g key={i}>
                            <path
                                d={`M${s.x} 120 Q${s.x + s.curve} ${120 - s.height / 2} ${s.x} ${120 - s.height}`}
                                stroke={config.color}
                                strokeWidth="2.5"
                                fill="none"
                                strokeLinecap="round"
                            />
                            {/* Organic Grain/Fruit detail */}
                            <circle
                                cx={s.x} cy={120 - s.height}
                                r="3"
                                fill={config.color}
                                opacity="0.8"
                                className="animate-pulse"
                                style={{ animationDelay: `${s.delay}s` }}
                            />
                            <circle
                                cx={s.x + 2} cy={120 - s.height + 6}
                                r="2"
                                fill={config.color}
                                opacity="0.6"
                            />
                        </g>
                    ))}

                    {/* Atmospheric Glow at Base */}
                    <ellipse cx="50" cy="115" rx="30" ry="10" fill={config.glow} className="blur-xl" />
                </svg>
            </div>

            {/* Tactical UI Label */}
            <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap bg-slate-950/95 border-l-2 border-emerald-500 px-3 py-2 shadow-2xl flex flex-col gap-0.5"
                style={{ transform: 'translateZ(100px)' }}>
                <span className="text-[10px] font-black text-white/90 uppercase tracking-widest">{config.name}</span>
                <span className="text-[7px] text-emerald-400 font-bold uppercase">{growthStage || 'Vegetative'} Phase</span>
                <div className="mt-1 pt-1 border-t border-white/10 flex flex-col gap-0.5">
                    <span className="text-[6px] text-white/60 uppercase">Metabolism: {Math.round(bioState.indicators.metabolicActivity * 100)}%</span>
                    <span className="text-[6px] text-cyan-400 italic font-medium tracking-tight">Derived biological indicator</span>
                </div>
            </div>
        </div>
    );
};

export default GenerativePlant;

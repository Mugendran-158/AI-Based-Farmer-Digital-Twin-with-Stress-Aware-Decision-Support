import React, { useMemo } from 'react';

/**
 * BioluminescentLayer.jsx
 * 
 * Provides a visual biological indicator layer using bioluminescence-inspired cues.
 * Soft Green: Healthy | Blue: High Water | Yellow: Nutrient Stress | Dim: Dormant
 */
const BioluminescentLayer = ({ state }) => {
    const { glowColor, intensity } = state.visualization;
    const { hint, context } = state.interpretation || {};

    const colorMap = {
        green: {
            color: 'rgba(34, 197, 94, 0.6)',
            blur: 'rgba(34, 197, 94, 0.3)',
            shadow: '0 0 25px rgba(34, 197, 94, 0.5)'
        },
        blue: {
            color: 'rgba(59, 130, 246, 0.6)',
            blur: 'rgba(59, 130, 246, 0.3)',
            shadow: '0 0 25px rgba(59, 130, 246, 0.5)'
        },
        yellow: {
            color: 'rgba(234, 179, 8, 0.6)',
            blur: 'rgba(234, 179, 8, 0.3)',
            shadow: '0 0 25px rgba(234, 179, 8, 0.5)'
        },
        dim: {
            color: 'rgba(148, 163, 184, 0.25)',
            blur: 'rgba(148, 163, 184, 0.15)',
            shadow: '0 0 15px rgba(148, 163, 184, 0.2)'
        }
    };

    const config = colorMap[glowColor] || colorMap.green;

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-visible transition-all duration-[2000ms] ease-in-out">
            {/* Ambient Biological Radiance */}
            <div
                className="absolute inset-0 rounded-full blur-3xl transition-all duration-[2000ms] ease-in-out"
                style={{
                    backgroundColor: config.blur,
                    opacity: intensity * 0.4,
                    transform: 'scale(1.8)'
                }}
            />

            {/* Core Metabolism Pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="w-20 h-32 rounded-full blur-xl transition-all duration-[2000ms] ease-in-out"
                    style={{
                        backgroundColor: config.color,
                        opacity: intensity * 0.7,
                        boxShadow: config.shadow
                    }}
                />
            </div>

            {/* Guided Interpretation Layer (Revealed on Hover) */}
            <div className="absolute -top-[120%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 w-48 pointer-events-none">
                <div className="bg-slate-950/90 backdrop-blur-md border border-white/10 p-2 rounded-lg shadow-2xl flex flex-col gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">Biological Interpretation</span>
                    <p className="text-[9px] text-white/90 leading-tight font-medium italic">"{hint}"</p>
                    <div className="h-[1px] bg-white/5 my-0.5" />
                    <span className="text-[6px] text-white/40 uppercase font-bold">{context}</span>
                </div>
            </div>
        </div>
    );
};

export default BioluminescentLayer;

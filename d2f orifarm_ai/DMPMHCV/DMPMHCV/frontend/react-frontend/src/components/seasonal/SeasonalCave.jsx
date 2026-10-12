import React from 'react';
import { Warehouse, Sparkles } from 'lucide-react';

const SeasonalCave = ({ season, onClick }) => {
    // Subtle, elegant glow colors per season
    const getGlowColor = () => {
        switch (season) {
            case 'RAINY': return 'text-trust-blue';
            case 'SUMMER': return 'text-harvest-gold';
            case 'WINTER': return 'text-nature-light';
            case 'AUTUMN': return 'text-nature-medium';
            default: return 'text-platinum-pure';
        }
    };

    const getBgGlow = () => {
        switch (season) {
            case 'RAINY': return 'bg-trust-blue/10 shadow-[0_0_30px_rgba(44,95,120,0.2)] border-trust-blue/30';
            case 'SUMMER': return 'bg-harvest-gold/10 shadow-[0_0_30px_rgba(182,141,64,0.2)] border-harvest-gold/30';
            case 'WINTER': return 'bg-nature-light/10 shadow-[0_0_30px_rgba(141,162,143,0.2)] border-nature-light/30';
            case 'AUTUMN': return 'bg-nature-medium/10 shadow-[0_0_30px_rgba(76,107,79,0.2)] border-nature-medium/30';
            default: return 'bg-white/5 border-white/10';
        }
    };

    return (
        <div
            className="group cursor-pointer relative"
            onClick={onClick}
        >
            {/* Iconic Container */}
            <div className={`w-20 h-20 rounded-2xl ultra-glass flex items-center justify-center backdrop-blur-xl transition-all duration-500 group-hover:scale-105 group-hover:translate-y-[-5px] ${getBgGlow()}`}>
                <div className="relative">
                    <Warehouse className={`w-8 h-8 ${getGlowColor()} transition-colors duration-500`} strokeWidth={1.5} />

                    {/* Animated Sparkle Accent */}
                    <div className="absolute -top-2 -right-2">
                        <Sparkles className="w-3 h-3 text-white/60 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Connection Line (Visual Tether) */}
            <div className="absolute top-full left-1/2 w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent -translate-x-1/2"></div>

            {/* Floating Label */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap group-hover:-translate-y-2">
                <div className="px-5 py-2.5 rounded-2xl bg-nature-deep/95 border border-white/10 text-center shadow-2xl backdrop-blur-xl">
                    <span className="text-[10px] font-black text-white/90 tracking-[0.2em] uppercase block">
                        Wisdom Repository
                    </span>
                    <span className={`text-[8px] font-black tracking-[0.3em] uppercase block mt-1 ${getGlowColor()}`}>
                        {season} Archives
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SeasonalCave;

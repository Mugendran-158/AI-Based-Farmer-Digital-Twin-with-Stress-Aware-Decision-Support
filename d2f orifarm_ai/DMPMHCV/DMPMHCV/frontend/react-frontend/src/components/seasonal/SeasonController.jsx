import React from 'react';
import { TRANSLATIONS } from '../../data/translations';

const SeasonController = ({ activeSeason, onSelectSeason, language }) => {
    const seasons = [
        { id: 'RAINY', icon: '🌧️', label: language === 'ta' ? 'பருவமழை' : language === 'hi' ? 'वर्षा ऋतु' : 'Rainy Season' },
        { id: 'SUMMER', icon: '☀️', label: language === 'ta' ? 'கோடை காலம்' : language === 'hi' ? 'ग्रीष्म ऋतु' : 'Summer Season' },
        { id: 'WINTER', icon: '❄️', label: language === 'ta' ? 'குளிர்காலம்' : language === 'hi' ? 'शीत ऋतु' : 'Winter Season' },
        { id: 'AUTUMN', icon: '🍂', label: language === 'ta' ? 'இலையுதிர்காலம்' : language === 'hi' ? 'शरद ऋतु' : 'Autumn Season' }
    ];

    const seasonThemes = {
        RAINY: { color: 'cyan', glow: 'rgba(34, 211, 238, 0.4)', text: 'text-cyan-400' },
        SUMMER: { color: 'orange', glow: 'rgba(251, 146, 60, 0.4)', text: 'text-orange-400' },
        WINTER: { color: 'blue', glow: 'rgba(56, 189, 248, 0.4)', text: 'text-blue-300' },
        AUTUMN: { color: 'amber', glow: 'rgba(251, 191, 36, 0.4)', text: 'text-amber-500' }
    };

    return (
        <div className="flex gap-2 bg-slate-950/60 backdrop-blur-2xl p-2 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto transition-all duration-500 hover:border-white/20">
            {seasons.map((season) => (
                <button
                    key={season.id}
                    onClick={() => onSelectSeason(season.id)}
                    className={`
                        relative px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-700
                        flex flex-col items-center gap-2 group overflow-hidden
                        ${activeSeason === season.id
                            ? `bg-white/10 ${seasonThemes[season.id].text} shadow-[0_0_30px_${seasonThemes[season.id].glow}] scale-105 z-10 border border-white/20`
                            : 'text-slate-500 hover:text-slate-200'
                        }
                    `}
                >
                    <span className={`text-2xl transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6 ${activeSeason === season.id ? 'animate-float-slow' : ''}`}>
                        {season.icon}
                    </span>
                    <span className="opacity-80 font-bold">{season.label}</span>

                    {/* Active Glow Indicator */}
                    {activeSeason === season.id && (
                        <div className={`absolute -bottom-1 left-1/4 right-1/4 h-[3px] rounded-full bg-current opacity-60`}></div>
                    )}
                </button>
            ))}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0) rotate(0); }
                    50% { transform: translateY(-3px) rotate(3deg); }
                }
            `}} />
        </div>
    );
};

export default SeasonController;

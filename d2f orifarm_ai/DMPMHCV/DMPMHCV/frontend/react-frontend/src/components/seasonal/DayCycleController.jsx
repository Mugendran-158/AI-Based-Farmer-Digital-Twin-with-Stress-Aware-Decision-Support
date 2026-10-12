import React from 'react';

/**
 * DayCycleController.jsx
 * Allows manual selection of day phases: Morning, Afternoon, Evening, Night.
 * Also includes a 'Real-Time' toggle.
 */
const DayCycleController = ({ activePhase, onSelectPhase, isRealTime, onToggleRealTime, language }) => {
    const phases = [
        { id: 'MORNING', icon: '☀️', label: language === 'ta' ? 'பகல்' : 'Day', time: 10 },
        { id: 'AFTERNOON', icon: '🌤️', label: language === 'ta' ? 'மதியம்' : 'Afternoon', time: 14 },
        { id: 'EVENING', icon: '🌇', label: language === 'ta' ? 'மாலை' : 'Evening', time: 18 },
        { id: 'NIGHT', icon: '🌙', label: language === 'ta' ? 'இரவு' : 'Night', time: 22 }
    ];

    const phaseThemes = {
        MORNING: { color: 'orange', text: 'text-orange-400', glow: 'rgba(251, 146, 60, 0.4)' },
        AFTERNOON: { color: 'amber', text: 'text-amber-300', glow: 'rgba(252, 211, 77, 0.4)' },
        EVENING: { color: 'pink', text: 'text-pink-500', glow: 'rgba(236, 72, 153, 0.4)' },
        NIGHT: { color: 'indigo', text: 'text-indigo-400', glow: 'rgba(129, 140, 248, 0.4)' }
    };

    return (
        <div className="flex flex-col gap-2 items-end pointer-events-auto">
            {/* Real-Time Toggle */}
            <button
                onClick={onToggleRealTime}
                className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-500 flex items-center gap-2 ${isRealTime ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-slate-900 border-white/5 text-white/40'}`}
            >
                <div className={`w-1.5 h-1.5 rounded-full ${isRealTime ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                {language === 'ta' ? 'நிகழ்நேரம்' : 'Real-Time Sync'}
            </button>

            {/* Phase Selector */}
            <div className={`flex gap-1.5 bg-slate-950/80 backdrop-blur-2xl p-1.5 rounded-2xl border border-white/5 transition-all duration-700 ${isRealTime ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                {phases.map((phase) => (
                    <button
                        key={phase.id}
                        onClick={() => onSelectPhase(phase.id, phase.time)}
                        className={`
                            relative px-5 py-4 rounded-2xl transition-all duration-500 flex flex-col items-center gap-1.5 group
                            ${activePhase === phase.id && !isRealTime
                                ? `bg-white/10 ${phaseThemes[phase.id].text} shadow-[0_0_30px_${phaseThemes[phase.id].glow}] border border-white/20 scale-105`
                                : 'text-white/20 hover:text-white/60 hover:bg-white/5'
                            }
                        `}
                    >
                        <span className="text-3xl group-hover:scale-110 transition-transform">{phase.icon}</span>
                        <span className="text-[9px] font-black uppercase tracking-widest">{phase.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DayCycleController;

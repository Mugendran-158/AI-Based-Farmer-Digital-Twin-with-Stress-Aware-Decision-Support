import React from 'react';

/**
 * DayToggleButton - A premium, professional button to toggle the day cycle selection.
 */
const DayToggleButton = ({ onClick, language, isOpen, activePhase }) => {
    // Determine icon based on active phase
    const getPhaseIcon = () => {
        switch (activePhase) {
            case 'MORNING': return '🌅';
            case 'AFTERNOON': return '☀️';
            case 'EVENING': return '🌇';
            case 'NIGHT': return '🌙';
            default: return '☀️';
        }
    };

    return (
        <button
            onClick={onClick}
            className="group relative px-8 py-3 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center gap-3 transition-all duration-500 hover:border-amber-500/50 hover:bg-amber-500/5 active:scale-95 shadow-2xl"
        >
            {/* Ambient Solar Glow */}
            <div className={`absolute inset-0 bg-amber-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isOpen ? 'opacity-100' : ''}`} />

            {/* Celestial Icon */}
            <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-amber-500/20 rounded-lg group-hover:scale-110 transition-transform duration-500">
                <span className={`text-xl drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-500 ${isOpen ? 'scale-110' : ''}`}>
                    {getPhaseIcon()}
                </span>
            </div>

            {/* Label */}
            <div className="relative z-10 flex flex-col items-start leading-none">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400/60 group-hover:text-amber-300">
                    {language === 'ta' ? 'நேரம்' : 'TIME'}
                </span>
                <span className="text-sm font-bold text-white tracking-tight">
                    {language === 'ta' ? 'பகல் / இரவு' : 'DAY CYCLE'}
                </span>
            </div>

            {/* Arrow Indicator */}
            <div className={`relative z-10 text-white/20 transition-transform duration-500 ${isOpen ? 'rotate-90 text-amber-400' : ''}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </button>
    );
};

export default DayToggleButton;

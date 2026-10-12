import React from 'react';

/**
 * SeasonToggleButton - A premium, professional button to toggle the season selection.
 */
const SeasonToggleButton = ({ onClick, language, isOpen }) => {
    return (
        <button
            onClick={onClick}
            className="group relative px-8 py-3 bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center gap-3 transition-all duration-500 hover:border-emerald-500/50 hover:bg-emerald-500/5 active:scale-95 shadow-2xl"
        >
            {/* Ambient Leaf Glow */}
            <div className={`absolute inset-0 bg-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${isOpen ? 'opacity-100' : ''}`} />

            {/* Organic Icon */}
            <div className="relative z-10 w-8 h-8 flex items-center justify-center bg-emerald-500/20 rounded-lg group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 24 24" className={`w-5 h-5 fill-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                    <path d="M17,8C15.34,8 14,9.34 14,11V15H10V11C10,9.34 8.66,8 7,8C5.34,8 4,9.34 4,11V15H2V17H22V15H20V11C20,9.34 18.66,8 17,8M7,10C7.55,10 8,10.45 8,11V15H6V11C6,10.45 6.45,10 7,10M17,10C17.55,10 18,10.45 18,11V15H16V11C16,10.45 16.45,10 17,10M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
            </div>

            {/* Label */}
            <div className="relative z-10 flex flex-col items-start leading-none">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400/60 group-hover:text-emerald-300">
                    {language === 'ta' ? 'மாற்றம்' : 'CHANGE'}
                </span>
                <span className="text-sm font-bold text-white tracking-tight">
                    {language === 'ta' ? 'பருவங்கள்' : 'SEASONS'}
                </span>
            </div>

            {/* Arrow Indicator */}
            <div className={`relative z-10 text-white/20 transition-transform duration-500 ${isOpen ? 'rotate-90 text-emerald-400' : ''}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </button>
    );
};

export default SeasonToggleButton;

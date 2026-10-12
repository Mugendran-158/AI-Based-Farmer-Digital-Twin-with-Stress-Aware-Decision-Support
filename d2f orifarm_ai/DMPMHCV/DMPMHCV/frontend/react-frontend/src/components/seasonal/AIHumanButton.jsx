import React from 'react';

/**
 * AIHumanButton - A premium, professional logo button for the AI Assistant.
 */
const AIHumanButton = ({ onClick, language }) => {
    return (
        <button
            onClick={onClick}
            className="group relative w-24 h-24 flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95"
            aria-label="Open AI Human Assistant"
        >
            {/* Soft Ambient Radiance */}
            <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-1000" />

            {/* Subtle Orbital Ring */}
            <div className="absolute inset-2 border border-white/5 rounded-full group-hover:border-blue-400/20 transition-colors duration-700" />

            {/* Main Button Body - Brushed Surface Effect */}
            <div className="relative w-full h-full bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Holographic Texture Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                {/* AI Human Abstract Icon */}
                <div className="relative z-10 flex flex-col items-center gap-1 mt-1">
                    <svg viewBox="0 0 100 100" className="w-10 h-10 fill-blue-300 drop-shadow-[0_0_10px_rgba(147,197,253,0.5)] transition-all duration-500 group-hover:fill-blue-100">
                        <path d="M50 20C38 20 28 30 28 42C28 52 32 60 38 65C38 72 32 80 25 82V85H75V82C68 80 62 72 62 65C68 60 72 52 72 42C72 30 62 20 50 20Z" />
                        <circle cx="50" cy="42" r="8" fill="white" className="animate-pulse" />
                    </svg>
                    <span className="text-[7px] font-black uppercase tracking-[0.4em] text-blue-400/60 group-hover:text-blue-300 transition-colors">
                        {language === 'ta' ? 'AI மனிதன்' : 'AI HUMAN'}
                    </span>
                </div>

                {/* Vertical Scanning Light */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-400/10 to-transparent h-1/3 w-full animate-[ai-scan_4s_ease-in-out_infinite] pointer-events-none" />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes ai-scan {
                    0% { transform: translateY(-150%); }
                    100% { transform: translateY(300%); }
                }
            `}} />
        </button>
    );
};

export default AIHumanButton;

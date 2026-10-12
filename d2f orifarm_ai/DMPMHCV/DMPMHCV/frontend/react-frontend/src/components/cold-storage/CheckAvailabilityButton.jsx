import React from 'react';

/**
 * CheckAvailabilityButton - A premium, powerful button to trigger cold storage intelligence.
 */
const CheckAvailabilityButton = ({ onClick, language }) => {
    return (
        <button
            onClick={onClick}
            className="group relative w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/20"
        >
            {/* Animated Background Pulse */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />

            {/* Scanning Light Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-scan transition-transform duration-1000" />

            <div className="relative z-10 flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md shadow-inner">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                        <path d="M7 15H17V17H7V15M7 11H17V13H7V11M7 7H17V9H7V7M5 3C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5M5 5H19V19H5V5Z" />
                    </svg>
                </div>

                <div className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-100/60">
                        {language === 'ta' ? 'அறிவார்ந்த தேடல்' : 'INTELLIGENCE SEARCH'}
                    </span>
                    <span className="text-xl font-bold text-white tracking-tight">
                        {language === 'ta' ? 'இருப்பு சரிபார்க்க' : 'Check Availability'}
                    </span>
                </div>

                <div className="ml-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </div>
            </div>
        </button>
    );
};

export default CheckAvailabilityButton;

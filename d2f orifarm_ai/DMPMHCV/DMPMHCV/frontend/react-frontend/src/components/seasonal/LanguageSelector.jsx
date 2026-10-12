import React from 'react';

const LanguageSelector = ({ currentLang, onLanguageChange }) => {
    const languages = [
        { code: 'en', label: 'English', flag: '🇬🇧', color: 'cyan' },
        { code: 'ta', label: 'தமிழ்', flag: '🇮🇳', color: 'emerald' },
        { code: 'hi', label: 'हिंदी', flag: '🇮🇳', color: 'blue' }
    ];

    return (
        <div className="flex gap-3 bg-white/5 backdrop-blur-2xl p-2 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)] pointer-events-auto transition-all duration-500">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`
                        relative px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all duration-500
                        flex items-center gap-2 group overflow-hidden
                        ${currentLang === lang.code
                            ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)] scale-105 border border-white/20'
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                        }
                    `}
                >
                    <span className={`text-sm transition-transform duration-300 group-hover:scale-110 ${currentLang === lang.code ? 'animate-pulse' : ''}`}>{lang.flag}</span>
                    <span className="relative z-10">{lang.label}</span>

                    {/* Pulsing Active Indicator */}
                    {currentLang === lang.code && (
                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;

import React from 'react';

const CommandButton = ({
    children,
    onClick,
    variant = 'primary',
    icon: Icon,
    loading = false,
    disabled = false,
    className = '',
    isDarkMode = true,
    type = "button"
}) => {
    const variants = {
        primary: isDarkMode
            ? 'bg-[#4C6B4F] text-white hover:bg-[#8DA28F] shadow-[0_8px_20px_rgba(76,107,79,0.2)]'
            : 'bg-[#1A2E22] text-white hover:bg-[#4C6B4F] shadow-[0_8px_24px_rgba(26,46,34,0.15)]',
        secondary: isDarkMode
            ? 'bg-white/[0.05] border-white/10 text-white/90 hover:bg-white/[0.1]'
            : 'bg-[#1A2E22]/5 border-[#1A2E22]/10 text-[#1A2E22] hover:bg-[#1A2E22]/10',
        critical: 'bg-cyber-rose/10 border-cyber-rose/30 text-cyber-rose hover:bg-cyber-rose/20 shadow-[0_8px_20px_rgba(158,82,65,0.1)]',
        intelligence: 'bg-trust-blue hover:bg-[#347696] text-white shadow-[0_8px_30px_rgba(44,95,120,0.2)]',
        outline: isDarkMode
            ? 'bg-transparent border border-white/20 text-white hover:bg-white/5'
            : 'bg-transparent border border-[#1A2E22]/20 text-[#1A2E22] hover:bg-[#1A2E22]/5'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
        relative group overflow-hidden px-8 py-5 rounded-2xl
        flex items-center justify-center gap-4
        font-bold uppercase tracking-[0.25em] text-[9px]
        transition-all duration-500 active:scale-[0.98]
        border
        ${variants[variant]}
        ${disabled ? 'opacity-30 cursor-not-allowed grayscale' : 'cursor-pointer'}
        ${className}
      `}
        >
            {/* Command-Grade Feedback Layer */}
            {!disabled && !loading && (
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]" />
            )}

            {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
            ) : Icon && (
                <Icon size={14} strokeWidth={2} className="transition-transform duration-500 group-hover:scale-110" />
            )}

            <span className="relative z-10">{children}</span>
        </button>
    );
};

export default CommandButton;

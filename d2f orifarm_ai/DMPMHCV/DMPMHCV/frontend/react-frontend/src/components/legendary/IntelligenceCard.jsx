import React from 'react';

const IntelligenceCard = ({
    children,
    title,
    subtitle,
    icon: Icon,
    depth = 'card',
    glow = false,
    className = '',
    isDarkMode = true
}) => {
    const depths = {
        surface: isDarkMode ? 'shadow-sm border-white/5' : 'shadow-sm border-nature-deep/5',
        card: isDarkMode ? 'shadow-xl border-white/10' : 'shadow-[0_8px_30px_rgba(26,46,34,0.06)] border-nature-deep/5 bg-white',
        modal: isDarkMode ? 'shadow-2xl border-white/20' : 'shadow-[0_16px_48px_rgba(26,46,34,0.1)] border-nature-deep/10 bg-white',
        command: isDarkMode ? 'shadow-[0_32px_80px_rgba(0,0,0,0.6)] border-white/30 bg-[#0D1611]/60' : 'shadow-[0_32px_80px_rgba(26,46,34,0.12)] border-nature-deep/10 bg-white/95'
    };

    return (
        <div className={`
      relative overflow-hidden rounded-[2.5rem]
      ${isDarkMode ? 'bg-nature-deep/10 border-white/[0.05]' : 'bg-white border-nature-deep/5'} backdrop-blur-[60px] border
      transition-all duration-700 ease-out
      ${depths[depth]}
      ${glow ? 'neural-glow' : ''}
      ${className}
    `}>
            {/* Sovereign Light Architecture */}
            <div className={`absolute inset-0 pointer-events-none transition-colors duration-700 ${isDarkMode ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent)]' : 'bg-slate-50/50'}`} />

            {(title || Icon) && (
                <div className={`relative z-10 p-10 pb-6 border-b flex items-center justify-between transition-colors ${isDarkMode ? 'border-white/[0.03]' : 'border-slate-100'}`}>
                    <div className="flex items-center gap-6">
                        {Icon && (
                            <div className={`p-4 rounded-xl border shadow-inner transition-colors ${isDarkMode ? 'bg-white/[0.01] text-platinum-pure border-white/[0.05]' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
                                <Icon size={18} strokeWidth={1.5} />
                            </div>
                        )}
                        <div>
                            {title && <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-1 transition-colors ${isDarkMode ? 'text-platinum-muted' : 'text-slate-500'}`}>{title}</h3>}
                            {subtitle && <p className={`text-xs font-bold tracking-tight transition-colors ${isDarkMode ? 'text-platinum-pure' : 'text-slate-900'}`}>{subtitle}</p>}
                        </div>
                    </div>
                </div>
            )}

            <div className="relative z-10 p-10">
                {children}
            </div>

            {/* Subtle Edge Illumination */}
            <div className="absolute inset-0 pointer-events-none rounded-[2rem] border border-white/[0.03]" />
        </div>
    );
};

export default IntelligenceCard;

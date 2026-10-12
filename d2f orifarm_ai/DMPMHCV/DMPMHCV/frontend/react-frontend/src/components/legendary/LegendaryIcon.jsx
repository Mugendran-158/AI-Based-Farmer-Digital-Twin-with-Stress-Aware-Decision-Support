/* eslint-disable react/prop-types */
import React from 'react';

const LegendaryIcon = ({
    icon: Icon,
    variant = 'glass',
    color = 'emerald',
    size = 24,
    animation = 'none',
    className = '',
    onClick
}) => {
    if (!Icon) return null;

    // Color mappings for different variants
    const colors = {
        nature: {
            text: 'text-nature-medium',
            glow: 'shadow-[0_0_20px_rgba(76,107,79,0.3)]',
            border: 'border-nature-medium/20',
            bg: 'bg-nature-medium/10',
            solid: 'bg-[#4C6B4F]',
            neon: 'drop-shadow-[0_0_8px_rgba(76,107,79,0.6)]'
        },
        earth: {
            text: 'text-earth-rich',
            glow: 'shadow-[0_0_20px_rgba(61,48,40,0.3)]',
            border: 'border-earth-rich/20',
            bg: 'bg-earth-rich/10',
            solid: 'bg-[#3D3028]',
            neon: 'drop-shadow-[0_0_8px_rgba(61,48,40,0.6)]'
        },
        trust: {
            text: 'text-trust-blue',
            glow: 'shadow-[0_0_20px_rgba(44,95,120,0.3)]',
            border: 'border-trust-blue/20',
            bg: 'bg-trust-blue/10',
            solid: 'bg-[#2C5F78]',
            neon: 'drop-shadow-[0_0_8px_rgba(44,95,120,0.6)]'
        },
        harvest: {
            text: 'text-harvest-gold',
            glow: 'shadow-[0_0_20px_rgba(182,141,64,0.3)]',
            border: 'border-harvest-gold/20',
            bg: 'bg-harvest-gold/10',
            solid: 'bg-[#B68D40]',
            neon: 'drop-shadow-[0_0_8px_rgba(182,141,64,0.6)]'
        },
        platinum: {
            text: 'text-nature-light',
            glow: 'shadow-[0_0_20px_rgba(141,162,143,0.2)]',
            border: 'border-nature-light/20',
            bg: 'bg-white/10',
            solid: 'bg-[#8DA28F]',
            neon: 'drop-shadow-[0_0_5px_rgba(255,255,255,0.4)]'
        }
    };

    const selectedColor = colors[color] || colors.platinum;

    // Variants styles
    const variants = {
        glass: `backdrop-blur-md border ${selectedColor.border} ${selectedColor.bg} ${selectedColor.text}`,
        glow: `${selectedColor.bg} ${selectedColor.text} ${selectedColor.glow} border ${selectedColor.border}`,
        neon: `bg-transparent ${selectedColor.text} ${selectedColor.neon} border border-transparent`,
        holographic: `bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]`,
        solid: `${selectedColor.solid || selectedColor.bg.replace('/10', '')} text-white border border-transparent`,
        outline: `bg-transparent border ${selectedColor.border} ${selectedColor.text}`
    };

    // Animations
    const animations = {
        pulse: 'animate-pulse',
        spin: 'animate-spin',
        'spin-slow': 'animate-spin-slow',
        float: 'animate-bounce',
        ping: 'animate-ping',
        none: ''
    };

    const containerClasses = `
    relative flex items-center justify-center rounded-2xl transition-all duration-300
    ${variants[variant] || variants.glass}
    ${animations[animation] || ''}
    ${onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}
    ${className}
  `;

    // Dynamic padding and sizing
    const padding = size >= 32 ? 'p-5' : size >= 24 ? 'p-4' : 'p-3';
    // If no explicit size in className, we let padding define it, but flexible

    return (
        <div
            className={`${containerClasses} ${padding}`}
            onClick={onClick}
        >
            {variant === 'holographic' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 opacity-50 pointer-events-none" />
            )}
            <Icon
                size={size}
                className={`relative z-10 transition-transform duration-500 ${variant === 'neon' ? selectedColor.neon : ''}`}
                strokeWidth={variant === 'neon' || variant === 'glow' ? 2.5 : 2}
            />
        </div>
    );
};

export default LegendaryIcon;

import React, { useMemo } from 'react';

/**
 * Procedural Realistic Tree
 * Renders a unique, organic tree using fractal SVG paths and layered foliage clusters.
 * NO IMAGES USED.
 */
const GenerativeTree = ({ season, scale = 1, weather }) => {
    const theme = useMemo(() => {
        switch (season) {
            case 'AUTUMN':
                return {
                    leaves: ['#9a3412', '#d97706', '#7c2d12', '#b45309'],
                    trunk: '#2d1a12',
                    density: 12
                };
            case 'WINTER':
                return {
                    leaves: ['#94a3b8', '#cbd5e1', '#e2e8f0', '#ffffff'],
                    trunk: '#1a1a1a',
                    density: 4 // Sparser branches for winter
                };
            default: // SUMMER / RAINY
                return {
                    leaves: ['#064e3b', '#065f46', '#047857', '#059669'],
                    trunk: '#3b251a',
                    density: 15
                };
        }
    }, [season]);

    // Generate procedural leaf clusters
    const foliage = useMemo(() => {
        return [...Array(theme.density)].map((_, i) => ({
            cx: 100 + (Math.random() - 0.5) * 80,
            cy: 80 + (Math.random() - 0.5) * 100,
            rx: 20 + Math.random() * 30,
            ry: 15 + Math.random() * 25,
            color: theme.leaves[Math.floor(Math.random() * theme.leaves.length)],
            delay: Math.random() * 2,
            rotate: Math.random() * 360
        }));
    }, [theme]);

    const windEffect = weather?.windSpeed ? Math.max(1, 4 - weather.windSpeed / 5) : 3;

    return (
        <div
            className="absolute origin-bottom pointer-events-none"
            style={{
                transform: `scale(${scale})`,
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
            }}
        >
            <div className="animate-sway origin-bottom" style={{ animationDuration: `${windEffect}s` }}>
                <svg width="240" height="320" viewBox="0 0 200 300">
                    <defs>
                        <filter id="barkTexture">
                            <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" result="noise" />
                            <feDiffuseLighting in="noise" lightingColor={theme.trunk} surfaceScale="2">
                                <feDistantLight azimuth="45" elevation="60" />
                            </feDiffuseLighting>
                        </filter>
                    </defs>

                    {/* SKELETAL TRUNK & BRANCH SYSTEM */}
                    <g className="trunk-group">
                        {/* Main Trunk */}
                        <path
                            d="M90 300 Q100 250 100 150 T110 50"
                            stroke={theme.trunk}
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            style={{ filter: 'url(#barkTexture)' }}
                        />
                        {/* Major Branches */}
                        <path d="M100 200 Q70 150 40 130" stroke={theme.trunk} strokeWidth="6" fill="none" strokeLinecap="round" />
                        <path d="M100 180 Q130 140 160 110" stroke={theme.trunk} strokeWidth="5" fill="none" strokeLinecap="round" />
                        <path d="M100 120 Q80 80 60 40" stroke={theme.trunk} strokeWidth="4" fill="none" strokeLinecap="round" />
                        <path d="M105 100 Q120 70 140 30" stroke={theme.trunk} strokeWidth="3" fill="none" strokeLinecap="round" />
                    </g>

                    {/* PROCEDURAL FOLIAGE CLUSTERS */}
                    <g className="foliage-group">
                        {foliage.map((cluster, i) => (
                            <g key={i} className="animate-leaf-flutter" style={{ animationDelay: `${cluster.delay}s` }}>
                                <ellipse
                                    cx={cluster.cx} cy={cluster.cy}
                                    rx={cluster.rx} ry={cluster.ry}
                                    fill={cluster.color}
                                    transform={`rotate(${cluster.rotate} ${cluster.cx} ${cluster.cy})`}
                                    opacity="0.9"
                                />
                                {/* Organic Detail Sparks (Leaf highlights) */}
                                <circle
                                    cx={cluster.cx + 5} cy={cluster.cy - 5}
                                    r={cluster.rx / 4}
                                    fill="white" opacity="0.1"
                                />
                            </g>
                        ))}
                    </g>
                </svg>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes leaf-flutter {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.02) rotate(1deg); }
                }
                .animate-leaf-flutter {
                    animation: leaf-flutter 2s ease-in-out infinite alternate;
                    transform-origin: center;
                }
            `}} />
        </div>
    );
};

export default GenerativeTree;

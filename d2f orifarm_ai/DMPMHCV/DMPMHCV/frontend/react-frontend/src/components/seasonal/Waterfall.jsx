import React from 'react';

const Waterfall = ({ season, scale = 1, weather }) => {
    const getSeasonalStyle = () => {
        const baseStyle = (() => {
            switch (season) {
                case 'RAINY':
                    return {
                        stream: 'bg-gradient-to-b from-slate-500/60 via-blue-900/80 to-slate-900/60',
                        mistOpacity: 0.6,
                        flowSpeed: 0.8,
                        splashCount: 15
                    };
                case 'WINTER':
                    return {
                        stream: 'bg-gradient-to-b from-white/30 via-slate-200/40 to-white/30',
                        mistOpacity: 0.1,
                        flowSpeed: 3,
                        splashCount: 2,
                        isFrozen: true
                    };
                case 'AUTUMN':
                    return {
                        stream: 'bg-gradient-to-b from-amber-900/40 via-orange-950/60 to-black/40',
                        mistOpacity: 0.3,
                        flowSpeed: 1.5,
                        splashCount: 8
                    };
                case 'SUMMER':
                default:
                    return {
                        stream: 'bg-gradient-to-b from-slate-400/40 via-slate-600/60 to-slate-800/40',
                        mistOpacity: 0.4,
                        flowSpeed: 1.8,
                        splashCount: 10
                    };
            }
        })();

        if (weather?.condition === 'Rain') {
            baseStyle.flowSpeed *= 0.7;
            baseStyle.mistOpacity += 0.2;
        }

        return baseStyle;
    };

    const style = getSeasonalStyle();

    return (
        <div
            className="absolute pointer-events-none"
            style={{
                transform: `scale(${scale})`,
                transformStyle: 'preserve-3d'
            }}
        >
            {/* The Source (Cliff Detail) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-10 bg-zinc-900/80 rounded-full blur-xl" style={{ transform: 'translateZ(-10px)' }}></div>

            {/* Waterfall Stream (Volumetric Simulation) */}
            <div
                className={`relative w-28 h-[500px] mx-auto overflow-hidden rounded-b-[6rem] ${style.stream} backdrop-blur-[1px] transition-all duration-1000`}
                style={{
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                    transform: 'translateZ(20px)',
                    boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
                }}
            >
                {/* Layered Water Textures */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-water-texture" style={{ animation: `water-texture ${style.flowSpeed}s linear infinite` }}></div>

                {/* Fine Highlight Streaks */}
                {!style.isFrozen && [...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-0 w-[0.5px] h-full bg-white/20 blur-[0.5px]"
                        style={{
                            left: (Math.random() * 100) + '%',
                            animation: `water-streak ${style.flowSpeed * (0.4 + Math.random() * 0.4)}s linear infinite`,
                            animationDelay: `-${Math.random() * 2}s`,
                        }}
                    ></div>
                ))}

                {/* Foam/Light Refraction */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10 opacity-30"></div>
            </div>

            {/* Volumetric Mist System */}
            {!style.isFrozen && (
                <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-80 h-40" style={{ transform: 'translateZ(100px)' }}>
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bottom-0 left-1/2 w-full h-full bg-white/5 rounded-full blur-[60px]"
                            style={{
                                opacity: style.mistOpacity,
                                animation: `mist-drift ${5 + i}s ease-in-out infinite alternate`,
                                animationDelay: `${i * 0.4}s`,
                                transform: `translateX(-50%) scale(${0.7 + Math.random() * 0.6})`
                            }}
                        ></div>
                    ))}
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes water-streak {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100%); }
                }
                @keyframes water-texture {
                    from { background-position: 0 0; }
                    to { background-position: 0 600px; }
                }
                @keyframes mist-drift {
                    0% { transform: translateX(-60%) translateY(0); opacity: 0.1; }
                    50% { opacity: 0.3; }
                    100% { transform: translateX(-40%) translateY(-30px); opacity: 0.1; }
                }
            `}} />
        </div>
    );
};

export default Waterfall;

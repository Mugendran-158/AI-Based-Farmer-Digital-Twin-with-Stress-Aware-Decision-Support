import React, { useMemo } from 'react';

/**
 * CloudSystem.jsx
 * 
 * Volumetric procedural cloud system.
 * Uses CSS 'box-shadow' stacks and 'radial-gradient' to simulate depth.
 * NO IMAGES USED.
 */
const CloudSystem = ({ clouds, sun }) => {
    // Dynamic tint based on sun position
    const getCloudTint = () => {
        if (sun.altitude > 0.5) return 'rgba(255, 255, 255, 0.9)'; // Bright Day
        if (sun.altitude > 0) return 'rgba(255, 220, 180, 0.8)'; // Golden Hour
        return 'rgba(100, 120, 180, 0.4)'; // Moonlight
    };

    const tint = getCloudTint();

    return (
        <div className="absolute inset-0 pointer-events-none z-[150] overflow-hidden">
            {clouds.map((cloud) => (
                <div
                    key={cloud.id}
                    className="absolute transition-all duration-1000 ease-out"
                    style={{
                        left: `${cloud.x}%`,
                        top: `${cloud.y}%`,
                        transform: `scale(${cloud.scale})`,
                        opacity: cloud.opacity
                    }}
                >
                    <div
                        className="relative animate-drift"
                        style={{ animationDuration: `${cloud.duration}s` }}
                    >
                        {/* Volumetric Core (Box Shadow Stack) */}
                        <div
                            className="w-32 h-16 rounded-full blur-2xl"
                            style={{
                                background: `radial-gradient(circle at 30% 30%, ${tint} 0%, transparent 70%)`,
                                boxShadow: `
                                    20px 10px 40px ${tint},
                                    -20px 10px 40px ${tint},
                                    0px -15px 40px ${tint},
                                    30px -5px 50px rgba(0,0,0,0.05)
                                `
                            }}
                        />
                        {/* Fluffy Details */}
                        <div className="absolute top-[-10px] left-[20px] w-20 h-20 rounded-full blur-xl" style={{ background: tint }} />
                        <div className="absolute top-[-5px] left-[60px] w-24 h-16 rounded-full blur-xl" style={{ background: tint }} />
                        <div className="absolute top-[10px] left-[80px] w-16 h-16 rounded-full blur-xl" style={{ background: tint }} />
                    </div>
                </div>
            ))}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes drift {
                    0% { transform: translateX(-100px); }
                    100% { transform: translateX(calc(100vw + 200px)); }
                }
                .animate-drift {
                    animation: drift linear infinite;
                }
            `}} />
        </div>
    );
};

export default CloudSystem;

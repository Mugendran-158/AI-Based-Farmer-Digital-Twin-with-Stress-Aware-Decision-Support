import React from 'react';

const WorldAnimationLayer = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 1. Sun Glow Effect (Top Left) */}
            <div className="absolute top-0 left-[15%] w-[30%] h-[30%] bg-gradient-radial from-amber-200/40 to-transparent blur-3xl animate-pulse-slow mix-blend-screen"></div>

            {/* 2. Drifting Clouds */}
            <div className="absolute top-[5%] left-0 w-[120%] h-[20%] animate-drift opacity-60">
                {/* Cloud 1 */}
                <svg className="absolute top-4 left-[10%] w-32 h-16 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.5 12c.5 0 .9.1 1.4.3.3.1.5.2.8.4.6.4 1.1 1 1.4 1.7.3.7.4 1.5.4 2.3 0 2.5-2 4.5-4.5 4.5H5.5C2.5 21 0 18.5 0 15.5S2.5 10 5.5 10c.5 0 1 .1 1.4.2.3.1.6.3.9.5.3-.6.7-1.1 1.2-1.6.5-.5 1-1 1.6-1.3C11.3 7.2 12 7 12.8 7c2.2 0 4.2 1.5 4.9 3.6.4-.4.8-.8 1.3-1 .5-.3 1-.5 1.6-.5z" />
                </svg>
                {/* Cloud 2 */}
                <svg className="absolute top-12 left-[60%] w-48 h-24 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.5 12c.5 0 .9.1 1.4.3.3.1.5.2.8.4.6.4 1.1 1 1.4 1.7.3.7.4 1.5.4 2.3 0 2.5-2 4.5-4.5 4.5H5.5C2.5 21 0 18.5 0 15.5S2.5 10 5.5 10c.5 0 1 .1 1.4.2.3.1.6.3.9.5.3-.6.7-1.1 1.2-1.6.5-.5 1-1 1.6-1.3C11.3 7.2 12 7 12.8 7c2.2 0 4.2 1.5 4.9 3.6.4-.4.8-.8 1.3-1 .5-.3 1-.5 1.6-.5z" />
                </svg>
            </div>

            {/* 3. Flying Birds (Crossing the screen) */}
            <div className="absolute top-[15%] left-[-10%] animate-fly">
                <div className="flex gap-2">
                    <svg className="w-6 h-6 text-black/40" viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 12.5c0-1.5-1.5-2.5-3-2.5-1.5 0-3 1-3 2.5 0 1.5 1.5 2.5 3 2.5s3-1 3-2.5z" /></svg>
                    <svg className="w-5 h-5 text-black/30 mt-2" viewBox="0 0 24 24" fill="currentColor"><path d="M22.5 12.5c0-1.5-1.5-2.5-3-2.5-1.5 0-3 1-3 2.5 0 1.5 1.5 2.5 3 2.5s3-1 3-2.5z" /></svg>
                </div>
            </div>

            {/* 4. Active Drone (Near the Drone Zone) */}
            <div
                className="absolute top-[8%] left-[62%] animate-float"
            >
                <div className="relative">
                    {/* Propeller Blur */}
                    <div className="absolute -inset-2 bg-white/20 rounded-full blur-sm animate-pulse"></div>
                    {/* Drone Body */}
                    <svg className="w-8 h-8 text-white drop-shadow-lg transform rotate-12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.2L12 12l-2.5-1.2L12 11zm0 2l-5-2.5-5 2.5L12 22l10-9-5-2.5-5 2.5z" />
                    </svg>
                    {/* Status Light */}
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
                </div>
            </div>

            {/* 5. Tractor Animation (Rumble & Smoke) */}
            <div className="absolute top-[60%] left-[40%] w-[12%] h-[12%]">
                {/* A. Animated Cutout (Engine Rumble) */}
                <div className="absolute inset-0 overflow-hidden rounded-lg animate-[rumble_0.2s_linear_infinite] opacity-90 mix-blend-hard-light sm:mix-blend-normal">
                    <img
                        src="/smart-world.jpg"
                        className="absolute max-w-none w-[833%] h-[833%] left-[-333%] top-[-500%]"
                        alt=""
                    />
                </div>

                {/* B. Exhaust Smoke */}
                <div className="absolute -top-4 -right-2">
                    <span className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-0 animate-[smoke-rise_2s_ease-out_infinite]"></span>
                    <span className="absolute w-3 h-3 bg-gray-300 rounded-full opacity-0 animate-[smoke-rise_2.5s_ease-out_infinite_0.5s] -left-2 -top-1"></span>
                    <span className="absolute w-2 h-2 bg-gray-500 rounded-full opacity-0 animate-[smoke-rise_3s_ease-out_infinite_1s] left-1 -top-3"></span>
                </div>
            </div>

            {/* 6. Wind Turbine Rotation Overlay */}
            <div className="absolute top-[28%] right-[15%] opacity-50">
                <div className="w-4 h-24 bg-gradient-to-t from-white/10 to-transparent absolute left-1/2 transform -translate-x-1/2 origin-bottom animate-spin-[4s_linear_infinite]"></div>
            </div>

            {/* 7. Crop Field Sway (Foreground Left) */}
            <div className="absolute top-[65%] left-[5%] w-[25%] h-[25%] pointer-events-none">
                <div className="absolute inset-0 overflow-hidden rounded-full filter blur-[1px] animate-[sway_5s_ease-in-out_infinite] origin-bottom opacity-90">
                    <img
                        src="/smart-world.jpg"
                        className="absolute max-w-none w-[400%] h-[400%] left-[-20%] top-[-260%]"
                        alt=""
                    />
                </div>
            </div>

            {/* 8. Atmospheric Particles (Pollen/Dust) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-amber-200/60 rounded-full blur-[1px]"
                        style={{
                            width: Math.random() * 4 + 2 + 'px',
                            height: Math.random() * 4 + 2 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animation: `float-particle ${Math.random() * 5 + 5}s linear infinite ${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* 9. Cinematic Sun Shafts (Safe CSS) */}
            <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[100%] origin-center animate-[rotate-slow_60s_linear_infinite] pointer-events-none opacity-30 mix-blend-overlay">
                <div style={{ background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, white 15deg, transparent 30deg, white 45deg, transparent 60deg)' }} className="w-full h-full blur-xl"></div>
            </div>

            {/* 10. Irrigation Shimmer */}
            <div className="absolute bottom-[10%] right-[30%] w-[15%] h-[5%] overflow-hidden opacity-40 pointer-events-none skew-x-12 rotate-[-5deg]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent animate-[shimmer_3s_linear_infinite]"></div>
            </div>

            {/* 11. The Farmer Character */}
            <div className="absolute top-[68%] left-[45%] pointer-events-none animate-[float_4s_ease-in-out_infinite] z-10">
                <div className="relative w-8 h-12 opacity-90 drop-shadow-2xl">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-800">
                        <path d="M12 2C9.5 2 7.5 3 6 5c-1 1.5-1 3.5 0 5 1 2 3 5 6 9 3-4 5-7 6-9 1-1.5 1-3.5 0-5-1.5-2-3.5-3-6-3zm0 2c1.5 0 2.5.5 3 1.5.5 1 .5 2 0 3-.5 1-2 3-3 5-1-2-2.5-4-3-5-.5-1-.5-2 0-3 .5-1 1.5-1.5 3-1.5z" />
                        <circle cx="12" cy="5" r="3" className="text-amber-700" />
                    </svg>
                </div>
            </div>

            {/* 12. IoT Sensor Network */}
            <div className="absolute top-[55%] left-[25%] pointer-events-none">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-[blink-short_3s_ease-in-out_infinite_0s] shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
            </div>
            <div className="absolute top-[68%] left-[18%] pointer-events-none">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-[blink-short_4s_ease-in-out_infinite_1.5s] shadow-[0_0_8px_rgba(248,113,113,0.8)]"></div>
            </div>
            <div className="absolute top-[50%] left-[80%] pointer-events-none">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-[blink-short_5s_ease-in-out_infinite_2.5s] shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
            </div>

        </div>
    );
};

export default WorldAnimationLayer;

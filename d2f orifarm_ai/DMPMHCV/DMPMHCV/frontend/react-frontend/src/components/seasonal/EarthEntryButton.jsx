import React from 'react';

/**
 * EarthEntryButton.jsx
 * A premium, rotating 3D Earth component using CSS 3D layers.
 * Serves as the high-fidelity gateway to the Smart World.
 */
const EarthEntryButton = ({ onClick }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-12 animate-in fade-in zoom-in duration-1000">
            {/* Title / Brand */}
            <div className="text-center space-y-2">
                <h1 className="text-6xl font-black italic tracking-tighter text-white">
                    SMART<span className="text-emerald-400">WORLD</span>
                </h1>
                <p className="text-emerald-400/60 font-black uppercase tracking-[0.6em] text-[10px]">
                    Agricultural Intelligence v4.0
                </p>
            </div>

            {/* Earth Container */}
            <div
                className="relative w-80 h-80 cursor-pointer group"
                onClick={onClick}
                style={{ perspective: '1000px' }}
            >
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-1000 group-hover:scale-125"></div>

                {/* Earth Sphere Layers */}
                <div className="relative w-full h-full rounded-full shadow-[0_0_30px_rgba(16,185,129,0.4)] overflow-hidden transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(16,185,129,0.6)]">
                    <img
                        src="/assets/earth_agri.png"
                        alt="Smart Agri World"
                        className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Atmospheric Shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-cyan-400/20 rounded-full pointer-events-none"></div>

                    {/* Scanning Line Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent w-full h-[10%] animate-scan-line opacity-50 pointer-events-none"></div>
                </div>

                {/* Interaction Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-emerald-500/50 shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                        <span className="text-emerald-400 font-black uppercase tracking-widest text-[10px]">Initialize World</span>
                    </div>
                </div>
            </div>

            {/* Instruction */}
            <div className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em] animate-pulse">
                Click to enter the digital ecosystem
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan-line {
                    0% { top: -10%; opacity: 0; }
                    20% { opacity: 0.5; }
                    80% { opacity: 0.5; }
                    100% { top: 110%; opacity: 0; }
                }
                .animate-scan-line {
                    animation: scan-line 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
            `}} />
        </div>
    );
};

export default EarthEntryButton;

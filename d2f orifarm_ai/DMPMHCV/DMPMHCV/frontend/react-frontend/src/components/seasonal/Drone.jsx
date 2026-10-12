import React from 'react';

const Drone = ({ onClick }) => {
    const metalTexture = `linear-gradient(135deg, #18181b 0%, #27272a 100%)`;

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick && onClick('drone');
            }}
            className="relative cursor-pointer group"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Ground Projection Shadow */}
            <div className="absolute top-[300px] left-1/2 -translate-x-1/2 w-20 h-6 bg-black/20 blur-2xl rounded-full scale-y-50"></div>

            {/* Drone Visual (Tactical X-Frame) */}
            <div className="relative w-18 h-18 animate-drone-float" style={{ transformStyle: 'preserve-3d' }}>
                {/* Industrial X-Frame Construction */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[120%] h-1.5 bg-zinc-800 rotate-45 border-x border-zinc-700"></div>
                    <div className="absolute w-[120%] h-1.5 bg-zinc-800 -rotate-45 border-x border-zinc-700"></div>
                </div>

                {/* Core Processor Unit */}
                <div className="absolute inset-4 bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden"
                    style={{ backgroundImage: metalTexture, backgroundSize: '80px', backgroundBlendMode: 'overlay' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="absolute inset-1 border-[0.5px] border-emerald-500/20"></div>
                </div>

                {/* High-Speed Rotors */}
                <div className="absolute -top-1 -left-1 w-8 h-8 bg-white/5 rounded-full blur-[1px] border border-white/5 animate-spin-fast"></div>
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-white/5 rounded-full blur-[1px] border border-white/5 animate-spin-fast"></div>
                <div className="absolute -bottom-1 -left-1 w-8 h-8 bg-white/5 rounded-full blur-[1px] border border-white/5 animate-spin-fast"></div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white/5 rounded-full blur-[1px] border border-white/5 animate-spin-fast"></div>

                {/* Underside Multi-Spectral Camera */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-6 bg-zinc-800 border-x border-zinc-700">
                    <div className="absolute bottom-1 left-1 w-2 h-2 bg-red-600/40 rounded-full blur-[1px] animate-pulse"></div>
                </div>
            </div>

            {/* Tactical Label */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-2 pointer-events-none">
                <div className="bg-slate-950 border-t-2 border-cyan-500 px-4 py-1.5 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-white tracking-widest uppercase">Aero-Scan Unit 7</span>
                        <span className="text-[7px] text-cyan-400 font-bold uppercase">Mode: Multispectral Data Acquisition</span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin-fast {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-fast { animation: spin-fast 0.08s linear infinite; }
                .animate-drone-float { animation: drone-phys 4s ease-in-out infinite; }
                @keyframes drone-phys {
                    0%, 100% { transform: translateY(0) rotateX(5deg) rotateY(2deg); }
                    50% { transform: translateY(-20px) rotateX(-5deg) rotateY(-2deg); }
                }
            `}} />
        </div>
    );
};

export default Drone;

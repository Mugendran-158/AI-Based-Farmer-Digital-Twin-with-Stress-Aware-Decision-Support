import React from 'react';

const Tractor = ({ onClick, readinessState }) => {
    const isWarning = readinessState === 'CAUTION';
    const metalTexture = `linear-gradient(45deg, #1e293b 0%, #0f172a 100%)`;

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick && onClick('tractor');
            }}
            className="relative cursor-pointer group"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Environmental Shadow */}
            <div className="absolute top-[80%] left-[-10%] w-[120%] h-4 bg-black/40 blur-xl rounded-full"></div>

            {/* Tractor Body (Industrial Detailing) */}
            <div className="relative w-28 h-18 animate-[rumble_0.1s_linear_infinite]" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute inset-0 bg-slate-800 border-2 border-slate-700/50 rounded-lg overflow-hidden shadow-2xl"
                    style={{ backgroundImage: metalTexture, backgroundSize: '150px', backgroundBlendMode: 'overlay' }}>

                    {/* Cabin Glass (Semi-Reflective) */}
                    <div className="absolute top-2 left-8 w-14 h-8 bg-slate-900/80 border border-white/20 backdrop-blur-md">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/5 to-transparent"></div>
                    </div>

                    {/* Mechanical Vents */}
                    <div className="absolute top-10 left-2 space-y-1">
                        <div className="w-4 h-0.5 bg-black/40"></div>
                        <div className="w-4 h-0.5 bg-black/40"></div>
                        <div className="w-4 h-0.5 bg-black/40"></div>
                    </div>
                </div>

                {/* Heavy Duty All-Terrain Wheels */}
                <div className="absolute -left-3 top-6 w-14 h-14 bg-[#1a1a1a] rounded-full border-[6px] border-[#2a2a2a] shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#fff_5px,#fff_10px)]"></div>
                </div>
                <div className="absolute -right-3 top-9 w-10 h-10 bg-[#1a1a1a] rounded-full border-[5px] border-[#2a2a2a] shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#fff_5px,#fff_10px)]"></div>
                </div>

                {/* Industrial Exhaust Stack */}
                <div className="absolute -top-6 right-6 w-2.5 h-10 bg-[#333] border-x border-slate-600 rounded-t-sm">
                    <div className="absolute -top-4 -left-2 w-6 h-6 bg-slate-500/10 rounded-full blur-lg animate-smoke-rise"></div>
                </div>
            </div>

            {/* Tactical UI Label */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-2 pointer-events-none">
                <div className="bg-slate-950/90 border-l-4 border-emerald-500 px-4 py-2 shadow-2xl backdrop-blur-3xl flex flex-col">
                    <span className="text-[11px] font-black text-white tracking-widest uppercase">Autonomous Unit X-1</span>
                    <span className="text-[8px] text-emerald-400/80 font-bold uppercase">System: Operational</span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes rumble {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-0.8px); }
                }
                @keyframes smoke-rise {
                    0% { transform: translateY(0) scale(1); opacity: 0; }
                    50% { opacity: 0.15; }
                    100% { transform: translateY(-40px) scale(3); opacity: 0; }
                }
            `}} />
        </div>
    );
};

export default Tractor;

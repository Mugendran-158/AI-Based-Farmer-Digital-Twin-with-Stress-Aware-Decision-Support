import React from 'react';

const DataMonolith = ({ onClick }) => {
    const metalTexture = `radial-gradient(circle at center, #27272a 0%, #09090b 100%)`;

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick && onClick('monolith');
            }}
            className="relative cursor-pointer group"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Foundation Shadow */}
            <div className="absolute top-[95%] left-1/2 -translate-x-1/2 w-16 h-8 bg-black/60 blur-2xl rounded-full scale-y-50"></div>

            {/* Architectural Structure */}
            <div className="relative w-14 h-40 bg-zinc-950 border-x border-t border-zinc-800 shadow-2xl overflow-hidden transition-all duration-700 group-hover:shadow-emerald-500/10"
                style={{ transformStyle: 'preserve-3d' }}>

                {/* Brushed Metal Exterior Panels */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: metalTexture, backgroundSize: '150px' }}></div>

                {/* Internal Server Rack LEDs */}
                <div className="absolute inset-x-2 top-4 bottom-4 flex flex-col gap-2 opacity-60">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center h-1 border-b border-zinc-800">
                            <div className={`w-1 h-1 rounded-full ${Math.random() > 0.5 ? 'bg-emerald-500' : 'bg-zinc-700'} animate-pulse`}
                                style={{ animationDelay: `${i * 0.1}s` }}></div>
                            <div className="w-6 h-[0.5px] bg-zinc-800"></div>
                        </div>
                    ))}
                </div>

                {/* Central Intelligence Core */}
                <div className="absolute top-[40%] left-0 right-0 h-10 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
                    <div className="absolute inset-x-0 h-[1px] bg-cyan-400/40 animate-core-sweep"></div>
                </div>

                {/* Cooling Radiator Grille */}
                <div className="absolute bottom-4 left-0 right-0 h-10 px-2 opacity-50">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-1 bg-black/40 mb-1 border-b border-zinc-900"></div>
                    ))}
                </div>
            </div>

            {/* Architectural Label */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-2 pointer-events-none">
                <div className="bg-slate-950 border border-white/5 py-2 px-4 shadow-2xl backdrop-blur-2xl">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-white/80 tracking-[0.3em] uppercase">Core Intel Hub</span>
                        <div className="mt-1 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
                        <span className="mt-1 text-[7px] text-emerald-400 font-bold uppercase tracking-widest">Global Agri-Link Status: Active</span>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes core-sweep {
                    0% { top: 0; opacity: 0; }
                    50% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
                .animate-core-sweep { animation: core-sweep 3s linear infinite; }
            `}} />
        </div>
    );
};

export default DataMonolith;

import React from 'react';

const WorldOverlayLayer = ({ onZoneClick, readinessState }) => {
    // Zone Definitions: { id, label, top%, left%, width%, height%, type }
    const zones = [
        {
            id: 'drone',
            label: 'Aerial Analysis',
            top: '5%',
            left: '60%',
            width: '15%',
            height: '15%',
            type: 'info',
            icon: '🚁'
        },
        {
            id: 'market',
            label: 'Market Board',
            top: '40%',
            left: '45%',
            width: '12%',
            height: '10%',
            type: 'analytics',
            icon: '📊'
        },
        {
            id: 'tractor',
            label: 'Equipment',
            top: '60%',
            left: '40%',
            width: '10%',
            height: '10%',
            type: 'action',
            icon: '🚜',
            warning: readinessState !== 'READY' // Show warning if user is not ready
        },
        {
            id: 'crops',
            label: 'Crop Health',
            top: '65%',
            left: '10%',
            width: '20%',
            height: '20%',
            type: 'nature',
            icon: '🌾'
        },
        {
            id: 'advisor',
            label: 'Twin Advisor',
            top: '70%',
            left: '80%',
            width: '8%',
            height: '15%',
            type: 'ai',
            icon: '🧑‍🌾'
        }
    ];

    return (
        <div className="absolute inset-0 z-10">
            {zones.map((zone) => (
                <React.Fragment key={zone.id}>
                    {/* The Clickable Zone Area (Transparent but active) */}
                    <div
                        onClick={() => onZoneClick(zone)}
                        className="absolute cursor-pointer group transition-all duration-300"
                        style={{
                            top: zone.top,
                            left: zone.left,
                            width: zone.width,
                            height: zone.height,
                        }}
                    >
                        {/* Visual Indicator (Only shows on hover or constant if needed) */}
                        <div className={`
                    w-full h-full rounded-xl border-2 border-white/50 bg-white/10 backdrop-blur-[2px] 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.5)]
                    ${zone.warning ? 'border-amber-400/80 animate-pulse' : ''}
                `}>
                            <span className="text-3xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform">{zone.icon}</span>
                        </div>

                        {/* Text Label on Hover */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                                bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {zone.label}
                            {zone.warning && <span className="ml-1 text-amber-300">⚠️ Check</span>}
                        </div>
                    </div>

                    {/* Permanent "Pulsing" Marker for discoverability if not hovering */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            top: `calc(${zone.top} + ${parseFloat(zone.height) / 2}%)`,
                            left: `calc(${zone.left} + ${parseFloat(zone.width) / 2}%)`,
                        }}
                    >
                        <div className="relative -top-3 -left-3">
                            <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-white opacity-20"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white/60"></span>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default WorldOverlayLayer;

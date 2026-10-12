import React, { useState, useMemo } from 'react';
import BackButton from './BackButton';
import {
    TrendingUp,
    TrendingDown,
    Activity,
    CircleDollarSign,
    BarChart3,
    Calendar,
    Globe,
    ShieldCheck,
    Zap,
    Info,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    Gauge
} from 'lucide-react';
import { MARKET_DATA, GLOBAL_MARKET_SENTIMENT } from '../data/marketData';
import IntelligenceCard from './legendary/IntelligenceCard';
import StatusBadge from './legendary/StatusBadge';
import CommandButton from './legendary/CommandButton';

const MarketPrices = ({ isDarkMode, language = 'en', t = (k) => k }) => {
    const [selectedCrop, setSelectedCrop] = useState(MARKET_DATA[0]);
    const [timeFrame, setTimeFrame] = useState('30D');

    const maxPrice = useMemo(() => Math.max(...selectedCrop.projections.map(p => p.price)), [selectedCrop]);
    const minPrice = useMemo(() => Math.min(...selectedCrop.projections.map(p => p.price)), [selectedCrop]);
    const priceRange = maxPrice - minPrice;

    // Clinical Intelligence Chart
    const MarketChart = ({ data }) => {
        const width = 800;
        const height = 240;
        const padding = 60;

        const points = data.map((p, i) => {
            const x = padding + (i * (width - 2 * padding) / (data.length - 1));
            const y = height - padding - ((p.price - minPrice) / (priceRange || 1) * (height - 2 * padding));
            return { x, y, type: p.type };
        });

        const historicalPoints = points.filter(p => p.type !== 'projected');
        const projectedPoints = points.filter(p => p.type === 'projected' || p === points[historicalPoints.length - 1]);

        const historicalD = `M ${historicalPoints[0].x} ${historicalPoints[0].y} ` + historicalPoints.map(p => `L ${p.x} ${p.y}`).join(' ');
        const projectedD = `M ${projectedPoints[0].x} ${projectedPoints[0].y} ` + projectedPoints.map(p => `L ${p.x} ${p.y}`).join(' ');

        return (
            <div className="relative w-full h-[340px] mt-10 p-8 rounded-xl bg-[#050508]/40 border border-white/[0.03]">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Atmospheric Grid */}
                    {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => {
                        const y = height - padding - (tick * (height - 2 * padding));
                        return (
                            <g key={i}>
                                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke={isDarkMode ? "white" : "black"} strokeOpacity="0.03" />
                                <text x={padding - 15} y={y + 3} textAnchor="end" className={`text-[7px] font-mono ${isDarkMode ? 'fill-white opacity-20' : 'fill-nature-deep opacity-40'}`}>{Math.round(minPrice + tick * priceRange)}</text>
                            </g>
                        );
                    })}

                    {/* Historical Analysis Path */}
                    <path d={historicalD} fill="none" stroke="#00D1FF" strokeWidth="1.5" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(0,209,255,0.4)]" />

                    {/* Neural Projection Path */}
                    <path d={projectedD} fill="none" stroke="#00FF94" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

                    {/* Decision Nodes */}
                    {points.map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r={p.type === 'projected' ? 2 : 3} fill={p.type === 'projected' ? "#00FF94" : "#00D1FF"} />
                    ))}
                </svg>
            </div>
        );
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-obsidian-base font-sans selection:bg-cyber-blue/30">
            {/* Sovereign Atmosphere Background inherited from AppLayout */}

            <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">

                {/* Sovereign Command Header */}
                <div className="flex items-center justify-between mb-24">
                    <BackButton />
                    <div className="flex items-center gap-4">
                        <div className="mono-metadata text-[8px] opacity-40">Feed Status:</div>
                        <StatusBadge type="intelligence" value="LIVE DATA STREAM" status="active" />
                    </div>
                </div>

                {/* Intelligence Elevation Area */}
                <div className="mb-32">
                    <div className="mono-metadata text-cyber-blue mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
                        Economic Intelligence Hub
                    </div>
                    <h1 className="command-headline text-7xl md:text-9xl mb-10">
                        MARKET <span className="opacity-40">INTEL</span>
                    </h1>
                    <p className="system-body text-xl max-w-2xl opacity-60">
                        Advanced algorithmic price forecasting and geospatial market sentiment for high-stakes commodity positioning.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT: CROP SELECTOR & METRICS */}
                    <div className="lg:col-span-4 space-y-6">
                        <IntelligenceCard
                            title="Commodity Matrix"
                            subtitle="Initialize Analysis Protocol"
                            depth="surface"
                            isDarkMode={isDarkMode}
                        >
                            <div className="space-y-4">
                                {MARKET_DATA.map(crop => (
                                    <button
                                        key={crop.id}
                                        onClick={() => setSelectedCrop(crop)}
                                        className={`
                                            w-full p-8 rounded-xl border transition-all duration-700 flex items-center justify-between group
                                            ${selectedCrop.id === crop.id ? 'bg-white/[0.03] border-white/20' : 'bg-transparent border-white/5 hover:bg-white/[0.01]'}
                                        `}
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`
                                                p-4 rounded-lg transition-all duration-700
                                                ${selectedCrop.id === crop.id ? 'bg-white text-black' : 'bg-white/[0.02] text-white/40'}
                                            `}>
                                                <CircleDollarSign size={20} strokeWidth={1} />
                                            </div>
                                            <div className="text-left">
                                                <div className="mono-metadata text-[8px] opacity-40 mb-1">{crop.unit}</div>
                                                <h4 className="command-headline text-base tracking-tight">{crop.name}</h4>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="command-headline text-lg italic">₹{crop.currentPrice}</div>
                                            <div className={`mono-metadata text-[9px] flex items-center justify-end gap-1 ${crop.change >= 0 ? 'text-cyber-green' : 'text-cyber-rose'}`}>
                                                {crop.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                                {Math.abs(crop.change)}%
                                            </div>
                                        </div>

                                        {/* Interaction Channel */}
                                        <div className={`absolute inset-y-0 left-0 w-px transition-colors ${selectedCrop.id === crop.id ? 'bg-white' : 'bg-transparent'}`} />
                                    </button>
                                ))}
                            </div>
                        </IntelligenceCard>

                        <IntelligenceCard
                            title="Global Sentiment"
                            subtitle="Geospatial Logic"
                            depth="card"
                            glow={true}
                            isDarkMode={isDarkMode}
                        >
                            <div className="flex items-center justify-center py-10 relative">
                                <div className="relative">
                                    <svg className="w-40 h-40">
                                        <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="2" fill="none" opacity="0.05" />
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke="white"
                                            strokeWidth="4"
                                            fill="none"
                                            strokeDasharray={`${2 * Math.PI * 70 * (GLOBAL_MARKET_SENTIMENT.score / 100)} 999`}
                                            strokeDashcap="round"
                                            className="text-cyber-green drop-shadow-[0_0_10px_rgba(0,255,148,0.5)]"
                                            transform="rotate(-90 80 80)"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="command-headline text-3xl italic">{GLOBAL_MARKET_SENTIMENT.score}%</span>
                                        <span className="mono-metadata text-[8px] opacity-40">Positive</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 rounded-xl bg-[#050508]/40 border border-white/[0.03]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-cyber-green" />
                                    <span className="mono-metadata text-cyber-green">{GLOBAL_MARKET_SENTIMENT.riskLevel} Risk Index</span>
                                </div>
                                <p className="system-body text-xs opacity-60 leading-relaxed font-medium">
                                    {GLOBAL_MARKET_SENTIMENT.description}
                                </p>
                            </div>
                        </IntelligenceCard>
                    </div>

                    {/* RIGHT: CHART & ANALYSIS */}
                    <div className="lg:col-span-8 space-y-8">
                        <IntelligenceCard
                            title={`${selectedCrop.name} Analysis`}
                            subtitle="Algorithmic Price Projections"
                            depth="command"
                            glow={true}
                            isDarkMode={isDarkMode}
                        >
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex gap-2">
                                    {['7D', '30D', '90D', '1Y'].map(tf => (
                                        <button
                                            key={tf}
                                            onClick={() => setTimeFrame(tf)}
                                            className={`
                                                px-5 py-2 rounded-lg mono-metadata text-[8px] transition-all
                                                ${timeFrame === tf ? 'bg-white text-black' : 'bg-white/[0.02] text-white/40 hover:bg-white/[0.05]'}
                                            `}
                                        >
                                            {tf}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue shadow-[0_0_8px_rgba(0,209,255,0.4)]" />
                                        <span className="mono-metadata text-[8px] opacity-40 italic">Historical Analysis</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full border border-cyber-green" />
                                        <span className="mono-metadata text-[8px] opacity-40 italic">Neural Projection</span>
                                    </div>
                                </div>
                            </div>

                            <MarketChart data={selectedCrop.projections} />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 border-t pt-10 border-white/[0.03]">
                                {[
                                    { label: '30D Target', value: `₹${selectedCrop.projections[selectedCrop.projections.length - 1].price}`, icon: Zap, color: 'cyber-blue' },
                                    { label: 'Volume Flow', value: selectedCrop.volume, icon: Activity, color: 'cyber-green' },
                                    { label: 'Volatility', value: 'High Trace', icon: BarChart3, color: 'cyber-amber' }
                                ].map((stat, i) => {
                                    const StatIcon = stat.icon;
                                    return (
                                        <div key={i} className="p-8 rounded-xl bg-[#050508]/40 border border-white/[0.03]">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 rounded-lg bg-white/[0.02]">
                                                    <StatIcon size={14} className={`text-${stat.color}`} />
                                                </div>
                                                <span className="mono-metadata text-[8px] opacity-40">{stat.label}</span>
                                            </div>
                                            <div className="command-headline text-2xl italic">{stat.value}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </IntelligenceCard>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-xl bg-white/[0.02] border border-white/[0.05] transition-all duration-700 hover:border-cyber-green/40">
                                <h3 className="mono-metadata text-cyber-green mb-8 flex items-center gap-3">
                                    <ShieldCheck size={16} /> Optimal Strategy
                                </h3>
                                <p className="system-body text-lg text-platinum-text leading-loose mb-10">
                                    Algorithmic analysis suggests inventory retention for <span className="text-white">12 days</span>. Projected return optimization: <span className="text-cyber-green">+8.4%</span>.
                                </p>
                                <CommandButton variant="intelligence" className="w-full" isDarkMode={isDarkMode}>
                                    Initialize Sell Protocol
                                </CommandButton>
                            </div>

                            <div className="p-10 rounded-xl bg-white/[0.02] border border-white/[0.05] transition-all duration-700 hover:border-cyber-blue/40">
                                <h3 className="mono-metadata text-cyber-blue mb-8 flex items-center gap-3">
                                    <Info size={16} /> Intelligence Context
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        'Supply chain disruptions in eastern regions.',
                                        'Impending monsoon may impact transport logistics.',
                                        'Global demand for organic variants rising.'
                                    ].map((note, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue mt-2 shrink-0" />
                                            <span className="system-body text-xs text-platinum-text opacity-40 italic">{note}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sovereign Institutional Footer */}
                <div className="mt-40 pt-16 border-t border-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                            <span className="mono-metadata text-[8px] opacity-40">System Operational</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck size={12} className="opacity-40" />
                            <span className="mono-metadata text-[8px] opacity-40">Encryption Active</span>
                        </div>
                    </div>
                    <div className="mono-metadata text-[8px] opacity-20 italic">
                        Oracle Data Stream v6.4.2 • Sector Latency: 4ms
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPrices;

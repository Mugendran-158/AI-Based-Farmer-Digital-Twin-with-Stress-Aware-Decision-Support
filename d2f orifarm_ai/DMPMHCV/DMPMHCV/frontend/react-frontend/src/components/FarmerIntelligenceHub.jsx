import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BrainCircuit,
    ShieldAlert,
    Mic,
    ScanSearch,
    ChevronRight,
    X,
    Activity,
    Cpu,
    Warehouse,
    Sprout,
    Globe,
    Compass
} from 'lucide-react';
import IntelligenceCard from './legendary/IntelligenceCard';
import StatusBadge from './legendary/StatusBadge';

const FarmerIntelligenceHub = ({ t, isDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const features = [
        {
            id: 'ai-farmer',
            title: 'Agronomic Wisdom Core',
            description: 'Institutional advisory and strategic growth processing vectors',
            icon: <BrainCircuit />,
            path: '/ai-farmer',
            accent: 'nature-medium',
            status: 'V4.0 SYNC'
        },
        {
            id: 'crop-analyzer',
            title: 'Biological Diagnostics',
            description: 'Vision-integrated health and vitality analysis matrix',
            icon: <ScanSearch />,
            path: '/crop-analyzer',
            accent: 'trust-blue',
            status: 'OPTICAL ACTIVE'
        },
        {
            id: 'voice-assistant',
            title: 'Direct Field Audio',
            description: 'Natural language interface for decentralized operational control',
            icon: <Mic />,
            path: '/voice-assistant',
            accent: 'trust-blue',
            status: 'VOCAL LINK'
        },
        {
            id: 'safety-twin',
            title: 'Guardian Security',
            description: 'Ecosystem-wide threat mitigation and sentinel integrity alerts',
            icon: <ShieldAlert />,
            path: '/safety-twin',
            accent: 'earth-rose',
            status: 'SENTINEL PASS'
        },
        {
            id: 'market-prices',
            title: 'Economic Intelligence',
            description: 'Institutional market forecasting and high-fidelity price analytics',
            icon: <Warehouse />,
            path: '/market-prices',
            accent: 'harvest-gold',
            status: 'MARKET SYNC'
        },
        {
            id: 'world',
            title: 'Institutional Ecosystem',
            description: 'Real-time 3D growth environment and remote operations hub',
            icon: <Globe />,
            path: '/world',
            accent: 'nature-light',
            status: 'ECHO VIRTUAL'
        }
    ];

    return (
        <div className="fixed bottom-12 right-12 z-[1000]">

            <button
                onClick={() => setIsOpen(true)}
                className="group relative w-28 h-28 flex items-center justify-center transition-all duration-[1s] hover:scale-110 active:scale-95"
            >
                <div className={`absolute -inset-4 rounded-[2.5rem] border transition-all duration-1000 animate-[spin_10s_linear_infinite] pointer-events-none ${isDarkMode ? 'border-white/[0.03]' : 'border-nature-deep/[0.03]'}`} />
                <div className={`absolute -inset-8 rounded-[3rem] border transition-all duration-1000 animate-[spin_15s_linear_infinite_reverse] pointer-events-none ${isDarkMode ? 'border-white/[0.02]' : 'border-nature-deep/[0.02]'}`} />
                <div className={`absolute inset-0 rounded-[2.5rem] border transition-all duration-1000 shadow-[0_40px_100px_rgba(0,0,0,0.6)] group-hover:rotate-12 ${isDarkMode ? 'bg-[#0F0F0F] border-white/5 group-hover:border-nature-medium/40 shadow-black' : 'bg-[#1A2E22] border-nature-deep/10 group-hover:border-nature-medium/20 shadow-nature-deep/20'}`} />
                <div className="absolute inset-4 rounded-[2rem] bg-nature-medium/20 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className={`relative z-10 transition-all duration-1000 group-hover:scale-125 group-hover:-rotate-6 ${isDarkMode ? 'text-nature-light' : 'text-white'}`}>
                    <Sprout size={48} strokeWidth={1} className="drop-shadow-[0_0_15px_rgba(163,190,140,0.4)]" />
                </div>
                <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-nature-medium border-4 border-inherit animate-pulse z-20" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center p-6 sm:p-24 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-nature-deep/95 backdrop-blur-[100px] animate-in fade-in duration-[1s]"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-nature-medium/10 blur-[200px] animate-pulse" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-trust-blue/10 blur-[180px] animate-pulse duration-[5s]" />
                    </div>

                    <IntelligenceCard
                        title="Intelligence Hub"
                        subtitle="Institutional Growth Protocol Nucleus"
                        depth="command"
                        glow={true}
                        isDarkMode={isDarkMode}
                        className="w-full max-w-7xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 slide-in-from-bottom-20 duration-1000 relative rounded-[5rem] shadow-[0_120px_200px_rgba(0,0,0,0.8)] border-white/5"
                    >
                        <div className="absolute top-12 right-12 flex items-center gap-8">
                            <StatusBadge type="security" value="VITAL" status="active" />
                            <button
                                onClick={() => setIsOpen(false)}
                                className={`p-5 rounded-[1.5rem] transition-all duration-700 border active:scale-90 ${isDarkMode ? 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10' : 'bg-nature-deep/5 border-nature-deep/10 text-nature-deep/40 hover:text-nature-deep hover:bg-nature-deep/5'}`}
                            >
                                <X size={24} strokeWidth={1.5} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-32 mb-16">
                            {features.map((feature, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        navigate(feature.path);
                                        setIsOpen(false);
                                    }}
                                    className={`group relative p-12 rounded-[3.5rem] border transition-all duration-1000 text-left flex flex-col gap-12 overflow-hidden shadow-2xl active:scale-95 ${isDarkMode ? `bg-white/[0.01] border-white/5 hover:bg-white/[0.04] hover:border-${feature.accent}/40` : `bg-nature-deep/5 border-nature-deep/10 hover:bg-white hover:border-${feature.accent}/20 shadow-nature-deep/5`}`}
                                >
                                    <div className={`absolute top-[-20%] right-[-20%] w-48 h-48 blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none bg-${feature.accent}`} />

                                    <div className="flex items-center justify-between relative z-10">
                                        <div className={`p-6 rounded-[2rem] transition-all duration-[1.5s] group-hover:scale-110 group-hover:rotate-[15deg] shadow-2xl ${isDarkMode ? `bg-[#0F0F0F] text-${feature.accent} border border-white/5` : `bg-white text-${feature.accent} border border-slate-100 shadow-sm`}`}>
                                            {React.cloneElement(feature.icon, { size: 36, strokeWidth: 1 })}
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-1000 group-hover:translate-x-0 translate-x-12">
                                            <ChevronRight size={28} strokeWidth={1} className={`text-${feature.accent}`} />
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className={`text-2xl font-black tracking-tighter uppercase mb-4 leading-none ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                            {feature.title}
                                        </h3>
                                        <p className={`text-[15px] font-bold leading-relaxed opacity-40 max-w-[90%] ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                            {feature.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 mt-auto relative z-10">
                                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,0,0,0.5)] bg-${feature.accent}`} />
                                        <span className={`text-[9px] font-black uppercase tracking-[0.5em] opacity-30 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{feature.status}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className={`mt-20 flex flex-col md:flex-row items-center justify-between pt-16 border-t ${isDarkMode ? 'border-white/5' : 'border-nature-deep/10'}`}>
                            <div className="flex items-center gap-6 mb-8 md:mb-0">
                                <div className="p-3 rounded-2xl bg-nature-medium/10 shadow-inner">
                                    <Activity size={24} strokeWidth={1.5} className="text-nature-medium animate-pulse" />
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[11px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                        Institutional Ecosystem Sync
                                    </span>
                                    <span className="text-[9px] font-bold text-nature-medium uppercase tracking-[0.3em] mt-1">Status: Operational Fidelity 99.9%</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center md:items-end gap-3">
                                <span className={`text-[10px] font-black opacity-20 uppercase tracking-[0.6em] text-center md:text-right ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                    Sovereign Node v8.5.2 • Agriculture 4.0 Standard
                                </span>
                                <div className={`px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'border-white/5 bg-white/5 text-white/30' : 'border-nature-deep/5 bg-nature-deep/5 text-nature-deep/30'}`}>
                                    Zero Trust Encryption Active
                                </div>
                            </div>
                        </div>
                    </IntelligenceCard>
                </div>
            )}
        </div>
    );
};

export default FarmerIntelligenceHub;

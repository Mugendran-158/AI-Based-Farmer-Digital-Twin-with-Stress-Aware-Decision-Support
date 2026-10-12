import React, { useState, useEffect } from 'react';
import SeasonalCave from './seasonal/SeasonalCave';
import AiHuman from './seasonal/AiHuman';
import { fetchWeatherIntelligence } from '../utils/WeatherService';
import { calculateBiologicalState } from './BiologicalInferenceEngine';
import {
    Cloud, AlertTriangle, Droplets, FlaskConical,
    Search, X, ThermometerSun, Leaf, Zap, Activity,
    MoreHorizontal, ArrowUpRight
} from 'lucide-react';

const GenerativeFarmWorld = ({
    season,
    onCaveClick,
    onZoneClick,
    readinessState,
    language,
    setLanguage,
    timeOverride = null,
    activeAlert = null,
    isDarkMode = false
}) => {
    const [weather, setWeather] = useState(null);
    const [showWeatherIntelligence, setShowWeatherIntelligence] = useState(false);
    const [showBioModule, setShowBioModule] = useState(false);

    // Simple mock state for dashboard visualization
    const [farmerActions] = useState({ irrigated: false, fertilized: false, observedStress: false });
    const [growthStage] = useState('VEGETATIVE');

    // Calculated State (Simplified for Dashboard)
    const globalBioState = calculateBiologicalState({
        season,
        weather: weather?.current,
        timeOfDay: { isDay: true, altitude: 1 },
        actions: farmerActions,
        growthStage
    });

    useEffect(() => {
        const loadWeather = async () => {
            const data = await fetchWeatherIntelligence();
            if (data) setWeather(data);
        };
        loadWeather();
    }, []);

    // --- DASHBOARD CARD COMPONENT ---
    const DashboardCard = ({ title, icon: Icon, children, className = "", onClick, active = false }) => (
        <div
            onClick={onClick}
            className={`
                group relative p-8 rounded-[2.5rem] transition-all duration-700
                backdrop-blur-xl border card-glow shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-pointer
                ${isDarkMode
                    ? 'bg-white/5 border-white/5 hover:border-white/10'
                    : 'bg-nature-deep/5 border-nature-deep/5 hover:border-nature-deep/20'}
                ${active ? (isDarkMode ? 'ring-2 ring-nature-light/50' : 'ring-2 ring-nature-medium/50') : ''}
                ${className}
            `}
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl transition-all duration-500 ${active
                        ? (isDarkMode ? 'bg-nature-light text-nature-deep' : 'bg-nature-medium text-white')
                        : (isDarkMode ? 'bg-white/5 text-nature-light' : 'bg-nature-deep/5 text-nature-deep') + ' group-hover:bg-nature-medium/20 group-hover:text-nature-medium'}`}>
                        <Icon size={22} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h3 className={`font-black uppercase tracking-[0.15em] text-xs ${isDarkMode ? 'text-white/80' : 'text-nature-deep/80'}`}>{title}</h3>
                        <div className="flex items-center gap-1.5 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-1 h-1 rounded-full bg-nature-medium animate-pulse" />
                            <span className="text-[9px] text-nature-medium font-black uppercase tracking-widest">Live Thread</span>
                        </div>
                    </div>
                </div>
                <ArrowUpRight size={18} className="text-nature-medium/40 group-hover:text-nature-medium transition-colors duration-500" />
            </div>
            {children}
        </div>
    );

    return (
        <div className="p-8 h-full bg-slate-50/50 dark:bg-slate-900/50 relative overflow-y-auto">

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

                {/* 1. WEATHER MODULE CARD */}
                <DashboardCard
                    title="Atmospheric Data"
                    icon={ThermometerSun}
                    onClick={() => setShowWeatherIntelligence(true)}
                    active={showWeatherIntelligence}
                    className="md:col-span-2 lg:col-span-1"
                >
                    <div className="space-y-6">
                        <div className="flex items-end gap-3">
                            <span className={`text-6xl font-black ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                {Math.round(weather?.current?.temp_c || 24)}°
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-nature-medium/60 mb-3">Deg Celsius</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 text-nature-light hover:bg-white/10' : 'bg-nature-deep/5 border-nature-deep/5 text-nature-medium hover:bg-nature-deep/10'}`}>
                                Humidity: {weather?.current?.humidity}%
                            </span>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 text-harvest-gold hover:bg-white/10' : 'bg-nature-deep/5 border-nature-deep/5 text-harvest-gold hover:bg-nature-deep/10'}`}>
                                UV: {weather?.current?.uv}
                            </span>
                        </div>
                        <div className={`h-1 w-full rounded-full overflow-hidden mt-6 ${isDarkMode ? 'bg-white/5' : 'bg-nature-deep/5'}`}>
                            <div className="h-full bg-nature-medium w-3/4 rounded-full animate-pulse" />
                        </div>
                        <p className="text-[9px] font-black tracking-[0.2em] text-nature-medium/40 mt-4 uppercase">Node_Hash: ATM-094-X</p>
                    </div>
                </DashboardCard>

                {/* 2. BIOLOGICAL MODULE CARD */}
                <DashboardCard
                    title="Crop Biology"
                    icon={Leaf}
                    onClick={() => setShowBioModule(!showBioModule)}
                    active={showBioModule}
                >
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white/40' : 'text-nature-deep/40'}`}>Health Status</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-nature-medium">Institutional Grade</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 space-y-3">
                                <div className={`flex justify-between text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-nature-deep/40'}`}>
                                    <span>Nitrogen</span>
                                    <span className="text-nature-medium">84%</span>
                                </div>
                                <div className={`h-1 w-full rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-nature-deep/5'}`}>
                                    <div className="h-full bg-nature-medium w-[84%] rounded-full shadow-[0_0_10px_rgba(76,107,79,0.3)]" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 space-y-3">
                                <div className={`flex justify-between text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-nature-deep/40'}`}>
                                    <span>Hydration</span>
                                    <span className="text-trust-blue">62%</span>
                                </div>
                                <div className={`h-1 w-full rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-nature-deep/5'}`}>
                                    <div className="h-full bg-trust-blue w-[62%] rounded-full shadow-[0_0_10px_rgba(44,95,120,0.3)]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </DashboardCard>

                {/* 3. KNOWLEDGE GATEWAY (Was Cave) */}
                <DashboardCard
                    title="Knowledge Base"
                    icon={FlaskConical}
                    className="bg-indigo-50/50 border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-800"
                >
                    <div className="flex flex-col items-center justify-center py-2">
                        <SeasonalCave
                            season={season}
                            onClick={onCaveClick}
                        />
                        <p className="text-center text-xs font-medium text-indigo-400 mt-4 max-w-[200px]">
                            Access seasonal archives and agronomic directives.
                        </p>
                    </div>
                </DashboardCard>

                {/* 4. AI AGENT CARD (Field Orchestrator) */}
                <DashboardCard
                    title="Field Orchestrator"
                    icon={Zap}
                    className={`md:col-span-2 lg:col-span-2 border-0 shadow-2xl relative overflow-hidden transition-all duration-1000 ${isDarkMode ? 'bg-gradient-to-br from-nature-deep to-black' : 'bg-gradient-to-br from-nature-deep to-nature-medium text-white'}`}
                >
                    <div className="absolute top-0 right-0 p-48 bg-nature-light/10 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 opacity-50" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-nature-light animate-pulse shadow-[0_0_10px_rgba(163,190,140,0.8)]" />
                                <span className="text-[10px] font-black text-nature-light tracking-[0.3em] uppercase">Control System Online</span>
                            </div>
                            <h2 className="text-3xl font-light leading-snug text-white/90">
                                "All systems nominal. <span className="text-white font-black">Growth Sector 4</span> requires precision irrigation within 120 minutes."
                            </h2>
                            <div className="flex gap-4 pt-4">
                                <button className={`px-8 py-3 rounded-2xl transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] border ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-nature-deep/20 border-white/10 hover:bg-nature-deep/30 hover:border-white/20'}`}>
                                    View Logic Logs
                                </button>
                                <button className="px-8 py-3 rounded-2xl bg-nature-light hover:bg-white transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] text-nature-deep shadow-xl hover:scale-105 active:scale-95">
                                    Deploy Directive
                                </button>
                            </div>
                        </div>

                        <div className="h-56 flex items-center justify-center">
                            <div className="scale-90 transform-gpu group-hover:scale-100 transition-transform duration-1000">
                                <AiHuman
                                    season={season}
                                    language={language}
                                    weather={weather?.current}
                                    bioState={globalBioState}
                                />
                            </div>
                        </div>
                    </div>
                </DashboardCard>

                {/* 5. ZONE STATUS MINI CARDS */}
                <div className="lg:col-span-1 grid grid-cols-1 gap-4">
                    {['Growth Sector A', 'Growth Sector B', 'Hydroponic Core'].map((zone, i) => (
                        <div key={zone} className={`p-6 rounded-[2rem] border transition-all duration-500 flex items-center justify-between cursor-pointer group backdrop-blur-md ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10' : 'bg-nature-deep/5 border-nature-deep/5 hover:border-nature-deep/10'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isDarkMode ? 'bg-white/5 text-white/40' : 'bg-nature-deep/5 text-nature-deep/40'} group-hover:scale-110 group-hover:text-nature-medium`}>
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <h4 className={`font-black uppercase tracking-[0.1em] text-xs ${isDarkMode ? 'text-white/80' : 'text-nature-deep/80'}`}>{zone}</h4>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="w-1 h-1 rounded-full bg-nature-medium opacity-50" />
                                        <span className="text-[9px] text-nature-medium font-black uppercase tracking-widest">Growth Zone Secure</span>
                                    </div>
                                </div>
                            </div>
                            <MoreHorizontal size={18} className="text-nature-medium/20 group-hover:text-nature-medium" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenerativeFarmWorld;

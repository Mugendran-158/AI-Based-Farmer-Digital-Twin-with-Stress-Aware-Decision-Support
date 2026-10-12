import React, { useState, useEffect, useMemo } from 'react';
import { COLD_STORAGE_DATA, CROP_INTELLIGENCE } from '../../data/coldStorageData';
import ColdStorageMapView from './ColdStorageMapView';
import { initSpeechRecognition } from '../../utils/VoiceInputModule';
import {
    Snowflake, Scale, MapPin, Search, Mic, X, List, Map as MapIcon,
    Thermometer, Package, Truck, Phone, Navigation, ArrowRight,
    Loader2, AlertCircle, Info, Database, Layers
} from 'lucide-react';

// Helper components moved to top to prevent reference errors
const LayoutSproutIcon = () => <div className="text-lg">🌱</div>;
const CheckCircleIcon = ({ size }) => (
    <div className="rounded-full border-2 border-current flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="w-1/2 h-1/2 bg-current rounded-full" />
    </div>
);

/**
 * ColdStorageIntelligence - The main intelligence system for checking availability.
 * Imperial Platinum Edition
 */
const ColdStorageIntelligence = ({ onBack, language }) => {
    const [searchQuery, setSearchQuery] = useState({
        crop: '',
        quantity: '',
        location: ''
    });
    const [isListening, setIsListening] = useState(false);
    const [listeningField, setListeningField] = useState(null);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'

    const t = useMemo(() => ({
        en: {
            title: "Cold Storage Intelligence",
            subtitle: "REAL-TIME AVAILABILITY & PRICE",
            cropLabel: "What crop?",
            qtyLabel: "Quantity (kg/tons)",
            locLabel: "Search Area",
            checkBtn: "Analyze Availability",
            available: "Available",
            full: "Sold Out / Full",
            cost: "Storage Cost",
            capacity: "Total Capacity",
            rem: "Remaining",
            rec: "Smart Recommendations",
            footer: "Map and distance data are provided using OpenStreetMap and OpenRouteService. Availability and prices may change.",
            noMatch: "No matching facility found for this crop temperature requirements.",
            suggest: "Try these nearby alternatives:"
        },
        ta: {
            title: "பனி கூடம் அறிவாற்றல்",
            subtitle: "உண்மை நேர இருப்பு மற்றும் விலை",
            cropLabel: "என்ன பயிர்?",
            qtyLabel: "அளவு (கிலோ/டன்)",
            locLabel: "தேடும் பகுதி",
            checkBtn: "இருப்பை ஆய்வு செய்க",
            available: "கிடைக்கும்",
            full: "இடமில்லை / நிரம்பிவிட்டது",
            cost: "சேமிப்பு கட்டணம்",
            capacity: "மொத்த கொள்ளளவு",
            rem: "மீதமுள்ளவை",
            rec: "அறிவார்ந்த பரிந்துரைகள்",
            footer: "வரைபடம் மற்றும் தூரத் தரவு OpenStreetMap மற்றும் OpenRouteService ஐப் பயன்படுத்தி வழங்கப்படுகிறது. இருப்பு மற்றும் விலை மாறலாம்.",
            noMatch: "இந்த பயிர் வெப்பநிலை தேவைகளுக்கு பொருத்தமான வசதி எதுவும் கிடைக்கவில்லை.",
            suggest: "இந்த அருகிலுள்ள மாற்றுகளை முயற்சிக்கவும்:"
        }
    }), []);

    const currentT = t[language] || t.en;

    const handleSearch = async () => {
        if (!searchQuery.crop) return;
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/cold-storage/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchQuery)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success' && data.facilities.length > 0) {
                    setResults(data.facilities);
                    setSelectedFacility(data.facilities[0]);
                    setIsLoading(false);
                    return;
                }
            }
        } catch (error) {
            console.error("Real-time search error:", error);
        }

        const queryCrop = searchQuery.crop.trim().toLowerCase();
        const queryLoc = searchQuery.location.trim().toLowerCase();

        const cropKey = Object.keys(CROP_INTELLIGENCE).find(k => k.toLowerCase() === queryCrop);
        const cropData = cropKey ? CROP_INTELLIGENCE[cropKey] : null;

        let filtered = COLD_STORAGE_DATA.filter(cs => {
            const supportsCrop = cs.supportedCrops.some(c => c.toLowerCase().includes(queryCrop));
            let tempMatch = true;
            if (cropData) {
                tempMatch = cropData.temp >= cs.tempRange.min && cropData.temp <= cs.tempRange.max;
            }
            const locMatch = queryLoc ? cs.location.name.toLowerCase().includes(queryLoc) : true;
            return supportsCrop && tempMatch && locMatch;
        });

        filtered.sort((a, b) => {
            if (a.status === 'Available' && b.status !== 'Available') return -1;
            if (a.status !== 'Available' && b.status === 'Available') return 1;
            return a.costPerKg - b.costPerKg;
        });

        setResults(filtered);
        if (filtered.length > 0) setSelectedFacility(filtered[0]);
        setIsLoading(false);
    };

    const toggleVoice = (field) => {
        if (isListening) {
            setIsListening(false);
            setListeningField(null);
        } else {
            setListeningField(field);
            const rec = initSpeechRecognition(language, (transcript) => {
                setSearchQuery(prev => ({ ...prev, [field]: transcript }));
                setIsListening(false);
                setListeningField(null);
            }, () => {
                setIsListening(false);
                setListeningField(null);
            });
            if (rec) {
                rec.start();
                setIsListening(true);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-obsidian-base/95 backdrop-blur-[80px] animate-in fade-in duration-500">
            <div className="relative w-full h-full md:h-[95vh] md:max-w-7xl md:rounded-xl bg-obsidian-panel border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">

                <div className="px-10 py-10 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/[0.01]">
                    <div className="flex items-center gap-8">
                        <div className="w-16 h-16 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center justify-center shadow-2xl text-cyber-blue">
                            <Snowflake size={32} strokeWidth={1} className="animate-pulse" />
                        </div>
                        <div>
                            <h2 className="command-headline text-3xl tracking-tight uppercase italic">{currentT.title}</h2>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
                                <div className="mono-metadata text-[8px] opacity-40 uppercase tracking-[0.4em] text-cyber-blue">{currentT.subtitle}</div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onBack}
                        className="p-4 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-[450px] p-10 border-b md:border-b-0 md:border-r border-white/5 overflow-y-auto bg-white/[0.01] shrink-0 custom-scrollbar">
                        <div className="space-y-10">
                            {[
                                { id: 'crop', label: currentT.cropLabel, icon: <LayoutSproutIcon />, placeholder: language === 'ta' ? 'உருளைக்கிழங்கு...' : 'e.g. Potato...' },
                                { id: 'quantity', label: currentT.qtyLabel, icon: <Scale size={18} strokeWidth={1} />, placeholder: 'e.g. 500kg' },
                                { id: 'location', label: currentT.locLabel, icon: <MapPin size={18} strokeWidth={1} />, placeholder: 'e.g. Madurai' }
                            ].map(field => (
                                <div key={field.id} className="space-y-4 group/input">
                                    <label className="mono-metadata text-[8px] opacity-40 uppercase tracking-[0.4em] transition-colors group-hover/input:text-cyber-blue">{field.label}</label>
                                    <div className="relative">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within/input:text-cyber-blue">
                                            {field.icon}
                                        </div>
                                        <input
                                            type="text"
                                            value={searchQuery[field.id]}
                                            onChange={(e) => setSearchQuery(prev => ({ ...prev, [field.id]: e.target.value }))}
                                            placeholder={field.placeholder}
                                            className="w-full h-16 bg-[#050508]/50 border border-white/10 rounded-xl pl-16 pr-16 text-platinum-pure text-base focus:outline-none focus:border-cyber-blue shadow-inner transition-all font-medium placeholder:text-white/10"
                                        />
                                        <button
                                            onClick={() => toggleVoice(field.id)}
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${listeningField === field.id
                                                ? 'bg-cyber-rose/20 text-cyber-rose animate-pulse'
                                                : 'bg-white/5 text-white/20 hover:text-white'
                                                }`}
                                        >
                                            {listeningField === field.id ? <Loader2 className="animate-spin" size={16} /> : <Mic size={16} />}
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={handleSearch}
                                disabled={isLoading}
                                className="w-full relative overflow-hidden group"
                            >
                                <div className="relative py-6 bg-cyber-blue text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-xl group-hover:bg-white transition-all flex items-center justify-center gap-3">
                                    {isLoading ? (
                                        <React.Fragment>
                                            <Loader2 size={16} className="animate-spin" />
                                            Scanning Matrix...
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <Search size={16} strokeWidth={3} />
                                            {currentT.checkBtn}
                                        </React.Fragment>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 relative flex flex-col bg-[#080808]">
                        <div className="absolute top-8 right-8 z-[50] flex bg-obsidian-surface/90 backdrop-blur-xl p-1.5 rounded-xl border border-white/10 shadow-2xl">
                            <button
                                type="button"
                                onClick={() => setViewMode('list')}
                                className={`px-6 py-3 rounded-lg flex items-center gap-3 transition-all mono-metadata text-[8px] ${viewMode === 'list'
                                    ? 'bg-white text-black'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                    } `}
                            >
                                <List size={14} strokeWidth={1.5} />
                                {language === 'ta' ? 'பட்டியல்' : 'LIST VIEW'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('map')}
                                className={`px-6 py-3 rounded-lg flex items-center gap-3 transition-all mono-metadata text-[8px] ${viewMode === 'map'
                                    ? 'bg-white text-black'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <MapIcon size={14} strokeWidth={1.5} />
                                {language === 'ta' ? 'வரைபடம்' : 'MAP MATRIX'}
                            </button>
                        </div>

                        {results.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center opacity-40">
                                <div className="w-32 h-32 bg-blue-500/5 rounded-[3rem] flex items-center justify-center mb-8 border border-white/5">
                                    <Database size={64} className="text-blue-500/50" strokeWidth={1} />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{language === 'ta' ? 'தேடலைத் தொடங்குங்கள்' : 'START YOUR SEARCH'}</h3>
                                <p className="text-sm font-medium text-slate-500 max-w-sm leading-relaxed uppercase tracking-wider">
                                    {language === 'ta' ? 'அருகிலுள்ள பனி கூடங்களை கண்டறிய பயிர் மற்றும் அளவை உள்ளிடவும்' : 'Enter crop details to access the global cold storage network.'}
                                </p>
                            </div>
                        ) : (
                            viewMode === 'list' ? (
                                <div className="flex-1 overflow-y-auto p-12 space-y-8 custom-scrollbar">
                                    <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#080808]/90 backdrop-blur-sm py-6 z-10 border-b border-white/[0.03]">
                                        <h3 className="mono-metadata text-[10px] opacity-40 uppercase tracking-[0.4em]">Intelligence Results ({results.length})</h3>
                                    </div>

                                    {results.map(cs => (
                                        <div
                                            key={cs.id}
                                            onClick={() => setSelectedFacility(cs)}
                                            className={`p-10 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${selectedFacility?.id === cs.id
                                                ? 'bg-white/[0.03] border-white/20'
                                                : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                                                }`}
                                        >
                                            {selectedFacility?.id === cs.id && <div className="absolute left-0 top-0 bottom-0 w-px bg-white" />}

                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                                                <div className="flex gap-8">
                                                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center border ${cs.status === 'Available'
                                                        ? 'bg-cyber-green/10 border-cyber-green/20 text-cyber-green'
                                                        : 'bg-cyber-rose/10 border-cyber-rose/20 text-cyber-rose opacity-40'
                                                        }`}>
                                                        {cs.status === 'Available' ? <CheckCircleIcon size={24} /> : <AlertCircle size={24} />}
                                                    </div>
                                                    <div>
                                                        <h3 className="command-headline text-2xl tracking-tight text-white group-hover:text-cyber-blue transition-colors">{cs.name[language]}</h3>
                                                        <div className="flex items-center gap-3 mt-4">
                                                            <MapPin size={12} className="text-cyber-blue" strokeWidth={1} />
                                                            <p className="mono-metadata text-[9px] opacity-40 uppercase tracking-widest">
                                                                {cs.location.name} {cs.distance ? `• ${cs.distance} KM` : ''}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="command-headline text-3xl italic">₹{cs.costPerKg}</div>
                                                    <div className="mono-metadata text-[8px] opacity-20 uppercase mt-2">UNIT COST / KG</div>
                                                    <div className={`inline-flex items-center px-4 py-1.5 rounded-md mono-metadata text-[7px] tracking-[0.2em] mt-6 border ${cs.status === 'Available'
                                                        ? 'bg-cyber-green/10 border-cyber-green/20 text-cyber-green'
                                                        : 'bg-cyber-rose/10 border-cyber-rose/20 text-cyber-rose'
                                                        }`}>
                                                        {cs.status === 'Available' ? currentT.available : currentT.full}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[
                                                    { label: currentT.capacity, value: `${cs.totalCapacity} T`, icon: <Package size={14} strokeWidth={1} /> },
                                                    { label: currentT.rem, value: `${cs.availableCapacity} T`, icon: <Layers size={14} strokeWidth={1} />, color: 'cyber-blue' },
                                                    { label: language === 'ta' ? 'தொடர்பு' : 'SECURE LINE', value: cs.contact, icon: <Phone size={14} strokeWidth={1} /> }
                                                ].map(stat => (
                                                    <div key={stat.label} className="bg-[#050508]/40 p-6 rounded-lg border border-white/[0.03] flex items-center gap-5 group/stat hover:border-white/10 transition-colors">
                                                        <div className={`p-3 rounded-md bg-white/[0.02] text-white/20 group-hover/stat:text-${stat.color || 'white'} transition-colors`}>
                                                            {stat.icon}
                                                        </div>
                                                        <div>
                                                            <div className="mono-metadata text-[7px] opacity-40 uppercase mb-2">
                                                                {stat.label}
                                                            </div>
                                                            <div className="command-headline text-sm italic">{stat.value}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex-1 p-6 relative min-h-[600px] bg-[#0c0c0c]">
                                    <div className="absolute inset-0 z-0 opacity-50">
                                        <ColdStorageMapView
                                            facilities={results}
                                            selectedFacility={selectedFacility}
                                            language={language}
                                        />
                                    </div>
                                    <div className="absolute top-8 left-8 z-[1001] w-80 bg-obsidian-panel/95 backdrop-blur-2xl p-8 rounded-xl border border-white/10 shadow-2xl">
                                        <h4 className="flex items-center gap-3 mono-metadata text-[8px] text-cyber-blue uppercase tracking-[0.4em] mb-6">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
                                            Active Coordinate
                                        </h4>
                                        {selectedFacility ? (
                                            <div className="space-y-6">
                                                <div className="command-headline text-xl text-white italic">{selectedFacility.name[language]}</div>
                                                <div className="mono-metadata text-[8px] opacity-40 flex items-center gap-3">
                                                    <MapPin size={10} strokeWidth={1} /> {selectedFacility.location.name}
                                                </div>
                                                <div className="pt-6 border-t border-white/[0.03] flex items-center justify-between">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="command-headline text-2xl">₹{selectedFacility.costPerKg}</span>
                                                        <span className="mono-metadata text-[8px] opacity-20">/KG</span>
                                                    </div>
                                                    <div className={`mono-metadata text-[7px] px-3 py-1 rounded-md border ${selectedFacility.status === 'Available' ? 'bg-cyber-green/10 border-cyber-green/20 text-cyber-green' : 'bg-cyber-rose/10 border-cyber-rose/20 text-cyber-rose'}`}>
                                                        {selectedFacility.status === 'Available' ? 'NOMINAL' : 'LIMIT'}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mono-metadata text-[8px] opacity-20 italic">Initialize target selection...</div>
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className="px-10 py-6 bg-obsidian-surface border-t border-white/5 flex flex-col md:flex-row items-center justify-between shrink-0 gap-6">
                    <div className="flex items-center gap-4">
                        <Info size={14} className="opacity-20 translate-y-px" />
                        <p className="mono-metadata text-[8px] opacity-20 uppercase tracking-[0.2em] max-w-2xl text-center md:text-left">
                            {currentT.footer}
                        </p>
                    </div>
                    <div className="flex items-center gap-6 mono-metadata text-[8px] opacity-20 italic">
                        <span>Secured Oracle Stream</span>
                        <div className="w-1 h-1 bg-cyber-blue/40 rounded-full" />
                        <span>Logistics Node v6.4.2</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColdStorageIntelligence;

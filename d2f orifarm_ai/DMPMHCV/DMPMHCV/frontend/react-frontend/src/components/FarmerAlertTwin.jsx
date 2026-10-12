import React, { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import {
    ShieldCheck,
    Wifi,
    MapPin,
    Mail,
    Video,
    AlertTriangle,
    Check,
    Settings,
    ArrowRight,
    Loader,
    Activity,
    RotateCcw,
    Maximize,
    Minimize,
    ChevronLeft,
    Mic,
    Scan,
    Target,
    Zap,
    Flame,
    Eye,
    Server,
    Radio,
    Laptop,
    Camera,
    Cpu,
    Workflow,
    Lock,
    Hexagon,
    Radar,
    PhoneCall,
    Upload,
    X,
    FileText,
    Image as ImageIcon
} from 'lucide-react';
import IntelligenceCard from './legendary/IntelligenceCard';
import StatusBadge from './legendary/StatusBadge';
import CommandButton from './legendary/CommandButton';
import BackButton from './BackButton';

import LegendaryIcon from './legendary/LegendaryIcon';

// --- UTILS ---
const checkBirdType = (imgOrVideo) => {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgOrVideo, 0, 0, 32, 32);
        const data = ctx.getImageData(0, 0, 32, 32).data;

        let coloredPixels = 0;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            if ((g > r + 30 && g > b + 30) || (r > g + 50 && r > b + 50)) coloredPixels++;
        }
        return (coloredPixels / 1024) > 0.05 ? 'Parrot (Avian)' : 'Hawk / Vulture (Predator)';
    } catch (e) { return 'Bird'; }
};

const getSmartLabel = (cls, source = null, bbox = null) => {
    const low = cls.toLowerCase();
    if (low === 'bird' && source) return checkBirdType(source);
    if (low === 'cat' && bbox) {
        const [x, y, w, h] = bbox;
        if (h > w * 1.2) return 'Kangaroo';
        return 'Monkey / Cat';
    }
    const map = {
        'bear': 'Lion / Predator',
        'zebra': 'Tiger / Predator',
        'giraffe': 'Cheetah / Predator',
        'horse': 'Camel',
        'dog': 'Coyote / Dog',
        'snake': 'Snake / Venomous Threat',
        'elephant': 'Wild Elephant',
        'cow': 'Cattle / Cow',
        'sheep': 'Livestock / Sheep',
        'goat': 'Livestock / Goat',
        'bird': 'Bird / Hawk'
    };
    return map[low] || (cls.charAt(0).toUpperCase() + cls.slice(1));
};

// Strict Biological Logic Filters
const ALLOWED_BIO_ENTITIES = [
    'person', // Intruder context
    'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe'
];

const FarmerAlertTwin = ({ isDarkMode = true }) => {
    const navigate = useNavigate();

    // --- STATE ---
    const [step, setStep] = useState(1);
    const [mode, setMode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMonitoringEnabled, setIsMonitoringEnabled] = useState(false);

    // Step 2: Detection Toggles
    const [detections, setDetections] = useState({
        fire: true,
        animal: true,
        intruder: true,
        voice: true
    });

    // Step 3: Location
    const [locationMode, setLocationMode] = useState('address');
    const [address, setAddress] = useState('');
    const [gpsCoords, setGpsCoords] = useState(null);

    // Step 4: Wi-Fi
    const [wifiNetworks, setWifiNetworks] = useState([]);
    const [selectedWifi, setSelectedWifi] = useState(null);
    const [isScanningWifi, setIsScanningWifi] = useState(false);
    const [wifiError, setWifiError] = useState(null);

    // Step 5: Contacts
    const [contacts, setContacts] = useState(['', '', '', '']);
    const [phoneNumbers, setPhoneNumbers] = useState(['', '', '', '']);

    // Step 6-8: Monitoring
    const webcamRef = useRef(null);
    const containerRef = useRef(null);
    const [model, setModel] = useState(null);
    const [lastAlertTime, setLastAlertTime] = useState(0);
    const [activeAlert, setActiveAlert] = useState(null);
    const [onScreenMsg, setOnScreenMsg] = useState(null);
    const [fireStatus, setFireStatus] = useState({ detected: false, score: 0 });
    const [fireSensitivity, setFireSensitivity] = useState(0.85);
    const [analysisDetails, setAnalysisDetails] = useState([]);
    const [detectionBuffer, setDetectionBuffer] = useState({ fire: 0, person: 0, animal: 0 });
    const [voiceProfile, setVoiceProfile] = useState({ gender: null, age: null, timestamp: 0 });
    const [voiceListening, setVoiceListening] = useState(false);
    const [lastTranscript, setLastTranscript] = useState("");
    const isLoopingRef = useRef(false);

    // Deep Inference State
    const [uploadedImage, setUploadedImage] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const imageRef = useRef(null);

    // --- PERSISTENCE & INIT ---
    useEffect(() => {
        const savedConfig = localStorage.getItem('farmerSafeTwinConfig');
        if (savedConfig) {
            try {
                const config = JSON.parse(savedConfig);
                setDetections(config.detections);
                setLocationMode(config.locationMode);
                setAddress(config.address);
                setSelectedWifi(config.selectedWifi);
                setContacts(config.contacts);
                setPhoneNumbers(config.phoneNumbers || ['', '', '', '']);
            } catch (e) {
                console.error("Failed to parse saved config", e);
            }
        }
    }, []);

    const saveConfig = () => {
        const config = { detections, locationMode, address, contacts, phoneNumbers, selectedWifi };
        localStorage.setItem('farmerSafeTwinConfig', JSON.stringify(config));
    };

    const handleNext = () => {
        if (step === 5) saveConfig();
        setStep(prev => prev + 1);
        setError(null);
    };

    const handleBack = () => {
        setStep(prev => Math.max(1, prev - 1));
        setError(null);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => console.error(err));
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleReconfigure = () => {
        setStep(1);
        setIsFullscreen(false);
        if (document.fullscreenElement) document.exitFullscreen();
    };

    const fetchWifiNetworks = async () => {
        setIsScanningWifi(true);
        setWifiError(null);
        try {
            const res = await axios.get('/api/wifi-networks');
            if (res.data.networks) {
                setWifiNetworks(res.data.networks);
            } else {
                setWifiNetworks([]);
            }
        } catch (err) {
            console.error("WiFi Scan Error:", err);
            setWifiError("Failed to access network scanner. Ensure backend is active.");
            setWifiNetworks([]);
        } finally {
            setIsScanningWifi(false);
        }
    };

    const fetchGpsLocation = () => {
        if (!navigator.geolocation) {
            setAddress("GPS not supported by this browser.");
            return;
        }
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const coords = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
                setGpsCoords(coords);
                setAddress(`coordinates: ${coords}`);

                try {
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                    if (response.data && response.data.display_name) {
                        setAddress(response.data.display_name);
                    }
                } catch (error) {
                    console.error("Reverse Geocoding Failed", error);
                }

                setIsLoading(false);
            },
            (error) => {
                console.error("GPS Error: ", error);
                setAddress("GPS Scan Failed: " + error.message);
                setIsLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    useEffect(() => {
        if (step === 4) {
            fetchWifiNetworks();
            const poll = setInterval(fetchWifiNetworks, 10000);
            return () => clearInterval(poll);
        }
    }, [step]);

    useEffect(() => {
        const loadModel = async () => {
            try {
                if (cocoSsd) {
                    const loadedModel = await cocoSsd.load();
                    setModel(loadedModel);
                }
            } catch (err) {
                console.error("AI Model Load Failed", err);
            }
        };
        if ((step === 6 || (step >= 2 && mode === 'software')) && !model) loadModel();
    }, [step, mode]);

    useEffect(() => {
        if (step === 6 && detections.voice && isMonitoringEnabled && mode !== 'software') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.onstart = () => setVoiceListening(true);
                recognition.onresult = (event) => {
                    const lastResult = event.results[event.results.length - 1];
                    const transcript = lastResult[0].transcript.toLowerCase().trim();
                    setLastTranscript(transcript);
                    const maleKeywords = ['sir', 'uncle', 'man', 'boy', 'he', 'father', 'dad'];
                    const femaleKeywords = ['madam', 'aunty', 'woman', 'girl', 'she', 'mother', 'mom'];
                    const kidKeywords = ['child', 'baby', 'kid', 'son', 'daughter'];

                    let profileUpdate = { timestamp: Date.now() };
                    let foundIdent = false;
                    if (femaleKeywords.some(k => transcript.includes(k))) { profileUpdate.gender = 'Female'; foundIdent = true; }
                    else if (maleKeywords.some(k => transcript.includes(k))) { profileUpdate.gender = 'Male'; foundIdent = true; }
                    if (kidKeywords.some(k => transcript.includes(k))) { profileUpdate.age = 'Kid'; foundIdent = true; }

                    if (foundIdent) setVoiceProfile(prev => ({ ...prev, ...profileUpdate }));
                    if (lastResult.isFinal) {
                        const distressWords = ['help', 'fire', 'danger', 'stop', 'emergency', 'intruder'];
                        if (distressWords.some(word => transcript.includes(word))) triggerAlert(`Voice Distress: "${transcript}"`, 0.95);
                    }
                };
                recognition.onend = () => {
                    setVoiceListening(false);
                    if (step === 6 && detections.voice && isMonitoringEnabled && mode !== 'software') try { recognition.start(); } catch (e) { }
                };
                try { recognition.start(); } catch (e) { }
                return () => recognition.stop();
            }
        }
    }, [step, detections.voice, isMonitoringEnabled, mode]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
                setAnalysisResult(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = async () => {
        if (!model || !imageRef.current) return;
        setIsLoading(true);
        try {
            const predictions = await model.detect(imageRef.current);
            const bioResults = predictions.filter(p => ALLOWED_BIO_ENTITIES.includes(p.class.toLowerCase()));
            const formattedResults = bioResults.map(p => ({
                label: getSmartLabel(p.class, imageRef.current, p.bbox),
                score: Math.round(p.score * 100),
                rawClass: p.class.toLowerCase()
            }));
            const uniqueResults = formattedResults.filter((v, i, a) => a.findIndex(t => (t.label === v.label)) === i);
            setAnalysisResult(uniqueResults);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const checkFire = (video) => {
        if (!detections.fire) return 0;
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 64; canvas.height = 64;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 64, 64);
            const data = ctx.getImageData(0, 0, 64, 64).data;
            let firePixels = 0;
            for (let i = 0; i < data.length; i += 4) {
                if (data[i] > 230 && data[i + 1] > 100 && data[i + 2] < 80 && data[i] > data[i + 1] + 50) firePixels++;
            }
            return Math.min((firePixels / 4096) * 15, 0.98);
        } catch (e) { return 0; }
    };

    const triggerAlert = async (type, score, image = null) => {
        const now = Date.now();
        if (now - lastAlertTime < 8000) return;
        setActiveAlert({ type, score });
        setLastAlertTime(now);
        try {
            await axios.post('/api/send-alert-email', {
                detectionType: type,
                location: locationMode === 'address' ? address : (gpsCoords || 'GPS Pending'),
                accuracy: Math.round(score * 100) + '%',
                contacts: contacts.filter(c => c),
                phone_numbers: phoneNumbers.filter(p => p),
                image: image,
                timestamp: new Date().toLocaleTimeString()
            });
        } catch (e) { console.error(e); }
        setTimeout(() => setActiveAlert(null), 5000);
    };

    const runDetection = useCallback(async () => {
        if (activeAlert || !isMonitoringEnabled || isLoopingRef.current) return;
        isLoopingRef.current = true;
        try {
            if (webcamRef.current && model && webcamRef.current.video.readyState === 4) {
                const video = webcamRef.current.video;
                const fireScore = checkFire(video);
                if (fireScore > fireSensitivity) {
                    setDetectionBuffer(prev => ({ ...prev, fire: prev.fire + 1 }));
                    if (detectionBuffer.fire >= 2) {
                        setFireStatus({ detected: true, score: fireScore });
                        triggerAlert('🔥 Fire detected — Immediate attention required', fireScore, webcamRef.current.getScreenshot());
                    }
                } else {
                    setDetectionBuffer(prev => ({ ...prev, fire: 0 }));
                    setFireStatus({ detected: false, score: fireScore });
                }

                const predictions = await model.detect(video);
                predictions.filter(p => p.score > 0.75).forEach(prediction => {
                    const cls = prediction.class.toLowerCase();
                    if (detections.intruder && cls === 'person') {
                        triggerAlert(`Human Intruder Detected`, prediction.score, webcamRef.current.getScreenshot());
                    }
                    const cocoAnimals = ['dog', 'cat', 'sheep', 'cow', 'horse', 'zebra', 'giraffe', 'elephant', 'bear', 'snake', 'bird', 'goat'];
                    if (detections.animal && cocoAnimals.includes(cls)) {
                        triggerAlert(`Animal Entry: ${getSmartLabel(cls, video, prediction.bbox)}`, prediction.score, webcamRef.current.getScreenshot());
                    }
                });
            }
        } finally { isLoopingRef.current = false; }
        requestAnimationFrame(runDetection);
    }, [model, detections, activeAlert, isMonitoringEnabled, detectionBuffer]);

    useEffect(() => {
        if (step === 6 && model && isMonitoringEnabled) {
            const animationId = requestAnimationFrame(runDetection);
            return () => cancelAnimationFrame(animationId);
        }
    }, [step, model, runDetection, isMonitoringEnabled]);

    return (
        <div className={`min-h-screen py-20 px-6 relative overflow-x-hidden transition-all duration-1000 ${isDarkMode ? 'bg-nature-deep' : 'bg-[#FAFAF9]'}`}>

            {/* Institutional Atmosphere */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(76,107,79,0.15) 0%, rgba(26,46,34,1) 100%)' }}
            />
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(163,190,140,0.1) 0%, rgba(250,250,250,1) 100%)' }}
            />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">

                {/* Mission Control Header */}
                {!isFullscreen && (
                    <div className="max-w-7xl mx-auto w-full px-0 py-8 flex items-center justify-between z-50 mb-12">
                        <BackButton onClick={() => navigate('/')} isDarkMode={isDarkMode} />

                        <div className="flex items-center gap-6">
                            <StatusBadge type="security" value="INSTITUTIONAL GRADE" status="active" />
                            <div className="flex items-center gap-4">
                                <div className={`w-px h-8 ${isDarkMode ? 'bg-white/10' : 'bg-nature-deep/10'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white/40' : 'text-nature-deep/40'}`}>
                                    {step === 6 ? 'subsystem operational' : `Initialization Sequence ${step}/5`}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`w-full flex flex-col items-center justify-center ${isFullscreen ? 'p-0' : ''}`}>

                    {/* Step 1: Protocol Selection */}
                    {step === 1 && (
                        <div className="w-full max-w-5xl space-y-12 text-center animate-fade-in">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-nature-medium/20 bg-nature-medium/10 text-nature-medium">
                                    <ShieldCheck size={12} strokeWidth={2.5} />
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em]">Guardian Security Subsystem</span>
                                </div>
                                <h1 className={`text-6xl md:text-8xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                    Guardian <span className="animate-[intelligence-shimmer_3s_infinite] bg-gradient-to-r from-nature-medium via-nature-light to-harvest-gold bg-[length:200%_auto] bg-clip-text text-transparent">Sentinel</span>
                                </h1>
                                <p className={`text-xl max-w-3xl mx-auto font-bold opacity-60 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-nature-deep/60'}`}>
                                    Deploying an autonomous nature-aligned sentry for perimeter monitoring, ecological threat detection, and bio-security synchronization.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                <button
                                    onClick={() => { setMode('hardware'); setStep(2); }}
                                    className={`group relative p-12 rounded-[3.5rem] border transition-all duration-500 text-left overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-nature-medium' : 'bg-white border border-slate-200 shadow-xl hover:border-nature-medium hover:shadow-2xl'}`}
                                >
                                    <div className="relative z-10 space-y-8">
                                        <LegendaryIcon icon={Camera} variant="solid" color="nature" size={40} animation="pulse" className="shadow-[0_20px_40px_rgba(76,107,79,0.3)] transition-transform duration-500 group-hover:scale-110" />
                                        <div>
                                            <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Wisdom Sentry</h3>
                                            <p className={`text-base font-bold leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-nature-deep/40'}`}>Continuous real-time perimeter monitoring with autonomous threat classification.</p>
                                        </div>
                                        <div className="flex items-center gap-3 pt-6 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-nature-medium">
                                            Initialize Guardian Loop <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => { setMode('software'); setStep(2); }}
                                    className={`group relative p-12 rounded-[3.5rem] border transition-all duration-500 text-left overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-trust-blue' : 'bg-white border border-slate-200 shadow-xl hover:border-trust-blue hover:shadow-2xl'}`}
                                >
                                    <div className="relative z-10 space-y-8">
                                        <LegendaryIcon icon={Scan} variant="solid" color="trust" size={40} animation="pulse" className="shadow-[0_20px_40px_rgba(44,95,120,0.3)] transition-transform duration-500 group-hover:scale-110" />
                                        <div>
                                            <h3 className={`text-2xl font-black uppercase tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Deep Inference</h3>
                                            <p className={`text-base font-bold leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-nature-deep/40'}`}>Static imagery analysis for high-precision diagnostic and threat validation.</p>
                                        </div>
                                        <div className="flex items-center gap-3 pt-6 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-trust-blue">
                                            Initialize Software Loop <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Wizard Steps (Hardware Mode) */}
                    {step > 1 && step < 6 && mode === 'hardware' && (
                        <IntelligenceCard
                            title={step === 2 ? "Configuration" : step === 3 ? "Geospatial" : step === 4 ? "Network" : "Communication"}
                            subtitle={`Initialization Step ${step - 1} of 4`}
                            className="w-full max-w-3xl animate-scale-in"
                            depth="command"
                            isDarkMode={isDarkMode}
                        >
                            {step === 2 && (
                                <div className="space-y-8 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(detections).map(([key, val]) => (
                                            <button
                                                key={key}
                                                onClick={() => setDetections(prev => ({ ...prev, [key]: !val }))}
                                                className={`p-6 rounded-[2rem] border transition-all flex flex-col items-center gap-4 ${val ? 'bg-nature-medium/10 border-nature-medium/50' : isDarkMode ? 'bg-white/5 border-white/5 opacity-40' : 'bg-nature-deep/5 border-nature-deep/5 opacity-40'}`}
                                            >
                                                {key === 'fire' ? <LegendaryIcon icon={Flame} variant={val ? 'glow' : 'glass'} color="harvest" size={32} /> :
                                                    key === 'animal' ? <LegendaryIcon icon={Activity} variant={val ? 'glow' : 'glass'} color="nature" size={32} /> :
                                                        key === 'intruder' ? <LegendaryIcon icon={Eye} variant={val ? 'glow' : 'glass'} color="trust" size={32} /> :
                                                            <LegendaryIcon icon={Mic} variant={val ? 'glow' : 'glass'} color="nature" size={32} />}
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{key} Analytics</span>
                                            </button>
                                        ))}
                                    </div>
                                    <CommandButton variant="primary" className="w-full py-6" onClick={handleNext} isDarkMode={isDarkMode}>Confirm Parameters</CommandButton>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <button onClick={() => setLocationMode('address')} className={`p-8 rounded-[2rem] border transition-all flex flex-col items-center gap-4 ${locationMode === 'address' ? 'bg-nature-medium/10 border-nature-medium/50' : isDarkMode ? 'bg-white/5 border-white/5 opacity-40' : 'bg-nature-deep/5 border-nature-deep/5 opacity-40'}`}>
                                            <LegendaryIcon icon={MapPin} variant={locationMode === 'address' ? 'neon' : 'glass'} color="nature" size={24} /> <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Manual Grid</span>
                                        </button>
                                        <button onClick={() => { setLocationMode('gps'); fetchGpsLocation(); }} className={`relative p-8 rounded-[2rem] border transition-all flex flex-col items-center gap-4 ${locationMode === 'gps' ? 'bg-nature-medium/10 border-nature-medium/50' : isDarkMode ? 'bg-white/5 border-white/5 opacity-40' : 'bg-nature-deep/5 border-nature-deep/5 opacity-40'}`}>
                                            <LegendaryIcon icon={Target} variant={locationMode === 'gps' ? 'neon' : 'glass'} color="trust" size={24} animation={isLoading && locationMode === 'gps' ? 'ping' : 'none'} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{locationMode === 'gps' && gpsCoords ? gpsCoords : 'Auto GPS'}</span>
                                            {isLoading && locationMode === 'gps' && <div className="absolute inset-x-0 bottom-4 text-[9px] font-mono text-trust-blue animate-pulse">TRIANGULATING...</div>}
                                        </button>
                                    </div>
                                    {locationMode === 'address' && (
                                        <textarea
                                            className={`w-full h-32 p-6 rounded-[2rem] border outline-none font-bold text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-nature-deep/5 border-nature-deep/5 text-nature-deep'}`}
                                            placeholder="Enter grid coordinates..."
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                        />
                                    )}
                                    {locationMode === 'gps' && gpsCoords && (
                                        <div className={`w-full p-8 rounded-[2rem] border text-center space-y-3 transition-all ${isDarkMode ? 'bg-nature-medium/10 border-nature-medium/30' : 'bg-nature-medium/5 border-nature-medium/30 shadow-lg'}`}>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-nature-medium">GEOSPATIAL LOCK CONFIRMED</div>
                                            <div className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{gpsCoords}</div>
                                            {address && address !== gpsCoords && (
                                                <div className={`text-[10px] font-bold opacity-50 mt-2 border-t pt-4 ${isDarkMode ? 'border-white/5' : 'border-nature-deep/5'}`}>
                                                    {address}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <CommandButton variant="primary" className="w-full py-6" onClick={handleNext} isDarkMode={isDarkMode}>Log Location</CommandButton>
                                </div>
                            )}

                            {step === 4 && (
                                <div className="space-y-8 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <StatusBadge type="system" value="FREQUENCY SCAN" status={isScanningWifi ? "active" : "standby"} />
                                            {isScanningWifi && <span className="text-[10px] font-black uppercase text-trust-blue animate-pulse">Scanning...</span>}
                                        </div>
                                        <button
                                            onClick={fetchWifiNetworks}
                                            disabled={isScanningWifi}
                                            className={`p-3 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 border border-white/10 text-trust-blue' : 'bg-nature-deep/5 border border-nature-deep/5 text-nature-medium'}`}
                                        >
                                            <RotateCcw size={20} className={isScanningWifi ? "animate-spin" : ""} />
                                        </button>
                                    </div>

                                    {wifiError && (
                                        <div className="p-5 rounded-[1.5rem] bg-earth-rose/5 border border-earth-rose/20 text-earth-rose text-[10px] font-black uppercase tracking-widest text-center">
                                            {wifiError}
                                        </div>
                                    )}

                                    <div className="space-y-3 max-h-60 overflow-y-auto pr-4 scrollbar-thin">
                                        {wifiNetworks.length > 0 ? (
                                            wifiNetworks.map((net, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setSelectedWifi(net)}
                                                    className={`w-full p-6 rounded-2xl border transition-all flex items-center justify-between ${selectedWifi?.ssid === net.ssid ? 'bg-nature-medium/10 border-nature-medium/40' : isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-nature-deep/5 border-nature-deep/5 hover:border-nature-medium/40'}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <LegendaryIcon icon={Wifi} variant={selectedWifi?.ssid === net.ssid ? 'neon' : 'glass'} color={selectedWifi?.ssid === net.ssid ? 'nature' : 'platinum'} size={20} />
                                                        <span className={`text-[12px] font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{net.ssid}</span>
                                                    </div>
                                                    <span className={`text-[10px] font-black opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{net.signal || '100%'}</span>
                                                </button>
                                            ))
                                        ) : !isScanningWifi && !wifiError ? (
                                            <div className="py-12 text-center space-y-4">
                                                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center opacity-20 ${isDarkMode ? 'bg-white/5' : 'bg-nature-deep/5'}`}>
                                                    <Wifi size={32} />
                                                </div>
                                                <p className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>No networks detected in vicinity</p>
                                            </div>
                                        ) : null}
                                    </div>
                                    <CommandButton
                                        variant="primary"
                                        className="w-full py-6"
                                        onClick={handleNext}
                                        disabled={!selectedWifi || isScanningWifi}
                                        isDarkMode={isDarkMode}
                                    >
                                        {selectedWifi ? 'Secure Uplink' : 'Awaiting Connection'}
                                    </CommandButton>
                                </div>
                            )}

                            {step === 5 && (
                                <div className="space-y-8 py-4">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Primary Email Node</label>
                                            <input className={`w-full p-5 rounded-2xl font-bold ${isDarkMode ? 'bg-white/5 border border-white/10 text-white' : 'bg-nature-deep/5 border border-nature-deep/5 text-nature-deep'}`} type="email" value={contacts[0]} onChange={e => { const n = [...contacts]; n[0] = e.target.value; setContacts(n); }} placeholder="OPERATOR@GROWTH.COM" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>SMS Emergency Override</label>
                                            <input className={`w-full p-5 rounded-2xl font-bold ${isDarkMode ? 'bg-white/5 border border-white/10 text-white' : 'bg-nature-deep/5 border border-nature-deep/5 text-nature-deep'}`} type="tel" value={phoneNumbers[0]} onChange={e => { const n = [...phoneNumbers]; n[0] = e.target.value; setPhoneNumbers(n); }} placeholder="+1 000 000 0000" />
                                        </div>
                                    </div>
                                    <CommandButton variant="intelligence" className="w-full py-8" onClick={() => { setIsMonitoringEnabled(true); handleNext(); }} isDarkMode={isDarkMode}>Activate Tactical Loop</CommandButton>
                                </div>
                            )}
                        </IntelligenceCard>
                    )}

                    {/* Step 6: Live Monitoring Dashboard */}
                    {step === 6 && (
                        <div className={`w-full max-w-6xl space-y-8 ${isFullscreen ? 'h-full flex items-center justify-center p-0' : ''}`} ref={containerRef}>
                            {!isFullscreen && (
                                <div className={`flex flex-wrap items-center justify-between gap-6 p-8 rounded-[3rem] border backdrop-blur-3xl animate-fade-in transition-all duration-700 ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-nature-deep/5 bg-white/40 shadow-xl shadow-nature-deep/5'}`}>
                                    <div className="flex items-center gap-6">
                                        <LegendaryIcon icon={ShieldCheck} variant={isMonitoringEnabled ? 'solid' : 'glass'} color="emerald" size={32} animation={isMonitoringEnabled ? 'pulse' : 'none'} />
                                        <div>
                                            <h3 className={`text-xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Active Sentry</h3>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${isMonitoringEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{isMonitoringEnabled ? 'Neural Processing Active' : 'System Standby'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`text-[10px] font-black tracking-widest opacity-20 uppercase ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Core Load</span>
                                            <div className={`w-32 h-0.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-nature-deep/10'}`}>
                                                <div className="h-full bg-nature-medium" style={{ width: '35%' }} />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsMonitoringEnabled(!isMonitoringEnabled)}
                                            className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${isMonitoringEnabled ? 'bg-nature-deep text-white border border-white/10' : 'bg-nature-medium text-white'}`}
                                        >
                                            {isMonitoringEnabled ? 'Disengage sentry' : 'Engage sentry'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className={`relative overflow-hidden bg-black shadow-2xl ring-1 ring-white/10 ${isFullscreen ? 'w-full h-full' : 'rounded-[3.5rem] aspect-video border-8 border-white/5'}`}>
                                <div className="absolute inset-x-0 top-0 p-8 flex items-start justify-between z-40 pointer-events-none">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2 animate-pulse">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white" /> LIVE LOG
                                            </div>
                                            <div className="bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white/50 text-[9px] font-mono tracking-widest">
                                                SECTOR-ALPHA // NOD-99
                                            </div>
                                        </div>

                                        {(voiceListening || lastTranscript) && (
                                            <div className="bg-[#0F0F0F]/60 backdrop-blur-xl border border-trust-blue/30 p-6 rounded-[2rem] max-w-xs animate-slide-up pointer-events-auto">
                                                <div className="flex items-center gap-2 mb-4 text-trust-blue text-[9px] font-black uppercase tracking-[0.3em]">
                                                    <Radar size={12} className="animate-spin-slow" /> Audio Analysis
                                                </div>
                                                {lastTranscript && <div className="text-white text-base font-bold italic mb-4 opacity-80">"{lastTranscript}"</div>}
                                                {voiceProfile.gender && (
                                                    <div className="flex items-center gap-2 text-[9px] text-trust-blue border-t border-white/5 pt-4 font-black uppercase tracking-widest">
                                                        <Target size={12} /> Target: {voiceProfile.gender} // {voiceProfile.age || 'Adult'}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end gap-3 pointer-events-auto">
                                        <button onClick={toggleFullscreen} className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all">
                                            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                                        </button>
                                        <button onClick={handleReconfigure} className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white/60 hover:text-white transition-all">
                                            <Settings size={22} />
                                        </button>
                                    </div>
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                    <div className="w-64 h-64 border border-trust-blue/50 rounded-full flex items-center justify-center">
                                        <div className="w-1 h-32 bg-trust-blue/50 absolute" />
                                        <div className="h-1 w-32 bg-trust-blue/50 absolute" />
                                    </div>
                                </div>

                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    className="w-full h-full object-cover transition-opacity duration-1000 opacity-70"
                                    videoConstraints={{ facingMode: "user" }}
                                />

                                {activeAlert && (
                                    <div className="absolute inset-0 z-50 flex items-center justify-center p-12 bg-red-900/40 backdrop-blur-sm animate-pulse">
                                        <div className="max-w-xl w-full p-12 rounded-[3.5rem] bg-black border-[4px] border-red-600 shadow-[0_0_100px_rgba(220,38,38,0.6)] text-center space-y-8">
                                            <AlertTriangle size={80} className="text-red-500 mx-auto" />
                                            <div className="space-y-2">
                                                <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Threat Detected</h2>
                                                <p className="text-xl font-bold text-red-500 uppercase tracking-widest">{activeAlert.type}</p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-red-600/10 border border-red-600/20 text-red-500 text-xs font-black uppercase tracking-widest">
                                                Emergency protocol engaged // Contacting response nodes
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute bottom-8 right-8 z-40">
                                    <div className={`p-6 rounded-3xl border backdrop-blur-2xl transition-all ${fireStatus.detected ? 'bg-earth-rose/60 border-harvest-gold shadow-lg' : 'bg-black/60 border-white/10'}`}>
                                        <div className="flex items-center gap-4 mb-3">
                                            <LegendaryIcon icon={Flame} variant={fireStatus.detected ? 'neon' : 'glass'} color={fireStatus.detected ? 'harvest' : 'platinum'} size={20} animation={fireStatus.detected ? 'pulse' : 'none'} />
                                            <div className="text-[10px] font-black uppercase tracking-widest text-white">Ecological Scanning</div>
                                        </div>
                                        <div className="w-48 bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <div className={`h-full transition-all duration-300 ${fireStatus.detected ? 'bg-harvest-gold' : 'bg-nature-medium'}`} style={{ width: `${Math.round(fireStatus.score * 100)}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step >= 2 Deep Inference Mode (Software Loop) */}
                    {step >= 2 && mode === 'software' && (
                        <div className="w-full max-w-4xl animate-fade-in space-y-8">
                            <IntelligenceCard
                                title="Deep Inference Module"
                                subtitle="Static Imagery Analysis"
                                className="w-full"
                                depth="command"
                                isDarkMode={isDarkMode}
                            >
                                <div className="space-y-8 py-8 px-4">
                                    {!uploadedImage ? (
                                        <div className={`relative group overflow-hidden rounded-[3rem] border-2 border-dashed transition-all duration-500 p-16 text-center cursor-pointer ${isDarkMode ? 'bg-white/[0.02] border-white/10 hover:border-nature-medium hover:bg-white/[0.05]' : 'bg-nature-deep/5 border-nature-deep/10 hover:border-nature-medium hover:bg-white shadow-inner'}`}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer z-50"
                                                onChange={handleFileChange}
                                            />
                                            <div className="relative z-10">
                                                <div className={`w-24 h-24 mx-auto mb-8 rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-2xl ${isDarkMode ? 'bg-nature-deep border border-white/10 text-nature-medium' : 'bg-white border border-nature-deep/5 text-nature-medium'}`}>
                                                    <Upload size={40} strokeWidth={1.5} />
                                                </div>
                                                <h3 className={`text-3xl font-black uppercase tracking-tight mb-3 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Neural Upload</h3>
                                                <p className={`text-[12px] font-bold uppercase tracking-[0.2em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Drop tactical imagery to engage quantum engine</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-8 animate-scale-in">
                                            <div className={`relative rounded-[3rem] overflow-hidden border transition-all duration-700 ${isDarkMode ? 'bg-black border-white/10 shadow-2xl shadow-black' : 'bg-nature-deep/5 border-nature-deep/5 shadow-xl shadow-nature-deep/10'}`}>
                                                <img
                                                    ref={imageRef}
                                                    src={uploadedImage}
                                                    alt="Analysis Target"
                                                    className="w-full h-[50vh] object-contain relative z-10"
                                                    crossOrigin="anonymous"
                                                />
                                                {isLoading && (
                                                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-nature-deep/60 backdrop-blur-md">
                                                        <div className="flex flex-col items-center gap-6">
                                                            <div className="relative">
                                                                <div className="w-20 h-20 rounded-full border-4 border-nature-medium/20 border-t-nature-medium animate-spin" />
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <Scan size={32} className="text-nature-light animate-pulse" />
                                                                </div>
                                                            </div>
                                                            <div className="text-nature-light text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Neural Decryption</div>
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => { setUploadedImage(null); setAnalysisResult(null); }}
                                                    className="absolute top-6 right-6 z-50 p-4 bg-black/40 hover:bg-earth-rose rounded-2xl text-white/50 hover:text-white transition-all backdrop-blur-xl border border-white/10"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>

                                            {!analysisResult ? (
                                                <CommandButton
                                                    variant="intelligence"
                                                    className="w-full py-8 text-lg"
                                                    onClick={analyzeImage}
                                                    disabled={!model || isLoading}
                                                    isDarkMode={isDarkMode}
                                                >
                                                    Execute Deep Inference Protocol
                                                </CommandButton>
                                            ) : (
                                                <div className="space-y-8 animate-slide-up">
                                                    <div className="flex items-center justify-between border-b border-black/5 pb-6">
                                                        <StatusBadge type="security" value="NEURAL SCAN COMPLETE" status="active" />
                                                        <div className={`text-[10px] font-black opacity-30 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>BASELINE FIXED // NOD-992</div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {analysisResult.length > 0 ? (
                                                            analysisResult.map((res, i) => (
                                                                <div key={i} className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:border-nature-light shadow-xl' : 'bg-white border-nature-deep/5 hover:border-nature-medium shadow-md shadow-nature-deep/5'}`}>
                                                                    <div className="relative z-10 flex items-center gap-8">
                                                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-2xl ${res.rawClass === 'person' ? 'bg-earth-rose' : 'bg-nature-medium'}`}>
                                                                            {res.rawClass === 'person' ? <AlertTriangle size={36} /> : <Target size={36} />}
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <div className={`text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                                                                                {res.rawClass === 'person' ? 'Security Threat' : 'Biological Entity'}
                                                                            </div>
                                                                            <div className={`text-3xl font-black capitalize tracking-tighter ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{res.label}</div>
                                                                            <div className={`mt-4 w-full h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-nature-deep/10'}`}>
                                                                                <div
                                                                                    className={`h-full transition-all duration-1000 ${res.rawClass === 'person' ? 'bg-earth-rose' : 'bg-nature-medium'}`}
                                                                                    style={{ width: `${res.score}%` }}
                                                                                />
                                                                            </div>
                                                                            <div className={`mt-2 text-[10px] font-black text-right opacity-30 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{res.score}% Confidence Match</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className={`col-span-2 p-16 text-center rounded-[3rem] border flex flex-col items-center gap-6 ${isDarkMode ? 'bg-white/[0.02] border-white/5 text-white' : 'bg-nature-deep/5 border-nature-deep/5 text-nature-deep'}`}>
                                                                <div className="w-20 h-20 rounded-full bg-nature-deep/10 flex items-center justify-center opacity-30">
                                                                    <Activity size={32} />
                                                                </div>
                                                                <h3 className="text-2xl font-black uppercase tracking-tighter">No Biological Signatures</h3>
                                                                <p className="text-[12px] font-bold opacity-40 max-w-sm uppercase tracking-widest">The neural network did not identify any known fauna or security threats in this sector.</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </IntelligenceCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FarmerAlertTwin;

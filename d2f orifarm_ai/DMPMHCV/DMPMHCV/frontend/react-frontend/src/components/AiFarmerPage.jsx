import React, { useState, useEffect } from 'react';
import { Mic, Sprout, Activity, ArrowLeft, Send, Sparkles, Leaf, CloudRain, CircleDollarSign, Bug, Droplets, Volume2, Bot, Cpu, Search, UserCheck, MapPin, ChevronDown } from 'lucide-react';
import AnimeAvatar from './AnimeAvatar';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTTS } from '../hooks/useTTS';
import { TN_LOCATION_DATA } from '../data/tamilnaduLocations';

// Moved Background outside to prevent re-creation on every render
const Background = ({ isDarkMode }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
    {/* Grounded Atmosphere */}
    <div className={`absolute inset-0 transition-opacity duration-1000 ${isDarkMode ? 'bg-[#040D08]' : 'bg-[#FDFCF9]'}`} />

    {/* Subtle Depth Layers */}
    <div className={`absolute top-0 left-0 w-full h-[60vh] opacity-20 transition-all duration-1000 ${isDarkMode ? 'bg-gradient-to-b from-emerald-900/40 to-transparent' : 'bg-gradient-to-b from-emerald-50 to-transparent'}`} />

    {/* Professional Precision Grid - Subtly Integrated */}
    <div className={`absolute inset-0 opacity-[0.03] ${isDarkMode ? 'invert' : ''}`}
      style={{
        backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
        backgroundSize: '120px 120px'
      }}
    />

    {/* Natural Atmospheric Particles */}
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full transition-all duration-[8000ms] ease-in-out`}
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: isDarkMode ? 'rgba(16, 185, 129, 0.4)' : 'rgba(16, 185, 129, 0.2)',
            boxShadow: `0 0 10px ${isDarkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)'}`,
            opacity: Math.random() * 0.4,
            animation: `natural-float ${20 + Math.random() * 20}s infinite linear`
          }}
        />
      ))}
    </div>
  </div>
);

const AiFarmerPage = ({ onBack, language = 'en', isDarkMode = false, selectedDistrict, setSelectedDistrict, selectedTown, setSelectedTown, t }) => {
  const { user } = useAuth();
  const { speak, isSpeaking, cancel } = useTTS(language);

  // Core State
  const [selectedTopic, setSelectedTopic] = useState('general');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [avatarStyle, setAvatarStyle] = useState('robo');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [showDistrictList, setShowDistrictList] = useState(false);
  const [showTownList, setShowTownList] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  // BUMI Interaction State
  const [isPointing, setIsPointing] = useState(false);
  const [interactionSignals, setInteractionSignals] = useState({
    repeatCount: 0,
    lastQuery: '',
    isFrustrated: false // Simple flag for emotion-aware behavior
  });

  const townMapping = TN_LOCATION_DATA;

  // Derive Avatar State
  const getAvatarState = () => {
    if (isSpeaking) return 'speaking';
    if (isLoading) return 'thinking';
    if (isListening) return 'listening';
    return 'idle';
  };

  // Module Explanations (Farmer-Friendly)
  const getModuleExplanation = (topicId) => {
    const explanations = {
      general: {
        en: "I am BUMI, your loyal farming companion. I am here to guide you through every step of your farming journey, from seed to harvest.",
        ta: "நான் பூமி, உங்கள் உண்மையான விவசாயக் கூட்டாளி. விதைப்பது முதல் அறுவடை வரை உங்கள் விவசாயப் பயணத்தின் ஒவ்வொரு அடியிலும் நான் உங்களுக்கு வழிகாட்டுவேன்."
      },
      crops: {
        en: "In the Crop module, I help you select the best varieties for your soil and show you the right way to care for them so they grow healthy.",
        ta: "பயிர் பகுதியில், உங்கள் மண்ணிற்கு ஏற்ற சிறந்த ரகங்களைத் தேர்ந்தெடுக்க நான் உதவுகிறேன், மேலும் அவை ஆரோக்கியமாக வளர சரியான பராமரிப்பு முறைகளை உங்களுக்குக் காட்டுகிறேன்."
      },
      soil: {
        en: "Your soil is your gold. I can explain your soil test results and suggest the exact nutrients your land needs to stay fertile.",
        ta: "உங்கள் மண் உங்கள் தங்கம். உங்கள் மண் பரிசோதனை முடிவுகளை நான் விளக்கி, உங்கள் நிலம் வளமாக இருக்க தேவையான ஊட்டச்சத்துக்களைப் பரிந்துரைக்கிறேன்."
      },
      weather: {
        en: "I watch the sky for you. I will tell you about rain and wind, so you know exactly when to spray or irrigate your fields.",
        ta: "நான் உங்களுக்காக வானத்தைக் கவனிக்கிறேன். மழை மற்றும் காற்றைப் பற்றி நான் உங்களுக்குச் சொல்வேன், எனவே உங்கள் வயல்களுக்கு எப்போது மருந்து தெளிக்க வேண்டும் அல்லது நீர் பாய்ச்ச வேண்டும் என்பதை நீங்கள் சரியாக அறிந்துகொள்வீர்கள்."
      },
      market: {
        en: "Knowing the price is power. I look at local market trends so you can sell your hard work for the best possible price.",
        ta: "விலையைத் தெரிந்துகொள்வது பலம். உள்ளூர் சந்தை நிலவரங்களை நான் கவனிக்கிறேன், எனவே உங்கள் கடின உழைப்பைச் சிறந்த விலைக்கு விற்க நான் உதவுகிறேன்."
      },
      pests: {
        en: "Don't let pests steal your crop. I can identify bugs and diseases, and give you safe, effective ways to protect your farm.",
        ta: "பூச்சிகள் உங்கள் பயிரைத் திருட விடாதீர்கள். பூச்சிகள் மற்றும் நோய்களை என்னால் அடையாளம் காண முடியும், மேலும் உங்கள் பண்ணையைப் பாதுகாக்க பாதுகாப்பான, பயனுள்ள வழிகளை நான் வழங்குகிறேன்."
      },
      irrigation: {
        en: "Water is life. I help you manage your water wisely, showing you simple ways to keep your plants quenched without wasting a drop.",
        ta: "தண்ணீரே உயிர். உங்கள் தண்ணீரை புத்திசாலித்தனமாக நிர்வகிக்க நான் உதவுகிறேன், ஒரு சொட்டு கூட வீணாக்காமல் உங்கள் செடிகளைச் செழிக்க வைக்க எளிய வழிகளைக் காட்டுகிறேன்."
      }
    };
    return explanations[topicId] || explanations.general;
  };

  // Trigger Pointing Animation
  const triggerPointing = () => {
    setIsPointing(true);
    setTimeout(() => setIsPointing(false), 3000);
  };

  // Topics Configuration (Restored)
  const topics = [
    { id: 'general', icon: Sprout, label: language === 'ta' ? 'பொது' : 'General', desc: 'General Advice', color: 'from-emerald-400 to-emerald-600' },
    { id: 'crops', icon: Leaf, label: language === 'ta' ? 'பயிர்கள்' : 'Crops', desc: 'Crop Management', color: 'from-green-400 to-green-600' },
    { id: 'soil', icon: Activity, label: language === 'ta' ? 'மண்' : 'Soil', desc: 'Soil Health', color: 'from-amber-400 to-amber-600' },
    { id: 'weather', icon: CloudRain, label: language === 'ta' ? 'வானிலை' : 'Weather', desc: 'Forecasts', color: 'from-blue-400 to-blue-600' },
    { id: 'market', icon: CircleDollarSign, label: language === 'ta' ? 'சந்தை' : 'Market', desc: 'Prices & Trends', color: 'from-purple-400 to-purple-600' },
    { id: 'pests', icon: Bug, label: language === 'ta' ? 'பூச்சிகள்' : 'Pests', desc: 'Control & Safety', color: 'from-rose-400 to-rose-600' },
    { id: 'irrigation', icon: Droplets, label: language === 'ta' ? 'பாசனம்' : 'Irrigation', desc: 'Water Mgmt', color: 'from-cyan-400 to-cyan-600' }
  ];

  // Speech Recognition Logic
  const startListening = () => {
    try {
      if (!('webkitSpeechRecognition' in window)) {
        alert('Speech recognition is not supported in this browser.');
        return;
      }
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e) => {
        console.error("Speech Recognition Error:", e);
        setIsListening(false);
      };
      recognition.onresult = (event) => {
        try {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          handleInquire(transcript);
        } catch (err) {
          console.error("Error processing speech result:", err);
        }
      };

      recognition.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setIsListening(false);
    }
  };

  const handleInquire = async (overrideQuery = null) => {
    const textToSubmit = (overrideQuery || query).toLowerCase();
    if (!textToSubmit.trim()) return;

    // Emotion-Aware logic: Detect repeated queries
    const isRepeat = textToSubmit === interactionSignals.lastQuery;
    setInteractionSignals(prev => ({
      ...prev,
      lastQuery: textToSubmit,
      repeatCount: isRepeat ? prev.repeatCount + 1 : 0,
      isFrustrated: isRepeat && prev.repeatCount >= 1
    }));

    setIsLoading(true);
    setResponse('');
    if (typeof cancel === 'function') cancel();

    // Trigger Pointing if they mention a module
    if (avatarStyle === 'robo') {
      const moduleKeywords = ['crop', 'soil', 'weather', 'market', 'pest', 'water', 'irrigation', 'பயிர்', 'மண்', 'வானிலை', 'சந்தை', 'பூச்சி', 'தண்ணீர்', 'பாசனம்'];
      if (moduleKeywords.some(k => textToSubmit.includes(k))) {
        triggerPointing();
      }
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/ai-farmer', {
        topic: selectedTopic,
        question: textToSubmit,
        language: language,
        location: `${selectedTown}, ${selectedDistrict}`
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      let answer = res.data.answer || (language === 'ta' ? 'தகவல் பெற முடியவில்லை.' : 'Unable to fetch information.');

      // If information is unavailable, be honest (Trustworthy companion)
      if (answer.includes("not found") || answer.includes("no data")) {
        answer = language === 'ta'
          ? "மன்னிக்கவும், இந்த குறிப்பிட்ட தகவல் என்னிடம் இப்போது இல்லை. நான் இதைப் பற்றி மேலும் தெரிந்துகொள்ள முயற்சிப்பேன்."
          : "I apologize, I don't have this specific information right now. I will try to learn more about this soon.";
      }

      setResponse(answer);

      // Emotion-aware speaking: If frustrated (repeated question), speak slower
      const speakOptions = interactionSignals.isFrustrated ? { rate: 0.8 } : {};
      if (typeof speak === 'function') speak(answer, speakOptions);

    } catch (error) {
      console.error("AI Error:", error);
      if (language === 'ta') {
        setResponse("மன்னிக்கவும், தகவல் பெறுவதில் ஒரு சிறிய தொழில்நுட்ப கோளாறு உள்ளது. உங்கள் டிஜிட்டல் ட்வின் தற்காலிகமாக ஆஃப்லைனில் உள்ளது. தயவுசெய்து சிறிது நேரம் கழித்து முயற்சிக்கவும்.");
      } else {
        setResponse("Apologies, there is a minor technical sync issue. Your Digital Twin is currently recalibrating. Please try again in 1-2 minutes.");
      }
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  // Weather Fetch Logic
  useEffect(() => {
    const fetchWeather = async () => {
      setIsWeatherLoading(true);
      try {
        const res = await axios.get(`/api/weather?location=${selectedTown},${selectedDistrict}`);
        setWeatherData(res.data);
      } catch (err) {
        console.error("Weather Error:", err);
      } finally {
        setIsWeatherLoading(false);
      }
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 mins
    return () => clearInterval(interval);
  }, [selectedTown, selectedDistrict]);

  // AUTO-GREETING ON LOAD
  useEffect(() => {
    const greeting = language === 'ta'
      ? "வணக்கம்! நான் பூமி v2.0. உங்கள் டிஜிட்டல் ட்வின் தயாராக உள்ளது. பாசம் மற்றும் நம்பிக்கையுடன் நான் உங்களுக்கு உதவ இங்கே இருக்கிறேன்."
      : "Hello! I am BUMI v2.0. Your Digital Twin is ready. I am here to assist you with care and trust.";

    const timer = setTimeout(() => {
      speak(greeting);
      if (avatarStyle === 'robo') triggerPointing();
    }, 1500);

    return () => clearTimeout(timer);
  }, [language, speak]);

  // Explanation when topic changes
  useEffect(() => {
    if (selectedTopic !== 'general') {
      const explanation = getModuleExplanation(selectedTopic)[language];
      setResponse(explanation);
      speak(explanation);
      if (avatarStyle === 'robo') triggerPointing();
    }
  }, [selectedTopic, language]);

  const translateCondition = (cond) => {
    if (language !== 'ta') return cond;
    const mapping = {
      'Clear': 'தெளிவான வானம்',
      'Sunny': 'வெயில்',
      'Partly cloudy': 'பகுதி மேகமூட்டம்',
      'Cloudy': 'மேகமூட்டம்',
      'Overcast': 'மிகவும் மேகமூட்டம்',
      'Mist': 'மூடுபனி',
      'Patchy rain possible': 'லேசான மழை வாய்ப்பு',
      'Light rain': 'லேசான மழை',
      'Moderate rain': 'மிதமான மழை',
      'Heavy rain': 'கனமழை',
      'Thundery outbreaks possible': 'இடியுடன் கூடிய மழை வாய்ப்பு'
    };
    return mapping[cond] || cond;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInquire();
    }
  };

  return (
    <div className={`min-h-screen relative flex flex-col font-sans transition-all duration-500 overflow-hidden ${isDarkMode ? 'bg-[#050914] text-white' : 'bg-[#F8FAFC] text-slate-900'}`}>
      <Background isDarkMode={isDarkMode} />

      {/* Refined Advisory Header */}
      <header className={`px-12 py-8 z-[100] flex items-center justify-between backdrop-blur-3xl border-b sticky top-0 transition-all duration-500 ${isDarkMode ? 'bg-[#040D08]/80 border-white/5' : 'bg-white/70 border-slate-200/50'}`}>
        <div className="flex items-center gap-12">
          <button
            onClick={onBack}
            className={`p-4 rounded-3xl transition-all duration-500 group relative ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white/40 hover:text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900'}`}
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1.5 transition-transform duration-500" />
          </button>

          <div className="flex flex-col relative">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf className="text-white" size={24} strokeWidth={2.5} />
              </div>
              <span className={`tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {language === 'ta' ? 'AI விவசாயி' : 'Agri-Advisory Core'}
              </span>
            </h1>
            <div className="flex items-center gap-3 mt-1.5 opacity-40">
              <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-slate-500'}`}>
                {language === 'ta' ? 'இணைக்கப்பட்டுள்ளது' : 'SYSTEM_STABLE_READY'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* DISTRICT SELECTOR */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowDistrictList(!showDistrictList);
                  setShowTownList(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-white border-slate-200 hover:border-emerald-200'}`}
              >
                <MapPin size={14} className="text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest leading-none mt-0.5">
                  {t(`featureHub.districts.${selectedDistrict}`)}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-500 ${showDistrictList ? 'rotate-180' : ''}`} />
              </button>

              {showDistrictList && (
                <div className={`absolute top-full right-0 mt-3 rounded-2xl border backdrop-blur-3xl z-[150] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 w-64 ${isDarkMode ? 'bg-[#0D1611]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
                  <div className="grid grid-cols-1 gap-1 p-2 max-h-72 overflow-y-auto custom-scrollbar-minimal">
                    {Object.keys(townMapping).map(d => (
                      <button
                        key={d}
                        onClick={() => {
                          setSelectedDistrict(d);
                          setSelectedTown(townMapping[d][0]);
                          setShowDistrictList(false);
                        }}
                        className={`px-4 py-3 rounded-xl text-left text-[10px] font-black uppercase tracking-widest transition-colors ${selectedDistrict === d ? 'bg-emerald-500 text-white shadow-lg' : (isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-slate-100 text-slate-600')}`}
                      >
                        {t(`featureHub.districts.${d}`)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* TOWN SELECTOR */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTownList(!showTownList);
                  setShowDistrictList(false);
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-white border-slate-200 hover:border-blue-200'}`}
              >
                <Activity size={14} className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-widest leading-none mt-0.5">
                  {t(`featureHub.towns.${selectedTown}`)}
                </span>
                <ChevronDown size={14} className={`transition-transform duration-500 ${showTownList ? 'rotate-180' : ''}`} />
              </button>

              {showTownList && (
                <div className={`absolute top-full right-0 mt-3 rounded-2xl border backdrop-blur-3xl z-[150] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 w-64 ${isDarkMode ? 'bg-[#0D1611]/80 border-white/10' : 'bg-white/80 border-slate-200'}`}>
                  <div className="grid grid-cols-1 gap-1 p-2 max-h-72 overflow-y-auto custom-scrollbar-minimal">
                    {townMapping[selectedDistrict].map(town => (
                      <button
                        key={town}
                        onClick={() => {
                          setSelectedTown(town);
                          setShowTownList(false);
                        }}
                        className={`px-4 py-3 rounded-xl text-left text-[10px] font-black uppercase tracking-widest transition-colors ${selectedTown === town ? 'bg-blue-500 text-white shadow-lg' : (isDarkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-slate-100 text-slate-600')}`}
                      >
                        {t(`featureHub.towns.${town}`)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* REAL-TIME GOOGLE WEATHER WIDGET */}
          {weatherData && (
            <div className={`hidden md:flex items-center gap-4 lg:gap-6 px-4 lg:px-6 py-2 rounded-[2rem] border backdrop-blur-3xl shadow-2xl transition-all duration-700 hover:scale-105 ${isDarkMode ? 'bg-blue-900/40 border-blue-400/20 shadow-blue-500/10' : 'bg-gradient-to-r from-blue-50 to-white border-blue-100 shadow-blue-200/50'}`}>
              <div className="flex items-center gap-3 lg:gap-4 pr-4 lg:pr-6 border-r border-blue-200/30">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-blue-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <CloudRain className="relative text-blue-500 animate-bounce" size={24} />
                </div>
                <div>
                  <div className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 mb-0.5">
                    {language === 'ta' ? 'கூகுள் வானிலை' : 'GOOGLE WEATHER'}
                  </div>
                  <div className="text-xl lg:text-2xl font-black tracking-tighter flex items-start gap-0.5 text-slate-800 dark:text-blue-50 leading-none">
                    {weatherData.temp}<span className="text-[10px] font-bold text-blue-500 mt-0.5">°C</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 lg:gap-8 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">
                <div className="flex flex-col gap-1 items-center">
                  <div className="px-1.5 py-0.5 rounded bg-blue-100/50 dark:bg-white/5 text-blue-600 dark:text-blue-400 text-[7px]">RAIN</div>
                  <span className="text-slate-800 dark:text-white font-black">{weatherData.rain_chance || 0}%</span>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div className="px-1.5 py-0.5 rounded bg-emerald-100/50 dark:bg-white/5 text-emerald-600 dark:text-emerald-400 text-[7px]">HUMID</div>
                  <span className="text-slate-800 dark:text-white font-black">{weatherData.humidity}%</span>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div className="px-1.5 py-0.5 rounded bg-amber-100/50 dark:bg-white/5 text-amber-600 dark:text-amber-400 text-[7px]">WIND</div>
                  <span className="text-slate-800 dark:text-white font-black">{weatherData.wind}<span className="text-[6px] ml-0.5 opacity-60">KM/H</span></span>
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <div className="px-1.5 py-0.5 rounded bg-blue-100/50 dark:bg-white/5 text-blue-600 dark:text-blue-400 text-[7px]">RANGE</div>
                  <span className="text-slate-800 dark:text-white font-black">{weatherData.temp_min}°-{weatherData.temp_max}°</span>
                </div>
                <div className="hidden lg:flex flex-col gap-1 min-w-[60px]">
                  <div className="text-[7px] opacity-40">CONDITION</div>
                  <span className="text-blue-600 dark:text-blue-300 font-black truncate">{translateCondition(weatherData.condition)}</span>
                </div>
              </div>
            </div>
          )}

          <div className={`hidden md:flex items-center gap-4 px-4 py-2 rounded-full border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'}`}>
            <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>OPERATOR</span>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>{user?.full_name || 'Farmer'}</span>
          </div>
        </div>
      </header>


      <main className="flex-1 relative z-10 flex flex-col items-center justify-start p-6 md:p-10 gap-8 overflow-y-auto custom-scrollbar">

        {/* Welcome / Response Area */}
        <div className="w-full max-w-5xl flex flex-col gap-8 transition-all duration-500">

          {!response && (
            <div className="flex flex-col items-center text-center space-y-12 py-6 animate-in fade-in zoom-in duration-700">
              <div className="relative group cursor-default">
                <AnimeAvatar
                  state={getAvatarState()}
                  isSpeaking={isSpeaking}
                  style={avatarStyle}
                  isDarkMode={isDarkMode}
                  isPointing={isPointing}
                />
              </div>
              <div className="space-y-4 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-emerald-400 to-blue-600 leading-tight">
                  {language === 'ta' ? 'வணக்கம், நான் உங்களுக்கு எப்படி உதவலாம்?' : 'How can I assist you today, Farmer?'}
                </h2>

                {/* Avatar Style Selector */}
                <div className="flex items-center justify-center gap-3 pt-4">
                  {['robo', 'mentor', 'protector', 'helper', 'guardian'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setAvatarStyle(s)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${avatarStyle === s
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg'
                        : (isDarkMode ? 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-400 hover:border-emerald-200')
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Disciplined Module Hub (Topics Grid) */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-12 w-full transition-all duration-700 ${response ? 'opacity-30 blur-[2px] scale-95 hover:opacity-100 hover:blur-none' : ''}`}>
            {topics.map((topic) => {
              const Icon = topic.icon;
              const isSelected = selectedTopic === topic.id;
              return (
                <div key={topic.id} className="relative flex flex-col items-center">
                  <button
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`
                      relative group p-8 rounded-[2rem] border transition-all duration-700 flex flex-col items-center justify-center gap-6 w-full aspect-square
                      ${isSelected
                        ? `bg-[#064e3b] border-emerald-500/50 shadow-2xl shadow-emerald-900/40 z-20`
                        : `${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]' : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'}`
                      }
                    `}
                  >
                    <div className={`
                      p-5 rounded-3xl transition-all duration-500
                      ${isSelected
                        ? 'bg-white/10 text-white'
                        : `${isDarkMode ? 'bg-white/5 text-emerald-500/40' : 'bg-emerald-50 text-emerald-600'}`
                      }
                    `}>
                      <Icon size={32} strokeWidth={1.5} />
                    </div>

                    <div className="text-center">
                      <span className={`block text-xs font-bold uppercase tracking-[0.2em] mb-1.5 ${isSelected ? 'text-white' : (isDarkMode ? 'text-white/40' : 'text-slate-400')}`}>
                        {topic.label}
                      </span>
                      {!response && (
                        <div className={`h-1 w-8 rounded-full transition-all duration-500 mx-auto ${isSelected ? 'bg-emerald-400' : 'bg-transparent'}`} />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Professional Response Module */}
          {response && (
            <div className={`
                    w-full rounded-[3rem] p-10 md:p-16 relative overflow-hidden transition-all duration-700 animate-in fade-in slide-in-from-bottom-12 my-12
                    ${isDarkMode ? 'bg-[#08150D] border border-white/5 shadow-2xl' : 'bg-white border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)]'}
                `}>
              <div className="flex flex-col md:flex-row items-start gap-16">
                <div className="shrink-0 transform translate-y-4">
                  <AnimeAvatar
                    state={getAvatarState()}
                    isSpeaking={isSpeaking}
                    style={avatarStyle}
                    isDarkMode={isDarkMode}
                    isPointing={isPointing}
                  />
                </div>
                <div className="space-y-8 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
                        {language === 'ta' ? 'ஆலோசனை தயார்' : 'ADVISORY_CORE_RESPONSE'}
                      </span>
                    </div>
                  </div>
                  <p className={`text-xl md:text-2xl leading-relaxed font-medium whitespace-pre-wrap ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                    {response}
                  </p>

                  <div className="flex items-center gap-6 pt-6 opacity-30">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-emerald-500 to-transparent" />
                    <span className="text-[8px] font-bold uppercase tracking-[0.5em]">Farmer Trust Interface</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="w-full flex flex-col items-center justify-center py-12 gap-6 animate-pulse">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-2 border-emerald-500/20 animate-ping" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="text-emerald-500 animate-spin-slow" size={32} />
                </div>
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-500">
                {language === 'ta' ? 'தரவு செயலாக்கப்படுகிறது...' : 'PROCESSING_NEURAL_DATA...'}
              </span>
            </div>
          )}

        </div>

        {/* Unified Advisory Input Portal */}
        <div className="mt-24 mb-12 w-full max-w-5xl sticky bottom-10 z-[250] px-8">
          <div className={`
              relative p-2 md:p-3 rounded-[4rem] border transition-all duration-1000
              ${isDarkMode
              ? 'bg-[#0A1810]/95 border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.6)]'
              : 'bg-white/95 border-slate-200 shadow-[0_30px_60px_rgba(0,0,0,0.05)]'
            }
            `}>

            <div className="relative flex items-center gap-8 px-6">
              <div className="flex-1 flex items-center gap-10">
                <div className="relative p-2 opacity-50">
                  <Search size={22} className={isDarkMode ? 'text-emerald-500' : 'text-slate-400'} />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={language === 'ta' ? 'AI இடம் கேளுங்கள்...' : 'Enter your question for the advisor...'}
                  className={`flex-1 bg-transparent border-none focus:ring-0 text-2xl py-8 placeholder:font-medium placeholder:text-slate-300 ${isDarkMode ? 'text-white placeholder:text-white/10' : 'text-slate-800'}`}
                />
              </div>

              <div className="flex items-center gap-5">
                <button
                  onClick={startListening}
                  className={`
                      p-6 rounded-full transition-all duration-500 relative
                      ${isListening
                      ? 'bg-red-500 text-white'
                      : (isDarkMode ? 'bg-white/5 text-emerald-500 hover:bg-white/10' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600')
                    }
                    `}
                >
                  {isListening ? <Volume2 size={28} className="animate-pulse" /> : <Mic size={28} />}
                </button>

                <button
                  onClick={() => handleInquire()}
                  disabled={!query.trim() || isLoading}
                  className={`
                      p-6 rounded-3xl flex items-center justify-center transition-all duration-700
                      ${!query.trim() || isLoading
                      ? 'bg-transparent text-slate-200 cursor-not-allowed border border-slate-100'
                      : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-xl shadow-emerald-900/20 active:scale-95'
                    }
                    `}
                >
                  {isLoading ? <Cpu size={28} className="animate-spin" /> : <Send size={28} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <div className={`px-8 py-2 rounded-full border transition-all duration-1000 ${isDarkMode ? 'bg-white/5 border-white/5 text-white/20' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <span className="text-[9px] font-bold uppercase tracking-[0.6em]">Professional Agriculture Advisory v7.0</span>
            </div>
          </div>
        </div>

        <style>{`
            @keyframes natural-float {
                0% { transform: translateY(0) translateX(0); }
                33% { transform: translateY(-30px) translateX(20px); }
                66% { transform: translateY(10px) translateX(-10px); }
                100% { transform: translateY(0) translateX(0); }
            }
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16, 185, 129, 0.1); border-radius: 10px; }
        `}</style>

      </main>
    </div>
  );
};

export default AiFarmerPage;

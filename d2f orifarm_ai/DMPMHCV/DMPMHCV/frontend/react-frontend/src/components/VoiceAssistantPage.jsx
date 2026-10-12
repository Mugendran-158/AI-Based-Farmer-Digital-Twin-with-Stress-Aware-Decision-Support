import React, { useState, useEffect, useRef } from 'react'
import BackButton from './BackButton'
import {
  Sun, Moon, Languages, Square, Mic, Brain, Sparkles, Bot, RefreshCw,
  Wind, Droplets, Thermometer, CloudRain, Zap, Activity, Radio, Signal,
  Volume2, MicOff, Command, Cpu, Waves, ShieldAlert, Workflow, ArrowRight
} from 'lucide-react'
import AudioWaveform from './AudioWaveform'
import IntelligenceCard from './legendary/IntelligenceCard'
import StatusBadge from './legendary/StatusBadge'
import CommandButton from './legendary/CommandButton'
import LegendaryIcon from './legendary/LegendaryIcon'

const VoiceAssistantPage = ({ onBack, isDarkMode: globalIsDarkMode }) => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const recognitionRef = useRef(null)

  // Audio Visualizer State
  const [audioStream, setAudioStream] = useState(null)

  // Theme State synchronized with global theme
  const [isDarkMode, setIsDarkMode] = useState(globalIsDarkMode ?? true)

  useEffect(() => {
    setIsDarkMode(globalIsDarkMode ?? true)
  }, [globalIsDarkMode])

  // Save theme preference and notify application
  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('appTheme', newMode ? 'dark' : 'light')
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newMode ? 'dark' : 'light' }))
  }

  // Missing State Variables
  const [weatherData, setWeatherData] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [location, setLocation] = useState(null)
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Language Dropdown State
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langDropdownRef = useRef(null)

  // Language configurations
  const languages = [
    { code: 'en', name: 'English (US)', speechCode: 'en-IN', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी (Hindi)', speechCode: 'hi-IN', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', speechCode: 'ta-IN', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు (Telugu)', speechCode: 'te-IN', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', speechCode: 'kn-IN', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം (Malayalam)', speechCode: 'ml-IN', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو (Urdu)', speechCode: 'ur-IN', flag: '🇮🇳' },
    { code: 'ja', name: '日本語 (Japanese)', speechCode: 'ja-JP', flag: '🇯🇵' }
  ]

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setVoiceSupported(false)
      setErrorMessage('Speech recognition is not supported in this browser.')
      return
    }
    initializeSpeechRecognition()
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop()
      if (audioStream) audioStream.getTracks().forEach(track => track.stop())
      stopSpeaking()
    }
  }, [selectedLanguage])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) setIsLangOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initializeSpeechRecognition = () => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      const recognition = recognitionRef.current
      recognition.continuous = false
      recognition.interimResults = true
      const currentLang = languages.find(l => l.code === selectedLanguage)
      recognition.lang = currentLang ? currentLang.speechCode : 'en-US'
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
        setIsListening(true)
        setErrorMessage('')
      }
      recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript
        setTranscript(result)
        if (event.results[event.results.length - 1].isFinal) handleVoiceCommand(result.trim())
      }
      recognition.onend = () => setIsListening(false)
      recognition.onerror = (event) => {
        setIsListening(false)
        console.error('Speech error:', event.error)
      }
    } catch (error) {
      setVoiceSupported(false)
    }
  }

  const startListening = async () => {
    if (!voiceSupported) return
    if (isListening) {
      stopListening()
      return
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setTranscript('')
        setResponse('')
      } catch (err) {
        console.error("Failed to start recognition:", err)
      }
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setAudioStream(stream)
    } catch (err) {
      console.warn("Visualizer micro fail:", err)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop()
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop())
      setAudioStream(null)
    }
    setIsListening(false)
  }

  const fetchWeather = async () => {
    setLoadingWeather(true)
    if (!navigator.geolocation) {
      setLoadingWeather(false)
      return
    }
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lon: longitude })
        const [weatherRes, forecastRes] = await Promise.all([
          fetch(`http://127.0.0.1:5000/api/weather/current?lat=${latitude}&lon=${longitude}`),
          fetch(`http://127.0.0.1:5000/api/weather/forecast?lat=${latitude}&lon=${longitude}`)
        ])
        if (weatherRes.ok) setWeatherData(await weatherRes.json())
        if (forecastRes.ok) setForecast(await forecastRes.json())
      } catch (error) {
        console.error('Weather error:', error)
      } finally {
        setLoadingWeather(false)
      }
    }, () => setLoadingWeather(false))
  }

  const handleVoiceCommand = async (command) => {
    setIsProcessing(true)
    const weatherKeywords = ['weather', 'rain', 'temperature', 'forecast', 'climate', 'hot', 'cold', 'sunny', 'cloudy', 'storm', 'wind']
    const isWeatherQuery = weatherKeywords.some(k => command.toLowerCase().includes(k))
    try {
      let endpoint = '/api/ask-twin'
      let body = { doubt: command, context: 'Voice command', language: selectedLanguage }
      if (isWeatherQuery && weatherData) {
        endpoint = '/api/weather/advice'
        body = { question: command, location, weather_data: weatherData, forecast, language: selectedLanguage }
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      const answer = data.answer || data.advice || "I didn't catch that."
      setResponse(answer)
      speakResponse(answer)
    } catch (e) {
      setResponse("Connection error. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const speakResponse = (text) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const currentLang = languages.find(l => l.code === selectedLanguage)
    utterance.lang = currentLang ? currentLang.speechCode : 'en-IN'
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${isDarkMode ? 'bg-[#050505]' : 'bg-slate-50'}`}>

      {/* Platinum Header (Command Grade) */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-50 flex items-center justify-between">
        <BackButton onClick={onBack} />

        <div className="flex items-center gap-6">
          <StatusBadge type="security" value="BIOMETRIC" status="active" />

          <button
            onClick={toggleTheme}
            className={`p-3 rounded-2xl border transition-all duration-500 ${isDarkMode
              ? 'bg-white/5 border-white/5 text-white/40 hover:text-white'
              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900 shadow-sm'
              }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Architecture Selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-300 ${isLangOpen
                ? isDarkMode ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-700 text-white'
                : isDarkMode ? 'bg-white/5 border-white/5 text-white/80' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}
            >
              <Languages size={14} />
              <span className="text-xl">{languages.find(l => l.code === selectedLanguage)?.flag}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{languages.find(l => l.code === selectedLanguage)?.name}</span>
            </button>

            {isLangOpen && (
              <div className={`absolute top-full right-0 mt-3 w-64 p-3 rounded-[2rem] border shadow-2xl backdrop-blur-3xl animate-scale-in z-[100] ${isDarkMode ? 'bg-[#0F0F0F]/95 border-white/10' : 'bg-white/95 border-slate-200'}`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setSelectedLanguage(lang.code); setIsLangOpen(false) }}
                    className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all ${selectedLanguage === lang.code
                      ? isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-50 text-emerald-700'
                      : isDarkMode ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-50 text-slate-600'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-xs font-black uppercase tracking-tight">{lang.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Neural Mission Control (Left) */}
          <div className="lg:col-span-7 space-y-8">
            <IntelligenceCard
              title="Mission Control"
              subtitle="Neural Voice Interface (HMI v5.0)"
              depth="command"
              glow={true}
              className="min-h-[600px] flex flex-col items-center justify-center text-center p-12"
              isDarkMode={isDarkMode}
            >
              <div className="absolute top-8 left-12 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Frequency Protocol Active</span>
              </div>

              {/* Central Neural Core (Legendary Orb) */}
              <div className="relative mb-20">
                <div className="relative flex items-center justify-center">
                  {isListening && (
                    <div className="absolute w-[400px] h-[400px] rounded-full border border-indigo-500/10 animate-[ping_4s_linear_infinite]" />
                  )}
                  <div className={`absolute w-[300px] h-[300px] rounded-full border border-indigo-500/20 ${isListening ? 'animate-spin-slow' : ''}`} />

                  <button
                    onClick={startListening}
                    className={`relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-700 z-10 group overflow-hidden ${isListening
                      ? 'bg-rose-600 shadow-[0_0_80px_rgba(225,29,72,0.4)]'
                      : isDarkMode
                        ? 'bg-indigo-600 shadow-[0_30px_60px_rgba(79,70,229,0.3)]'
                        : 'bg-emerald-600 shadow-[0_30px_60px_rgba(5,150,105,0.3)]'
                      }`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <LegendaryIcon
                      icon={isListening ? Square : Mic}
                      variant="neon"
                      color="platinum"
                      size={48}
                      className="relative z-10 transition-transform duration-500 group-hover:scale-110 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 border-[6px] border-white/20 border-t-white rounded-full animate-spin" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4 max-w-md mx-auto">
                <h2 className={`text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {isListening ? "Listening to Signal..." : isProcessing ? "De-encrypting Signal..." : "Voice Command Interface"}
                </h2>
                <p className={`text-sm font-bold uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isListening ? "Maintain vocal clarity for neural matching" : "Tap central core to initialize link"}
                </p>
              </div>

              {/* Real-time Frequency Visualization */}
              <div className="mt-16 w-full max-w-sm h-16">
                {isListening ? (
                  <AudioWaveform audioStream={audioStream} isRecording={isListening} />
                ) : (
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={`w-1 h-3 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-slate-200'}`} />
                    ))}
                  </div>
                )}
              </div>
            </IntelligenceCard>

            {/* Neural Chat Stream */}
            {(transcript || response) && (
              <div className="space-y-8 animate-slide-up">
                {transcript && (
                  <div className="flex justify-end pr-4">
                    <div className={`p-8 rounded-[2.5rem] rounded-tr-none border max-w-[85%] ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-xl'}`}>
                      <p className={`text-xl font-bold italic ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{transcript}</p>
                    </div>
                  </div>
                )}

                {response && (
                  <IntelligenceCard
                    title="AI Response"
                    subtitle="Neural Synthesis Result"
                    className="relative overflow-hidden"
                    isDarkMode={isDarkMode}
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                    <div className="flex items-center justify-between mb-6">
                      <StatusBadge type="intelligence" value="VERIFIED" status="active" />
                      {isSpeaking && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Audio Synthesis Active</span>
                          <button onClick={stopSpeaking} className="p-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20">
                            <MicOff size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className={`text-2xl font-black leading-relaxed ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{response}</p>
                  </IntelligenceCard>
                )}
              </div>
            )}
          </div>

          {/* Environmental Telemetry (Right) */}
          <div className="lg:col-span-5 space-y-8">
            <IntelligenceCard
              title="Environmental Data"
              subtitle="Real-time Climate Telemetry"
              depth="surface"
              isDarkMode={isDarkMode}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-indigo-500">
                    <LegendaryIcon icon={CloudRain} variant="neon" color="indigo" size={16} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Atmospheric Status</span>
                  </div>
                  {weatherData ? (
                    <div className={`text-7xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {weatherData.temperature}°C
                    </div>
                  ) : (
                    <div className={`text-7xl font-black tracking-tight opacity-20 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>--°C</div>
                  )}
                </div>
                <button onClick={fetchWeather} className={`rounded-2xl transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'}`}>
                  <LegendaryIcon icon={RefreshCw} variant="glass" color="platinum" size={24} animation={loadingWeather ? 'spin' : 'none'} />
                </button>
              </div>

              {weatherData && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Humidity Matrix</div>
                    <div className="flex items-center gap-2 text-2xl font-black">
                      <LegendaryIcon icon={Droplets} variant="neon" color="blue" size={20} />
                      {weatherData.humidity}%
                    </div>
                  </div>
                  <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Wind Velocity</div>
                    <div className="flex items-center gap-2 text-2xl font-black">
                      <LegendaryIcon icon={Wind} variant="neon" color="cyan" size={20} />
                      {weatherData.wind_speed}
                    </div>
                  </div>
                </div>
              )}

              <CommandButton
                variant={weatherData ? 'outline' : 'intelligence'}
                icon={Radio}
                className="w-full py-6"
                onClick={fetchWeather}
                isDarkMode={isDarkMode}
              >
                {weatherData ? 'Recalibrate Multi-Sensors' : 'Initialize Environmental Link'}
              </CommandButton>
            </IntelligenceCard>

            <IntelligenceCard
              title="Neural Context"
              subtitle="Predictive Command Suggestions"
              depth="surface"
              isDarkMode={isDarkMode}
            >
              <div className="space-y-3">
                {[
                  { text: "Analyze crop maturation cycles.", icon: <Sun /> },
                  { text: "Detect biological pathogens in sector 4.", icon: <Activity /> },
                  { text: "Optimize soil nitrogen levels.", icon: <Zap /> },
                  { text: "Project monsoon impact on yield.", icon: <Waves /> }
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleVoiceCommand(item.text)}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 group ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl'
                      }`}
                  >
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>
                      {item.text}
                    </span>
                    <ArrowRight size={16} className={`transition-all duration-500 group-hover:translate-x-2 ${isDarkMode ? 'text-indigo-400' : 'text-emerald-600'}`} />
                  </button>
                ))}
              </div>
            </IntelligenceCard>
          </div>

        </div>
      </div>
    </div>
  )
}

export default VoiceAssistantPage

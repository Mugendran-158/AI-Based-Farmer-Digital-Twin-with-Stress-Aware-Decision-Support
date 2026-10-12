import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import TwinStatus from './components/TwinStatus'
import DecisionSelection from './components/DecisionSelection'
import AdvisoryCard from './components/AdvisoryCard'
import TwinDoubtCard from './components/TwinDoubtCard'
import StressOverlay from './components/StressOverlay'
import CropAnalyzerPage from './components/CropAnalyzerPage'
import SmartAgricultureWorldPage from './components/SmartAgricultureWorldPage'
import TwinIntelligencePage from './components/TwinIntelligencePage'
import VoiceAssistantPage from './components/VoiceAssistantPage'
import VerifyPage from './components/VerifyPage'
import AiFarmerPage from './components/AiFarmerPage'
import WhatIfFutureView from './components/WhatIfFutureView'
import MarketPrices from './components/MarketPrices'
import Navigation from './components/Navigation'
import { translations } from './utils/translations'
// Authentication Imports
import { AuthProvider, useAuth } from './context/AuthContext'
import { MobileViewProvider, useMobileView } from './context/MobileViewContext'
import PrivateRoute from './components/PrivateRoute'
import AppLayout from './components/AppLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import SecuritySettings from './pages/SecuritySettings'
import SmartAgricultureWorld from './components/SmartAgricultureWorld'
import FarmerAlertTwin from './components/FarmerAlertTwin'
import FarmerIntelligenceHub from './components/FarmerIntelligenceHub'
import { ShieldCheck, Activity, Mic } from 'lucide-react'
import VoiceSecurityChallenge from './components/VoiceSecurityChallenge'
import FarmerAuth from './pages/FarmerAuth';
import FaceVerification from './pages/FaceVerification';
import IntelligenceHub from './components/IntelligenceHub';
import AgriFeatureHub from './components/AgriFeatureHub';
import AgriVoiceTrigger from './components/AgriVoiceTrigger';

function AppContent() {
  const navigate = useNavigate()
  const [language, setLanguage] = useState('en')

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('appTheme')
    return saved ? saved === 'dark' : false
  })

  // Sync theme
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('appTheme')
      if (saved) {
        setIsDarkMode(saved === 'dark')
      }
    }

    // Custom event listener for same-tab updates form Header
    const handleCustomThemeChange = (e) => {
      setIsDarkMode(e.detail === 'dark')
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('themeChange', handleCustomThemeChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('themeChange', handleCustomThemeChange)
    }
  }, [])

  // Apply theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('appTheme', newMode ? 'dark' : 'light')
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newMode ? 'dark' : 'light' }))
  }

  // Use Auth Context
  const { user, logout } = useAuth()

  const [emotionalState, setEmotionalState] = useState({
    emotion: '-',
    confidence: 'Medium',
    evidence: '',
    stressLevel: 'Low',
    decisionReadiness: 'Stable',
    confidenceTrend: 'Stable'
  })
  const [selectedDistrict, setSelectedDistrict] = useState('salem')
  const [selectedTown, setSelectedTown] = useState('attur')
  const [currentView, setCurrentView] = useState('main') // 'main', 'advisory', 'doubt', 'stress', 'whatif'
  const [advisoryText, setAdvisoryText] = useState('')
  const [twinAnswer, setTwinAnswer] = useState('')
  const [twinEmotionData, setTwinEmotionData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [whatIfData, setWhatIfData] = useState({ decision: '', context: '' })

  // Responsible Intelligence States
  const [decisionReadiness, setDecisionReadiness] = useState('Stable')
  const [interactionMetrics, setInteractionMetrics] = useState({ clickCount: 0, lastClickTime: Date.now() })
  const [pendingDecision, setPendingDecision] = useState(null) // { action, context } for Review Step
  const [showVoiceChallenge, setShowVoiceChallenge] = useState(false)

  const handleVoiceVerify = () => {
    setShowVoiceChallenge(false)
    if (pendingDecision) {
      handleDecision(pendingDecision.action, true)
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    if (value) return value

    // Fallback to English
    value = translations.en
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  // Handle Initial Mood Check-in from Login
  useEffect(() => {
    if (user) {
      const tempMood = localStorage.getItem('tempMood')
      if (tempMood) {
        // Map simple mood to emotional state
        let emotion = 'Calm'
        let stress = 'Low'

        switch (tempMood) {
          case 'good':
            emotion = 'Happy'
            stress = 'Low'
            break
          case 'tense':
            emotion = 'Stressed'
            stress = 'Moderate'
            break
          case 'tough':
            emotion = 'Sad'
            stress = 'Moderate'
            break
          default:
            break
        }

        setEmotionalState(prev => ({
          ...prev,
          emotion: emotion,
          stressLevel: stress,
          evidence: 'Self-reported during login check-in'
        }))

        // Clear it so it doesn't persist forever
        localStorage.removeItem('tempMood')
      }
    }
  }, [user])

  // Reset click count after 15s of inactivity in the burst window
  useEffect(() => {
    const timer = setTimeout(() => {
      setInteractionMetrics(prev => ({ ...prev, clickCount: 0 }))
      setDecisionReadiness('Stable')
    }, 15000)
    return () => clearTimeout(timer)
  }, [interactionMetrics.clickCount])

  const handleDecision = async (action, isBypass = false) => {
    // 1. Calculate Interaction Signals
    const now = Date.now()
    const timeDelta = now - interactionMetrics.lastClickTime
    const newClickCount = interactionMetrics.clickCount + 1

    // Low Readiness = >3 decisions in 15s or <3s between decisions
    const isRapid = timeDelta < 3000 || newClickCount > 3
    setDecisionReadiness(isRapid ? 'Low - Suggested to pause' : 'Stable')
    setInteractionMetrics({ clickCount: newClickCount, lastClickTime: now })

    // 2. Intercept High-Impact Decisions for Review Step
    const isHighImpact = action === 'sell' || action === 'invest'
    if (!isBypass && isHighImpact && (isRapid || decisionReadiness === 'Low - Suggested to pause')) { // Check decisionReadiness directly
      setPendingDecision({ action, context: action === 'sell' ? 'The farmer wants to sell crops now' : 'The farmer wants to buy fertilizer/inputs' })
      setCurrentView('review')
      return
    }

    // Original Decision Logic (Consensus: Proceed to AI)
    setIsLoading(true)
    setPendingDecision(null) // Clear intercept state

    try {
      // Analyze emotion first
      const emotionResponse = await axios.post('/api/analyze-emotion', {
        text: `I want to ${action}`,
        language: language
      })

      const emotionData = emotionResponse.data
      setEmotionalState(emotionData)

      // Check for high stress
      if (emotionData.stress_level === 'High' || emotionData.emotion === 'Stressed' || emotionData.emotion === 'மன அழுத்தம்') {
        setCurrentView('stress')
        setIsLoading(false)
        return
      }

      // Get advisory based on decision
      let context = ''
      switch (action) {
        case 'sell':
          context = 'The farmer wants to sell crops now'
          break
        case 'invest':
          context = 'The farmer wants to buy fertilizer/inputs'
          break
        case 'wait':
          context = 'The farmer wants to wait and observe'
          break
        default:
          context = 'The farmer is making a decision'
      }

      const advisoryResponse = await axios.post('/api/ask-twin', {
        doubt: `Should I ${action}?`,
        context: action === 'sell' ? 'The farmer wants to sell crops now' : 'The farmer is considering operations',
        language: language
      })

      const advisoryData = advisoryResponse.data
      setAdvisoryText(advisoryData.answer)
      setCurrentView('advisory')
    } catch (error) {
      console.error('Error:', error)
      setAdvisoryText('Sorry, there was an error connecting to the server. Please try again.')
      setCurrentView('advisory')
    }

    setIsLoading(false)
  }

  const handleAskTwin = async (doubt, voiceFeatures = null) => {
    setIsLoading(true)

    try {
      // If voice features provided, analyze voice emotion first
      if (voiceFeatures) {
        const voiceEmotionResponse = await axios.post('/api/analyze-voice-emotion', {
          text: doubt,
          voice_features: voiceFeatures,
          language: language
        })

        const emotionData = voiceEmotionResponse.data
        setEmotionalState(emotionData)

        // Check for high stress from voice analysis
        if (emotionData.stress_level === 'High' || emotionData.emotion === 'Stressed' || emotionData.emotion === 'மன அழுத்தம்') {
          setCurrentView('stress')
          setIsLoading(false)
          return
        }
      }

      // Continue with regular ask-twin API call
      const response = await axios.post('/api/ask-twin', {
        doubt: doubt,
        context: 'Farmer asking for advice',
        language: language
      })

      const data = response.data
      setTwinAnswer(data.answer)
      setTwinEmotionData(data)
    } catch (error) {
      console.error('Error:', error)
      setTwinAnswer('Sorry, there was an error. Please try again.')
    }

    setIsLoading(false)
  }


  const handleWhatIfView = (decision) => {
    // Prepare context for What-If view
    let context = ''
    let decisionText = ''

    switch (decision) {
      case 'sell':
        decisionText = 'sell crops now'
        context = 'The farmer wants to sell crops now. Current market conditions and crop readiness should be considered.'
        break
      case 'invest':
        decisionText = 'buy fertilizer/inputs'
        context = 'The farmer wants to buy fertilizer or inputs. Financial situation and crop needs should be considered.'
        break
      case 'wait':
        decisionText = 'wait and observe'
        context = 'The farmer wants to wait and observe. Market trends and weather patterns should be considered.'
        break
      default:
        decisionText = 'make a decision'
        context = 'The farmer is considering their options.'
    }

    setWhatIfData({ decision: decisionText, context: context })
    setCurrentView('whatif')
  }

  const handleWhatIfContinue = async (decision) => {
    // After viewing What-If, continue with the original decision flow
    setCurrentView('main')
    // Optionally trigger the original decision handler
    await handleDecision(decision)
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'whatif':
        return (
          <WhatIfFutureView
            decision={whatIfData.decision}
            context={whatIfData.context}
            language={language}
            stressLevel={emotionalState.stressLevel || emotionalState.stress_level || 'Low'}
            onBack={() => setCurrentView('main')}
            onContinue={() => handleWhatIfContinue(whatIfData.decision.split(' ')[0])}
            t={t}
            isDarkMode={isDarkMode}
          />
        )
      case 'advisory':
        return (
          <AdvisoryCard
            text={advisoryText}
            onConfirm={() => setCurrentView('main')}
            onAskMore={() => setCurrentView('doubt')}
            t={t}
            isDarkMode={isDarkMode}
          />
        )
      case 'doubt':
        return (
          <TwinDoubtCard
            onAsk={handleAskTwin}
            answer={twinAnswer}
            emotionData={twinEmotionData}
            isLoading={isLoading}
            onBack={() => setCurrentView('main')}
            t={t}
            language={language}
            isDarkMode={isDarkMode}
          />
        )
      case 'stress':
        return (
          <StressOverlay
            onContinue={() => setCurrentView('main')}
            t={t}
            isDarkMode={isDarkMode}
          />
        )
      case 'review':
        return (
          <div className="mx-4 mb-10">
            <div className={`p-8 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-700 shadow-2xl ${isDarkMode ? 'bg-nature-deep/40 border-white/5 shadow-black/40' : 'bg-white/40 border-nature-deep/5 shadow-nature-deep/10'}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-harvest-gold/10' : 'bg-harvest-gold/5'}`}>
                  <ShieldCheck className={`w-8 h-8 ${isDarkMode ? 'text-harvest-gold' : 'text-harvest-gold'}`} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className={`text-xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                    Review <span className="opacity-40">Decision</span>
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-nature-medium animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-nature-medium">Safeguard Active</span>
                  </div>
                </div>
              </div>

              <p className={`text-sm font-bold leading-relaxed mb-10 opacity-70 ${isDarkMode ? 'text-white/80' : 'text-nature-deep/80'}`}>
                {t('highImpactWarning') || 'This is a major decision. Please review carefully.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleWhatIfView(pendingDecision.action)}
                  className="flex-1 px-8 py-4 bg-nature-medium hover:bg-nature-deep text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl hover:shadow-nature-medium/20 flex items-center justify-center gap-3 active:scale-95"
                >
                  <Activity size={18} strokeWidth={2.5} />
                  {t('reviewOptions') || 'View Impact'}
                </button>
                <button
                  onClick={() => {
                    if (user?.has_voice_id) {
                      setShowVoiceChallenge(true);
                    } else {
                      handleDecision(pendingDecision.action, true);
                    }
                  }}
                  className={`flex-1 px-8 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white' : 'bg-transparent border-nature-deep/10 text-nature-deep/60 hover:bg-nature-deep/5 hover:text-nature-deep'}`}
                >
                  {user?.has_voice_id ? (
                    <div className="flex items-center justify-center gap-3">
                      <Mic size={18} strokeWidth={2.5} />
                      {t('verifyWithVoice') || 'Verify Voice'}
                    </div>
                  ) : t('continueAnyway') || "Continue Anyway"}
                </button>
              </div>
              <button
                onClick={() => {
                  setPendingDecision(null);
                  setCurrentView('main');
                }}
                className={`w-full mt-8 text-[9px] font-black uppercase tracking-[0.4em] transition-colors py-2 border-t border-transparent hover:border-nature-deep/5 ${isDarkMode ? 'text-white/30 hover:text-white/60' : 'text-nature-deep/30 hover:text-nature-deep/60'}`}
              >
                {t('cancelAndGoBack') || 'Cancel'}
              </button>
            </div>
          </div>
        )
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <AgriFeatureHub
              t={t}
              language={language}
              isDarkMode={isDarkMode}
              onAskDoubt={() => setCurrentView('doubt')}
              onEnterWorld={() => navigate('/world')}
              isLoading={isLoading}
            />

            <AgriVoiceTrigger
              t={t}
              language={language}
              isDarkMode={isDarkMode}
            />
          </div>
        )
    }
  }

  const { mysteriousMode, worldMode, seaMode, monsoonMode, activeTheme } = useMobileView()
  const isSpecialMode = mysteriousMode || worldMode || seaMode || monsoonMode

  return (
    <div className={`min-h-screen pt-24 transition-all duration-700 antialiased ${isSpecialMode ? 'bg-transparent' : (isDarkMode ? 'bg-[#0B1120] text-slate-200' : 'bg-slate-50 text-slate-900')}`}>
      {showVoiceChallenge && (
        <VoiceSecurityChallenge
          actionName={pendingDecision?.action || "this action"}
          onVerify={handleVoiceVerify}
          onCancel={() => setShowVoiceChallenge(false)}
          isDarkMode={isDarkMode}
        />
      )}
      <style>{`
        ${isDarkMode ? `
          ::selection { background: #334155; color: #f8fafc; }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #020617; }
          ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #334155; }
          
          /* Enterprise Readability Refinements */
          h1, h2, h3, h4 { color: #f1f5f9 !important; letter-spacing: -0.01em; }
          strong { color: #f8fafc; }
          button { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
        ` : ''}
      `}</style>
      <Header
        t={t}
        user={user}
        onLogout={logout}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={setLanguage}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login isDarkMode={isDarkMode} language={language} />} />
        <Route path="/register" element={<Register isDarkMode={isDarkMode} language={language} />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={
            <div className="pb-8">
              {renderCurrentView()}
            </div>
          } />
          <Route path="/ai-farmer" element={
            <AiFarmerPage onBack={() => navigate('/')} language={language} t={t} isDarkMode={isDarkMode} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} selectedTown={selectedTown} setSelectedTown={setSelectedTown} />
          } />
          <Route path="/ai-farmer-simple" element={<AiFarmerPage onBack={() => navigate('/')} language={language} t={t} minimal={true} isDarkMode={isDarkMode} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} selectedTown={selectedTown} setSelectedTown={setSelectedTown} />} />
          <Route path="/crop-analyzer" element={<CropAnalyzerPage onBack={() => navigate('/')} isDarkMode={isDarkMode} />} />
          <Route path="/smart-agriculture" element={<SmartAgricultureWorldPage onBack={() => navigate('/')} isDarkMode={isDarkMode} />} />
          <Route path="/twin-intelligence" element={<TwinIntelligencePage onBack={() => navigate('/')} isDarkMode={isDarkMode} />} />
          <Route path="/market-prices" element={<MarketPrices onBack={() => navigate('/')} language={language} t={t} isDarkMode={isDarkMode} />} />
          <Route path="/voice-assistant" element={<VoiceAssistantPage onBack={() => navigate('/')} isDarkMode={isDarkMode} />} />
          <Route path="/verify" element={<VerifyPage onVerify={() => navigate('/')} onBack={() => navigate('/')} isDarkMode={isDarkMode} />} />
          <Route path="/world" element={<SmartAgricultureWorld isDarkMode={isDarkMode} />} />
          <Route path="/safety-twin" element={<FarmerAlertTwin isDarkMode={isDarkMode} />} />
          <Route path="/security-settings" element={<SecuritySettings isDarkMode={isDarkMode} />} />
          <Route path="/face-verify" element={<FaceVerification />} />
        </Route>
      </Routes>

      {/* Persistent Unified Intelligence Hub */}
      {!showVoiceChallenge && user && currentView !== 'main' && (
        <IntelligenceHub
          language={language}
          isDarkMode={isDarkMode}
          t={t}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          selectedTown={selectedTown}
          setSelectedTown={setSelectedTown}
        />
      )}
    </div>
  )
}



function App() {
  return (
    <AuthProvider>
      <MobileViewProvider>
        <Router>
          <Routes>
            <Route path="/farmer-auth" element={<FarmerAuth />} />
            <Route path="/*" element={<AppContent />} />
          </Routes>
        </Router>
      </MobileViewProvider>
    </AuthProvider>
  )
}

export default App

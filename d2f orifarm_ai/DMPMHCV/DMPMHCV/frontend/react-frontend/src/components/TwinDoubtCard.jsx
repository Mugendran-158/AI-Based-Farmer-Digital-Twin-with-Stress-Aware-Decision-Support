import React, { useState } from 'react'
import {
  Send,
  Mic,
  Square,
  Volume2,
  ArrowLeft,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  User,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Info,
  Activity
} from 'lucide-react'
import VoiceRecorder from './VoiceRecorder'

const TwinDoubtCard = ({ onAsk, answer, emotionData, isLoading, onBack, t, language, isDarkMode }) => {
  const [doubt, setDoubt] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [voiceFeatures, setVoiceFeatures] = useState(null)
  const [voiceEmotion, setVoiceEmotion] = useState(null)

  const [isSpeaking, setIsSpeaking] = useState(false)

  const langMap = {
    'en': 'en-IN',
    'ta': 'ta-IN',
    'hi': 'hi-IN',
    'kn': 'kn-IN',
    'te': 'te-IN',
    'ml': 'ml-IN',
    'ur': 'ur-IN',
    'ja': 'ja-JP'
  }

  const speakResponse = (text) => {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    }

    const cleanText = text
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/[#*_-]/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText)

    const targetLang = langMap[language] || 'en-IN'
    utterance.lang = targetLang

    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      const preferredVoice = voices.find(v => v.lang === targetLang) ||
        voices.find(v => v.lang.startsWith(targetLang.split('-')[0]))
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
    }

    utterance.rate = 0.95
    utterance.pitch = 1.0

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance Error:", event)
      setIsSpeaking(false)
    }

    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 100)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  const handleSubmit = () => {
    if (!doubt.trim()) {
      // Focus element if needed, or just return to prevent empty submission
      return
    }
    if (doubt.trim() && !isLoading) {
      stopSpeaking()
      if (typeof onAsk === 'function') {
        onAsk(doubt.trim(), voiceFeatures)
      } else {
        console.warn('onAsk prop is missing in TwinDoubtCard')
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit()
    }
  }

  const handleTranscript = (text) => setDoubt(text)
  const handleVoiceFeatures = (features) => setVoiceFeatures(features)

  const getEmotionIcon = (emotion) => {
    switch (emotion) {
      case 'calm': return <ShieldCheck size={28} strokeWidth={1.5} className="text-nature-medium" />;
      case 'stressed': return <AlertTriangle size={28} strokeWidth={1.5} className="text-harvest-gold" />;
      case 'happy': return <Brain size={28} strokeWidth={1.5} className="text-nature-medium" />;
      default: return <User size={28} strokeWidth={1.5} />;
    }
  }

  const getConfidenceColor = (score) => {
    if (score >= 80) return isDarkMode ? 'bg-nature-medium' : 'bg-nature-medium';
    if (score >= 60) return isDarkMode ? 'bg-harvest-gold' : 'bg-harvest-gold';
    return isDarkMode ? 'bg-earth-rose' : 'bg-earth-rose';
  }

  return (
    <div className={`relative min-h-screen transition-all duration-1000 overflow-hidden ${isDarkMode ? 'bg-[#050508]' : 'bg-slate-50'}`}>

      {/* Massive Glassmorphic Shell */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute top-[-10%] right-[-10%] w-[800px] h-[800px] blur-[160px] opacity-20 ${isDarkMode ? 'bg-nature-medium/20' : 'bg-nature-medium/5'}`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] blur-[140px] opacity-15 ${isDarkMode ? 'bg-trust-blue/20' : 'bg-trust-blue/5'}`} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--nature-medium) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-24 pb-40">

        {/* Institutional Header Cluster */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 animate-in fade-in slide-in-from-top-12 duration-[1500ms]">
          <div className="flex-1">
            <div className={`inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl border mb-10 transition-all duration-1000 ${isDarkMode ? 'bg-white/[0.03] border-white/10 text-white/60' : 'bg-nature-deep/5 border-nature-deep/10 text-nature-deep/60'}`}>
              <Brain size={20} strokeWidth={1.5} className="animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-[0.5em]">{t('digitalTwinWisdom') || 'Strategic Intelligence Portal'}</span>
            </div>
            <h2 className={`text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
              Ask your <span className="opacity-30 font-light italic">Digital Twin</span>
            </h2>
            <p className={`text-lg max-w-2xl leading-relaxed font-bold opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
              Initialize high-fidelity growth inquiries. Our institutional neural core provides real-time sovereign advice for decentralized agricultural mastery.
            </p>

            <div className={`mt-12 inline-flex items-center gap-6 px-8 py-4 rounded-[2.5rem] border shadow-2xl transition-all duration-1000 ${isDarkMode ? 'bg-[#0F0F0F] border-white/5' : 'bg-white border-slate-100'}`}>
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-nature-medium/20 animate-ping duration-[3000ms]" />
                <div className="w-3 h-3 rounded-full bg-nature-medium relative z-10 shadow-[0_0_15px_rgba(76,107,79,0.5)]" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/60' : 'text-nature-deep/60'}`}>{t('realTimeAi') || 'Synchronized Intelligence Output'}</span>
              <div className={`h-5 w-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-nature-deep/10'}`} />
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-nature-medium`}>Active Node v4.0.1</span>
            </div>
          </div>

          <button
            onClick={() => { stopSpeaking(); onBack(); }}
            className={`px-10 py-6 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.5em] transition-all duration-700 flex items-center gap-6 border backdrop-blur-3xl shadow-2xl active:scale-95 ${isDarkMode ? 'bg-white/[0.02] border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20' : 'bg-white border-slate-100 text-slate-400 hover:text-nature-deep hover:border-nature-deep/20'}`}
          >
            <ArrowLeft size={18} strokeWidth={3} />
            {t('terminateSession') || 'Abort Protocol'}
          </button>
        </div>

        {/* Neural Inquiry Matrix */}
        <div className="space-y-12 mb-20">

          {/* Borderless Neural Input Well */}
          <div className="relative group/input animate-in fade-in zoom-in-95 duration-[1500ms]">
            <div className={`absolute -inset-[1px] rounded-[4rem] transition-all duration-1000 ${isDarkMode ? 'bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-30 group-hover/input:opacity-100' : 'bg-gradient-to-b from-slate-200 to-transparent group-hover/input:from-nature-medium/40'}`} />

            <div className={`relative rounded-[4rem] p-4 transition-all duration-1000 overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.6)] ${isDarkMode ? 'bg-black/60 backdrop-blur-[60px]' : 'bg-white/40 backdrop-blur-[60px]'}`}>
              <textarea
                className={`w-full px-16 py-16 pr-40 border-none focus:ring-0 resize-none min-h-[300px] text-2xl font-bold leading-relaxed bg-transparent transition-all duration-500 ${isDarkMode ? 'text-white placeholder:text-white/10' : 'text-nature-deep placeholder:text-nature-deep/10'}`}
                value={doubt}
                onChange={(e) => setDoubt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('typeDoubt') || 'Initialize growth inquiry...'}
                disabled={isLoading || isRecording}
              />

              {/* Orbital Voice Sync Node */}
              <div className="absolute top-16 right-16 z-20">
                <div className="relative group/voice">
                  <div className={`absolute -inset-16 rounded-full border transition-all duration-[20s] linear infinite pointer-events-none ${isDarkMode ? 'border-white/[0.03]' : 'border-nature-deep/[0.03]'} ${isRecording ? 'animate-spin opacity-100' : 'opacity-0'}`} />
                  <div className={`absolute -inset-20 rounded-full border transition-all duration-[30s] linear infinite reverse pointer-events-none ${isDarkMode ? 'border-white/[0.02]' : 'border-nature-deep/[0.02]'} ${isRecording ? 'animate-spin opacity-100' : 'opacity-0'}`} />

                  {isRecording && (
                    <div className="absolute -inset-10 bg-nature-medium/20 rounded-full blur-[40px] animate-pulse" />
                  )}

                  <div className="relative z-10 scale-125">
                    <VoiceRecorder
                      onTranscript={handleTranscript}
                      onVoiceFeatures={handleVoiceFeatures}
                      language={language || 'en'}
                      isRecording={isRecording}
                      onRecordingChange={setIsRecording}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              </div>

              {/* Capacity Signature */}
              <div className={`absolute bottom-12 left-16 flex items-center gap-4 opacity-20 pointer-events-none`}>
                <ShieldCheck size={18} className={isDarkMode ? 'text-white' : 'text-nature-deep'} />
                <span className={`text-[11px] font-black uppercase tracking-[0.6em] ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Sovereign Neural Core v4.0.0</span>
              </div>
            </div>
          </div>

          {/* Imperial Platinum Trigger */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || isRecording}
            className={`group/btn w-full relative h-32 rounded-[4rem] overflow-hidden transition-all duration-1000 ${!isLoading && !isRecording
              ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.98] shadow-[0_40px_80px_rgba(76,107,79,0.3)]'
              : 'cursor-not-allowed opacity-30 grayscale'
              }`}
          >
            <div className={`absolute inset-0 transition-all duration-1000 ${isDarkMode ? 'bg-gradient-to-r from-nature-deep via-nature-medium to-nature-deep' : 'bg-gradient-to-r from-nature-deep via-nature-medium to-nature-deep'}`} />

            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-1000">
              <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(163,190,140,0.1)_40%,rgba(163,190,140,0.1)_60%,transparent_80%)] animate-[shimmer_3s_infinite]" />
            </div>

            <div className="relative flex items-center justify-center gap-12 text-white px-16 h-full">
              <div className="flex flex-col items-center">
                <span className="text-[20px] font-black uppercase tracking-[0.8em] ml-[0.8em]">{t('askDigitalTwin') || 'Execute Wisdom Protocol'}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-3">Strategic Advisory Matrix Initialization</span>
              </div>
              {isLoading ? (
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-white/10 border-t-white" />
              ) : (
                <Send size={32} strokeWidth={1} className="group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4 transition-transform duration-1000 ease-out text-nature-light" />
              )}
            </div>
          </button>
        </div>

        {answer && (
          <div className="space-y-20 animate-in fade-in slide-in-from-bottom-20 duration-[1500ms]">

            {/* Biological Response Hub */}
            {emotionData && emotionData.emotion !== 'neutral' && (
              <div className={`rounded-[4rem] p-16 border transition-all duration-1000 ${isDarkMode ? 'bg-[#0F0F0F]/60 border-white/5 backdrop-blur-3xl' : 'bg-white border-slate-100 shadow-2xl'}`}>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 mb-16">
                  <div className="flex items-center gap-6">
                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-1000 group-hover:rotate-6 ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
                      {getEmotionIcon(emotionData.emotion)}
                    </div>
                    <div>
                      <h4 className={`text-4xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                        {emotionData.feel || `${t('feeling')} ${emotionData.emotion}`}
                      </h4>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="w-2 h-2 rounded-full bg-nature-medium animate-pulse shadow-[0_0_10px_rgba(76,107,79,0.5)]" />
                        <p className={`text-[12px] font-black uppercase tracking-[0.4em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Biometric Sentinel Analysis</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    {emotionData.trend === 'trend_low' && (
                      <div className="px-8 py-4 rounded-2xl bg-earth-rose/10 border border-earth-rose/20 text-earth-rose text-[11px] font-black uppercase tracking-widest animate-pulse flex items-center gap-3 shadow-lg">
                        <TrendingDown size={18} /> {t('stressAlert') || 'Intensity Peak'}
                      </div>
                    )}
                    {emotionData.trend === 'trend_high' && (
                      <div className="px-8 py-4 rounded-2xl bg-nature-medium/10 border border-nature-medium/20 text-nature-medium text-[11px] font-black uppercase tracking-widest flex items-center gap-3 shadow-lg">
                        <TrendingUp size={18} /> {t('positiveTrend') || 'Optimal Growth'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Integrity Vector */}
                <div className={`mb-16 p-12 rounded-[3.5rem] ${isDarkMode ? 'bg-black/40' : 'bg-slate-50'}`}>
                  <div className="flex justify-between items-center mb-8 px-2">
                    <span className={`text-[12px] font-black uppercase tracking-[0.5em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Decision Integrity Vector</span>
                    <span className={`text-[14px] font-black uppercase tracking-tight ${emotionData.confidence >= 70 ? 'text-nature-medium' : 'text-harvest-gold'}`}>
                      {emotionData.confidence}% Absolute Fidelity
                    </span>
                  </div>
                  <div className={`h-3 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-nature-deep/10'}`}>
                    <div
                      className={`h-full transition-all duration-[3000ms] ease-out shadow-[0_0_30px_rgba(76,107,79,0.3)] ${getConfidenceColor(emotionData.confidence)}`}
                      style={{ width: `${emotionData.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Strategic Directives */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className={`p-10 rounded-[3.5rem] border transition-all duration-1000 ${isDarkMode ? 'bg-nature-medium/5 border-nature-medium/10' : 'bg-nature-medium/5 border-nature-medium/10'}`}>
                    <h5 className="text-nature-medium text-[12px] font-black uppercase tracking-[0.5em] flex items-center gap-4 mb-10">
                      <CheckCircle2 size={24} />
                      {t('recommendedToday') || 'Optimize Execution'}
                    </h5>
                    <ul className="space-y-8">
                      {(emotionData.do ? emotionData.do.split('\n') : []).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-5">
                          <div className="mt-2.5 w-2 h-2 rounded-full bg-nature-medium shrink-0 animate-pulse shadow-[0_0_15px_rgba(76,107,79,0.6)]" />
                          <span className={`text-[16px] font-bold leading-relaxed tracking-tight ${isDarkMode ? 'text-white/80' : 'text-nature-deep/80'}`}>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-10 rounded-[3.5rem] border transition-all duration-1000 ${isDarkMode ? 'bg-earth-rose/5 border-earth-rose/10' : 'bg-earth-rose/5 border-earth-rose/10'}`}>
                    <h5 className="text-earth-rose text-[12px] font-black uppercase tracking-[0.5em] flex items-center gap-4 mb-10">
                      <XCircle size={24} />
                      {t('betterToAvoid') || 'Protocol Mitigation'}
                    </h5>
                    <ul className="space-y-8">
                      {(emotionData.avoid ? emotionData.avoid.split('\n') : []).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-5">
                          <div className="mt-2.5 w-2 h-2 rounded-full bg-earth-rose shrink-0 opacity-40 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                          <span className={`text-[16px] font-bold leading-relaxed tracking-tight ${isDarkMode ? 'text-white/60' : 'text-nature-deep/60'}`}>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Wisdom Synthesis Portal */}
            <div className={`rounded-[5rem] p-16 md:p-24 relative overflow-hidden transition-all duration-[2s] border shadow-[0_80px_160px_rgba(0,0,0,0.4)] ${isDarkMode ? 'bg-[#0F0F0F]/80 border-white/10' : 'bg-white border-slate-100 shadow-2xl'}`}>

              <div className="absolute top-0 right-0 p-24 opacity-10 pointer-events-none">
                <Brain size={200} strokeWidth={0.5} className="animate-pulse" />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 relative z-10">
                <div className="flex items-center gap-6">
                  <div className={`w-4 h-4 rounded-full ${isDarkMode ? 'bg-nature-light' : 'bg-nature-medium'} animate-pulse shadow-[0_0_20px_rgba(163,190,140,0.8)]`} />
                  <span className={`text-[14px] font-black uppercase tracking-[0.8em] ${isDarkMode ? 'text-white/40' : 'text-nature-deep/40'}`}>
                    {t('digitalTwinWisdom') || 'Wisdom Synthesis Output'}
                  </span>
                </div>

                <button
                  onClick={() => isSpeaking ? stopSpeaking() : speakResponse(answer)}
                  className={`px-12 py-6 rounded-[2.5rem] transition-all duration-1000 border-2 flex items-center gap-6 shadow-2xl active:scale-95 ${isSpeaking
                    ? 'bg-earth-rose text-white border-transparent'
                    : `bg-transparent ${isDarkMode ? 'border-white/10 text-white/40 hover:text-white hover:border-white/50' : 'border-slate-100 text-slate-400 hover:text-nature-deep hover:border-nature-deep'}`
                    }`}
                >
                  {isSpeaking ? <Square size={20} fill="currentColor" strokeWidth={0} /> : <Volume2 size={24} strokeWidth={1} />}
                  <span className="text-[12px] font-black uppercase tracking-[0.6em]">{isSpeaking ? 'Abort Vocal' : 'Vocalize'}</span>
                </button>
              </div>

              <div className={`text-4xl md:text-5xl font-black leading-[1.6] whitespace-pre-wrap transition-all duration-1000 tracking-tighter relative z-10 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                {answer}
              </div>

              {/* Secure Metadata */}
              <div className={`mt-24 pt-12 border-t flex flex-col md:flex-row justify-between items-center gap-8 ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
                <div className="flex items-center gap-6 opacity-40">
                  <Activity size={18} className="text-nature-medium" />
                  <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Latency Optimization: 0.04ms</span>
                </div>
                <div className={`inline-flex items-center gap-4 px-8 py-3 rounded-full border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-100 bg-slate-50'}`}>
                  <span className={`text-[9px] font-black uppercase tracking-widest opacity-60 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Sovereign Archives v8.2</span>
                </div>
              </div>

              {/* Evolutionary Escalation */}
              {emotionData?.handoff && (
                <div className="mt-20 flex justify-center relative z-10">
                  <button
                    onClick={() => window.location.href = '/ai-farmer'}
                    className={`px-16 py-8 rounded-[3rem] text-[13px] font-black uppercase tracking-[0.7em] transition-all duration-1000 flex items-center gap-6 bg-nature-deep text-white hover:bg-nature-medium hover:shadow-[0_40px_100px_rgba(76,107,79,0.3)] active:scale-95`}
                  >
                    <HelpCircle size={24} strokeWidth={2.5} />
                    Elevate to AI Expert
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TwinDoubtCard

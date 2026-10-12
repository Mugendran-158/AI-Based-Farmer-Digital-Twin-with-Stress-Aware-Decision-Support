import React, { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react'

const LanguageSelector = ({ language, setLanguage, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Language Data with Flags
  const languages = [
    { code: 'en', name: 'English (US)', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളம் (Malayalam)', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو (Urdu)', flag: '🇮🇳' }
  ]

  const currentLang = languages.find(l => l.code === language) || languages[0]

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (code) => {
    setLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className={`transition-all duration-700 border-b relative z-50 ${isDarkMode ? 'bg-[#050508]/80 border-white/5 backdrop-blur-3xl' : 'bg-white/60 border-slate-100 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <div className={`w-8 h-px ${isDarkMode ? 'bg-white/10' : 'bg-nature-deep/10'}`} />
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
            Language Matrix
          </span>
        </div>

        {/* Custom Dropdown Trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-4 pl-5 pr-4 py-3 rounded-2xl border transition-all duration-700 group ${isOpen
              ? isDarkMode
                ? 'bg-nature-medium/10 border-nature-medium text-white shadow-[0_0_30px_rgba(76,107,79,0.2)]'
                : 'bg-nature-medium/5 border-nature-medium text-nature-deep shadow-xl'
              : isDarkMode
                ? 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/20 text-slate-300'
                : 'bg-slate-50 border-slate-200 hover:border-nature-medium text-slate-700 hover:shadow-sm'
              }`}
          >
            <span className="text-xl leading-none transition-transform group-hover:scale-110">{currentLang.flag}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">{currentLang.name}</span>
            <ChevronDown size={14} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
          </button>

          {/* Dropdown Panel */}
          <div className={`absolute top-full right-0 mt-4 w-72 p-3 rounded-[2.5rem] border shadow-2xl backdrop-blur-3xl transform transition-all duration-700 origin-top-right overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
            } ${isDarkMode ? 'bg-[#0F0F0F]/95 border-white/10 shadow-black/80' : 'bg-white/95 border-slate-100 shadow-slate-200'}`}
          >
            {/* Scrollable list */}
            <div className="max-h-[350px] overflow-y-auto pr-1 space-y-1 custom-scrollbar">
              <div className={`px-4 py-3 mb-2 border-b ${isDarkMode ? 'border-white/5' : 'border-slate-50'}`}>
                <span className={`text-[9px] font-black uppercase tracking-[0.4em] opacity-30 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Select Protocol</span>
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${language === lang.code
                    ? isDarkMode
                      ? 'bg-nature-medium/20 text-white'
                      : 'bg-nature-medium/5 text-nature-deep font-black'
                    : isDarkMode
                      ? 'hover:bg-white/5 text-slate-400 hover:text-nature-medium'
                      : 'hover:bg-slate-50 text-slate-500 hover:text-nature-deep'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl transition-transform group-hover:scale-110">{lang.flag}</span>
                    <span className={`text-[11px] font-black uppercase tracking-widest group-hover:tracking-[0.2em] transition-all duration-300 ${language === lang.code ? 'text-nature-medium' : ''}`}>
                      {lang.name}
                    </span>
                  </div>
                  {language === lang.code && (
                    <div className={`p-1.5 rounded-full ${isDarkMode ? 'bg-nature-medium text-white' : 'bg-nature-medium text-white'} shadow-lg shadow-nature-medium/20`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LanguageSelector

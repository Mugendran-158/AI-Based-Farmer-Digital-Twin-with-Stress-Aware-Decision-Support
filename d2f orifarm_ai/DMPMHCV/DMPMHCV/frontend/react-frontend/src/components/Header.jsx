import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Sun, Moon, Camera, LogOut, Lock, User, Activity,
  ShieldCheck, Eye, Globe, Waves, CloudRain,
  LayoutDashboard, Command, Cpu, Zap
} from 'lucide-react'
import { useMobileView } from '../context/MobileViewContext'
import CommandButton from './legendary/CommandButton'

const Header = ({ t, user, onLogout, isDarkMode: externalDarkMode, toggleTheme: externalToggleTheme, language, setLanguage }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { uploadProfileImage } = useAuth()
  const {
    mysteriousMode, toggleMysterious,
    worldMode, toggleWorld,
    seaMode, toggleSea,
    monsoonMode, toggleMonsoon
  } = useMobileView()

  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showViewSelector, setShowViewSelector] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const menuRef = useRef(null)
  const viewModesRef = useRef(null)
  const languageRef = useRef(null)
  const fileInputRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'ja', name: '日本語 (Japanese)' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളம் (Malayalam)' },
    { code: 'ur', name: 'اردو (Urdu)' }
  ]

  const currentLang = languages.find(l => l.code === language) || languages[0]

  const [internalDarkMode, setInternalDarkMode] = useState(() => {
    const saved = localStorage.getItem('appTheme')
    return saved ? saved === 'dark' : false
  })

  const isDarkMode = externalDarkMode !== undefined ? externalDarkMode : internalDarkMode

  const handleInternalToggle = () => {
    const newMode = !internalDarkMode
    setInternalDarkMode(newMode)
    localStorage.setItem('appTheme', newMode ? 'dark' : 'light')
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newMode ? 'dark' : 'light' }))
  }

  const toggleTheme = externalToggleTheme || handleInternalToggle

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (viewModesRef.current && !viewModesRef.current.contains(event.target)) {
        setShowViewSelector(false)
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAuthClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu)
    } else {
      navigate('/login')
    }
  }

  const handleLogout = () => {
    setShowUserMenu(false)
    onLogout()
    navigate('/')
  }

  const handleImageUpdate = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const success = await uploadProfileImage(file)
      if (success) {
        setShowUserMenu(false)
      }
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] h-24 flex items-center px-10 border-b transition-colors duration-500 ${isDarkMode ? 'border-white/[0.03] bg-obsidian-base/40' : 'border-slate-200 bg-white/80'} backdrop-blur-[40px]`}>
      <div className="max-w-[1920px] mx-auto w-full flex items-center justify-between">

        {/* BRANDING HUB */}
        <div
          className="flex items-center gap-6 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className={`absolute inset-0 rounded-xl opacity-10 blur-xl group-hover:opacity-30 transition-opacity ${isDarkMode ? 'bg-trust-blue' : 'bg-nature-medium'}`} />
            <div className={`relative w-full h-full border rounded-xl flex items-center justify-center transition-all duration-700 ${isDarkMode ? 'border-white/20 bg-[#0F0F0F] group-hover:border-trust-blue/50' : 'border-slate-200 bg-white group-hover:border-nature-medium/50 shadow-sm'}`}>
              <Cpu size={20} className={`animate-pulse ${isDarkMode ? 'text-trust-blue' : 'text-nature-medium'}`} strokeWidth={1} />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className={`command-headline text-lg tracking-[0.2em] font-black transition-colors ${isDarkMode ? 'text-platinum-pure' : 'text-nature-deep'}`}>
              AGRI<span className="opacity-40 font-light">INTEL</span>
            </h1>
            <div className={`mono-metadata text-[7px] opacity-40 uppercase tracking-[0.4em] mt-1 transition-colors ${isDarkMode ? 'text-platinum-muted' : 'text-nature-medium'}`}>
              Institutional Portal
            </div>
          </div>
        </div>

        {/* COMMAND DECK */}
        <div className="flex items-center gap-8">
          {user ? (
            <React.Fragment>
              {/* SYSTEM STATUS PILLS */}
              <div className="hidden xl:flex items-center gap-4">
                {[
                  {
                    label: isOnline
                      ? (language === 'ta' ? 'ஆன்லைன்' : 'SYSTEM: ONLINE')
                      : (language === 'ta' ? 'ஆஃப்லைன்' : 'SYSTEM: OFFLINE'),
                    icon: ShieldCheck,
                    color: isOnline ? 'nature-medium' : 'earth-rose'
                  },
                  { label: t('header.accuracy'), icon: Zap, color: 'trust-blue' },
                  { label: t('header.statusGood'), icon: Activity, color: 'harvest-gold' }
                ].map((stat, i) => {
                  const StatIcon = stat.icon;
                  const colorMap = {
                    'nature-medium': isDarkMode ? 'text-nature-light' : 'text-nature-medium',
                    'trust-blue': isDarkMode ? 'text-blue-300' : 'text-trust-blue',
                    'harvest-gold': isDarkMode ? 'text-amber-200' : 'text-harvest-gold',
                    'earth-rose': isDarkMode ? 'text-rose-400' : 'text-earth-rose'
                  };
                  return (
                    <div key={i} className={`px-4 py-1.5 rounded-full border flex items-center gap-3 transition-all hover:scale-105 ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-nature-deep/5 border-nature-deep/5'}`}>
                      <StatIcon size={12} className={`${colorMap[stat.color]} opacity-80`} />
                      <span className={`mono-metadata text-[8px] uppercase tracking-widest ${isDarkMode ? 'text-platinum-muted' : 'text-nature-deep/60'} ${stat.color === 'earth-rose' ? (isDarkMode ? 'text-rose-400 opacity-100' : 'text-earth-rose opacity-100') : ''}`}>{stat.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className={`w-px h-8 ${isDarkMode ? 'bg-white/5' : 'bg-slate-200'}`} />

              {/* LOGOUT PROTOCOL */}
              <CommandButton
                icon={LogOut}
                label={t('header.signOut')}
                onClick={handleLogout}
                variant="ghost"
                isDarkMode={isDarkMode}
                className="md:flex hidden"
              />

              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-700 cursor-pointer group hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-white/5 text-harvest-gold border border-white/10 hover:border-harvest-gold/50' : 'bg-slate-100 text-nature-deep border border-slate-200 hover:border-nature-medium'}`} onClick={toggleTheme}>
                {isDarkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
              </div>

              {/* LANGUAGE SWITCHER */}
              <div className="relative" ref={languageRef}>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-700 cursor-pointer group hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 hover:border-nature-medium/50' : 'bg-slate-100 border border-slate-200 hover:border-nature-medium'}`}
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  <Globe size={18} strokeWidth={1.5} className={showLanguageMenu ? 'animate-spin-slow' : ''} />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nature-medium opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-nature-medium"></span>
                  </span>
                </div>

                {showLanguageMenu && (
                  <div className={`absolute top-16 right-0 w-64 p-3 rounded-[2rem] border shadow-2xl backdrop-blur-[60px] z-50 animate-in fade-in slide-in-from-top-4 duration-500 max-h-[400px] overflow-y-auto custom-scrollbar ${isDarkMode ? 'border-white/10 bg-[#0F0F0F]/95' : 'border-slate-100 bg-white/95'}`}>
                    <div className="grid grid-cols-1 gap-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code)
                            setShowLanguageMenu(false)
                          }}
                          className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${language === lang.code
                            ? (isDarkMode ? 'bg-nature-medium/20 text-white' : 'bg-nature-medium/10 text-nature-deep font-black')
                            : (isDarkMode ? 'hover:bg-white/5 text-white/40 hover:text-white' : 'hover:bg-slate-50 text-slate-500 hover:text-nature-deep')
                            }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${language === lang.code ? 'bg-nature-medium text-white' : (isDarkMode ? 'bg-white/5 text-platinum-muted' : 'bg-slate-100 text-slate-400')}`}>
                            {lang.code.toUpperCase()}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{lang.name}</span>
                          {language === lang.code && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-nature-medium" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* MATRIX CONTROLLER */}
              <div className="relative" ref={viewModesRef}>
                <button
                  onClick={() => setShowViewSelector(!showViewSelector)}
                  className={`w-11 h-11 rounded-[1.2rem] border flex items-center justify-center transition-all duration-700 ${showViewSelector
                    ? (isDarkMode ? 'bg-trust-blue text-nature-deep border-transparent shadow-[0_0_30px_rgba(46,139,87,0.3)] scale-90' : 'bg-nature-deep text-white border-transparent shadow-xl scale-90')
                    : (isDarkMode ? 'bg-white/[0.02] border-white/[0.05] text-white/40 hover:text-white hover:border-trust-blue shadow-lg' : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-nature-deep hover:border-nature-deep/20 shadow-inner')
                    }`}
                >
                  <Command size={18} strokeWidth={1} className={showViewSelector ? 'animate-spin-slow' : ''} />
                </button>

                {showViewSelector && (
                  <div className={`absolute top-16 right-0 w-80 p-5 rounded-[2.5rem] border shadow-[0_40px_100px_rgba(0,0,0,0.4)] z-50 animate-in fade-in slide-in-from-top-4 duration-500 ${isDarkMode ? 'border-white/10 bg-[#0F0F0F]/95 backdrop-blur-[60px]' : 'border-slate-100 bg-white/95 backdrop-blur-[60px]'}`}>
                    <div className={`text-[9px] font-black uppercase tracking-[0.5em] mb-6 px-4 ${isDarkMode ? 'text-white/30' : 'text-nature-deep/30'}`}>{t('header.viewSettings')}</div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {[
                        { label: 'Default', icon: LayoutDashboard, active: !mysteriousMode && !worldMode && !seaMode && !monsoonMode, action: () => { navigate('/') } },
                        { label: 'Detailed', icon: Eye, active: mysteriousMode, action: toggleMysterious },
                        { label: 'World Map', icon: Globe, active: worldMode, action: toggleWorld },
                        { label: 'Water', icon: Waves, active: seaMode, action: toggleSea },
                        { label: 'Weather', icon: CloudRain, active: monsoonMode, action: toggleMonsoon },
                      ].map((mode, idx) => {
                        const ModeIcon = mode.icon;
                        return (
                          <button
                            key={idx}
                            onClick={mode.action}
                            className={`flex items-center gap-5 p-4 rounded-2xl transition-all duration-500 border group ${mode.active
                              ? (isDarkMode ? 'bg-white text-black border-transparent shadow-xl' : 'bg-nature-deep text-white border-transparent shadow-xl')
                              : (isDarkMode ? 'bg-transparent border-transparent hover:bg-white/5 text-white/40 hover:text-white' : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-500 hover:text-nature-deep')
                              }`}
                          >
                            <div className={`p-2.5 rounded-xl transition-all duration-500 ${mode.active ? (isDarkMode ? 'bg-nature-deep/10 text-nature-deep' : 'bg-white/10 text-white') : (isDarkMode ? 'bg-white/5 text-white/20 group-hover:bg-trust-blue/10 group-hover:text-trust-blue' : 'bg-slate-100 text-slate-400 group-hover:bg-nature-deep/5 group-hover:text-nature-deep')}`}>
                              <ModeIcon size={16} strokeWidth={1.5} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{mode.label}</span>
                            {mode.active && <div className={`ml-auto w-1.5 h-1.5 rounded-full animate-pulse ${isDarkMode ? 'bg-nature-deep' : 'bg-white'}`} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* USER PROFILE */}
              <div ref={menuRef} className="relative">
                <div
                  className={`flex items-center gap-5 transition-all duration-700 cursor-pointer group pl-8 border-l ${isDarkMode ? 'border-white/5' : 'border-slate-100'} py-2 rounded-2xl pr-2 hover:bg-white/[0.02]`}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="relative">
                    <div className={`absolute -inset-1.5 rounded-[1.2rem] opacity-0 group-hover:opacity-40 transition-all duration-700 blur-md ${isDarkMode ? 'bg-trust-blue' : 'bg-nature-medium'}`} />
                    {user?.profile_image ? (
                      <img src={`http://127.0.0.1:5000${user.profile_image}`} alt="Profile" className="w-11 h-11 rounded-[1.1rem] object-cover relative z-10 border border-white/5 shadow-2xl" />
                    ) : (
                      <div className={`w-11 h-11 rounded-[1.1rem] relative z-10 flex items-center justify-center border transition-all duration-700 shadow-xl ${isDarkMode ? 'bg-nature-deep border-white/10 text-trust-blue group-hover:border-trust-blue/50' : 'bg-white border-slate-200 text-nature-medium group-hover:border-nature-medium/50'}`}>
                        <User size={20} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:block">
                    <div className={`text-[11px] font-black uppercase tracking-[0.2em] mb-0.5 transition-colors ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                      {user?.name || 'Operator'}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-nature-medium animate-pulse shadow-[0_0_8px_rgba(76,107,79,0.5)]" />
                      <span className={`text-[9px] font-black uppercase tracking-[0.3em] opacity-30 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{t('header.verifiedFarmer')}</span>
                    </div>
                  </div>
                </div>

                {showUserMenu && (
                  <div className={`absolute top-16 right-0 w-80 rounded-[2.5rem] border backdrop-blur-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-500 ${isDarkMode ? 'border-white/10 bg-[#0F0F0F]/95' : 'border-slate-200 bg-white/95'}`}>
                    <div className={`p-10 text-center border-b ${isDarkMode ? 'border-white/[0.03]' : 'border-slate-100'}`}>
                      <div className="w-20 h-20 mx-auto rounded-[1.8rem] overflow-hidden mb-6 relative border border-white/5 shadow-2xl group/pfp">
                        {user.profile_image ? (
                          <img src={`http://127.0.0.1:5000${user.profile_image}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/5 text-white/10' : 'bg-slate-50 text-slate-300'}`}><User size={36} strokeWidth={1} /></div>
                        )}
                        <div
                          className="absolute inset-0 bg-nature-deep/80 flex items-center justify-center opacity-0 group-hover/pfp:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                          onClick={() => fileInputRef.current.click()}
                        >
                          <Camera size={24} className="text-white" strokeWidth={1} />
                        </div>
                      </div>
                      <h3 className={`text-[13px] font-black uppercase tracking-[0.3em] truncate ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{user.name}</h3>
                      <p className={`text-[9px] font-bold opacity-30 mt-2 truncate tracking-widest ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{user.email}</p>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpdate} accept="image/*" className="hidden" />
                    </div>
                    <div className="p-6 space-y-3">
                      <button
                        onClick={() => { setShowUserMenu(false); navigate('/face-verify'); }}
                        className={`w-full flex items-center justify-center gap-4 py-5 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-[0.4em] active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-50 border-slate-100 text-nature-deep hover:bg-slate-100'}`}
                      >
                        <ShieldCheck size={16} strokeWidth={2} className="text-nature-medium" /> {t('header.faceVerification')}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-earth-rose/5 border border-earth-rose/20 text-earth-rose hover:bg-earth-rose/10 transition-all text-[10px] font-black uppercase tracking-[0.4em] active:scale-95"
                      >
                        <LogOut size={16} strokeWidth={2} /> {t('header.signOut')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </React.Fragment>
          ) : (
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-700 cursor-pointer group hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-white/5 text-harvest-gold border border-white/10 hover:border-harvest-gold/50' : 'bg-slate-100 text-nature-deep border border-slate-200 hover:border-nature-medium'}`}
                onClick={toggleTheme}
              >
                {isDarkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
              </div>

              {/* LANGUAGE SWITCHER (UNAUTH) */}
              <div className="relative" ref={languageRef}>
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-700 cursor-pointer group hover:scale-110 active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 hover:border-nature-medium/50' : 'bg-slate-100 border border-slate-200 hover:border-nature-medium'}`}
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                >
                  <Globe size={18} strokeWidth={1.5} className={showLanguageMenu ? 'animate-spin-slow' : ''} />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nature-medium opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-1 w-1 bg-nature-medium"></span>
                  </span>
                </div>

                {showLanguageMenu && (
                  <div className={`absolute top-16 right-0 w-64 p-3 rounded-[2rem] border shadow-2xl backdrop-blur-[60px] z-50 animate-in fade-in slide-in-from-top-4 duration-500 max-h-[400px] overflow-y-auto custom-scrollbar ${isDarkMode ? 'border-white/10 bg-[#0F0F0F]/95' : 'border-slate-100 bg-white/95'}`}>
                    <div className="grid grid-cols-1 gap-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code)
                            setShowLanguageMenu(false)
                          }}
                          className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${language === lang.code
                            ? (isDarkMode ? 'bg-nature-medium/20 text-white' : 'bg-nature-medium/10 text-nature-deep font-black')
                            : (isDarkMode ? 'hover:bg-white/5 text-white/40 hover:text-white' : 'hover:bg-slate-50 text-slate-500 hover:text-nature-deep')
                            }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${language === lang.code ? 'bg-nature-medium text-white' : (isDarkMode ? 'bg-white/5 text-platinum-muted' : 'bg-slate-100 text-slate-400')}`}>
                            {lang.code.toUpperCase()}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{lang.name}</span>
                          {language === lang.code && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-nature-medium" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <CommandButton
                onClick={() => navigate('/login')}
                variant="secondary"
                icon={Lock}
                className="px-6 h-12 text-[10px]"
                isDarkMode={isDarkMode}
              >
                {t('header.login')}
              </CommandButton>

              <CommandButton
                onClick={() => navigate('/register')}
                variant="intelligence"
                icon={Cpu}
                className="px-6 h-12 text-[10px]"
                isDarkMode={isDarkMode}
              >
                {t('header.register')}
              </CommandButton>
            </div>
          )}
        </div>
      </div >
    </header >
  )
}

export default Header

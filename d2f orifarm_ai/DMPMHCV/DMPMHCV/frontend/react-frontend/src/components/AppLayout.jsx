import { MobileViewProvider, useMobileView } from '../context/MobileViewContext'
import React, { useEffect, useRef } from 'react'
import { themes } from '../data/themes'

function AppLayout({ children }) {
  const { viewMode, mysteriousMode, worldMode, seaMode, monsoonMode, activeTheme } = useMobileView();
  const audioRef = useRef(null);

  const getContainerClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-[430px] mx-auto my-8 border-x-4 border-y-8 border-slate-900 rounded-[3rem] shadow-2xl overflow-hidden min-h-[90vh] ring-8 ring-slate-900';
      case 'tablet':
        return 'max-w-[820px] mx-auto my-8 border-x-[12px] border-y-[12px] border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden min-h-[90vh] ring-4 ring-slate-800';
      default:
        return 'w-full';
    }
  };

  useEffect(() => {
    if (seaMode && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked by browser"));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [seaMode]);

  // Apply Theme Variables
  useEffect(() => {
    const theme = themes.find(t => t.id === activeTheme) || themes[0];
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--brand-${key}`, value);
    });

    // Add a class for the current theme to enable theme-specific styling if needed
    themes.forEach(t => root.classList.remove(`theme-${t.id}`));
    root.classList.add(`theme-${theme.id}`);
  }, [activeTheme]);

  return (
    <div className={`transition-all duration-1000 ease-in-out ${getContainerClass()} ${mysteriousMode ? 'mysterious-mode' : ''} ${worldMode ? 'world-mode' : ''} ${seaMode ? 'sea-mode' : ''} ${monsoonMode ? 'monsoon-mode' : ''}`}>

      <style>{`
                :root {
                    --theme-primary: var(--brand-primary, #ffffff);
                    --theme-bg: var(--brand-bg, #020203);
                    --theme-text: var(--brand-text, #E5E5E5);
                }

                body {
                  margin: 0;
                  padding: 0;
                  background-color: var(--obsidian-base);
                  color: var(--platinum-text);
                  font-family: var(--font-command);
                  overflow-x: hidden;
                }

                /* Sovereign Atmospheric Geometry */
                .sovereign-atmosphere {
                  position: fixed;
                  inset: 0;
                  pointer-events: none;
                  z-index: -1;
                  overflow: hidden;
                  background: var(--obsidian-base);
                }

                .volumetric-light-1 {
                  position: absolute;
                  top: -20%;
                  left: 10%;
                  width: 80vw;
                  height: 80vw;
                  background: radial-gradient(circle at center, rgba(112, 0, 255, 0.05) 0%, transparent 70%);
                  filter: blur(100px);
                  animation: pulse-slow 20s ease-in-out infinite;
                }

                .volumetric-light-2 {
                  position: absolute;
                  bottom: -10%;
                  right: -5%;
                  width: 60vw;
                  height: 60vw;
                  background: radial-gradient(circle at center, rgba(0, 255, 148, 0.03) 0%, transparent 70%);
                  filter: blur(120px);
                  animation: pulse-slow 25s ease-in-out infinite reverse;
                }

                .neural-mesh {
                  position: absolute;
                  inset: 0;
                  background-image: 
                    radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0);
                  background-size: 40px 40px;
                  opacity: 0.5;
                }

                @keyframes pulse-slow {
                  0%, 100% { opacity: 0.4; transform: scale(1); }
                  50% { opacity: 0.7; transform: scale(1.1); }
                }

                .system-grain {
                  position: fixed;
                  inset: 0;
                  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                  opacity: 0.015;
                  pointer-events: none;
                  z-index: 100;
                }
            `}</style>

      {/* Sovereign Environmental Infrastructure */}
      <div className="sovereign-atmosphere">
        <div className="volumetric-light-1" />
        <div className="volumetric-light-2" />
        <div className="neural-mesh" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <div className="system-grain" />

      {/* Sea Mode Audio */}
      <audio
        ref={audioRef}
        src="https://www.soundjay.com/nature/ocean-waves-1.mp3"
        loop
      />

      {/* Sea Mode Effects Layer */}
      {seaMode && (
        <React.Fragment>
          <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            {/* Cinematic Deep Ocean Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#002b36] via-[#004b5c] to-[#001a24]"></div>

            {/* Dynamic Caustics Layer (Light Shimmer) */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay animate-caustic bg-[url(https://grainy-gradients.vercel.app/noise.svg)]"></div>
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_-20%,_#4ade80,_transparent_70%)]"></div>

            {/* Sea Creatures Layer */}
            <div className="absolute inset-0 perspective-[1000px]">

              {/* Realistic High-Fidelity Dolphins */}
              <div className="dolphin absolute top-1/4 -left-40 animate-swim-right-realistic">
                <svg width="120" height="60" viewBox="0 0 120 60" className="drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
                  <path d="M10 30 C 20 10, 50 5, 80 15 C 100 25, 115 20, 120 15 C 115 30, 100 45, 80 40 C 50 35, 20 50, 10 30" fill="url(#dolphinGradient)" />
                  <path d="M40 18 Q 45 5 50 15" fill="#2c5a71" />
                  <path d="M85 24 Q 90 22 92 25" fill="#1a3a4a" opacity="0.5" />
                  <defs>
                    <linearGradient id="dolphinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#4a7c96', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#2c5a71', stopOpacity: 0.9 }} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="dolphin absolute top-2/3 -left-60 animate-swim-right-slow-realistic">
                <svg width="160" height="80" viewBox="0 0 120 60" style={{ opacity: 0.6, filter: 'blur(2px)' }}>
                  <path d="M10 30 C 20 10, 50 5, 80 15 C 100 25, 115 20, 120 15 C 115 30, 100 45, 80 40 C 50 35, 20 50, 10 30" fill="#1a3a4a" />
                </svg>
              </div>

              {/* Detailed Schools of Fish */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="fish absolute animate-swim-left-realistic" style={{
                  top: `${15 + i * 8}%`,
                  right: '-50px',
                  animationDelay: `${i * 1.2}s`,
                  animationDuration: `${8 + Math.random() * 6}s`,
                  transform: `scale(${0.5 + Math.random()})`
                }}>
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="url(#fishGradient)">
                    <path d="M0 10 C 5 0, 25 0, 35 10 L 40 5 L 40 15 L 35 10 C 25 20, 5 20, 0 10" />
                    <defs>
                      <linearGradient id="fishGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 0.6 }} />
                        <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 0.8 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              ))}

              {/* Cinematic Bubbles */}
              {[...Array(25)].map((_, i) => (
                <div key={i} className="bubble absolute bottom-0 rounded-full animate-float-realistic" style={{
                  left: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 8}px`,
                  height: `${2 + Math.random() * 8}px`,
                  background: 'rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                  animationDelay: `${Math.random() * 15}s`,
                  animationDuration: `${6 + Math.random() * 8}s`
                }}></div>
              ))}

              {/* Floating Seaweed in Background */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute bottom-0 animate-sway" style={{
                  left: `${10 + i * 20}%`,
                  height: '150px',
                  width: '30px',
                  background: 'linear-gradient(to top, #064e3b, transparent)',
                  borderRadius: '50% 50% 0 0',
                  filter: 'blur(4px)',
                  opacity: 0.3,
                  transformOrigin: 'bottom center'
                }}></div>
              ))}
            </div>

            {/* Surface Light Overlay */}
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cyan-400/10 via-cyan-500/5 to-transparent"></div>
          </div>

          <style>{`
                        @keyframes caustic {
                            0% { transform: scale(1) translate(0, 0); opacity: 0.3; }
                            50% { transform: scale(1.1) translate(10px, 10px); opacity: 0.5; }
                            100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
                        }
                        @keyframes swim-right-realistic {
                            0% { transform: translateX(-200px) translateY(0) rotate(5deg); }
                            25% { transform: translateX(25vw) translateY(-20px) rotate(0deg); }
                            50% { transform: translateX(50vw) translateY(20px) rotate(-5deg); }
                            75% { transform: translateX(75vw) translateY(-20px) rotate(0deg); }
                            100% { transform: translateX(calc(100vw + 200px)) translateY(0) rotate(5deg); }
                        }
                        @keyframes swim-right-slow-realistic {
                            0% { transform: translateX(-300px) translateY(50px) scale(1.2); }
                            100% { transform: translateX(calc(100vw + 300px)) translateY(-50px) scale(1.2); }
                        }
                        @keyframes swim-left-realistic {
                            0% { transform: translateX(100px) scaleX(-1) translateY(0); }
                            50% { transform: translateX(-50vw) scaleX(-1) translateY(10px); }
                            100% { transform: translateX(calc(-100vw - 100px)) scaleX(-1) translateY(0); }
                        }
                        @keyframes float-realistic {
                            0% { transform: translateY(110vh) scale(0); opacity: 0; }
                            20% { opacity: 0.4; transform: translateY(80vh) scale(1) translateX(10px); }
                            80% { opacity: 0.4; transform: translateY(20vh) scale(1) translateX(-10px); }
                            100% { transform: translateY(-10vh) scale(1.5); opacity: 0; }
                        }
                        @keyframes sway {
                            0%, 100% { transform: rotate(-5deg); }
                            50% { transform: rotate(5deg); }
                        }
                        .animate-caustic { animation: caustic 8s ease-in-out infinite; }
                        .animate-swim-right-realistic { animation: swim-right-realistic 18s ease-in-out infinite; }
                        .animate-swim-right-slow-realistic { animation: swim-right-slow-realistic 30s ease-in-out infinite; }
                        .animate-swim-left-realistic { animation: swim-left-realistic 14s ease-in-out infinite; }
                        .animate-float-realistic { animation: float-realistic 12s ease-in infinite; }
                        .animate-sway { animation: sway 4s ease-in-out infinite; }
                        
                        .sea-mode {
                            color: #e0f2fe !important;
                        }
                        .sea-mode .backdrop-blur-xl {
                            backdrop-filter: blur(16px) saturate(180%);
                            background-color: rgba(0, 43, 54, 0.4) !important;
                        }
                        .sea-mode * {
                            transition: color 0.5s ease;
                        }
                    `}</style>
        </React.Fragment>
      )}

      {/* Mysterious Mode Effects */}
      {mysteriousMode && (
        <React.Fragment>
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Cinematic Nebula Background */}
            <div className="absolute inset-0 bg-[#020617]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#020617] opacity-80 animate-nebula-shift"></div>

            {/* Moving Nebula Clouds */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full animate-float-nebula"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[100px] rounded-full animate-float-nebula-slow"></div>
            <div className="absolute top-[30%] right-[10%] w-[30%] h-[40%] bg-cyan-700/10 blur-[80px] rounded-full animate-pulse"></div>

            {/* Celestial Particles */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="absolute animate-float-star shadow-[0_0_10px_white]" style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  backgroundColor: i % 3 === 0 ? '#c084fc' : (i % 3 === 1 ? '#818cf8' : '#67e8f9'),
                  opacity: 0.4 + Math.random() * 0.6,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}></div>
              ))}
            </div>

            {/* Scanner Beam / Dimension Shimmer */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent skew-x-[-20deg] animate-glimmer-scan"></div>
            </div>
          </div>
          <style>{`
                        @keyframes nebula-shift {
                            0% { background-position: 0% 0%; }
                            50% { background-position: 100% 100%; }
                            100% { background-position: 0% 0%; }
                        }
                        @keyframes float-nebula {
                            0%, 100% { transform: translate(0, 0) scale(1); }
                            50% { transform: translate(100px, 50px) scale(1.1); }
                        }
                        @keyframes float-nebula-slow {
                            0%, 100% { transform: translate(0, 0) scale(1); }
                            50% { transform: translate(-80px, -40px) scale(1.05); }
                        }
                        @keyframes float-star {
                            0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
                            50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
                        }
                        @keyframes glimmer-scan {
                            0% { left: -150%; }
                            100% { left: 150%; }
                        }
                        @keyframes mysterious-icon-pulse {
                            0%, 100% { transform: scale(1) rotate(0); filter: drop-shadow(0 0 2px rgba(168, 85, 247, 0.4)); }
                            50% { transform: scale(1.1) rotate(5deg); filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.8)); }
                        }

                        .animate-nebula-shift { background-size: 200% 200%; animation: nebula-shift 20s ease-in-out infinite; }
                        .animate-float-nebula { animation: float-nebula 25s ease-in-out infinite; }
                        .animate-float-nebula-slow { animation: float-nebula-slow 35s ease-in-out infinite; }
                        .animate-float-star { animation: float-star 8s ease-in-out infinite; }
                        .animate-glimmer-scan { animation: glimmer-scan 12s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

                        /* Global Ineffable Effects */
                        .mysterious-mode {
                            color: #f3e8ff !important;
                            text-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
                        }
                        .mysterious-mode .lucide {
                            animation: mysterious-icon-pulse 3s ease-in-out infinite;
                            color: #c084fc !important;
                        }
                        .mysterious-mode button {
                            background: rgba(88, 28, 135, 0.2) !important;
                            backdrop-filter: blur(12px) saturate(200%);
                            border-color: rgba(168, 85, 247, 0.3) !important;
                            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                        }
                        .mysterious-mode button:hover {
                            box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
                            transform: translateY(-2px);
                        }
                        .mysterious-mode .backdrop-blur-xl {
                            backdrop-filter: blur(24px) saturate(250%);
                            background-color: rgba(15, 23, 42, 0.4) !important;
                        }
                    `}</style>
        </React.Fragment>
      )}

      {/* World Mode 3D Globe Effects */}
      {worldMode && (
        <React.Fragment>
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-blue-950 to-black"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><circle cx=%2250%22 cy=%2250%22 r=%221%22 fill=%22white%22 opacity=%220.3%22/></svg>')] opacity-40"></div>
          </div>
          <style>{`
                        @keyframes rotate3d {
                            0% { transform: perspective(2000px) rotateY(0deg) rotateX(5deg); }
                            100% { transform: perspective(2000px) rotateY(360deg) rotateX(5deg); }
                        }
                        @keyframes spin-slow {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        .world-mode {
                            perspective: 2000px;
                            transform-style: preserve-3d;
                        }
                        .world-mode > * {
                            transform: perspective(2000px) rotateY(0deg) rotateX(5deg);
                            transform-style: preserve-3d;
                            border-radius: 50% !important;
                            box-shadow: 
                                inset 0 0 100px rgba(0, 100, 255, 0.3),
                                0 0 100px rgba(59, 130, 246, 0.5),
                                0 0 200px rgba(59, 130, 246, 0.3);
                            animation: rotate3d 60s linear infinite;
                            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
                        }
                        .animate-spin-slow {
                            animation: spin-slow 20s linear infinite;
                        }
                    `}</style>
        </React.Fragment>
      )}

      {/* Monsoon Wisdom Mode Effects */}
      {monsoonMode && (
        <React.Fragment>
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-opacity duration-1000">
            {/* Cinematic Deep Atmosphere */}
            <div className="absolute inset-0 bg-[#0f172a]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e1b4b] opacity-90 animate-sky-shift"></div>

            {/* Drifting Mist Clouds */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-[10%] left-[-20%] w-[60%] h-[40%] bg-blue-300/10 blur-[120px] rounded-full animate-mist-drift"></div>
              <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/10 blur-[150px] rounded-full animate-mist-drift-slow"></div>
            </div>

            {/* Rare Ethereal Lightning */}
            <div className="absolute inset-0 bg-white/5 opacity-0 animate-rare-lightning"></div>

            {/* Iconic Professional Analytics Grid */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-screen"
              style={{ backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
            </div>
            <div className="absolute inset-0 opacity-[0.02] mix-blend-screen"
              style={{ backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)', backgroundSize: '300px 300px' }}>
            </div>

            {/* High-Precision Floating Data Nodes */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div key={`node-${i}`} className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-node-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 2}s`
                }}></div>
              ))}
            </div>

            {/* Layered Rain System */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Background Rain (Thin & Slower) */}
              {[...Array(30)].map((_, i) => (
                <div key={`bg-rain-${i}`} className="absolute bg-white/10 w-[1px] h-12 animate-rain-drop" style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}></div>
              ))}

              {/* Foreground Rain (Larger & Faster) */}
              {[...Array(15)].map((_, i) => (
                <div key={`fg-rain-${i}`} className="absolute bg-white/20 w-[1.5px] h-32 animate-rain-drop" style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${1.5 + Math.random() * 1}s`,
                  filter: 'blur(0.5px)'
                }}></div>
              ))}
            </div>

            {/* Subtle Ground Ripples at the bottom */}
            <div className="absolute bottom-0 w-full h-[30vh] opacity-20 bg-gradient-to-t from-cyan-500/10 to-transparent">
              {[...Array(8)].map((_, i) => (
                <div key={`ripple-${i}`} className="absolute bottom-0 left-[50%] w-full h-8 animate-ripple" style={{
                  left: `${Math.random() * 100}%`,
                  width: `${100 + Math.random() * 200}px`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${4 + Math.random() * 3}s`
                }}></div>
              ))}
            </div>

            {/* High-Precision Technical Status Bar */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/10 overflow-hidden">
              <div className="w-1/3 h-full bg-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-status-slide"></div>
            </div>
          </div>
          <style>{`
            @keyframes sky-shift {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.05); opacity: 1; }
            }
            @keyframes rain-drop {
              0% { transform: translateY(-100px) skewX(-15deg); opacity: 0; }
              10% { opacity: 0.4; }
              90% { opacity: 0.4; }
              100% { transform: translateY(110vh) skewX(-15deg); opacity: 0; }
            }
            @keyframes mist-drift {
              0% { transform: translate(-20%, 0) scale(1); }
              50% { transform: translate(30%, 20%) scale(1.2); }
              100% { transform: translate(-20%, 0) scale(1); }
            }
            @keyframes mist-drift-slow {
              0% { transform: translate(0, 0) scale(1.1); }
              50% { transform: translate(-40%, -10%) scale(1); }
              100% { transform: translate(0, 0) scale(1.1); }
            }
            @keyframes ripple {
               0% { transform: scaleX(0.5) scaleY(0.2); opacity: 0; border-top: 1px solid white; }
               50% { opacity: 0.3; }
               100% { transform: scaleX(2) scaleY(1); opacity: 0; border-top: 1px solid white; }
            }
            @keyframes rare-lightning {
               0%, 94%, 96%, 100% { opacity: 0; }
               95%, 97% { opacity: 1; }
            }
            
            @keyframes status-slide {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(300%); }
            }
            @keyframes node-pulse {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              50% { transform: scale(2.5); opacity: 1; }
            }
            @keyframes iconic-faint-glow {
              0%, 100% { filter: drop-shadow(0 0 2px rgba(56, 189, 248, 0.2)); }
              50% { filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.5)); }
            }
            
            .animate-sky-shift { animation: sky-shift 30s ease-in-out infinite; }
            .animate-rain-drop { animation: rain-drop linear infinite; }
            .animate-mist-drift { animation: mist-drift 40s ease-in-out infinite; }
            .animate-mist-drift-slow { animation: mist-drift-slow 60s ease-in-out infinite; }
            .animate-node-pulse { animation: node-pulse 8s ease-in-out infinite; }
            .animate-status-slide { animation: status-slide 6s linear infinite; }
            .animate-ripple { animation: ripple ease-out infinite; border-radius: 50%; }
            .animate-rare-lightning { animation: rare-lightning 15s linear infinite; }

            .monsoon-mode {
              color: #e2e8f0 !important;
              transition: all 1s ease-in-out;
            }
            .monsoon-mode .backdrop-blur-xl {
              backdrop-filter: blur(28px) saturate(180%);
              background-color: rgba(15, 23, 42, 0.5) !important;
              border-color: rgba(56, 189, 248, 0.15) !important;
              position: relative;
            }
            /* Precision Card Corner Markers */
            .monsoon-mode .backdrop-blur-xl::before {
              content: ''; position: absolute; top: 0; left: 0; width: 10px; height: 10px;
              border-top: 1px solid rgba(56, 189, 248, 0.4); border-left: 1px solid rgba(56, 189, 248, 0.4);
            }
            .monsoon-mode .backdrop-blur-xl::after {
              content: ''; position: absolute; bottom: 0; right: 0; width: 10px; height: 10px;
              border-bottom: 1px solid rgba(56, 189, 248, 0.4); border-right: 1px solid rgba(56, 189, 248, 0.4);
            }

            .monsoon-mode button {
              border-radius: 4px !important;
              background: rgba(30, 41, 59, 0.5) !important;
              border: 1px solid rgba(148, 163, 184, 0.3) !important;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              font-size: 0.75rem;
              font-weight: 600;
              transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .monsoon-mode button:hover {
              background: rgba(56, 189, 248, 0.2) !important;
              border-color: rgba(56, 189, 248, 0.8) !important;
              box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
            }
            .monsoon-mode .theme-active-bg {
               background: transparent !important;
            }
            /* Iconic Icon Profile */
            .monsoon-mode .lucide {
              color: #38bdf8 !important;
              animation: iconic-faint-glow 4s ease-in-out infinite;
              stroke-width: 1.5px;
            }
            /* Softened cards with rain-glass effect */
            .monsoon-mode [class*="Card"], 
            .monsoon-mode [class*="Panel"] {
              background: rgba(15, 23, 42, 0.35) !important;
              backdrop-filter: blur(16px) !important;
              border: 1px solid rgba(255, 255, 255, 0.03) !important;
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
            }
            .monsoon-mode * {
              text-shadow: none !important;
              font-family: 'Inter', sans-serif !important;
                      `}</style>
        </React.Fragment>
      )}

      {children}
    </div>
  )
}

export default AppLayout

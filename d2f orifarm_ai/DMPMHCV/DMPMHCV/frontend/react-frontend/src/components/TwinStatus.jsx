import React, { useState } from 'react'
import {
  Activity,
  Layers,
  Globe,
  Smartphone,
  ArrowRight,
  Sun,
  Moon,
  Command,
  LayoutDashboard,
  Eye,
  Waves,
  CloudRain,
  Tablet as TabletIcon,
  Monitor,
  X,
  Cpu,
  ShieldCheck,
  Zap,
  Lock,
  Hexagon,
  Radar,
  Workflow
} from 'lucide-react'
import { useMobileView } from '../context/MobileViewContext'
import IntelligenceCard from './legendary/IntelligenceCard'
import CommandButton from './legendary/CommandButton'
import StatusBadge from './legendary/StatusBadge'
import LegendaryIcon from './legendary/LegendaryIcon'

const TwinStatus = ({ emotionalState, decisionReadiness, t, isDarkMode, toggleTheme }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showViewSelector, setShowViewSelector] = useState(false)
  const {
    viewMode,
    setMobile,
    setTablet,
    mysteriousMode,
    toggleMysterious,
    worldMode,
    toggleWorld,
    seaMode,
    toggleSea,
    monsoonMode,
    toggleMonsoon
  } = useMobileView()

  return (
    <div
      className={`fixed transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-[100] ${isExpanded
        ? 'inset-0 bg-[#020617]/95 backdrop-blur-[60px] flex items-center justify-center p-6'
        : 'bottom-10 left-1/2 -translate-x-1/2'}`}
      onClick={() => isExpanded && setIsExpanded(false)}
    >
      {/* Neural Core Trigger (FAB) */}
      {!isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(true);
          }}
          className="group relative w-16 h-16 flex items-center justify-center transition-all duration-700 hover:scale-110 active:scale-95"
        >
          {/* Tactical Base */}
          <div className={`absolute inset-0 rounded-2xl border transition-all duration-500 ${isDarkMode ? 'bg-nature-deep border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] group-hover:border-white/20' : 'bg-nature-deep border-nature-deep/10 shadow-[0_20px_40px_rgba(26,46,34,0.1)] group-hover:border-nature-deep/20'}`} />

          <div className="relative z-10 text-white">
            <LegendaryIcon icon={Hexagon} variant="neon" color="nature" size={28} className="group-hover:rotate-180 transition-transform duration-1000" />
          </div>

          {/* Alert Status */}
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-harvest-gold shadow-[0_0_12px_rgba(182,141,64,0.6)] animate-pulse" />
        </button>
      )}

      {/* Expanded Control Matrix */}
      {isExpanded && (
        <div
          className="relative w-full max-w-7xl animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <IntelligenceCard
            title="Farm Intelligence Hub"
            subtitle="Centralized Farm Management System"
            depth="command"
            glow={true}
            className="overflow-visible"
            isDarkMode={isDarkMode}
          >
            {/* Header Controls */}
            <div className="absolute top-8 right-8 flex items-center gap-4 z-20">
              <StatusBadge type="security" value="SECURE" status="active" />
              <button
                onClick={() => setIsExpanded(false)}
                className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-12">
              {/* Strategic Command Panel (Left) */}
              <div className="lg:col-span-4 space-y-12">
                <div className="space-y-8">
                  <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-lg transition-colors ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-nature-deep/5 border-nature-deep/5 text-nature-deep'}`}>
                    <LegendaryIcon icon={Layers} variant="neon" color="nature" size={28} />
                  </div>
                  <h2 className={`command-headline text-6xl tracking-tight leading-none uppercase ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                    Intelligence <span className="opacity-40">Hub</span>
                  </h2>
                  <p className={`system-body text-lg leading-relaxed font-medium ${isDarkMode ? 'text-white/60' : 'text-nature-deep/60'}`}>
                    Managing farm data and sensors. System status: <span className="text-nature-medium italic">OPTIMIZED</span>.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-nature-deep/5 border-nature-deep/5'}`}>
                    <div className={`mono-metadata text-[8px] opacity-40 mb-2 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Efficiency</div>
                    <div className="command-headline text-xl text-nature-medium">99.8%</div>
                  </div>
                  <div className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-nature-deep/5 border-nature-deep/5'}`}>
                    <div className={`mono-metadata text-[8px] opacity-40 mb-2 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Speed</div>
                    <div className="command-headline text-xl text-trust-blue">4ms</div>
                  </div>
                </div>

                <CommandButton
                  variant="intelligence"
                  icon={Workflow}
                  className="w-full"
                >
                  Refresh Data
                </CommandButton>
              </div>

              {/* Logic Mesh Nodes (Center) */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Zap, label: 'Crop Data', sub: 'Processing', color: 'nature' },
                  { icon: Globe, label: 'Environment', sub: 'Sync', color: 'trust' },
                  { icon: Radar, label: 'Field Analysis', sub: 'Geospatial', color: 'harvest' },
                  { icon: Hexagon, label: 'AI Core', sub: 'Engine', color: 'nature' }
                ].map((item, i) => (
                  <div key={i} className={`group relative p-8 rounded-[2rem] border transition-all duration-700 text-left ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-nature-deep/5 border-nature-deep/5 hover:border-nature-deep/10'}`}>
                    <div className={`p-4 rounded-xl border transition-all duration-700 mb-6 ${isDarkMode ? 'bg-black/20 border-white/10 group-hover:border-white/30' : 'bg-white border-nature-deep/10 group-hover:border-nature-deep/20'}`}>
                      <LegendaryIcon icon={item.icon} variant="neon" color={item.color} size={24} />
                    </div>
                    <h4 className="command-headline text-xs tracking-widest uppercase mb-2">{item.label}</h4>
                    <div className="mono-metadata text-[8px] opacity-40 italic">{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* Command Controls (Right) */}
              <div className="lg:col-span-3 space-y-4">
                <div className="p-8 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h3 className="mono-metadata text-[8px] opacity-40 mb-8 uppercase">Device View</h3>
                  <div className="flex flex-col gap-2">
                    {[{ label: 'Desktop', icon: Monitor, action: () => { setMobile(false); setTablet(false) } }, { label: 'Tablet', icon: TabletIcon, action: () => { setTablet(true); setMobile(false) } }, { label: 'Mobile', icon: Smartphone, action: () => { setMobile(true); setTablet(false) } }].map((device, idx) => (
                      <button
                        key={idx}
                        onClick={device.action}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.03] hover:bg-white text-white/40 hover:text-black transition-all duration-500 mono-metadata text-[9px]"
                      >
                        <div className="flex items-center gap-3">
                          <device.icon size={14} strokeWidth={1.5} />
                          {device.label}
                        </div>
                        <ArrowRight size={12} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-8 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <h3 className="mono-metadata text-[8px] opacity-40 mb-8 uppercase">Theme</h3>
                  <CommandButton
                    onClick={toggleTheme}
                    variant="secondary"
                    className="w-full py-4 text-[9px]"
                    isDarkMode={isDarkMode}
                  >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </CommandButton>
                </div>
              </div>
            </div>

            {/* Inactive System Layers (Legacy) */}
            <div className="mt-16 pt-12 border-t border-white/[0.03] flex flex-wrap gap-3 items-center justify-center">
              {[{ label: 'Default', icon: LayoutDashboard, active: !mysteriousMode && !worldMode && !seaMode && !monsoonMode },
              { label: 'Detailed', icon: Eye, active: mysteriousMode, action: toggleMysterious },
              { label: 'Map View', icon: Globe, active: worldMode, action: toggleWorld },
              { label: 'Water View', icon: Waves, active: seaMode, action: toggleSea },
              { label: 'Weather View', icon: CloudRain, active: monsoonMode, action: toggleMonsoon }
              ].map((mode, idx) => (
                <button
                  key={idx}
                  onClick={mode.action}
                  className={`flex items-center gap-3 px-5 py-2 rounded-lg mono-metadata text-[8px] transition-all ${mode.active
                    ? 'bg-white text-black'
                    : 'bg-white/[0.02] text-white/40 hover:bg-white/[0.05]'
                    }`}
                >
                  <mode.icon size={12} strokeWidth={1} />
                  {mode.label}
                </button>
              ))}
            </div>
          </IntelligenceCard>
        </div>
      )}
    </div>
  )
}

export default TwinStatus

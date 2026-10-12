import React, { useState, useEffect } from 'react'
import BackButton from './BackButton'
import { Brain, MessageSquare, Eye, Sparkles, CloudRain, TrendingUp, CircleDollarSign, Bug, Cpu, Activity, Zap, Share2, Globe, Shield } from 'lucide-react'

const TwinIntelligencePage = ({ onBack, isDarkMode }) => {
  const [activeModule, setActiveModule] = useState(null)
  const [systemPulse, setSystemPulse] = useState(0)

  // Simulation of "System Pulse"
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemPulse(Math.floor(Math.random() * 30) + 70) // 70-100%
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const BentoCard = ({ title, icon: Icon, children, className, delay, color = "cyber-indigo" }) => (
    <div
      className={`relative group overflow-hidden rounded-xl p-10 transition-all duration-700 ${isDarkMode ? 'bg-obsidian-panel border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)]' : 'bg-white border-nature-deep/10 shadow-[0_20px_50px_rgba(26,46,34,0.08)]'} hover:border-white/20 ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Sovereign Interaction Layer */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-10">
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] text-white/40 group-hover:text-platinum-pure group-hover:border-white/20 transition-all duration-700">
            <Icon size={24} strokeWidth={1} />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
            <div className="mono-metadata text-[8px] opacity-40 uppercase">Operational</div>
          </div>
        </div>

        <h3 className="command-headline text-2xl tracking-tight mb-4 uppercase">
          {title}
        </h3>

        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden bg-obsidian-base font-sans selection:bg-cyber-blue/30">
      {/* Sovereign Atmosphere Background inherited from AppLayout */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:px-12">
        {/* Sovereign Command Header */}
        <div className="flex items-center justify-between mb-24 animate-slide-down">
          <BackButton />
          <div className="flex items-center gap-6">
            <div className="mono-metadata text-[10px] opacity-40">System Pulse:</div>
            <div className="px-6 py-2 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
              <Activity size={14} className="text-cyber-green animate-pulse" />
              <span className="command-headline text-base italic">{systemPulse}% LOAD</span>
            </div>
          </div>
        </div>

        {/* Hero Area */}
        <div className="mb-32 animate-fade-in text-center max-w-4xl mx-auto">
          <div className="mono-metadata text-cyber-blue mb-6 flex items-center justify-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Neural Architecture Matrix
          </div>
          <h1 className="command-headline text-7xl lg:text-9xl mb-10 uppercase tracking-tighter">
            INTELLIGENCE <br /><span className="opacity-40">NUCLEUS</span>
          </h1>
          <p className="system-body text-xl opacity-60 leading-relaxed font-medium">
            Strategic visualization of distributed neural architecture, real-time sentiment processing, and clinical forecasting models.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-6 mb-12">

          {/* Card 1: Emotional Intelligence (Large) */}
          <BentoCard
            title="Sovereign Sentiment"
            icon={Brain}
            className="md:col-span-4 lg:col-span-2 row-span-2 min-h-[450px]"
            delay={100}
            color="cyber-blue"
          >
            <p className="system-body text-lg text-platinum-text opacity-60 leading-relaxed mb-10">
              High-resolution cognitive analysis utilizing the GPT-4o-Sovereign engine to decode mission-critical emotional context.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {[
                { label: 'Empathy Integrity', value: '99.8%', icon: Activity, color: 'cyber-green' },
                { label: 'Context Horizon', value: '128k Tokens', icon: Share2, color: 'cyber-blue' },
                { label: 'Logic Latency', value: '12ms', icon: Zap, color: 'cyber-amber' }
              ].map((stat, i) => (
                <div key={i} className={`flex items-center justify-between p-6 rounded-lg border transition-all duration-700 hover:border-white/10 group/stat ${isDarkMode ? 'bg-[#050508]/40 border-white/[0.03]' : 'bg-slate-50 border-slate-200 shadow-inner'}`}>
                  <div className="flex items-center gap-4">
                    <stat.icon size={16} className={`text-${stat.color} opacity-40 group-hover/stat:opacity-100 transition-opacity`} />
                    <span className="mono-metadata text-[10px] opacity-40">{stat.label}</span>
                  </div>
                  <span className={`command-headline text-lg italic ${isDarkMode ? '' : 'text-nature-deep'}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Card 2: NLP */}
          <BentoCard
            title="Linguistic Bridge"
            icon={MessageSquare}
            className="md:col-span-3 lg:col-span-1 min-h-[280px]"
            delay={200}
            color="cyber-green"
          >
            <div className="flex flex-wrap gap-2 mb-8">
              {['English', 'Hindi', 'Tamil'].map(lang => (
                <span key={lang} className="px-3 py-1 rounded-md bg-white/[0.02] border border-white/[0.05] mono-metadata text-[8px] opacity-40 group-hover:opacity-100 transition-opacity">
                  {lang}
                </span>
              ))}
            </div>
            <p className="system-body text-xs text-platinum-text opacity-40 leading-relaxed font-medium">
              Geospatial language adaptability and cultural logic synthesis.
            </p>
          </BentoCard>

          {/* Card 3: Computer Vision (Medium) */}
          <BentoCard
            title="Vision Cortex"
            icon={Eye}
            className="md:col-span-3 lg:col-span-1 min-h-[280px]"
            delay={300}
            color="cyber-blue"
          >
            <div className={`mt-4 relative h-32 w-full rounded-lg overflow-hidden border group-hover:border-cyber-blue/40 transition-colors ${isDarkMode ? 'bg-[#050508] border-white/[0.05]' : 'bg-slate-50 border-slate-200 shadow-inner'}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border border-cyber-blue/40 rounded-lg flex items-center justify-center animate-pulse">
                  <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full" />
                </div>
                <div className="absolute w-[120%] h-px bg-cyber-blue/20 animate-scan" />
              </div>
              <div className="absolute bottom-4 left-4 mono-metadata text-[6px] text-cyber-blue opacity-40">VISUAL_INPUT_ACTIVE</div>
            </div>
          </BentoCard>

          {/* Card 4: Predictive Analytics (Wide) */}
          <BentoCard
            title="Predictive Logic"
            icon={Sparkles}
            className="md:col-span-6 lg:col-span-2 min-h-[350px]"
            delay={400}
            color="cyber-blue"
          >
            <div className="grid grid-cols-2 gap-3 mt-10">
              {[
                { title: 'Yield Forecast', icon: TrendingUp, val: '+12%', color: 'cyber-green' },
                { title: 'Market Sentiment', icon: CircleDollarSign, val: '↗ BULLISH', color: 'cyber-blue' },
                { title: 'Weather Risk', icon: CloudRain, val: 'MINIMAL', color: 'cyber-indigo' },
                { title: 'Security Perimeter', icon: Shield, val: 'SHIELDED', color: 'cyber-rose' }
              ].map((item, i) => (
                <div key={i} className={`p-6 rounded-lg border text-left transition-all duration-700 hover:border-white/10 ${isDarkMode ? 'bg-[#050508]/40 border-white/[0.03]' : 'bg-slate-50 border-slate-200 shadow-inner'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon className={`text-${item.color} opacity-40`} size={12} />
                    <span className="mono-metadata text-[8px] opacity-40 uppercase tracking-widest">{item.title}</span>
                  </div>
                  <div className={`command-headline text-lg italic ${isDarkMode ? '' : 'text-nature-deep'}`}>{item.val}</div>
                </div>
              ))}
            </div>
          </BentoCard>

        </div>

        {/* Footer Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-40 pt-20 border-t border-white/[0.03]">
          {[
            { label: 'Neural Nodes', value: '4,200+', color: 'cyber-blue' },
            { label: 'Data Points', value: '12M+', color: 'cyber-indigo' },
            { label: 'System Uptime', value: '99.99%', color: 'cyber-green' },
            { label: 'Encryption', value: 'AES-256', color: 'cyber-rose' }
          ].map((metric, i) => (
            <div key={i} className="text-left px-8 border-l border-white/5 first:border-0">
              <div className="mono-metadata text-[8px] opacity-40 uppercase mb-4 tracking-[0.4em]">{metric.label}</div>
              <div className="command-headline text-3xl italic tracking-tight">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-50px); }
          100% { transform: translateY(50px); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}

export default TwinIntelligencePage

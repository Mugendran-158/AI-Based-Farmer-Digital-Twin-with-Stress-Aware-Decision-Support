import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, Sprout, Mic, Layers, Zap, Globe, Smartphone, ShieldCheck, ArrowRight, Activity, Database, Waves } from 'lucide-react'

const Navigation = ({ t, isDarkMode }) => {
  const navigate = useNavigate()

  const subsystemNodes = [
    { icon: Bot, label: t('nav.aiAssistant') || 'AI Assistant', path: '/ai-farmer', color: 'var(--nature-medium)' },
    { icon: Layers, label: t('nav.cropAnalysis') || 'Crop Analysis', path: '/crop-analyzer', color: 'var(--trust-blue)' },
    { icon: Globe, label: t('nav.smartWorld') || 'Smart World', path: '/smart-agriculture', color: 'var(--harvest-gold)' },
    { icon: ShieldCheck, label: t('nav.safetyTwin') || 'Safety', path: '/safety-twin', color: 'var(--nature-medium)' }
  ]

  return (
    <div className="px-8 pb-32 pt-20 relative overflow-hidden">

      {/* Background Atmosphere */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-nature-medium/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Institutional Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className={`p-5 rounded-[1.8rem] border transition-all duration-1000 ${isDarkMode ? 'bg-[#0F0F0F] border-white/10 text-trust-blue shadow-2xl' : 'bg-white border-slate-100 text-trust-blue shadow-xl shadow-trust-blue/5'}`}>
                <Layers size={32} strokeWidth={1} className="animate-pulse" />
              </div>
              <div>
                <h2 className={`text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                  Farming <span className="opacity-30 italic font-light">Tools</span>
                </h2>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-2 h-2 rounded-full bg-nature-medium animate-pulse shadow-[0_0_10px_rgba(76,107,79,0.5)]" />
                  <span className={`text-[11px] font-black uppercase tracking-[0.4em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Integrated System</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`hidden lg:block h-px flex-grow mx-16 transition-all duration-1000 ${isDarkMode ? 'bg-gradient-to-r from-transparent via-white/5 to-transparent' : 'bg-gradient-to-r from-transparent via-nature-deep/10 to-transparent'}`} />

          <div className="flex items-center gap-6">
            <div className={`px-8 py-5 rounded-[2.5rem] border flex items-center gap-6 backdrop-blur-3xl transition-all duration-1000 ${isDarkMode ? 'bg-[#0F0F0F]/60 border-white/10 shadow-2xl' : 'bg-white/80 border-slate-100 shadow-xl'}`}>
              <div className="flex -space-x-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-4 transition-all duration-700 hover:scale-125 hover:z-10 flex items-center justify-center ${isDarkMode ? 'border-[#0B1120] bg-nature-medium/20 text-nature-medium' : 'border-white bg-nature-medium/10 text-nature-medium'}`}>
                    <Sprout size={16} strokeWidth={2.5} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Tools Ready</span>
                <span className="text-[9px] font-bold text-nature-medium uppercase tracking-widest mt-1">System Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch">

          {/* Growth Nucleus - Monolithic Control Hub */}
          <div
            onClick={() => navigate('/ai-farmer')}
            className={`p-16 rounded-[4.5rem] relative overflow-hidden group transition-all duration-[1.5s] flex flex-col justify-between border shadow-[0_40px_100px_rgba(0,0,0,0.4)] cursor-pointer ${isDarkMode
              ? 'bg-[#0F0F0F]/80 border-white/5 hover:border-nature-medium/40'
              : 'bg-white border-slate-100 hover:shadow-nature-deep/10 hover:border-nature-medium/20'}`}
          >

            {/* Inset Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(76,107,79,0.08)_0%,transparent_70%)] pointer-events-none transition-opacity duration-1000 group-hover:opacity-100" />
            <div className="absolute bottom-0 right-0 p-16 opacity-5 pointer-events-none transition-transform duration-[2s] group-hover:scale-150">
              <Bot size={240} strokeWidth={0.5} />
            </div>

            <div className="relative z-10">
              <div className={`w-32 h-32 rounded-[3.5rem] flex items-center justify-center mb-16 transition-all duration-1000 group-hover:rotate-[15deg] group-hover:scale-110 shadow-2xl ${isDarkMode ? 'bg-nature-medium text-white shadow-nature-medium/20' : 'bg-nature-deep text-white shadow-nature-deep/20'}`}>
                <Layers size={56} strokeWidth={1} />
              </div>
              <h3 className={`text-6xl font-black tracking-tighter mb-10 leading-none uppercase ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Main <br /><span className="opacity-30">Dashboard</span></h3>
              <p className={`text-xl leading-[1.8] mb-20 font-bold opacity-40 max-w-lg ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                Your central hub for farm management, crop analysis, and safety monitoring.
              </p>
            </div>

            <div className={`w-full py-10 rounded-[3rem] text-[13px] font-black uppercase tracking-[0.7em] transition-all duration-1000 flex items-center justify-center gap-8 shadow-2xl ${isDarkMode
              ? 'bg-nature-medium text-white group-hover:bg-nature-light group-hover:text-nature-deep'
              : 'bg-nature-deep text-white group-hover:bg-nature-medium'}`}
            >
              Sync Information <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-3 transition-transform duration-700" />
            </div>
          </div>

          {/* Institutional Visualization Matrix */}
          <div className="relative flex items-center justify-center min-h-[600px] group/viz">
            {/* Massive Natural Aura */}
            <div className="absolute w-full h-full max-w-[700px] max-h-[700px] blur-[200px] opacity-20 transition-all duration-[4s] bg-gradient-to-tr from-nature-medium via-trust-blue to-harvest-gold animate-[pulse_15s_infinite]" />

            <div className={`relative w-full max-w-[700px] aspect-square rounded-[8rem] border p-12 flex items-center justify-center overflow-hidden transition-all duration-[2s] ${isDarkMode ? 'bg-[#0F0F0F]/60 backdrop-blur-[60px] border-white/5 shadow-2xl' : 'bg-white/40 backdrop-blur-[60px] border-white'}`}>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(76,107,79,0.05),transparent_70%)]" />

              {/* Grid System for Visual Complexity */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--nature-medium) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

              <div className="relative z-20 grid grid-cols-2 gap-12 w-full max-w-2xl px-8">
                {[
                  { icon: Activity, label: 'Health', sub: 'Crops', color: 'var(--nature-medium)', path: '/crop-analyzer' },
                  { icon: Waves, label: 'Resources', sub: 'Water', color: 'var(--trust-blue)', path: '/smart-agriculture' },
                  { icon: Database, label: 'Records', sub: 'Farm Data', color: 'var(--harvest-gold)', path: '/twin-intelligence' },
                  { icon: ShieldCheck, label: 'Safety', sub: 'Security', color: 'var(--nature-medium)', path: '/safety-twin' }
                ].map((mod, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(mod.path)}
                    className={`group/item p-12 rounded-[4.5rem] border transition-all duration-1000 relative overflow-hidden cursor-pointer flex flex-col items-center gap-10 ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:border-nature-medium/40' : 'bg-white border-slate-100 hover:shadow-2xl hover:-translate-y-4 hover:border-nature-medium/40 shadow-xl shadow-nature-deep/5'}`}>

                    <div className="absolute top-[-30%] right-[-30%] w-48 h-48 blur-[80px] opacity-0 group-hover/item:opacity-20 transition-opacity duration-1000 pointer-events-none" style={{ backgroundColor: mod.color }} />

                    <div className={`p-8 rounded-[2.5rem] transition-all duration-1000 group-hover/item:scale-125 group-hover/item:rotate-12 shadow-2xl ${isDarkMode ? 'bg-[#0F0F0F] text-nature-medium border border-white/5' : 'bg-slate-50 text-nature-deep border border-slate-100 shadow-inner'}`}>
                      <mod.icon size={44} strokeWidth={1} />
                    </div>

                    <div className="text-center">
                      <span className={`text-[16px] font-black uppercase tracking-[0.6em] block mb-4 transition-colors duration-700 ${isDarkMode ? 'text-white group-hover/item:text-nature-medium' : 'text-nature-deep'}`}>{mod.label}</span>
                      <div className="h-0.5 w-10 mx-auto bg-nature-medium opacity-20 my-3 group-hover/item:w-20 transition-all duration-1000" />
                      <span className={`text-[11px] font-bold uppercase tracking-[0.4em] opacity-30 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>{mod.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Background Rotation */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.02] scale-150">
                <Globe size={600} strokeWidth={0.5} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_180s_linear_infinite]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation

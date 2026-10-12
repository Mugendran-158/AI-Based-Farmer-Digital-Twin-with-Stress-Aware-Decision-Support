import React from 'react'
import { Smile } from 'lucide-react'

const StressOverlay = ({ onContinue, t, isDarkMode }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-[#050508]/60 backdrop-blur-[60px] transition-all duration-[1500ms] animate-in fade-in">
      <div className={`relative rounded-[4rem] p-16 max-w-xl w-full text-center border shadow-[0_40px_100px_rgba(0,0,0,0.6)] transition-all duration-1000 animate-scale-in ${isDarkMode ? 'bg-[#0F0F0F]/80 border-white/5' : 'bg-white/90 border-slate-100'}`}>

        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-nature-medium to-transparent opacity-40`} />

        {/* Institutional Status Hub */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full bg-nature-medium/20 animate-ping duration-[3000ms]`} />
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center border transition-all duration-700 ${isDarkMode ? 'bg-[#050508] border-white/10 shadow-[0_0_30px_rgba(76,107,79,0.3)]' : 'bg-white border-nature-medium/10 shadow-[0_0_30px_rgba(76,107,79,0.1)]'}`}>
              <Smile size={48} className="text-nature-medium transition-transform hover:scale-110 duration-700" strokeWidth={1} />
            </div>
          </div>
        </div>

        <h2 className={`text-4xl font-black uppercase tracking-tight mb-8 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
          {t('pauseMoment') || 'Neural Sync'} <span className="opacity-30 font-light">Momentum</span>
        </h2>

        <p className={`text-base font-bold leading-relaxed mb-12 max-w-sm mx-auto ${isDarkMode ? 'text-white/60' : 'text-nature-deep/60'}`}>
          {t('highStress') || 'Biological indicators suggest a period of elevated intensity.'}
          <span className="block mt-4 opacity-40 text-[10px] font-black uppercase tracking-widest">{t('calmStep') || 'Recalibrating for decision precision.'}</span>
        </p>

        <button
          className={`w-full py-8 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-[12px] transition-all duration-1000 shadow-2xl active:scale-95 ${isDarkMode ? 'bg-nature-medium text-white hover:bg-nature-light hover:text-nature-deep' : 'bg-nature-deep text-white hover:bg-nature-medium shadow-nature-deep/20'}`}
          onClick={onContinue}
        >
          {t('continueCalmly') || 'Initialize Resume Protocol'}
        </button>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 opacity-20">
            <div className={`w-1.5 h-1.5 rounded-full bg-nature-medium animate-pulse`} />
            <span className={`text-[9px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Institutional Safety Layer v4.0</span>
          </div>
          <div className={`h-px w-20 ${isDarkMode ? 'bg-white/5' : 'bg-nature-deep/5'}`} />
        </div>
      </div>
    </div>
  )
}

export default StressOverlay

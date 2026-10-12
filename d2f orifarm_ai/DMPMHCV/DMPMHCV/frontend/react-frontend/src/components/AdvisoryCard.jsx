import React from 'react'
import { Lightbulb, HelpCircle } from 'lucide-react'

const AdvisoryCard = ({ text, onConfirm, onAskMore, t, isDarkMode }) => {
  return (
    <div className={`rounded-[3.5rem] p-10 mx-6 mb-12 border backdrop-blur-3xl transition-all duration-500 animate-slide-up shadow-2xl ${isDarkMode ? 'bg-[#0F0F0F]/80 border-white/5 shadow-black/80' : 'bg-white/80 border-slate-100 shadow-slate-200'}`}>
      <div className="flex items-center justify-between mb-10">
        <h2 className={`text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-4 ${isDarkMode ? 'text-white/60' : 'text-nature-deep/60'}`}>
          <div className={`p-3.5 rounded-2xl transition-all duration-700 ${isDarkMode ? 'bg-harvest-gold/10 text-harvest-gold border border-harvest-gold/20' : 'bg-harvest-gold/5 text-harvest-gold border border-harvest-gold/10'}`}>
            <Lightbulb size={20} strokeWidth={1.5} className="animate-pulse" />
          </div>
          <span>{t('suggestedGuidance') || 'Strategic Advisory Nucleus'}</span>
        </h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-nature-medium animate-[pulse_2s_infinite]" />
            <span className={`text-[9px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Institutional Grade</span>
          </div>
        </div>
      </div>

      <div className={`p-10 rounded-[2.5rem] border-l-4 mb-10 transition-all duration-700 ${isDarkMode ? 'bg-white/[0.02] border-harvest-gold/50 shadow-inner' : 'bg-slate-50 border-harvest-gold shadow-sm'}`}>
        <div className={`text-xl font-bold leading-relaxed tracking-tight ${isDarkMode ? 'text-white/90' : 'text-nature-deep'}`}>
          {text}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          className={`px-10 py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-700 active:scale-95 shadow-xl ${isDarkMode ? 'bg-nature-medium text-white hover:bg-nature-light hover:text-nature-deep' : 'bg-nature-deep text-white hover:bg-nature-medium shadow-nature-deep/20'}`}
          onClick={onConfirm}
        >
          {t('iUnderstand') || 'Execute Directive'}
        </button>

        {onAskMore && (
          <button
            className={`px-10 py-6 rounded-2xl border font-black uppercase tracking-[0.4em] text-[11px] transition-all duration-700 flex items-center justify-center gap-4 active:scale-95 ${isDarkMode ? 'bg-white/[0.03] border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20' : 'bg-transparent border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-nature-deep hover:border-nature-deep/20'}`}
            onClick={onAskMore}
          >
            <HelpCircle size={18} strokeWidth={1.5} />
            <span>{t('askMoreQuestions') || 'Deep Inquiry'}</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default AdvisoryCard

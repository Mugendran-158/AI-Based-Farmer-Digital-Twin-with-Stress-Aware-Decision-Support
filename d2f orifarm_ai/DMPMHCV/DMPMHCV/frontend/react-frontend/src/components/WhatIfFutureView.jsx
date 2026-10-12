import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ArrowLeft, Play, Clock, Sparkles, Loader2, AlertCircle } from 'lucide-react'

function WhatIfFutureView({ decision, context, language, stressLevel, onBack, onContinue, t, isDarkMode }) {
    const [whatIfData, setWhatIfData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch What-If view on component mount
    useEffect(() => {
        const fetchWhatIf = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const response = await fetch('/api/what-if-view', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        decision: decision,
                        context: context,
                        language: language,
                        stress_level: stressLevel
                    })
                })

                if (response.ok) {
                    const data = await response.json()
                    setWhatIfData(data)
                } else {
                    const errorData = await response.json()
                    setError(errorData.error || 'Failed to load What-If view')
                }
            } catch (err) {
                console.error('Error fetching What-If view:', err)
                setError('Unable to connect to the server. Please check your institutional connection.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchWhatIf()
    }, [decision, context, language, stressLevel])

    if (isLoading) {
        return (
            <div className={`min-h-[80vh] flex items-center justify-center p-6 ${isDarkMode ? 'bg-[#050505]/40' : 'bg-nature-deep/5'} rounded-[3rem] backdrop-blur-3xl m-4`}>
                <div className="text-center">
                    <div className="relative mb-8">
                        <div className="absolute inset-0 rounded-full bg-nature-medium/20 animate-ping" />
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center border ${isDarkMode ? 'bg-nature-deep border-white/10' : 'bg-white border-nature-deep/10 shadow-xl'}`}>
                            <Loader2 size={40} className="text-nature-medium animate-spin" strokeWidth={1.5} />
                        </div>
                    </div>
                    <p className={`text-xs font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/60' : 'text-nature-deep/60'}`}>
                        {language === 'ta' ? 'வருங்காலத்தை பகுப்பாய்வு செய்கிறது...' : 'Synthesizing Proportional Projections...'}
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={`min-h-[80vh] flex items-center justify-center p-6 ${isDarkMode ? 'bg-[#050505]/40' : 'bg-nature-deep/5'} rounded-[3rem] backdrop-blur-3xl m-4`}>
                <div className={`relative rounded-[2.5rem] p-12 max-w-lg w-full text-center border shadow-2xl ${isDarkMode ? 'bg-nature-deep/80 border-white/5' : 'bg-white border-nature-deep/5'}`}>
                    <div className="flex justify-center mb-8">
                        <div className="p-4 rounded-2xl bg-earth-rose/10 text-earth-rose">
                            <AlertCircle size={40} strokeWidth={1.5} />
                        </div>
                    </div>
                    <p className={`text-base font-bold mb-10 ${isDarkMode ? 'text-white/90' : 'text-nature-deep'}`}>{error}</p>
                    <button
                        onClick={onBack}
                        className="w-full py-4 rounded-2xl bg-nature-medium hover:bg-nature-deep text-white text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-xl active:scale-95"
                    >
                        {t('common.back') || 'Return to Nucleus'}
                    </button>
                </div>
            </div>
        )
    }

    if (!whatIfData) return null

    return (
        <div className={`p-6 md:p-12 space-y-12 animate-in fade-in duration-[1500ms]`}>
            {/* Institutional Header */}
            <div className={`relative rounded-[4rem] p-12 md:p-20 border backdrop-blur-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] transition-all duration-1000 ${isDarkMode ? 'bg-[#0F0F0F]/60 border-white/5 shadow-black/80' : 'bg-white/80 border-slate-100 shadow-slate-200'}`}>

                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Sparkles size={120} strokeWidth={0.5} className="animate-pulse" />
                </div>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 relative z-10">
                    <div className="flex flex-col gap-6">
                        <div className={`inline-flex items-center gap-4 px-6 py-2.5 rounded-2xl border transition-all duration-700 ${isDarkMode ? 'bg-trust-blue/10 border-trust-blue/30 text-trust-blue' : 'bg-trust-blue/5 border-trust-blue/20 text-trust-blue'}`}>
                            <Activity size={18} strokeWidth={2.5} className="animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{language === 'ta' ? 'வருங்கால கணிப்புகள்' : 'Ecosystem Projections'}</span>
                        </div>
                        <h1 className={`text-6xl md:text-7xl font-black tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                            What <span className="opacity-30 font-light">If?</span>
                        </h1>
                        <p className={`text-base font-bold leading-relaxed max-w-xl opacity-60 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                            {language === 'ta' ? 'உங்கள் முடிவுகளின் வளர்ச்சியைப் பகுப்பாய்வு செய்கிறது.' : 'Simulating high-fidelity growth trajectories based on institutional decision vectors.'}
                        </p>
                    </div>

                    <button
                        onClick={onBack}
                        className={`px-12 py-6 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.5em] transition-all duration-700 flex items-center justify-center gap-6 border backdrop-blur-3xl active:scale-95 ${isDarkMode ? 'bg-white/[0.02] border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20' : 'bg-white border-slate-100 text-slate-400 hover:text-nature-deep hover:shadow-2xl hover:border-nature-deep/20'}`}
                    >
                        <ArrowLeft size={20} strokeWidth={3} />
                        {t('common.back') || 'Return to Nucleus'}
                    </button>
                </div>

                {/* Simulation Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                    {/* Primary Trajectory */}
                    <div className={`p-10 rounded-[3.5rem] border transition-all duration-1000 group ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:border-nature-medium/50' : 'bg-slate-50 border-slate-100 hover:border-nature-medium/40 shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-8">
                            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-nature-medium/20 text-nature-medium' : 'bg-nature-medium/10 text-nature-medium'}`}>
                                <Play size={20} strokeWidth={2.5} />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Vector v1.02</span>
                        </div>
                        <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Immediate <span className="opacity-40">Impact</span></h3>
                        <p className={`text-base leading-relaxed font-bold opacity-60 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                            {whatIfData.immediate_impact}
                        </p>
                        <div className={`mt-10 pt-10 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
                            <div className="flex items-center gap-4">
                                <Activity size={14} className="text-nature-medium" />
                                <span className={`text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Biological Integrity Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Temporal Projection */}
                    <div className={`p-10 rounded-[3.5rem] border transition-all duration-1000 group ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:border-harvest-gold/50' : 'bg-slate-50 border-slate-100 hover:border-harvest-gold/40 shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-8">
                            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-harvest-gold/20 text-harvest-gold' : 'bg-harvest-gold/10 text-harvest-gold'}`}>
                                <Clock size={20} strokeWidth={2.5} />
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Temporal Shift</span>
                        </div>
                        <h3 className={`text-2xl font-black uppercase tracking-tight mb-6 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Strategic <span className="opacity-40">Trajectory</span></h3>
                        <p className={`text-base leading-relaxed font-bold opacity-60 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                            {whatIfData.long_term_projection}
                        </p>
                        <div className={`mt-10 pt-10 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200'}`}>
                            <div className="flex items-center gap-4">
                                <Sparkles size={14} className="text-harvest-gold" />
                                <span className={`text-[9px] font-black uppercase tracking-[0.3em] opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Recursive Optimization Sync</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Institutional Footer Sync */}
                <div className={`mt-16 pt-12 border-t flex flex-col md:flex-row items-center justify-between gap-8 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full bg-nature-medium animate-pulse shadow-[0_0_15px_rgba(76,107,79,0.5)]`} />
                        <span className={`text-[10px] font-black uppercase tracking-[0.4em] opacity-50 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                            Neural Nexus Simulation Active
                        </span>
                    </div>

                    <button
                        onClick={onContinue}
                        className={`w-full md:w-auto px-16 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.6em] text-[12px] transition-all duration-1000 shadow-2xl active:scale-95 flex items-center justify-center gap-6 ${isDarkMode ? 'bg-nature-medium text-white hover:bg-nature-light hover:text-nature-deep shadow-nature-medium/20' : 'bg-nature-deep text-white hover:bg-nature-medium shadow-nature-deep/20'}`}
                    >
                        Confirm Integration <ArrowRight size={24} strokeWidth={3} />
                    </button>

                    <div className="hidden lg:block">
                        <span className={`text-[9px] font-bold opacity-20 uppercase tracking-[0.5em] ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                            Sovereign Intelligence • Enterprise Grade Simulation
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

WhatIfFutureView.propTypes = {
    decision: PropTypes.string,
    context: PropTypes.object,
    language: PropTypes.string,
    stressLevel: PropTypes.number,
    onBack: PropTypes.func,
    onContinue: PropTypes.func,
    t: PropTypes.func,
    isDarkMode: PropTypes.bool
}

export default WhatIfFutureView

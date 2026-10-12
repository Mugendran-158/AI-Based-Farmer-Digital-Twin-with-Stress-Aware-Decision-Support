import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = ({ className = '', label = 'NAV BACK', onClick, isDarkMode = true }) => {
    const navigate = useNavigate()

    return (
        <button
            onClick={onClick || (() => navigate(-1))}
            className={`
        group flex items-center gap-4 px-6 py-3 rounded-full 
        backdrop-blur-xl border transition-all duration-700
        ${isDarkMode
                    ? 'bg-white/5 border-white/5 text-platinum-muted hover:border-white/20 hover:text-white'
                    : 'bg-nature-deep/5 border-nature-deep/5 text-nature-deep/60 hover:border-nature-deep/20 hover:text-nature-deep'}
        shadow-sm hover:-translate-x-1 active:scale-95 z-50
        ${className}
      `}
        >
            <div className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : 'bg-nature-deep/5 group-hover:bg-nature-deep/10'}`}>
                <ArrowLeft size={16} strokeWidth={2.5} />
            </div>
            <span className="mono-metadata text-[9px] uppercase tracking-[0.2em] font-bold">{label}</span>
        </button>
    )
}

export default BackButton

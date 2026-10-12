import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Globe,
  Bot,
  ChevronDown,
  ChevronUp,
  Brain,
  Sprout,
  Mic,
  ShieldCheck,
  ArrowRight,
  Activity,
  Zap,
  LayoutDashboard,
  Cpu,
  ShieldAlert,
  Dna,
  Workflow,
  CircleDollarSign
} from 'lucide-react'
import IntelligenceCard from './legendary/IntelligenceCard'
import StatusBadge from './legendary/StatusBadge'

const DecisionSelection = ({ onDecision, onAskDoubt, onAiFarmer, onWhatIf, onEnterWorld, isLoading, t, isDarkMode }) => {
  const navigate = useNavigate()

  const modules = [
    {
      id: 'ai-farmer',
      name: t('modules.aiFarmer'),
      sub: t('modules.aiFarmerSub'),
      icon: <Brain />,
      path: '/ai-farmer',
      color: 'nature-medium',
      description: t('modules.aiFarmerDesc')
    },
    {
      id: 'crop-analyzer',
      name: t('modules.cropAnalyzer'),
      sub: t('modules.cropAnalyzerSub'),
      icon: <Dna />,
      path: '/crop-analyzer',
      color: 'nature-light',
      description: t('modules.cropAnalyzerDesc')
    },
    {
      id: 'voice-assistant',
      name: t('modules.voiceAssistant'),
      sub: t('modules.voiceAssistantSub'),
      path: '/voice-assistant',
      icon: <Mic />,
      color: 'trust-blue',
      description: t('modules.voiceAssistantDesc')
    },
    {
      id: 'safety-twin',
      name: t('modules.safetyTwin'),
      sub: t('modules.safetyTwinSub'),
      path: '/safety-twin',
      icon: <ShieldAlert />,
      color: 'earth-rich',
      description: t('modules.safetyTwinDesc')
    },
    {
      id: 'market-prices',
      name: t('modules.marketIntel'),
      sub: t('modules.marketIntelSub'),
      path: '/market-prices',
      icon: <CircleDollarSign />,
      color: 'harvest-gold',
      description: t('modules.marketIntelDesc')
    },
    {
      id: 'smart-workspace',
      name: t('modules.smartWorkspace'),
      sub: t('modules.smartWorkspaceSub'),
      action: onEnterWorld,
      icon: <Globe />,
      color: 'nature-medium',
      description: t('modules.smartWorkspaceDesc')
    },
    {
      id: 'expert-system',
      name: t('modules.expertSystem'),
      sub: t('modules.expertSystemSub'),
      action: onAskDoubt,
      icon: <Workflow />,
      color: 'trust-blue',
      description: t('modules.expertSystemDesc')
    },
  ];

  return (
    <div className="px-4 mb-12">
      <IntelligenceCard
        title={t('smartActions.title') || "Farm Control Center"}
        subtitle={t('smartActions.subtitle') || "Select a Tool"}
        depth="surface"
        className="overflow-visible"
        isDarkMode={isDarkMode}
      >
        <div className="absolute top-8 right-8 flex items-center gap-4">
          <StatusBadge type="system" value="ONLINE" status="active" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12">
          {modules.map((mod, idx) => (
            <button
              key={mod.id}
              onClick={mod.path ? () => navigate(mod.path) : mod.action}
              disabled={isLoading}
              className={`
                group relative p-10 rounded-[2.5rem] border transition-all duration-1000 ease-out text-left flex flex-col gap-10
                ${isDarkMode
                  ? 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/20 hover:shadow-2xl'
                  : 'bg-white border-nature-deep/5 hover:border-nature-deep/10 hover:shadow-[0_20px_40px_rgba(16,46,34,0.06)] shadow-sm'}
              `}
            >
              {/* Intentional Light Geometry */}
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                <div className={`w-1 h-1 rounded-full ${mod.color === 'nature-medium' ? 'bg-nature-medium' :
                  mod.color === 'trust-blue' ? 'bg-trust-blue' : 'bg-harvest-gold'
                  }`} />
              </div>

              <div className="flex items-center gap-6">
                <div className={`
                  p-6 rounded-2xl border transition-all duration-700 group-hover:scale-105 shadow-sm
                  ${isDarkMode
                    ? 'bg-nature-deep/20 border-white/5 text-platinum-pure group-hover:border-white/20'
                    : 'bg-nature-deep/5 border-nature-deep/5 text-nature-deep group-hover:border-nature-deep/10'}
                `}>
                  {React.cloneElement(mod.icon, { size: 24, strokeWidth: 1 })}
                </div>
                <div className="flex-1">
                  <div className={`mono-metadata mb-1 ${isDarkMode ? 'opacity-100 text-platinum-muted' : 'text-slate-500'}`}>{mod.sub}</div>
                  <h3 className={`command-headline text-lg tracking-tight uppercase ${isDarkMode ? 'text-platinum-pure' : 'text-slate-900'}`}>{mod.name}</h3>
                </div>
              </div>

              <p className={`system-body text-xs leading-relaxed font-medium line-clamp-2 ${isDarkMode ? 'text-white/40' : 'text-slate-600'}`}>
                {mod.description}
              </p>

              <div className={`flex items-center justify-between mt-auto pt-8 border-t ${isDarkMode ? 'border-white/[0.03]' : 'border-nature-deep/5'}`}>
                <span className={`mono-metadata text-[8px] tracking-[0.3em] group-hover:text-platinum-pure transition-colors ${isDarkMode ? 'text-platinum-muted' : 'text-nature-deep/40 group-hover:text-nature-deep'}`}>Open</span>
                <div className={`p-2 rounded-xl border transition-all duration-700 ${isDarkMode ? 'bg-white/[0.02] border-white/5 group-hover:bg-platinum-pure text-platinum-pure group-hover:text-nature-deep' : 'bg-nature-deep/5 border-nature-deep/5 text-nature-deep/40 group-hover:bg-nature-deep group-hover:text-white'}`}>
                  <ArrowRight size={12} strokeWidth={3} />
                </div>
              </div>

              {/* Secure Channel Edge */}
              <div className={`absolute inset-y-0 left-0 w-px transition-colors ${isDarkMode ? 'bg-white/5 group-hover:bg-white/20' : 'bg-slate-200 group-hover:bg-slate-300'}`} />
            </button>
          ))}
        </div>
      </IntelligenceCard>
    </div>
  )
}

export default DecisionSelection

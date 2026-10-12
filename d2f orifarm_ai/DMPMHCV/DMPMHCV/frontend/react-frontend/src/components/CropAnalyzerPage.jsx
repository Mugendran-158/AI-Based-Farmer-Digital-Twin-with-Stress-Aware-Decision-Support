import React, { useState, useRef } from 'react'
import BackButton from './BackButton'
import {
  Upload,
  Search,
  AlertCircle,
  CheckCircle2,
  FlaskConical,
  Stethoscope,
  ShieldCheck,
  Leaf,
  Moon,
  Sun,
  Droplets,
  Sprout,
  Scan,
  UploadCloud,
  Activity,
  Zap,
  Dna,
  Microscope,
  Scale,
  ChevronRight,
  Thermometer,
  Cpu,
  BrainCircuit,
  Workflow,
  Eye,
  FileSearch,
  Crosshair
} from 'lucide-react'
import IntelligenceCard from './legendary/IntelligenceCard'
import StatusBadge from './legendary/StatusBadge'
import CommandButton from './legendary/CommandButton'

const CropAnalyzerPage = ({ onBack, isDarkMode: globalIsDarkMode }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef(null)

  // Dark/Light Mode State synchronized with global theme
  const [isDarkMode, setIsDarkMode] = useState(globalIsDarkMode ?? true)

  React.useEffect(() => {
    setIsDarkMode(globalIsDarkMode ?? true)
  }, [globalIsDarkMode])

  // Save theme preference and notify application
  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('appTheme', newMode ? 'dark' : 'light')
    window.dispatchEvent(new CustomEvent('themeChange', { detail: newMode ? 'dark' : 'light' }))
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
      setAnalysis(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return
    setIsAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedImage)
      const response = await fetch('/api/analyze-crop-image', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        setAnalysis(result.analysis)
      } else {
        setAnalysis({
          disease_name: 'Analysis Error',
          visual_symptoms: 'Unable to analyze the image. Please try again.',
          severity: 'Unknown',
          confidence_level: 'Low'
        })
      }
    } catch (error) {
      setAnalysis({
        disease_name: 'Connection Error',
        visual_symptoms: 'Unable to connect to analysis service.',
        severity: 'Unknown',
        confidence_level: 'Low'
      })
    }
    setIsAnalyzing(false)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const renderStructuredContent = (content, icon) => {
    if (!content) return null
    if (typeof content === 'string') return (
      <p className={`text-base font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        {content}
      </p>
    )

    return (
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(content).map(([key, value]) => (
          <div key={key} className={`group p-6 rounded-[2rem] border transition-all duration-500 ${isDarkMode ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]' : 'bg-slate-50 border-slate-100'}`}>
            <div className="flex items-start gap-4">
              <div className={`mt-1 p-2 rounded-xl ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-100 text-emerald-600'}`}>
                {React.cloneElement(icon || <Activity />, { size: 16 })}
              </div>
              <div>
                <h5 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-50 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {key.replace(/_/g, ' ')}
                </h5>
                <p className={`text-base font-bold leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {String(value)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${isDarkMode ? 'bg-[#050505]' : 'bg-slate-50'}`}>

      {/* Platinum Header (Command Grade) */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-50 flex items-center justify-between">
        <BackButton onBack={onBack} />

        <div className="flex items-center gap-6">
          <StatusBadge type="system" value="CROP-GUARD v5.0" status="active" />

          <button
            onClick={toggleTheme}
            className={`p-3 rounded-2xl border transition-all duration-500 ${isDarkMode
              ? 'bg-white/5 border-white/5 text-white/40 hover:text-white'
              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-900 shadow-sm'
              }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${isDarkMode ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
            <Microscope size={12} strokeWidth={2.5} />
            <span className="text-[9px] font-black uppercase tracking-[0.4em]">Biological Pathogen Detection Matrix</span>
          </div>
          <h1 className={`text-6xl md:text-8xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span className="animate-[intelligence-shimmer_3s_infinite] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent">Biological</span> Diagnostics
          </h1>
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed font-medium opacity-60 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Autonomous diagnostics using neural vision for high-fidelity pathology identification and treatement synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Diagnostic Input (Left) */}
          <div className="lg:col-span-12">
            <IntelligenceCard
              title="Biological Ingestion"
              subtitle="Initialize Vision-Based Pathology Scan"
              depth="command"
              glow={true}
              className="p-1"
              isDarkMode={isDarkMode}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[2.8rem]">
                {/* Scanner Viewport */}
                <div className={`p-12 border-b lg:border-b-0 lg:border-r ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                  <div
                    onClick={triggerFileInput}
                    className={`relative aspect-square rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-700 group ${imagePreview ? 'border-emerald-500/50' : isDarkMode ? 'border-white/10 hover:border-indigo-500/40 bg-white/[0.02]' : 'border-slate-200 hover:border-emerald-500/40 bg-slate-50'
                      }`}
                  >
                    {/* Scanning Animation Shell */}
                    {isAnalyzing && (
                      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-scan-line z-[40]" />
                    )}

                    {imagePreview ? (
                      <React.Fragment>
                        <img src={imagePreview} alt="Biological Specimen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="p-4 rounded-full bg-white/20 backdrop-blur-md text-white">
                            <FileSearch size={32} />
                          </div>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 p-4 rounded-2xl bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <StatusBadge type="intelligence" value="LOCKED" status="active" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Specimen Ready</span>
                          </div>
                          <Crosshair className="text-emerald-500 animate-pulse" size={16} />
                        </div>
                      </React.Fragment>
                    ) : (
                      <div className="space-y-6 text-center">
                        <div className={`w-24 h-24 mx-auto rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white text-emerald-600 shadow-2xl'}`}>
                          <UploadCloud size={40} />
                        </div>
                        <div className="space-y-2">
                          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Ingest Specimen</h3>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Upload high-resolution pathology imagery</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
                </div>

                {/* Analysis Calibration */}
                <div className="p-12 flex flex-col justify-center space-y-10">
                  <div className="space-y-4">
                    <h2 className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Protocol Calibration</h2>
                    <p className={`text-base font-medium opacity-60 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Ensure the specimen is focused and centered. The neural engine will attempt to isolate pathogens and cross-reference with global biological databases.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: Eye, label: "Multi-Spectrum Visual Scan", color: 'indigo' },
                      { icon: Activity, label: "Vascular Integrity Assessment", color: 'emerald' },
                      { icon: Dna, label: "Neural Pattern Matching", color: 'rose' }
                    ].map((item, i) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={i} className={`flex items-center gap-4 p-5 rounded-2xl ${isDarkMode ? 'bg-white/[0.02]' : 'bg-slate-50'}`}>
                          <ItemIcon size={18} className={isDarkMode ? `text-${item.color}-400` : `text-emerald-600`} />
                          <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item.label}</span>
                          <CheckCircle2 size={16} className="ml-auto text-emerald-500 opacity-40" />
                        </div>
                      );
                    })}
                  </div>

                  <CommandButton
                    variant="intelligence"
                    icon={Workflow}
                    className="w-full py-8"
                    disabled={!selectedImage || isAnalyzing}
                    onClick={handleAnalyze}
                    loading={isAnalyzing}
                    isDarkMode={isDarkMode}
                  >
                    Execute Diagnostic Protocol
                  </CommandButton>
                </div>
              </div>
            </IntelligenceCard>
          </div>

          {/* Diagnostic Findings (Full Width) */}
          {analysis && (
            <div className="lg:col-span-12 space-y-12 animate-slide-up">
              <div className="flex items-center gap-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/20 to-indigo-500/20" />
                <StatusBadge type="security" value="REPORT GENERATED" status="active" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-indigo-500/20 to-indigo-500/20" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Primary Diagnosis (2/3) */}
                <div className="lg:col-span-2">
                  <IntelligenceCard
                    title="Primary Diagnosis"
                    subtitle="Pathological Result Matrix"
                    className="h-full"
                    isDarkMode={isDarkMode}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-2 block">Pathology Identified</span>
                        <h3 className={`text-4xl md:text-6xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {analysis.disease_name}
                        </h3>
                      </div>
                      <div className="flex gap-4">
                        <StatusBadge type="security" value={analysis.confidence_level || "VERIFIED"} status="active" />
                        <div className={`px-6 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${analysis.severity?.toLowerCase()?.includes('high')
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                          }`}>
                          <AlertCircle size={14} />
                          {analysis.severity} PRIORITY
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Visual Symptomology</h4>
                        <div className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                          {renderStructuredContent(analysis.visual_symptoms, <Eye />)}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500/60">System Protocol</h4>
                        <div className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-emerald-500/[0.03] border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}>
                          {renderStructuredContent(analysis.treatment, <Stethoscope />)}
                        </div>
                      </div>
                    </div>
                  </IntelligenceCard>
                </div>

                {/* Supplemental Metadata (1/3) */}
                <div className="space-y-8">
                  <IntelligenceCard
                    title="Risk Shield"
                    subtitle="Bio-Security Protocols"
                    depth="surface"
                    isDarkMode={isDarkMode}
                  >
                    {renderStructuredContent(analysis.prevention, <ShieldCheck />)}
                  </IntelligenceCard>

                  <IntelligenceCard
                    title="Recalibration"
                    subtitle="Neural Re-assessment"
                    depth="surface"
                    isDarkMode={isDarkMode}
                  >
                    <div className="space-y-4">
                      {[
                        { icon: Activity, title: "Vitality Offset", desc: "Re-calculate moisture turgidity." },
                        { icon: Leaf, title: "Foliage Density", desc: "Assess biomass accumulation." },
                        { icon: Zap, title: "Energy Synthesis", desc: "Optimize light ingestion." }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 group">
                          <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 group-hover:border-indigo-400' : 'bg-white border-slate-100 group-hover:border-emerald-400 shadow-sm'
                            }`}>
                            <item.icon size={20} strokeWidth={1} />
                          </div>
                          <div>
                            <h5 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h5>
                            <p className="text-[10px] font-bold opacity-40 uppercase tracking-tight">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </IntelligenceCard>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CropAnalyzerPage

import React, { useState } from 'react'
import { ShieldCheck, Bot, Sprout, BarChart3, Mic, Save, Smartphone, ChevronLeft } from 'lucide-react'

const VerifyPage = ({ onBack, onVerify, isDarkMode: globalIsDarkMode }) => {
  const [verificationCode, setVerificationCode] = useState('')
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('email') // 'email' or 'code'
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const isDarkMode = globalIsDarkMode ?? true

  const handleSendCode = async () => {
    if (!email) {
      setMessage('Please enter your email address')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStep('code')
        setMessage(`Verification code sent to ${email}`)
      } else {
        setMessage(data.error || 'Failed to send verification code.')
      }
    } catch (error) {
      console.error(error)
      setMessage('Network error. Check backend connection.')
    }
    setIsLoading(false)
  }

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setMessage('Please enter a valid 6-digit verification code')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: verificationCode
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Account verified successfully!')
        setTimeout(() => onVerify(), 1000)
      } else {
        setMessage(data.error || 'Invalid verification code.')
      }
    } catch (error) {
      setMessage('Verification failed. Please try again.')
    }
    setIsLoading(false)
  }

  const handleResendCode = () => {
    setVerificationCode('')
    setStep('email')
    setMessage('')
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${isDarkMode ? 'bg-[#050505]' : 'bg-slate-50'} font-sans selection:bg-trust-blue/30 overflow-y-auto`}>
      {/* Atmospheric Background Layer */}
      <div className={`absolute inset-0 pointer-events-none opacity-20 ${isDarkMode ? 'bg-[radial-gradient(circle_at_50%_0%,#1A2E22_0%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_0%,#4C6B4F_0%,transparent_70%)]'}`} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-10">
            <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-700 ${isDarkMode ? 'bg-white/[0.02] border-white/5 text-trust-blue' : 'bg-white border-slate-100 text-trust-blue'}`}>
              <ShieldCheck size={48} strokeWidth={1} className="animate-pulse" />
            </div>
          </div>
          <h1 className={`text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
            Security <span className="opacity-40 font-light">Clearance</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Initialize identity verification protocol</p>
        </div>

        <div className={`rounded-[3rem] border p-12 shadow-2xl mb-12 backdrop-blur-3xl transition-all duration-700 ${isDarkMode ? 'bg-[#0F0F0F]/60 border-white/5' : 'bg-white/80 border-slate-200'}`}>
          {step === 'email' && (
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Identity Anchor</h2>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-relaxed">System requires a verified communication uplink for neural synchronization.</div>
              </div>

              <div className="space-y-4 group/input">
                <label htmlFor="email" className={`text-[10px] font-black uppercase tracking-widest ml-1 transition-colors ${isDarkMode ? 'text-slate-400 group-focus-within/input:text-trust-blue' : 'text-slate-500 group-focus-within/input:text-nature-deep'}`}>
                  Communication Uplink (Email)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="IDENTIFIER@DOMAIN.SYS"
                    disabled={isLoading}
                    className={`w-full h-20 border rounded-2xl px-8 text-lg focus:outline-none shadow-inner transition-all font-black placeholder:text-white/5 uppercase ${isDarkMode ? 'bg-[#050508]/50 border-white/10 text-white focus:border-trust-blue' : 'bg-slate-50 border-slate-200 text-nature-deep focus:border-nature-deep'}`}
                  />
                </div>
              </div>

              <button
                onClick={handleSendCode}
                disabled={isLoading || !email}
                className="w-full relative overflow-hidden group"
              >
                <div className={`relative py-8 font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl transition-all flex items-center justify-center gap-3 ${isDarkMode ? 'bg-trust-blue text-white group-hover:bg-nature-medium' : 'bg-nature-deep text-white group-hover:bg-nature-medium'} shadow-xl shadow-nature-deep/20`}>
                  {isLoading ? (
                    <React.Fragment>
                      <div className={`animate-spin rounded-full h-4 w-4 border-2 border-t-transparent ${isDarkMode ? 'border-white' : 'border-white'}`}></div>
                      <span>Sending Signal...</span>
                    </React.Fragment>
                  ) : (
                    'Transmit Verification Code'
                  )}
                </div>
              </button>
            </div>
          )}

          {step === 'code' && (
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className={`text-2xl font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>Neural Link Entry</h2>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-relaxed">Input the 6-digit cryptographic key transmitted to your uplink.</div>
              </div>

              <div className="text-center">
                <div className="flex justify-center gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-16 h-20 rounded-2xl border flex items-center justify-center text-2xl font-black transition-all duration-500 ${index < verificationCode.length
                        ? isDarkMode ? 'border-trust-blue bg-trust-blue/10 text-trust-blue shadow-[0_0_20px_rgba(44,95,120,0.2)]' : 'border-nature-deep bg-nature-deep/5 text-nature-deep shadow-[0_0_20px_rgba(26,46,34,0.1)]'
                        : isDarkMode ? 'border-white/10 bg-black/20 text-white/10' : 'border-slate-200 bg-slate-50 text-slate-300'
                        }`}
                    >
                      {verificationCode[index] || '•'}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                    setVerificationCode(value)
                  }}
                  autoFocus
                  maxLength="6"
                  className="opacity-0 absolute inset-0 cursor-default"
                />
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleVerify}
                  disabled={isLoading || verificationCode.length !== 6}
                  className="w-full relative overflow-hidden group"
                >
                  <div className={`relative py-8 font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl transition-all flex items-center justify-center gap-3 ${isDarkMode ? 'bg-nature-medium text-white group-hover:bg-[#5C825F]' : 'bg-nature-deep text-white group-hover:bg-nature-medium'} shadow-xl shadow-nature-deep/20`}>
                    {isLoading ? (
                      <React.Fragment>
                        <div className={`animate-spin rounded-full h-4 w-4 border-2 border-t-transparent ${isDarkMode ? 'border-white' : 'border-white'}`}></div>
                        <span>Verifying...</span>
                      </React.Fragment>
                    ) : (
                      'Initialize Access Protocol'
                    )}
                  </div>
                </button>

                <button
                  onClick={handleResendCode}
                  disabled={isLoading}
                  className="w-full py-4 text-white/20 hover:text-white transition-all mono-metadata text-[8px] uppercase tracking-widest"
                >
                  Request Redelivery
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className={`mt-10 p-6 rounded-lg text-center mono-metadata text-[8px] uppercase tracking-widest border transition-all duration-700 ${message.includes('success')
              ? 'bg-cyber-green/5 border-cyber-green/20 text-cyber-green shadow-[0_0_30px_rgba(0,255,148,0.1)]'
              : 'bg-cyber-rose/5 border-cyber-rose/20 text-cyber-rose shadow-[0_0_30px_rgba(255,0,92,0.1)]'
              }`}>
              {message}
            </div>
          )}
        </div>

        <div className={`rounded-[2.5rem] border p-12 transition-all duration-700 ${isDarkMode ? 'bg-white/[0.01] border-white/[0.03]' : 'bg-white border-slate-100 shadow-sm'}`}>
          <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-10 ${isDarkMode ? 'opacity-40' : 'text-nature-deep'}`}>Authorized Privileges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: 'Neural Twin Access', icon: Bot, color: 'trust-blue' },
              { label: 'Crop Logic Analysis', icon: Sprout, color: 'nature-medium' },
              { label: 'Strategic Analytics', icon: BarChart3, color: 'nature-deep' },
              { label: 'Vocal Command Node', icon: Mic, color: 'harvest-gold' },
              { label: 'Oracle Data Sync', icon: Save, color: 'trust-blue' },
              { label: 'Mobile Intelligence', icon: Smartphone, color: 'nature-medium' }
            ].map((priv, i) => {
              const PrivIcon = priv.icon;
              return (
                <div key={i} className={`flex items-center gap-5 p-6 border rounded-2xl group transition-all duration-500 ${isDarkMode ? 'bg-[#050508]/40 border-white/[0.03] hover:border-white/10' : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-nature-deep/20 hover:shadow-xl'}`}>
                  <div className={`p-3 rounded-xl transition-all duration-500 ${isDarkMode ? 'bg-white/5 opacity-40 group-hover:opacity-100' : 'bg-white shadow-sm text-nature-deep'}`}>
                    <PrivIcon size={18} strokeWidth={1.5} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'opacity-40' : 'text-slate-600'}`}>{priv.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={onBack}
            className="px-10 py-4 rounded-lg bg-white/5 border border-white/5 text-white/20 hover:text-white transition-all mono-metadata text-[8px] uppercase"
          >
            ← Disconnect Portal
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyPage

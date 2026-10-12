import React, { useState } from 'react';

/**
 * WeatherPanel.jsx
 * 
 * Premium Intelligence Panel for real-time weather.
 * Displays current conditions, 24h hourly forecast, and 7-day weekly forecast.
 */
const WeatherPanel = ({ data, onClose }) => {
    const [view, setView] = useState('hourly'); // 'hourly' | 'weekly'

    if (!data) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            {/* Panel */}
            <div className="relative bg-slate-900/95 border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-500">
                {/* Header Context */}
                <div className="p-8 pb-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-1 block">Meteorological Intelligence</span>
                            <h2 className="text-4xl font-black text-white tracking-tighter">
                                {data.location.city}
                            </h2>
                        </div>
                        <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/5 hover:border-white/20">
                            <span className="text-white/40 text-2xl group-hover:text-white">✕</span>
                        </button>
                    </div>
                </div>

                {/* Main Current Weather Card */}
                <div className="px-8 flex gap-8 items-center mb-8">
                    <div className="flex-1 bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                        <div className="flex justify-between items-center relative z-10">
                            <div>
                                <div className="text-7xl font-black text-white tracking-tighter mb-2">{data.current.temp}°</div>
                                <div className="text-lg font-black text-white/80 uppercase tracking-widest">{data.current.condition}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Current Stats</div>
                                <div className="space-y-1">
                                    <div className="text-sm font-black text-white">💧 {data.current.humidity}% <span className="text-[10px] text-white/40">Humidity</span></div>
                                    <div className="text-sm font-black text-white">💨 {data.current.windSpeed} <span className="text-[10px] text-white/40">km/h Wind</span></div>
                                    <div className="text-sm font-black text-white">🌡️ {data.current.feelsLike}° <span className="text-[10px] text-white/40">Feels Like</span></div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background glow */}
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full" />
                    </div>

                    {/* Decision Support Insights */}
                    <div className="w-64 space-y-4">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
                            <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2">Farmer Insight</div>
                            <p className="text-xs text-emerald-100/70 leading-relaxed font-medium">
                                {data.insights}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-8 border-b border-white/5 flex gap-6 mb-6">
                    <button
                        onClick={() => setView('hourly')}
                        className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${view === 'hourly' ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                        Hourly Forecast
                    </button>
                    <button
                        onClick={() => setView('weekly')}
                        className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${view === 'weekly' ? 'text-white border-b-2 border-white' : 'text-white/40 hover:text-white/60'}`}
                    >
                        7-Day Outlook
                    </button>
                </div>

                {/* Forecast Content */}
                <div className="px-8 pb-8 h-48 overflow-x-auto custom-scrollbar flex items-end gap-1">
                    {view === 'hourly' ? (
                        data.hourly.map((step, i) => (
                            <div key={i} className="flex-shrink-0 w-12 flex flex-col items-center group">
                                <span className={`text-[8px] font-black mb-2 transition-all group-hover:text-emerald-400 ${step.rainProb > 30 ? 'text-blue-400' : 'text-white/40'}`}>
                                    {step.rainProb}%
                                </span>
                                <div
                                    className={`w-6 rounded-full transition-all duration-700 bg-white/5 group-hover:bg-white/20 border border-white/5 relative`}
                                    style={{ height: `${step.temp * 2}px`, minHeight: '20px' }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                </div>
                                <span className="text-[10px] font-black text-white mt-2 group-hover:scale-110 transition-transform">{step.temp}°</span>
                                <span className="text-[7px] font-bold text-white/20 uppercase mt-1 tracking-tighter whitespace-nowrap">{step.time}</span>
                            </div>
                        ))
                    ) : (
                        data.weekly.map((day, i) => (
                            <div key={i} className="flex-shrink-0 w-20 flex flex-col items-center bg-white/[0.02] border border-white/5 rounded-2xl p-3 hover:bg-white/5 transition-colors">
                                <span className="text-[10px] font-black text-white/40 uppercase mb-2">{day.date}</span>
                                <span className="text-xl font-black text-white mb-1">{day.maxTemp}°</span>
                                <span className="text-[9px] font-bold text-white/20 mb-3">{day.minTemp}°</span>
                                <div className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase ${day.rainProb > 40 ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                                    {day.rainProb}% Rain
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Ethical Disclosure Footer */}
                <div className="px-8 py-4 bg-black/40 border-t border-white/5 flex justify-between items-center">
                    <p className="text-[9px] text-white/30 italic max-w-md">
                        "Weather data is sourced from public meteorological services (Open-Meteo). Biological indicators are derived from weather context, not hardware sensors. Forecasts are for decision support only."
                    </p>
                    <div className="text-[8px] font-black text-white/10 tracking-[0.4em] uppercase">Ethical Intelligence v1.0</div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { height: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}} />
        </div>
    );
};

export default WeatherPanel;

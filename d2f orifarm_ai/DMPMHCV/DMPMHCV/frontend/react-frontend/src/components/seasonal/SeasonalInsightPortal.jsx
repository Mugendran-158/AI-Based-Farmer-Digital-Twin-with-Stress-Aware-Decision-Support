import React from 'react';
import { SEASONAL_DATA } from '../../data/seasonalData';
import { TRANSLATIONS } from '../../data/translations';

const SeasonalInsightPortal = ({ season, onClose, language }) => {
    const t = TRANSLATIONS[language];
    // Access data based on language and season
    const data = SEASONAL_DATA[language]?.[season];

    if (!data) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-md transition-opacity duration-500"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-modal-slide-up">

                {/* Header */}
                <div className={`relative h-48 bg-gradient-to-r ${getSeasonGradient(season)} p-8 flex items-end justify-between overflow-hidden shrink-0`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    <div className="relative z-10">
                        <div className="text-xs font-bold text-white/80 tracking-widest uppercase mb-2 flex items-center gap-2">
                            <span>🌐</span> {t.portal_title}
                        </div>
                        <h2 className="text-5xl font-black text-white drop-shadow-lg tracking-tight">
                            {data.label}
                        </h2>
                        <p className="text-white/90 mt-2 text-lg font-medium max-w-2xl">
                            {data.description}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="bg-black/20 hover:bg-black/40 text-white rounded-full p-3 backdrop-blur-sm transition-all"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">

                    {/* Profit Disclaimer */}
                    <div className="mb-8 p-4 bg-slate-800/50 border border-slate-700 rounded-xl flex items-start gap-3">
                        <span className="text-2xl">💰</span>
                        <div>
                            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wide">{t.portal_disclaimer_title}</h4>
                            <p className="text-sm text-slate-400 mt-1">
                                {data.profatibility_note} {t.portal_disclaimer_text}
                            </p>
                        </div>
                    </div>

                    {/* NEW: Farmer's Advisory Board */}
                    {data.advisory && (
                        <div className="mb-8 p-6 bg-slate-800/80 border-l-4 border-amber-500 rounded-r-xl shadow-lg">
                            <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                                <span>📢</span> {t.advisory_title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-xs font-bold text-slate-500 uppercase">{t.advisory_tip}</div>
                                    <div className="text-slate-200 text-sm leading-relaxed">{data.advisory.general}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-bold text-red-400 uppercase">{t.advisory_pest}</div>
                                    <div className="text-slate-300 text-sm">{data.advisory.pest_alert}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-bold text-cyan-400 uppercase">{t.advisory_water}</div>
                                    <div className="text-slate-300 text-sm">{data.advisory.water_tip}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs font-bold text-green-400 uppercase">{t.advisory_scheme}</div>
                                    <div className="text-slate-300 text-sm italic">"{data.advisory.government_scheme}"</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Crops Section */}
                        <Section title={t.section_crops} items={data.crops} color="emerald" t={t} language={language} />

                        {/* Fruits Section */}
                        <Section title={t.section_fruits} items={data.fruits} color="orange" t={t} language={language} />

                        {/* Vegetables Section */}
                        <Section title={t.section_veg} items={data.vegetables} color="green" t={t} language={language} />

                        {/* Nuts Section */}
                        {data?.nuts && <Section title={t.section_nuts} items={data.nuts} color="amber" t={t} language={language} />}

                        {/* Leaves Section */}
                        {data?.leaves && <Section title={t.section_leaves} items={data.leaves} color="lime" t={t} language={language} />}

                        {/* Medicinal Herbs Section (NEW) */}
                        {data?.medicinal && <Section title={t.section_medicinal} items={data.medicinal} color="emerald" t={t} language={language} />}

                        {/* Grass Section */}
                        {data?.grass && <Section title={t.section_grass} items={data.grass} color="yellow" t={t} language={language} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Section Component
const Section = ({ title, items, color, t, language }) => {
    const titleColors = {
        emerald: 'text-emerald-400',
        orange: 'text-orange-400',
        green: 'text-green-400',
        amber: 'text-amber-400',
        lime: 'text-lime-400',
        yellow: 'text-yellow-400'
    };

    const formatCurrency = (val) => {
        const locale = language === 'ja' ? 'ja-JP' : 'en-IN';
        const currency = language === 'ja' ? 'JPY' : 'INR';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="space-y-4">
            <h3 className={`text-xl font-bold ${titleColors[color] || 'text-slate-200'} border-b border-slate-800 pb-2`}>{title}</h3>
            <div className="space-y-4">
                {items.map((item, idx) => {
                    const hasProfitData = item.yield_val && item.price_min && item.price_max;
                    const minProfit = hasProfitData ? item.yield_val * item.price_min : null;
                    const maxProfit = hasProfitData ? item.yield_val * item.price_max : null;

                    return (
                        <div key={idx} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800 hover:border-slate-600 transition-all group shadow-sm hover:shadow-md">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3 border-b border-slate-700/50 pb-3">
                                <span className="text-3xl bg-slate-900 rounded-lg p-2 shadow-inner">{item.image}</span>
                                <div>
                                    <div className="font-bold text-lg text-slate-100">{item.name}</div>
                                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{item.type}</div>
                                </div>
                            </div>

                            {/* Key Stats Grid */}
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm mb-3">
                                <div className="flex flex-col">
                                    <span className="text-slate-500 text-xs uppercase">{t.label_yield}</span>
                                    <span className="text-slate-300 font-mono">{item.yield}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-slate-500 text-xs uppercase">{t.label_price}</span>
                                    <span className="text-emerald-400 font-mono font-bold">{item.price}</span>
                                </div>

                                {hasProfitData && (
                                    <div className="col-span-2 mt-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                        <div className="text-[10px] text-emerald-500/80 font-black uppercase tracking-widest mb-1">
                                            📊 Estimated Seasonal Profit Range
                                        </div>
                                        <div className="text-lg font-black text-emerald-400 font-mono">
                                            {formatCurrency(minProfit)} — {formatCurrency(maxProfit)}
                                        </div>
                                        <div className="text-[9px] text-slate-500 mt-1 italic">
                                            Estimated per acre. Actual profit may vary based on market and farm conditions.
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col mt-2">
                                    <span className="text-amber-500/80 text-xs uppercase">{t.label_soil}</span>
                                    <span className="text-slate-300 text-xs">{item.soil || 'Standard'}</span>
                                </div>
                                <div className="flex flex-col mt-2">
                                    <span className="text-blue-400/80 text-xs uppercase">{t.label_duration}</span>
                                    <span className="text-slate-300 text-xs">{item.duration || 'Seasonal'}</span>
                                </div>
                            </div>

                            {/* Grow Guide */}
                            {item.grow_guide && (
                                <div className="mt-3 pt-3 border-t border-slate-700/50">
                                    <span className="text-xs font-bold text-slate-500 uppercase block mb-1">{t.label_guide}</span>
                                    <p className="text-[11px] text-slate-400 leading-relaxed italic">
                                        "{item.grow_guide}"
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Helpers
const getSeasonGradient = (season) => {
    switch (season) {
        case 'RAINY': return 'from-cyan-700 to-blue-800';
        case 'SUMMER': return 'from-orange-600 to-red-600';
        case 'WINTER': return 'from-slate-600 to-blue-900';
        case 'AUTUMN': return 'from-amber-700 to-orange-800';
        default: return 'from-slate-700 to-slate-900';
    }
};

const getSeasonIcon = (season) => {
    switch (season) {
        case 'RAINY': return '🌧️';
        case 'SUMMER': return '☀️';
        case 'WINTER': return '❄️';
        case 'AUTUMN': return '🍂';
        default: return '🌍';
    }
};

export default SeasonalInsightPortal;


import React, { useState } from 'react';

const ReportIntrusionModal = ({ onClose, onSubmit, isDarkMode, language }) => {
    const [animal, setAnimal] = useState('');
    const [severity, setSeverity] = useState('Medium');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const animals = [
        { id: 'Elephant', icon: '🐘', label: language === 'ta' ? 'யானை' : 'Elephant' },
        { id: 'Boar', icon: '🐗', label: language === 'ta' ? 'காட்டு பன்றி' : 'Wild Boar' },
        { id: 'Cattle', icon: '🐄', label: language === 'ta' ? 'கால்நடை' : 'Stray Cattle' },
        { id: 'Monkey', icon: '🐒', label: language === 'ta' ? 'குரங்கு' : 'Monkey' },
        { id: 'Other', icon: '❓', label: language === 'ta' ? 'மற்றவை' : 'Other' }
    ];

    const handleSubmit = async () => {
        if (!animal) return;
        setIsSubmitting(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/intrusion/report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    animal: animal.id,
                    severity: severity,
                    location: { name: 'Sector 4 (South)' }, // Mock location
                    timestamp: new Date().toISOString()
                })
            });

            if (response.ok) {
                // onSubmit(); // Optional callback
                onClose();
            }
        } catch (error) {
            console.error("Report failed:", error);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className={`relative w-full max-w-md rounded-2xl p-6 shadow-2xl transform transition-all scale-100 ${isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                        <span>⚠️</span>
                        {language === 'ta' ? 'விலங்கு ஊடுருவல் அறிக்கை' : 'Report Intrusion'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-200">✕</button>
                </div>

                {/* Animal Selection */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    {animals.map((a) => (
                        <button
                            key={a.id}
                            onClick={() => setAnimal(a)}
                            className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${animal.id === a.id
                                    ? 'border-red-500 bg-red-500/10 text-red-500'
                                    : 'border-slate-700/50 hover:border-slate-600 text-slate-400'
                                }`}
                        >
                            <span className="text-2xl">{a.icon}</span>
                            <span className="text-xs font-bold">{a.label}</span>
                        </button>
                    ))}
                </div>

                {/* Severity Selection */}
                <div className="mb-8">
                    <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">
                        {language === 'ta' ? 'தீவிரம்' : 'Severity'}
                    </label>
                    <div className="flex bg-slate-800 rounded-lg p-1">
                        {['Low', 'Medium', 'High'].map((lvl) => (
                            <button
                                key={lvl}
                                onClick={() => setSeverity(lvl)}
                                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${severity === lvl
                                        ? (lvl === 'High' ? 'bg-red-600 text-white' : 'bg-slate-600 text-white')
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                {lvl}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl font-bold text-slate-400 hover:bg-slate-800 transition-colors"
                    >
                        {language === 'ta' ? 'ரத்துசெய்' : 'Cancel'}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!animal || isSubmitting}
                        className="flex-1 py-3 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-slow"
                    >
                        {isSubmitting ? '...' : (language === 'ta' ? 'அறிக்கை அனுப்பு' : 'SEND ALERT')}
                    </button>
                </div>

                {/* Disclaimer */}
                <p className="mt-4 text-[10px] text-center text-slate-500">
                    {language === 'ta'
                        ? 'உண்மைத் தகவலை மட்டும் பகிரவும்.'
                        : 'Please report distinct sightings only.'}
                </p>
            </div>
        </div>
    );
};

export default ReportIntrusionModal;

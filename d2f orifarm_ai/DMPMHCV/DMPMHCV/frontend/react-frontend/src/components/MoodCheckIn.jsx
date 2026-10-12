import React, { useState } from 'react';
import { Smile, Meh, Frown, CheckCircle2, ShieldCheck } from 'lucide-react';

const MoodCheckIn = ({ onMoodSelect, t, isDarkMode = true }) => {
    // t is a simple fallback if not provided, though we expect it passed from parent
    const translate = t || ((key) => key);

    const [selected, setSelected] = useState(null);
    const [response, setResponse] = useState('');

    const moods = [
        {
            id: 'good',
            label: (
                <span className="flex flex-col items-center gap-3">
                    <Smile size={24} className="text-nature-medium" strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black">Vital</span>
                </span>
            ),
            response: "Optimal state confirmed. Systems synchronized for high-precision advisory."
        },
        {
            id: 'tense',
            label: (
                <span className="flex flex-col items-center gap-3">
                    <Meh size={24} className="text-trust-blue" strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black">Intense</span>
                </span>
            ),
            response: "Acknowledged. Recalibrating interface for biological focus and calm."
        },
        {
            id: 'tough',
            label: (
                <span className="flex flex-col items-center gap-3">
                    <Frown size={24} className="text-earth-rose" strokeWidth={1.5} />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black">Strain</span>
                </span>
            ),
            response: "Understood. Switching to essential support protocols and safety logic."
        }
    ];

    const handleSelect = (mood) => {
        setSelected(mood.id);
        setResponse(mood.response);
        if (onMoodSelect) {
            onMoodSelect(mood.id);
        }
    };

    return (
        <div className="mb-10 relative z-20">
            {!selected ? (
                <React.Fragment>
                    <h3 className={`text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-center opacity-40 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                        Biological Status Check
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        {moods.map((mood) => (
                            <button
                                key={mood.id}
                                type="button"
                                onClick={() => handleSelect(mood)}
                                className={`px-2 py-6 border rounded-3xl transition-all duration-500 group hover:-translate-y-1 active:scale-95 ${isDarkMode
                                    ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-nature-light/50 text-white shadow-xl'
                                    : 'bg-nature-deep/5 border-nature-deep/5 hover:bg-white hover:border-nature-medium/50 text-nature-deep shadow-nature-deep/5'
                                    }`}
                            >
                                {mood.label}
                            </button>
                        ))}
                    </div>
                </React.Fragment>
            ) : (
                <div className={`text-center animate-in zoom-in duration-700 p-8 rounded-[2rem] border transition-all duration-1000 ${isDarkMode
                    ? 'bg-nature-medium/10 border-nature-medium/20'
                    : 'bg-nature-medium/5 border-nature-medium/20 shadow-lg'
                    }`}>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="p-3 rounded-2xl bg-nature-medium/10 text-nature-medium animate-pulse">
                            <ShieldCheck size={28} strokeWidth={2} />
                        </div>
                        <p className={`text-[12px] font-bold tracking-wide leading-relaxed ${isDarkMode ? 'text-white/80' : 'text-nature-deep/80'}`}>
                            {response}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MoodCheckIn;

import React, { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';

const TinyWinMessage = ({ isDarkMode = true }) => {
    const [message, setMessage] = useState('');

    const messages = [
        "Every strategic step adds up to a legendary harvest.",
        "Your presence today strengthens the institutional foundation.",
        "Nature oscillates with patience; wisdom follows the same rhythm.",
        "Clear thinking is the ultimate precision tool.",
        "Institutional growth starts with a singular, calm decision.",
        "The soil rewards consistency, and so does strategic management.",
        "You are the orchestrator of this biological ecosystem.",
        "Growth is a professional pursuit of excellence."
    ];

    useEffect(() => {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setMessage(randomMsg);
    }, []);

    return (
        <div className={`fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-3xl animate-in fade-in duration-1000 ${isDarkMode ? 'bg-nature-deep/95' : 'bg-white/95'}`}>
            <div className="max-w-lg w-full text-center px-10">
                <div className="flex justify-center mb-10">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-nature-medium/20 animate-ping opacity-50" />
                        <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center border shadow-2xl transition-all duration-700 ${isDarkMode ? 'bg-nature-deep border-white/10 text-nature-light shadow-black/80' : 'bg-white border-nature-deep/5 text-nature-medium'}`}>
                            <Sprout size={48} strokeWidth={1} className="animate-pulse" />
                        </div>
                    </div>
                </div>

                <h3 className={`text-[12px] font-black uppercase tracking-[1em] mb-6 opacity-40 ml-[1em] ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                    Welcome Operator
                </h3>

                <p className={`text-2xl font-black tracking-tight leading-relaxed mb-12 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                    "{message}"
                </p>

                <div className="flex flex-col items-center gap-4">
                    <div className={`w-32 h-[3px] rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-nature-deep/5'}`}>
                        <div className="h-full bg-nature-medium animate-progress-loading shadow-[0_0_10px_rgba(76,107,79,0.5)]"></div>
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-[0.4em] opacity-30 ${isDarkMode ? 'text-white' : 'text-nature-deep'}`}>
                        Initializing High-Lumen Interface
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TinyWinMessage;

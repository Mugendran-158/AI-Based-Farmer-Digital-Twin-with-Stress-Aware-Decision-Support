/**
 * VoiceInputModule.js
 * Utility to handle browser-native SpeechRecognition and SpeechSynthesis.
 */

export const initSpeechRecognition = (language, onResult, onEnd) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech Recognition not supported in this browser.");
        return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResult) onResult(transcript);
    };

    recognition.onend = () => {
        if (onEnd) onEnd();
    };

    return recognition;
};

export const speak = (text, language, onStart, onEnd) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';

    // Attempt to find a natural voice if available
    const voices = synth.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith(utterance.lang));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => { if (onStart) onStart(); };
    utterance.onend = () => { if (onEnd) onEnd(); };

    synth.speak(utterance);
};

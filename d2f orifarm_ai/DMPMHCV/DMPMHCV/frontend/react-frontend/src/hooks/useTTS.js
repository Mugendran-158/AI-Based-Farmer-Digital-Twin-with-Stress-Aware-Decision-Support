import { useEffect, useCallback, useRef, useState } from 'react';

/**
 * Enhanced TTS Hook (v7.0 - Tamil Backend Fallback Edition)
 * - Tries native browser voices first (fast, no network)
 * - Falls back to backend /api/voice/speak (edge-tts or gTTS) if no Tamil voice found
 * - Adds detailed debug logs for Tamil voice detection
 */
export const useTTS = (language = 'en') => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const mountingRef = useRef(true);
    const [voicesLoaded, setVoicesLoaded] = useState(false);
    const audioRef = useRef(null); // For backend TTS audio playback

    useEffect(() => {
        mountingRef.current = true;

        const initVoices = () => {
            const v = window.speechSynthesis.getVoices();
            if (v.length > 0) setVoicesLoaded(true);
        };

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = initVoices;
        }
        initVoices();

        return () => {
            mountingRef.current = false;
            window.speechSynthesis.cancel();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    /**
     * Check if a Tamil/regional voice is available in the browser
     */
    const findBrowserVoice = useCallback((lang) => {
        const voices = window.speechSynthesis.getVoices();
        console.log(`[TTS] Available browser voices: ${voices.length}`);

        if (lang === 'ta') {
            const taSignatures = ['ta-in', 'ta_in', 'tamil', 'lekha', 'valluvar', 'heera', 'kanya'];
            const found = voices.find(v => {
                const lname = v.name.toLowerCase();
                const llang = v.lang.toLowerCase();
                return taSignatures.some(sig => lname.includes(sig) || llang.includes(sig));
            });
            if (found) console.log(`[TTS] Found Tamil browser voice: ${found.name} (${found.lang})`);
            else console.log('[TTS] No native Tamil voice found in browser — will use backend');
            return found;
        }

        if (lang === 'hi') return voices.find(v => v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi'));
        if (lang === 'te') return voices.find(v => v.lang.toLowerCase().includes('te-in') || v.name.toLowerCase().includes('telugu'));
        if (lang === 'kn') return voices.find(v => v.lang.toLowerCase().includes('kn') || v.name.toLowerCase().includes('kannada'));
        if (lang === 'ml') return voices.find(v => v.lang.toLowerCase().includes('ml') || v.name.toLowerCase().includes('malayalam'));
        return voices.find(v => v.lang.toLowerCase().startsWith('en'));
    }, []);

    /**
     * Speak via backend /api/voice/speak (Python edge-tts or gTTS)
     */
    const speakViaBackend = useCallback(async (text, lang, callback) => {
        console.log(`[TTS] Using BACKEND TTS for ${lang}: "${text.substring(0, 50)}..."`);
        setIsSpeaking(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/voice/speak', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, language: lang })
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({ error: 'Backend TTS failed' }));
                console.error('[TTS] Backend TTS error:', err);
                setIsSpeaking(false);
                if (callback) callback();
                return;
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            // Stop any previous audio
            if (audioRef.current) {
                audioRef.current.pause();
                URL.revokeObjectURL(audioRef.current.src);
            }

            const audio = new Audio(audioUrl);
            audioRef.current = audio;

            audio.onplay = () => {
                console.log('[TTS] Backend TTS started playing');
            };

            // Enhanced safety: auto-callback if audio doesn't end
            const audioSafety = setTimeout(() => {
                console.warn('[TTS] Backend audio safety timeout');
                setIsSpeaking(false);
                if (callback) callback();
            }, (text.length * 200) + 5000); // 200ms per char + 5s buffer

            audio.onended = () => {
                clearTimeout(audioSafety);
                console.log('[TTS] Backend TTS playback complete');
                setIsSpeaking(false);
                URL.revokeObjectURL(audioUrl);
                if (callback) callback();
            };

            audio.onerror = (e) => {
                clearTimeout(audioSafety);
                console.error('[TTS] Audio playback error:', e);
                setIsSpeaking(false);
                if (callback) callback();
            };

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.error('[TTS] Autoplay prevented or playback error:', e);
                    clearTimeout(audioSafety);
                    setIsSpeaking(false);
                    if (callback) callback();
                });
            }
            console.log('[TTS] Backend TTS playing...');

        } catch (err) {
            console.error('[TTS] Backend fetch error:', err);
            setIsSpeaking(false);
            if (callback) callback();
        }
    }, []);

    const speak = useCallback((text, callback, options = {}) => {
        if (!text) {
            if (callback) callback();
            return;
        }

        // Clean text for better speech
        const cleanText = text
            .replace(/[#*`_~]/g, '')
            .replace(/🤖|✅|❌|⚠️|📧/g, '')
            .replace(/---/g, '')
            .replace(/\n+/g, '. ')
            .trim();

        // Cancel any active speech
        window.speechSynthesis.cancel();
        window.speechSynthesis.resume();
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        // Determine language code
        const langCodeMap = { ta: 'ta-IN', hi: 'hi-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN', en: 'en-IN' };
        const langCode = langCodeMap[language] || 'en-IN';

        // FORCE BACKEND for regional languages for consistency and quality
        const forceBackend = ['ta', 'hi', 'te', 'kn', 'ml'].includes(language);

        // Debug
        console.log(`[TTS] Speak requested: "${text.substring(0, 30)}..." lang: ${language} forceBackend: ${forceBackend}`);

        if (forceBackend) {
            console.log(`[TTS] Forcing BACKEND for ${language}`);
            speakViaBackend(cleanText, language, callback);
            return;
        }

        // Use browser Web Speech API (primarily for English)
        setTimeout(() => {
            if (!mountingRef.current) return;

            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = langCode;

            const browserVoice = findBrowserVoice(language);
            if (browserVoice) {
                utterance.voice = browserVoice;
            }

            utterance.rate = options.rate || 0.85;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            let finished = false;
            const done = () => {
                if (!finished) {
                    finished = true;
                    setIsSpeaking(false);
                    console.log(`[TTS] Browser done for ${language}`);
                    if (callback) callback();
                }
            };

            // Safety timeout: transition if speech fails to end
            const safety = setTimeout(() => {
                console.warn('[TTS] Browser end timeout. Forcing callback.');
                done();
            }, 15000);

            // Start safety: if it doesn't even start, fallback to backend
            const startSafety = setTimeout(() => {
                if (!finished && !window.speechSynthesis.speaking) {
                    console.warn('[TTS] Browser start timeout. Trying backend fallback...');
                    clearTimeout(safety);
                    speakViaBackend(cleanText, language, callback);
                }
            }, 3000);

            utterance.onstart = () => {
                clearTimeout(startSafety);
                setIsSpeaking(true);
                console.log(`[TTS] Browser start for ${language}`);
            };

            utterance.onend = () => {
                clearTimeout(safety);
                clearTimeout(startSafety);
                done();
            };

            utterance.onerror = (e) => {
                clearTimeout(safety);
                clearTimeout(startSafety);
                console.error('[TTS] Browser error, falling back to backend...', e);
                speakViaBackend(cleanText, language, callback);
            };

            window.speechSynthesis.speak(utterance);

            // Chrome heartbeat
            const heartbeat = setInterval(() => {
                if (window.speechSynthesis.speaking) window.speechSynthesis.resume();
                if (finished) clearInterval(heartbeat);
            }, 1000);

        }, 100);
    }, [language, findBrowserVoice, speakViaBackend]);

    const cancel = useCallback(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    }, []);

    return { speak, cancel, isSpeaking, voicesLoaded };
};

export default useTTS;

/**
 * useTamilVoice - Reusable hook for Tamil speech recognition (STT)
 * 
 * Strategy:
 * 1. Try browser webkitSpeechRecognition with ta-IN (fast, works on Chrome)
 * 2. If browser doesn't support it, record audio and send to backend /api/voice/recognize
 */
import { useState, useRef, useCallback } from 'react';

// Language code mapping for browser SpeechRecognition
const LANG_CODES = {
    ta: 'ta-IN',
    hi: 'hi-IN',
    en: 'en-IN',
    te: 'te-IN',
    kn: 'kn-IN',
    ml: 'ml-IN',
};

const BACKEND_URL = 'http://127.0.0.1:5000';

export const useTamilVoice = (language = 'ta') => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);
    const recognitionRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const speechCode = LANG_CODES[language] || 'ta-IN';

    /**
     * Listen using browser STT (Chrome SpeechRecognition)
     */
    const listenBrowser = useCallback((onResult, onError) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return false;

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = speechCode;
        recognition.maxAlternatives = 3;

        console.log(`[STT] Browser recognition starting - lang: ${speechCode}`);

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
            console.log(`[STT] Browser listening in ${speechCode}...`);
        };

        recognition.onresult = (event) => {
            const last = event.results[event.results.length - 1];
            const text = last[0].transcript;
            const confidence = last[0].confidence;
            setTranscript(text);
            console.log(`[STT] Browser result: "${text}" (confidence: ${confidence.toFixed(2)})`);
            if (last.isFinal) {
                setIsListening(false);
                onResult(text, confidence);
            }
        };

        recognition.onerror = (event) => {
            console.warn(`[STT] Browser error: ${event.error}`);
            setIsListening(false);
            if (event.error === 'no-speech' || event.error === 'audio-capture') {
                onError?.(event.error);
            } else {
                // Fall through to backend
                onError?.(event.error);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            console.log('[STT] Browser recognition ended');
        };

        recognitionRef.current = recognition;
        recognition.start();
        return true;
    }, [speechCode]);

    /**
     * Listen using backend STT (Python SpeechRecognition with Google API)
     * Records user audio → sends WAV to /api/voice/recognize
     */
    const listenBackend = useCallback(async (onResult, onError) => {
        try {
            console.log('[STT] Requesting microphone for backend recognition...');
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg'
            });

            audioChunksRef.current = [];
            mediaRecorderRef.current = mediaRecorder;

            setIsListening(true);
            setError(null);

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                stream.getTracks().forEach(track => track.stop());
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                console.log(`[STT] Audio recorded: ${blob.size} bytes, sending to backend...`);

                const formData = new FormData();
                formData.append('audio', blob, 'recording.webm');
                formData.append('language', language);

                try {
                    const response = await fetch(`${BACKEND_URL}/api/voice/recognize`, {
                        method: 'POST',
                        body: formData,
                    });

                    const result = await response.json();
                    console.log('[STT] Backend result:', result);

                    if (result.success) {
                        setTranscript(result.transcript);
                        onResult(result.transcript, 1.0);
                    } else {
                        setError(result.error || 'Recognition failed');
                        onError?.(result.error);
                    }
                } catch (fetchErr) {
                    console.error('[STT] Backend fetch error:', fetchErr);
                    setError('Backend connection failed');
                    onError?.('fetch_error');
                } finally {
                    setIsListening(false);
                }
            };

            // Record for up to 6 seconds then stop automatically
            mediaRecorder.start();
            setTimeout(() => {
                if (mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                }
            }, 6000);

        } catch (err) {
            console.error('[STT] Microphone access denied:', err);
            setIsListening(false);
            setError('Microphone access denied');
            onError?.('microphone_denied');
        }
    }, [language]);

    /**
     * Main listen function - tries browser first, falls back to backend
     */
    const listen = useCallback((onResult) => {
        console.log(`[STT] Starting recognition for language: ${language} (${speechCode})`);

        const hasBrowser = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

        if (hasBrowser) {
            listenBrowser(
                (text, conf) => onResult(text),
                (err) => {
                    console.warn(`[STT] Browser failed (${err}), switching to backend...`);
                    listenBackend(
                        (text) => onResult(text),
                        (backendErr) => {
                            console.error('[STT] Backend also failed:', backendErr);
                            setError('Voice recognition unavailable');
                        }
                    );
                }
            );
        } else {
            console.log('[STT] No browser STT, using backend directly...');
            listenBackend(
                (text) => onResult(text),
                (err) => {
                    setError('Voice recognition unavailable: ' + err);
                }
            );
        }
    }, [language, speechCode, listenBrowser, listenBackend]);

    /**
     * Stop recording / recognition
     */
    const stopListening = useCallback(() => {
        recognitionRef.current?.stop();
        if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        setIsListening(false);
    }, []);

    return { listen, stopListening, isListening, transcript, error };
};

export default useTamilVoice;

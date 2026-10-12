import { useState, useEffect, useRef } from 'react'
import { Mic, Square } from 'lucide-react'
import AudioWaveform from './AudioWaveform'

const VoiceRecorder = ({ onTranscript, onVoiceFeatures, language, isRecording, onRecordingChange, isDarkMode }) => {
    const [recordingTime, setRecordingTime] = useState(0)
    const [error, setError] = useState(null)
    const [audioStream, setAudioStream] = useState(null)
    const [permissionGranted, setPermissionGranted] = useState(false)

    const mediaRecorderRef = useRef(null)
    const recognitionRef = useRef(null)
    const timerRef = useRef(null)
    const audioContextRef = useRef(null)
    const analyserRef = useRef(null)
    const pitchDataRef = useRef([])
    const volumeDataRef = useRef([])

    // Language codes for Web Speech API
    const languageCodes = {
        en: 'en-US',
        hi: 'hi-IN',
        ta: 'ta-IN',
        es: 'es-ES',
        fr: 'fr-FR',
        ja: 'ja-JP'
    }

    useEffect(() => {
        // Check if browser supports required APIs
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setError('Your browser does not support audio recording')
            return
        }

        // Set up speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition()
            recognition.continuous = true
            recognition.interimResults = true
            recognition.lang = languageCodes[language] || 'en-US'

            recognition.onresult = (event) => {
                let finalTranscript = ''
                let interimTranscript = ''

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' '
                    } else {
                        interimTranscript += transcript
                    }
                }

                if (finalTranscript) {
                    onTranscript(finalTranscript.trim())
                }
            }

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error)
                if (event.error === 'no-speech') {
                    setError('No speech detected. Please try again.')
                } else if (event.error === 'not-allowed') {
                    setError('Microphone permission denied')
                }
            }

            recognitionRef.current = recognition
        } else {
            console.warn('Speech recognition not supported')
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop()
            }
        }
    }, [language, onTranscript])

    const extractVoiceFeatures = () => {
        if (!analyserRef.current) return null

        // Calculate average pitch (from frequency data)
        const avgPitch = pitchDataRef.current.length > 0
            ? pitchDataRef.current.reduce((a, b) => a + b, 0) / pitchDataRef.current.length
            : 0

        // Calculate average volume
        const avgVolume = volumeDataRef.current.length > 0
            ? volumeDataRef.current.reduce((a, b) => a + b, 0) / volumeDataRef.current.length
            : 0

        // Calculate speaking rate (based on recording time and detected speech segments)
        const speakingRate = recordingTime > 0 ? (pitchDataRef.current.length / recordingTime) : 0

        // Categorize features
        const features = {
            pitch: avgPitch > 150 ? 'high' : avgPitch > 100 ? 'medium' : 'low',
            volume: avgVolume > 150 ? 'loud' : avgVolume > 80 ? 'normal' : 'quiet',
            speaking_rate: speakingRate > 3 ? 'fast' : speakingRate > 1.5 ? 'normal' : 'slow',
            pitch_variability: calculateVariability(pitchDataRef.current),
            volume_variability: calculateVariability(volumeDataRef.current)
        }

        return features
    }

    const calculateVariability = (data) => {
        if (data.length < 2) return 'stable'

        const mean = data.reduce((a, b) => a + b, 0) / data.length
        const variance = data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
        const stdDev = Math.sqrt(variance)

        return stdDev > 30 ? 'variable' : stdDev > 15 ? 'moderate' : 'stable'
    }

    const startRecording = async () => {
        try {
            setError(null)
            pitchDataRef.current = []
            volumeDataRef.current = []
            setRecordingTime(0)

            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            setAudioStream(stream)
            setPermissionGranted(true)

            // Set up audio analysis
            const audioContext = new (window.AudioContext || window.webkitAudioContext)()
            audioContextRef.current = audioContext

            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 2048
            analyserRef.current = analyser

            const source = audioContext.createMediaStreamSource(stream)
            source.connect(analyser)

            // Start collecting voice features
            const dataArray = new Uint8Array(analyser.frequencyBinCount)
            const collectFeatures = () => {
                if (!isRecording) return

                analyser.getByteFrequencyData(dataArray)

                // Extract pitch (dominant frequency)
                let maxIndex = 0
                let maxValue = 0
                for (let i = 0; i < dataArray.length; i++) {
                    if (dataArray[i] > maxValue) {
                        maxValue = dataArray[i]
                        maxIndex = i
                    }
                }

                if (maxValue > 50) { // Only record if there's significant audio
                    pitchDataRef.current.push(maxIndex)
                    volumeDataRef.current.push(maxValue)
                }

                setTimeout(collectFeatures, 100) // Collect every 100ms
            }
            collectFeatures()

            // Start media recorder
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            mediaRecorder.start()

            // Start speech recognition
            if (recognitionRef.current) {
                recognitionRef.current.lang = languageCodes[language] || 'en-US'
                recognitionRef.current.start()
            }

            // Start timer
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => {
                    const newTime = prev + 1
                    // Auto-stop at 60 seconds
                    if (newTime >= 60) {
                        stopRecording()
                        setError('Maximum recording time (60s) reached')
                    }
                    return newTime
                })
            }, 1000)

            onRecordingChange(true)
        } catch (err) {
            console.error('Error starting recording:', err)
            setError('Could not access microphone. Please check permissions.')
            onRecordingChange(false)
        }
    }

    const stopRecording = () => {
        // Stop timer
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }

        // Stop media recorder
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop()
        }

        // Stop speech recognition
        if (recognitionRef.current) {
            recognitionRef.current.stop()
        }

        // Stop audio stream
        if (audioStream) {
            audioStream.getTracks().forEach(track => track.stop())
            setAudioStream(null)
        }

        // Close audio context
        if (audioContextRef.current) {
            audioContextRef.current.close()
        }

        // Extract and send voice features
        const features = extractVoiceFeatures()
        if (features && onVoiceFeatures) {
            onVoiceFeatures(features)
        }

        onRecordingChange(false)
    }

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording()
        } else {
            startRecording()
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="space-y-3">
            {/* Recording Button */}
            <button
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 z-20 relative ${isRecording
                    ? 'bg-rose-500/20 text-rose-500 animate-pulse border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.3)]'
                    : isDarkMode
                        ? 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 shadow-xl'
                        : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                    } ${error ? 'opacity-30 cursor-not-allowed' : 'active:scale-95'}`}
                onClick={toggleRecording}
                disabled={!!error && !permissionGranted}
                title={isRecording ? 'Stop recording' : 'Start voice recording'}
                aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}
            >
                {isRecording ? <Square size={20} fill="currentColor" /> : <Mic size={20} strokeWidth={2.5} />}
            </button>

            {/* Recording Indicator */}
            {isRecording && (
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-[10px] text-rose-500 font-black uppercase tracking-[0.3em]">
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(244,63,94,1)]"></div>
                        <span>Sync Active • {formatTime(recordingTime)}</span>
                    </div>

                    {/* Waveform Visualization */}
                    <div className="opacity-60 grayscale brightness-200 contrast-200 scale-90">
                        <AudioWaveform audioStream={audioStream} isRecording={isRecording} />
                    </div>

                    <p className="text-[10px] text-white/30 font-black uppercase tracking-widest leading-relaxed text-center px-4">
                        Neural Capture in Progress...
                    </p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                    ⚠️ {error}
                </div>
            )}

            {/* Permission Info */}
            {!permissionGranted && !error && (
                <p className="text-[13px] text-gray-600 font-medium opacity-90">
                    Click the microphone to start voice input
                </p>
            )}
        </div>
    )
}

export default VoiceRecorder

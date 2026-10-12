import { useEffect, useRef } from 'react'

const AudioWaveform = ({ audioStream, isRecording }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const analyserRef = useRef(null)
  const audioContextRef = useRef(null)

  useEffect(() => {
    if (!audioStream || !isRecording) {
      // Stop animation when not recording
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      // Clear canvas
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
      return
    }

    // Set up audio context and analyser
    let audioContext;
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.error("AudioContext not supported", e)
      return
    }
    audioContextRef.current = audioContext

    const analyser = audioContext.createAnalyser()
    analyser.fftSize = 256
    analyserRef.current = analyser

    const source = audioContext.createMediaStreamSource(audioStream)
    source.connect(analyser)

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw)

      analyser.getByteFrequencyData(dataArray)

      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.fillRect(0, 0, width, height)

      const barWidth = (width / bufferLength) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * height * 0.8

        // Color based on volume (green -> yellow -> red)
        const hue = 120 - (dataArray[i] / 255) * 60 // 120 (green) to 60 (yellow) to 0 (red)
        const saturation = 70
        const lightness = 50
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`

        // Draw bar from bottom
        ctx.fillRect(x, height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }

    draw()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [audioStream, isRecording])

  return (
    <div className="w-full bg-gray-50 rounded-lg p-2 border border-gray-200">
      <canvas
        ref={canvasRef}
        width={400}
        height={60}
        className="w-full h-16 rounded"
        aria-label="Audio waveform visualization"
      />
    </div>
  )
}

export default AudioWaveform

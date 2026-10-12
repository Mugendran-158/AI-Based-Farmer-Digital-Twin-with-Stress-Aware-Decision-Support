"""
Tamil Voice Service - Backend STT + TTS
Handles Tamil (ta-IN) speech recognition and text-to-speech using:
- SpeechRecognition (Google Web Speech API) for STT
- gTTS (Google TTS) for TTS with Tamil support
- edge-tts as high-quality fallback TTS
"""

import os
import io
import asyncio
import logging
import tempfile
import traceback
from typing import Optional

# --- Configure Logging ---
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("TamilVoiceService")

# --- Language Configurations ---
LANGUAGE_CONFIGS = {
    "ta": {
        "code": "ta-IN",
        "name": "Tamil",
        "gtts_lang": "ta",
        "edge_voice": "ta-IN-PallaviNeural",
        "edge_voice_alt": "ta-IN-ValluvarNeural",
    },
    "hi": {
        "code": "hi-IN",
        "name": "Hindi",
        "gtts_lang": "hi",
        "edge_voice": "hi-IN-SwaraNeural",
        "edge_voice_alt": "hi-IN-MadhurNeural",
    },
    "en": {
        "code": "en-IN",
        "name": "English",
        "gtts_lang": "en",
        "edge_voice": "en-IN-NeerjaNeural",
        "edge_voice_alt": "en-US-JennyNeural",
    },
    "te": {
        "code": "te-IN",
        "name": "Telugu",
        "gtts_lang": "te",
        "edge_voice": "te-IN-MohanNeural",
        "edge_voice_alt": "te-IN-ShrutiNeural",
    },
    "kn": {
        "code": "kn-IN",
        "name": "Kannada",
        "gtts_lang": "kn",
        "edge_voice": "kn-IN-GaganNeural",
        "edge_voice_alt": "kn-IN-SapnaNeural",
    },
    "ml": {
        "code": "ml-IN",
        "name": "Malayalam",
        "gtts_lang": "ml",
        "edge_voice": "ml-IN-MidhunNeural",
        "edge_voice_alt": "ml-IN-SobhanaNeural",
    },
}


def get_lang_config(language: str) -> dict:
    """Get language configuration, defaulting to English."""
    return LANGUAGE_CONFIGS.get(language, LANGUAGE_CONFIGS["en"])


# ============================================================
# TEXT-TO-SPEECH (TTS)
# ============================================================

def generate_tts_audio(text: str, language: str = "ta") -> Optional[bytes]:
    """
    Generate audio bytes for given text using edge-tts or gTTS.
    Returns MP3 audio bytes, or None on failure.
    """
    lang_config = get_lang_config(language)
    lang_name = lang_config["name"]
    logger.debug(f"[TTS] Generating audio - Language: {language} ({lang_name}), Text: {text[:60]}...")

    # === Method 1: edge-tts (high quality) ===
    try:
        audio_bytes = asyncio.run(_edge_tts_generate(text, lang_config))
        if audio_bytes:
            logger.info(f"[TTS] edge-tts success for {lang_name} ({len(audio_bytes)} bytes)")
            return audio_bytes
    except Exception as e:
        logger.warning(f"[TTS] edge-tts failed: {e}. Falling back to gTTS.")

    # === Method 2: gTTS (Google TTS) ===
    try:
        from gtts import gTTS
        tts = gTTS(text=text, lang=lang_config["gtts_lang"], slow=False)
        buf = io.BytesIO()
        tts.write_to_fp(buf)
        buf.seek(0)
        audio_bytes = buf.read()
        logger.info(f"[TTS] gTTS success for {lang_name} ({len(audio_bytes)} bytes)")
        return audio_bytes
    except Exception as e:
        logger.error(f"[TTS] gTTS also failed: {e}")
        traceback.print_exc()

    return None


async def _edge_tts_generate(text: str, lang_config: dict) -> Optional[bytes]:
    """Async helper for edge-tts generation with timeout."""
    import edge_tts
    import asyncio
    
    voices_to_try = [lang_config["edge_voice"], lang_config["edge_voice_alt"]]
    for voice in voices_to_try:
        try:
            # Using wait_for for broader compatibility (Python 3.7 - 3.11+)
            # Using a slightly slower rate (-15%) for better clarity as requested by user
            communicate = edge_tts.Communicate(text, voice, rate="-15%")
            audio_bytes = b""
            
            async def stream_audio():
                nonlocal audio_bytes
                async for chunk in communicate.stream():
                    if chunk["type"] == "audio":
                        audio_bytes += chunk["data"]
            
            await asyncio.wait_for(stream_audio(), timeout=10.0)
            
            if audio_bytes:
                logger.debug(f"[edge-tts] Success with voice: {voice} ({len(audio_bytes)} bytes)")
                return audio_bytes
        except asyncio.TimeoutError:
            logger.warning(f"[edge-tts] Timeout (10s) exceeded with voice: {voice}")
        except Exception as e:
            logger.warning(f"[edge-tts] Voice {voice} failed: {e}")
            
    return None


# ============================================================
# SPEECH-TO-TEXT (STT)
# ============================================================

def recognize_speech_from_audio(audio_bytes: bytes, language: str = "ta") -> dict:
    """
    Recognize speech from raw audio bytes (WebM/WAV).
    Returns dict with 'transcript' and 'language_used'.
    """
    lang_config = get_lang_config(language)
    speech_code = lang_config["code"]
    lang_name = lang_config["name"]

    logger.debug(f"[STT] Processing audio - Language: {language} ({lang_name}), Code: {speech_code}")

    try:
        import speech_recognition as sr

        recognizer = sr.Recognizer()
        recognizer.energy_threshold = 300
        recognizer.dynamic_energy_threshold = True
        recognizer.pause_threshold = 0.8

        # Write audio to temp file
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
            tmp.write(audio_bytes)
            tmp_path = tmp.name

        try:
            with sr.AudioFile(tmp_path) as source:
                # Adjust for ambient noise for better accuracy
                recognizer.adjust_for_ambient_noise(source, duration=0.5)
                audio = recognizer.record(source)

            logger.debug(f"[STT] Sending to Google STT with lang={speech_code}")
            transcript = recognizer.recognize_google(audio, language=speech_code)
            logger.info(f"[STT] Success! Transcript: '{transcript}'")
            return {
                "success": True,
                "transcript": transcript,
                "language_used": speech_code,
                "confidence": "high"
            }

        except sr.UnknownValueError:
            logger.warning(f"[STT] Could not understand audio in {lang_name}")
            return {
                "success": False,
                "error": f"Could not understand speech in {lang_name}. Please speak more clearly.",
                "language_used": speech_code
            }
        except sr.RequestError as e:
            logger.error(f"[STT] Google STT API error: {e}")
            return {
                "success": False,
                "error": f"Speech recognition service error: {str(e)}",
                "language_used": speech_code
            }
        finally:
            os.unlink(tmp_path)

    except ImportError:
        logger.error("[STT] speech_recognition not installed")
        return {
            "success": False,
            "error": "SpeechRecognition library not installed on the server.",
            "language_used": speech_code
        }
    except Exception as e:
        logger.error(f"[STT] Unexpected error: {e}")
        traceback.print_exc()
        return {
            "success": False,
            "error": f"Unexpected error: {str(e)}",
            "language_used": speech_code
        }


def convert_webm_to_wav(webm_bytes: bytes) -> Optional[bytes]:
    """Convert WebM/OGG audio to WAV format using soundfile/pydub."""
    # Try pydub (most compatible)
    try:
        from pydub import AudioSegment
        audio = AudioSegment.from_file(io.BytesIO(webm_bytes), format="webm")
        wav_buf = io.BytesIO()
        audio.export(wav_buf, format="wav")
        wav_buf.seek(0)
        return wav_buf.read()
    except Exception as e:
        logger.error(f"pydub conversion failed: {e}")

    # Try soundfile as fallback
    try:
        import soundfile as sf
        import numpy as np
        data, samplerate = sf.read(io.BytesIO(webm_bytes))
        wav_buf = io.BytesIO()
        sf.write(wav_buf, data, samplerate, format="WAV")
        wav_buf.seek(0)
        return wav_buf.read()
    except Exception as e:
        logger.error(f"soundfile conversion failed: {e}")

    return None


# ============================================================
# DIAGNOSTIC SELF-TEST
# ============================================================

def run_diagnostics() -> dict:
    """Run a quick diagnostic to check which libraries are available."""
    results = {}

    # Test SpeechRecognition
    try:
        import speech_recognition as sr
        results["speech_recognition"] = f"OK (version: {sr.__version__})"
    except ImportError:
        results["speech_recognition"] = "MISSING - run: pip install SpeechRecognition"

    # Test gTTS
    try:
        from gtts import gTTS
        results["gtts"] = "OK"
    except ImportError:
        results["gtts"] = "MISSING - run: pip install gTTS"

    # Test edge-tts
    try:
        import edge_tts
        results["edge_tts"] = "OK"
    except ImportError:
        results["edge_tts"] = "MISSING - run: pip install edge-tts"

    # Test pydub
    try:
        from pydub import AudioSegment
        results["pydub"] = "OK"
    except ImportError:
        results["pydub"] = "MISSING - run: pip install pydub"

    logger.info(f"[DIAGNOSTIC] Voice Library Status: {results}")
    return results


if __name__ == "__main__":
    print("=== Tamil Voice Service Diagnostic ===")
    diag = run_diagnostics()
    for lib, status in diag.items():
        print(f"  {lib}: {status}")

    print("\n=== Testing Tamil TTS ===")
    test_text = "வணக்கம்! நான் உங்கள் விவசாய உதவியாளர். உங்கள் பண்ணைக்கு தேவையான அறிவுரை வழங்க நான் இங்கே இருக்கிறேன்."
    audio = generate_tts_audio(test_text, "ta")
    if audio:
        print(f"  Tamil TTS: OK ({len(audio)} bytes)")
        with open("test_tamil_output.mp3", "wb") as f:
            f.write(audio)
        print("  Audio saved to: test_tamil_output.mp3")
    else:
        print("  Tamil TTS: FAILED")

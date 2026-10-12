# Tamil Voice Not Working - Debugging Checklist

## 🔍 **Quick Diagnosis**

Please check these in order:

### **Step 1: Check Console Logs**

After clicking "பதிவு" (Register), you should see:

```
🚀 handleInitialUnlock called, language: ta
📝 Welcome message: விவசாயி டிஜிட்டல் ட்வின்-க்கு வரவேற்கிறோம்...
🇮🇳 TAMIL DETECTED! Will speak Tamil now...
🎤 TTS called with language: "ta", text: "விவசாயி..."
🇮🇳 Tamil language detected! Searching for Tamil voice...
```

**What to check**:
- ❓ Is `language: ta` showing?
- ❓ Is the welcome message in Tamil script?
- ❓ Do you see "TAMIL DETECTED!"?

### **Step 2: Check Browser Audio**

**Common Issues**:

1. **Browser Muted**
   - Check browser tab icon for mute symbol
   - Right-click tab → Unmute site

2. **System Volume**
   - Check Windows volume mixer
   - Make sure browser isn't muted

3. **Autoplay Blocked**
   - Some browsers block autoplay
   - Try clicking anywhere on page first

### **Step 3: Test Voice Manually**

Open browser console (F12) and run:

```javascript
// Test 1: Check available voices
speechSynthesis.getVoices().forEach(v => console.log(v.name, v.lang));

// Test 2: Simple Tamil test
const test = new SpeechSynthesisUtterance('வணக்கம்');
test.lang = 'ta-IN';
speechSynthesis.speak(test);

// Test 3: English test (to verify audio works)
const test2 = new SpeechSynthesisUtterance('Hello');
speechSynthesis.speak(test2);
```

**Results**:
- ✅ If Test 3 works → Audio is working, Tamil voice issue
- ❌ If Test 3 doesn't work → Audio/browser issue
- ✅ If Test 2 works → Tamil voice is working!

### **Step 4: Check Language Prop**

The issue might be that `language` prop isn't being passed correctly.

**Check in Console**:
```javascript
// In ConversationalRegister component
console.log('Language prop:', language);
```

Should show: `Language prop: ta`

If it shows `Language prop: en`, the problem is in FarmerAuth not passing the prop.

### **Step 5: Force Tamil Voice**

If nothing works, try this temporary fix in `useTTS.js`:

```javascript
// Line 33, replace:
const speak = useCallback((text, callback, options = {}) => {

// With:
const speak = useCallback((text, callback, options = {}) => {
    console.log('🔊 SPEAK CALLED:', { text: text.substring(0, 30), language });
```

## 🛠️ **Quick Fixes**

### **Fix 1: Browser Autoplay**

Add this to the beginning of `handleInitialUnlock`:

```javascript
// Prime the audio
const silent = new SpeechSynthesisUtterance('');
silent.volume = 0;
window.speechSynthesis.speak(silent);
```

### **Fix 2: Force Voice Selection**

In `useTTS.js`, after line 60, add:

```javascript
utterance.lang = 'ta-IN';
console.log('🔊 Forcing Tamil language: ta-IN');
console.log('🔊 Available voices:', voices.map(v => v.name).join(', '));
```

### **Fix 3: Ensure Voice Loads**

Sometimes voices aren't loaded yet. Add this check:

```javascript
const voices = window.speechSynthesis.getVoices();
if (voices.length === 0) {
    console.warn('⚠️ No voices loaded yet, waiting...');
    // Wait for voices to load
    window.speechSynthesis.onvoiceschanged = () => {
        console.log('✅ Voices loaded!');
    };
}
```

## 📊 **Common Scenarios**

### **Scenario 1: No Sound at All**
**Symptoms**: Complete silence
**Likely Cause**: Browser audio blocked
**Solution**: 
- Check browser isn't muted
- Click on page before speaking
- Check Windows volume mixer

### **Scenario 2: English Voice Speaking Tamil**
**Symptoms**: Hear English voice trying to read Tamil
**Likely Cause**: No Tamil voice, using default
**Solution**: 
- This is expected without Heera
- Install Microsoft Heera for proper Tamil
- Current fallback should still work

### **Scenario 3: No Console Logs**
**Symptoms**: No logs appearing
**Likely Cause**: Language prop not passed
**Solution**:
- Check FarmerAuth is passing `language={language}`
- Verify language state is set to 'ta'

### **Scenario 4: Logs Show But No Sound**
**Symptoms**: Console shows speaking, but silent
**Likely Cause**: speechSynthesis blocked
**Solution**:
- Check `speechSynthesis.speaking` in console
- Try `speechSynthesis.cancel()` then retry
- Restart browser

## 🎯 **Immediate Test**

**Right now, do this**:

1. **Open Console** (F12)
2. **Paste this**:
```javascript
const msg = new SpeechSynthesisUtterance('வணக்கம் நண்பரே');
msg.lang = 'ta-IN';
msg.rate = 0.8;
speechSynthesis.speak(msg);
```
3. **Press Enter**

**Expected**: You should hear something (even if accented)

**If you hear nothing**:
- Try: `speechSynthesis.speak(new SpeechSynthesisUtterance('Hello'))`
- If this works, audio is fine, Tamil voice issue
- If this doesn't work, browser audio is blocked

## 📝 **What to Share**

Please share:
1. **Console logs** after clicking Register
2. **Result of Test 3** (English "Hello" test)
3. **Result of immediate test** (Tamil test above)
4. **Browser name and version**

This will help me identify the exact issue!

---

**Status**: 🔍 **DEBUGGING**

Please run the tests above and share the results!

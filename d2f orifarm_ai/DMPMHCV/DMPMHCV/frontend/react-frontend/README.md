# Farmer Digital Twin - React App

A comprehensive mobile-first React application for farmers with AI-powered guidance, crop analysis, voice assistance, and smart agriculture features.

## 🚀 Features

- **🤖 AI Digital Twin**: Emotional intelligence and personalized farming advice
- **🌾 Crop Health Analysis**: AI-powered disease detection and treatment recommendations
- **🎙️ Voice Assistant**: Natural language processing for hands-free farming support
- **🌍 Smart Agriculture**: Advanced farming analytics and IoT integration
- **🧠 Twin Intelligence**: Comprehensive AI capabilities overview
- **🔐 Authentication**: Secure account management and verification
- **📱 Mobile-First App Design**: Native mobile app experience with proper headers and navigation
- **👤 User Management**: Sign-in/sign-out with user profiles and status
- **🌐 Multi-Language**: English, Hindi, Spanish, French, Tamil support
- **♿ Accessible**: ARIA labels and keyboard navigation
- **💾 Persistent Sessions**: User authentication state maintained across sessions

## 📄 Application Pages

### 🏠 Main Dashboard (`/`)
The central hub featuring:
- Real-time emotional state monitoring
- Decision-making guidance buttons
- Navigation to all application features
- Language selection and account access

### 🔐 Authentication (`/auth`)
- User login and registration
- Secure account creation
- Password validation and error handling
- Account verification flow

### 🤖 AI Farmer Assistant (`/ai-farmer`)
- Interactive AI farming expert
- Topic-based farming advice (crops, soil, weather, markets, pests, irrigation, equipment)
- Quick question shortcuts
- Contextual farming recommendations

### 🌾 Crop Health Analyzer (`/crop-analyzer`)
- AI-powered crop disease detection
- Image upload and analysis
- Treatment recommendations
- Preventive care suggestions
- Real-time health assessment

### 🌍 Smart Agriculture World (`/smart-agriculture`)
- Comprehensive farming technology overview
- IoT and precision farming insights
- Success metrics and statistics
- Future farming technology showcase
- Mission and vision presentation

### 🧠 Twin Intelligence Hub (`/twin-intelligence`)
- AI capabilities demonstration
- Multi-language NLP showcase
- Computer vision explanations
- Predictive analytics overview
- Real-time processing statistics

### 🎙️ Voice Assistant (`/voice-assistant`)
- Speech-to-text farming queries
- Voice command processing
- Hands-free operation
- Natural language farming support
- Voice tips and examples

### ✅ Account Verification (`/verify`)
- Email verification system
- Secure account activation
- Verification code input
- Account benefits showcase
- Resend verification options

## 📱 Component Architecture

### Core Components

### 1. Header Component
```jsx
// frontend/react-frontend/src/components/Header.jsx
import React from 'react'

const Header = ({ t }) => {
  return (
    <header className="header">
      <span className="header-icon" role="img" aria-label="farmer">🌾</span>
      <h1>{t('title')}</h1>
      <p className="subtitle">{t('subtitle')}</p>
    </header>
  )
}

export default Header
```
**Purpose**: Displays the app title and branding
**Props**: `t` (translation function)

### 2. LanguageSelector Component
```jsx
// frontend/react-frontend/src/components/LanguageSelector.jsx
import React from 'react'

const LanguageSelector = ({ language, setLanguage, t }) => {
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <div className="language-selector">
      <label htmlFor="languageSelect">{t('selectLanguage')}</label>
      <select
        id="languageSelect"
        className="lang-select"
        value={language}
        onChange={handleLanguageChange}
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी (Hindi)</option>
        <option value="es">Español (Spanish)</option>
        <option value="fr">Français (French)</option>
        <option value="ta">தமிழ் (Tamil)</option>
      </select>
    </div>
  )
}

export default LanguageSelector
```
**Purpose**: Allows users to change language
**Props**: `language`, `setLanguage`, `t`

### 3. TwinStatus Component
```jsx
// frontend/react-frontend/src/components/TwinStatus.jsx
import React from 'react'

const TwinStatus = ({ emotionalState, t }) => {
  const getStatusColor = (value) => {
    if (!value || value === '-') return '#6b7280'
    if (value.includes('High') || value.includes('Stressed') || value.includes('மன அழுத்தம்')) return '#ef4444'
    if (value.includes('Low') || value.includes('Calm') || value.includes('அமைதி')) return '#22c55e'
    if (value.includes('Stable') || value.includes('நிலையான')) return '#3b82f6'
    return '#f59e0b' // Moderate/warning
  }

  return (
    <div className="card">
      <h2>{t('currentState')}</h2>

      <div className="state-grid">
        <div className="state">
          <span className="label">{t('emotionalState')}</span>
          <span
            className="value"
            style={{ color: getStatusColor(emotionalState.emotion) }}
          >
            {emotionalState.emotion || '-'}
          </span>
        </div>

        <div className="state">
          <span className="label">{t('stress')}</span>
          <span
            className="value"
            style={{ color: getStatusColor(emotionalState.stressLevel) }}
          >
            {emotionalState.stressLevel || '-'}
          </span>
        </div>

        <div className="state">
          <span className="label">{t('decisionReadiness')}</span>
          <span
            className="value"
            style={{ color: getStatusColor(emotionalState.decisionReadiness) }}
          >
            {emotionalState.decisionReadiness || '-'}
          </span>
        </div>

        <div className="state">
          <span className="label">{t('confidenceTrend')}</span>
          <span
            className="value"
            style={{ color: getStatusColor(emotionalState.confidenceTrend) }}
          >
            {emotionalState.confidenceTrend || '-'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TwinStatus
```
**Purpose**: Shows current emotional and decision-making state
**Props**: `emotionalState`, `t`

### 4. DecisionSelection Component
```jsx
// frontend/react-frontend/src/components/DecisionSelection.jsx
import React from 'react'

const DecisionSelection = ({ onDecision, onAskDoubt, isLoading, t }) => {
  const handleDecision = (action) => {
    if (!isLoading) {
      onDecision(action)
    }
  }

  return (
    <div className="card">
      <h2>{t('whatPlanning')}</h2>

      <div className="decision-buttons">
        <button
          className="action-btn btn-secondary"
          onClick={() => handleDecision('sell')}
          disabled={isLoading}
          aria-label="Sell crops now"
        >
          💰 {t('sellCrop')}
        </button>

        <button
          className="action-btn btn-secondary"
          onClick={() => handleDecision('invest')}
          disabled={isLoading}
          aria-label="Buy fertilizer and inputs"
        >
          🌱 {t('buyFertilizer')}
        </button>

        <button
          className="action-btn btn-secondary"
          onClick={() => handleDecision('wait')}
          disabled={isLoading}
          aria-label="Wait and observe"
        >
          ⏳ {t('waitObserve')}
        </button>

        <button
          className="action-btn btn-outline"
          onClick={onAskDoubt}
          disabled={isLoading}
          aria-label="Ask your digital twin"
        >
          🤔 {t('askYourTwin')}
        </button>
      </div>

      {isLoading && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
          Analyzing your decision...
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  )
}

export default DecisionSelection
```
**Purpose**: Main decision-making interface
**Props**: `onDecision`, `onAskDoubt`, `isLoading`, `t`

### 5. AdvisoryCard Component
```jsx
// frontend/react-frontend/src/components/AdvisoryCard.jsx
import React from 'react'

const AdvisoryCard = ({ text, onConfirm, onAskMore, t }) => {
  return (
    <div className="card">
      <h2>{t('suggestedGuidance')}</h2>

      <div className="advisory-content">
        <div className="advisory-text">
          {text}
        </div>
      </div>

      <div className="nav-buttons">
        <button className="action-btn btn-primary" onClick={onConfirm}>
          {t('iUnderstand')}
        </button>

        {onAskMore && (
          <button className="action-btn btn-outline" onClick={onAskMore}>
            🤔 Ask More Questions
          </button>
        )}
      </div>
    </div>
  )
}

export default AdvisoryCard
```
**Purpose**: Displays AI-generated advice
**Props**: `text`, `onConfirm`, `onAskMore`, `t`

### 6. TwinDoubtCard Component
```jsx
// frontend/react-frontend/src/components/TwinDoubtCard.jsx
import React, { useState } from 'react'

const TwinDoubtCard = ({ onAsk, answer, isLoading, onBack, t }) => {
  const [doubt, setDoubt] = useState('')

  const handleSubmit = () => {
    if (doubt.trim() && !isLoading) {
      onAsk(doubt.trim())
    }
  }

  return (
    <div className="card">
      <h2>{t('askYourTwin')}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        {t('askAnything')}
      </p>

      <div className="doubt-form">
        <div className="doubt-input-wrapper">
          <textarea
            className="doubt-textarea"
            value={doubt}
            onChange={(e) => setDoubt(e.target.value)}
            placeholder={t('typeDoubt')}
            disabled={isLoading}
            aria-label="Type your question"
          />
          <button
            className="mic-btn"
            title="Voice input (coming soon)"
            disabled={isLoading}
            aria-label="Voice input"
          >
            🎤
          </button>
        </div>

        <button
          className="action-btn btn-primary"
          onClick={handleSubmit}
          disabled={!doubt.trim() || isLoading}
        >
          {t('askDigitalTwin')}
          {isLoading && <div className="loading-spinner"></div>}
        </button>
      </div>

      {answer && (
        <div className="advisory-content">
          <div className="advisory-text">
            <strong>Digital Twin Response:</strong><br />
            {answer}
          </div>
        </div>
      )}

      <div className="nav-buttons">
        <button className="btn-back" onClick={onBack}>
          ← Back to Main
        </button>
      </div>
    </div>
  )
}

export default TwinDoubtCard
```
**Purpose**: Interface for asking questions to AI
**Props**: `onAsk`, `answer`, `isLoading`, `onBack`, `t`

### 7. StressOverlay Component
```jsx
// frontend/react-frontend/src/components/StressOverlay.jsx
import React from 'react'

const StressOverlay = ({ onContinue, t }) => {
  return (
    <div className="overlay">
      <div className="overlay-box">
        <h2>{t('pauseMoment')}</h2>
        <p>
          {t('highStress')}<br />
          {t('calmStep')}
        </p>
        <button className="action-btn btn-primary" onClick={onContinue}>
          {t('continueCalmly')}
        </button>
      </div>
    </div>
  )
}

export default StressOverlay
```
**Purpose**: Stress intervention overlay
**Props**: `onContinue`, `t`

### 8. Navigation Component
```jsx
// frontend/react-frontend/src/components/Navigation.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
  const navigate = useNavigate()

  const navItems = [
    {
      path: '/ai-farmer',
      icon: '🤖',
      title: 'AI Farmer',
      description: 'Expert farming AI assistant'
    },
    {
      path: '/crop-analyzer',
      icon: '🌾',
      title: 'Crop Analyzer',
      description: 'AI crop health analysis'
    },
    {
      path: '/smart-agriculture',
      icon: '🌍',
      title: 'Smart Agriculture',
      description: 'Advanced farming solutions'
    },
    {
      path: '/twin-intelligence',
      icon: '🧠',
      title: 'Twin Intelligence',
      description: 'AI capabilities overview'
    },
    {
      path: '/voice-assistant',
      icon: '🎙️',
      title: 'Voice Assistant',
      description: 'Voice-powered farming help'
    },
    {
      path: '/auth',
      icon: '🔐',
      title: 'Sign In',
      description: 'Account access & verification'
    }
  ]

  return (
    <div className="navigation-section">
      <div className="card">
        <h2>🚀 Explore Features</h2>
        <p>Discover all the powerful tools available in your Farmer Digital Twin</p>

        <div className="nav-grid">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="nav-card"
              onClick={() => navigate(item.path)}
            >
              <div className="nav-icon">{item.icon}</div>
              <div className="nav-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="nav-arrow">→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navigation
```
**Purpose**: Navigation hub to access all application features
**Features**: Interactive cards, feature highlights, responsive grid

### 9. AuthPage Component
```jsx
// frontend/react-frontend/src/components/AuthPage.jsx
import React, { useState } from 'react'

const AuthPage = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  // Form validation, submission, and error handling
  // Tab switching between login/register modes

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Complete authentication form with validation */}
      </div>
    </div>
  )
}

export default AuthPage
```
**Purpose**: User authentication and account management
**Features**: Login/Register tabs, form validation, error handling

### 10. CropAnalyzerPage Component
```jsx
// frontend/react-frontend/src/components/CropAnalyzerPage.jsx
import React, { useState, useRef } from 'react'

const CropAnalyzerPage = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Image upload and AI analysis functionality
  // Results display with treatment recommendations

  return (
    <div className="crop-analyzer-page">
      {/* Image upload interface */}
      {/* AI analysis results */}
      {/* Treatment and prevention recommendations */}
    </div>
  )
}

export default CropAnalyzerPage
```
**Purpose**: AI-powered crop disease detection and health analysis
**Features**: Image upload, AI analysis, treatment recommendations

### Additional Page Components

- **SmartAgricultureWorldPage**: Comprehensive farming technology overview
- **TwinIntelligencePage**: AI capabilities demonstration and exploration
- **VoiceAssistantPage**: Voice recognition and speech-to-text interface
- **VerifyPage**: Account verification and email confirmation system

## 🎨 CSS Styling

The app uses a mobile-first design with clean, accessible styling:

```css
/* Key CSS Variables */
:root {
  --primary-color: #16a34a;
  --secondary-color: #0ea5e9;
  --text-primary: #1f2937;
  --bg-primary: #ffffff;
  --border-color: #e5e7eb;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --radius-md: 12px;
  --transition: 0.2s ease;
}

/* Mobile-first responsive design */
@media (max-width: 480px) {
  .app { padding: 0.75rem; }
  .card { padding: 1.25rem; }
}
```

## 🚀 Running the Application

### Backend Setup
```bash
cd backend
python app.py
```
Runs on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend/react-frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

### API Endpoints Used
- `POST /api/ask-twin` - Get AI advice
- `POST /api/analyze-emotion` - Analyze emotional state

## 📱 Mobile App Features

### Header & Navigation
- **Sticky Header**: Always visible mobile app header with user info
- **User Avatar**: Profile picture with dropdown menu
- **Sign-in Status**: Visual indication of authentication state
- **Logout Functionality**: Secure sign-out with session cleanup
- **Language Selector**: Integrated language switching

### Touch & Interaction
- **Touch-friendly buttons** (minimum 44px touch targets)
- **Responsive grid layouts**
- **Optimized typography** for mobile screens
- **Accessible form controls** with proper labels
- **Loading states** with visual feedback
- **Error handling** with user-friendly messages
- **Swipe gestures** support for navigation

### Native Mobile Experience
- **Safe Area Support**: iOS notch and Android navigation bar compatibility
- **Status Bar Simulation**: Authentic mobile app appearance
- **Bottom Safe Area**: Proper spacing for mobile navigation
- **Touch Interactions**: Optimized for touch devices
- **Dark Mode Ready**: Automatic theme switching support

## 🌍 Internationalization

Supports 5 languages with complete translations for all UI elements. Language switching is persistent and affects all text content including API responses.

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast color schemes
- Reduced motion support

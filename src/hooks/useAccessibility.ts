import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'

// Accessibility settings interface
export interface AccessibilitySettings {
  language: 'en' | 'es' | 'zh'
  fontSize: 'normal' | 'large' | 'extra-large'
  highContrast: boolean
  screenReader: boolean
  voiceSpeed: number
  autoRead: boolean
  reducedMotion: boolean
  subtitles: boolean
  signLanguage: boolean
}

// Default accessibility settings
const defaultSettings: AccessibilitySettings = {
  language: 'en',
  fontSize: 'normal',
  highContrast: false,
  screenReader: false,
  voiceSpeed: 1,
  autoRead: false,
  reducedMotion: false,
  subtitles: false,
  signLanguage: false
}

export function useAccessibility() {
  const [settings, setSettings, deleteSettings] = useKV<AccessibilitySettings>('accessibility-settings', defaultSettings)
  const [isReading, setIsReading] = useState(false)

  // Apply accessibility settings to document
  useEffect(() => {
    // Font size adjustments
    const root = document.documentElement
    switch (settings.fontSize) {
      case 'large':
        root.style.fontSize = '22px'
        break
      case 'extra-large':
        root.style.fontSize = '26px'
        break
      default:
        root.style.fontSize = '18px'
    }

    // High contrast mode
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    // Screen reader announcements
    if (settings.screenReader) {
      root.setAttribute('aria-live', 'polite')
    }
  }, [settings])

  // Text-to-speech functionality
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel() // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = settings.voiceSpeed
      utterance.lang = settings.language === 'es' ? 'es-ES' : settings.language === 'zh' ? 'zh-CN' : 'en-US'
      
      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => setIsReading(false)
      utterance.onerror = () => setIsReading(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  // Stop speech
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    }
  }

  // Update individual setting
  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(current => ({ ...current, [key]: value }))
  }

  // Reset to defaults
  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return {
    settings,
    updateSetting,
    resetSettings,
    speakText,
    stopSpeaking,
    isReading
  }
}
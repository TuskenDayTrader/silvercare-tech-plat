import React, { useState, useEffect } from 'react'
import { Mic, MicSlash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface VoiceControlProps {
  onCommand: (command: string) => void
  isActive?: boolean
  language?: 'en' | 'es' | 'zh'
}

const VoiceControl: React.FC<VoiceControlProps> = ({ onCommand, isActive = true, language = 'en' }) => {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    try {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognitionInstance = new SpeechRecognition()
        
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        // Set language based on prop
        recognitionInstance.lang = language === 'es' ? 'es-ES' : language === 'zh' ? 'zh-CN' : 'en-US'

        recognitionInstance.onstart = () => {
          setIsListening(true)
          const message = language === 'es' ? 'Escuchando... Diga su comando' : 
                         language === 'zh' ? '正在聆听...请说出您的命令' : 
                         'Listening... Speak your command'
          toast.info(message)
        }

        recognitionInstance.onresult = (event) => {
          try {
            const transcript = event.results[0][0].transcript.toLowerCase().trim()
            if (transcript && onCommand) {
              onCommand(transcript)
              toast.success(`Command heard: "${transcript}"`)
            }
          } catch (error) {
            console.error('Speech recognition result error:', error)
            toast.error('Error processing voice command')
          }
        }

        recognitionInstance.onerror = (event) => {
          setIsListening(false)
          if (event.error !== 'aborted') {
            console.error('Speech recognition error:', event.error)
            toast.error('Voice recognition error. Please try again.')
          }
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
      }
    } catch (error) {
      console.error('Voice recognition initialization error:', error)
    }

    return () => {
      try {
        if (recognition) {
          recognition.abort()
        }
      } catch (error) {
        console.error('Voice recognition cleanup error:', error)
      }
    }
  }, [onCommand])

  const toggleListening = () => {
    try {
      if (!recognition) {
        toast.error('Voice recognition not supported in this browser')
        return
      }

      if (isListening) {
        recognition.stop()
      } else {
        recognition.start()
      }
    } catch (error) {
      console.error('Voice recognition toggle error:', error)
      toast.error('Voice recognition unavailable')
      setIsListening(false)
    }
  }

  if (!isActive) return null

  return (
    <Button
      onClick={toggleListening}
      variant={isListening ? "default" : "outline"}
      size="lg"
      className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
        isListening 
          ? 'animate-pulse btn-blue' 
          : 'btn-silver hover:scale-105'
      }`}
      style={{
        boxShadow: isListening 
          ? 'var(--shadow-blue)' 
          : 'var(--shadow-silver)'
      }}
      aria-label={isListening ? 'Stop listening' : 'Start voice commands'}
    >
      {isListening ? (
        <MicSlash 
          size={24} 
          className="heart-icon text-accent-foreground" 
        />
      ) : (
        <Mic 
          size={24} 
          className="heart-icon"
          style={{
            color: '#6c757d',
            filter: 'drop-shadow(0 1px 2px rgba(255,255,255,0.8))'
          }}
        />
      )}
    </Button>
  )
}

export default VoiceControl
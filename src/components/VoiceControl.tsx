import React, { useState, useEffect } from 'react'
import { Mic, MicSlash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface VoiceControlProps {
  onCommand: (command: string) => void
  isActive?: boolean
}

const VoiceControl: React.FC<VoiceControlProps> = ({ onCommand, isActive = true }) => {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'

      recognitionInstance.onstart = () => {
        setIsListening(true)
        toast.info('Listening... Speak your command')
      }

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim()
        onCommand(transcript)
        toast.success(`Command heard: "${transcript}"`)
      }

      recognitionInstance.onerror = (event) => {
        setIsListening(false)
        if (event.error !== 'aborted') {
          toast.error('Voice recognition error. Please try again.')
        }
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }

    return () => {
      if (recognition) {
        recognition.abort()
      }
    }
  }, [onCommand])

  const toggleListening = () => {
    if (!recognition) {
      toast.error('Voice recognition not supported in this browser')
      return
    }

    if (isListening) {
      recognition.stop()
    } else {
      recognition.start()
    }
  }

  if (!isActive) return null

  return (
    <Button
      onClick={toggleListening}
      variant={isListening ? "default" : "outline"}
      size="lg"
      className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
        isListening ? 'animate-pulse bg-accent hover:bg-accent/90' : 'hover:scale-105'
      }`}
      aria-label={isListening ? 'Stop listening' : 'Start voice commands'}
    >
      {isListening ? (
        <MicSlash size={24} className="text-accent-foreground" />
      ) : (
        <Mic size={24} />
      )}
    </Button>
  )
}

export default VoiceControl
import React from 'react'
import { Hand } from '@phosphor-icons/react'

interface SignLanguageInterpreterProps {
  isActive: boolean
  language: 'en' | 'es' | 'zh'
}

const SignLanguageInterpreter: React.FC<SignLanguageInterpreterProps> = ({ isActive, language }) => {
  if (!isActive) return null

  const getInterpreterText = () => {
    switch (language) {
      case 'es':
        return {
          title: 'Intérprete de',
          subtitle: 'Lenguaje de Señas'
        }
      case 'zh':
        return {
          title: '手语',
          subtitle: '翻译员'
        }
      default:
        return {
          title: 'Sign Language',
          subtitle: 'Interpreter'
        }
    }
  }

  const text = getInterpreterText()

  return (
    <div 
      className="sign-language-overlay" 
      role="img" 
      aria-label={`${text.title} ${text.subtitle}`}
    >
      <div className="text-center">
        <Hand size={32} className="mb-2 mx-auto" />
        <div className="text-sm font-semibold">{text.title}</div>
        <div className="text-xs">{text.subtitle}</div>
        <div className="text-xs mt-2 opacity-80">
          {language === 'es' ? 'Disponible' : language === 'zh' ? '可用' : 'Available'}
        </div>
      </div>
    </div>
  )
}

export default SignLanguageInterpreter
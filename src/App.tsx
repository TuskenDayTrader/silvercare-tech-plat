import React, { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import VoiceControl from '@/components/VoiceControl'
import HomePage from '@/components/HomePage'
import RegistrationPage from '@/components/RegistrationPage'
import GalleryPage from '@/components/GalleryPage'
import LearnMorePage from '@/components/LearnMorePage'

type Page = 'home' | 'register' | 'gallery' | 'learn-more'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    
    if (lowerCommand.includes('home') || lowerCommand.includes('go home')) {
      setCurrentPage('home')
    } else if (lowerCommand.includes('register') || lowerCommand.includes('sign up') || lowerCommand.includes('connect')) {
      setCurrentPage('register')
    } else if (lowerCommand.includes('gallery') || lowerCommand.includes('moments') || lowerCommand.includes('photos')) {
      setCurrentPage('gallery')
    } else if (lowerCommand.includes('learn more') || lowerCommand.includes('information') || lowerCommand.includes('research')) {
      setCurrentPage('learn-more')
    } else if (lowerCommand.includes('scroll down') || lowerCommand.includes('scroll')) {
      window.scrollBy({ top: 300, behavior: 'smooth' })
    } else if (lowerCommand.includes('scroll up') || lowerCommand.includes('top')) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />
      case 'register':
        return <RegistrationPage onNavigate={setCurrentPage} />
      case 'gallery':
        return <GalleryPage onNavigate={setCurrentPage} />
      case 'learn-more':
        return <LearnMorePage onNavigate={setCurrentPage} />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  return (
    <>
      {renderPage()}
      <VoiceControl onCommand={handleVoiceCommand} />
      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
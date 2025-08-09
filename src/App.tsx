import React, { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import VoiceControl from '@/components/VoiceControl'
import HomePage from '@/components/HomePage'
import RegistrationPage from '@/components/RegistrationPage'
import GalleryPage from '@/components/GalleryPage'
import LearnMorePage from '@/components/LearnMorePage'
import SeniorResourcesPage from '@/components/SeniorResourcesPage'
import ErrorBoundary from '@/components/ErrorBoundary'

type Page = 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  // Safe navigation handler with validation and error boundary
  const handleNavigation = (page: Page) => {
    try {
      const validPages: Page[] = ['home', 'register', 'gallery', 'learn-more', 'senior-resources']
      if (validPages.includes(page)) {
        setCurrentPage(page)
        // Scroll to top when navigating to a new page
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        console.warn(`Invalid navigation attempt to: ${page}`)
        setCurrentPage('home') // Fallback to home
      }
    } catch (error) {
      console.error('Navigation error:', error)
      // Extra safety - fallback to home on any error
      setCurrentPage('home')
    }
  }

  const handleVoiceCommand = (command: string) => {
    try {
      const lowerCommand = command.toLowerCase()
      
      if (lowerCommand.includes('home') || lowerCommand.includes('go home')) {
        handleNavigation('home')
      } else if (lowerCommand.includes('register') || lowerCommand.includes('sign up') || lowerCommand.includes('connect')) {
        handleNavigation('register')
      } else if (lowerCommand.includes('gallery') || lowerCommand.includes('moments') || lowerCommand.includes('photos')) {
        handleNavigation('gallery')
      } else if (lowerCommand.includes('learn more') || lowerCommand.includes('information') || lowerCommand.includes('research')) {
        handleNavigation('learn-more')
      } else if (lowerCommand.includes('senior resources') || lowerCommand.includes('happiness') || lowerCommand.includes('engagement')) {
        handleNavigation('senior-resources')
      } else if (lowerCommand.includes('scroll down') || lowerCommand.includes('scroll')) {
        window.scrollBy({ top: 300, behavior: 'smooth' })
      } else if (lowerCommand.includes('scroll up') || lowerCommand.includes('top')) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        console.log(`Unrecognized voice command: ${command}`)
      }
    } catch (error) {
      console.error('Voice command processing error:', error)
      // Don't crash the app on voice command errors
    }
  }

  const renderPage = () => {
    try {
      switch (currentPage) {
        case 'home':
          return <HomePage onNavigate={handleNavigation} />
        case 'register':
          return <RegistrationPage onNavigate={handleNavigation} />
        case 'gallery':
          return <GalleryPage onNavigate={handleNavigation} />
        case 'learn-more':
          return <LearnMorePage onNavigate={handleNavigation} />
        case 'senior-resources':
          return <SeniorResourcesPage onNavigate={handleNavigation} />
        default:
          // Fallback to home page if invalid page state
          handleNavigation('home')
          return <HomePage onNavigate={handleNavigation} />
      }
    } catch (error) {
      console.error('Page rendering error:', error)
      // Fallback to home page on any rendering error
      return <HomePage onNavigate={handleNavigation} />
    }
  }

  return (
    <ErrorBoundary onNavigateHome={() => handleNavigation('home')}>
      {renderPage()}
      <VoiceControl onCommand={handleVoiceCommand} />
      <Toaster position="top-center" richColors />
    </ErrorBoundary>
  )
}

export default App
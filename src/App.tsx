import React, { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import VoiceControl from '@/components/VoiceControl'
import HomePage from '@/components/HomePage'
import RegistrationPage from '@/components/RegistrationPage'
import GalleryPage from '@/components/GalleryPage'
import LearnMorePage from '@/components/LearnMorePage'
import SeniorResourcesPage from '@/components/SeniorResourcesPage'
import AuthPage from '@/components/AuthPage'
import BookingPage from '@/components/BookingPage'
import AdminDashboard from '@/components/AdminDashboard'
import ErrorBoundary from '@/components/ErrorBoundary'
import AccessibilityPanel from '@/components/AccessibilityPanel'
import SignLanguageInterpreter from '@/components/SignLanguageInterpreter'
import { useAccessibility } from '@/hooks/useAccessibility'
import { useAuth } from '@/hooks/useAuth'
import { useTranslation } from '@/lib/translations'
import DemoBanner from '@/components/DemoBanner'

type Page = 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources' | 'auth' | 'booking' | 'admin-dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const { settings, speakText } = useAccessibility()
  const { user, isAuthenticated, isAdmin } = useAuth()
  const { t } = useTranslation(settings.language)
  const [subtitleText, setSubtitleText] = useState('')
  const [showSubtitles, setShowSubtitles] = useState(false)

  // Handle subtitle display
  useEffect(() => {
    if (settings.subtitles && subtitleText) {
      setShowSubtitles(true)
      const timer = setTimeout(() => setShowSubtitles(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [subtitleText, settings.subtitles])

  // Auto-read page content when autoRead is enabled
  useEffect(() => {
    if (settings.autoRead) {
      const timer = setTimeout(() => {
        const pageContent = document.querySelector('main')?.textContent || ''
        const firstParagraph = pageContent.split('.')[0] + '.'
        speakText(firstParagraph)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentPage, settings.autoRead, speakText])

  // Safe navigation handler with validation and error boundary
  const handleNavigation = (page: Page) => {
    try {
      const validPages: Page[] = ['home', 'register', 'gallery', 'learn-more', 'senior-resources', 'auth', 'booking', 'admin-dashboard']
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
      
      // Set subtitle text for voice commands
      if (settings.subtitles) {
        setSubtitleText(`Voice command: "${command}"`)
      }
      
      // Multi-language voice command support
      const homeCommands = ['home', 'go home', 'inicio', 'ir a inicio', '首页', '回到首页']
      const registerCommands = ['register', 'sign up', 'connect', 'registrar', 'conectar', '注册', '连接']
      const galleryCommands = ['gallery', 'moments', 'photos', 'galería', 'momentos', 'fotos', '画廊', '照片', '时光']
      const learnCommands = ['learn more', 'information', 'research', 'aprender más', 'información', '了解更多', '信息']
      const resourceCommands = ['senior resources', 'happiness', 'engagement', 'recursos', 'felicidad', '资源', '幸福']
      const authCommands = ['login', 'sign in', 'account', 'iniciar sesión', 'cuenta', '登录', '账户']
      const bookingCommands = ['booking', 'schedule', 'appointment', 'reserva', 'cita', '预约', '安排']
      const adminCommands = ['admin', 'dashboard', 'administrador', 'panel', '管理员', '仪表板']
      
      if (homeCommands.some(cmd => lowerCommand.includes(cmd))) {
        handleNavigation('home')
      } else if (registerCommands.some(cmd => lowerCommand.includes(cmd))) {
        handleNavigation('register')
      } else if (galleryCommands.some(cmd => lowerCommand.includes(cmd))) {
        handleNavigation('gallery')
      } else if (learnCommands.some(cmd => lowerCommand.includes(cmd))) {
        handleNavigation('learn-more')
      } else if (resourceCommands.some(cmd => lowerCommand.includes(cmd))) {
        handleNavigation('senior-resources')
      } else if (authCommands.some(cmd => lowerCommand.includes(cmd))) {
        handleNavigation('auth')
      } else if (bookingCommands.some(cmd => lowerCommand.includes(cmd))) {
        if (isAuthenticated) {
          handleNavigation('booking')
        } else {
          handleNavigation('auth')
        }
      } else if (adminCommands.some(cmd => lowerCommand.includes(cmd))) {
        if (isAdmin) {
          handleNavigation('admin-dashboard')
        } else {
          handleNavigation('auth')
        }
      } else if (lowerCommand.includes('scroll down') || lowerCommand.includes('scroll') || lowerCommand.includes('bajar') || lowerCommand.includes('向下滚动')) {
        window.scrollBy({ top: 300, behavior: 'smooth' })
      } else if (lowerCommand.includes('scroll up') || lowerCommand.includes('top') || lowerCommand.includes('arriba') || lowerCommand.includes('向上滚动')) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        console.log(`Unrecognized voice command: ${command}`)
        if (settings.subtitles) {
          setSubtitleText('Command not recognized. Try saying "home", "register", "gallery", "learn more", "login", "booking", or "admin".')
        }
      }
    } catch (error) {
      console.error('Voice command processing error:', error)
      // Don't crash the app on voice command errors
    }
  }

  const renderPage = () => {
    try {
      const pageProps = {
        onNavigate: handleNavigation,
        language: settings.language,
        t
      }
      
      switch (currentPage) {
        case 'home':
          return <HomePage {...pageProps} />
        case 'register':
          return <RegistrationPage {...pageProps} />
        case 'gallery':
          return <GalleryPage {...pageProps} />
        case 'learn-more':
          return <LearnMorePage {...pageProps} />
        case 'senior-resources':
          return <SeniorResourcesPage {...pageProps} />
        case 'auth':
          return <AuthPage {...pageProps} />
        case 'booking':
          return <BookingPage {...pageProps} />
        case 'admin-dashboard':
          return <AdminDashboard {...pageProps} />
        default:
          // Fallback to home page if invalid page state
          handleNavigation('home')
          return <HomePage {...pageProps} />
      }
    } catch (error) {
      console.error('Page rendering error:', error)
      // Fallback to home page on any rendering error
      return <HomePage onNavigate={handleNavigation} language={settings.language} t={t} />
    }
  }

  return (
    <ErrorBoundary onNavigateHome={() => handleNavigation('home')}>
      {/* Skip link for screen readers */}
      <a href="#main-content" className="skip-link">
        {t.language === 'es' ? 'Ir al contenido principal' : 
         t.language === 'zh' ? '跳转到主要内容' : 
         'Skip to main content'}
      </a>
      
      {/* ARIA live region for announcements */}
      <div id="aria-announcements" className="sr-only" aria-live="polite" aria-atomic="true"></div>
      
      {/* Demo banner */}
      {import.meta.env.VITE_DEMO_MODE === 'true' && <DemoBanner />}
      
      {/* Main content */}
      <main id="main-content" tabIndex={-1}>
        {renderPage()}
      </main>
      
      {/* Accessibility Panel */}
      <AccessibilityPanel onLanguageChange={(language) => {
        // Handle any additional language change logic if needed
        console.log('Language changed to:', language)
      }} />
      
      {/* Voice Control */}
      <VoiceControl onCommand={handleVoiceCommand} language={settings.language} />
      
      {/* Subtitle overlay */}
      {showSubtitles && subtitleText && (
        <div className="subtitle-overlay" role="status" aria-live="polite">
          {subtitleText}
        </div>
      )}
      
      {/* Sign language interpreter overlay */}
      <SignLanguageInterpreter 
        isActive={settings.signLanguage} 
        language={settings.language} 
      />
      
      {/* Toast notifications */}
      <Toaster position="top-center" richColors />
    </ErrorBoundary>
  )
}

export default App
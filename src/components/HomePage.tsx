import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Heart, Phone, Sparkles } from '@phosphor-icons/react'
import Logo from '@/components/Logo'
import type { TranslationContent } from '@/lib/translations'

interface HomePageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources' | 'auth' | 'booking' | 'admin-dashboard') => void
  language: 'en' | 'es' | 'zh'
  t: TranslationContent
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, language, t }) => {
  const handleNavigation = (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources' | 'auth' | 'booking' | 'admin-dashboard') => {
    try {
      onNavigate(page)
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback - stay on current page
    }
  }

  return (
    <div className="min-h-screen premium-gradient">
      <header className="container mx-auto px-6 py-8">
        <Logo size="lg" />
      </header>

      <main className="container mx-auto px-6 pb-24">
        <section className="text-center mb-16">
          <h1 
            className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight"
            style={{
              textShadow: 'var(--text-shadow-silver)',
              background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            {t.tagline}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t.problemStatement}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-blue text-lg px-8 py-6 font-semibold"
              onClick={() => handleNavigation('auth')}
              aria-label={language === 'es' ? 'Programar Conexión' : language === 'zh' ? '安排连接' : 'Schedule Connection'}
            >
              {language === 'es' ? 'Programar Conexión' : language === 'zh' ? '安排连接' : 'Schedule Connection'}
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 font-semibold border-2 hover:bg-secondary/50"
              onClick={() => handleNavigation('register')}
              aria-label={t.signUpCTA}
            >
              {t.signUpCTA}
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="premium-card p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6 metallic-silver">
                <Users size={32} className="text-destructive heart-icon" />
              </div>
              <h3 
                className="text-2xl font-semibold mb-4"
                style={{
                  background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: 'var(--text-shadow-silver)'
                }}
              >
                {language === 'es' ? 'El Desafío' : language === 'zh' ? '挑战' : 'The Challenge'}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.problemStatement}
              </p>
              <p className="text-sm text-muted-foreground mt-4 italic">
                {language === 'es' ? 'Fuente: Investigación AARP' : 
                 language === 'zh' ? '来源：AARP 研究' : 
                 'Source: AARP Research'}
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-16 h-16 metallic-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-accent-foreground heart-icon" />
              </div>
              <h3 
                className="text-2xl font-semibold mb-4"
                style={{
                  background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: 'var(--text-shadow-silver)'
                }}
              >
                {t.solutionTitle}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.solutionDescription}
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-16 h-16 metallic-silver rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone size={32} className="text-primary heart-icon" />
              </div>
              <h3 
                className="text-2xl font-semibold mb-4"
                style={{
                  background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: 'var(--text-shadow-silver)'
                }}
              >
                {t.impactTitle}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.impactDescription}
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="premium-card rounded-2xl p-12 text-center">
          <h2 
            className="text-4xl font-bold mb-6"
            style={{
              background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: 'var(--text-shadow-silver)'
            }}
          >
            {language === 'es' ? '¿Listo para Reconectar?' : 
             language === 'zh' ? '准备重新连接？' : 
             'Ready to Reconnect?'}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'es' ? 'Únete a las familias que ya han descubierto la alegría de la conexión sin esfuerzo. Tu ser querido está a solo una llamada de sentirse más cerca de casa.' :
             language === 'zh' ? '加入已经发现轻松连接快乐的家庭。您的亲人距离感受到家的温暖只有一通电话的距离。' :
             'Join families who\'ve already discovered the joy of effortless connection. Your loved one is just one call away from feeling closer to home.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-silver text-lg px-8 py-6 font-semibold"
              onClick={() => handleNavigation('register')}
              aria-label={t.signUpCTA}
            >
              {language === 'es' ? 'Comienza a Conectar Hoy' :
               language === 'zh' ? '今天开始连接' :
               'Start Connecting Today'}
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-border hover:bg-secondary/50 transition-all duration-300"
              onClick={() => handleNavigation('gallery')}
              aria-label={t.galleryTitle}
            >
              {language === 'es' ? 'Ver Momentos Felices' :
               language === 'zh' ? '查看快乐时光' :
               'See Happy Moments'}
            </Button>
            <Button 
              size="lg" 
              className="btn-blue text-lg px-8 py-6 font-semibold"
              onClick={() => handleNavigation('senior-resources')}
              aria-label={t.seniorResources}
            >
              <Sparkles size={20} className="mr-2" />
              {t.seniorResources}
            </Button>
            <Button 
              size="lg" 
              className="btn-silver text-lg px-8 py-6 font-semibold"
              onClick={() => handleNavigation('learn-more')}
              aria-label={t.learnMore}
            >
              {t.learnMore}
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
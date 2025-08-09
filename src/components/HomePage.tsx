import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Heart, Phone } from '@phosphor-icons/react'
import Logo from '@/components/Logo'

interface HomePageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more') => void
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const handleNavigation = (page: 'home' | 'register' | 'gallery' | 'learn-more') => {
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
            Bridging Hearts Across Distance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Technology shouldn't be a barrier to love. We bring all the tech—our equipment, our setup. 
            Seniors just bring their face and smiles.
          </p>
          <Button 
            size="lg" 
            className="btn-gold text-lg px-8 py-6 font-semibold"
            onClick={() => handleNavigation('register')}
          >
            Connect Your Loved One Today
            <ArrowRight size={20} className="ml-2" />
          </Button>
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
                The Challenge
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Loneliness affects 60% of seniors in care facilities. Limited tech access 
                disconnects them from families when they need connection most.
              </p>
              <p className="text-sm text-muted-foreground mt-4 italic">Source: AARP Research</p>
            </CardContent>
          </Card>

          <Card className="premium-card p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="pt-6">
              <div className="w-16 h-16 metallic-gold rounded-full flex items-center justify-center mx-auto mb-6">
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
                Our Solution
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We handle everything technical. Professional setup, easy connections via video calls, 
                WhatsApp, or social media with packages tailored to your family's needs.
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
                The Impact
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Reduces isolation, strengthens family bonds, and creates priceless, heartwarming 
                moments for seniors and their loved ones.
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
            Ready to Reconnect?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join families who've already discovered the joy of effortless connection. 
            Your loved one is just one call away from feeling closer to home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-silver text-lg px-8 py-6 font-semibold"
              onClick={() => handleNavigation('register')}
            >
              Start Connecting Today
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-border hover:bg-secondary/50 transition-all duration-300"
              onClick={() => handleNavigation('gallery')}
            >
              See Happy Moments
            </Button>
            <Button 
              size="lg" 
              className="btn-gold text-lg px-8 py-6 font-semibold"
              onClick={() => handleNavigation('learn-more')}
            >
              Learn More About Our Research
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
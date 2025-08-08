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
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="container mx-auto px-6 py-8">
        <Logo size="lg" />
      </header>

      <main className="container mx-auto px-6 pb-24">
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Bridging Hearts Across Distance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Technology shouldn't be a barrier to love. We bring all the tech—our equipment, our setup. 
            Seniors just bring their face and smiles.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => handleNavigation('register')}
          >
            Connect Your Loved One Today
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center border-2 hover:border-primary/30 transition-colors">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-destructive" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">The Challenge</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Loneliness affects 60% of seniors in care facilities. Limited tech access 
                disconnects them from families when they need connection most.
              </p>
              <p className="text-sm text-muted-foreground mt-4 italic">Source: AARP Research</p>
            </CardContent>
          </Card>

          <Card className="p-8 text-center border-2 hover:border-primary/30 transition-colors">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Our Solution</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We handle everything technical. Professional setup, easy connections via video calls, 
                WhatsApp, or social media with packages tailored to your family's needs.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 text-center border-2 hover:border-primary/30 transition-colors">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">The Impact</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Reduces isolation, strengthens family bonds, and creates priceless, heartwarming 
                moments for seniors and their loved ones.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="bg-card rounded-2xl p-12 text-center shadow-lg">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Ready to Reconnect?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join families who've already discovered the joy of effortless connection. 
            Your loved one is just one call away from feeling closer to home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
              onClick={() => handleNavigation('register')}
            >
              Start Connecting Today
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              onClick={() => handleNavigation('gallery')}
            >
              See Happy Moments
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6"
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
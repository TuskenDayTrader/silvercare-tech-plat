import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Users, VideoCamera, Phone } from '@phosphor-icons/react'
import Logo from '@/components/Logo'

interface GalleryPageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more') => void
}

const galleryImages = [
  {
    id: 1,
    title: "A Smile Reunited",
    description: "Grandmother Mary's face lights up during her first video call with her grandchildren in months.",
    category: "Video Call"
  },
  {
    id: 2,
    title: "Cherished Memories",
    description: "Three generations sharing stories and laughter across the miles.",
    category: "Family Connection"
  },
  {
    id: 3,
    title: "Sunday Family Time",
    description: "Weekly virtual family dinners bringing everyone together, no matter the distance.",
    category: "Regular Calls"
  },
  {
    id: 4,
    title: "Birthday Celebrations",
    description: "Celebrating Grandpa's 85th birthday with family joining from five different states.",
    category: "Special Occasions"
  },
  {
    id: 5,
    title: "Reading Together",
    description: "Grandma reading bedtime stories to her grandchildren via video call.",
    category: "Activities"
  },
  {
    id: 6,
    title: "Holiday Traditions",
    description: "Sharing Christmas morning together through technology when travel isn't possible.",
    category: "Holidays"
  },
  {
    id: 7,
    title: "Daily Check-ins",
    description: "Simple morning conversations that make all the difference in feeling connected.",
    category: "Daily Connection"
  },
  {
    id: 8,
    title: "Group Celebrations",
    description: "Care facility residents joining virtual family gatherings and community events.",
    category: "Community"
  }
]

const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Video Call':
        return <VideoCamera size={20} className="heart-icon" style={{ color: '#6c757d' }} />
      case 'Family Connection':
        return <Users size={20} className="heart-icon" style={{ color: '#ff9f43' }} />
      case 'Special Occasions':
        return <Heart size={20} className="heart-icon" style={{ color: '#ffd93d' }} />
      default:
        return <Phone size={20} className="heart-icon" style={{ color: '#8e9aaf' }} />
    }
  }

  return (
    <div className="min-h-screen premium-gradient">
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('home')}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Button>
        </div>
        <Logo size="md" />
      </header>

      <main className="container mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h1 
            className="text-5xl font-bold mb-6"
            style={{
              background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: 'var(--text-shadow-silver)'
            }}
          >
            Moments of Joy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Real families, real connections, real smiles. See how SilverCare Tech transforms 
            the lives of seniors and their loved ones every single day.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {galleryImages.map((image) => (
            <Card key={image.id} className="premium-card group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="aspect-square metallic-silver rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl opacity-30 group-hover:opacity-50 transition-all duration-300 heart-icon">
                    {getCategoryIcon(image.category)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 
                      className="font-semibold text-lg"
                      style={{
                        background: 'linear-gradient(145deg, #495057 0%, #6c757d 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      {image.title}
                    </h3>
                    {getCategoryIcon(image.category)}
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {image.description}
                  </p>
                  
                  <div className="pt-2">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium metallic-gold"
                      style={{
                        background: 'linear-gradient(145deg, #ffd93d 0%, #ff9f43 100%)',
                        color: 'white',
                        textShadow: 'var(--text-shadow-gold)'
                      }}
                    >
                      {image.category}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
            Your Story Could Be Next
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every connection starts with a single conversation. Let us help you create 
            these precious moments with your loved one. No technical experience required—
            we handle everything so you can focus on what matters most: being together.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 metallic-silver rounded-full flex items-center justify-center mx-auto mb-4">
                <span 
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(145deg, #495057 0%, #6c757d 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  1
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Registration</h3>
              <p className="text-muted-foreground">Simple form, no tech knowledge needed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 metallic-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-foreground">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">We Setup Everything</h3>
              <p className="text-muted-foreground">Professional installation and training</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 metallic-silver rounded-full flex items-center justify-center mx-auto mb-4">
                <span 
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(145deg, #495057 0%, #6c757d 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  3
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Start Connecting</h3>
              <p className="text-muted-foreground">Immediate joy and lasting bonds</p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="btn-gold text-lg px-8 py-6 font-semibold"
            onClick={() => onNavigate('register')}
          >
            <Heart size={20} className="mr-2" />
            Join the Joy - Register Now
          </Button>
        </section>
      </main>
    </div>
  )
}

export default GalleryPage
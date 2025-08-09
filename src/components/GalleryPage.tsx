import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Users, VideoCamera, Phone } from '@phosphor-icons/react'
import Logo from '@/components/Logo'

// Import the new uploaded images
import st1 from '@/assets/images/st1.png.jpeg'
import st2 from '@/assets/images/st2.png_(1).jpeg'
import st3 from '@/assets/images/st3.png_(2).jpeg'
import st4 from '@/assets/images/st4.png_(3).jpeg'
import st5 from '@/assets/images/st5.png_(4).jpeg'
import st6 from '@/assets/images/st6.png_(5).jpeg'
import st7 from '@/assets/images/st7.png_(6).jpeg'
import st8 from '@/assets/images/st8.png_(7).jpeg'
import st9 from '@/assets/images/st9.png_(8).jpeg'

interface GalleryPageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources') => void
}

const galleryImages = [
  {
    id: 1,
    src: st1,
    title: "A Smile Reunited",
    description: "Grandmother Mary's face lights up during her first video call with her grandchildren in months.",
    category: "Video Call"
  },
  {
    id: 2,
    src: st2,
    title: "Cherished Memories",
    description: "Three generations sharing stories and laughter across the miles.",
    category: "Family Connection"
  },
  {
    id: 3,
    src: st3,
    title: "Sunday Family Time",
    description: "Weekly virtual family dinners bringing everyone together, no matter the distance.",
    category: "Regular Calls"
  },
  {
    id: 4,
    src: st4,
    title: "Technology Made Simple",
    description: "Professional setup ensures seniors can focus on what matters most - connecting with loved ones.",
    category: "Easy Setup"
  },
  {
    id: 5,
    src: st5,
    title: "Moments of Joy",
    description: "Every connection brings new smiles and heartwarming moments to cherish.",
    category: "Happy Moments"
  },
  {
    id: 6,
    src: st6,
    title: "Bridging the Distance",
    description: "Love knows no boundaries when technology brings families together.",
    category: "Connection"
  },
  {
    id: 7,
    src: st7,
    title: "Shared Celebrations",
    description: "Birthdays, holidays, and special moments celebrated together virtually.",
    category: "Celebrations"
  },
  {
    id: 8,
    src: st8,
    title: "Daily Check-ins",
    description: "Regular calls that provide comfort, companionship, and peace of mind.",
    category: "Daily Support"
  },
  {
    id: 9,
    src: st9,
    title: "Intergenerational Bonds",
    description: "Grandparents sharing wisdom and stories with the next generation.",
    category: "Legacy Sharing"
  }
]

const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Video Call':
        return <VideoCamera size={20} className="heart-icon" />
      case 'Family Connection':
        return <Users size={20} className="heart-icon" />
      case 'Happy Moments':
        return <Heart size={20} className="heart-icon" />
      default:
        return <Phone size={20} className="heart-icon" />
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
                <div className="aspect-square rounded-lg mb-4 overflow-hidden relative group-hover:shadow-lg transition-all duration-300">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium metallic-blue text-white"
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
            className="btn-blue text-lg px-8 py-6 font-semibold"
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
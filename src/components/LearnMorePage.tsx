import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Users, Phone, Video, Home, UserPlus, ArrowLeft, Shield, Lightbulb } from '@phosphor-icons/react'

interface LearnMorePageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more') => void;
}

const LearnMorePage: React.FC<LearnMorePageProps> = ({ onNavigate }) => {
  const handleNavigation = (page: 'home' | 'register' | 'gallery' | 'learn-more') => {
    try {
      onNavigate(page)
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback to home on error
      onNavigate('home')
    }
  }

  return (
    <div className="min-h-screen premium-gradient">
      {/* Header */}
      <header className="premium-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart 
              size={32} 
              className="heart-icon"
              style={{
                color: '#6c757d',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2)) drop-shadow(0 1px 2px rgba(255,255,255,0.8))'
              }}
            />
            <Heart 
              size={28} 
              className="heart-icon -ml-4"
              style={{
                color: '#ff9f43',
                filter: 'drop-shadow(0 1px 2px rgba(238, 90, 36, 0.3))'
              }}
            />
          </div>
          <h1 
            className="text-2xl font-bold"
            style={{
              background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: 'var(--text-shadow-silver)'
            }}
          >
            SilverCare Tech Research & Insights
          </h1>
          <p className="text-muted-foreground mt-2">
            Evidence-based solutions for senior isolation and family connection
          </p>
          <Button 
            variant="outline" 
            onClick={() => handleNavigation('home')}
            className="mt-4 border-2 hover:bg-secondary/50 transition-all duration-300"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Understanding Senior Loneliness */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle 
              className="text-3xl flex items-center gap-3"
              style={{
                background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: 'var(--text-shadow-silver)'
              }}
            >
              <Heart 
                size={32} 
                className="heart-icon"
                style={{
                  color: '#ffd93d',
                  filter: 'drop-shadow(0 1px 2px rgba(255, 217, 61, 0.5))'
                }}
              />
              Understanding Senior Loneliness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Senior loneliness is a significant public health concern, with studies indicating that more than one-third of older adults in the US report feelings of isolation or lack of companionship. This emotional distress can lead to depression and a diminished quality of life, often exacerbated by factors like living alone or losing close relationships.
              </p>

              <div className="metallic-gold p-4 my-6 rounded-lg border-l-4" style={{ borderLeftColor: '#ff9f43' }}>
                <p className="text-accent-foreground">
                  <strong>Key Statistic:</strong> The COVID-19 pandemic highlighted this vulnerability, with social restrictions intensifying isolation and underscoring the need for innovative solutions. Research shows that loneliness poses a risk comparable to major health factors like smoking or high blood pressure.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="text-center p-6 metallic-silver rounded-lg">
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{
                      background: 'linear-gradient(145deg, #ff9f43 0%, #ffd93d 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    40%
                  </div>
                  <div className="text-sm text-muted-foreground">Of older adults occasionally or frequently feel lonely</div>
                </div>
                <div className="text-center p-6 metallic-silver rounded-lg">
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{
                      background: 'linear-gradient(145deg, #ff9f43 0%, #ffd93d 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    50%
                  </div>
                  <div className="text-sm text-muted-foreground">Loneliness rates among those over 80</div>
                </div>
                <div className="text-center p-6 metallic-silver rounded-lg">
                  <div 
                    className="text-3xl font-bold mb-2"
                    style={{
                      background: 'linear-gradient(145deg, #ff9f43 0%, #ffd93d 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    34%
                  </div>
                  <div className="text-sm text-muted-foreground">Of older adults reported feeling isolated in 2023</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground">Key Contributing Factors:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Emotional loneliness:</strong> Lack of close attachments and meaningful relationships</li>
                  <li><strong>Social loneliness:</strong> Absence of a broader social network and community connection</li>
                  <li><strong>Life transitions:</strong> Loss of spouse, declining mobility, or geographic separation from family</li>
                  <li><strong>Limited reciprocity:</strong> Reduced social activity and perceived unfriendliness from caregivers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Role of Technology */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle 
              className="text-3xl flex items-center gap-3"
              style={{
                background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: 'var(--text-shadow-silver)'
              }}
            >
              <Phone 
                size={32} 
                className="heart-icon"
                style={{
                  color: '#ff9f43',
                  filter: 'drop-shadow(0 1px 2px rgba(238, 90, 36, 0.3))'
                }}
              />
              The Role of Modern Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Modern telecommunications, particularly cell phones and internet-based tools, offer promising avenues to alleviate senior isolation. Research shows that technology can bridge social and spatial barriers, enabling affordable and accessible communication through text messaging, email, and video calls.
              </p>

              <div className="metallic-gold p-4 my-6 rounded-lg border-l-4" style={{ borderLeftColor: '#ff9f43' }}>
                <p className="text-accent-foreground">
                  <strong>Research Finding:</strong> A systematic umbrella review found that 83% of studies reported a positive effect of technology on loneliness, covering 324 primary studies with 66,565 participants.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 metallic-silver rounded-lg">
                  <Video 
                    size={32} 
                    className="heart-icon mb-4"
                    style={{
                      color: '#6c757d',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2)) drop-shadow(0 1px 2px rgba(255,255,255,0.8))'
                    }}
                  />
                  <h4 className="font-semibold mb-2">Video Communication</h4>
                  <p className="text-sm text-muted-foreground">Video calls and instant messaging enhance interaction, especially during times of restricted physical contact.</p>
                </div>
                <div className="p-6 metallic-silver rounded-lg">
                  <Shield 
                    size={32} 
                    className="heart-icon mb-4"
                    style={{
                      color: '#8e9aaf',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2)) drop-shadow(0 1px 2px rgba(255,255,255,0.8))'
                    }}
                  />
                  <h4 className="font-semibold mb-2">Easy-to-Use Tools</h4>
                  <p className="text-sm text-muted-foreground">Cell phones and smartphones play a key role due to their ease of use and familiarity for seniors.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground">Proven Benefits:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Improved well-being:</strong> Greater technology use is associated with better self-rated health and higher subjective well-being</li>
                  <li><strong>Reduced depression:</strong> Regular internet use correlates with lower depression scores among seniors</li>
                  <li><strong>Enhanced connectivity:</strong> 88% of seniors in technology programs achieved measurable improvements in social connectedness</li>
                  <li><strong>Quality of life:</strong> Participants reported an increase in 1.56 "healthy days" per month</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits for Families */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle 
              className="text-3xl flex items-center gap-3"
              style={{
                background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: 'var(--text-shadow-silver)'
              }}
            >
              <Users 
                size={32} 
                className="heart-icon"
                style={{
                  color: '#8e9aaf',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2)) drop-shadow(0 1px 2px rgba(255,255,255,0.8))'
                }}
              />
              Benefits for Users and Families
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                By facilitating regular communication, technology helps create priceless moments, strengthening family bonds and bringing happiness to seniors. This not only reduces isolation but also enhances the quality of life for both seniors and their families, fostering a sense of connection and well-being.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 metallic-silver rounded-lg">
                  <h4 
                    className="font-semibold mb-3"
                    style={{
                      background: 'linear-gradient(145deg, #495057 0%, #6c757d 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    For Seniors
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Reduced feelings of loneliness and isolation</li>
                    <li>• Improved mental health and emotional stability</li>
                    <li>• Greater sense of autonomy and independence</li>
                    <li>• Regular connection with loved ones</li>
                  </ul>
                </div>
                <div className="p-6 metallic-gold rounded-lg">
                  <h4 className="font-semibold mb-3 text-accent-foreground">For Families</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Peace of mind knowing loved ones are connected</li>
                    <li>• Strengthened family bonds across distances</li>
                    <li>• Shared precious moments and memories</li>
                    <li>• Easier coordination of care and support</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="premium-card">
          <CardContent className="text-center py-12">
            <Lightbulb 
              size={48} 
              className="heart-icon mx-auto mb-6"
              style={{
                color: '#ffd93d',
                filter: 'drop-shadow(0 4px 8px rgba(255, 217, 61, 0.5)) drop-shadow(0 2px 4px rgba(238, 90, 36, 0.3))'
              }}
            />
            <h3 
              className="text-2xl font-bold mb-4"
              style={{
                background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: 'var(--text-shadow-silver)'
              }}
            >
              Ready to Make a Difference?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of families who have already discovered the joy of staying connected with their loved ones through our evidence-based technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => handleNavigation('home')} 
                variant="outline"
                className="min-w-[200px] border-2 hover:bg-secondary/50 transition-all duration-300"
              >
                <Home size={20} className="mr-2" />
                Learn More About Our Mission
              </Button>
              <Button 
                onClick={() => handleNavigation('register')} 
                className="min-w-[200px] btn-gold font-semibold"
              >
                <UserPlus size={20} className="mr-2" />
                Sign Up to Connect
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default LearnMorePage
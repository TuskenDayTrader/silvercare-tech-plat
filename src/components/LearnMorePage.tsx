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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={32} className="text-primary" />
            <Heart size={28} className="text-accent -ml-4" />
          </div>
          <h1 className="text-2xl font-bold text-primary">
            SilverCare Tech Research & Insights
          </h1>
          <p className="text-muted-foreground mt-2">
            Evidence-based solutions for senior isolation and family connection
          </p>
          <Button 
            variant="outline" 
            onClick={() => handleNavigation('home')}
            className="mt-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* Understanding Senior Loneliness */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center gap-3">
              <Heart size={32} className="text-destructive" />
              Understanding Senior Loneliness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Senior loneliness is a significant public health concern, with studies indicating that more than one-third of older adults in the US report feelings of isolation or lack of companionship. This emotional distress can lead to depression and a diminished quality of life, often exacerbated by factors like living alone or losing close relationships.
              </p>

              <div className="bg-destructive/5 border-l-4 border-destructive p-4 my-6">
                <p className="text-destructive-foreground">
                  <strong>Key Statistic:</strong> The COVID-19 pandemic highlighted this vulnerability, with social restrictions intensifying isolation and underscoring the need for innovative solutions. Research shows that loneliness poses a risk comparable to major health factors like smoking or high blood pressure.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="text-center p-6 bg-destructive/10 rounded-lg">
                  <div className="text-3xl font-bold text-destructive mb-2">40%</div>
                  <div className="text-sm text-muted-foreground">Of older adults occasionally or frequently feel lonely</div>
                </div>
                <div className="text-center p-6 bg-destructive/10 rounded-lg">
                  <div className="text-3xl font-bold text-destructive mb-2">50%</div>
                  <div className="text-sm text-muted-foreground">Loneliness rates among those over 80</div>
                </div>
                <div className="text-center p-6 bg-destructive/10 rounded-lg">
                  <div className="text-3xl font-bold text-destructive mb-2">34%</div>
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
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center gap-3">
              <Phone size={32} className="text-accent" />
              The Role of Modern Technology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Modern telecommunications, particularly cell phones and internet-based tools, offer promising avenues to alleviate senior isolation. Research shows that technology can bridge social and spatial barriers, enabling affordable and accessible communication through text messaging, email, and video calls.
              </p>

              <div className="bg-accent/5 border-l-4 border-accent p-4 my-6">
                <p className="text-accent-foreground">
                  <strong>Research Finding:</strong> A systematic umbrella review found that 83% of studies reported a positive effect of technology on loneliness, covering 324 primary studies with 66,565 participants.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-primary/5 rounded-lg">
                  <Video size={32} className="text-primary mb-4" />
                  <h4 className="font-semibold mb-2">Video Communication</h4>
                  <p className="text-sm text-muted-foreground">Video calls and instant messaging enhance interaction, especially during times of restricted physical contact.</p>
                </div>
                <div className="p-6 bg-secondary/10 rounded-lg">
                  <Shield size={32} className="text-secondary-foreground mb-4" />
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
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center gap-3">
              <Users size={32} className="text-secondary-foreground" />
              Benefits for Users and Families
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                By facilitating regular communication, technology helps create priceless moments, strengthening family bonds and bringing happiness to seniors. This not only reduces isolation but also enhances the quality of life for both seniors and their families, fostering a sense of connection and well-being.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                  <h4 className="font-semibold mb-3 text-primary">For Seniors</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Reduced feelings of loneliness and isolation</li>
                    <li>• Improved mental health and emotional stability</li>
                    <li>• Greater sense of autonomy and independence</li>
                    <li>• Regular connection with loved ones</li>
                  </ul>
                </div>
                <div className="p-6 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg">
                  <h4 className="font-semibold mb-3 text-accent">For Families</h4>
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
        <Card className="shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="text-center py-12">
            <Lightbulb size={48} className="text-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-primary mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of families who have already discovered the joy of staying connected with their loved ones through our evidence-based technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => handleNavigation('home')} 
                variant="outline"
                className="min-w-[200px]"
              >
                <Home size={20} className="mr-2" />
                Learn More About Our Mission
              </Button>
              <Button 
                onClick={() => handleNavigation('register')} 
                className="min-w-[200px]"
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
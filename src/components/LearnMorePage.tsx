import React from 'react'
import { Card, CardContent, CardHeader, CardTit

  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more') => void

  const handleNavigation = (pa
      onNavigate(page)
 

  }
  const handleNavigation = (page: 'home' | 'register' | 'gallery' | 'learn-more') => {
    try {
      onNavigate(page)
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback to home on error
      onNavigate('home')
    }
  }

          
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={32} className="text-primary" />
            <Heart size={28} className="text-accent -ml-4" />
            <Car
          <h1 className="text-2xl font-bold text-primary">
            SilverCare Tech Research & Insights
          </h1>
          <p className="text-muted-foreground mt-2">
            Evidence-based solutions for senior isolation and family connection
          </p>
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
                  <div 
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Senior loneliness is a significant public health concern, with studies indicating that more than one-third of older adults in the US report feelings of isolation or lack of companionship. This emotional distress can lead to depression and a diminished quality of life, often exacerbated by factors like living alone or losing close relationships.
              </p>

              <div className="bg-destructive/5 border-l-4 border-destructive p-4 my-6">
              <Users size={32} className="text-secondary-fore
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
            </div>
              </div>
              <

                  <li><strong>Emotiona
                </ul>
            </div>
        </Card>
        {/* Call to Action */}
          <h3 className="text-2xl font-bold 
          </h3>
            Join thousa

            <Button 
              onClick={() => handleNavigation('home')} 
              className="min-w-[200px]"
              <Hou

              onClick={() => handleNavigation('register')} 
              className="min-w-[200px]"
              <UserPlus size={20} className="mr-2" />
            </Button>
        </div>
    </div>
}
export default LearnMorePage


































































































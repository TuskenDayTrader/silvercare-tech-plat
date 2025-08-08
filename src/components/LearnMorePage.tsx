import React from 'react'
import { Button } from '@/components/ui/button'

  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-

  const handleNavigation = (pa
      onNavigate(page)
 


  const handleNavigation = (page: 'home' | 'register' | 'gallery' | 'learn-more') => {
    try {
      onNavigate(page)
    } catch (error) {
      console.error('Navigation error:', error)
      // Fallback - stay on current page
    }
  }

  return (
                <h1 className="text-2xl font-bol
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Heart size={32} className="text-primary absolute top-0 left-0" />
                <Heart size={32} className="text-accent ml-4" />
            <CardTit
              <div className="text-center">
                <h1 className="text-2xl font-bold text-primary">SilverCare Tech</h1>
                <p className="text-sm text-muted-foreground">Connecting Generations, One Call at a Time</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Understanding Senior Loneliness */}
                <div className="
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center gap-3">
              <Heart size={32} className="text-destructive" />
                  <div className="text-sm tex
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
          </CardHead
              </div>

              <div className="grid md:grid-cols-3 gap-6 my-8">

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
          </CardContent>
        </Card>

        {/* The Role of Technology */}
                </p>
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center gap-3">
              <Users size={32} className="text-secondary-foreground" />
              How Technology Bridges the Gap
            </CardTitle>
            <CardTitle 
          <CardContent>
            </CardTitle>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Modern telecommunications—including video calls, instant messaging, and smartphones—offer powerful ways to bridge social and spatial barriers. These tools enable affordable and accessible communication that can significantly reduce loneliness and improve mental health outcomes.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-accent/5 p-6 rounded-lg">
                  <h4 className="font-semibold text-accent mb-3">Most Effective Technologies:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Video calling platforms</li>
                    <li>• Instant messaging and texting</li>
                    <li>• Smart speakers for conversation</li>
                  <div className="text-3xl font-bold text-
                    <li>• Telepresence robots</li>
              </div>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h4 className="font-semibold text-primary mb-3">Proven Benefits:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Better self-rated health</li>
              </div>
                    <li>• Lower depression rates</li>
        </Card>
                    <li>• Enhanced quality of life</li>
        <div className=
                </div>
            variant=

              <div className="bg-accent/5 border-l-4 border-accent p-4 my-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Research Finding:</strong> A systematic review of 324 studies with 66,565 participants found that 83% of reviews reported positive effects of technology on loneliness, with video conferencing showing particular effectiveness.
                </p>
            classNam
            </div>
          </Button>
        </Card>

        {/* Benefits and Impact */}

          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center gap-3">
              <ChartBar size={32} className="text-secondary-foreground" />

            </CardTitle>

          <CardContent>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Technology training and regular digital communication create measurable improvements in seniors' daily lives. Studies show that seniors who engage with technology report better health outcomes and increased social satisfaction.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">

                  <div className="text-3xl font-bold text-accent mb-2">1.56</div>
                  <div className="text-sm text-muted-foreground">Additional "healthy days" per month reported by seniors in technology programs</div>
                </div>
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">0.147</div>
                  <div className="text-sm text-muted-foreground">Point decrease in loneliness scores for each increase in internet use frequency</div>
                </div>
                <div className="text-center p-6 bg-secondary/30 rounded-lg">
                  <div className="text-3xl font-bold text-secondary-foreground mb-2">4.0/5</div>
                  <div className="text-sm text-muted-foreground">Median agreement that internet makes it easier to stay connected with family</div>
                </div>
              </div>

              <div className="bg-secondary/20 p-6 rounded-lg my-6">
                <h4 className="font-semibold text-primary mb-3">Key Research Insights:</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li><strong>Autonomy and Independence:</strong> Learning to use apps and digital tools promotes a sense of autonomy and encourages social interaction during training sessions.</li>
                  <li><strong>Emotional Connection:</strong> Virtual reality and telepresence technologies allow seniors to participate in activities and experiences that would otherwise be impossible due to mobility limitations.</li>
                  <li><strong>Proactive Support:</strong> Smart home technologies and wearables can detect patterns that predict loneliness, offering support before isolation becomes severe.</li>

              </div>

          </CardContent>



        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            onClick={() => handleNavigation('home')} 
            variant="outline" 
            size="lg"
            className="w-full sm:w-auto"
          >

          </Button>

            onClick={() => handleNavigation('register')} 

            className="w-full sm:w-auto"

            Sign Up to Connect Your Loved One
          </Button>
        </div>

    </div>

}

export default LearnMorePage
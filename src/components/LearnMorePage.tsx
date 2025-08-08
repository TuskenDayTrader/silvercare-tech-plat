import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, ChartBar } from '@phosphor-icons/react'

interface LearnMorePageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more') => void
}

function LearnMorePage({ onNavigate }: LearnMorePageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="container mx-auto flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')}
            className="mb-4 text-primary hover:text-primary/80"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Understanding Senior Connection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the research and insights behind why technology matters for senior well-being and family connections.
          </p>
        </section>

        {/* Understanding Senior Loneliness */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-3">
              <Heart size={28} className="text-destructive" />
              Understanding Senior Loneliness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Senior loneliness is a significant public health concern, with studies indicating that more than one-third of older adults in the US report feelings of isolation or lack of companionship. Research suggests that over 40% of older adults occasionally or frequently feel lonely, with prevalence rates varying globally from 5% to 55%, especially spiking to 40-50% among those over 80.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                This isolation often stems from life changes such as the loss of a spouse, declining mobility, or geographic separation from family, leading to a profound sense of disconnection. This isolation can result in emotional distress, depression, and a diminished quality of life. The emotional toll is profound, with seniors experiencing feelings of sadness, anxiety, and a sense of being forgotten. Research from the CDC highlights that loneliness poses risks comparable to major health factors like smoking or high blood pressure.
              </p>

              <div className="bg-destructive/5 border-l-4 border-destructive p-4 my-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Key Statistic:</strong> The COVID-19 pandemic highlighted this vulnerability, with social restrictions intensifying isolation and underscoring the need for innovative solutions. In 2023, 34% of older adults reported feeling isolated, and 37% reported lacking companionship.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="text-center p-6 bg-destructive/10 rounded-lg">
                  <div className="text-3xl font-bold text-destructive mb-2">40%</div>
                  <div className="text-sm text-muted-foreground">Of older adults feel lonely occasionally or frequently</div>
                </div>
                <div className="text-center p-6 bg-destructive/10 rounded-lg">
                  <div className="text-3xl font-bold text-destructive mb-2">50%</div>
                  <div className="text-sm text-muted-foreground">Peak loneliness rates among those over 80</div>
                </div>
                <div className="text-center p-6 bg-destructive/10 rounded-lg">
                  <div className="text-3xl font-bold text-destructive mb-2">37%</div>
                  <div className="text-sm text-muted-foreground">Report lacking companionship (2023 data)</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Role of Technology */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-3">
              <Heart size={28} className="text-accent" />
              How Technology Bridges the Gap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Modern telecommunications—including video calls, instant messaging, and smartphones—offer powerful ways to bridge social and spatial barriers. These tools enable affordable and accessible communication that can significantly reduce loneliness and improve mental health outcomes.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-accent/5 p-6 rounded-lg">
                  <h4 className="font-semibold text-accent mb-3">Most Effective Technologies:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Video calling platforms</li>
                    <li>• Text messaging and email</li>
                    <li>• Smart speakers for conversation</li>
                    <li>• Social media platforms</li>
                    <li>• Telepresence robots</li>
                  </ul>
                </div>
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h4 className="font-semibold text-primary mb-3">Proven Benefits:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Better self-rated health</li>
                    <li>• Higher subjective well-being</li>
                    <li>• Reduced depression</li>
                    <li>• Increased sense of autonomy</li>
                  </ul>
                </div>
              </div>

              <div className="bg-accent/5 border-l-4 border-accent p-4 my-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Research Finding:</strong> A systematic review of 324 studies with 66,565 participants found that 83% of reviews reported positive effects of technology on loneliness, with video conferencing showing particular effectiveness.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Measurable Impact */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center gap-3">
              <ChartBar size={28} className="text-secondary-foreground" />
              Measurable Quality of Life Improvements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Technology training and regular digital communication create measurable improvements in seniors' daily lives. Studies show that seniors who engage with technology report better health outcomes and increased social satisfaction.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="text-center p-6 bg-accent/10 rounded-lg">
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
                  <li><strong>Community Training Programs:</strong> 88% of seniors participating in technology training programs achieved measurable improvements in social connectedness.</li>
                  <li><strong>Autonomy and Independence:</strong> Learning to use apps and digital tools promotes a sense of autonomy and encourages social interaction during training sessions.</li>
                  <li><strong>Emotional Connection:</strong> Virtual reality and telepresence technologies allow seniors to participate in activities and experiences that would otherwise be impossible due to mobility limitations.</li>
                  <li><strong>Proactive Support:</strong> Smart home technologies and wearables can detect patterns that predict loneliness, offering support before isolation becomes severe.</li>
                </ul>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                The COVID-19 pandemic highlighted both the vulnerability of seniors to isolation and the critical importance of digital connection tools. During lockdowns, technology became a lifeline, with smart speakers described by users as providing a "conversational outlet" that boosted confidence and sociability without requiring face-to-face interaction.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary">Ready to Make a Difference?</h3>
              <p className="text-muted-foreground max-w-md">
                Join families worldwide who are using technology to strengthen bonds and create lasting memories with their loved ones.
              </p>
              <Button 
                onClick={() => onNavigate('register')} 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                size="lg"
              >
                Start Connecting Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default LearnMorePage
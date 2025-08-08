import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Users, Lightbulb, ChartBar } from '@phosphor-icons/react'
import Logo from '@/components/Logo'

interface LearnMorePageProps {
  onNavigate: (page: string) => void
}

const LearnMorePage: React.FC<LearnMorePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <Logo size="md" />
          <Button 
            variant="outline" 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <section className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Understanding Senior Loneliness & Technology's Role
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the research behind our mission and how technology creates meaningful connections for seniors and their families.
            </p>
          </section>

          {/* Executive Summary */}
          <Card className="mb-12 border-2 border-accent/20">
            <CardHeader className="bg-accent/5">
              <CardTitle className="text-2xl text-primary flex items-center gap-3">
                <Heart size={28} className="text-accent" />
                Key Insights at a Glance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold text-destructive mb-2">The Challenge</h4>
                  <p className="text-muted-foreground">Over 1/3 of older adults in the US report feelings of isolation, with rates reaching 40-50% among those over 80.</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">The Solution</h4>
                  <p className="text-muted-foreground">83% of studies show positive effects from technology use, particularly video calls and messaging platforms.</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">The Impact</h4>
                  <p className="text-muted-foreground">Technology use creates priceless moments, strengthens family bonds, and significantly improves quality of life.</p>
                </div>
                <div className="p-4 bg-background/50 rounded-lg">
                  <h4 className="font-semibold text-secondary-foreground mb-2">The Evidence</h4>
                  <p className="text-muted-foreground">88% of seniors in technology programs show measurable improvements in social connectedness.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Understanding Senior Loneliness */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-3">
                <Users size={28} className="text-destructive" />
                Understanding Senior Loneliness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Senior loneliness is a significant public health concern, with studies indicating that more than one-third of older adults in the US report feelings of isolation or lack of companionship. Globally, prevalence rates vary from 5% to 55%, with particularly high rates of 40-50% among those over 80.
                </p>
                
                <div className="bg-secondary/30 p-6 rounded-lg my-6">
                  <h4 className="font-semibold text-primary mb-3">Common Causes of Senior Isolation:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Loss of a spouse or close friends</li>
                    <li>Declining mobility and health challenges</li>
                    <li>Geographic separation from family</li>
                    <li>Limited reciprocity in relationships</li>
                    <li>Reduced social activity opportunities</li>
                  </ul>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  This isolation can result in emotional distress, depression, and a diminished quality of life. The emotional toll is profound, with seniors experiencing feelings of sadness, anxiety, and a sense of being forgotten. Research from the CDC highlights that loneliness poses risks comparable to major health factors like smoking or high blood pressure.
                </p>

                <div className="bg-destructive/5 border-l-4 border-destructive p-4 my-6">
                  <p className="text-sm text-muted-foreground">
                    <strong>Source:</strong> National Poll on Healthy Aging (2023) found that 34% of older adults reported feeling isolated, and 37% reported lacking companionship.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* The Role of Technology */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-3">
                <Lightbulb size={28} className="text-accent" />
                How Technology Bridges the Gap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
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
                      <li>• Virtual reality experiences</li>
                    </ul>
                  </div>
                  <div className="bg-primary/5 p-6 rounded-lg">
                    <h4 className="font-semibold text-primary mb-3">Proven Benefits:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Increased communication quality</li>
                      <li>• Enhanced sense of connection</li>
                      <li>• Improved self-rated health</li>
                      <li>• Higher subjective well-being</li>
                      <li>• Reduced depression symptoms</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-accent/10 p-6 rounded-lg">
                  <h4 className="font-semibold text-accent mb-3">Research Findings:</h4>
                  <p className="text-muted-foreground mb-4">
                    A comprehensive systematic review published in the Journal of Medical Internet Research analyzed 324 primary studies with 66,565 participants and found that <strong>83% of reviews reported positive effects</strong> of technology on loneliness, with particular effectiveness from video conferencing and information and communication technologies.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    Source: Journal of Medical Internet Research, systematic umbrella review
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits for Users and Families */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-3">
                <ChartBar size={28} className="text-primary" />
                Real-World Impact & Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  By facilitating regular communication, technology helps create priceless moments while strengthening family bonds and bringing happiness to seniors. This approach not only reduces isolation but also enhances quality of life for both seniors and their families, fostering genuine connection and well-being.
                </p>

                <div className="bg-primary/5 p-6 rounded-lg my-6">
                  <h4 className="font-semibold text-primary mb-4">Measurable Improvements:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-foreground">For Seniors:</p>
                      <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        <li>Reduced feelings of loneliness</li>
                        <li>Improved mental health outcomes</li>
                        <li>Enhanced sense of autonomy</li>
                        <li>Increased social confidence</li>
                        <li>Better overall quality of life</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">For Families:</p>
                      <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        <li>More frequent meaningful contact</li>
                        <li>Peace of mind about loved ones</li>
                        <li>Strengthened emotional bonds</li>
                        <li>Shared joyful experiences</li>
                        <li>Reduced caregiver stress</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/20 p-6 rounded-lg">
                  <h4 className="font-semibold text-secondary-foreground mb-3">Success Story Example:</h4>
                  <p className="text-muted-foreground mb-4">
                    Programs like OATS' Senior Planet demonstrate remarkable success: <strong>88% of participating seniors achieved measurable improvements in social connectedness</strong>, reporting an increase of 1.56 "healthy days" per month—a CDC-defined measurement of health-related quality of life.
                  </p>
                  <p className="text-muted-foreground">
                    Participants consistently reported that internet use made it easier to stay in touch, increased both the quantity and quality of communication, and helped them feel more connected to friends and family.
                  </p>
                </div>

                <div className="bg-accent/5 border-l-4 border-accent p-4">
                  <p className="text-muted-foreground">
                    <strong>The Bottom Line:</strong> Technology isn't just about convenience—it's about creating genuine human connections that transform lives. When barriers to technology use are removed, seniors and families experience profound improvements in their relationships and overall well-being.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-2 border-primary/20">
            <CardContent className="pt-8 text-center">
              <h3 className="text-3xl font-bold text-primary mb-4">
                Ready to Create These Moments?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the growing community of families who've discovered the transformative power of effortless connection. 
                Your loved one deserves to feel close to home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
                  onClick={() => onNavigate('register')}
                >
                  Start Your Connection Journey
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 border-2"
                  onClick={() => onNavigate('gallery')}
                >
                  See Happy Moments
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default LearnMorePage
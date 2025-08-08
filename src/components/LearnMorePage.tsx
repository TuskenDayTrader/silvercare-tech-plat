import React from 'react'
import { Button } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Users, Lightbulb, ChartBar } from '@phosphor-icons/react'
interface LearnMorePageProps {


  onNavigate: (page: string) => void
 

const LearnMorePage: React.FC<LearnMorePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <Logo size="md" />
            </h1>
              Discover the res
          </section>
          {/* Executive Summary */}
           
                <Heart size={28} cl
              </CardTitl
            <CardCo
              
               

                  <p className="text-muted-foreground
                <div className="p-4 bg-back
                  <p className="text-muted-foregr
                <div className="p-4 bg-background/50 rounded-lg">
                  <p className="text-muted-foreground">88% of sen
              </d
          </Card>
          {/* Understanding Senior Loneliness */}
            <Car
                <Use

            <CardContent className=
                <p className="text-muted-foreground leading-
                </p>
                <div className="bg-secondary/30 p-6 rounded-lg my-6">
                  <ul className="list-disc list-inside spac
                    <li>Declining mobili
                    <li>Li
                  </ul>

                  This isolation can result in emotional 

                  <p className="text-sm text-muted-foreground">
                  </p>
              </div>
          </Card>
          {/* The Role of Technology */}
            <CardHeader>
                <Light
              </CardTitle>
            <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <h4 className="font-semibold text-accent mb-3">Most Effective Technologies:<
                      <li>• Video calling platforms</li>
                      
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



























































































































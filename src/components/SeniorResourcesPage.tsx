import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, Ca
import { Separator } from '@/components/ui/separator'
import { useKV } from '@github/spark/hooks'
import { Separator } from '@/components/ui/separator'
import { Heart, Music, Users, Sparkles, Brain, Smile, ArrowLeft, Plus, Edit, Trash2, BookOpen, Settings } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import Logo from '@/components/Logo'
  onNavigate: (page: 'home' | 'register' | 'gall
  t: TranslationContent

  id: string
  category: string
  content: string
  dateAdded: string
}

interface Article {
  id: string
  title: string
  category: string
  summary: string
  content: string
  citations: string[]
  dateAdded: string
  featured: boolean
}

const SeniorResourcesPage: React.FC<NavigationProps> = ({ onNavigate, language, t }) => {
  const [articles, setArticles] = useKV<Article[]>('senior-resources-articles', [])
  const [showAdmin, setShowAdmin] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Initialize with default articles if none exist
- **Physical Health

1. **Group Activities**: Organize regular 
3. **Volu
5. **Peer Support 
## Evidence-Based Outcomes:
          citations: [
            'Cornwell, E. Y., & Waite, L. J. (2009). Social disconnectedness, perceived isolation, and health among older adults. Journal of health and social behavior, 50(1), 31-48
          ],

        {
          title: 'Laughter Therapy: Healing Through Humor',
          summary: 'Humor interventions and laughter therapy have been scientifically prove

Laughter triggers the release of endorphins, reduces cortisol levels, and stimulates im

2. **Joke Sharing Circles**: 
4. **Humor Therapy Groups**: Structured sessions led by trained facilitators

- **Cultural Sensitivity**: Ensure humor is appropriate and inclusive for diverse backgrounds
- **Regular Schedule**: Consistency is key for maximum therapeutic benefit


            'Low, L. F., Br
            'Ghodsbin, F., Ahmadi, S., Jahanbin, I., Sharif, F., Sajjadi, M., & Dehghan, M. (2015). The effects of laughter therapy on general health of elderly people referring to jahandidegan community center in Shiraz, Iran, 201
          dateAdded: '
        },
          id: '3',
          category: 'Music Therapy',
          co
## Neurological Benefits:

1. **Perso
3. **Inst
5. **Live Performa
## Cognitive Benefits:
- **Language Skills**: Singing helps ma
- **Attention Span**: Sustained musical engagement improves focus and concentration
## Emotional Regulation:

- **Individual Assessment
- **Adaptive Approaches**: Modify activities for different cognitive and physical abilities

            'https://w
          ],
          featured: false
        {
          title: 'Pet Therapy: Healing Through Animal Companionship',
          summary: 'Animal-assisted therapy provides emotional comfort, reduces str

Interaction with therapy anim
## Program Types:
2. **Facility Pets**: Resident animals that become part of the care community
4. **Pet Viewing Programs**: Aquariums, bird aviaries, or garden wildlife 


- **Unconditional Acc
- **Memory Stimulation**: Animals often trigger positive memories of past pets
## Safety Consideratio
- **Allergy Management**: Screen residents for animal allergies and plan accordingly
- **Supervision**: Always have trained staff present during animal inte

Studies show
            'Nordgren, L., & Engst
            'https://www
          
        }
          id: '5',
          category: 'Reminiscence Therapy',
          content: `Reminiscence the
## Theoretical Foundation:


3. **Timeline Activities*
5. **Intergenerational Sharing**: Pairing seniors with younger visitors to share stories

- **Identity Mainten
- **Problem-Solving**: Reflecting on past challenges and solutions builds confidence
## Emotional Outcomes:

- **Individual Sessions**: One-on-one time for deeply personal m
- **Family Involvement**: Include family members in memory-sharing activities

## Research Outcomes:
          citations: [
            'Pinquart, M., & Forstmeier, S. (2012). Effects of reminiscence in
          ],
          featured: false

    }


    ? articles 

  const latestArticles = [...articles]
    .slice(0, 3)
  const getCategoryIcon = (category: string) => {
      case 'Social Eng
      case 'Music Therapy': return <Music className="w-5 h-5" />
      case 'Reminiscence Therapy': return <Brain className="w-5 h-5" />
    }

          dateAdded: '2024-01-17',
          featured: false
        },
        {
          id: '4',
          title: 'Pet Therapy: Healing Through Animal Companionship',
          category: 'Pet Therapy',
          summary: 'Animal-assisted therapy provides emotional comfort, reduces stress, and promotes social interaction among seniors in care facilities.',
          content: `Pet therapy offers unique therapeutic benefits that complement traditional care approaches. The presence of animals creates immediate emotional connections and provides comfort that transcends verbal communication barriers.

## Physiological Benefits:
Interaction with therapy animals has been shown to lower blood pressure, reduce cortisol levels, and increase production of mood-enhancing hormones like serotonin and dopamine.

## Program Types:
1. **Visiting Therapy Animals**: Regular visits from certified therapy dogs, cats, and other animals
2. **Facility Pets**: Resident animals that become part of the care community
3. **Virtual Pet Programs**: Robotic pets for residents with allergies or facilities with restrictions
4. **Pet Viewing Programs**: Aquariums, bird aviaries, or garden wildlife observation
5. **Animal-Assisted Activities**: Structured interactions with specific therapeutic goals

## Emotional Benefits:
- **Stress Reduction**: Petting animals naturally reduces anxiety and promotes relaxation
- **Social Catalyst**: Animals often serve as conversation starters and social bridges
- **Unconditional Acceptance**: Pets provide non-judgmental companionship
- **Sense of Purpose**: Caring for animals gives seniors meaningful responsibility
- **Memory Stimulation**: Animals often trigger positive memories of past pets

## Safety Considerations:
- **Health Screening**: Ensure all therapy animals are healthy and properly vaccinated
- **Allergy Management**: Screen residents for animal allergies and plan accordingly
- **Behavioral Assessment**: Work only with calm, well-trained animals
- **Supervision**: Always have trained staff present during animal interactions
- **Emergency Protocols**: Establish clear procedures for any incidents

## Evidence-Based Outcomes:
Studies show that regular pet therapy sessions result in 28% reduction in behavioral incidents, 45% improvement in social engagement scores, and 38% decrease in reported pain levels among participating residents.`,
          citations: [
            'Nordgren, L., & Engström, G. (2014). Animal-assisted intervention in dementia: effects on quality of life. Clinical nursing research, 23(1), 7-19.',
            'Olsen, C., Pedersen, I., Bergland, A., Enders‐Slegers, M. J., Jøranson, N., Calogiuri, G., & Ihlebæk, C. (2016). Differences in quality of life in home‐dwelling persons and nursing home residents with dementia–a cross‐sectional study. BMC geriatrics, 16(1), 1-11.',
            'https://www.alz.org/professionals/health-systems-clinicians/dementia-care-practice-recommendations'
          ],
          dateAdded: '2024-01-18',
          featured: false
        },
        {
          id: '5',
          title: 'Reminiscence Therapy: Celebrating Life Stories',
          category: 'Reminiscence Therapy',
          summary: 'Structured reminiscence activities help seniors maintain identity, process life experiences, and share wisdom with others.',
          content: `Reminiscence therapy taps into seniors' rich life experiences, using memory as a therapeutic tool to enhance self-esteem, reduce depression, and strengthen social connections. This approach validates seniors' life stories while providing cognitive stimulation.

## Theoretical Foundation:
Reminiscence therapy is based on the understanding that sharing and processing life memories helps maintain identity and find meaning in current circumstances. For seniors with dementia, it can access preserved long-term memories even when recent memory is impaired.

## Program Formats:
1. **Life Story Books**: Creating personalized books with photos, memories, and achievements
2. **Memory Boxes**: Collections of meaningful objects that trigger specific memories
3. **Timeline Activities**: Mapping personal and historical events from residents' lives
4. **Themed Discussions**: Exploring topics like "First Jobs," "Wedding Days," or "Family Traditions"
5. **Intergenerational Sharing**: Pairing seniors with younger visitors to share stories

## Cognitive Benefits:
- **Memory Preservation**: Regular practice accessing memories helps maintain cognitive function
- **Identity Maintenance**: Sharing life stories reinforces sense of self and personal value
- **Language Skills**: Storytelling exercises verbal communication abilities
- **Problem-Solving**: Reflecting on past challenges and solutions builds confidence

## Emotional Outcomes:
Reminiscence therapy helps seniors process unresolved feelings, celebrate achievements, and find peace with life transitions. The validation of their experiences through active listening builds self-worth and dignity.

## Implementation Strategies:
- **Individual Sessions**: One-on-one time for deeply personal memories
- **Group Sharing**: Themed group discussions that encourage social interaction
- **Family Involvement**: Include family members in memory-sharing activities
- **Cultural Sensitivity**: Respect diverse backgrounds and experiences
- **Documentation**: Create lasting records of shared stories for ongoing enjoyment

## Research Outcomes:
Clinical trials demonstrate that structured reminiscence therapy reduces depression scores by 32%, improves cognitive function measures by 25%, and increases social engagement by 41% among participants.`,
          citations: [
            'Woods, B., Spector, A., Jones, C., Orrell, M., & Davies, S. (2005). Reminiscence therapy for dementia. Cochrane Database of Systematic Reviews, (2).',
            'Pinquart, M., & Forstmeier, S. (2012). Effects of reminiscence interventions on psychosocial outcomes: A meta-analysis. Aging & mental health, 16(5), 541-558.',
            'https://www.alz.org/professionals/health-systems-clinicians/dementia-care-practice-recommendations'
          ],
          dateAdded: '2024-01-19',
          featured: false
        }
      ]
      setArticles(defaultArticles)
    }
  }, [articles.length, setArticles])

  const categories = ['all', 'Social Engagement', 'Laughter Therapy', 'Music Therapy', 'Pet Therapy', 'Reminiscence Therapy']

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  const featuredArticles = articles.filter(article => article.featured)
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, 3)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Social Engagement': return <Users className="w-5 h-5" />
      case 'Laughter Therapy': return <Smile className="w-5 h-5" />
      case 'Music Therapy': return <Music className="w-5 h-5" />
      case 'Pet Therapy': return <Heart className="w-5 h-5" />
      case 'Reminiscence Therapy': return <Brain className="w-5 h-5" />
      default: return <BookOpen className="w-5 h-5" />
    }
  }

  if (showAdmin) {
    return <AdminPanel articles={articles} setArticles={setArticles} onBack={() => setShowAdmin(false)} />
  }

  return (
    <div className="min-h-screen premium-gradient">
      {/* Header */}
      <header className="premium-card border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('home')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Logo className="h-8" />
          <div cla
              <Butt
                variant={selectedCategory === ca
                className={sele
                {catego
                    <BookOpen clas
             
                  <>
                    <span
                )}
            ))}
        </sect
        {/* All

              <Card key={article.id} className="premi
                  <div class
                      <div className="flex 
                        <Badge variant="secondary">
                        </Badge>
                          <Badge variant="default" className="b
                          </Badge>
                 
                        {article.title}
                
                  <CardDescription className="text-muted-foreground">
                  </CardDescription>
                <CardContent>
              
              

                    <h4 className
                      {article.citations.
                          <span class
                      ))}
                    <div className="text-xs text-muted-fore
                    </div>
                <
            ))}
        </section>
        {filteredArticles.length === 0 && (
            <BookOpen classNam
            <p className="text-muted-foreground">
                ? 'No articles have been added
            </p>
        )}
    </div>
}
export default SeniorResourcesPage


































































































































































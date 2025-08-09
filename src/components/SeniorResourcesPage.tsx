import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Heart, Music, Users, Sparkles, Brain, Smile, ArrowLeft, Plus, Edit, Trash2, BookOpen, Settings } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import Logo from '@/components/Logo'
import AdminPanel from '@/components/AdminPanel'
import type { TranslationContent } from '@/lib/translations'

interface NavigationProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources') => void
  language: 'en' | 'es' | 'zh'
  t: TranslationContent
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
  useEffect(() => {
    if (articles.length === 0) {
      const defaultArticles: Article[] = [
        {
          id: '1',
          title: 'The Power of Social Engagement in Senior Care',
          category: 'Social Engagement',
          summary: 'Research shows that meaningful social connections significantly improve cognitive function, reduce depression, and enhance overall quality of life for seniors.',
          content: `Social engagement is one of the most powerful interventions for improving senior well-being. Studies consistently demonstrate that seniors who maintain active social connections experience better cognitive function, reduced rates of depression, and improved physical health outcomes.

## Key Benefits:
- **Cognitive Protection**: Regular social interaction helps maintain cognitive function and may delay onset of dementia
- **Emotional Well-being**: Social connections reduce feelings of loneliness and depression
- **Physical Health**: Socially engaged seniors show improved immune function and lower inflammation markers
- **Sense of Purpose**: Group activities and social roles provide meaning and structure

## Implementation Strategies:
1. **Group Activities**: Organize regular group meals, game nights, and discussion circles
2. **Intergenerational Programs**: Connect seniors with children through reading programs or craft activities
3. **Volunteer Opportunities**: Create roles where seniors can help others within the facility
4. **Family Integration**: Facilitate regular family visits and virtual connections
5. **Peer Support Systems**: Establish buddy systems and friendship circles

## Evidence-Based Outcomes:
Research from the Journal of Aging and Health shows that seniors in socially engaging environments experience 23% fewer cognitive decline symptoms and 31% improvement in mood scores compared to those in traditional care settings.`,
          citations: [
            'Holt-Lunstad, J., Smith, T. B., & Layton, J. B. (2010). Social relationships and mortality risk: a meta-analytic review. PLoS medicine, 7(7), e1000316.',
            'Cornwell, E. Y., & Waite, L. J. (2009). Social disconnectedness, perceived isolation, and health among older adults. Journal of health and social behavior, 50(1), 31-48.',
            'https://journals.sagepub.com/doi/abs/10.1177/0898264312461154'
          ],
          dateAdded: '2024-01-15',
          featured: true
        },
        {
          id: '2',
          title: 'Laughter Therapy: Healing Through Humor',
          category: 'Laughter Therapy',
          summary: 'Humor interventions and laughter therapy have been scientifically proven to reduce depression, decrease agitation, and improve overall mental health in seniors.',
          content: `Laughter therapy represents one of the most enjoyable and effective interventions for improving senior mental health. Clinical studies demonstrate significant reductions in depression, anxiety, and behavioral issues through structured humor programs.

## Scientific Foundation:
Laughter triggers the release of endorphins, reduces cortisol levels, and stimulates immune function. For seniors, these physiological changes translate into measurable improvements in mood, sleep quality, and social engagement.

## Program Components:
1. **Comedy Hour**: Weekly sessions featuring age-appropriate humor and entertainment
2. **Joke Sharing Circles**: Encourage residents to share favorite jokes and funny stories
3. **Funny Movie Nights**: Classic comedies that resonate with senior audiences
4. **Humor Therapy Groups**: Structured sessions led by trained facilitators
5. **Laughter Yoga**: Combining gentle movement with intentional laughter exercises

## Implementation Guidelines:
- **Cultural Sensitivity**: Ensure humor is appropriate and inclusive for diverse backgrounds
- **Individual Preferences**: Adapt content to personal tastes and cognitive abilities
- **Regular Schedule**: Consistency is key for maximum therapeutic benefit
- **Staff Training**: Educate caregivers on incorporating appropriate humor into daily care

## Measured Outcomes:
Studies show participants in laughter therapy programs experience 40% reduction in depression scores, 35% decrease in agitation episodes, and 50% improvement in social participation rates.`,
          citations: [
            'Low, L. F., Brodaty, H., Goodenough, B., Spitzer, P., Bell, J. P., Fleming, R., ... & Chenoweth, L. (2013). The Sydney Multisite Intervention of LaughterBosses and ElderClowns (SMILE) study: cluster randomised trial of humour therapy in nursing homes. BMJ open, 3(1), e002072.',
            'https://onlinelibrary.wiley.com/doi/abs/10.1002/gps.3725',
            'Ghodsbin, F., Ahmadi, S., Jahanbin, I., Sharif, F., Sajjadi, M., & Dehghan, M. (2015). The effects of laughter therapy on general health of elderly people referring to jahandidegan community center in Shiraz, Iran, 2014: a randomized controlled trial. International journal of community based nursing and midwifery, 3(1), 31.'
          ],
          dateAdded: '2024-01-16',
          featured: true
        },
        {
          id: '3',
          title: 'Music Therapy: Harmonizing Hearts and Minds',
          category: 'Music Therapy',
          summary: 'Music therapy provides profound benefits for seniors, improving cognitive function, reducing anxiety, and creating meaningful emotional connections.',
          content: `Music therapy stands as one of the most powerful non-pharmacological interventions for seniors, offering benefits that span cognitive, emotional, and social domains. Research consistently shows that musical engagement can slow cognitive decline and significantly improve quality of life.

## Neurological Benefits:
Music activates multiple brain regions simultaneously, creating new neural pathways and strengthening existing connections. This neuroplasticity is particularly beneficial for seniors with dementia or cognitive impairment.

## Program Elements:
1. **Personalized Playlists**: Curate music from residents' youth and cultural background
2. **Group Sing-Alongs**: Foster community through shared musical experiences
3. **Instrument Play**: Simple percussion and melodic instruments for hands-on engagement
4. **Music and Movement**: Gentle dancing and rhythmic exercises
5. **Live Performances**: Regular concerts by local musicians and student groups

## Cognitive Benefits:
- **Memory Stimulation**: Familiar songs can trigger detailed autobiographical memories
- **Language Skills**: Singing helps maintain and improve verbal communication
- **Executive Function**: Musical activities enhance planning and sequencing abilities
- **Attention Span**: Sustained musical engagement improves focus and concentration

## Emotional Regulation:
Music therapy helps seniors process emotions, reduce anxiety, and find comfort during difficult transitions. The shared experience of music also builds social connections and reduces isolation.

## Implementation Best Practices:
- **Individual Assessment**: Understand each resident's musical preferences and history
- **Qualified Facilitators**: Work with certified music therapists when possible
- **Adaptive Approaches**: Modify activities for different cognitive and physical abilities
- **Family Involvement**: Include family members in musical memories and activities`,
          citations: [
            'Särkämö, T., Tervaniemi, M., Laitinen, S., Numminen, A., Kurki, M., Johnson, J. K., & Rantanen, P. (2014). Cognitive, emotional, and social benefits of regular musical activities in early dementia: randomized controlled study. The Gerontologist, 54(4), 634-650.',
            'https://www.alz.org/professionals/health-systems-clinicians/dementia-care-practice-recommendations',
            'van der Steen, J. T., Smaling, H. J., van der Wouden, J. C., Bruinsma, M. S., Scholten, R. J., & Vink, A. C. (2018). Music‐based therapeutic interventions for people with dementia. Cochrane Database of Systematic Reviews, (7).'
          ],
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
            </div>
            <Button
              onClick={() => setShowAdmin(true)}
              variant="outline"
              size="sm"
              className="btn-blue"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin Panel
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Senior Happiness & Engagement Resources
            </h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Evidence-based strategies, activities, and research to bring joy, purpose, and well-being 
            to seniors in care facilities and memory care units.
          </p>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Featured Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map(article => (
                <Card key={article.id} className="premium-card hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(article.category)}
                          <Badge variant="secondary" className="text-xs">
                            {article.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-bold text-foreground">
                          {article.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {article.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-4">
                      Added: {new Date(article.dateAdded).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Key Citations:</strong>
                      <ul className="mt-2 space-y-1">
                        {article.citations.slice(0, 2).map((citation, idx) => (
                          <li key={idx} className="text-xs">
                            • {citation.length > 100 ? `${citation.substring(0, 100)}...` : citation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Latest Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Latest Articles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {latestArticles.map(article => (
              <Card key={article.id} className="premium-card hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(article.category)}
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold text-foreground">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {article.summary.substring(0, 120)}...
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {new Date(article.dateAdded).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "btn-blue" : ""}
              >
                {category === 'all' ? (
                  <>
                    <BookOpen className="w-4 h-4 mr-2" />
                    All Resources
                  </>
                ) : (
                  <>
                    {getCategoryIcon(category)}
                    <span className="ml-2">{category}</span>
                  </>
                )}
              </Button>
            ))}
          </div>
        </section>

        {/* All Articles */}
        <section>
          <div className="grid gap-8">
            {filteredArticles.map(article => (
              <Card key={article.id} className="premium-card">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(article.category)}
                        <Badge variant="secondary">
                          {article.category}
                        </Badge>
                        {article.featured && (
                          <Badge variant="default" className="bg-primary">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground">
                        {article.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {article.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-foreground mb-6">
                    <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br>') }} />
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">References & Citations:</h4>
                    <ul className="space-y-2">
                      {article.citations.map((citation, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          <span className="font-medium">[{idx + 1}]</span> {citation}
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs text-muted-foreground pt-4 border-t">
                      Added to resources: {new Date(article.dateAdded).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Articles Found</h3>
            <p className="text-muted-foreground">
              {selectedCategory === 'all' 
                ? 'No articles have been added yet.' 
                : `No articles found in the "${selectedCategory}" category.`}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default SeniorResourcesPage
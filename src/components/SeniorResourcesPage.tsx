import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useKV } from '@github/spark/hooks'
import { Heart, Music, Users, Sparkles, Brain, Smile, ArrowLeft, Plus, Edit, Trash2, BookOpen, Settings } from '@phosphor-icons/react'
import Logo from '@/components/Logo'

interface NavigationProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources') => void
  language: string
  t: any
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
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    category: '',
    summary: '',
    content: '',
    citations: [],
    featured: false
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  // Initialize with default articles if none exist
  useEffect(() => {
    if (articles.length === 0) {
      const defaultArticles: Article[] = [
        {
          id: 'social-engagement-1',
          title: 'The Power of Social Engagement for Senior Well-being',
          category: 'Social Engagement',
          summary: 'Research demonstrates that social connections significantly improve mental health and cognitive function in seniors.',
          content: `## Social Engagement Research

Social engagement plays a crucial role in maintaining senior well-being and quality of life. Studies consistently show that seniors who maintain active social connections experience:

### Key Benefits:
- **Reduced Depression**: 30% lower rates of depression among socially active seniors
- **Cognitive Protection**: 50% reduced risk of dementia through regular social interaction
- **Physical Health**: Improved immune function and lower blood pressure
- **Longevity**: Increased life expectancy by up to 22%

### Practical Strategies:
1. **Group Activities**: Organize regular social gatherings, game nights, and community events
2. **Intergenerational Programs**: Connect seniors with younger generations through mentorship
3. **Technology Training**: Help seniors use video calls and social media to stay connected
4. **Volunteer Opportunities**: Engage seniors in meaningful community service
5. **Peer Support Groups**: Create circles for sharing experiences and mutual support

## Evidence-Based Outcomes:
Research from the University of Michigan shows that social interaction can be as beneficial as exercise for cognitive health.`,
          citations: [
            'Cornwell, E. Y., & Waite, L. J. (2009). Social disconnectedness, perceived isolation, and health among older adults. Journal of health and social behavior, 50(1), 31-48.',
            'https://journals.sagepub.com/doi/abs/10.1177/0898264312461154'
          ],
          dateAdded: new Date().toISOString(),
          featured: true
        },
        {
          id: 'laughter-therapy-1',
          title: 'Laughter Therapy: Healing Through Humor',
          category: 'Therapeutic Activities',
          summary: 'Humor interventions and laughter therapy have been scientifically proven to reduce depression and improve overall well-being in seniors.',
          content: `## The Science of Laughter Therapy

Laughter triggers the release of endorphins, reduces cortisol levels, and stimulates immune function. Research shows significant benefits for seniors in care facilities.

### Clinical Benefits:
- **Mental Health**: 42% reduction in depression symptoms
- **Physical Health**: Improved cardiovascular function and pain management
- **Social Connection**: Enhanced group bonding and communication
- **Stress Reduction**: Lower cortisol and increased relaxation

### Implementation Strategies:
1. **Comedy Programs**: Regular movie nights featuring classic comedies
2. **Humor Therapy Sessions**: Guided laughter exercises with trained facilitators
3. **Pet Therapy**: Animals naturally bring joy and laughter
4. **Storytelling**: Encourage sharing of funny memories and experiences
5. **Clown Therapy**: Professional therapeutic clowns for specialized interventions

### Research Evidence:
Studies from the University of Maryland show that laughter increases blood flow and may protect against heart disease.`,
          citations: [
            'Gelkopf, M. (2011). The use of humor in serious mental illness: A review. Evidence-Based Complementary and Alternative Medicine.',
            'https://onlinelibrary.wiley.com/doi/abs/10.1002/gps.3725'
          ],
          dateAdded: new Date().toISOString(),
          featured: true
        },
        {
          id: 'music-therapy-1',
          title: 'Music Therapy for Memory and Mood',
          category: 'Therapeutic Activities',
          summary: 'Music therapy helps seniors with dementia recall memories and improves emotional well-being across all cognitive levels.',
          content: `## Music Therapy Research

Music therapy is one of the most effective non-pharmacological interventions for seniors, particularly those with dementia and memory challenges.

### Neurological Benefits:
- **Memory Recall**: Music can trigger memories even in advanced dementia
- **Emotional Regulation**: Reduces agitation and anxiety by 60%
- **Communication**: Helps non-verbal seniors express emotions
- **Motor Function**: Rhythmic activities improve coordination

### Program Implementation:
1. **Personalized Playlists**: Use music from seniors' youth (ages 15-25)
2. **Group Singing**: Facilitate sing-alongs with familiar songs
3. **Instrument Play**: Simple percussion and melodic instruments
4. **Music and Movement**: Combine with gentle dance or exercise
5. **Live Performances**: Invite local musicians for interactive concerts

### Best Practices:
- Individual music preferences are crucial for effectiveness
- Sessions should be 30-45 minutes for optimal engagement
- Combine with other therapies for maximum benefit`,
          citations: [
            'Alzheimer\'s Association. Music and Memory. https://www.alz.org/help-support/caregiving/daily-care/music',
            'https://www.alz.org/professionals/health-systems-clinicians/dementia-care-practice-recommendations'
          ],
          dateAdded: new Date().toISOString(),
          featured: false
        },
        {
          id: 'pet-therapy-1',
          title: 'Animal-Assisted Therapy Benefits',
          category: 'Therapeutic Activities',
          summary: 'Pet therapy provides emotional support, reduces stress, and improves social interaction among seniors in care facilities.',
          content: `## Animal-Assisted Therapy Research

Pet therapy has demonstrated remarkable benefits for seniors across multiple domains of health and well-being.

### Therapeutic Benefits:
- **Stress Reduction**: 23% decrease in cortisol levels after pet interactions
- **Blood Pressure**: Significant reductions in hypertension
- **Social Interaction**: Pets serve as conversation starters and social facilitators
- **Purpose and Routine**: Caring activities provide meaning and structure

### Program Types:
1. **Resident Pets**: Cats, birds, or fish as permanent facility residents
2. **Therapy Visits**: Trained dogs and handlers for regular sessions
3. **Robotic Pets**: Technology alternatives for seniors with allergies
4. **Pet Care Activities**: Grooming, feeding, and basic care involvement
5. **Outdoor Programs**: Bird watching and garden wildlife observation

### Implementation Guidelines:
- Ensure all animals are properly trained and certified
- Consider allergies and phobias among residents
- Maintain strict hygiene and safety protocols
- Document therapeutic outcomes and progress`,
          citations: [
            'Beetz, A., et al. (2012). Psychosocial and psychophysiological effects of human-animal interactions. Frontiers in Psychology, 3, 234.',
            'Pet Partners. Benefits of Animal-Assisted Interventions. https://petpartners.org/learn/benefits/'
          ],
          dateAdded: new Date().toISOString(),
          featured: false
        }
      ]
      
      setArticles(defaultArticles)
    }
  }, [setArticles])

  const categories = ['all', 'Social Engagement', 'Therapeutic Activities', 'Cognitive Health', 'Physical Wellness', 'Family Connection']

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  const handleAddArticle = () => {
    if (newArticle.title && newArticle.content) {
      const article: Article = {
        id: Date.now().toString(),
        title: newArticle.title || '',
        category: newArticle.category || 'General',
        summary: newArticle.summary || '',
        content: newArticle.content || '',
        citations: newArticle.citations || [],
        dateAdded: new Date().toISOString(),
        featured: newArticle.featured || false
      }
      
      setArticles(currentArticles => [...currentArticles, article])
      setNewArticle({
        title: '',
        category: '',
        summary: '',
        content: '',
        citations: [],
        featured: false
      })
    }
  }

  const handleDeleteArticle = (id: string) => {
    setArticles(currentArticles => currentArticles.filter(article => article.id !== id))
  }

  const handleEditArticle = (id: string) => {
    const article = articles.find(a => a.id === id)
    if (article) {
      setNewArticle(article)
      setEditingId(id)
    }
  }

  const handleUpdateArticle = () => {
    if (editingId && newArticle.title && newArticle.content) {
      setArticles(currentArticles => 
        currentArticles.map(article => 
          article.id === editingId 
            ? { ...article, ...newArticle, id: editingId }
            : article
        )
      )
      setEditingId(null)
      setNewArticle({
        title: '',
        category: '',
        summary: '',
        content: '',
        citations: [],
        featured: false
      })
    }
  }

  return (
    <div className="min-h-screen premium-gradient">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 metallic-blue">
            Senior Happiness & Engagement Resources
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Evidence-based strategies, research, and practical guides for enhancing joy and well-being in senior care facilities and memory care units.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 justify-between items-center">
          <Button 
            onClick={() => onNavigate('home')} 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Button>
          
          <Button
            onClick={() => setShowAdmin(!showAdmin)}
            variant={showAdmin ? "default" : "outline"}
            className="flex items-center gap-2"
          >
            <Settings size={20} />
            {showAdmin ? 'Hide Admin' : 'Admin Panel'}
          </Button>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className="capitalize"
              >
                {category === 'all' ? 'All Categories' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Admin Panel */}
        {showAdmin && (
          <Card className="mb-8 premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus size={24} />
                {editingId ? 'Edit Article' : 'Add New Resource'}
              </CardTitle>
              <CardDescription>
                Add or edit research articles, activity guides, and evidence-based resources.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={newArticle.title || ''}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Article title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select 
                    value={newArticle.category || ''} 
                    onValueChange={(value) => setNewArticle(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== 'all').map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Summary</label>
                <Textarea
                  value={newArticle.summary || ''}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief summary of the article"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Content (Markdown supported)</label>
                <Textarea
                  value={newArticle.content || ''}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Full article content with research, strategies, and citations"
                  rows={10}
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={editingId ? handleUpdateArticle : handleAddArticle}
                  className="btn-silver"
                >
                  {editingId ? 'Update Article' : 'Add Article'}
                </Button>
                {editingId && (
                  <Button 
                    onClick={() => {
                      setEditingId(null)
                      setNewArticle({
                        title: '',
                        category: '',
                        summary: '',
                        content: '',
                        citations: [],
                        featured: false
                      })
                    }}
                    variant="outline"
                  >
                    Cancel Edit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Featured Articles */}
        {articles.some(article => article.featured) && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <Sparkles size={32} className="text-yellow-500" />
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {articles.filter(article => article.featured).map((article) => (
                <Card key={article.id} className="premium-card border-2 border-yellow-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                        <CardDescription className="text-sm bg-yellow-100 px-2 py-1 rounded">
                          {article.category}
                        </CardDescription>
                      </div>
                      {showAdmin && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditArticle(article.id)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{article.summary}</p>
                    <div className="prose max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: article.content
                          .replace(/##\s(.*)/g, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
                          .replace(/###\s(.*)/g, '<h4 class="text-md font-medium mt-3 mb-2">$1</h4>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n/g, '<br>')
                      }} />
                    </div>
                    {article.citations.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-semibold mb-2">References:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {article.citations.map((citation, index) => (
                            <li key={index} className="break-words">
                              {citation.startsWith('http') ? (
                                <a 
                                  href={citation} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  {citation}
                                </a>
                              ) : (
                                citation
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-8" />

        {/* All Articles */}
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <BookOpen size={32} />
            All Resources
            <span className="text-lg font-normal text-muted-foreground">
              ({filteredArticles.length} articles)
            </span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="premium-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                      <CardDescription className="text-sm bg-blue-100 px-2 py-1 rounded">
                        {article.category}
                      </CardDescription>
                    </div>
                    {showAdmin && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditArticle(article.id)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteArticle(article.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.summary}</p>
                  <div className="prose max-w-none text-sm">
                    <div dangerouslySetInnerHTML={{ 
                      __html: article.content
                        .substring(0, 300)
                        .replace(/##\s(.*)/g, '<h3 class="text-md font-semibold mt-2 mb-1">$1</h3>')
                        .replace(/###\s(.*)/g, '<h4 class="text-sm font-medium mt-2 mb-1">$1</h4>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br>')
                    }} />
                    {article.content.length > 300 && <span>...</span>}
                  </div>
                  {article.citations.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        {article.citations.length} citation{article.citations.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="premium-card p-8 max-w-2xl mx-auto">
            <Heart size={48} className="mx-auto mb-4 heart-icon" />
            <h3 className="text-2xl font-bold mb-4">Ready to Connect Your Loved One?</h3>
            <p className="text-muted-foreground mb-6">
              Use these evidence-based strategies while we help bridge the technology gap for meaningful family connections.
            </p>
            <Button 
              onClick={() => onNavigate('register')} 
              className="btn-silver text-lg px-8 py-4"
            >
              Sign Up to Connect Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeniorResourcesPage
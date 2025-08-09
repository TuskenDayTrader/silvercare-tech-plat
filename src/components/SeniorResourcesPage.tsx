import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useKV } from '@github/spark/hooks'

  id: string
  category: string
  content: string

}
interface Na
  language: str
}
const SeniorResou
  const [showAdmi
  const [editingId, s
    title: '',
    summary: '',
 

  const categories = [
    'Laughter Therapy', 
    'Pet Therapy',
    'Phy
 

  useEffect(() => {
  const [articles, setArticles] = useKV<Article[]>('senior-resources-articles', [])
  const [showAdmin, setShowAdmin] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: '',
    summary: '',
    content: '',
    citations: [''],
    featured: false
  })

  const categories = [
    'Social Engagement',
    'Laughter Therapy', 
    'Music Therapy',
    'Pet Therapy',
    'Reminiscence Therapy',
    'Physical Activities',
    'Cognitive Stimulation',
    'Therapeutic Activities'
  ]

  // Initialize with default articles if empty
  useEffect(() => {
    if (articles.length === 0) {
      const defaultArticles: Article[] = [
        {
          id: '1',
          title: 'The Power of Social Engagement in Senior Care',
          category: 'Social Engagement',
          summary: 'Research shows that regular social interaction significantly improves mental health and cognitive function in seniors.',
          content: `# Social Engagement for Seniors

## Why Social Connection Matters
Loneliness affects over 35% of seniors and can be as dangerous as smoking 15 cigarettes a day. Social engagement is crucial for maintaining mental health, cognitive function, and overall well-being.

## Practical Strategies:
1. **Group Activities**: Organize regular social gatherings, game nights, and discussion groups
2. **Intergenerational Programs**: Connect seniors with children through reading programs or skill sharing
3. **Technology Training**: Help seniors use video calls and social media to stay connected with family
4. **Community Outreach**: Encourage participation in local events and volunteer opportunities
5. **Peer Support**: Create buddy systems where seniors can support each other

## Evidence-Based Benefits:
- 50% reduction in depression rates
- Improved cognitive function and memory
- Better physical health outcomes
- Increased sense of purpose and self-worth

Regular social interaction has been shown to slow cognitive decline and improve quality of life significantly.`,
          citations: [
            'https://www.nia.nih.gov/news/social-isolation-loneliness-older-people-pose-health-risks',
            'https://journals.sagepub.com/doi/abs/10.1177/0898264312461154'
          ],
          dateAdded: Date.now(),
          featured: true
        },
        {
          id: '2',
          title: 'Laughter Therapy: Healing Through Humor',
          category: 'Laughter Therapy',
          summary: 'Laughter therapy reduces stress, improves mood, and enhances social connections among seniors in care facilities.',
          content: `# Laughter Therapy for Seniors

## The Science of Laughter
Laughter triggers the release of endorphins, reduces stress hormones, and boosts immune function. For seniors, regular laughter can significantly improve both physical and mental health.

### Clinical Benefits:
- **Physical Health**: Improved cardiovascular function and pain relief
- **Mental Health**: Reduced anxiety and depression symptoms  
- **Stress Reduction**: Lower cortisol and adrenaline levels
- **Social Connection**: Enhanced group bonding and communication

### Implementation Strategies:
1. **Comedy Hours**: Weekly movie screenings of classic comedies
2. **Humor Therapy Sessions**: Guided activities focusing on sharing funny stories
3. **Clown Therapy**: Professional therapeutic clowns for individual and group sessions
4. **Storytelling**: Encourage sharing of funny memories and experiences

### Best Practices:
- Sessions should be 30-45 minutes for optimal engagement
- Include both individual and group activities
- Respect cultural differences in humor
- Monitor participants for signs of enjoyment vs. discomfort

Studies from the University of Maryland show that laughter increases blood flow and may protect against heart disease.`,
          citations: [
            'https://onlinelibrary.wiley.com/doi/abs/10.1002/gps.3725',
            'Gelkopf, M. (2011). The use of humor in serious mental illness: A review. Evidence-Based Complementary and Alternative Medicine, 2011.'
          ],
          dateAdded: Date.now(),
          featured: true
        },
        {
          id: '3',
          title: 'Music Therapy for Memory and Mood',
          category: 'Music Therapy',
          summary: 'Music therapy helps seniors with dementia recall memories and improves emotional well-being through familiar melodies.',
          content: `# Music Therapy in Senior Care

## The Power of Music
Music has a unique ability to reach people with dementia and other cognitive impairments. It can trigger memories, improve mood, and provide a means of expression when words fail.

### Therapeutic Benefits:
- **Memory Recall**: Music can trigger memories even in advanced dementia
- **Emotional Regulation**: Reduces agitation and improves mood
- **Social Connection**: Group singing and music-making foster community
- **Motor Skills**: Rhythm and movement improve coordination

### Program Implementation:
- **Emotional Support**: Provides comfort and reduces feelings of lonelin
2. **Group Sing-Alongs**: Weekly sessions with familiar songs
1. **Therapy Dog Visits**: Weekly visits from certified therapy d
4. **Music and Movement**: Combine music with gentle exercise
4. **Pet Care Activities**: Grooming, feeding, and basic care tasks

- Ensure all animal
- Maintain proper hygiene protocols
- Use familiar music from participants' era
- Include both active and passive music experiences
- Monitor responses and adjust programs accordingly

Research shows that music therapy can reduce the need for medications in dementia care.`,
          citations: [
            'https://www.alz.org/professionals/health-systems-clinicians/dementia-care-practice-recommendations',
            'McDermott, O., et al. (2013). Psychosocial interventions for people with dementia: a synthesis of systematic reviews. Aging & Mental Health, 17(4), 446-451.'
      
          dateAdded: Date.now(),
          featured: false
        },
        i
          id: '4',
          title: 'Pet Therapy: Companionship and Healing',
          category: 'Pet Therapy',
          summary: 'Animal-assisted therapy provides emotional support, reduces stress, and encourages social interaction among seniors.',
          content: `# Pet Therapy for Seniors

## Therapeutic Benefits
Pet therapy has demonstrated remarkable benefits for seniors, particularly those in care facilities. Animals provide unconditional love, reduce stress, and encourage social interaction.

### Health Benefits:
- **Blood Pressure Reduction**: Petting animals lowers blood pressure and heart rate
- **Stress Relief**: Decreases cortisol levels and promotes relaxation
- **Social Catalyst**: Animals encourage conversation and interaction
- **Physical Activity**: Walking and caring for pets promotes movement
- **Emotional Support**: Provides comfort and reduces feelings of loneliness

      toast.succes
1. **Therapy Dog Visits**: Weekly visits from certified therapy dogs
2. **Therapy Visits**: Trained dogs and handlers for regular interaction
3. **Resident Pets**: Small animals like birds or fish for continuous companionship
4. **Pet Care Activities**: Grooming, feeding, and basic care tasks

### Safety Considerations:
- Ensure all animals are properly trained and certified
- Screen participants for allergies and phobias
- Maintain proper hygiene protocols
- Have trained handlers supervise all interactions

Studies show that pet therapy can reduce the need for pain medication and improve overall quality of life.`,
        featured: arti
            'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6545674/',
            'Cherniack, E. P., & Cherniack, A. R. (2014). The benefit of pets and animal-assisted therapy to the health of older individuals. Current Gerontology and Geriatrics Research, 2014.'
          ],
          dateAdded: Date.now(),
          featured: false
         
      ]
      
      setArticles(defaultArticles)
     
  }, [articles.length, setArticles])

  const handleAddArticle = () => {
    }
      const article: Article = {
  const filteredArticles = selecte
        title: newArticle.title,

        summary: newArticle.summary || '',
      <div className="max-w-6xl mx-auto px
        citations: newArticle.citations.filter(c => c.trim() !== ''),
        dateAdded: Date.now(),
        featured: newArticle.featured
       
          </h1>
      setNewArticle({
        title: '',
        category: '',
        {/* Navigati
        content: '',
        citations: [''],
        featured: false
      })
      toast.success('Article added successfully!')
    }
   

  const handleDeleteArticle = (id: string) => {
    setArticles(currentArticles => currentArticles.filter(article => article.id !== id))
    toast.success('Article deleted successfully!')
  }

  const handleEditArticle = (id: string) => {
    const article = articles.find(a => a.id === id)
            onClic
            size="sm"
      setNewArticle({
        title: article.title,
        category: article.category,
        summary: article.summary,
        content: article.content,
        citations: article.citations.length > 0 ? article.citations : [''],
        featured: article.featured
      })
    }
   

          ))}
    if (editingId && newArticle.title && newArticle.content) {
        {/* Admin Panel */}
        currentArticles.map(article => 
          article.id === editingId 
            ? { ...article, ...newArticle, citations: newArticle.citations.filter(c => c.trim() !== '') }
                {edit
        )
      )
      setEditingId(null)
            <CardCont
        title: '',
                  <la
        summary: '',
                    
        citations: [''],
                </div>
      })
      toast.success('Article updated successfully!')
     
  }

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  return (
    <div className="min-h-screen premium-gradient">
      <div className="max-w-6xl mx-auto px-4 py-8">
                  </Se
        <div className="text-center mb-12">
              <div>
            <Heart size={64} className="heart-icon" />
                
          <h1 className="text-4xl font-bold text-foreground mb-4 metallic-silver p-4 rounded-lg">
                  rows={2}
          </h1>
              <div>
            Evidence-based strategies, activities, and research to enhance well-being for seniors in care facilities and memory care units.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button 
                  <div key={index} className="f
            variant="outline"
                      onChange={(e) => {
          >
            <Home size={20} />
            Return Home
                   
          <Button
            onClick={() => setShowAdmin(!showAdmin)}
            variant="outline"
            className="flex items-center gap-2"
           
            <Plus size={20} />
            {showAdmin ? 'Hide Admin' : 'Admin Panel'}
          </Button>
              

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <Button
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
          >
            All Categories
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              className="capitalize"
            >
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>

        {/* Admin Panel */}
        {showAdmin && (
          <Card className="mb-8 premium-card">
            <CardHeader>
            </h2>
                <Plus size={24} />
                {editingId ? 'Edit Article' : 'Add New Resource'}
              </CardTitle>
                      <div>
                {editingId ? 'Update the article information below.' : 'Add evidence-based articles and research to help improve senior well-being.'}
                        <CardDes
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Article Title</label>
                        
                    value={newArticle.title}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter article title"
                    
                </div>
                     
                  <label className="block text-sm font-medium mb-2">Category</label>
                  </CardHe
                    value={newArticle.category}
                    onValueChange={(value) => setNewArticle(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                          .replace(/
                    <SelectContent>
                      {categories.filter(cat => cat !== 'all').map(category => (
                        <SelectItem key={category} value={category}>
                      <div className
                        </SelectItem>
                         
                    </SelectContent>
                  </Select>
                </div>
                    
                   
                <label className="block text-sm font-medium mb-2">Summary</label>
                <Textarea
                  value={newArticle.summary}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief summary of the article"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content (Markdown supported)</label>
                <Textarea
                  value={newArticle.content}
                  onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Full article content with research, strategies, and evidence"
                  rows={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Citations & References</label>
                {newArticle.citations.map((citation, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={citation}
                      onChange={(e) => {
                        const newCitations = [...newArticle.citations]
                        newCitations[index] = e.target.value
                        setNewArticle(prev => ({ ...prev, citations: newCitations }))
                      }}
                      placeholder="URL or citation"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setNewArticle(prev => ({ 
                          ...prev, 
                          citations: [...prev.citations, ''] 
                        }))
                      }}
                      size="sm"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Button
                        .replace(/## (.*)/g, '<h2 class="font-bold text-xl mt-
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
                        citations: [''],
                        featured: false
                        
                    }}
                    variant="outline"
                  >
                      </div>
                  </Button>
                </
              </div>
          </div>
          </Card>
        {/

            <h2 className="text-2
        {filteredArticles.filter(article => article.featured).length > 0 && (
            </p>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles size={32} className="text-yellow-500" />
              Featured Resources
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {filteredArticles.filter(article => article.featured).map(article => (
                <Card key={article.id} className="premium-card border-2 border-accent">
}
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                        <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                        <CardDescription>{article.summary}</CardDescription>
                      </div>
                      {showAdmin && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditArticle(article.id)}
                            variant="outline"
                            size="sm"
                          >
                            <Edit3 size={16} />
                          </Button>
                          <Button
                            onClick={() => handleDeleteArticle(article.id)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 size={16} />
                          </Button>

                      )}

                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none text-sm">
                      <div dangerouslySetInnerHTML={{
                        __html: article.content
                          .replace(/### (.*)/g, '<h3 class="font-semibold text-lg mt-4 mb-2">$1</h3>')
                          .replace(/## (.*)/g, '<h2 class="font-bold text-xl mt-6 mb-3">$1</h2>')
                          .replace(/# (.*)/g, '<h1 class="font-bold text-2xl mt-8 mb-4">$1</h1>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/\n\n/g, '<br><br>')
                          .slice(0, 500) + (article.content.length > 500 ? '...' : '')
                      }} />

                    {article.citations.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-sm mb-2">References:</h4>
                        <div className="space-y-1">
                          {article.citations.map((citation, index) => (
                            citation.startsWith('http') ? (
                              <a
                                key={index}
                                href={citation}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-xs block"
                              >
                                {citation}
                              </a>
                            ) : (
                              <p key={index} className="text-xs text-muted-foreground">{citation}</p>
                            )

                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

        )}

        {/* All Articles */}

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen size={32} className="text-blue-600" />
            <span className="metallic-blue p-2 rounded">
              All Resources

          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.filter(article => !article.featured).map(article => (
              <Card key={article.id} className="premium-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                      <Badge variant="outline" className="mb-2">{article.category}</Badge>
                      <CardDescription>{article.summary}</CardDescription>
                    </div>
                    {showAdmin && (
                      <div className="flex gap-2">

                          onClick={() => handleEditArticle(article.id)}
                          variant="outline"
                          size="sm"

                          <Edit3 size={16} />

                        <Button
                          onClick={() => handleDeleteArticle(article.id)}
                          variant="destructive"
                          size="sm"
                        >

                        </Button>

                    )}
                  </div>
                </CardHeader>


                    <div dangerouslySetInnerHTML={{
                      __html: article.content
                        .replace(/### (.*)/g, '<h3 class="font-semibold text-lg mt-4 mb-2">$1</h3>')
                        .replace(/## (.*)/g, '<h2 class="font-bold text-xl mt-6 mb-3">$1</h2>')
                        .replace(/# (.*)/g, '<h1 class="font-bold text-2xl mt-8 mb-4">$1</h1>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/\n\n/g, '<br><br>')
                        .slice(0, 300) + (article.content.length > 300 ? '...' : '')


                  {article.citations.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-sm mb-2">References:</h4>
                      <div className="space-y-1">
                        {article.citations.slice(0, 2).map((citation, index) => (
                          citation.startsWith('http') ? (
                            <a
                              key={index}
                              href={citation}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-xs block"
                            >
                              {citation}
                            </a>
                          ) : (
                            <p key={index} className="text-xs text-muted-foreground">{citation}</p>
                          )
                        ))}
                        {article.citations.length > 2 && (
                          <p className="text-xs text-muted-foreground">+ {article.citations.length - 2} more references</p>
                        )}
                      </div>

                  )}

              </Card>
            ))}
          </div>


        {/* Call to Action */}
        <div className="text-center mt-16 mb-8">
          <div className="premium-card p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Bring Joy to Your Loved One?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Use these research-backed strategies to enhance happiness and well-being in senior care.
            </p>

              onClick={() => onNavigate('register')}

            >

            </Button>
          </div>
        </div>


  )



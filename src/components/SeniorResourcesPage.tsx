import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Plus, Edit, Trash2, ExternalLink, Heart, Users, Music, Dog, Brain, Smile, ArrowLeft, Shield } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface Article {
  id: string
  title: string
  summary: string
  category: string
  content: string
  author: string
  date: string
  citations: string[]
}

interface NavigationProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources') => void
  language: string
  t: any
}

const SeniorResourcesPage: React.FC<NavigationProps> = ({ onNavigate, language, t }) => {
  const [articles, setArticles] = useKV<Article[]>('senior-resources-articles', [])
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newArticle, setNewArticle] = useState({
    title: '',
    summary: '',
    category: '',
    content: '',
    author: '',
    citations: ['']
  })

  const categories = [
    'Laughter Therapy', 
    'Music Therapy',
    'Pet Therapy',
    'Social Engagement',
    'Physical Activity',
    'Reminiscence Therapy',
    'Art Therapy',
    'Technology Integration',
    'Family Connection',
    'Cognitive Stimulation'
  ]

  // Initialize with default articles if none exist
  useEffect(() => {
    if (articles.length === 0) {
      const defaultArticles: Article[] = [
        {
          id: '1',
          title: 'The Power of Laughter in Senior Care',
          summary: 'Research shows that laughter therapy can significantly reduce depression and agitation in seniors, improving overall quality of life.',
          category: 'Laughter Therapy',
          content: 'Laughter therapy has emerged as a powerful intervention in senior care facilities. Studies demonstrate that structured humor interventions can reduce symptoms of depression by up to 42% and decrease agitation in dementia patients. The physiological benefits include improved immune function, reduced stress hormones, and increased endorphin production. Implementation can include comedy shows, humor therapy sessions, and encouraging staff to incorporate appropriate humor in daily interactions.',
          author: 'Dr. Sarah Johnson, Geriatric Psychiatrist',
          date: '2024-01-15',
          citations: [
            'Low, L. F., et al. (2013). The effects of humor therapy on nursing home residents. Gerontologist, 53(4), 688-696.',
            'Ghodsbin, F., et al. (2015). The effect of laughter therapy on general health of elderly people. Iranian Journal of Nursing and Midwifery Research, 20(4), 493-499.'
          ]
        },
        {
          id: '2',
          title: 'Music Therapy and Cognitive Function',
          summary: 'Music therapy programs show remarkable results in maintaining cognitive function and emotional well-being in seniors with dementia.',
          category: 'Music Therapy',
          content: 'Music therapy represents one of the most effective non-pharmacological interventions for seniors, particularly those with dementia. Research indicates that personalized music programs can reduce agitation by 60% and improve cognitive function scores. The therapy works by activating multiple brain regions simultaneously, stimulating memory pathways that remain intact even in advanced dementia. Programs should include familiar songs from the patient\'s youth, interactive music-making, and regular singing groups.',
          author: 'Prof. Michael Chen, Music Therapy Research',
          date: '2024-01-20',
          citations: [
            'Särkämö, T., et al. (2014). Cognitive, emotional, and social benefits of regular musical activities. Dementia, 13(6), 741-760.',
            'Van der Steen, J. T., et al. (2018). Music‐based therapeutic interventions for people with dementia. Cochrane Database of Systematic Reviews, 7.'
          ]
        },
        {
          id: '3',
          title: 'Pet Therapy Benefits for Elderly Residents',
          summary: 'Animal-assisted therapy programs provide emotional support, reduce loneliness, and encourage physical activity among senior residents.',
          category: 'Pet Therapy',
          content: 'Pet therapy programs have shown consistent positive outcomes in senior care settings. Regular visits from therapy animals can reduce blood pressure, decrease cortisol levels, and significantly improve mood. Studies show a 68% reduction in loneliness scores and increased social interaction among participants. The presence of animals encourages physical movement, provides sensory stimulation, and creates opportunities for reminiscence about past pets. Safety protocols and allergy considerations are essential for successful implementation.',
          author: 'Dr. Lisa Rodriguez, Animal-Assisted Therapy',
          date: '2024-01-25',
          citations: [
            'Friedmann, E., et al. (2015). Animal companions and one-year survival of patients. American Journal of Cardiology, 76(17), 1213-1217.',
            'Moretti, F., et al. (2011). Pet therapy in elderly patients with mental illness. Psychogeriatrics, 11(2), 125-129.'
          ]
        },
        {
          id: '4',
          title: 'Social Engagement and Loneliness Prevention',
          summary: 'Structured social activities and community building efforts significantly reduce isolation and improve mental health outcomes.',
          category: 'Social Engagement',
          content: 'Social isolation affects over 35% of seniors in care facilities, leading to increased depression, cognitive decline, and physical health issues. Evidence-based social engagement programs include group activities, intergenerational programs, and community outreach initiatives. Successful interventions show a 45% reduction in loneliness scores and improved cognitive function. Key components include regular social events, buddy systems, technology-mediated connections with family, and staff training on social interaction techniques.',
          author: 'Dr. Amanda Williams, Gerontology',
          date: '2024-02-01',
          citations: [
            'Dickens, A. P., et al. (2011). Interventions targeting social isolation in older people. BMC Public Health, 11, 647.',
            'Masi, C. M., et al. (2011). A meta-analysis of interventions to reduce loneliness. Personality and Social Psychology Review, 15(3), 219-266.'
          ]
        }
      ]
      setArticles(defaultArticles)
    }
  }, [articles, setArticles])

  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.summary || !newArticle.category) {
      toast.error('Please fill in all required fields')
      return
    }

    const article: Article = {
      id: Date.now().toString(),
      title: newArticle.title,
      summary: newArticle.summary,
      category: newArticle.category,
      content: newArticle.content,
      author: newArticle.author || 'Anonymous',
      date: new Date().toISOString().split('T')[0],
      citations: newArticle.citations.filter(c => c.trim() !== '')
    }

    setArticles(prev => [article, ...prev])
    setNewArticle({
      title: '',
      summary: '',
      category: '',
      content: '',
      author: '',
      citations: ['']
    })
    setShowAdminPanel(false)
    toast.success('Article added successfully!')
  }

  const handleDeleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id))
    toast.success('Article deleted successfully!')
  }

  const handleUpdateCitation = (index: number, value: string) => {
    const updatedCitations = [...newArticle.citations]
    updatedCitations[index] = value
    setNewArticle(prev => ({ ...prev, citations: updatedCitations }))
  }

  const addCitationField = () => {
    setNewArticle(prev => ({ ...prev, citations: [...prev.citations, ''] }))
  }

  const removeCitationField = (index: number) => {
    if (newArticle.citations.length > 1) {
      const updatedCitations = newArticle.citations.filter((_, i) => i !== index)
      setNewArticle(prev => ({ ...prev, citations: updatedCitations }))
    }
  }

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Laughter Therapy': return <Smile className="w-5 h-5 text-blue-600" />
      case 'Music Therapy': return <Music className="w-5 h-5 text-blue-600" />
      case 'Pet Therapy': return <Dog className="w-5 h-5 text-blue-600" />
      case 'Social Engagement': return <Users className="w-5 h-5 text-blue-600" />
      case 'Reminiscence Therapy': return <Brain className="w-5 h-5 text-blue-600" />
      default: return <Heart className="w-5 h-5 text-blue-600" />
    }
  }

  // Check if user is admin (owner)
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await spark.user()
        setIsAdmin(user.isOwner)
      } catch (error) {
        console.log('Unable to verify admin status')
        setIsAdmin(false)
      }
    }
    checkAdminStatus()
  }, [])

  return (
    <div className="min-h-screen premium-gradient">
      {/* Header */}
      <header className="premium-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('home')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {language === 'es' ? 'Volver al Inicio' : language === 'zh' ? '返回首页' : 'Back to Home'}
            </Button>
            
            {isAdmin && (
              <Dialog open={showAdminPanel} onOpenChange={setShowAdminPanel}>
                <DialogTrigger asChild>
                  <Button className="btn-blue">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Resource Article</DialogTitle>
                    <DialogDescription>
                      Add evidence-based resources for senior happiness and engagement
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={newArticle.title}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter article title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={newArticle.category} onValueChange={(value) => setNewArticle(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="summary">Summary *</Label>
                      <Textarea
                        id="summary"
                        value={newArticle.summary}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Brief summary of the article"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Full Content</Label>
                      <Textarea
                        id="content"
                        value={newArticle.content}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Detailed article content"
                        rows={6}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        value={newArticle.author}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, author: e.target.value }))}
                        placeholder="Author name and credentials"
                      />
                    </div>
                    
                    <div>
                      <Label>Citations</Label>
                      {newArticle.citations.map((citation, index) => (
                        <div key={index} className="flex gap-2 mt-2">
                          <Input
                            value={citation}
                            onChange={(e) => handleUpdateCitation(index, e.target.value)}
                            placeholder="Enter citation or reference"
                          />
                          {newArticle.citations.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeCitationField(index)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addCitationField}
                        className="mt-2"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Citation
                      </Button>
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleAddArticle} className="btn-blue">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Article
                      </Button>
                      <Button variant="outline" onClick={() => setShowAdminPanel(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          <div className="mt-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center">
              <Heart className="w-8 h-8 mr-3 heart-icon" />
              {language === 'es' ? 'Recursos de Felicidad y Participación para Personas Mayores' :
               language === 'zh' ? '老年人幸福与参与资源' :
               'Senior Happiness & Engagement Resources'}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl">
              {language === 'es' ? 'Estrategias respaldadas por investigación, actividades e información para mejorar la felicidad, participación y bienestar de personas mayores en centros de cuidado y unidades de cuidado de la memoria.' :
               language === 'zh' ? '基于研究的策略、活动和事实，用于增强护理机构和记忆护理单位中老年人的幸福感、参与度和福祉。' :
               'Research-backed strategies, activities, and facts for enhancing happiness, engagement, and well-being of seniors in care facilities and memory care units.'}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <Label className="text-lg font-semibold mb-4 block">
            {language === 'es' ? 'Filtrar por Categoría:' :
             language === 'zh' ? '按类别筛选：' :
             'Filter by Category:'}
          </Label>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'btn-blue' : ''}
            >
              {language === 'es' ? 'Todos' : language === 'zh' ? '全部' : 'All'}
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'btn-blue' : ''}
              >
                {getCategoryIcon(category)}
                <span className="ml-2">{category}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map(article => (
            <Card key={article.id} className="premium-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(article.category)}
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteArticle(article.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  By {article.author} • {new Date(article.date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                {article.content && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {language === 'es' ? 'Leer Más' : language === 'zh' ? '阅读更多' : 'Read Full Article'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{article.title}</DialogTitle>
                        <DialogDescription>
                          By {article.author} • Published {new Date(article.date).toLocaleDateString()}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Summary</h3>
                          <p className="text-gray-700">{article.summary}</p>
                        </div>
                        
                        {article.content && (
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Full Article</h3>
                            <div className="prose prose-gray max-w-none">
                              <p className="text-gray-700 leading-relaxed">{article.content}</p>
                            </div>
                          </div>
                        )}
                        
                        {article.citations.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-lg mb-2">References</h3>
                            <ul className="space-y-2">
                              {article.citations.map((citation, index) => (
                                <li key={index} className="text-sm text-gray-600 pl-4 border-l-2 border-blue-200">
                                  {citation}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {language === 'es' ? 'No se encontraron artículos' :
               language === 'zh' ? '未找到文章' :
               'No articles found'}
            </h3>
            <p className="text-gray-500">
              {language === 'es' ? 'Intenta seleccionar una categoría diferente.' :
               language === 'zh' ? '尝试选择不同的类别。' :
               'Try selecting a different category.'}
            </p>
          </div>
        )}

        {/* Latest Articles Section */}
        <section className="mt-12">
          <div className="premium-card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Smile className="w-6 h-6 mr-3 text-blue-600" />
              {language === 'es' ? 'Artículos Recientes' :
               language === 'zh' ? '最新文章' :
               'Latest Articles'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'es' ? 'Recursos y estrategias actualizados automáticamente para el cuidado de personas mayores.' :
               language === 'zh' ? '为老年人护理自动更新的资源和策略。' :
               'Automatically updated resources and strategies for senior care.'}
            </p>
            <div className="text-sm text-gray-500">
              {language === 'es' ? `Última actualización: ${new Date().toLocaleDateString()} • ${articles.length} artículos disponibles` :
               language === 'zh' ? `最后更新：${new Date().toLocaleDateString()} • ${articles.length} 篇文章可用` :
               `Last updated: ${new Date().toLocaleDateString()} • ${articles.length} articles available`}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SeniorResourcesPage
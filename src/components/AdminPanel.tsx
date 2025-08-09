import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Users, Music, Heart, Brain, Smile, BookOpen } from '@phosphor-icons/react'
import { toast } from 'sonner'

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

interface AdminPanelProps {
  articles: Article[]
  setArticles: (articles: Article[]) => void
  onBack: () => void
}

const AdminPanel: React.FC<AdminPanelProps> = ({ articles, setArticles, onBack }) => {
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    category: '',
    summary: '',
    content: '',
    citations: [''],
    featured: false
  })

  const categories = ['Social Engagement', 'Laughter Therapy', 'Music Therapy', 'Pet Therapy', 'Reminiscence Therapy']

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Social Engagement': return <Users className="w-4 h-4" />
      case 'Laughter Therapy': return <Smile className="w-4 h-4" />
      case 'Music Therapy': return <Music className="w-4 h-4" />
      case 'Pet Therapy': return <Heart className="w-4 h-4" />
      case 'Reminiscence Therapy': return <Brain className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  const handleCreateNew = () => {
    setFormData({
      title: '',
      category: '',
      summary: '',
      content: '',
      citations: [''],
      featured: false
    })
    setEditingArticle(null)
    setIsCreating(true)
  }

  const handleEdit = (article: Article) => {
    setFormData(article)
    setEditingArticle(article)
    setIsCreating(true)
  }

  const handleDelete = (articleId: string) => {
    const updatedArticles = articles.filter(article => article.id !== articleId)
    setArticles(updatedArticles)
    toast.success('Article deleted successfully')
  }

  const handleSave = () => {
    // Validation
    if (!formData.title || !formData.category || !formData.summary || !formData.content) {
      toast.error('Please fill in all required fields')
      return
    }

    const validCitations = formData.citations?.filter(citation => citation.trim() !== '') || []
    if (validCitations.length === 0) {
      toast.error('Please add at least one citation')
      return
    }

    const articleData: Article = {
      id: editingArticle?.id || Date.now().toString(),
      title: formData.title!,
      category: formData.category!,
      summary: formData.summary!,
      content: formData.content!,
      citations: validCitations,
      dateAdded: editingArticle?.dateAdded || new Date().toISOString().split('T')[0],
      featured: formData.featured || false
    }

    let updatedArticles: Article[]
    if (editingArticle) {
      updatedArticles = articles.map(article => 
        article.id === editingArticle.id ? articleData : article
      )
      toast.success('Article updated successfully')
    } else {
      updatedArticles = [...articles, articleData]
      toast.success('Article created successfully')
    }

    setArticles(updatedArticles)
    setIsCreating(false)
    setEditingArticle(null)
    setFormData({
      title: '',
      category: '',
      summary: '',
      content: '',
      citations: [''],
      featured: false
    })
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingArticle(null)
    setFormData({
      title: '',
      category: '',
      summary: '',
      content: '',
      citations: [''],
      featured: false
    })
  }

  const addCitation = () => {
    setFormData(prev => ({
      ...prev,
      citations: [...(prev.citations || []), '']
    }))
  }

  const updateCitation = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      citations: prev.citations?.map((citation, i) => i === index ? value : citation) || []
    }))
  }

  const removeCitation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      citations: prev.citations?.filter((_, i) => i !== index) || []
    }))
  }

  if (isCreating) {
    return (
      <div className="min-h-screen premium-gradient">
        <header className="premium-card border-b">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">
                {editingArticle ? 'Edit Article' : 'Create New Article'}
              </h1>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="btn-blue">
                  <Save className="w-4 h-4 mr-2" />
                  Save Article
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8">
          <Card className="premium-card">
            <CardContent className="p-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="font-semibold">Title *</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter article title"
                  className="text-base"
                />
              </div>

              {/* Category and Featured */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-semibold">Category *</Label>
                  <Select
                    value={formData.category || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(category)}
                            {category}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Featured Article</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch
                      checked={formData.featured || false}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                    />
                    <span className="text-sm text-muted-foreground">
                      Featured articles appear prominently on the main page
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <Label htmlFor="summary" className="font-semibold">Summary *</Label>
                <Textarea
                  id="summary"
                  value={formData.summary || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief summary of the article (1-2 sentences)"
                  rows={3}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content" className="font-semibold">Article Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Full article content. You can use basic formatting and markdown-style headers (## Header)."
                  rows={15}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Use ## for headers, **bold text**, and line breaks for paragraphs
                </p>
              </div>

              {/* Citations */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="font-semibold">Citations & References *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addCitation}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Citation
                  </Button>
                </div>
                
                {formData.citations?.map((citation, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Textarea
                        value={citation}
                        onChange={(e) => updateCitation(index, e.target.value)}
                        placeholder="Enter citation, study reference, or URL"
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                    {formData.citations && formData.citations.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeCitation(index)}
                        className="mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen premium-gradient">
      <header className="premium-card border-b">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            </div>
            <Button onClick={handleCreateNew} className="btn-blue">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="premium-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{articles.length}</div>
              <div className="text-sm text-muted-foreground">Total Articles</div>
            </CardContent>
          </Card>
          <Card className="premium-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {articles.filter(a => a.featured).length}
              </div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </CardContent>
          </Card>
          <Card className="premium-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {new Set(articles.map(a => a.category)).size}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="premium-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {articles.filter(a => {
                  const articleDate = new Date(a.dateAdded)
                  const thirtyDaysAgo = new Date()
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                  return articleDate >= thirtyDaysAgo
                }).length}
              </div>
              <div className="text-sm text-muted-foreground">Recent (30d)</div>
            </CardContent>
          </Card>
        </div>

        {/* Articles List */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>All Articles</CardTitle>
            <CardDescription>
              Manage your senior care resources and research articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Articles Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first article to get started
                </p>
                <Button onClick={handleCreateNew} className="btn-blue">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Article
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(article.category)}
                          <Badge variant="secondary">{article.category}</Badge>
                          {article.featured && (
                            <Badge variant="default" className="bg-primary">Featured</Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{article.summary}</p>
                        <div className="text-xs text-muted-foreground">
                          Added: {new Date(article.dateAdded).toLocaleDateString()} • 
                          Citations: {article.citations.length}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(article)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Article</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete "{article.title}"? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end gap-2">
                              <DialogTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogTrigger>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(article.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default AdminPanel
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'rigger, SelectValue } from '@/components/ui/select'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useKV } from '@github/spark/hooks'


  content: string
  dateAdded: string
}
const Se
 

interface Article {
  id: string
  title: string
  category: string
  summary: string
  content: string
  citations: string[]

const SeniorResourcesPage: React.FC<NavigationProps> = ({ onNavigate, language, t }) => {
  const [articles, setArticles] = useKV<Article[]>('senior-resources-articles', [])
  const [showAdmin, setShowAdmin] = useState(false)
1. **Group Activities**: Organize regular social gatherings, game nights,
3. **Technology Training**: Help seniors use video calls and socia
5. **Peer Supp
## Evidence-Based
          citati
            'htt
          dateAdde
        },
    
          category: 'Therapeutic Activities',

Laughter triggers the release of endorphins, reduce
### Clinical Benefi
- **Physical Health**: Improved 
- **Stress Reduction**: Lower cortisol and
### Imple
2. **Humor Therapy Sessions**: Guide
- **Physical Health**: Improved 
- **Stress Reduction**: Lower cortisol and
### Imple
2. **Humor Therapy Sessions**: Guide
4. **Storytelling**: Encourage sharing of funny memories and experiences

Studies from the University of Maryland show that laughter increases blood flow and may protect against heart disease.`,
            'Gelkopf, M. (2011). The use of humor

          featured: true

          title: 
          summary: 'Music therapy helps seniors with dementia recall memories and imp


- **Memory Recall**: Music can trigger memories even in


1. **Personalized Playlists**: Use music from seniors' youth (ages 15-25)
3. **Instrument Play**: Simple percussion and melodic instruments
5. **Live Performances**: Invite local musicians for interactive concerts
### Best Practices:
- Sessions should be 30-45 minutes for optimal engagement

          category: 'Therapeutic Activities',
          ],
Pet therapy has demonstrated remarkable benefi
### Therapeutic Benefits
- **Blood 
        {
### Program Types:
2. **Therapy Visits**: Trained dogs and handlers for regula
4. **Pet Care Activities**: Grooming, feeding

- Ensure all animals are properly trained and certifie

          citations: [

          dateAdded: n
        }
      
    }


    ? articles 

    if (newArticle.title && newArticle.content) {
        id: Date.now().toString(),
        category: newArticle.category || 'General',
        content: newArticle.content || '',

      }
      setArticles(currentArticles => [...currentArticles, article])
          citations: [
        summary: '',
        citations: [],
          ],
  }
  const handleDeleteArti
        },
        {
    if (article) {
      setEditingId(id)
  }
  const handleUpdateArticle = () => {
      setArticles(currentArticles => 

            : article

      setNewArticle({
        category: '',
        content: '',
        featured: false
    }

    <div className="min-h-s
        {/* Header */}
          <div className="flex justify-center mb-6">
          </div>
            Senior Happiness & Engagement Resources
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">


        <div className="flex flex-wrap gap-4 mb-8 justify-be
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2"
          citations: [
          </Button>
            'https://www.alz.org/professionals/health-systems-clinicians/dementia-care-practice-recommendations'
          ],
          >
          featured: false
        },
        {
          <div className="flex
              <Button
                onClick={() => setSelectedCat
                className="capitalize"
                {category === 'all' ? 'All Categories' 

        </div>

          <Card className
              <CardTitle className="flex items-center gap-2">
                {editingId ? 'Edit Article' : 'Add New Resou
              <CardDescription>
              </CardDescription>

                <d
                  <Input
                    onChange={(e) => setNewArticle(prev => ({ ...prev
                  />
                <div>
                  <Select 

                    <SelectTri
                    </SelectTrigger>
                      {categories.filter(cat => 
                          {category}
                      ))}
          citations: [
              </div>
              <div>
          ],
                  onChange={(e) => setNewArtic
          featured: false
        }
      ]
      
      setArticles(defaultArticles)
    }
              </div

                  onClick={editingId ? handleUpdateArticle : handleAddArticle}

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory)

                        summary: '
                        citations: [],
                      })
                    variant="outli
                    Cancel Edit
                )}
            </CardContent>
        )}
        {/* Featured Articles */}
          <div className="mb-12">
              <Sparkles size={32} className="t
       
      
                  <CardHeader>
                     
                  
                     
                    
                    
                      
                       
        
    }
  }

                        </div>
                    </div>
  }

                        __html: article.conte
                          .replace(/###\s(.*)/g, '<
                  
                    </div>
                      
     
   

                                  tar
                                  className="text-blue-600 hov
                                  {ci
                              ) : (
                              )}
                          ))}
                     
         
       
          </div>


        <div>
            <BookOpe
            <span cl
            </span>
          
        
     
   

  return (
    <div className="min-h-screen premium-gradient">
                        <Button
                      
                        >
                        </Button>
                          size
                
                          <Trash2 size={16} />
                      </div>
               
                <CardContent>
                  <div className="prose max-w-none text-sm">
              
              

                    }} />
                  </div>
                  
                        {article.citations.leng
                    </div>
                </CardContent>
           
        </div>
        {/* Call to Acti
          <div clas
          
              Use
            <Button 
              className="btn-silver text-lg px-8 py-4"
              Sign Up to Connect Today
          <
      </div>
  )












              >

              </Button>
            ))}












































              









              












































































                    </div>











































































































            ))}










            </p>









    </div>

}

export default SeniorResourcesPage
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart, Users, VideoCamera, Phone } from '@phosphor-icons/react'
import Logo from '@/components/Logo'
import type { TranslationContent } from '@/lib/translations'

// Import the new uploaded images
import st1 from '@/assets/images/st1.png.jpeg'
import st2 from '@/assets/images/st2.png_(1).jpeg'
import st3 from '@/assets/images/st3.png_(2).jpeg'
import st4 from '@/assets/images/st4.png_(3).jpeg'
import st5 from '@/assets/images/st5.png_(4).jpeg'
import st6 from '@/assets/images/st6.png_(5).jpeg'
import st7 from '@/assets/images/st7.png_(6).jpeg'
import st8 from '@/assets/images/st8.png_(7).jpeg'
import st9 from '@/assets/images/st9.png_(8).jpeg'

interface GalleryPageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources') => void
  language: 'en' | 'es' | 'zh'
  t: TranslationContent
}

const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, language, t }) => {
  const galleryImages = [
    {
      id: 1,
      src: st1,
      title: t.galleryImageCaptions[0],
      description: t.galleryImageCaptions[0],
      category: language === 'es' ? 'Videollamada' : language === 'zh' ? '视频通话' : 'Video Call'
    },
    {
      id: 2,
      src: st2,
      title: t.galleryImageCaptions[1],
      description: t.galleryImageCaptions[1],
      category: language === 'es' ? 'Conexión Familiar' : language === 'zh' ? '家庭连接' : 'Family Connection'
    },
    {
      id: 3,
      src: st3,
      title: t.galleryImageCaptions[2],
      description: t.galleryImageCaptions[2],
      category: language === 'es' ? 'Llamadas Regulares' : language === 'zh' ? '定期通话' : 'Regular Calls'
    },
    {
      id: 4,
      src: st4,
      title: t.galleryImageCaptions[3],
      description: t.galleryImageCaptions[3],
      category: language === 'es' ? 'Configuración Fácil' : language === 'zh' ? '简易设置' : 'Easy Setup'
    },
    {
      id: 5,
      src: st5,
      title: t.galleryImageCaptions[4],
      description: t.galleryImageCaptions[4],
      category: language === 'es' ? 'Momentos Felices' : language === 'zh' ? '快乐时光' : 'Happy Moments'
    },
    {
      id: 6,
      src: st6,
      title: t.galleryImageCaptions[5],
      description: t.galleryImageCaptions[5],
      category: language === 'es' ? 'Conexión' : language === 'zh' ? '连接' : 'Connection'
    },
    {
      id: 7,
      src: st7,
      title: language === 'es' ? 'Celebraciones Compartidas' : language === 'zh' ? '共同庆祝' : 'Shared Celebrations',
      description: language === 'es' ? 'Cumpleaños, fiestas y momentos especiales celebrados juntos virtualmente.' : 
                  language === 'zh' ? '生日、节日和特殊时刻通过虚拟方式一起庆祝。' :
                  'Birthdays, holidays, and special moments celebrated together virtually.',
      category: language === 'es' ? 'Celebraciones' : language === 'zh' ? '庆祝活动' : 'Celebrations'
    },
    {
      id: 8,
      src: st8,
      title: language === 'es' ? 'Chequeos Diarios' : language === 'zh' ? '日常关怀' : 'Daily Check-ins',
      description: language === 'es' ? 'Llamadas regulares que brindan comodidad, compañía y tranquilidad.' :
                  language === 'zh' ? '定期通话提供舒适、陪伴和内心平静。' :
                  'Regular calls that provide comfort, companionship, and peace of mind.',
      category: language === 'es' ? 'Apoyo Diario' : language === 'zh' ? '日常支持' : 'Daily Support'
    },
    {
      id: 9,
      src: st9,
      title: language === 'es' ? 'Vínculos Intergeneracionales' : language === 'zh' ? '跨代联系' : 'Intergenerational Bonds',
      description: language === 'es' ? 'Abuelos compartiendo sabiduría e historias con la próxima generación.' :
                  language === 'zh' ? '祖父母与下一代分享智慧和故事。' :
                  'Grandparents sharing wisdom and stories with the next generation.',
      category: language === 'es' ? 'Compartiendo Legado' : language === 'zh' ? '传承分享' : 'Legacy Sharing'
    }
  ]

  const getCategoryIcon = (category: string) => {
    const videoCallCategories = ['Video Call', 'Videollamada', '视频通话']
    const familyCategories = ['Family Connection', 'Conexión Familiar', '家庭连接']
    const happyCategories = ['Happy Moments', 'Momentos Felices', '快乐时光']
    
    if (videoCallCategories.includes(category)) {
      return <VideoCamera size={20} className="heart-icon" />
    } else if (familyCategories.includes(category)) {
      return <Users size={20} className="heart-icon" />
    } else if (happyCategories.includes(category)) {
      return <Heart size={20} className="heart-icon" />
    } else {
      return <Phone size={20} className="heart-icon" />
    }
  }

  return (
    <div className="min-h-screen premium-gradient">
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('home')}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300"
            aria-label={language === 'es' ? 'Volver al Inicio' : language === 'zh' ? '返回首页' : 'Back to Home'}
          >
            <ArrowLeft size={20} className="mr-2" />
            {language === 'es' ? 'Volver al Inicio' : language === 'zh' ? '返回首页' : 'Back to Home'}
          </Button>
        </div>
        <Logo size="md" />
      </header>

      <main className="container mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h1 
            className="text-5xl font-bold mb-6"
            style={{
              background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: 'var(--text-shadow-silver)'
            }}
          >
            {t.galleryTitle}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {language === 'es' ? 
              'Familias reales, conexiones reales, sonrisas reales. Vea cómo SilverCare Tech transforma las vidas de los adultos mayores y sus seres queridos todos los días.' :
             language === 'zh' ?
              '真实的家庭，真实的连接，真实的笑容。看看 SilverCare Tech 如何每天改变老年人及其亲人的生活。' :
              'Real families, real connections, real smiles. See how SilverCare Tech transforms the lives of seniors and their loved ones every single day.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {galleryImages.map((image) => (
            <Card key={image.id} className="premium-card group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="aspect-square rounded-lg mb-4 overflow-hidden relative group-hover:shadow-lg transition-all duration-300">
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 
                      className="font-semibold text-lg"
                      style={{
                        background: 'linear-gradient(145deg, #495057 0%, #6c757d 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent'
                      }}
                    >
                      {image.title}
                    </h3>
                    {getCategoryIcon(image.category)}
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {image.description}
                  </p>
                  
                  <div className="pt-2">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium metallic-blue text-white"
                    >
                      {image.category}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="premium-card rounded-2xl p-12 text-center">
          <h2 
            className="text-4xl font-bold mb-6"
            style={{
              background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: 'var(--text-shadow-silver)'
            }}
          >
            {language === 'es' ? 'Su Historia Podría Ser la Próxima' : 
             language === 'zh' ? '您的故事可能是下一个' : 
             'Your Story Could Be Next'}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'es' ? 
              'Cada conexión comienza con una sola conversación. Permítanos ayudarle a crear estos momentos preciosos con su ser querido. No se requiere experiencia técnica: nosotros nos encargamos de todo para que pueda concentrarse en lo que más importa: estar juntos.' :
             language === 'zh' ?
              '每个连接都始于一次对话。让我们帮助您与亲人创造这些珍贵的时刻。无需技术经验——我们处理一切，让您专注于最重要的事情：在一起。' :
              'Every connection starts with a single conversation. Let us help you create these precious moments with your loved one. No technical experience required—we handle everything so you can focus on what matters most: being together.'}
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 metallic-silver rounded-full flex items-center justify-center mx-auto mb-4">
                <span 
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(145deg, #495057 0%, #6c757d 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  1
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {language === 'es' ? 'Registro Fácil' : language === 'zh' ? '简易注册' : 'Easy Registration'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'es' ? 'Formulario simple, no se necesita conocimiento técnico' : 
                 language === 'zh' ? '简单表格，无需技术知识' : 
                 'Simple form, no tech knowledge needed'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 metallic-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent-foreground">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {language === 'es' ? 'Configuramos Todo' : language === 'zh' ? '我们设置一切' : 'We Setup Everything'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'es' ? 'Instalación profesional y capacitación' : 
                 language === 'zh' ? '专业安装和培训' : 
                 'Professional installation and training'}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 metallic-silver rounded-full flex items-center justify-center mx-auto mb-4">
                <span 
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(145deg, #495057 0%, #6c757d 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  3
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {language === 'es' ? 'Empezar a Conectar' : language === 'zh' ? '开始连接' : 'Start Connecting'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'es' ? 'Alegría inmediata y vínculos duraderos' : 
                 language === 'zh' ? '即时快乐和持久纽带' : 
                 'Immediate joy and lasting bonds'}
              </p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="btn-blue text-lg px-8 py-6 font-semibold"
            onClick={() => onNavigate('register')}
            aria-label={t.joinJoyCTA}
          >
            <Heart size={20} className="mr-2" />
            {t.joinJoyCTA}
          </Button>
        </section>
      </main>
    </div>
  )
}

export default GalleryPage
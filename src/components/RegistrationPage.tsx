import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ArrowLeft, Check, Calendar, User, MapPin, Mail, Clock, CalendarBlank } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useAppKV } from '@/hooks/useAppKV'
import Logo from '@/components/Logo'
import type { TranslationContent } from '@/lib/translations'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface RegistrationPageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources') => void
  language: 'en' | 'es' | 'zh'
  t: TranslationContent
}

interface RegistrationData {
  familyMemberName: string
  lovedOneName: string
  lovedOneLocation: string
  contactEmail: string
  preferredDate: Date | undefined
  preferredTime: string
  additionalNotes: string
}

interface RegistrationErrors {
  familyMemberName?: string
  lovedOneName?: string
  lovedOneLocation?: string
  contactEmail?: string
  preferredDate?: string
  preferredTime?: string
  additionalNotes?: string
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onNavigate, language, t }) => {
  const [registrations, setRegistrations] = useAppKV<RegistrationData[]>('registrations', [])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<RegistrationData>({
    familyMemberName: '',
    lovedOneName: '',
    lovedOneLocation: '',
    contactEmail: '',
    preferredDate: undefined,
    preferredTime: '',
    additionalNotes: ''
  })

  const [errors, setErrors] = useState<RegistrationErrors>({})

  const validateForm = (): boolean => {
    const newErrors: RegistrationErrors = {}

    if (!formData.familyMemberName.trim()) {
      newErrors.familyMemberName = t.requiredField
    }

    if (!formData.lovedOneName.trim()) {
      newErrors.lovedOneName = t.requiredField
    }

    if (!formData.lovedOneLocation.trim()) {
      newErrors.lovedOneLocation = t.requiredField
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = t.requiredField
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = t.invalidEmail
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = t.requiredField
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = t.requiredField
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error(language === 'es' ? 'Por favor complete todos los campos requeridos correctamente' :
                  language === 'zh' ? '请正确填写所有必填字段' :
                  'Please fill in all required fields correctly')
      return
    }

    setRegistrations(prev => [...prev, { ...formData }])
    setIsSubmitted(true)
    toast.success(t.confirmationMessage)
  }

  const handleInputChange = (field: keyof RegistrationData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof RegistrationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // Generate time slots between 7 AM and 6 PM in 30-minute increments (EST)
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 7; hour <= 18; hour++) {
      const formatHour = hour === 12 ? 12 : hour > 12 ? hour - 12 : hour
      const ampm = hour >= 12 ? 'PM' : 'AM'
      
      // Add the hour slot
      slots.push(`${formatHour}:00 ${ampm} EST`)
      
      // Add the half-hour slot (except for 6:30 PM which would be after 6 PM)
      if (hour < 18) {
        slots.push(`${formatHour}:30 ${ampm} EST`)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  if (isSubmitted) {
    return (
      <div className="min-h-screen premium-gradient flex items-center justify-center p-6">
        <Card className="premium-card max-w-2xl w-full">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 metallic-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-accent-foreground heart-icon" />
            </div>
            <h2 
              className="text-3xl font-bold mb-4"
              style={{
                background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: 'var(--text-shadow-silver)'
              }}
            >
              {language === 'es' ? '¡Gracias!' : language === 'zh' ? '谢谢！' : 'Thank You!'}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {language === 'es' ? 
                `Hemos recibido su registro para ${formData.lovedOneName}. Nuestro equipo se pondrá en contacto con usted en ${formData.contactEmail} dentro de 24 horas para confirmar su horario de conexión${formData.preferredDate ? ` el ${format(formData.preferredDate, "PPP")} a las ${formData.preferredTime}` : ''} y coordinar la configuración técnica.` :
               language === 'zh' ?
                `我们已收到您为 ${formData.lovedOneName} 的注册。我们的团队将在24小时内通过 ${formData.contactEmail} 与您联系，确认您的连接时间${formData.preferredDate ? `在 ${format(formData.preferredDate, "PPP")} ${formData.preferredTime}` : ''}并协调技术设置。` :
                `We've received your registration for ${formData.lovedOneName}. Our team will contact you at ${formData.contactEmail} within 24 hours to confirm your connection time${formData.preferredDate ? ` on ${format(formData.preferredDate, "PPP")} at ${formData.preferredTime}` : ''} and coordinate the technical setup.`}
            </p>
            <p className="text-muted-foreground mb-8">
              {language === 'es' ? 
                'Recuerde, nosotros nos encargamos de toda la tecnología: ¡su ser querido solo necesita traer su hermosa sonrisa!' :
               language === 'zh' ?
                '请记住，我们处理所有技术问题——您的亲人只需要带来他们美丽的笑容！' :
                'Remember, we handle all the technology—your loved one just needs to bring their beautiful smile!'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('home')} variant="outline" size="lg" className="border-2 hover:bg-secondary/50">
                <ArrowLeft size={20} className="mr-2" />
                {language === 'es' ? 'Volver al Inicio' : language === 'zh' ? '返回首页' : 'Back to Home'}
              </Button>
              <Button onClick={() => onNavigate('gallery')} size="lg" className="btn-blue">
                {language === 'es' ? 'Ver Momentos Felices' : language === 'zh' ? '查看快乐时光' : 'See Happy Moments'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
          >
            <ArrowLeft size={20} className="mr-2" />
            {language === 'es' ? 'Volver al Inicio' : language === 'zh' ? '返回首页' : 'Back to Home'}
          </Button>
        </div>
        <Logo size="md" />
      </header>

      <main className="container mx-auto px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{
                background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: 'var(--text-shadow-silver)'
              }}
            >
              {t.registerTitle}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.instructions}
            </p>
          </div>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle 
                className="text-2xl"
                style={{
                  background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: 'var(--text-shadow-silver)'
                }}
              >
                {language === 'es' ? 'Detalles de Conexión' : 
                 language === 'zh' ? '连接详情' : 
                 'Connection Details'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="family-member-name" className="text-base font-medium flex items-center gap-2">
                      <User size={18} className="heart-icon" />
                      {t.familyMemberName} *
                    </Label>
                    <Input
                      id="family-member-name"
                      placeholder={language === 'es' ? 'Ingrese su nombre completo' : 
                                  language === 'zh' ? '输入您的全名' : 
                                  'Enter your full name'}
                      value={formData.familyMemberName}
                      onChange={(e) => handleInputChange('familyMemberName', e.target.value)}
                      className={`text-lg py-3 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.familyMemberName ? 'border-destructive' : ''}`}
                      aria-describedby={errors.familyMemberName ? 'family-member-error' : undefined}
                    />
                    {errors.familyMemberName && (
                      <p id="family-member-error" className="text-destructive text-sm" role="alert">{errors.familyMemberName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loved-one-name" className="text-base font-medium flex items-center gap-2">
                      <User size={18} className="heart-icon" />
                      {t.lovedOneName} *
                    </Label>
                    <Input
                      id="loved-one-name"
                      placeholder={language === 'es' ? 'Ingrese su nombre completo' : 
                                  language === 'zh' ? '输入他们的全名' : 
                                  'Enter their full name'}
                      value={formData.lovedOneName}
                      onChange={(e) => handleInputChange('lovedOneName', e.target.value)}
                      className={`text-lg py-3 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.lovedOneName ? 'border-destructive' : ''}`}
                      aria-describedby={errors.lovedOneName ? 'loved-one-name-error' : undefined}
                    />
                    {errors.lovedOneName && (
                      <p id="loved-one-name-error" className="text-destructive text-sm" role="alert">{errors.lovedOneName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loved-one-location" className="text-base font-medium flex items-center gap-2">
                    <MapPin size={18} className="heart-icon" />
                    {t.lovedOneLocation} *
                  </Label>
                  <Textarea
                    id="loved-one-location"
                    placeholder={language === 'es' ? 'Ingrese el nombre y dirección del centro de cuidado, o dirección de casa' : 
                                language === 'zh' ? '输入护理机构名称和地址，或家庭住址' : 
                                'Enter the care facility name and address, or home address'}
                    value={formData.lovedOneLocation}
                    onChange={(e) => handleInputChange('lovedOneLocation', e.target.value)}
                    className={`text-lg min-h-[80px] transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.lovedOneLocation ? 'border-destructive' : ''}`}
                    aria-describedby={errors.lovedOneLocation ? 'location-error' : undefined}
                  />
                  {errors.lovedOneLocation && (
                    <p id="location-error" className="text-destructive text-sm" role="alert">{errors.lovedOneLocation}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-base font-medium flex items-center gap-2">
                      <Mail size={18} className="heart-icon" />
                      {t.contactEmail} *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder={language === 'es' ? 'su.email@ejemplo.com' : 
                                  language === 'zh' ? '您的邮箱@example.com' : 
                                  'your.email@example.com'}
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className={`text-lg py-3 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.contactEmail ? 'border-destructive' : ''}`}
                      aria-describedby={errors.contactEmail ? 'email-error' : undefined}
                    />
                    {errors.contactEmail && (
                      <p id="email-error" className="text-destructive text-sm" role="alert">{errors.contactEmail}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <CalendarBlank size={18} className="heart-icon" />
                      {language === 'es' ? 'Fecha Preferida' : 
                       language === 'zh' ? '首选日期' : 
                       'Preferred Date'} *
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal text-lg py-3 transition-all duration-300 focus:ring-2 focus:ring-primary/20",
                            !formData.preferredDate && "text-muted-foreground",
                            errors.preferredDate && "border-destructive"
                          )}
                        >
                          <CalendarBlank className="mr-2 h-4 w-4 heart-icon" />
                          {formData.preferredDate ? (
                            format(formData.preferredDate, "PPP")
                          ) : (
                            <span>{language === 'es' ? 'Seleccione una fecha' : 
                                   language === 'zh' ? '选择日期' : 
                                   'Pick a date'}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 premium-card" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.preferredDate}
                          onSelect={(date) => handleInputChange('preferredDate', date)}
                          disabled={(date) => {
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            return date < today
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.preferredDate && (
                      <p className="text-destructive text-sm" role="alert">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Clock size={18} className="heart-icon" />
                      {language === 'es' ? 'Hora Preferida (EST)' : 
                       language === 'zh' ? '首选时间 (EST)' : 
                       'Preferred Time (EST)'} *
                    </Label>
                    <Select 
                      value={formData.preferredTime} 
                      onValueChange={(value) => handleInputChange('preferredTime', value)}
                    >
                      <SelectTrigger className={`text-lg py-3 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.preferredTime ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder={language === 'es' ? 'Seleccione un horario' : 
                                                  language === 'zh' ? '选择时间段' : 
                                                  'Select a time slot'} />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {timeSlots.map((timeSlot, index) => (
                          <SelectItem key={index} value={timeSlot}>
                            {timeSlot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.preferredTime && (
                      <p className="text-destructive text-sm" role="alert">{errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-notes" className="text-base font-medium">
                    {language === 'es' ? 'Notas Adicionales (Opcional)' : 
                     language === 'zh' ? '附加备注（可选）' : 
                     'Additional Notes (Optional)'}
                  </Label>
                  <Textarea
                    id="additional-notes"
                    placeholder={language === 'es' ? 'Cualquier solicitud especial, necesidades de accesibilidad, o días preferidos de la semana?' : 
                                language === 'zh' ? '任何特殊要求、无障碍需求或首选的星期几？' : 
                                'Any special requests, accessibility needs, or preferred days of the week?'}
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    className="text-lg min-h-[80px] transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-lg py-6 btn-blue font-semibold"
                    aria-label={t.submitButton}
                  >
                    <Calendar size={20} className="mr-2" />
                    {t.submitButton}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default RegistrationPage
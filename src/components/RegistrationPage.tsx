import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Check, Calendar, User, MapPin, Mail, Clock } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'
import Logo from '@/components/Logo'

interface RegistrationPageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources') => void
}

interface RegistrationData {
  familyMemberName: string
  lovedOneName: string
  lovedOneLocation: string
  contactEmail: string
  preferredTime: string
  additionalNotes: string
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onNavigate }) => {
  const [registrations, setRegistrations] = useKV<RegistrationData[]>('registrations', [])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<RegistrationData>({
    familyMemberName: '',
    lovedOneName: '',
    lovedOneLocation: '',
    contactEmail: '',
    preferredTime: '',
    additionalNotes: ''
  })

  const [errors, setErrors] = useState<Partial<RegistrationData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<RegistrationData> = {}

    if (!formData.familyMemberName.trim()) {
      newErrors.familyMemberName = 'Your name is required'
    }

    if (!formData.lovedOneName.trim()) {
      newErrors.lovedOneName = 'Your loved one\'s name is required'
    }

    if (!formData.lovedOneLocation.trim()) {
      newErrors.lovedOneLocation = 'Location is required'
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address'
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred time'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly')
      return
    }

    setRegistrations(prev => [...prev, { ...formData }])
    setIsSubmitted(true)
    toast.success('Registration submitted successfully!')
  }

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

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
              Thank You!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              We've received your registration for <span className="font-semibold text-foreground">{formData.lovedOneName}</span>. 
              Our team will contact you at <span className="font-semibold text-foreground">{formData.contactEmail}</span> within 24 hours 
              to confirm your connection time and coordinate the technical setup.
            </p>
            <p className="text-muted-foreground mb-8">
              Remember, we handle all the technology—your loved one just needs to bring their beautiful smile!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('home')} variant="outline" size="lg" className="border-2 hover:bg-secondary/50">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Button>
              <Button onClick={() => onNavigate('gallery')} size="lg" className="btn-blue">
                See Happy Moments
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
            Back to Home
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
              Register to Connect
            </h1>
            <p className="text-lg text-muted-foreground">
              We handle all tech setup. Just provide details and pick a time that works best for your family.
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
                Connection Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="family-member-name" className="text-base font-medium flex items-center gap-2">
                      <User size={18} className="heart-icon" />
                      Your Name *
                    </Label>
                    <Input
                      id="family-member-name"
                      placeholder="Enter your full name"
                      value={formData.familyMemberName}
                      onChange={(e) => handleInputChange('familyMemberName', e.target.value)}
                      className={`text-lg py-3 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.familyMemberName ? 'border-destructive' : ''}`}
                    />
                    {errors.familyMemberName && (
                      <p className="text-destructive text-sm">{errors.familyMemberName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loved-one-name" className="text-base font-medium flex items-center gap-2">
                      <User size={18} className="heart-icon" />
                      Your Loved One's Name *
                    </Label>
                    <Input
                      id="loved-one-name"
                      placeholder="Enter their full name"
                      value={formData.lovedOneName}
                      onChange={(e) => handleInputChange('lovedOneName', e.target.value)}
                      className={`text-lg py-3 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.lovedOneName ? 'border-destructive' : ''}`}
                    />
                    {errors.lovedOneName && (
                      <p className="text-destructive text-sm">{errors.lovedOneName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loved-one-location" className="text-base font-medium flex items-center gap-2">
                    <MapPin size={18} className="heart-icon" />
                    Location (Care Facility or Home Address) *
                  </Label>
                  <Textarea
                    id="loved-one-location"
                    placeholder="Enter the care facility name and address, or home address"
                    value={formData.lovedOneLocation}
                    onChange={(e) => handleInputChange('lovedOneLocation', e.target.value)}
                    className={`text-lg min-h-[80px] transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.lovedOneLocation ? 'border-destructive' : ''}`}
                  />
                  {errors.lovedOneLocation && (
                    <p className="text-destructive text-sm">{errors.lovedOneLocation}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-base font-medium flex items-center gap-2">
                      <Mail size={18} className="heart-icon" />
                      Your Email Address *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className={`text-lg py-3 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.contactEmail ? 'border-destructive' : ''}`}
                    />
                    {errors.contactEmail && (
                      <p className="text-destructive text-sm">{errors.contactEmail}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Clock size={18} className="heart-icon" />
                      Preferred Connection Time (EST) *
                    </Label>
                    <Select 
                      value={formData.preferredTime} 
                      onValueChange={(value) => handleInputChange('preferredTime', value)}
                    >
                      <SelectTrigger className={`text-lg py-3 transition-all duration-300 focus:ring-2 focus:ring-primary/20 ${errors.preferredTime ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        <SelectItem value="7:00 AM">7:00 AM EST</SelectItem>
                        <SelectItem value="7:30 AM">7:30 AM EST</SelectItem>
                        <SelectItem value="8:00 AM">8:00 AM EST</SelectItem>
                        <SelectItem value="8:30 AM">8:30 AM EST</SelectItem>
                        <SelectItem value="9:00 AM">9:00 AM EST</SelectItem>
                        <SelectItem value="9:30 AM">9:30 AM EST</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM EST</SelectItem>
                        <SelectItem value="10:30 AM">10:30 AM EST</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM EST</SelectItem>
                        <SelectItem value="11:30 AM">11:30 AM EST</SelectItem>
                        <SelectItem value="12:00 PM">12:00 PM EST</SelectItem>
                        <SelectItem value="12:30 PM">12:30 PM EST</SelectItem>
                        <SelectItem value="1:00 PM">1:00 PM EST</SelectItem>
                        <SelectItem value="1:30 PM">1:30 PM EST</SelectItem>
                        <SelectItem value="2:00 PM">2:00 PM EST</SelectItem>
                        <SelectItem value="2:30 PM">2:30 PM EST</SelectItem>
                        <SelectItem value="3:00 PM">3:00 PM EST</SelectItem>
                        <SelectItem value="3:30 PM">3:30 PM EST</SelectItem>
                        <SelectItem value="4:00 PM">4:00 PM EST</SelectItem>
                        <SelectItem value="4:30 PM">4:30 PM EST</SelectItem>
                        <SelectItem value="5:00 PM">5:00 PM EST</SelectItem>
                        <SelectItem value="5:30 PM">5:30 PM EST</SelectItem>
                        <SelectItem value="6:00 PM">6:00 PM EST</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.preferredTime && (
                      <p className="text-destructive text-sm">{errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-notes" className="text-base font-medium">
                    Additional Notes (Optional)
                  </Label>
                  <Textarea
                    id="additional-notes"
                    placeholder="Any special requests, accessibility needs, or preferred days of the week?"
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
                  >
                    <Calendar size={20} className="mr-2" />
                    Submit Registration
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
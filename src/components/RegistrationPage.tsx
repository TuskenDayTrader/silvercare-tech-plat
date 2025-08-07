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
  onNavigate: (page: string) => void
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
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-accent" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">Thank You!</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We've received your registration for <span className="font-semibold text-foreground">{formData.lovedOneName}</span>. 
              Our team will contact you at <span className="font-semibold text-foreground">{formData.contactEmail}</span> within 24 hours 
              to confirm your connection time and coordinate the technical setup.
            </p>
            <p className="text-muted-foreground mb-8">
              Remember, we handle all the technology—your loved one just needs to bring their beautiful smile!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('home')} variant="outline" size="lg">
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </Button>
              <Button onClick={() => onNavigate('gallery')} size="lg">
                See Happy Moments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onNavigate('home')}
            className="text-muted-foreground hover:text-foreground"
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
            <h1 className="text-4xl font-bold text-primary mb-4">Register to Connect</h1>
            <p className="text-lg text-muted-foreground">
              We handle all tech setup. Just provide details and pick a time that works best for your family.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Connection Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="family-member-name" className="text-base font-medium flex items-center gap-2">
                      <User size={18} />
                      Your Name *
                    </Label>
                    <Input
                      id="family-member-name"
                      placeholder="Enter your full name"
                      value={formData.familyMemberName}
                      onChange={(e) => handleInputChange('familyMemberName', e.target.value)}
                      className={`text-lg py-3 ${errors.familyMemberName ? 'border-destructive' : ''}`}
                    />
                    {errors.familyMemberName && (
                      <p className="text-destructive text-sm">{errors.familyMemberName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loved-one-name" className="text-base font-medium flex items-center gap-2">
                      <User size={18} />
                      Your Loved One's Name *
                    </Label>
                    <Input
                      id="loved-one-name"
                      placeholder="Enter their full name"
                      value={formData.lovedOneName}
                      onChange={(e) => handleInputChange('lovedOneName', e.target.value)}
                      className={`text-lg py-3 ${errors.lovedOneName ? 'border-destructive' : ''}`}
                    />
                    {errors.lovedOneName && (
                      <p className="text-destructive text-sm">{errors.lovedOneName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loved-one-location" className="text-base font-medium flex items-center gap-2">
                    <MapPin size={18} />
                    Location (Care Facility or Home Address) *
                  </Label>
                  <Textarea
                    id="loved-one-location"
                    placeholder="Enter the care facility name and address, or home address"
                    value={formData.lovedOneLocation}
                    onChange={(e) => handleInputChange('lovedOneLocation', e.target.value)}
                    className={`text-lg min-h-[80px] ${errors.lovedOneLocation ? 'border-destructive' : ''}`}
                  />
                  {errors.lovedOneLocation && (
                    <p className="text-destructive text-sm">{errors.lovedOneLocation}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-base font-medium flex items-center gap-2">
                      <Mail size={18} />
                      Your Email Address *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                      className={`text-lg py-3 ${errors.contactEmail ? 'border-destructive' : ''}`}
                    />
                    {errors.contactEmail && (
                      <p className="text-destructive text-sm">{errors.contactEmail}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Clock size={18} />
                      Preferred Connection Time *
                    </Label>
                    <Select 
                      value={formData.preferredTime} 
                      onValueChange={(value) => handleInputChange('preferredTime', value)}
                    >
                      <SelectTrigger className={`text-lg py-3 ${errors.preferredTime ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
                        <SelectItem value="evening">Evening (5:00 PM - 8:00 PM)</SelectItem>
                        <SelectItem value="flexible">Flexible - Any time works</SelectItem>
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
                    className="text-lg min-h-[80px]"
                  />
                </div>

                <div className="pt-6">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
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
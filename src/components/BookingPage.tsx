import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calendar, Clock, User, MapPin, Check, ChevronLeft, ChevronRight } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { useKV } from '@github/spark/hooks'
import { emailService } from '@/lib/emailService'
import Logo from '@/components/Logo'
import type { TranslationContent } from '@/lib/translations'

interface BookingPageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources' | 'auth' | 'admin-dashboard') => void
  language: 'en' | 'es' | 'zh'
  t: TranslationContent
}

interface Booking {
  id: string
  userId: string
  userEmail: string
  userName: string
  lovedOneName: string
  lovedOneLocation: string
  date: string
  time: string
  additionalNotes: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

interface AdminSettings {
  workingHours: {
    start: string
    end: string
  }
  timeSlotDuration: number // in minutes
  maxAdvanceBookingDays: number
  adminEmail: string
}

const BookingPage: React.FC<BookingPageProps> = ({ onNavigate, language, t }) => {
  const { user, isAuthenticated } = useAuth()
  const [bookings, setBookings] = useKV<Booking[]>('bookings', [])
  const [adminSettings, setAdminSettings] = useKV<AdminSettings>('adminSettings', {
    workingHours: { start: '07:00', end: '18:00' },
    timeSlotDuration: 30,
    maxAdvanceBookingDays: 30,
    adminEmail: 'admin@silvercaretech.com'
  })

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [step, setStep] = useState<'calendar' | 'details' | 'confirmation'>('calendar')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [bookingDetails, setBookingDetails] = useState({
    lovedOneName: '',
    lovedOneLocation: '',
    additionalNotes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen premium-gradient flex items-center justify-center p-6">
        <Card className="premium-card max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'es' ? 'Se Requiere Autenticación' : 
               language === 'zh' ? '需要身份验证' : 
               'Authentication Required'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'es' ? 'Debe iniciar sesión para acceder a la programación de citas.' : 
               language === 'zh' ? '您需要登录才能访问预约安排。' : 
               'You need to sign in to access appointment scheduling.'}
            </p>
            <Button onClick={() => onNavigate('auth')} className="btn-blue">
              {language === 'es' ? 'Ir a Iniciar Sesión' : 
               language === 'zh' ? '去登录' : 
               'Go to Sign In'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Generate available time slots for selected date
  const generateTimeSlots = (date: Date) => {
    const slots: string[] = []
    const startTime = new Date(`${date.toDateString()} ${adminSettings.workingHours.start}`)
    const endTime = new Date(`${date.toDateString()} ${adminSettings.workingHours.end}`)
    
    const current = new Date(startTime)
    while (current < endTime) {
      const timeString = current.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: 'numeric', 
        minute: '2-digit' 
      })
      slots.push(timeString)
      current.setMinutes(current.getMinutes() + adminSettings.timeSlotDuration)
    }
    
    return slots
  }

  // Check if a time slot is available
  const isTimeSlotAvailable = (date: Date, time: string) => {
    const dateString = date.toISOString().split('T')[0]
    return !bookings.some(booking => 
      booking.date === dateString && 
      booking.time === time && 
      booking.status !== 'cancelled'
    )
  }

  // Check if date is selectable (not in past, within advance booking limit)
  const isDateSelectable = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const maxDate = new Date(today)
    maxDate.setDate(maxDate.getDate() + adminSettings.maxAdvanceBookingDays)
    
    return date >= today && date <= maxDate
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isDateSelectable(date)) {
      setSelectedDate(date)
      setSelectedTime('')
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleNextStep = () => {
    if (step === 'calendar' && selectedDate && selectedTime) {
      setStep('details')
    } else if (step === 'details') {
      if (validateBookingDetails()) {
        setStep('confirmation')
      }
    }
  }

  const validateBookingDetails = () => {
    const newErrors: Record<string, string> = {}

    if (!bookingDetails.lovedOneName.trim()) {
      newErrors.lovedOneName = 'Loved one\'s name is required'
    }

    if (!bookingDetails.lovedOneLocation.trim()) {
      newErrors.lovedOneLocation = 'Location is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleBookingSubmit = async () => {
    if (!selectedDate || !selectedTime || !user) return

    const newBooking: Booking = {
      id: 'booking-' + Date.now(),
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      lovedOneName: bookingDetails.lovedOneName,
      lovedOneLocation: bookingDetails.lovedOneLocation,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      additionalNotes: bookingDetails.additionalNotes,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    setBookings(prev => [...prev, newBooking])
    
    // Send email notifications
    try {
      // Send notification to admin
      await emailService.sendBookingNotificationToAdmin({
        userEmail: user.email,
        userName: user.name,
        lovedOneName: bookingDetails.lovedOneName,
        lovedOneLocation: bookingDetails.lovedOneLocation,
        date: selectedDate.toLocaleDateString(),
        time: selectedTime,
        additionalNotes: bookingDetails.additionalNotes,
        adminEmail: adminSettings.adminEmail
      })

      // Send confirmation to user
      await emailService.sendBookingConfirmationToUser({
        userEmail: user.email,
        userName: user.name,
        lovedOneName: bookingDetails.lovedOneName,
        lovedOneLocation: bookingDetails.lovedOneLocation,
        date: selectedDate.toLocaleDateString(),
        time: selectedTime,
        additionalNotes: bookingDetails.additionalNotes,
        adminEmail: adminSettings.adminEmail
      })

      console.log('📧 Email notifications sent successfully')
    } catch (error) {
      console.error('Failed to send email notifications:', error)
      // Don't block the booking process if email fails
    }
    
    setIsSubmitted(true)
    toast.success('Booking submitted successfully!')
  }

  const clearErrors = (field: string) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen premium-gradient flex items-center justify-center p-6">
        <Card className="premium-card max-w-2xl w-full">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {language === 'es' ? '¡Cita Programada!' : 
               language === 'zh' ? '预约已安排！' : 
               'Appointment Scheduled!'}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {language === 'es' ? 
                `Su cita para ${bookingDetails.lovedOneName} ha sido programada para ${selectedDate?.toLocaleDateString()} a las ${selectedTime}. Recibirá una confirmación por correo electrónico pronto.` :
               language === 'zh' ?
                `您为 ${bookingDetails.lovedOneName} 安排的预约已定于 ${selectedDate?.toLocaleDateString()} ${selectedTime}。您很快会收到电子邮件确认。` :
                `Your appointment for ${bookingDetails.lovedOneName} has been scheduled for ${selectedDate?.toLocaleDateString()} at ${selectedTime}. You'll receive an email confirmation shortly.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => onNavigate('home')} variant="outline" size="lg">
                <ArrowLeft size={20} className="mr-2" />
                {language === 'es' ? 'Volver al Inicio' : 
                 language === 'zh' ? '返回首页' : 
                 'Back to Home'}
              </Button>
              <Button 
                onClick={() => {
                  setIsSubmitted(false)
                  setStep('calendar')
                  setSelectedDate(new Date())
                  setSelectedTime('')
                  setBookingDetails({ lovedOneName: '', lovedOneLocation: '', additionalNotes: '' })
                }} 
                className="btn-blue"
              >
                {language === 'es' ? 'Programar Otra' : 
                 language === 'zh' ? '安排另一个' : 
                 'Schedule Another'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const availableTimeSlots = selectedDate ? generateTimeSlots(selectedDate) : []

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              {language === 'es' ? 'Programar Conexión' : 
               language === 'zh' ? '安排连接' : 
               'Schedule Connection'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'es' ? 'Elija una fecha y hora para conectar con su ser querido' : 
               language === 'zh' ? '选择日期和时间与您的亲人联系' : 
               'Choose a date and time to connect with your loved one'}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'calendar' ? 'bg-primary text-primary-foreground' : 
                step === 'details' || step === 'confirmation' ? 'bg-primary/20 text-primary' : 
                'bg-muted text-muted-foreground'
              }`}>
                <Calendar size={16} />
              </div>
              <div className={`h-px w-12 ${
                step === 'details' || step === 'confirmation' ? 'bg-primary' : 'bg-muted'
              }`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'details' ? 'bg-primary text-primary-foreground' : 
                step === 'confirmation' ? 'bg-primary/20 text-primary' : 
                'bg-muted text-muted-foreground'
              }`}>
                <User size={16} />
              </div>
              <div className={`h-px w-12 ${
                step === 'confirmation' ? 'bg-primary' : 'bg-muted'
              }`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === 'confirmation' ? 'bg-primary text-primary-foreground' : 
                'bg-muted text-muted-foreground'
              }`}>
                <Check size={16} />
              </div>
            </div>
          </div>

          {step === 'calendar' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="text-center text-foreground">
                    {language === 'es' ? 'Seleccionar Fecha' : 
                     language === 'zh' ? '选择日期' : 
                     'Select Date'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => !isDateSelectable(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              {/* Time Slots */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="text-center text-foreground">
                    {selectedDate ? (
                      <>
                        {language === 'es' ? 'Horarios Disponibles' : 
                         language === 'zh' ? '可用时间' : 
                         'Available Times'}
                        <div className="text-sm font-normal text-muted-foreground mt-1">
                          {selectedDate.toLocaleDateString()}
                        </div>
                      </>
                    ) : (
                      language === 'es' ? 'Seleccione una fecha primero' : 
                      language === 'zh' ? '请先选择日期' : 
                      'Select a date first'
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {availableTimeSlots.map((time) => {
                        const isAvailable = isTimeSlotAvailable(selectedDate, time)
                        return (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            disabled={!isAvailable}
                            onClick={() => handleTimeSelect(time)}
                            className={`justify-center ${
                              selectedTime === time ? 'btn-blue' : ''
                            } ${!isAvailable ? 'opacity-50' : ''}`}
                          >
                            <Clock size={14} className="mr-1" />
                            {time}
                          </Button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      {language === 'es' ? 'Por favor seleccione una fecha para ver los horarios disponibles' : 
                       language === 'zh' ? '请选择日期查看可用时间' : 
                       'Please select a date to view available times'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {step === 'details' && (
            <Card className="premium-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-foreground">
                  {language === 'es' ? 'Detalles de la Cita' : 
                   language === 'zh' ? '预约详情' : 
                   'Appointment Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Selected Date & Time */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 text-foreground">
                    {language === 'es' ? 'Cita Seleccionada' : 
                     language === 'zh' ? '所选预约' : 
                     'Selected Appointment'}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      {selectedDate?.toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {selectedTime}
                    </div>
                  </div>
                </div>

                {/* Booking Details Form */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loved-one-name" className="flex items-center gap-2">
                      <User size={16} className="heart-icon" />
                      {language === 'es' ? 'Nombre del Ser Querido' : 
                       language === 'zh' ? '亲人姓名' : 
                       "Loved One's Name"} *
                    </Label>
                    <Input
                      id="loved-one-name"
                      value={bookingDetails.lovedOneName}
                      onChange={(e) => {
                        setBookingDetails(prev => ({ ...prev, lovedOneName: e.target.value }))
                        clearErrors('lovedOneName')
                      }}
                      placeholder={language === 'es' ? 'Ingrese el nombre de su ser querido' : 
                                  language === 'zh' ? '输入您亲人的姓名' : 
                                  "Enter your loved one's name"}
                      className={errors.lovedOneName ? 'border-destructive' : ''}
                    />
                    {errors.lovedOneName && (
                      <p className="text-destructive text-sm">{errors.lovedOneName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loved-one-location" className="flex items-center gap-2">
                      <MapPin size={16} className="heart-icon" />
                      {language === 'es' ? 'Ubicación' : 
                       language === 'zh' ? '位置' : 
                       'Location'} *
                    </Label>
                    <Textarea
                      id="loved-one-location"
                      value={bookingDetails.lovedOneLocation}
                      onChange={(e) => {
                        setBookingDetails(prev => ({ ...prev, lovedOneLocation: e.target.value }))
                        clearErrors('lovedOneLocation')
                      }}
                      placeholder={language === 'es' ? 'Centro de cuidado, hogar, etc.' : 
                                  language === 'zh' ? '护理中心、家庭等' : 
                                  'Care facility, home, etc.'}
                      rows={3}
                      className={errors.lovedOneLocation ? 'border-destructive' : ''}
                    />
                    {errors.lovedOneLocation && (
                      <p className="text-destructive text-sm">{errors.lovedOneLocation}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-notes">
                      {language === 'es' ? 'Notas Adicionales (Opcional)' : 
                       language === 'zh' ? '附加备注（可选）' : 
                       'Additional Notes (Optional)'}
                    </Label>
                    <Textarea
                      id="additional-notes"
                      value={bookingDetails.additionalNotes}
                      onChange={(e) => setBookingDetails(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      placeholder={language === 'es' ? 'Cualquier solicitud especial o información importante...' : 
                                  language === 'zh' ? '任何特殊要求或重要信息...' : 
                                  'Any special requests or important information...'}
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 'confirmation' && (
            <Card className="premium-card max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-foreground">
                  {language === 'es' ? 'Confirmar Cita' : 
                   language === 'zh' ? '确认预约' : 
                   'Confirm Appointment'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {language === 'es' ? 'Fecha y Hora' : 
                         language === 'zh' ? '日期和时间' : 
                         'Date & Time'}
                      </h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>{selectedDate?.toLocaleDateString()}</div>
                        <div>{selectedTime}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {language === 'es' ? 'Contacto' : 
                         language === 'zh' ? '联系人' : 
                         'Contact'}
                      </h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>{user?.name}</div>
                        <div>{user?.email}</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {language === 'es' ? 'Detalles del Ser Querido' : 
                       language === 'zh' ? '亲人详情' : 
                       'Loved One Details'}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">
                          {language === 'es' ? 'Nombre:' : 
                           language === 'zh' ? '姓名：' : 
                           'Name:'}
                        </span> {bookingDetails.lovedOneName}
                      </div>
                      <div>
                        <span className="font-medium">
                          {language === 'es' ? 'Ubicación:' : 
                           language === 'zh' ? '位置：' : 
                           'Location:'}
                        </span> {bookingDetails.lovedOneLocation}
                      </div>
                      {bookingDetails.additionalNotes && (
                        <div>
                          <span className="font-medium">
                            {language === 'es' ? 'Notas:' : 
                             language === 'zh' ? '备注：' : 
                             'Notes:'}
                          </span> {bookingDetails.additionalNotes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => {
                if (step === 'details') setStep('calendar')
                else if (step === 'confirmation') setStep('details')
              }}
              disabled={step === 'calendar'}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              {language === 'es' ? 'Anterior' : 
               language === 'zh' ? '上一步' : 
               'Previous'}
            </Button>

            <Button
              onClick={step === 'confirmation' ? handleBookingSubmit : handleNextStep}
              disabled={
                (step === 'calendar' && (!selectedDate || !selectedTime)) ||
                (step === 'details' && (!bookingDetails.lovedOneName || !bookingDetails.lovedOneLocation))
              }
              className="btn-blue flex items-center gap-2"
            >
              {step === 'confirmation' ? (
                language === 'es' ? 'Confirmar Cita' : 
                language === 'zh' ? '确认预约' : 
                'Confirm Appointment'
              ) : (
                <>
                  {language === 'es' ? 'Siguiente' : 
                   language === 'zh' ? '下一步' : 
                   'Next'}
                  <ChevronRight size={16} />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BookingPage
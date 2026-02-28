import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Calendar, 
  Clock, 
  User, 
  Settings, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  Edit, 
  Trash2,
  Download,
  Mail,
  AlertCircle
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { useAppKV } from '@/hooks/useAppKV'
import { emailService } from '@/lib/emailService'
import Logo from '@/components/Logo'
import type { TranslationContent } from '@/lib/translations'

interface AdminDashboardProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources' | 'auth' | 'booking') => void
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
  timeSlotDuration: number
  maxAdvanceBookingDays: number
  adminEmail: string
}

interface GalleryImage {
  id: string
  url: string
  caption: string
  description: string
  uploadedAt: string
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, language, t }) => {
  const { user, isAdmin, logout } = useAuth()
  const [bookings, setBookings] = useAppKV<Booking[]>('bookings', [])
  const [adminSettings, setAdminSettings] = useAppKV<AdminSettings>('adminSettings', {
    workingHours: { start: '07:00', end: '18:00' },
    timeSlotDuration: 30,
    maxAdvanceBookingDays: 30,
    adminEmail: 'admin@silvercaretech.com'
  })
  const [galleryImages, setGalleryImages] = useAppKV<GalleryImage[]>('galleryImages', [])
  
  const [activeTab, setActiveTab] = useState('overview')
  const [editingSettings, setEditingSettings] = useState(false)
  const [tempSettings, setTempSettings] = useState(adminSettings)

  // Redirect if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen premium-gradient flex items-center justify-center p-6">
        <Card className="premium-card max-w-md w-full">
          <CardContent className="p-8 text-center">
            <AlertCircle size={48} className="text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-foreground">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              You need administrator privileges to access this page.
            </p>
            <Button onClick={() => onNavigate('home')} className="btn-blue">
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleStatusChange = async (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    const booking = bookings.find(b => b.id === bookingId)
    if (!booking) return

    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ))

    // Send email notification to user about status change
    try {
      await emailService.sendBookingStatusUpdate(
        booking.userEmail,
        booking.userName,
        booking.lovedOneName,
        newStatus,
        booking.date,
        booking.time
      )
      console.log('📧 Status update email sent to user')
    } catch (error) {
      console.error('Failed to send status update email:', error)
    }

    toast.success(`Booking ${newStatus} successfully`)
  }

  const handleDeleteBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId))
    toast.success('Booking deleted successfully')
  }

  const handleSaveSettings = () => {
    setAdminSettings(tempSettings)
    setEditingSettings(false)
    toast.success('Settings saved successfully')
  }

  const handleCancelSettings = () => {
    setTempSettings(adminSettings)
    setEditingSettings(false)
  }

  const exportBookings = () => {
    const csvContent = [
      'Date,Time,User Name,User Email,Loved One Name,Location,Status,Notes,Created At',
      ...bookings.map(booking => 
        `${booking.date},${booking.time},${booking.userName},${booking.userEmail},${booking.lovedOneName},"${booking.lovedOneLocation}",${booking.status},"${booking.additionalNotes}",${booking.createdAt}`
      )
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `silvercare-bookings-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Bookings exported successfully')
  }

  const sendTestEmail = () => {
    // Simulate sending test email
    console.log('Test email sent to:', adminSettings.adminEmail)
    toast.success('Test email sent successfully')
  }

  const pendingBookings = bookings.filter(b => b.status === 'pending')
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed')
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled')

  const todayBookings = bookings.filter(b => {
    const today = new Date().toISOString().split('T')[0]
    return b.date === today && b.status === 'confirmed'
  })

  const upcomingBookings = bookings.filter(b => {
    const today = new Date().toISOString().split('T')[0]
    return b.date > today && b.status === 'confirmed'
  }).slice(0, 5)

  return (
    <div className="min-h-screen premium-gradient">
      <header className="premium-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => onNavigate('home')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Logo size="sm" />
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </div>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="premium-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{bookings.length}</div>
                  <div className="text-sm text-muted-foreground">Total Bookings</div>
                </CardContent>
              </Card>
              <Card className="premium-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">{pendingBookings.length}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </CardContent>
              </Card>
              <Card className="premium-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">{confirmedBookings.length}</div>
                  <div className="text-sm text-muted-foreground">Confirmed</div>
                </CardContent>
              </Card>
              <Card className="premium-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{todayBookings.length}</div>
                  <div className="text-sm text-muted-foreground">Today</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={exportBookings} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Bookings
                  </Button>
                  <Button onClick={sendTestEmail} variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Test Email
                  </Button>
                  <Button onClick={() => setActiveTab('settings')} variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingBookings.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No pending bookings
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingBookings.slice(0, 5).map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{booking.lovedOneName}</div>
                              <div className="text-sm text-muted-foreground">
                                {booking.date} at {booking.time}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                by {booking.userName}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleStatusChange(booking.id, 'cancelled')}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground">
                      No upcoming appointments
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-3">
                          <div className="font-medium">{booking.lovedOneName}</div>
                          <div className="text-sm text-muted-foreground">
                            {booking.date} at {booking.time}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Contact: {booking.userName} ({booking.userEmail})
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>All Bookings</CardTitle>
                  <Button onClick={exportBookings} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Loved One</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.userName}</div>
                            <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.lovedOneName}</div>
                            <div className="text-sm text-muted-foreground">{booking.lovedOneLocation}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              booking.status === 'confirmed' ? 'default' :
                              booking.status === 'pending' ? 'secondary' :
                              'destructive'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                  className="bg-green-500 hover:bg-green-600"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Booking</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this booking? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="flex justify-end gap-2">
                                  <DialogTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogTrigger>
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleDeleteBooking(booking.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">
                    Gallery management feature will be available soon.
                  </div>
                  <Button onClick={() => onNavigate('gallery')} variant="outline">
                    View Current Gallery
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="premium-card">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>System Settings</CardTitle>
                  {!editingSettings ? (
                    <Button onClick={() => setEditingSettings(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Settings
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCancelSettings}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveSettings} className="btn-blue">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Working Hours</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input
                          id="start-time"
                          type="time"
                          value={editingSettings ? tempSettings.workingHours.start : adminSettings.workingHours.start}
                          onChange={(e) => editingSettings && setTempSettings(prev => ({
                            ...prev,
                            workingHours: { ...prev.workingHours, start: e.target.value }
                          }))}
                          disabled={!editingSettings}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <Input
                          id="end-time"
                          type="time"
                          value={editingSettings ? tempSettings.workingHours.end : adminSettings.workingHours.end}
                          onChange={(e) => editingSettings && setTempSettings(prev => ({
                            ...prev,
                            workingHours: { ...prev.workingHours, end: e.target.value }
                          }))}
                          disabled={!editingSettings}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Booking Settings</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="slot-duration">Time Slot Duration (minutes)</Label>
                        <Select
                          value={editingSettings ? tempSettings.timeSlotDuration.toString() : adminSettings.timeSlotDuration.toString()}
                          onValueChange={(value) => editingSettings && setTempSettings(prev => ({
                            ...prev,
                            timeSlotDuration: parseInt(value)
                          }))}
                          disabled={!editingSettings}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="advance-days">Max Advance Booking (days)</Label>
                        <Input
                          id="advance-days"
                          type="number"
                          min="1"
                          max="365"
                          value={editingSettings ? tempSettings.maxAdvanceBookingDays : adminSettings.maxAdvanceBookingDays}
                          onChange={(e) => editingSettings && setTempSettings(prev => ({
                            ...prev,
                            maxAdvanceBookingDays: parseInt(e.target.value)
                          }))}
                          disabled={!editingSettings}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Notification Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={editingSettings ? tempSettings.adminEmail : adminSettings.adminEmail}
                      onChange={(e) => editingSettings && setTempSettings(prev => ({
                        ...prev,
                        adminEmail: e.target.value
                      }))}
                      disabled={!editingSettings}
                    />
                  </div>
                  <Button onClick={sendTestEmail} variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Test Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default AdminDashboard
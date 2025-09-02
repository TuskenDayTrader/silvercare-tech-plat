import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, User, Mail, Lock, Eye, EyeSlash } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import Logo from '@/components/Logo'
import type { TranslationContent } from '@/lib/translations'

interface AuthPageProps {
  onNavigate: (page: 'home' | 'register' | 'gallery' | 'learn-more' | 'senior-resources' | 'booking' | 'admin-dashboard') => void
  language: 'en' | 'es' | 'zh'
  t: TranslationContent
  defaultTab?: 'login' | 'signup'
}

const AuthPage: React.FC<AuthPageProps> = ({ onNavigate, language, t, defaultTab = 'signup' }) => {
  const { login, register, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    confirmEmail: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!loginForm.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!loginForm.password) {
      newErrors.password = 'Password is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const result = await login(loginForm.email, loginForm.password)
    
    if (result.success) {
      toast.success('Successfully logged in!')
      if (loginForm.email === 'admin@silvercaretech.com') {
        onNavigate('admin-dashboard')
      } else {
        onNavigate('booking')
      }
    } else {
      toast.error(result.error || 'Login failed')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!signupForm.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!signupForm.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(signupForm.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!signupForm.confirmEmail) {
      newErrors.confirmEmail = 'Please confirm your email'
    } else if (signupForm.email !== signupForm.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const result = await register(signupForm.email, signupForm.name)
    
    if (result.success) {
      toast.success('Account created successfully!')
      onNavigate('booking')
    } else {
      toast.error(result.error || 'Registration failed')
    }
  }

  const clearErrors = (field: string) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
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
          >
            <ArrowLeft size={20} className="mr-2" />
            {language === 'es' ? 'Volver al Inicio' : language === 'zh' ? '返回首页' : 'Back to Home'}
          </Button>
        </div>
        <Logo size="md" />
      </header>

      <main className="container mx-auto px-6 pb-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              {language === 'es' ? 'Acceso de Usuario' : 
               language === 'zh' ? '用户访问' : 
               'User Access'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'es' ? 'Inicie sesión o cree una cuenta para programar conexiones' : 
               language === 'zh' ? '登录或创建账户以安排连接' : 
               'Sign in or create an account to schedule connections'}
            </p>
          </div>

          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="text-center text-foreground">
                {language === 'es' ? 'Comenzar' : 
                 language === 'zh' ? '开始' : 
                 'Get Started'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signup">
                    {language === 'es' ? 'Registrarse' : 
                     language === 'zh' ? '注册' : 
                     'Sign Up'}
                  </TabsTrigger>
                  <TabsTrigger value="login">
                    {language === 'es' ? 'Iniciar Sesión' : 
                     language === 'zh' ? '登录' : 
                     'Sign In'}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="flex items-center gap-2">
                        <User size={16} className="heart-icon" />
                        {language === 'es' ? 'Nombre Completo' : 
                         language === 'zh' ? '全名' : 
                         'Full Name'} *
                      </Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={signupForm.name}
                        onChange={(e) => {
                          setSignupForm(prev => ({ ...prev, name: e.target.value }))
                          clearErrors('name')
                        }}
                        placeholder={language === 'es' ? 'Ingrese su nombre completo' : 
                                    language === 'zh' ? '输入您的全名' : 
                                    'Enter your full name'}
                        className={errors.name ? 'border-destructive' : ''}
                        disabled={isLoading}
                      />
                      {errors.name && (
                        <p className="text-destructive text-sm">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="flex items-center gap-2">
                        <Mail size={16} className="heart-icon" />
                        {language === 'es' ? 'Correo Electrónico' : 
                         language === 'zh' ? '电子邮件' : 
                         'Email Address'} *
                      </Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupForm.email}
                        onChange={(e) => {
                          setSignupForm(prev => ({ ...prev, email: e.target.value }))
                          clearErrors('email')
                        }}
                        placeholder={language === 'es' ? 'su.email@ejemplo.com' : 
                                    language === 'zh' ? '您的邮箱@example.com' : 
                                    'your.email@example.com'}
                        className={errors.email ? 'border-destructive' : ''}
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-email" className="flex items-center gap-2">
                        <Mail size={16} className="heart-icon" />
                        {language === 'es' ? 'Confirmar Correo' : 
                         language === 'zh' ? '确认邮箱' : 
                         'Confirm Email'} *
                      </Label>
                      <Input
                        id="signup-confirm-email"
                        type="email"
                        value={signupForm.confirmEmail}
                        onChange={(e) => {
                          setSignupForm(prev => ({ ...prev, confirmEmail: e.target.value }))
                          clearErrors('confirmEmail')
                        }}
                        placeholder={language === 'es' ? 'Confirme su correo electrónico' : 
                                    language === 'zh' ? '确认您的邮箱' : 
                                    'Confirm your email address'}
                        className={errors.confirmEmail ? 'border-destructive' : ''}
                        disabled={isLoading}
                      />
                      {errors.confirmEmail && (
                        <p className="text-destructive text-sm">{errors.confirmEmail}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-blue" 
                      disabled={isLoading}
                    >
                      {isLoading ? 
                        (language === 'es' ? 'Creando cuenta...' : 
                         language === 'zh' ? '创建账户中...' : 
                         'Creating account...') :
                        (language === 'es' ? 'Crear Cuenta' : 
                         language === 'zh' ? '创建账户' : 
                         'Create Account')
                      }
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="flex items-center gap-2">
                        <Mail size={16} className="heart-icon" />
                        {language === 'es' ? 'Correo Electrónico' : 
                         language === 'zh' ? '电子邮件' : 
                         'Email Address'} *
                      </Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => {
                          setLoginForm(prev => ({ ...prev, email: e.target.value }))
                          clearErrors('email')
                        }}
                        placeholder={language === 'es' ? 'su.email@ejemplo.com' : 
                                    language === 'zh' ? '您的邮箱@example.com' : 
                                    'your.email@example.com'}
                        className={errors.email ? 'border-destructive' : ''}
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="flex items-center gap-2">
                        <Lock size={16} className="heart-icon" />
                        {language === 'es' ? 'Contraseña' : 
                         language === 'zh' ? '密码' : 
                         'Password'} *
                      </Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          value={loginForm.password}
                          onChange={(e) => {
                            setLoginForm(prev => ({ ...prev, password: e.target.value }))
                            clearErrors('password')
                          }}
                          placeholder={language === 'es' ? 'Ingrese su contraseña' : 
                                      language === 'zh' ? '输入您的密码' : 
                                      'Enter your password'}
                          className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                        </Button>
                      </div>
                      {errors.password && (
                        <p className="text-destructive text-sm">{errors.password}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-blue" 
                      disabled={isLoading}
                    >
                      {isLoading ? 
                        (language === 'es' ? 'Iniciando sesión...' : 
                         language === 'zh' ? '登录中...' : 
                         'Signing in...') :
                        (language === 'es' ? 'Iniciar Sesión' : 
                         language === 'zh' ? '登录' : 
                         'Sign In')
                      }
                    </Button>
                  </form>

                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      {language === 'es' ? 'Credenciales de administrador de demostración:' : 
                       language === 'zh' ? '演示管理员凭据：' : 
                       'Demo admin credentials:'}
                    </p>
                    <p className="text-xs font-mono bg-background p-2 rounded border">
                      Email: admin@silvercaretech.com<br />
                      Password: admin123
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default AuthPage
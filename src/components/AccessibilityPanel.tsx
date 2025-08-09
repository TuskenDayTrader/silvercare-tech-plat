import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Settings, Volume2, VolumeX, Eye, EyeOff, Type, Contrast, Hand, Subtitles } from '@phosphor-icons/react'
import { useAccessibility } from '@/hooks/useAccessibility'
import { useTranslation } from '@/lib/translations'

interface AccessibilityPanelProps {
  onLanguageChange?: (language: 'en' | 'es' | 'zh') => void
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ onLanguageChange }) => {
  const { settings, updateSetting, resetSettings, speakText, stopSpeaking, isReading } = useAccessibility()
  const { t } = useTranslation(settings.language)
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (newLanguage: 'en' | 'es' | 'zh') => {
    updateSetting('language', newLanguage)
    onLanguageChange?.(newLanguage)
    
    // Announce language change
    const announcements = {
      en: 'Language changed to English',
      es: 'Idioma cambiado a Español',
      zh: '语言已更改为中文'
    }
    setTimeout(() => speakText(announcements[newLanguage]), 300)
  }

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    updateSetting(key, value)
    
    // Announce setting changes for accessibility
    if (settings.screenReader) {
      const settingNames = {
        fontSize: t.fontSize,
        highContrast: t.highContrast,
        screenReader: t.screenReader,
        autoRead: t.autoRead,
        reducedMotion: t.reducedMotion,
        subtitles: t.subtitles,
        signLanguage: t.signLanguage
      }
      
      if (key in settingNames) {
        const announcement = `${settingNames[key as keyof typeof settingNames]} ${value ? 'enabled' : 'disabled'}`
        setTimeout(() => speakText(announcement), 200)
      }
    }
  }

  const fontSizeOptions = [
    { value: 'normal', label: 'Normal (18px)' },
    { value: 'large', label: 'Large (22px)' },
    { value: 'extra-large', label: 'Extra Large (26px)' }
  ]

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'zh', label: '中文', flag: '🇨🇳' }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="fixed top-4 right-4 z-50 metallic-silver"
          aria-label={t.accessibilityMenu}
        >
          <Settings size={24} className="mr-2" />
          {t.accessibilityMenu}
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-[400px] sm:w-[500px] overflow-y-auto premium-card"
        aria-describedby="accessibility-description"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-primary">
            <Settings size={32} className="mr-3 inline" />
            {t.accessibilityMenu}
          </SheetTitle>
          <SheetDescription id="accessibility-description">
            Customize your experience for better accessibility and comfort
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8 mt-8">
          {/* Language Selection */}
          <Card className="p-6 premium-card">
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center">
                <Hand size={24} className="mr-2 text-primary" />
                {t.language}
              </Label>
              <Select value={settings.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="text-lg h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-lg py-3">
                      <span className="flex items-center">
                        <span className="mr-3 text-xl">{option.flag}</span>
                        {option.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Font Size */}
          <Card className="p-6 premium-card">
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center">
                <Type size={24} className="mr-2 text-primary" />
                {t.fontSize}
              </Label>
              <Select 
                value={settings.fontSize} 
                onValueChange={(value) => handleSettingChange('fontSize', value)}
              >
                <SelectTrigger className="text-lg h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontSizeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-lg py-3">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Visual Accessibility */}
          <Card className="p-6 premium-card">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Eye size={24} className="mr-2 text-primary" />
                Visual Accessibility
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">{t.highContrast}</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better visibility
                  </p>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
                  className="scale-125"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">{t.reducedMotion}</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimize animations and motion effects
                  </p>
                </div>
                <Switch
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
                  className="scale-125"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">{t.subtitles}</Label>
                  <p className="text-sm text-muted-foreground">
                    Show visual text for audio content
                  </p>
                </div>
                <Switch
                  checked={settings.subtitles}
                  onCheckedChange={(checked) => handleSettingChange('subtitles', checked)}
                  className="scale-125"
                />
              </div>
            </div>
          </Card>

          {/* Audio Accessibility */}
          <Card className="p-6 premium-card">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Volume2 size={24} className="mr-2 text-primary" />
                Audio Accessibility
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">{t.screenReader}</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable screen reader support
                  </p>
                </div>
                <Switch
                  checked={settings.screenReader}
                  onCheckedChange={(checked) => handleSettingChange('screenReader', checked)}
                  className="scale-125"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">{t.autoRead}</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically read page content aloud
                  </p>
                </div>
                <Switch
                  checked={settings.autoRead}
                  onCheckedChange={(checked) => handleSettingChange('autoRead', checked)}
                  className="scale-125"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">{t.voiceSpeed}</Label>
                <div className="space-y-2">
                  <Slider
                    value={[settings.voiceSpeed]}
                    onValueChange={(value) => handleSettingChange('voiceSpeed', value[0])}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Slow (0.5x)</span>
                    <span>Normal (1x)</span>
                    <span>Fast (2x)</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Motor Accessibility */}
          <Card className="p-6 premium-card">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <Hand size={24} className="mr-2 text-primary" />
                Motor Accessibility
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">{t.signLanguage}</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable sign language interpretation overlay
                  </p>
                </div>
                <Switch
                  checked={settings.signLanguage}
                  onCheckedChange={(checked) => handleSettingChange('signLanguage', checked)}
                  className="scale-125"
                />
              </div>
            </div>
          </Card>

          {/* Voice Control Test */}
          <Card className="p-6 premium-card">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Voice Control Test</h3>
              <div className="flex gap-3">
                <Button
                  onClick={() => speakText("Voice control is working. You can use voice commands to navigate the website.")}
                  disabled={isReading}
                  className="btn-blue"
                >
                  {isReading ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  {isReading ? 'Speaking...' : 'Test Voice'}
                </Button>
                {isReading && (
                  <Button onClick={stopSpeaking} variant="outline">
                    <VolumeX size={20} className="mr-2" />
                    Stop
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Reset Settings */}
          <Card className="p-6 premium-card">
            <div className="space-y-4">
              <Button
                onClick={resetSettings}
                variant="outline"
                className="w-full h-12 text-lg"
              >
                {t.resetSettings}
              </Button>
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default AccessibilityPanel
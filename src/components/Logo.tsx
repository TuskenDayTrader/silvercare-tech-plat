import React from 'react'
import { Heart } from '@phosphor-icons/react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        <Heart 
          size={size === 'sm' ? 32 : size === 'md' ? 40 : 48} 
          className="text-primary" 
          weight="fill" 
        />
        <Heart 
          size={size === 'sm' ? 24 : size === 'md' ? 30 : 36} 
          className="absolute top-1 left-1 text-accent" 
          weight="fill" 
        />
      </div>
      <div className="flex flex-col">
        <span className={`font-bold text-primary ${sizeClasses[size]} leading-none`}>
          SilverCare Tech
        </span>
        <span className="text-muted-foreground text-sm font-medium">
          Connecting Generations, One Call at a Time
        </span>
      </div>
    </div>
  )
}

export default Logo
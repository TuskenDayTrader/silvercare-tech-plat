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

  const heartSize = size === 'sm' ? 32 : size === 'md' ? 40 : 48
  const innerHeartSize = size === 'sm' ? 24 : size === 'md' ? 30 : 36

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Outer heart with metallic silver effect */}
        <Heart 
          size={heartSize} 
          className="heart-icon"
          weight="fill"
          style={{
            color: '#6c757d',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2)) drop-shadow(0 1px 2px rgba(255,255,255,0.8))'
          }}
        />
        {/* Inner heart with golden accent */}
        <Heart 
          size={innerHeartSize} 
          className="absolute top-1 left-1 heart-icon"
          weight="fill"
          style={{
            color: '#ff9f43',
            filter: 'drop-shadow(0 1px 2px rgba(238, 90, 36, 0.3))'
          }}
        />
        {/* Intertwined effect - additional heart for depth */}
        <Heart 
          size={Math.round(innerHeartSize * 0.7)} 
          className="absolute top-2 left-2 heart-icon"
          weight="fill"
          style={{
            color: '#ffd93d',
            opacity: 0.8,
            filter: 'drop-shadow(0 1px 1px rgba(255, 217, 61, 0.5))'
          }}
        />
      </div>
      <div className="flex flex-col">
        <span 
          className={`font-bold ${sizeClasses[size]} leading-none`}
          style={{
            background: 'linear-gradient(145deg, #495057 0%, #6c757d 50%, #8e9aaf 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: 'var(--text-shadow-silver)',
            filter: 'drop-shadow(0 1px 2px rgba(255,255,255,0.8))'
          }}
        >
          SilverCare Tech
        </span>
        <span 
          className="text-muted-foreground text-sm font-medium"
          style={{
            background: 'linear-gradient(135deg, #ff9f43 0%, #ffd93d 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: 'var(--text-shadow-gold)'
          }}
        >
          Connecting Generations, One Call at a Time
        </span>
      </div>
    </div>
  )
}

export default Logo
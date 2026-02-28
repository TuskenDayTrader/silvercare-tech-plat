import React, { useState } from 'react'

const STORAGE_KEY = 'demo-banner-dismissed'

function isDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export default function DemoBanner() {
  const [visible, setVisible] = useState(() => !isDismissed())

  if (!visible) return null

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // ignore if localStorage unavailable
    }
    setVisible(false)
  }

  return (
    <div
      role="status"
      style={{
        backgroundColor: '#1e40af',
        color: '#ffffff',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        fontSize: '0.95rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
      }}
    >
      <span>
        🔔 Pilot Demo — No payments collected. Requests only. SilverCare Connect will confirm by phone.
      </span>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss demo banner"
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.6)',
          color: '#ffffff',
          borderRadius: '4px',
          padding: '0.1rem 0.5rem',
          cursor: 'pointer',
          fontSize: '0.85rem',
          lineHeight: 1.4,
        }}
      >
        ✕
      </button>
    </div>
  )
}

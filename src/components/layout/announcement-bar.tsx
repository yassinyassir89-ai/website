'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

export function AnnouncementBar() {
  const t = useTranslations('announcement')
  const messages: string[] = [t('messages.0'), t('messages.1'), t('messages.2')]
  const doubled = [...messages, ...messages]
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="bg-primary text-white py-2 overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Announcement"
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: paused ? 'none' : 'marquee 28s linear infinite',
        }}
      >
        {doubled.map((msg, i) => (
          <span key={i} className="text-xs font-medium tracking-wide px-12">
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}

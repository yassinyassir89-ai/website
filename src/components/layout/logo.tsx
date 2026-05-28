'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

interface LogoProps {
  /** Where the logo links to (defaults to /[locale]) */
  href?: string
  /** Visual size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Show the small subtitle line under the logo (Navbar style). Defaults true. */
  showTagline?: boolean
  /** For dark backgrounds (Footer) — text fallback uses lighter colors */
  variant?: 'light' | 'dark'
  className?: string
}

const sizes = {
  sm: { width: 110, height: 50, textBase: 'text-xl', textSmall: 'text-[8px]' },
  md: { width: 160, height: 70, textBase: 'text-2xl md:text-3xl', textSmall: 'text-[9px]' },
  lg: { width: 220, height: 100, textBase: 'text-3xl md:text-4xl', textSmall: 'text-[10px]' },
}

export function Logo({
  href,
  size = 'md',
  showTagline = true,
  variant = 'light',
  className = '',
}: LogoProps) {
  const locale = useLocale()
  const t = useTranslations('nav')
  const [imgError, setImgError] = useState(false)

  const dim = sizes[size]
  const linkHref = href ?? `/${locale}`

  // Color tokens differ by variant
  const textColor = variant === 'dark' ? 'text-white' : 'text-ink'
  const accentColor = 'text-gold italic'
  const taglineColor = 'text-gold'

  return (
    <Link href={linkHref} className={`flex flex-col items-center group ${className}`} aria-label="Grow Beauty">
      {!imgError ? (
        <Image
          src="/logo.png"
          alt="Grow Beauty"
          width={dim.width}
          height={dim.height}
          priority
          className="object-contain transition-opacity duration-300 group-hover:opacity-90"
          onError={() => setImgError(true)}
        />
      ) : (
        <>
          <span className={`font-serif ${dim.textBase} ${textColor} tracking-wide group-hover:text-primary transition-colors duration-300`}>
            Grow <span className={accentColor}>Beauty</span>
          </span>
          {showTagline && (
            <span className={`${dim.textSmall} uppercase tracking-[0.4em] ${taglineColor} font-medium -mt-0.5`}>
              {t('tagline')}
            </span>
          )}
        </>
      )}
    </Link>
  )
}

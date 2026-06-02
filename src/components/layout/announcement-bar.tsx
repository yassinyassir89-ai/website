'use client'

import { Sparkles } from 'lucide-react'

/**
 * Clean static announcement bar — Zack Beauty style.
 * Light pink background, dark primary text, centered, separator between two USPs.
 */
export function AnnouncementBar() {
  return (
    <div
      className="bg-primary-light/70 text-primary py-2.5 text-center"
      aria-label="Promotion"
    >
      <div className="luxury-container flex items-center justify-center gap-2 md:gap-3 flex-wrap">
        <Sparkles size={12} className="text-primary hidden sm:inline" />
        <span className="text-[11px] md:text-xs font-semibold tracking-wide">
          LIVRAISON GRATUITE
        </span>
        <span className="text-[11px] md:text-xs font-light text-primary/80">
          pour toute commande dès 500 DH
        </span>
        <span className="text-primary/30 mx-1 hidden sm:inline">|</span>
        <span className="text-[11px] md:text-xs font-light text-primary/80 hidden sm:inline">
          Retours gratuits sous 14 jours
        </span>
      </div>
    </div>
  )
}

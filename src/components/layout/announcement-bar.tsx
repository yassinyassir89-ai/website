'use client'

import { Sparkles } from 'lucide-react'

/**
 * Dark luxury announcement bar — burgundy gradient with sparkle decorations
 * on both sides. Two messages: left (free shipping) and right (new collection).
 */
export function AnnouncementBar() {
  return (
    <div
      className="bg-gradient-to-r from-[#2a0a14] via-[#4a1024] to-[#2a0a14] text-cream py-2.5 relative overflow-hidden"
      aria-label="Promotion"
    >
      {/* Subtle gold radial glow centered */}
      <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 to-transparent pointer-events-none" />

      <div className="luxury-container flex items-center justify-between gap-4 relative">
        {/* Left message */}
        <div className="flex items-center gap-2 text-[11px] md:text-xs">
          <Sparkles size={12} className="text-gold" />
          <span className="font-semibold tracking-wide text-cream">
            Livraison gratuite à partir de 500 DH
          </span>
          <Sparkles size={12} className="text-gold" />
        </div>

        {/* Right message (hidden on small mobile) */}
        <div className="hidden md:flex items-center gap-2 text-[11px] md:text-xs">
          <span className="text-pink-300">🌸</span>
          <span className="font-medium tracking-wide text-cream/90">
            Nouveau : CeraVe & La Roche-Posay disponibles
          </span>
        </div>
      </div>
    </div>
  )
}

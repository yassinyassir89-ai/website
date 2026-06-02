'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles, Users, Package, Star, Truck, Check } from 'lucide-react'
import { useMounted } from '@/hooks/use-mounted'
import { mockProducts } from '@/lib/data'

// Pick CeraVe products to showcase (matches user's reference image)
const showcaseProducts = mockProducts.filter((p) => p.brandId === 'cerave').slice(0, 5)

export function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const mounted = useMounted()
  const base = `/${locale}`

  return (
    <section className="relative bg-gradient-to-br from-[#1a0a14] via-[#2d0f1c] to-[#1a0a14] overflow-hidden">
      {/* ===== Background luxury effects ===== */}
      {/* Central gold radial glow behind the products */}
      <div className="absolute inset-y-0 end-0 w-full lg:w-3/5 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 end-0 w-[700px] h-[700px] max-w-full bg-gradient-radial from-amber-500/25 via-orange-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 -translate-y-1/2 end-20 w-[400px] h-[400px] max-w-full bg-gradient-radial from-amber-300/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Golden particles */}
      {mounted && Array.from({ length: 14 }).map((_, i) => {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const size = Math.random() * 3 + 1
        const duration = Math.random() * 5 + 6
        const delay = Math.random() * 3
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-300/40 pointer-events-none"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}

      {/* Decorative rings (subtle) */}
      <div className="absolute top-1/2 end-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-amber-500/10 pointer-events-none" />
      <div className="absolute top-1/2 end-1/3 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-amber-500/5 pointer-events-none" />

      {/* ===== Content ===== */}
      <div className="luxury-container relative z-10 py-16 lg:py-24 min-h-[640px] lg:min-h-[720px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center w-full">

          {/* ===== Left column: Text + CTAs + Stats ===== */}
          <motion.div
            className="space-y-6 lg:space-y-7"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-400/30 text-rose-200 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm"
            >
              <Sparkles size={12} />
              Nouvelle Collection
            </motion.div>

            {/* Massive headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-white leading-[1.02] tracking-tight"
            >
              Révélez votre
              <br />
              <span className="relative inline-block mt-1">
                <span className="italic bg-gradient-to-r from-rose-300 via-pink-300 to-rose-400 bg-clip-text text-transparent">
                  éclat naturel
                </span>
                <motion.span
                  className="absolute -bottom-1 start-0 end-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.7 }}
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-cream/70 text-base md:text-lg leading-relaxed max-w-md"
            >
              Des soins de luxe formulés avec les ingrédients les plus précieux pour une peau radieuse et sublimée.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <Link
                href={`${base}/boutique`}
                className="group relative inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-rose-600 to-pink-700 text-white font-semibold text-sm shadow-lg shadow-rose-900/40 hover:shadow-rose-700/60 hover:scale-[1.02] transition-all"
              >
                Découvrir la Collection
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href={`${base}/boutique`}
                className="inline-flex items-center justify-center px-7 py-4 rounded-full border-2 border-gold text-gold font-semibold text-sm hover:bg-gold hover:text-white transition-colors"
              >
                Voir tout
              </Link>
            </motion.div>

            {/* Stats row with icons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5 pt-7 border-t border-white/10"
            >
              {[
                { icon: Users, num: '10K+', label: 'Clientes heureuses' },
                { icon: Package, num: '40+', label: 'Produits de qualité' },
                { icon: Star, num: '4.9/5', label: 'Note moyenne' },
                { icon: Truck, num: '', label: 'Livraison rapide & sécurisée' },
              ].map(({ icon: Icon, num, label }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <Icon size={20} className="text-amber-300/80" strokeWidth={1.5} />
                  {num && (
                    <p className="font-serif text-2xl md:text-3xl text-white font-bold leading-none">
                      {num}
                    </p>
                  )}
                  <p className="text-[11px] md:text-xs text-cream/60 leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ===== Right column: Product showcase ===== */}
          <motion.div
            className="relative aspect-square max-w-lg mx-auto w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* "Recommandé par les dermatologues" badge top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="absolute top-2 end-2 lg:top-0 lg:end-0 z-30 w-24 h-24 md:w-28 md:h-28 rounded-full border border-gold/40 bg-[#1a0a14]/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-3"
            >
              <p className="text-[9px] md:text-[10px] text-gold/70 mb-1">↓</p>
              <p className="font-serif text-[10px] md:text-xs text-gold leading-tight font-semibold">
                Recommandé<br/>par les<br/>dermatologues
              </p>
              <Check size={12} className="text-gold mt-1" strokeWidth={2.5} />
            </motion.div>

            {/* Marble podium */}
            <div className="absolute bottom-[8%] start-1/2 -translate-x-1/2 w-[85%] h-[18%] rounded-full bg-gradient-to-b from-stone-100/15 via-stone-200/10 to-stone-300/5 border-t border-stone-100/20 blur-sm" />
            <div className="absolute bottom-[10%] start-1/2 -translate-x-1/2 w-[80%] h-[14%] rounded-full bg-gradient-to-b from-stone-200/20 to-transparent border border-stone-100/15" />

            {/* Product collage — CeraVe products */}
            <div className="relative w-full h-full">
              {showcaseProducts[0] && (
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                  className="absolute top-[12%] start-[8%] w-[28%] h-[55%] rounded-2xl overflow-hidden shadow-2xl shadow-black/70 bg-white"
                >
                  <Image
                    src={showcaseProducts[0].image}
                    alt={showcaseProducts[0].name.fr}
                    fill
                    priority
                    sizes="(max-width: 1024px) 30vw, 18vw"
                    className="object-contain"
                  />
                </motion.div>
              )}

              {showcaseProducts[1] && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                  className="absolute top-[6%] start-[36%] w-[28%] h-[60%] rounded-2xl overflow-hidden shadow-2xl shadow-black/70 bg-white z-20"
                >
                  <Image
                    src={showcaseProducts[1].image}
                    alt={showcaseProducts[1].name.fr}
                    fill
                    priority
                    sizes="(max-width: 1024px) 30vw, 18vw"
                    className="object-contain"
                  />
                </motion.div>
              )}

              {showcaseProducts[2] && (
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.7 }}
                  className="absolute top-[14%] start-[64%] w-[26%] h-[52%] rounded-2xl overflow-hidden shadow-2xl shadow-black/70 bg-white"
                >
                  <Image
                    src={showcaseProducts[2].image}
                    alt={showcaseProducts[2].name.fr}
                    fill
                    priority
                    sizes="(max-width: 1024px) 30vw, 18vw"
                    className="object-contain"
                  />
                </motion.div>
              )}

              {showcaseProducts[3] && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                  className="absolute bottom-[16%] start-[42%] w-[24%] h-[34%] rounded-2xl overflow-hidden shadow-2xl shadow-black/70 bg-white z-30"
                >
                  <Image
                    src={showcaseProducts[3].image}
                    alt={showcaseProducts[3].name.fr}
                    fill
                    priority
                    sizes="(max-width: 1024px) 30vw, 18vw"
                    className="object-contain"
                  />
                </motion.div>
              )}
            </div>

            {/* Brand name etched on podium */}
            <p className="absolute bottom-[6%] start-1/2 -translate-x-1/2 font-serif text-2xl text-amber-200/30 italic tracking-wider">
              CeraVe
            </p>
          </motion.div>
        </div>

        {/* Bottom-right dots indicator */}
        <div className="absolute bottom-8 end-8 flex items-center gap-1.5 z-20">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1 transition-all rounded-full ${
                i === 2 ? 'w-8 bg-white' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

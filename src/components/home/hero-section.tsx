'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles, Star, ShieldCheck } from 'lucide-react'
import { useMounted } from '@/hooks/use-mounted'

const floatingElements = [
  { size: 8, x: '15%', y: '20%', delay: 0, duration: 6 },
  { size: 5, x: '80%', y: '30%', delay: 1, duration: 7 },
  { size: 12, x: '70%', y: '70%', delay: 0.5, duration: 8 },
  { size: 6, x: '30%', y: '75%', delay: 1.5, duration: 6.5 },
  { size: 4, x: '55%', y: '15%', delay: 2, duration: 7.5 },
]

export function HeroSection() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const mounted = useMounted()
  const isRtl = locale === 'ar'
  const base = `/${locale}`

  return (
    <section className="relative min-h-[90vh] bg-hero-gradient overflow-hidden flex items-center">

      {/* Animated gradient blobs — only animate after mount */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -start-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={mounted ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : undefined}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 -end-32 w-80 h-80 bg-gold/20 rounded-full blur-3xl"
          animate={mounted ? { scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] } : undefined}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 start-1/3 w-64 h-64 bg-primary-light/50 rounded-full blur-3xl"
          animate={mounted ? { scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] } : undefined}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      {/* Floating decorative circles */}
      {mounted && floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30 pointer-events-none"
          style={{ width: el.size, height: el.size, left: el.x, top: el.y }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: el.duration, delay: el.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Sparkle icons — only show after mount */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-1/4 end-1/4 text-gold/40 pointer-events-none hidden lg:block"
            animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={24} />
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 start-1/4 text-primary/30 pointer-events-none hidden lg:block"
            animate={{ rotate: [360, 180, 0], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={16} />
          </motion.div>
        </>
      )}

      {/* Main content — two-column split */}
      <div className="luxury-container relative z-10 w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text column */}
          <div className={`space-y-6 ${isRtl ? 'lg:order-2' : 'lg:order-1'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-2 rounded-full text-xs font-semibold tracking-wide">
              <Sparkles size={12} />
              {t('badge')}
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-ink leading-[1.1] text-balance">
              {t('title')}{' '}
              <span className="relative inline-block">
                <span className="text-primary italic">{t('title_accent')}</span>
                <span className="absolute -bottom-1 start-0 end-0 h-0.5 bg-gradient-to-r from-primary to-gold" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-ink/60 text-base md:text-lg leading-relaxed max-w-md">
              {t('subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href={`${base}/boutique`} className="btn-primary group">
                {t('cta_primary')}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link href={`${base}/boutique`} className="btn-outline">
                {t('cta_secondary')}
              </Link>
            </div>

            {/* Trust badges row — rating + authenticity */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-primary/10">
              {/* Rating pill */}
              <div className="inline-flex items-center gap-2 bg-white shadow-soft rounded-full px-3 py-1.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-ink">4.9</span>
                <span className="text-xs text-ink/50">· 2,847 avis</span>
              </div>

              {/* Authenticity pill */}
              <div className="inline-flex items-center gap-1.5 bg-green-50 rounded-full px-3 py-1.5">
                <ShieldCheck size={13} className="text-green-600" />
                <span className="text-xs font-semibold text-green-700">100% Authentique</span>
              </div>

              {/* Free shipping pill */}
              <div className="hidden sm:inline-flex items-center gap-1.5 bg-primary-light rounded-full px-3 py-1.5">
                <span className="text-xs font-semibold text-primary">Livraison gratuite dès 500 DH</span>
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className={`relative ${isRtl ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="relative w-full max-w-lg mx-auto">
              {/* Decorative ring — animate only after mount */}
              {mounted && (
                <motion.div
                  className="absolute -inset-4 border-2 border-gold/30"
                  animate={{ borderRadius: ['40% 60% 60% 40% / 40% 40% 60% 60%', '60% 40% 40% 60% / 60% 60% 40% 40%', '40% 60% 60% 40% / 40% 40% 60% 60%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%' }}
                />
              )}

              {/* Pink blob background */}
              <div className="absolute inset-0 bg-primary/10 blur-2xl" style={{ borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%' }} />

              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-pink-lg">
                <Image
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=90"
                  alt="Grow Beauty luxury skincare"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>

              {/* Floating product card */}
              <div className="absolute -bottom-4 -start-4 bg-white rounded-2xl p-4 shadow-luxury flex items-center gap-3 max-w-[180px]">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&auto=format&fit=crop&q=80"
                    alt="Product"
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink leading-tight">
                    {locale === 'ar' ? 'سيروم الإشراق' : 'Sérum Éclat'}
                  </p>
                  <p className="text-xs text-primary font-bold mt-0.5">249 DH</p>
                </div>
              </div>

              {/* Rating badge */}
              <div className="absolute -top-3 -end-3 bg-gold text-white rounded-2xl px-3 py-2 shadow-luxury text-center">
                <p className="text-xs font-bold">4.9 ★</p>
                <p className="text-[9px] opacity-80">{locale === 'ar' ? 'تقييم' : 'Note'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" aria-hidden="true">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white" fillOpacity="0.5" />
        </svg>
      </div>
    </section>
  )
}

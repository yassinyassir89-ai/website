'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Sparkles, Tag, Clock, Flame } from 'lucide-react'
import { HomepageProductCard } from '@/components/home/homepage-product-card'
import { promoProducts } from '@/lib/data'
import { calculateDiscount } from '@/lib/i18n-helpers'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function PromotionsClient() {
  const t = useTranslations('promotions')
  const locale = useLocale()

  // Sort by biggest discount first
  const sortedPromos = [...promoProducts].sort((a, b) => {
    const discountA = calculateDiscount(a.price, a.originalPrice) ?? 0
    const discountB = calculateDiscount(b.price, b.originalPrice) ?? 0
    return discountB - discountA
  })

  const maxDiscount = Math.max(
    ...promoProducts.map((p) => calculateDiscount(p.price, p.originalPrice) ?? 0)
  )

  const totalSavings = promoProducts.reduce(
    (sum, p) => sum + ((p.originalPrice ?? p.price) - p.price),
    0
  )

  return (
    <>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-cream to-gold-light py-16 md:py-24">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute -top-20 -start-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -end-20 w-72 h-72 bg-gold/30 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </div>

        <div className="luxury-container relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Animated badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame size={14} />
              {t('badge')}
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-3">
              {t('hero_title')}
            </h1>

            {/* Big discount stat */}
            <div className="my-6 flex items-baseline justify-center gap-3">
              <span className="font-serif text-xl md:text-2xl text-ink/60">{t('up_to')}</span>
              <motion.span
                className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-primary"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
              >
                -{maxDiscount}%
              </motion.span>
              <span className="font-serif text-xl md:text-2xl text-ink/60 uppercase tracking-widest">{t('off')}</span>
            </div>

            <p className="text-ink/70 text-base md:text-lg leading-relaxed">
              {t('hero_subtitle')}
            </p>

            {/* Stats row */}
            <motion.div
              className="flex items-center justify-center gap-8 mt-8 pt-8 border-t border-primary/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
                  <Tag size={16} />
                  <span className="font-serif text-2xl font-bold">{promoProducts.length}</span>
                </div>
                <p className="text-xs text-ink/60 uppercase tracking-wider">
                  {locale === 'ar' ? 'منتج بخصم' : 'Produits en promo'}
                </p>
              </div>
              <div className="w-px h-12 bg-primary/20" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 text-gold mb-1">
                  <Sparkles size={16} />
                  <span className="font-serif text-2xl font-bold">{totalSavings} DH</span>
                </div>
                <p className="text-xs text-ink/60 uppercase tracking-wider">{t('save')}</p>
              </div>
              <div className="w-px h-12 bg-primary/20" />
              <div className="text-center hidden sm:block">
                <div className="flex items-center justify-center gap-1.5 text-red-500 mb-1">
                  <Clock size={16} />
                  <span className="font-serif text-lg font-bold">{t('ends_soon')}</span>
                </div>
                <p className="text-xs text-ink/60 uppercase tracking-wider">
                  {locale === 'ar' ? 'لفترة محدودة' : 'Durée limitée'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products grid */}
      <section className="luxury-container py-12 md:py-16">
        {sortedPromos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink/60">{t('no_promos')}</p>
          </div>
        ) : (
          <>
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Flame size={20} className="text-primary" />
              <h2 className="font-serif text-2xl md:text-3xl text-ink">{t('biggest_savings')}</h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {sortedPromos.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <HomepageProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </section>
    </>
  )
}

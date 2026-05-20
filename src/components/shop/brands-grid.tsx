'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { mockBrands } from '@/lib/data'
import { getLocalizedField } from '@/lib/i18n-helpers'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export function BrandsGrid() {
  const t = useTranslations('brands')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <div className="luxury-container py-14 md:py-20">
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-subtitle mb-2">{t('subtitle')}</p>
        <h1 className="section-title">{t('title')}</h1>
        <div className="gold-divider mt-4" />
      </motion.div>

      {/* Brand cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {mockBrands.map((brand) => {
          const tagline = getLocalizedField(brand.tagline, locale)
          const origin = getLocalizedField(brand.origin, locale)

          return (
            <motion.article
              key={brand.id}
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-luxury-lg transition-shadow duration-500"
            >
              <Link href={`${base}/marques/${brand.id}`} className="block">
                {/* Cover image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={brand.cover}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

                  {/* Brand name overlay */}
                  <div className="absolute bottom-4 start-5 end-5">
                    <h3 className="font-serif text-3xl text-white tracking-wide">
                      {brand.name}
                    </h3>
                    <p className="text-gold text-sm italic mt-1">{tagline}</p>
                  </div>

                  {/* Product count badge */}
                  <div className="absolute top-4 end-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-ink">
                    {brand.productCount} {t('products')}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-ink/60">
                    <MapPin size={14} className="text-gold" />
                    <span className="uppercase tracking-wider">{t('origin')}:</span>
                    <span className="font-semibold text-ink">{origin}</span>
                  </div>

                  <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">
                    {getLocalizedField(brand.description, locale)}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-primary/10">
                    <span className="text-sm font-semibold text-primary">{t('view_products')}</span>
                    <motion.div
                      className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight size={15} className="rtl:rotate-180" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )
        })}
      </motion.div>
    </div>
  )
}

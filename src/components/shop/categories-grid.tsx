'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { mockCategories } from '@/lib/data'
import { getCategoryName } from '@/lib/i18n-helpers'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function CategoriesGrid() {
  const t = useTranslations('categories_page')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <div className="luxury-container py-14 md:py-20">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-subtitle mb-2">{t('subtitle')}</p>
        <h1 className="section-title">{t('title')}</h1>
        <div className="gold-divider mt-4" />
      </motion.div>

      {/* Asymmetric grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
      >
        {mockCategories.map((cat, idx) => {
          const name = getCategoryName(cat, locale)
          const isLarge = idx === 0 || idx === 3
          return (
            <motion.div
              key={cat.id}
              variants={item}
              className={`group relative overflow-hidden rounded-3xl ${isLarge ? 'lg:row-span-2 aspect-square lg:aspect-auto' : 'aspect-[4/3]'}`}
            >
              <Link href={`${base}/categories/${cat.id}`} className="block w-full h-full">
                <Image
                  src={cat.image}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {cat.count} {t('products')}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-2 leading-tight">
                    {name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gold group-hover:gap-3 transition-all">
                    <span>{t('explore')}</span>
                    <ArrowRight size={16} className="rtl:rotate-180" />
                  </div>
                </div>

                {/* Decorative accent */}
                <div className="absolute top-4 end-4 w-12 h-12 rounded-full border-2 border-gold/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

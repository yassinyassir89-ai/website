'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { mockCategories } from '@/lib/data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export function CategoriesSection() {
  const t = useTranslations('categories')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="luxury-container">

        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle mb-3">{t('subtitle')}</p>
          <h2 className="section-title">
            {t('title')}{' '}
            <span className="text-primary italic">{t('title_accent')}</span>
          </h2>
          <div className="gold-divider mt-4" />
        </motion.div>

        {/* Category circles — horizontal scroll on mobile, grid on desktop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:gap-8"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {mockCategories.map((cat) => {
            const name = locale === 'ar' ? cat.name.ar : cat.name.fr
            return (
              <motion.div
                key={cat.id}
                variants={item}
                className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Link href={`${base}${cat.href}`} className="flex flex-col items-center gap-3">
                  {/* Circle with gold ring */}
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glow on hover */}
                    <div className="absolute -inset-2 rounded-full bg-gold/0 group-hover:bg-gold/10 transition-all duration-300 blur-lg" />

                    {/* Gold ring border */}
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full ring-2 ring-gold/40 ring-offset-4 ring-offset-white group-hover:ring-gold group-hover:ring-offset-2 transition-all duration-300 overflow-hidden relative shadow-soft group-hover:shadow-luxury">
                      <Image
                        src={cat.image}
                        alt={name}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                    </div>

                    {/* Count badge */}
                    <div className="absolute -top-1 -end-1 bg-gold text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {cat.count}
                    </div>
                  </motion.div>

                  {/* Label */}
                  <span className="text-sm font-medium text-ink group-hover:text-primary transition-colors duration-200 text-center max-w-[110px] leading-tight">
                    {name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

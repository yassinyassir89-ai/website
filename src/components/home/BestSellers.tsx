'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HomepageProductCard } from '@/components/home/homepage-product-card'
import { bestSellerProducts } from '@/lib/data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function BestSellers() {
  const t = useTranslations('bestsellers')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="luxury-container">

        {/* Header with "View all" link */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="section-subtitle mb-2">{t('subtitle')}</p>
            <h2 className="section-title">
              {t('title')}{' '}
              <span className="text-primary italic">{t('title_accent')}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={`${base}/boutique?filter=bestseller`}
              className="flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark transition-colors group"
            >
              {t('view_all')}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {bestSellerProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <HomepageProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

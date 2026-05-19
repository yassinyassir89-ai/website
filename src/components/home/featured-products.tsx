'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { HomepageProductCard } from '@/components/home/homepage-product-card'
import { featuredProducts } from '@/lib/data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function FeaturedProducts() {
  const t = useTranslations('featured')

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="luxury-container">

        {/* Header */}
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
            <span className="relative inline-block">
              <span className="text-primary italic">{t('title_accent')}</span>
              <span className="absolute -bottom-1 start-0 end-0 h-0.5 bg-gradient-to-r from-primary to-gold" />
            </span>
          </h2>
          <div className="gold-divider mt-5" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={item}>
              <HomepageProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { HomepageProductCard } from '@/components/home/homepage-product-card'
import { mockProducts, type MockCategory } from '@/lib/data'
import { getCategoryName } from '@/lib/i18n-helpers'

interface CategoryDetailClientProps {
  category: MockCategory
}

export function CategoryDetailClient({ category }: CategoryDetailClientProps) {
  const t = useTranslations('shop')
  const tCat = useTranslations('categories_page')
  const locale = useLocale()
  const name = getCategoryName(category, locale)
  const base = `/${locale}`

  // Filter products by category
  const products = mockProducts.filter(
    (p) => p.category.fr === category.name.fr || p.category.ar === category.name.ar
  )

  return (
    <>
      {/* Hero banner with category image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={category.image}
          alt={name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/60" />

        <div className="relative h-full luxury-container flex flex-col justify-end pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`${base}/boutique`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-gold transition-colors text-sm mb-3"
            >
              <ArrowLeft size={14} className="rtl:rotate-180" />
              {t('back_to_shop')}
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              {name}
            </h1>
            <p className="text-gold text-sm mt-2 font-semibold">
              {products.length} {tCat('products')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Products grid */}
      <div className="luxury-container py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink/60 mb-4">{t('no_products')}</p>
            <Link href={`${base}/boutique`} className="btn-primary inline-flex">
              {t('back_to_shop')}
            </Link>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {products.map((product) => (
              <HomepageProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </>
  )
}

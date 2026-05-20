'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Award } from 'lucide-react'
import { HomepageProductCard } from '@/components/home/homepage-product-card'
import { mockProducts, type MockBrand } from '@/lib/data'
import { getLocalizedField } from '@/lib/i18n-helpers'

interface BrandDetailClientProps {
  brand: MockBrand
}

export function BrandDetailClient({ brand }: BrandDetailClientProps) {
  const t = useTranslations('brands')
  const locale = useLocale()
  const base = `/${locale}`

  const products = mockProducts.filter((p) => p.brandId === brand.id)
  const tagline = getLocalizedField(brand.tagline, locale)
  const description = getLocalizedField(brand.description, locale)
  const origin = getLocalizedField(brand.origin, locale)

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={brand.cover}
          alt={brand.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/70" />

        <div className="relative h-full luxury-container flex flex-col justify-end pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`${base}/marques`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-gold transition-colors text-sm mb-3"
            >
              <ArrowLeft size={14} className="rtl:rotate-180" />
              {t('back_to_brands')}
            </Link>

            <div className="flex items-end gap-5">
              {/* Brand logo */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white shadow-luxury-lg flex-shrink-0">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex-1 min-w-0 pb-1">
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-tight">
                  {brand.name}
                </h1>
                <p className="text-gold text-sm md:text-base italic mt-1">{tagline}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand details */}
      <section className="luxury-container py-10 md:py-14">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-soft">
            <h2 className="font-serif text-2xl text-ink mb-4">
              {locale === 'ar' ? 'عن الماركة' : 'À propos de la marque'}
            </h2>
            <p className="text-ink/70 leading-relaxed">{description}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gold-light flex items-center justify-center">
                  <MapPin size={16} className="text-gold-dark" />
                </div>
                <p className="text-xs uppercase tracking-wider text-ink/50 font-semibold">{t('origin')}</p>
              </div>
              <p className="text-lg font-semibold text-ink">{origin}</p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                  <Award size={16} className="text-primary" />
                </div>
                <p className="text-xs uppercase tracking-wider text-ink/50 font-semibold">
                  {locale === 'ar' ? 'المجموعة' : 'Collection'}
                </p>
              </div>
              <p className="text-lg font-semibold text-ink">
                {products.length} {t('products')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Products section */}
        <div>
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl text-ink">
              {t('all_products')}
            </h2>
          </motion.div>

          {products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl">
              <p className="text-ink/60 mb-4">{t('no_products')}</p>
              <Link href={`${base}/boutique`} className="btn-primary inline-flex">
                {locale === 'ar' ? 'العودة إلى المتجر' : 'Retour à la boutique'}
              </Link>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
            >
              {products.map((product) => (
                <HomepageProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

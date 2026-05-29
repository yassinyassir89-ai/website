'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Package, Tag, Layers, TrendingUp, Sparkles, Award, Flame, BarChart3 } from 'lucide-react'
import { mockProducts, mockCategories, mockBrands } from '@/lib/data'

export function AdminStats() {
  const t = useTranslations('builder.stats')
  const locale = useLocale()

  const total = mockProducts.length
  const onPromo = mockProducts.filter((p) => p.originalPrice && p.originalPrice > p.price).length
  const bestsellers = mockProducts.filter((p) => p.isBestSeller).length
  const newProducts = mockProducts.filter((p) => p.isNew).length

  const totalRevenue = mockProducts.reduce((sum, p) => sum + p.price, 0)
  const avgPrice = Math.round(totalRevenue / total)

  const byCategory = mockCategories
    .map((cat) => ({
      name: locale === 'ar' ? cat.name.ar : cat.name.fr,
      count: mockProducts.filter((p) => p.category.fr === cat.name.fr).length,
    }))
    .sort((a, b) => b.count - a.count)

  // Add "Parfums" + "Soin du corps" if they exist in products but not in categories
  const allCategoryNames = new Set(byCategory.map((c) => c.name))
  mockProducts.forEach((p) => {
    const name = locale === 'ar' ? p.category.ar : p.category.fr
    if (!allCategoryNames.has(name)) {
      byCategory.push({ name, count: mockProducts.filter((x) => (locale === 'ar' ? x.category.ar : x.category.fr) === name).length })
      allCategoryNames.add(name)
    }
  })
  byCategory.sort((a, b) => b.count - a.count)

  const byBrand = mockBrands
    .map((b) => ({
      name: b.name,
      count: mockProducts.filter((p) => p.brandId === b.id).length,
    }))
    .sort((a, b) => b.count - a.count)

  const maxCategoryCount = Math.max(...byCategory.map((c) => c.count), 1)
  const maxBrandCount = Math.max(...byBrand.map((b) => b.count), 1)

  const priceBuckets = [
    { label: '0-100', range: [0, 100] },
    { label: '100-200', range: [100, 200] },
    { label: '200-400', range: [200, 400] },
    { label: '400+', range: [400, Infinity] },
  ].map((b) => ({
    ...b,
    count: mockProducts.filter((p) => p.price >= b.range[0] && p.price < b.range[1]).length,
  }))
  const maxBucketCount = Math.max(...priceBuckets.map((b) => b.count), 1)

  const kpis = [
    { icon: Package, label: t('total_products'), value: total, color: 'text-primary', bg: 'bg-primary-light' },
    { icon: Tag, label: t('total_brands'), value: mockBrands.length, color: 'text-gold-dark', bg: 'bg-gold-light' },
    { icon: Layers, label: t('total_categories'), value: byCategory.length, color: 'text-purple-700', bg: 'bg-purple-100' },
    { icon: TrendingUp, label: t('avg_price'), value: `${avgPrice} DH`, color: 'text-green-700', bg: 'bg-green-100' },
    { icon: Flame, label: t('on_promo'), value: onPromo, color: 'text-red-700', bg: 'bg-red-100' },
    { icon: Award, label: t('bestsellers'), value: bestsellers, color: 'text-amber-700', bg: 'bg-amber-100' },
    { icon: Sparkles, label: t('new_products'), value: newProducts, color: 'text-pink-700', bg: 'bg-pink-100' },
    { icon: BarChart3, label: 'Total catalogue', value: `${totalRevenue.toLocaleString()} DH`, color: 'text-indigo-700', bg: 'bg-indigo-100' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl text-ink">{t('title')}</h2>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map(({ icon: Icon, label, value, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-white rounded-xl p-4 shadow-soft"
          >
            <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center mb-2`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-xs text-ink/50 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-ink mt-0.5 truncate">{value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* By Category */}
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-ink/60 mb-4">
            {t('by_category')}
          </h3>
          <div className="space-y-2.5">
            {byCategory.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-3">
                <span className="text-xs font-medium text-ink min-w-[120px] truncate">{cat.name}</span>
                <div className="flex-1 h-7 bg-primary-light/50 rounded-md overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cat.count / maxCategoryCount) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-md"
                  />
                  <span className="absolute inset-0 flex items-center px-2.5 text-xs font-bold text-white drop-shadow">
                    {cat.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Brand */}
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-ink/60 mb-4">
            {t('by_brand')}
          </h3>
          <div className="space-y-2.5">
            {byBrand.map((brand, i) => (
              <div key={brand.name} className="flex items-center gap-3">
                <span className="text-xs font-medium text-ink min-w-[120px] truncate">{brand.name}</span>
                <div className="flex-1 h-7 bg-gold-light/50 rounded-md overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(brand.count / maxBrandCount) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-gold to-gold-dark rounded-md"
                  />
                  <span className="absolute inset-0 flex items-center px-2.5 text-xs font-bold text-white drop-shadow">
                    {brand.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price distribution */}
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-ink/60 mb-4">
          {t('price_distribution')}
        </h3>
        <div className="grid grid-cols-4 gap-3 items-end h-32">
          {priceBuckets.map((bucket, i) => (
            <div key={bucket.label} className="flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs font-bold text-primary">{bucket.count}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(bucket.count / maxBucketCount) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="w-full bg-gradient-to-t from-primary-dark to-primary-light rounded-t-lg min-h-[8px]"
              />
              <span className="text-[10px] text-ink/60 font-semibold">{bucket.label} DH</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

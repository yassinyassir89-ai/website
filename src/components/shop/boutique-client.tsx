'use client'

import { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Filter, X, ChevronDown } from 'lucide-react'
import { HomepageProductCard } from '@/components/home/homepage-product-card'
import { mockProducts, mockCategories } from '@/lib/data'
import { getCategoryName } from '@/lib/i18n-helpers'

type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'newest' | 'rating'

interface BoutiqueClientProps {
  initialCategory?: string
}

export function BoutiqueClient({ initialCategory }: BoutiqueClientProps) {
  const t = useTranslations('shop')
  const locale = useLocale()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory ?? null)
  const [sort, setSort] = useState<SortOption>('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  const filtered = useMemo(() => {
    let result = [...mockProducts]

    if (selectedCategory) {
      result = result.filter((p) => {
        const catSlug = mockCategories.find((c) => c.name.fr === p.category.fr)?.id
        return catSlug === selectedCategory
      })
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  }, [selectedCategory, sort, priceRange])

  const clearFilters = () => {
    setSelectedCategory(null)
    setPriceRange([0, 1000])
    setSort('featured')
  }

  const hasFilters = selectedCategory !== null || priceRange[0] > 0 || priceRange[1] < 1000

  return (
    <div className="luxury-container py-10 md:py-14">
      {/* Page header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-subtitle mb-2">{t('subtitle')}</p>
        <h1 className="section-title">{t('title')}</h1>
        <div className="gold-divider mt-4" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

        {/* Sidebar — filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:relative lg:inset-auto lg:p-0' : 'hidden lg:block'}`}>
          {showFilters && (
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="font-serif text-xl">{t('filter_by')}</h3>
              <button onClick={() => setShowFilters(false)} aria-label="Close">
                <X size={22} />
              </button>
            </div>
          )}

          <div className="space-y-6 sticky top-24">
            {/* Categories filter */}
            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-ink mb-4">{t('category')}</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === null ? 'bg-primary text-white font-semibold' : 'text-ink hover:bg-primary-light hover:text-primary'
                  }`}
                >
                  {t('all_categories')}
                </button>
                {mockCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-start px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedCategory === cat.id ? 'bg-primary text-white font-semibold' : 'text-ink hover:bg-primary-light hover:text-primary'
                    }`}
                  >
                    <span>{getCategoryName(cat, locale)}</span>
                    <span className={`text-xs ${selectedCategory === cat.id ? 'text-white/80' : 'text-ink/40'}`}>{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div className="bg-white rounded-2xl p-5 shadow-soft">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-ink mb-4">{t('price')}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-primary">{priceRange[0]}</span>
                <span className="text-ink/40">—</span>
                <span className="text-sm font-semibold text-primary">{priceRange[1]} DH</span>
              </div>
              <input
                type="range"
                min={0}
                max={1000}
                step={50}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-primary"
              />
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <button onClick={clearFilters} className="w-full text-sm text-primary font-semibold hover:underline">
                {t('clear_filters')}
              </button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main>
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <p className="text-sm text-ink/60">
              {t('showing', { count: filtered.length })}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft text-sm font-semibold text-ink hover:text-primary transition-colors"
              >
                <Filter size={15} />
                {t('filter_by')}
              </button>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="appearance-none bg-white px-4 py-2 pe-8 rounded-full shadow-soft text-sm font-semibold text-ink hover:text-primary transition-colors cursor-pointer"
                >
                  <option value="featured">{t('sort_options.featured')}</option>
                  <option value="newest">{t('sort_options.newest')}</option>
                  <option value="price_asc">{t('sort_options.price_asc')}</option>
                  <option value="price_desc">{t('sort_options.price_desc')}</option>
                  <option value="rating">{t('sort_options.rating')}</option>
                </select>
                <ChevronDown size={14} className="absolute end-3 top-1/2 -translate-y-1/2 text-ink/50 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink/60 mb-4">{t('no_products')}</p>
              <button onClick={clearFilters} className="btn-primary">
                {t('clear_filters')}
              </button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.map((product) => (
                <HomepageProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

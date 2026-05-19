'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterState {
  priceMin: number
  priceMax: number
  categories: string[]
  tags: string[]
  sort: string
  filter: string
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
  categories?: { id: string; name: string; slug: string }[]
  totalProducts: number
}

const sortOptions = [
  { value: 'newest', label: 'Nouveautés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'bestseller', label: 'Meilleures ventes' },
  { value: 'rating', label: 'Mieux notés' },
]

export function ProductFilters({ onFilterChange, categories = [], totalProducts }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 2000,
    categories: [],
    tags: [],
    sort: 'newest',
    filter: '',
  })

  const updateFilter = (key: keyof FilterState, value: any) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)
    onFilterChange(updated)
  }

  const toggleCategory = (slug: string) => {
    const cats = filters.categories.includes(slug)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug]
    updateFilter('categories', cats)
  }

  const clearFilters = () => {
    const reset: FilterState = { priceMin: 0, priceMax: 2000, categories: [], tags: [], sort: 'newest', filter: '' }
    setFilters(reset)
    onFilterChange(reset)
  }

  const activeCount =
    filters.categories.length +
    (filters.priceMin > 0 || filters.priceMax < 2000 ? 1 : 0) +
    (filters.filter ? 1 : 0)

  return (
    <div className="mb-8">
      {/* Top bar */}
      <div className="flex items-center justify-between py-4 border-y border-beige-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-medium text-forest hover:text-gold transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filtrer
            {activeCount > 0 && (
              <span className="w-5 h-5 bg-gold text-white text-[10px] rounded-full flex items-center justify-center">
                {activeCount}
              </span>
            )}
            <ChevronDown size={14} className={cn('transition-transform', isOpen && 'rotate-180')} />
          </button>

          {activeCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-forest transition-colors"
            >
              <X size={12} /> Tout effacer
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden md:block">
            {totalProducts} produit{totalProducts > 1 ? 's' : ''}
          </span>
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="text-sm border border-beige-200 bg-transparent text-forest px-3 py-2 focus:outline-none focus:border-gold cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-beige-200"
          >
            <div className="py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Filter by type */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">Filtres rapides</h4>
                <div className="space-y-2">
                  {[
                    { value: 'nouveau', label: 'Nouveautés' },
                    { value: 'bestseller', label: 'Best-sellers' },
                    { value: 'promo', label: 'En promotion' },
                    { value: 'featured', label: 'En vedette' },
                  ].map((f) => (
                    <label key={f.value} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="filter"
                        checked={filters.filter === f.value}
                        onChange={() => updateFilter('filter', filters.filter === f.value ? '' : f.value)}
                        className="accent-forest"
                      />
                      <span className="text-sm text-forest group-hover:text-gold transition-colors">{f.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">Catégories</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(cat.slug)}
                          onChange={() => toggleCategory(cat.slug)}
                          className="accent-forest"
                        />
                        <span className="text-sm text-forest group-hover:text-gold transition-colors">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Price range */}
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">Budget</h4>
                <div className="space-y-3">
                  {[
                    { min: 0, max: 100, label: 'Moins de 100 MAD' },
                    { min: 100, max: 300, label: '100 – 300 MAD' },
                    { min: 300, max: 600, label: '300 – 600 MAD' },
                    { min: 600, max: 2000, label: 'Plus de 600 MAD' },
                  ].map((range) => (
                    <label key={range.label} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={filters.priceMin === range.min && filters.priceMax === range.max}
                        onChange={() => {
                          updateFilter('priceMin', range.min)
                          updateFilter('priceMax', range.max)
                        }}
                        className="accent-forest"
                      />
                      <span className="text-sm text-forest group-hover:text-gold transition-colors">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Active filters */}
              {activeCount > 0 && (
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4 font-medium">Filtres actifs</h4>
                  <div className="flex flex-wrap gap-2">
                    {filters.categories.map((slug) => {
                      const cat = categories.find((c) => c.slug === slug)
                      return cat ? (
                        <span key={slug} className="flex items-center gap-1.5 bg-forest text-beige-50 text-xs px-3 py-1.5">
                          {cat.name}
                          <button onClick={() => toggleCategory(slug)}>
                            <X size={10} />
                          </button>
                        </span>
                      ) : null
                    })}
                    {filters.filter && (
                      <span className="flex items-center gap-1.5 bg-gold text-white text-xs px-3 py-1.5">
                        {filters.filter}
                        <button onClick={() => updateFilter('filter', '')}>
                          <X size={10} />
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

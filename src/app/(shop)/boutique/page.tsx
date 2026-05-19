'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductFilters } from '@/components/products/ProductFilters'
import type { Product, Category } from '@/types'

export default function BoutiquePage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const fetchProducts = useCallback(async (filters?: any) => {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(page),
      limit: '12',
      ...(searchParams.get('search') && { search: searchParams.get('search')! }),
      ...(searchParams.get('filter') && { filter: searchParams.get('filter')! }),
      ...(filters?.sort && { sort: filters.sort }),
      ...(filters?.filter && { filter: filters.filter }),
      ...(filters?.priceMin && { priceMin: String(filters.priceMin) }),
      ...(filters?.priceMax && { priceMax: String(filters.priceMax) }),
      ...(filters?.categories?.length && { categories: filters.categories.join(',') }),
    })
    const res = await fetch(`/api/products?${params}`)
    const data = await res.json()
    setProducts(data.products || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, searchParams])

  useEffect(() => {
    fetchProducts()
    fetch('/api/categories').then((r) => r.json()).then((data) => setCategories(data.categories || []))
  }, [fetchProducts])

  const searchQuery = searchParams.get('search')

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Page header */}
      <div className="bg-forest py-16 md:py-20">
        <div className="luxury-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Découvrez</p>
            <h1 className="font-serif text-4xl md:text-5xl text-beige-50 mb-3">
              {searchQuery ? `Résultats pour "${searchQuery}"` : 'Notre Boutique'}
            </h1>
            <div className="w-16 h-px bg-gold mx-auto mt-4" />
          </motion.div>
        </div>
      </div>

      <div className="luxury-container py-10 md:py-14">
        <ProductFilters
          onFilterChange={fetchProducts}
          categories={categories}
          totalProducts={total}
        />
        <ProductGrid products={products} loading={loading} columns={4} />

        {/* Pagination */}
        {total > 12 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array(Math.ceil(total / 12)).fill(0).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 text-sm border transition-all ${
                  page === i + 1
                    ? 'bg-forest text-beige-50 border-forest'
                    : 'border-beige-300 text-forest hover:border-gold hover:text-gold'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

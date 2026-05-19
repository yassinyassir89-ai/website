'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { ProductGrid } from '@/components/products/ProductGrid'
import { ProductFilters } from '@/components/products/ProductFilters'
import type { Product, Category } from '@/types'

export default function CategoryPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/categories?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setCategory(data.category || null)
      })

    fetch(`/api/products?category=${slug}&limit=12`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || [])
        setTotal(data.total || 0)
        setLoading(false)
      })
  }, [slug])

  const handleFilterChange = async (filters: any) => {
    setLoading(true)
    const params = new URLSearchParams({
      category: slug as string,
      limit: '12',
      ...(filters.sort && { sort: filters.sort }),
      ...(filters.priceMin && { priceMin: String(filters.priceMin) }),
      ...(filters.priceMax < 2000 && { priceMax: String(filters.priceMax) }),
    })
    const res = await fetch(`/api/products?${params}`)
    const data = await res.json()
    setProducts(data.products || [])
    setTotal(data.total || 0)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Header */}
      <div className="relative bg-forest py-20 md:py-28 overflow-hidden">
        {category?.image && (
          <>
            <Image src={category.image} alt={category.name || ''} fill className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-forest/60" />
          </>
        )}
        <div className="luxury-container relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="flex items-center justify-center gap-2 text-xs text-beige-400 mb-4">
              <Link href="/" className="hover:text-gold">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/boutique" className="hover:text-gold">Boutique</Link>
              <ChevronRight size={12} />
              <span className="text-gold">{category?.name || slug}</span>
            </nav>
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Catégorie</p>
            <h1 className="font-serif text-4xl md:text-5xl text-beige-50 mb-3">
              {category?.name || 'Collection'}
            </h1>
            {category?.description && (
              <p className="text-beige-300 text-sm max-w-md mx-auto mt-4">{category.description}</p>
            )}
            <div className="w-16 h-px bg-gold mx-auto mt-6" />
          </motion.div>
        </div>
      </div>

      <div className="luxury-container py-10 md:py-14">
        <ProductFilters onFilterChange={handleFilterChange} totalProducts={total} />
        <ProductGrid products={products} loading={loading} columns={4} />
      </div>
    </div>
  )
}

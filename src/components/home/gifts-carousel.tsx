'use client'

import { useLocale } from 'next-intl'
import { mockProducts } from '@/lib/data'
import { ProductCarousel } from './product-carousel'

export function GiftsCarousel() {
  const locale = useLocale()
  const giftProducts = mockProducts.filter((p) => p.category.fr === 'Coffrets cadeaux')

  if (giftProducts.length === 0) return null

  return (
    <ProductCarousel
      eyebrow="🎁 Sélection cadeaux"
      title="Coffrets"
      titleAccent="précieux"
      subtitle="Des idées cadeaux raffinées pour celles qui comptent"
      products={giftProducts}
      viewAllHref={`/${locale}/boutique?category=coffrets`}
      bgClass="bg-white"
    />
  )
}

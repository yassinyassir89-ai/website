'use client'

import { useLocale } from 'next-intl'
import { promoProducts } from '@/lib/data'
import { ProductCarousel } from './product-carousel'

export function PromosCarousel() {
  const locale = useLocale()

  // Sort by biggest discount first to lead with the strongest offer
  const sorted = [...promoProducts].sort((a, b) => {
    const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0
    const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0
    return discountB - discountA
  })

  return (
    <ProductCarousel
      eyebrow="🔥 Offres limitées"
      title="Promotions"
      titleAccent="exclusives"
      subtitle="Économisez jusqu'à 40% sur une sélection de produits authentiques"
      products={sorted}
      viewAllHref={`/${locale}/promotions`}
      bgClass="bg-gradient-to-br from-primary-light/40 via-cream to-gold-light/30"
    />
  )
}

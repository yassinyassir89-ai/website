'use client'

import { useLocale } from 'next-intl'
import { mockProducts } from '@/lib/data'
import { ProductCarousel } from './product-carousel'

export function NewArrivalsCarousel() {
  const locale = useLocale()
  const newProducts = mockProducts.filter((p) => p.isNew)

  return (
    <ProductCarousel
      eyebrow="Fraîchement arrivés"
      title="Nouveautés"
      titleAccent="à découvrir"
      subtitle="Les dernières innovations beauté qui rejoignent notre catalogue"
      products={newProducts}
      viewAllHref={`/${locale}/boutique?filter=new`}
      bgClass="bg-white"
    />
  )
}

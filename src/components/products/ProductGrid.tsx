import { ProductCard } from './ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  columns?: 2 | 3 | 4
}

export function ProductGrid({ products, loading = false, columns = 4 }: ProductGridProps) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  }[columns]

  if (loading) {
    return (
      <div className={`grid ${gridClass} gap-5 md:gap-6`}>
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-product w-full" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-2xl text-forest mb-3">Aucun produit trouvé</p>
        <p className="text-muted-foreground text-sm">
          Essayez de modifier vos filtres ou votre recherche.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridClass} gap-5 md:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

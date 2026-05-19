'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Star, ShoppingBag } from 'lucide-react'
import type { Product } from '@/types'
import { useCartStore, type CartProduct } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const toggleItem = useWishlistStore((s) => s.toggleItem)
  const isWishlisted = useWishlistStore((s) => s.isWishlisted)
  const wished = isWishlisted(product.id)
  const mainImage = product.images?.[0]

  const avgRating =
    product.reviews && product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : 0

  const reviewCount = product._count?.reviews ?? product.reviews?.length ?? 0
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null

  return (
    <motion.article
      className={cn('card-product group relative flex flex-col', className)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Image */}
      <Link href={`/produit/${product.slug}`} className="relative aspect-product overflow-hidden bg-primary-light rounded-t-2xl block">
        {mainImage && !imgError ? (
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-primary-light flex items-center justify-center">
            <ShoppingBag size={32} className="text-primary/30" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Nouveau</span>
          )}
          {product.isBestSeller && (
            <span className="bg-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Bestseller</span>
          )}
          {discount && (
            <span className="bg-ink text-white text-[10px] font-bold px-2 py-0.5 rounded-full">-{discount}%</span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, comparePrice: product.comparePrice, image: product.images?.[0] ?? '' }) }}
          aria-label="Favoris"
          className="absolute top-3 end-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={14} className={cn('transition-colors', wished ? 'fill-primary text-primary' : 'text-ink/60')} />
        </button>

        {/* Add to cart */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.preventDefault(); addItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.images?.[0] ?? '', stock: product.stock }) }}
            className="w-full bg-primary text-white py-3 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            <ShoppingBag size={14} />
            Ajouter au panier
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {avgRating > 0 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} className={i < Math.floor(avgRating) ? 'fill-gold text-gold' : 'text-gray-200 fill-gray-200'} />
            ))}
            {reviewCount > 0 && <span className="text-xs text-ink/50">({reviewCount})</span>}
          </div>
        )}

        <Link href={`/produit/${product.slug}`}>
          <p className="text-sm font-semibold text-ink leading-tight line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </p>
        </Link>

        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-primary">{product.price} DH</span>
          {product.comparePrice && (
            <span className="text-xs text-ink/40 line-through">{product.comparePrice} DH</span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

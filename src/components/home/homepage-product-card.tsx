'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Heart, Star, ShoppingBag, ImageOff } from 'lucide-react'
import type { MockProduct } from '@/lib/data'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

interface HomepageProductCardProps {
  product: MockProduct
}

export function HomepageProductCard({ product }: HomepageProductCardProps) {
  const t = useTranslations('product')
  const locale = useLocale()
  const [added, setAdded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [imgError, setImgError] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const toggleWish = useWishlistStore((s) => s.toggleItem)
  const isWishlisted = useWishlistStore((s) => s.isWishlisted)

  useEffect(() => setMounted(true), [])

  const name = locale === 'ar' ? product.name.ar : product.name.fr
  const badge = product.badge ? (locale === 'ar' ? product.badge.ar : product.badge.fr) : null
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const wished = mounted ? isWishlisted(product.id) : false

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name,
      slug: product.id,
      price: product.price,
      image: product.image,
      stock: 99,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleToggleWish(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggleWish({
      id: product.id,
      name,
      slug: product.id,
      price: product.price,
      comparePrice: product.originalPrice ?? null,
      image: product.image,
    })
  }

  return (
    <motion.article
      className="bg-white rounded-2xl shadow-soft overflow-hidden group relative flex flex-col transition-shadow duration-500 hover:shadow-pink-lg"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Image */}
      <Link href={`/${locale}/produit/${product.id}`} className="relative aspect-product overflow-hidden bg-primary-light rounded-t-2xl block">
        {imgError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/40 gap-2 p-4">
            <ImageOff size={36} />
            <span className="text-[10px] text-center text-ink/50 line-clamp-2">{name}</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 start-3 px-2.5 py-1 rounded-full text-[11px] font-bold ${
            product.isBestSeller ? 'bg-gold text-white' : product.isNew ? 'bg-primary text-white' : 'bg-ink text-white'
          }`}>
            {badge}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={handleToggleWish}
          aria-label={t('add_to_wishlist')}
          className="absolute top-3 end-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-110 z-10"
        >
          <Heart
            size={15}
            className={`transition-colors duration-200 ${wished ? 'fill-primary text-primary' : 'text-ink/60'}`}
          />
        </button>

        {/* Add to cart — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary text-white py-3 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            <ShoppingBag size={15} />
            {added ? (locale === 'ar' ? '✓ تمت الإضافة' : '✓ Ajouté') : t('add_to_cart')}
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs text-ink/50">({product.reviews})</span>
        </div>

        <p className="text-sm font-semibold text-ink leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </p>

        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-base font-bold text-primary">{product.price} DH</span>
          {product.originalPrice && (
            <span className="text-xs text-ink/40 line-through">{product.originalPrice} DH</span>
          )}
          {discount && (
            <span className="ms-auto text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

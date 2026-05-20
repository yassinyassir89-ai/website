'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Trash2, ShoppingBag, ArrowRight, X } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'

export function WishlistClient() {
  const t = useTranslations('wishlist')
  const tCart = useTranslations('product')
  const locale = useLocale()
  const base = `/${locale}`
  const [mounted, setMounted] = useState(false)

  const items = useWishlistStore((s) => s.items)
  const removeItem = useWishlistStore((s) => s.removeItem)
  const clearWishlist = useWishlistStore((s) => s.clearWishlist)
  const addToCart = useCartStore((s) => s.addItem)

  useEffect(() => setMounted(true), [])

  const handleMoveToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      image: item.image,
      stock: 99,
    })
    removeItem(item.id)
  }

  if (mounted && items.length === 0) {
    return (
      <div className="luxury-container py-16 md:py-24">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-light flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart size={36} className="text-primary" />
          </motion.div>
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-3">{t('empty_title')}</h1>
          <p className="text-ink/60 mb-8">{t('empty_subtitle')}</p>
          <Link href={`${base}/boutique`} className="btn-primary inline-flex">
            {t('explore_shop')}
            <ArrowRight size={15} className="rtl:rotate-180" />
          </Link>
        </motion.div>
      </div>
    )
  }

  if (!mounted) {
    return (
      <div className="luxury-container py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-48 bg-primary-light rounded" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-product bg-primary-light rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="luxury-container py-10 md:py-14">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="section-title">{t('title')}</h1>
          <p className="text-ink/60 mt-2">{t('items_count', { count: items.length })}</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-sm text-ink/50 hover:text-red-500 transition-colors flex items-center gap-2"
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">{t('clear_all')}</span>
          </button>
        )}
      </motion.div>

      {/* Wishlist grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <AnimatePresence>
          {items.map((item) => {
            const discount = item.comparePrice
              ? Math.round(((item.comparePrice - item.price) / item.comparePrice) * 100)
              : null
            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-2xl shadow-soft overflow-hidden group relative flex flex-col"
              >
                {/* Image */}
                <Link
                  href={`${base}/produit/${item.id}`}
                  className="relative aspect-product overflow-hidden bg-primary-light rounded-t-2xl block"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {discount && (
                    <div className="absolute top-3 start-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500 text-white">
                      -{discount}%
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      removeItem(item.id)
                    }}
                    className="absolute top-3 end-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-all"
                    aria-label="Remove"
                  >
                    <X size={14} className="text-red-500" />
                  </button>
                </Link>

                {/* Info */}
                <div className="flex flex-col flex-1 p-4 gap-2">
                  <Link href={`${base}/produit/${item.id}`}>
                    <p className="text-sm font-semibold text-ink leading-tight line-clamp-2 hover:text-primary transition-colors">
                      {item.name}
                    </p>
                  </Link>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-bold text-primary">{item.price} DH</span>
                    {item.comparePrice && (
                      <span className="text-xs text-ink/40 line-through">{item.comparePrice} DH</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="mt-auto pt-2 w-full bg-primary text-white py-2 rounded-full flex items-center justify-center gap-2 text-xs font-semibold hover:bg-primary-dark transition-colors"
                  >
                    <ShoppingBag size={13} />
                    {tCart('add_to_cart')}
                  </button>
                </div>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

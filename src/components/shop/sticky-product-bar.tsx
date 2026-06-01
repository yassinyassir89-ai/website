'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Zap, Heart } from 'lucide-react'
import type { MockProduct } from '@/lib/data'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { getProductName } from '@/lib/i18n-helpers'

interface StickyProductBarProps {
  product: MockProduct
}

export function StickyProductBar({ product }: StickyProductBarProps) {
  const t = useTranslations('product_detail')
  const tProduct = useTranslations('product')
  const locale = useLocale()
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [added, setAdded] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const toggleWish = useWishlistStore((s) => s.toggleItem)
  const isWishlisted = useWishlistStore((s) => s.isWishlisted)
  const wished = isWishlisted(product.id)

  const name = getProductName(product, locale)

  useEffect(() => {
    // Show bar after scrolling 600px (past the main CTA area)
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cartProduct = {
    id: product.id,
    name,
    slug: product.id,
    price: product.price,
    image: product.image,
    stock: 99,
  }

  function handleAddToCart() {
    addItem(cartProduct, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleBuyNow() {
    addItem(cartProduct, 1)
    router.push(`/${locale}/paiement`)
  }

  function handleToggleWish() {
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
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-primary/10 shadow-luxury-lg backdrop-blur-md"
        >
          <div className="px-3 py-3 flex items-center gap-2">
            {/* Wishlist */}
            <button
              onClick={handleToggleWish}
              aria-label={tProduct('add_to_wishlist')}
              className="w-12 h-12 rounded-full border-2 border-primary/15 flex items-center justify-center hover:border-primary transition-colors flex-shrink-0"
            >
              <Heart size={18} className={wished ? 'fill-primary text-primary' : 'text-ink/60'} />
            </button>

            {/* Add to cart (secondary) */}
            <button
              onClick={handleAddToCart}
              className="flex-1 h-12 rounded-full border-2 border-ink text-ink font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-ink hover:text-white transition-colors"
            >
              {added ? (
                <span className="text-green-600">✓ Ajouté</span>
              ) : (
                <>
                  <ShoppingBag size={15} />
                  Panier
                </>
              )}
            </button>

            {/* Buy now (primary, gold accent on dark) */}
            <button
              onClick={handleBuyNow}
              className="flex-1 h-12 rounded-full bg-ink text-white font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-ink/90 transition-colors shadow-lg"
            >
              <Zap size={15} className="text-gold" fill="currentColor" />
              {t('buy_now')}
            </button>
          </div>

          {/* Price strip on top edge for context */}
          <div className="absolute -top-7 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-t-lg shadow-md">
            {product.price} DH
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

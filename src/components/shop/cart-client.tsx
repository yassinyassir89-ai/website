'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const FREE_SHIPPING_THRESHOLD = 500
const SHIPPING_COST = 30

export function CartClient() {
  const t = useTranslations('cart')
  const locale = useLocale()
  const base = `/${locale}`
  const [mounted, setMounted] = useState(false)

  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)
  const subtotal = useCartStore((s) => s.getSubtotal())
  const itemCount = useCartStore((s) => s.getItemCount())

  useEffect(() => setMounted(true), [])

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shippingCost
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  // Show empty state when mounted and empty
  if (mounted && items.length === 0) {
    return (
      <div className="luxury-container py-16 md:py-24">
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-light flex items-center justify-center">
            <ShoppingBag size={36} className="text-primary" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-3">{t('empty_title')}</h1>
          <p className="text-ink/60 mb-8">{t('empty_subtitle')}</p>
          <Link href={`${base}/boutique`} className="btn-primary inline-flex">
            {t('continue_shopping')}
            <ArrowRight size={15} className="rtl:rotate-180" />
          </Link>
        </motion.div>
      </div>
    )
  }

  // Skeleton during hydration
  if (!mounted) {
    return (
      <div className="luxury-container py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-48 bg-primary-light rounded" />
          <div className="h-32 bg-white rounded-2xl" />
          <div className="h-32 bg-white rounded-2xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="luxury-container py-10 md:py-14">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="section-title">{t('title')}</h1>
        <p className="text-ink/60 mt-2">
          {itemCount} {itemCount === 1 ? t('item') : t('items')} · {t('subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Items list */}
        <div className="space-y-4">
          {/* Free shipping progress */}
          {remainingForFree > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gold-light rounded-2xl p-4 flex items-start gap-3"
            >
              <Truck size={20} className="text-gold-dark flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink mb-2">
                  {t('free_shipping_message', { amount: remainingForFree })}
                </p>
                <div className="h-1.5 bg-white/70 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gold-dark"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl p-4 md:p-5 shadow-soft flex gap-4"
              >
                <Link
                  href={`${base}/produit/${item.product.id}`}
                  className="relative w-20 h-24 md:w-24 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-primary-light"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>

                <div className="flex-1 flex flex-col">
                  <Link
                    href={`${base}/produit/${item.product.id}`}
                    className="font-semibold text-ink hover:text-primary transition-colors line-clamp-2 mb-1"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-primary font-bold text-lg">{item.product.price} DH</p>

                  <div className="mt-auto pt-2 flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center border-2 border-primary/20 rounded-full">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-primary-light rounded-s-full transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center font-semibold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-primary-light rounded-e-full transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id, item.variant)}
                      className="text-ink/40 hover:text-red-500 transition-colors flex items-center gap-1 text-xs"
                      aria-label={t('remove')}
                    >
                      <Trash2 size={14} />
                      <span className="hidden sm:inline">{t('remove')}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-ink/50 hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <Trash2 size={14} />
              {t('clear_cart')}
            </button>
          )}
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-2xl p-6 shadow-soft space-y-4">
            <h2 className="font-serif text-2xl text-ink mb-2">
              {locale === 'ar' ? 'الملخص' : 'Récapitulatif'}
            </h2>

            <div className="space-y-3 py-3 border-y border-primary/10">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">{t('subtotal')}</span>
                <span className="font-semibold text-ink">{subtotal} DH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">{t('shipping')}</span>
                <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-ink'}`}>
                  {shippingCost === 0 ? t('shipping_free') : `${shippingCost} DH`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline">
              <span className="font-serif text-lg text-ink">{t('total')}</span>
              <span className="font-serif text-2xl font-bold text-primary">{total} DH</span>
            </div>

            <Link
              href={`${base}/paiement`}
              className="btn-primary w-full"
            >
              {t('checkout')}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>

            <Link
              href={`${base}/boutique`}
              className="block text-center text-sm text-primary hover:underline"
            >
              {t('continue_shopping')}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingBag, ArrowRight, Plus, Minus, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const total = getTotal()
  const count = getItemCount()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-beige-200">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-forest" />
                <h2 className="font-serif text-xl text-forest">Mon Panier</h2>
                {count > 0 && (
                  <span className="w-6 h-6 bg-forest text-beige-50 text-xs rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </div>
              <button onClick={closeCart} className="p-1 text-muted-foreground hover:text-forest transition-colors">
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
                  <div className="w-20 h-20 border-2 border-beige-300 rounded-full flex items-center justify-center">
                    <ShoppingBag size={30} className="text-beige-300" />
                  </div>
                  <div>
                    <p className="font-serif text-xl text-forest mb-2">Votre panier est vide</p>
                    <p className="text-sm text-muted-foreground">Découvrez nos produits de beauté luxueux</p>
                  </div>
                  <Link
                    href="/boutique"
                    onClick={closeCart}
                    className="btn-luxury px-8 py-3.5 text-xs"
                  >
                    Explorer la Boutique
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 py-4 border-b border-beige-100"
                    >
                      {/* Image */}
                      <Link
                        href={`/produit/${item.product.slug}`}
                        onClick={closeCart}
                        className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-beige-100"
                      >
                        <Image
                          src={item.product.image || '/placeholder.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/produit/${item.product.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-forest hover:text-gold transition-colors line-clamp-2 block mb-1"
                        >
                          {item.product.name}
                        </Link>
                        {item.variant && (
                          <p className="text-xs text-muted-foreground mb-2">{item.variant}</p>
                        )}
                        <p className="text-sm font-medium text-gold mb-3">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity + Remove */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-beige-200">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                              className="w-8 h-8 flex items-center justify-center text-forest hover:text-gold transition-colors"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                              disabled={item.quantity >= item.product.stock}
                              className="w-8 h-8 flex items-center justify-center text-forest hover:text-gold transition-colors disabled:opacity-30"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id, item.variant)}
                            className="text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-beige-200 p-6 bg-beige-50 space-y-4">
                {/* Free shipping progress */}
                {total < 500 && (
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Livraison gratuite dès 500 MAD</span>
                      <span className="text-forest font-medium">{formatPrice(500 - total)} restants</span>
                    </div>
                    <div className="h-1 bg-beige-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((total / 500) * 100, 100)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-forest">Sous-total</span>
                  <span className="font-serif text-lg text-forest">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-muted-foreground -mt-2">Frais de livraison calculés à la commande</p>

                <Link
                  href="/paiement"
                  onClick={closeCart}
                  className="flex items-center justify-center gap-3 w-full bg-forest text-beige-50 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest-light transition-colors group"
                >
                  Procéder au Paiement
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/panier"
                  onClick={closeCart}
                  className="block text-center text-sm text-forest hover:text-gold transition-colors underline-offset-2 hover:underline"
                >
                  Voir mon panier
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

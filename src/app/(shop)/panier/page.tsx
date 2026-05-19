'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

export default function PanierPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()
  const shipping = total >= 500 ? 0 : 40
  const grandTotal = total + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-beige-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 border-2 border-beige-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-beige-300" />
          </div>
          <h1 className="font-serif text-3xl text-forest mb-3">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-8">Découvrez nos produits de beauté luxueux.</p>
          <Link href="/boutique" className="btn-luxury inline-flex">
            Explorer la Boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Header */}
      <div className="bg-forest py-14">
        <div className="luxury-container text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold mb-2">Votre Sélection</p>
          <h1 className="font-serif text-4xl text-beige-50">Mon Panier</h1>
        </div>
      </div>

      <div className="luxury-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items list */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-soft">
              {/* Header row */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-beige-200 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                <div className="col-span-6">Produit</div>
                <div className="col-span-2 text-center">Prix</div>
                <div className="col-span-3 text-center">Quantité</div>
                <div className="col-span-1 text-right">Total</div>
              </div>

              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 border-b border-beige-100 last:border-0 items-center"
                >
                  {/* Product info */}
                  <div className="md:col-span-6 flex gap-4">
                    <Link href={`/produit/${item.product.slug}`} className="relative w-20 h-24 flex-shrink-0 bg-beige-100">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
                    </Link>
                    <div>
                      <Link href={`/produit/${item.product.slug}`} className="text-sm font-medium text-forest hover:text-gold transition-colors block mb-1">
                        {item.product.name}
                      </Link>
                      {item.variant && <p className="text-xs text-muted-foreground mb-2">{item.variant}</p>}
                      <button
                        onClick={() => removeItem(item.product.id, item.variant)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={12} /> Supprimer
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <span className="text-sm font-medium text-forest">{formatPrice(item.product.price)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-3 flex items-center justify-center">
                    <div className="flex items-center border border-beige-200">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                        className="w-9 h-9 flex items-center justify-center text-forest hover:text-gold transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                        disabled={item.quantity >= item.product.stock}
                        className="w-9 h-9 flex items-center justify-center text-forest hover:text-gold transition-colors disabled:opacity-30"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="md:col-span-1 text-right">
                    <span className="text-sm font-medium text-forest">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4">
              <Link href="/boutique" className="flex items-center gap-2 text-sm text-forest hover:text-gold transition-colors">
                <ArrowLeft size={15} /> Continuer mes achats
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-red-500 transition-colors"
              >
                Vider le panier
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-soft p-6 sticky top-24">
              <h2 className="font-serif text-xl text-forest mb-6">Récapitulatif</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total ({items.reduce((a, i) => a + i.quantity, 0)} articles)</span>
                  <span className="font-medium text-forest">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium text-forest'}>
                    {shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <div className="bg-beige-100 p-3 text-xs text-forest">
                    Plus que <strong>{formatPrice(500 - total)}</strong> pour la livraison gratuite
                  </div>
                )}
              </div>

              <div className="border-t border-beige-200 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium text-forest">Total</span>
                  <span className="font-serif text-2xl text-forest">{formatPrice(grandTotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Paiement à la livraison</p>
              </div>

              <Link
                href="/paiement"
                className="flex items-center justify-center gap-3 w-full bg-forest text-beige-50 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest-light transition-colors group"
              >
                Commander
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="mt-4 p-3 bg-beige-100 text-center">
                <p className="text-xs text-forest font-medium">✓ Paiement à la livraison disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Package, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { checkoutSchema, type CheckoutInput } from '@/lib/validations'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function PaiementPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { items, getTotal, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const total = getTotal()

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: session?.user.name?.split(' ')[0] || '',
      lastName: session?.user.name?.split(' ')[1] || '',
    },
  })

  if (items.length === 0) {
    router.push('/panier')
    return null
  }

  const onSubmit = async (data: CheckoutInput) => {
    if (!session) {
      toast.error('Veuillez vous connecter pour passer commande')
      router.push('/connexion?redirect=/paiement')
      return
    }
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            city: data.city,
            email: session.user.email || '',
            address: '',
            postalCode: '',
            country: 'Maroc',
          },
          items: items.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            image: item.product.image,
            price: item.product.price,
            quantity: item.quantity,
            variant: item.variant,
          })),
          subtotal: total,
          shippingCost: 0,
          total: total,
          notes: data.notes,
        }),
      })

      if (res.ok) {
        const order = await res.json()
        clearCart()
        router.push(`/confirmation?order=${order.orderNumber}`)
      } else {
        toast.error('Erreur lors de la création de la commande')
      }
    } catch {
      toast.error('Erreur réseau. Veuillez réessayer.')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Header */}
      <div className="bg-white border-b border-beige-200 py-5">
        <div className="luxury-container flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl text-forest">Grow Beauty</Link>
        </div>
      </div>

      <div className="luxury-container py-10">
        <Link href="/panier" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-forest mb-8 transition-colors">
          <ArrowLeft size={15} /> Retour au panier
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="font-serif text-2xl text-forest mb-6">Informations de livraison</h2>

              {/* Prénom + Nom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Prénom *</label>
                  <input {...register('firstName')} className="input-luxury w-full" />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Nom *</label>
                  <input {...register('lastName')} className="input-luxury w-full" />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Téléphone *</label>
                <input {...register('phone')} type="tel" placeholder="06XXXXXXXX" className="input-luxury w-full" />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
              </div>

              {/* Ville */}
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">Ville *</label>
                <input {...register('city')} placeholder="Casablanca, Rabat, Tanger..." className="input-luxury w-full" />
                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5 block">
                  Notes (optionnel)
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  placeholder="Adresse précise, instructions..."
                  className="input-luxury w-full resize-none"
                />
              </div>

              {/* Payment method */}
              <div className="border-2 border-forest bg-beige-50 p-5 flex items-start gap-4">
                <div className="w-5 h-5 rounded-full border-2 border-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-forest" />
                </div>
                <div>
                  <p className="font-medium text-forest mb-1">Paiement à la livraison</p>
                  <p className="text-sm text-muted-foreground">Payez en espèces lorsque votre commande arrive. 100% sécurisé.</p>
                </div>
                <Package size={24} className="text-gold ml-auto flex-shrink-0" />
              </div>

              {/* Submit */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 bg-forest text-beige-50 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest-light transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-beige-50/30 border-t-beige-50 rounded-full animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Confirmer ma Commande
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} className="text-gold" />
                  Commande sécurisée · Paiement à la livraison
                </p>
              </div>
            </form>
          </div>

          {/* Order summary */}
          <div>
            <div className="bg-white shadow-soft p-6 sticky top-24">
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="flex items-center justify-between w-full md:cursor-default mb-4"
              >
                <h3 className="font-serif text-lg text-forest">
                  Votre commande ({items.reduce((a, i) => a + i.quantity, 0)} articles)
                </h3>
                <span className="md:hidden">
                  {showSummary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              <div className={`space-y-4 mb-6 ${showSummary ? 'block' : 'hidden md:block'}`}>
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-20 flex-shrink-0 bg-beige-100">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="64px" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-forest text-beige-50 text-[10px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-forest line-clamp-2">{item.product.name}</p>
                      {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                      <p className="text-sm font-medium text-gold mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-beige-200 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-medium text-forest">Total</span>
                  <span className="font-serif text-2xl text-forest">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-gold text-right mt-1">Paiement à la livraison</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { User, Phone, MapPin, FileText, Check, ShoppingBag, Loader2, Truck, Banknote, Shield } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

const FREE_SHIPPING_THRESHOLD = 500
const SHIPPING_COST = 30

interface FormData {
  name: string
  phone: string
  city: string
  address: string
  notes: string
}

interface FormErrors {
  name?: string
  phone?: string
  city?: string
}

export function CheckoutClient() {
  const t = useTranslations('checkout')
  const locale = useLocale()
  const router = useRouter()
  const base = `/${locale}`
  const [mounted, setMounted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const items = useCartStore((s) => s.items)
  const subtotal = useCartStore((s) => s.getSubtotal())
  const clearCart = useCartStore((s) => s.clearCart)

  const [form, setForm] = useState<FormData>({ name: '', phone: '', city: '', address: '', notes: '' })
  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => setMounted(true), [])

  // Redirect to cart if empty (after mount)
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.replace(`${base}/panier`)
    }
  }, [mounted, items.length, router, base])

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shippingCost

  function validate(): boolean {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = t('errors.name_required')
    if (!form.phone.trim()) newErrors.phone = t('errors.phone_required')
    else if (!/^[+\d\s\-()]{8,}$/.test(form.phone.trim())) newErrors.phone = t('errors.phone_invalid')
    if (!form.city.trim()) newErrors.city = t('errors.city_required')

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const orderNumber = `GB${Date.now().toString().slice(-8)}`

    const orderItems = items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      image: item.product.image,
    }))

    sessionStorage.setItem('lastOrder', JSON.stringify({
      orderNumber,
      ...form,
      items: orderItems,
      subtotal,
      shippingCost,
      total,
      timestamp: Date.now(),
    }))

    try {
      await fetch('/api/orders/sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber,
          name: form.name,
          phone: form.phone,
          city: form.city,
          address: form.address,
          notes: form.notes,
          items: orderItems.map(({ name, quantity, price }) => ({ name, quantity, price })),
          subtotal,
          shippingCost,
          total,
        }),
      })
    } catch (err) {
      console.error('Order webhook failed:', err)
    }

    clearCart()
    router.push(`${base}/confirmation?order=${orderNumber}`)
  }

  if (!mounted || items.length === 0) {
    return (
      <div className="luxury-container py-16">
        <div className="animate-pulse h-64 bg-white rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="luxury-container py-10 md:py-14">
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="section-title">{t('title')}</h1>
        <p className="text-ink/60 mt-2">{t('subtitle')}</p>
        <div className="gold-divider mt-4" />
      </motion.div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        {/* Form */}
        <div className="space-y-6">
          {/* Contact info card */}
          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-soft"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-serif text-xl text-ink mb-5 flex items-center gap-2">
              <User size={18} className="text-primary" />
              {t('contact_info')}
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">
                  {t('full_name')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-ink/40" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t('full_name_placeholder')}
                    className={`w-full ps-11 pe-4 py-3 rounded-xl border-2 ${errors.name ? 'border-red-300 bg-red-50' : 'border-primary/20 bg-white'} focus:border-primary focus:outline-none text-sm text-ink transition-colors`}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">
                  {t('phone')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-ink/40" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder={t('phone_placeholder')}
                    dir="ltr"
                    className={`w-full ps-11 pe-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-300 bg-red-50' : 'border-primary/20 bg-white'} focus:border-primary focus:outline-none text-sm text-ink transition-colors`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">
                  {t('city')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-ink/40" />
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder={t('city_placeholder')}
                    className={`w-full ps-11 pe-4 py-3 rounded-xl border-2 ${errors.city ? 'border-red-300 bg-red-50' : 'border-primary/20 bg-white'} focus:border-primary focus:outline-none text-sm text-ink transition-colors`}
                  />
                </div>
                {errors.city && <p className="text-xs text-red-500 mt-1.5">{errors.city}</p>}
              </div>

              {/* Address (optional) */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">
                  {t('address')}
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder={t('address_placeholder')}
                  className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-white focus:border-primary focus:outline-none text-sm text-ink transition-colors"
                />
              </div>

              {/* Notes (optional) */}
              <div>
                <label className="block text-sm font-semibold text-ink mb-1.5">
                  {t('notes')}
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder={t('notes_placeholder')}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 bg-white focus:border-primary focus:outline-none text-sm text-ink transition-colors resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Payment method */}
          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-soft"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-serif text-xl text-ink mb-5 flex items-center gap-2">
              <Banknote size={18} className="text-primary" />
              {t('payment_method')}
            </h2>

            <div className="border-2 border-primary bg-primary-light/30 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                <Check size={18} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-ink">{t('cod_title')}</p>
                <p className="text-xs text-ink/60 mt-0.5">{t('cod_description')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-24 h-fit space-y-4">
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-soft"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="font-serif text-xl text-ink mb-4">{t('order_summary')}</h2>

            {/* Items preview */}
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-sm">
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-primary-light flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="absolute -top-1 -end-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink line-clamp-2 leading-tight">{item.product.name}</p>
                    <p className="text-primary font-bold mt-1">{item.product.price * item.quantity} DH</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-3 border-y border-primary/10 text-sm">
              <div className="flex justify-between">
                <span className="text-ink/60">{locale === 'ar' ? 'المجموع الفرعي' : 'Sous-total'}</span>
                <span className="font-semibold">{subtotal} DH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink/60">{locale === 'ar' ? 'التوصيل' : 'Livraison'}</span>
                <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-ink'}`}>
                  {shippingCost === 0 ? (locale === 'ar' ? 'مجاني' : 'Gratuite') : `${shippingCost} DH`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-4">
              <span className="font-serif text-lg">{locale === 'ar' ? 'المجموع' : 'Total'}</span>
              <span className="font-serif text-2xl font-bold text-primary">{total} DH</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t('processing')}
                </>
              ) : (
                <>
                  <ShoppingBag size={15} />
                  {t('place_order')}
                </>
              )}
            </button>
          </motion.div>

          {/* Trust badges */}
          <div className="bg-white rounded-2xl p-5 shadow-soft space-y-3">
            {[
              { icon: Truck, label: locale === 'ar' ? 'توصيل سريع 2-4 أيام' : 'Livraison rapide 2-4 jours' },
              { icon: Banknote, label: locale === 'ar' ? 'الدفع عند الاستلام' : 'Paiement à la livraison' },
              { icon: Shield, label: locale === 'ar' ? 'بيانات محمية' : 'Données protégées' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-xs text-ink/70">
                <Icon size={16} className="text-gold flex-shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </aside>
      </form>
    </div>
  )
}

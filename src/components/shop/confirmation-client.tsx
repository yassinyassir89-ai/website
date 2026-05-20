'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, Package, Phone, MapPin, Banknote, Clock, ArrowRight, Home } from 'lucide-react'

interface OrderDetails {
  orderNumber: string
  name: string
  phone: string
  city: string
  address: string
  notes: string
  items: Array<{ name: string; quantity: number; price: number; image: string }>
  subtotal: number
  shippingCost: number
  total: number
  timestamp: number
}

export function ConfirmationClient() {
  const t = useTranslations('confirmation')
  const locale = useLocale()
  const base = `/${locale}`
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const data = sessionStorage.getItem('lastOrder')
      if (data) {
        setOrder(JSON.parse(data))
      }
    } catch (e) {
      // ignore
    }
  }, [])

  return (
    <div className="luxury-container py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        {/* Success animation */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <CheckCircle2 size={56} className="text-green-600" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          <motion.h1
            className="font-serif text-3xl md:text-4xl text-ink mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            className="text-ink/60 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t('subtitle')}
          </motion.p>

          {orderNumber && (
            <motion.div
              className="mt-6 inline-flex items-center gap-3 bg-gold-light px-5 py-3 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Package size={18} className="text-gold-dark" />
              <div className="text-start">
                <p className="text-xs text-ink/60">{t('order_number')}</p>
                <p className="font-mono font-bold text-ink tracking-wider" dir="ltr">{orderNumber}</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Order details */}
        {mounted && order && (
          <motion.div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-soft mb-6 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className="font-serif text-xl text-ink border-b border-primary/10 pb-3">
              {locale === 'ar' ? 'تفاصيل الطلب' : 'Détails de la commande'}
            </h2>

            {/* Customer info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                  <Phone size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-ink/50 uppercase tracking-wider">
                    {locale === 'ar' ? 'العميل' : 'Client'}
                  </p>
                  <p className="font-semibold text-ink">{order.name}</p>
                  <p className="text-sm text-ink/70" dir="ltr">{order.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-ink/50 uppercase tracking-wider">
                    {locale === 'ar' ? 'التوصيل إلى' : 'Livraison'}
                  </p>
                  <p className="font-semibold text-ink">{order.city}</p>
                  {order.address && <p className="text-sm text-ink/70">{order.address}</p>}
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="border-t border-primary/10 pt-4">
              <p className="text-xs text-ink/50 uppercase tracking-wider mb-3">
                {locale === 'ar' ? 'المنتجات' : 'Articles'} ({order.items.length})
              </p>
              <ul className="space-y-2">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-ink">
                      <span className="text-ink/40">{item.quantity}× </span>
                      {item.name}
                    </span>
                    <span className="font-semibold text-ink">{item.price * item.quantity} DH</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Total */}
            <div className="border-t border-primary/10 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">{locale === 'ar' ? 'المجموع الفرعي' : 'Sous-total'}</span>
                <span className="font-semibold">{order.subtotal} DH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink/60">{locale === 'ar' ? 'التوصيل' : 'Livraison'}</span>
                <span className={`font-semibold ${order.shippingCost === 0 ? 'text-green-600' : ''}`}>
                  {order.shippingCost === 0 ? (locale === 'ar' ? 'مجاني' : 'Gratuite') : `${order.shippingCost} DH`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-primary/10">
                <span className="font-serif text-lg">{locale === 'ar' ? 'المجموع الكلي' : 'Total'}</span>
                <span className="font-serif text-2xl font-bold text-primary">{order.total} DH</span>
              </div>
            </div>

            {/* Payment + delivery info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="flex items-center gap-3 bg-primary-light rounded-xl p-3">
                <Banknote size={18} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-ink/60">{t('payment_method_label')}</p>
                  <p className="text-sm font-semibold text-ink">{t('cod_label')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gold-light rounded-xl p-3">
                <Clock size={18} className="text-gold-dark flex-shrink-0" />
                <div>
                  <p className="text-xs text-ink/60">{locale === 'ar' ? 'التوصيل' : 'Livraison'}</p>
                  <p className="text-sm font-semibold text-ink">
                    {locale === 'ar' ? '2-4 أيام' : '2-4 jours'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info message */}
        <motion.div
          className="bg-primary-light rounded-2xl p-6 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-ink leading-relaxed">{t('details')}</p>
          <p className="text-sm text-ink/60 mt-3">{t('delivery_time')}</p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <Link href={`${base}/boutique`} className="btn-primary inline-flex">
            {t('continue_shopping')}
            <ArrowRight size={15} className="rtl:rotate-180" />
          </Link>
          <Link href={base} className="btn-outline inline-flex">
            <Home size={15} />
            {t('back_to_home')}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

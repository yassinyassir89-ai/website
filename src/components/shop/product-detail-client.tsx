'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Star, Heart, ShoppingBag, Minus, Plus, Truck, Shield,
  RotateCcw, Share2, ArrowLeft, Check, Zap, ImageOff
} from 'lucide-react'
import { HomepageProductCard } from '@/components/home/homepage-product-card'
import { mockProducts, type MockProduct } from '@/lib/data'
import { getProductName, getProductCategory, getProductBadge, calculateDiscount } from '@/lib/i18n-helpers'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

interface ProductDetailClientProps {
  product: MockProduct
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const t = useTranslations('product_detail')
  const tProduct = useTranslations('product')
  const locale = useLocale()
  const router = useRouter()
  const base = `/${locale}`

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description')

  const addItem = useCartStore((s) => s.addItem)
  const toggleWish = useWishlistStore((s) => s.toggleItem)
  const isWishlisted = useWishlistStore((s) => s.isWishlisted)
  const wished = isWishlisted(product.id)

  const name = getProductName(product, locale)
  const category = getProductCategory(product, locale)
  const badge = getProductBadge(product, locale)
  const discount = calculateDiscount(product.price, product.originalPrice)

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && (p.category.fr === product.category.fr))
    .slice(0, 4)

  const cartProduct = {
    id: product.id,
    name,
    slug: product.id,
    price: product.price,
    image: product.image,
    stock: 99,
  }

  const handleAddToCart = () => {
    addItem(cartProduct, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const handleBuyNow = () => {
    addItem(cartProduct, quantity)
    router.push(`${base}/paiement`)
  }

  const handleToggleWish = () => {
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
    <>
      {/* Breadcrumb */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-primary/10">
        <div className="luxury-container py-3 flex items-center gap-2 text-sm">
          <Link href={`${base}`} className="text-ink/60 hover:text-primary transition-colors">
            {locale === 'ar' ? 'الرئيسية' : 'Accueil'}
          </Link>
          <span className="text-ink/30">/</span>
          <Link href={`${base}/boutique`} className="text-ink/60 hover:text-primary transition-colors">
            {locale === 'ar' ? 'المتجر' : 'Boutique'}
          </Link>
          <span className="text-ink/30">/</span>
          <span className="text-ink font-semibold">{name}</span>
        </div>
      </div>

      <div className="luxury-container py-8 md:py-12">
        {/* Back link */}
        <Link
          href={`${base}/boutique`}
          className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          {locale === 'ar' ? 'العودة إلى المتجر' : 'Retour à la boutique'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-primary-light shadow-soft">
              {imgError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary/40 gap-3 p-6">
                  <ImageOff size={64} />
                  <span className="text-sm text-center text-ink/50">{name}</span>
                </div>
              ) : (
                <Image
                  src={product.image}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  onError={() => setImgError(true)}
                />
              )}
              {badge && (
                <div className={`absolute top-5 start-5 px-3 py-1.5 rounded-full text-xs font-bold ${
                  product.isBestSeller ? 'bg-gold text-white' : product.isNew ? 'bg-primary text-white' : 'bg-ink text-white'
                }`}>
                  {badge}
                </div>
              )}
              {discount && (
                <div className="absolute top-5 end-5 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                  -{discount}%
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">{category}</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink leading-tight">{name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-200 fill-gray-200'}
                  />
                ))}
              </div>
              <span className="text-sm text-ink/60">
                {product.rating} · {product.reviews} {locale === 'ar' ? 'تقييم' : 'avis'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-3 border-b border-primary/10">
              <span className="text-3xl md:text-4xl font-bold text-primary">{product.price} DH</span>
              {product.originalPrice && (
                <span className="text-lg text-ink/40 line-through">{product.originalPrice} DH</span>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-semibold text-green-700">{t('in_stock')}</span>
            </div>

            {/* Quantity selector */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-ink/60 font-medium">{t('quantity')}:</span>
              <div className="flex items-center bg-white border-2 border-primary/20 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-primary-light rounded-s-full transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-semibold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-primary-light rounded-e-full transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Buy Now — prominent dark button */}
            <motion.button
              onClick={handleBuyNow}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-ink hover:bg-ink/90 text-white py-4 rounded-full font-semibold text-base flex items-center justify-center gap-2.5 shadow-lg transition-colors group"
            >
              <Zap size={18} className="text-gold group-hover:scale-110 transition-transform" fill="currentColor" />
              {t('buy_now')}
            </motion.button>

            {/* Add to cart + Wishlist */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 border-ink text-ink hover:bg-ink hover:text-white py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                {added ? (
                  <>
                    <Check size={16} className="text-green-500" /> {t('added_to_cart')}
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} /> {tProduct('add_to_cart')}
                  </>
                )}
              </button>

              <button
                onClick={handleToggleWish}
                className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center hover:border-primary hover:bg-primary-light transition-colors"
                aria-label={tProduct('add_to_wishlist')}
              >
                <Heart size={18} className={wished ? 'fill-primary text-primary' : 'text-ink/60'} />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-primary/10">
              {[
                { icon: Truck, label: t('free_shipping') },
                { icon: Shield, label: t('cod_available') },
                { icon: RotateCcw, label: t('return_policy') },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-ink/70">
                  <Icon size={16} className="text-gold flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex items-center gap-2 border-b border-primary/10 mb-6">
            {(['description', 'details', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold transition-colors relative ${
                  activeTab === tab ? 'text-primary' : 'text-ink/50 hover:text-ink'
                }`}
              >
                {t(tab)}
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute bottom-0 start-0 end-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft min-h-[200px]">
            {activeTab === 'description' && (
              <p className="text-ink/70 leading-relaxed whitespace-pre-line">
                {product.description
                  ? (locale === 'ar' ? product.description.ar : product.description.fr)
                  : locale === 'ar'
                    ? `${name} - منتج فاخر مصنوع من أجود المكونات الطبيعية. تركيبة مدروسة بعناية لمنحك بشرة مشرقة وصحية. مناسب لجميع أنواع البشرة، خاصة الحساسة. خالٍ من البارابين والكبريتات. منتج مصرح به من قبل الجمعيات الصحية المغربية.`
                    : `${name} - un produit de luxe formulé avec les ingrédients naturels les plus précieux. Une formule étudiée avec soin pour vous offrir une peau radieuse et saine. Convient à tous les types de peau, particulièrement aux peaux sensibles. Sans parabène ni sulfate. Produit certifié par les associations sanitaires marocaines.`}
              </p>
            )}
            {activeTab === 'details' && (
              <ul className="space-y-3 text-sm text-ink/70">
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>{locale === 'ar' ? 'حجم: 50 مل' : 'Contenance : 50 ml'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>{locale === 'ar' ? 'مكونات طبيعية 95%' : 'Ingrédients naturels à 95%'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>{locale === 'ar' ? 'صنع في فرنسا' : 'Fabriqué en France'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>{locale === 'ar' ? 'صلاحية: 12 شهر بعد الفتح' : 'Conservation : 12 mois après ouverture'}</span>
                </li>
              </ul>
            )}
            {activeTab === 'reviews' && (
              <div className="text-center py-10">
                <Star size={36} className="text-gold mx-auto mb-3" />
                <p className="text-2xl font-bold text-ink">{product.rating} / 5</p>
                <p className="text-sm text-ink/60 mt-1">{product.reviews} {locale === 'ar' ? 'تقييم من العملاء' : 'avis clients'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-2xl md:text-3xl text-ink mb-8">{t('related_products')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <HomepageProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ShoppingBag, Heart, Share2, Star, Package, RotateCcw, Shield, Minus, Plus, ChevronRight, MessageCircle
} from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { Badge } from '@/components/ui/badge'
import { ReviewSection } from '@/components/products/ReviewSection'
import { ProductCard } from '@/components/products/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice, getDiscountPercent } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Product } from '@/types'

export default function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description')

  const addItem = useCartStore((s) => s.addItem)
  const { toggleItem, isWishlisted } = useWishlistStore()

  useEffect(() => {
    if (!slug) return
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data)
        if (data?.categoryId) {
          fetch(`/api/products?categoryId=${data.categoryId}&limit=4&exclude=${data.id}`)
            .then((r) => r.json())
            .then((d) => setRelated(d.products || []))
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="luxury-container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <div className="flex gap-3">
              {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="w-20 h-20" />)}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="luxury-container py-20 text-center">
        <h1 className="font-serif text-3xl text-forest">Produit introuvable</h1>
        <Link href="/boutique" className="btn-luxury mt-6 inline-flex">Retour à la boutique</Link>
      </div>
    )
  }

  const wishlisted = isWishlisted(product.id)
  const avgRating = product.reviews?.length
    ? product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length
    : 0

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.images[0], stock: product.stock }, quantity)
    toast.success(`${product.name} ajouté au panier`)
  }

  const handleWhatsApp = () => {
    const msg = `Bonjour 👋, je souhaite commander :\n\n*${product.name}*\nPrix : ${formatPrice(product.price)}\nQuantité : ${quantity}\n\nMerci !`
    window.open(`https://wa.me/212634825693?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-beige-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-beige-200">
        <div className="luxury-container py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-gold">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/boutique" className="hover:text-gold">Boutique</Link>
            {product.category && (
              <>
                <ChevronRight size={12} />
                <Link href={`/categories/${product.category.slug}`} className="hover:text-gold">{product.category.name}</Link>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-forest truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="luxury-container py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-beige-100 overflow-hidden"
            >
              <Image
                src={product.images[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.comparePrice && (
                <div className="absolute top-4 left-4">
                  <Badge variant="sale">-{getDiscountPercent(product.price, product.comparePrice)}%</Badge>
                </div>
              )}
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border-2 transition-all ${selectedImage === i ? 'border-gold' : 'border-transparent'}`}
                  >
                    <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.category && (
              <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">{product.category.name}</p>
            )}
            <h1 className="font-serif text-3xl md:text-4xl text-forest mb-4 leading-tight">{product.name}</h1>

            {/* Rating */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={15} className={i < Math.round(avgRating) ? 'fill-gold text-gold' : 'text-beige-200'} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {avgRating.toFixed(1)} ({product.reviews.length} avis)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif text-3xl text-forest">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.comparePrice)}</span>
              )}
            </div>

            <div className="w-16 h-px bg-gold mb-6" />

            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              {product.shortDesc || product.description.substring(0, 200) + '...'}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-muted-foreground">
                {product.stock > 0
                  ? product.stock <= 10
                    ? `Plus que ${product.stock} en stock`
                    : 'En stock'
                  : 'Rupture de stock'}
              </span>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center border border-beige-300 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-12 flex items-center justify-center text-forest hover:text-gold transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium text-forest">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                  className="w-11 h-12 flex items-center justify-center text-forest hover:text-gold transition-colors disabled:opacity-30"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-3 bg-forest text-beige-50 py-3 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest-light transition-colors disabled:opacity-50"
              >
                <ShoppingBag size={18} />
                Ajouter au Panier
              </button>
            </div>

            {/* WhatsApp button */}
            <button
              onClick={handleWhatsApp}
              disabled={product.stock === 0}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bb5a] text-white py-3.5 text-sm font-medium uppercase tracking-[0.15em] transition-colors disabled:opacity-50 mb-6"
            >
              <MessageCircle size={18} />
              Commander via WhatsApp
            </button>

            <div className="flex gap-3 mb-8">
              <button
                onClick={() => {
                  toggleItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, comparePrice: product.comparePrice, image: product.images[0] })
                  toast(wishlisted ? 'Retiré des favoris' : 'Ajouté aux favoris', { icon: wishlisted ? '💔' : '❤️' })
                }}
                className={`flex-1 flex items-center justify-center gap-2 border py-3 text-sm font-medium transition-all ${wishlisted ? 'border-red-300 text-red-500 bg-red-50' : 'border-beige-300 text-forest hover:border-gold hover:text-gold'}`}
              >
                <Heart size={16} className={wishlisted ? 'fill-red-500' : ''} />
                {wishlisted ? 'Dans mes favoris' : 'Ajouter aux favoris'}
              </button>
              <button className="w-12 border border-beige-300 flex items-center justify-center text-forest hover:text-gold hover:border-gold transition-all">
                <Share2 size={16} />
              </button>
            </div>

            {/* Guarantees */}
            <div className="bg-beige-50 border border-beige-200 p-5 space-y-3">
              {[
                { icon: Package, text: 'Livraison en 48-72h · Paiement à la livraison' },
                { icon: RotateCcw, text: 'Retours acceptés sous 30 jours' },
                { icon: Shield, text: 'Produits authentiques · 100% garantis' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-forest">
                  <Icon size={15} className="text-gold flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-beige-200 pt-12">
          <div className="flex gap-8 border-b border-beige-200 mb-8">
            {(['description', 'ingredients', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium uppercase tracking-[0.1em] border-b-2 -mb-px transition-all ${
                  activeTab === tab ? 'border-gold text-forest' : 'border-transparent text-muted-foreground hover:text-forest'
                }`}
              >
                {tab === 'description' ? 'Description' : tab === 'ingredients' ? 'Composition' : `Avis (${product.reviews?.length || 0})`}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="max-w-3xl">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
              {product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-xs border border-beige-300 text-forest px-3 py-1.5 hover:border-gold cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="max-w-3xl">
              <p className="text-muted-foreground text-sm leading-relaxed">
                Formule luxueuse à base d'ingrédients botaniques soigneusement sélectionnés. Testée dermatologiquement, sans parabènes, sans sulfates. Convient à tous les types de peau.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <ReviewSection
              productId={product.id}
              reviews={product.reviews || []}
              onReviewAdded={() => {
                fetch(`/api/products/${slug}`).then(r => r.json()).then(setProduct)
              }}
            />
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-10">
              <p className="section-subtitle mb-2">Vous aimerez aussi</p>
              <h2 className="section-title">Produits Similaires</h2>
              <div className="gold-divider" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

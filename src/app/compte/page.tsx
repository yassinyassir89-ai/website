'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Package, Heart, MapPin, LogOut, ChevronRight, ChevronDown, ChevronUp, Phone, MapPin as MapPinIcon } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatDate, formatPrice } from '@/lib/utils'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/types'
import type { Order, OrderStatus } from '@/types'

function parseAddress(raw: any) {
  if (!raw) return {}
  if (typeof raw === 'string') { try { return JSON.parse(raw) } catch { return {} } }
  return raw
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false)
  const addr = parseAddress(order.shippingAddress)
  const status = order.status as OrderStatus
  const statusColor = ORDER_STATUS_COLORS[status] || 'bg-gray-100 text-gray-700'
  const statusLabel = ORDER_STATUS_LABELS[status] || order.status

  const steps = ['EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'EXPEDIEE', 'LIVREE']
  const currentStep = steps.indexOf(order.status)

  return (
    <div className="bg-white shadow-soft overflow-hidden">
      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <div>
          <p className="font-medium text-forest text-sm">#{order.orderNumber}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{formatDate(order.createdAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-3 py-1.5 rounded font-medium ${statusColor}`}>
            {statusLabel}
          </span>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-forest transition-colors">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Progress bar (not annulée) */}
      {order.status !== 'ANNULEE' && currentStep >= 0 && (
        <div className="px-5 pb-4">
          <div className="flex items-center gap-1">
            {steps.map((step, i) => (
              <div key={step} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentStep ? 'bg-gold' : 'bg-beige-200'}`} />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {['Reçue', 'Confirmée', 'En prépa.', 'Expédiée', 'Livrée'].map((label, i) => (
              <span key={label} className={`text-[9px] ${i <= currentStep ? 'text-gold font-medium' : 'text-gray-300'}`}>{label}</span>
            ))}
          </div>
        </div>
      )}

      {/* Items preview */}
      <div className="px-5 pb-4 flex items-center gap-2">
        {order.items?.slice(0, 4).map((item) => (
          item.image && (
            <div key={item.id} className="w-12 h-14 bg-beige-100 overflow-hidden rounded shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
          )
        ))}
        {(order.items?.length || 0) > 4 && (
          <div className="w-12 h-14 bg-beige-100 rounded flex items-center justify-center text-xs text-gray-400 font-medium">
            +{(order.items?.length || 0) - 4}
          </div>
        )}
        <div className="ml-auto text-right">
          <p className="font-serif text-lg text-forest">{formatPrice(order.total)}</p>
          <p className="text-xs text-muted-foreground">{order.items?.length || 0} article(s)</p>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-beige-100"
          >
            <div className="p-5 space-y-4">
              {/* Articles */}
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Articles</p>
                <div className="space-y-2">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-sm">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-10 h-12 object-cover rounded bg-beige-100 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-forest truncate">{item.name}</p>
                        {item.variant && <p className="text-xs text-gray-400">{item.variant}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                        <p className="text-xs text-gray-400">x{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Livraison */}
              {(addr.firstName || addr.phone || addr.city) && (
                <div className="border-t border-beige-100 pt-4">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Livraison</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    {(addr.firstName || addr.lastName) && (
                      <p className="font-medium text-forest">{addr.firstName} {addr.lastName}</p>
                    )}
                    {addr.phone && (
                      <p className="flex items-center gap-1.5"><Phone size={12} className="text-gray-400" />{addr.phone}</p>
                    )}
                    {addr.city && (
                      <p className="flex items-center gap-1.5"><MapPinIcon size={12} className="text-gray-400" />{addr.city}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-beige-100 pt-4 space-y-1 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Sous-total</span><span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between font-semibold text-forest pt-1">
                  <span>Total</span><span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const tabs = [
  { id: 'profil', label: 'Mon Profil', icon: User },
  { id: 'commandes', label: 'Mes Commandes', icon: Package },
  { id: 'wishlist', label: 'Mes Favoris', icon: Heart },
  { id: 'adresses', label: 'Mes Adresses', icon: MapPin },
]

export default function ComptePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'profil'
  const [orders, setOrders] = useState<Order[]>([])
  const wishlistItems = useWishlistStore((s) => s.items)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/connexion')
    if (status === 'authenticated') {
      fetch('/api/orders').then((r) => r.json()).then((data) => setOrders(data.orders || []))
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-beige-50">
        {/* Header */}
        <div className="bg-forest py-14">
          <div className="luxury-container">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-2xl">
                  {session.user.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold mb-1">Mon Compte</p>
                <h1 className="font-serif text-3xl text-beige-50">{session.user.name}</h1>
                <p className="text-beige-300 text-sm">{session.user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="luxury-container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="bg-white shadow-soft">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => router.push(`/compte?tab=${tab.id}`)}
                    className={`flex items-center justify-between w-full px-5 py-4 text-sm transition-all border-b border-beige-100 last:border-0 ${
                      activeTab === tab.id ? 'bg-forest text-beige-50' : 'text-forest hover:bg-beige-50 hover:text-gold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon size={16} />
                      {tab.label}
                    </div>
                    <ChevronRight size={14} />
                  </button>
                ))}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-3 w-full px-5 py-4 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Déconnexion
                </button>
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profil' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white shadow-soft p-8">
                  <h2 className="font-serif text-2xl text-forest mb-6">Informations Personnelles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { label: 'Nom complet', value: session.user.name },
                      { label: 'Email', value: session.user.email },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1.5">{label}</p>
                        <p className="text-forest font-medium">{value || '—'}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-beige-200">
                    <h3 className="font-medium text-forest mb-4">Sécurité</h3>
                    <button className="btn-luxury-outline px-6 py-3 text-xs">
                      Changer le mot de passe
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'commandes' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-2xl text-forest mb-6">Mes Commandes ({orders.length})</h2>
                  {orders.length === 0 ? (
                    <div className="bg-white shadow-soft p-12 text-center">
                      <Package size={40} className="text-beige-300 mx-auto mb-4" />
                      <p className="font-serif text-xl text-forest mb-2">Aucune commande</p>
                      <p className="text-muted-foreground text-sm mb-6">Vous n'avez pas encore passé de commande.</p>
                      <a href="/boutique" className="btn-luxury inline-flex">Explorer la Boutique</a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'wishlist' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="font-serif text-2xl text-forest mb-6">Mes Favoris ({wishlistItems.length})</h2>
                  {wishlistItems.length === 0 ? (
                    <div className="bg-white shadow-soft p-12 text-center">
                      <Heart size={40} className="text-beige-300 mx-auto mb-4" />
                      <p className="font-serif text-xl text-forest mb-2">Aucun favori</p>
                      <p className="text-muted-foreground text-sm mb-6">Ajoutez des produits à vos favoris.</p>
                      <a href="/boutique" className="btn-luxury inline-flex">Explorer la Boutique</a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="group">
                          <a href={`/produit/${item.slug}`} className="block relative overflow-hidden aspect-product bg-beige-100 mb-3">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </a>
                          <a href={`/produit/${item.slug}`} className="text-sm font-medium text-forest hover:text-gold block">{item.name}</a>
                          <p className="text-sm text-gold mt-1">{formatPrice(item.price)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'adresses' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white shadow-soft p-8">
                  <h2 className="font-serif text-2xl text-forest mb-6">Mes Adresses</h2>
                  <p className="text-muted-foreground text-sm">Vous n'avez pas encore sauvegardé d'adresse.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Eye, X, Package, Phone, Mail, MapPin, FileText } from 'lucide-react'
import { formatDate, formatPrice } from '@/lib/utils'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/types'
import type { Order, OrderItem, OrderStatus } from '@/types'
import toast from 'react-hot-toast'

function parseAddress(raw: any) {
  if (!raw) return {}
  if (typeof raw === 'string') {
    try { return JSON.parse(raw) } catch { return {} }
  }
  return raw
}

export default function AdminCommandesPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    const res = await fetch('/api/admin/orders')
    const data = await res.json()
    setOrders(data.orders || [])
    setLoading(false)
  }

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      toast.success('Statut mis à jour')
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
      if (selectedOrder?.id === orderId) setSelectedOrder(prev => prev ? { ...prev, status } : null)
    }
  }

  const filtered = orders.filter((o) => {
    const addr = parseAddress(o.shippingAddress)
    const clientName = `${addr.firstName || ''} ${addr.lastName || ''}`.toLowerCase()
    const matchSearch = !search ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      clientName.includes(search.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !statusFilter || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const statCounts = Object.keys(ORDER_STATUS_LABELS).reduce((acc, key) => {
    acc[key] = orders.filter(o => o.status === key).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h1>
        <span className="text-sm text-gray-500">{orders.length} commande(s) total</span>
      </div>

      {/* Stats badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(ORDER_STATUS_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(statusFilter === key ? '' : key)}
            className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all border ${
              statusFilter === key ? 'ring-2 ring-offset-1 ring-gray-400' : ''
            } ${ORDER_STATUS_COLORS[key as OrderStatus]}`}
          >
            {label} ({statCounts[key] || 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-4 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Chercher N° commande, client, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Commande', 'Client', 'Date', 'Articles', 'Total', 'Statut', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs uppercase tracking-wider text-gray-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <tr key={i}>
                  {Array(7).fill(0).map((_, j) => (
                    <td key={j} className="px-5 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded" /></td>
                  ))}
                </tr>
              ))
            ) : filtered.map((order) => {
              const addr = parseAddress(order.shippingAddress)
              return (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="px-5 py-4 font-medium text-gray-900">#{order.orderNumber}</td>
                  <td className="px-5 py-4">
                    <div className="text-gray-800 font-medium">{addr.firstName} {addr.lastName}</div>
                    <div className="text-gray-400 text-xs">{addr.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{formatDate(order.createdAt)}</td>
                  <td className="px-5 py-4 text-gray-600">{order.items?.length || 0} article(s)</td>
                  <td className="px-5 py-4 font-semibold">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                      className={`text-xs px-2 py-1.5 rounded font-medium border-0 cursor-pointer focus:outline-none ${ORDER_STATUS_COLORS[order.status as OrderStatus]}`}
                    >
                      {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setSelectedOrder(order)} className="text-gold hover:text-gold-dark">
                      <Eye size={16} />
                    </button>
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Aucune commande trouvée</div>
        )}
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white max-w-xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-5 border-b">
                <div>
                  <h3 className="font-serif text-lg text-forest">#{selectedOrder.orderNumber}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateStatus(selectedOrder.id, e.target.value as OrderStatus)}
                    className={`text-xs px-2 py-1.5 rounded font-medium border-0 cursor-pointer focus:outline-none ${ORDER_STATUS_COLORS[selectedOrder.status as OrderStatus]}`}
                  >
                    {Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-5">
                {/* Client info */}
                {(() => {
                  const addr = parseAddress(selectedOrder.shippingAddress)
                  return (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-medium">Informations client</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Package size={14} className="text-gray-400 shrink-0" />
                          <span className="font-medium">{addr.firstName} {addr.lastName}</span>
                        </div>
                        {addr.email && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail size={14} className="text-gray-400 shrink-0" />
                            <span>{addr.email}</span>
                          </div>
                        )}
                        {addr.phone && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone size={14} className="text-gray-400 shrink-0" />
                            <span>{addr.phone}</span>
                          </div>
                        )}
                        {addr.address && (
                          <div className="flex items-start gap-2 text-gray-600">
                            <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                            <span>{addr.address}, {addr.city}{addr.postalCode ? ` ${addr.postalCode}` : ''}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })()}

                {/* Items */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-medium">Articles commandés</h4>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item: OrderItem) => (
                      <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                          {item.variant && <p className="text-xs text-gray-400">{item.variant}</p>}
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                          <p className="text-xs text-gray-400">x{item.quantity} × {formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-400 mb-2 font-medium">Notes</h4>
                    <div className="flex items-start gap-2 text-sm text-gray-600 bg-yellow-50 p-3 rounded">
                      <FileText size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                      <span>{selectedOrder.notes}</span>
                    </div>
                  </div>
                )}

                {/* Totals */}
                <div className="border-t pt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Livraison</span>
                    <span>{selectedOrder.shippingCost === 0 ? 'Gratuit' : formatPrice(selectedOrder.shippingCost)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-1 border-t">
                    <span>Total</span>
                    <span className="text-forest">{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShoppingBag, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Eye
} from 'lucide-react'
import Link from 'next/link'
import { formatPrice, formatDate } from '@/lib/utils'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/types'

interface Stats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  totalUsers: number
  recentOrders: any[]
  ordersByStatus: Record<string, number>
}

function StatCard({ title, value, change, icon: Icon, href, color }: any) {
  const isPositive = change >= 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-xs text-gold mt-3 hover:text-gold-dark">
          Voir détails <Eye size={11} />
        </Link>
      )}
    </motion.div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => { setStats(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
        <p className="text-sm text-gray-500 mt-1">Bienvenue dans l'administration Grow Beauty</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Commandes totales"
          value={loading ? '...' : stats?.totalOrders ?? 0}
          change={12}
          icon={ShoppingBag}
          href="/admin/commandes"
          color="bg-forest"
        />
        <StatCard
          title="Chiffre d'affaires"
          value={loading ? '...' : formatPrice(stats?.totalRevenue ?? 0)}
          change={8}
          icon={TrendingUp}
          color="bg-gold"
        />
        <StatCard
          title="Produits"
          value={loading ? '...' : stats?.totalProducts ?? 0}
          icon={Package}
          href="/admin/produits"
          color="bg-blue-500"
        />
        <StatCard
          title="Clients"
          value={loading ? '...' : stats?.totalUsers ?? 0}
          change={5}
          icon={Users}
          href="/admin/utilisateurs"
          color="bg-purple-500"
        />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Commandes Récentes</h2>
            <Link href="/admin/commandes" className="text-xs text-gold hover:text-gold-dark">
              Voir tout →
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 animate-pulse rounded" />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-xs uppercase tracking-wider text-gray-400 font-medium">Commande</th>
                    <th className="text-left py-2 text-xs uppercase tracking-wider text-gray-400 font-medium">Client</th>
                    <th className="text-left py-2 text-xs uppercase tracking-wider text-gray-400 font-medium">Total</th>
                    <th className="text-left py-2 text-xs uppercase tracking-wider text-gray-400 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {(stats?.recentOrders || []).map((order: any) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-3 font-medium text-gray-900">#{order.orderNumber}</td>
                      <td className="py-3 text-gray-600">{order.user?.name || 'Client'}</td>
                      <td className="py-3 font-medium">{formatPrice(order.total)}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${ORDER_STATUS_COLORS[order.status as keyof typeof ORDER_STATUS_COLORS]}`}>
                          {ORDER_STATUS_LABELS[order.status as keyof typeof ORDER_STATUS_LABELS]}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
                    <tr><td colSpan={4} className="py-8 text-center text-gray-400 text-sm">Aucune commande</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order status */}
        <div className="bg-white shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Statut des Commandes</h2>
          <div className="space-y-3">
            {Object.entries(ORDER_STATUS_LABELS).map(([status, label]) => {
              const count = stats?.ordersByStatus?.[status] || 0
              const total = stats?.totalOrders || 1
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-medium text-gray-900">{count}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full"
                      style={{ width: `${(count / total) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

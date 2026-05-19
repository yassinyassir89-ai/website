'use client'

import { useEffect, useState } from 'react'
import { Search, User, Shield } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { User as UserType } from '@/types'

export default function AdminUtilisateursPage() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((data) => { setUsers(data.users || []); setLoading(false) })
  }, [])

  const filtered = users.filter((u) =>
    !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search)
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
        <span className="text-sm text-gray-500">{users.length} utilisateur(s)</span>
      </div>

      <div className="relative max-w-sm mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-gold"
        />
      </div>

      <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Utilisateur', 'Email', 'Rôle', 'Commandes', 'Inscrit le'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs uppercase tracking-wider text-gray-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <tr key={i}>{Array(5).fill(0).map((_, j) => <td key={j} className="px-5 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded" /></td>)}</tr>
              ))
            ) : filtered.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-beige-200 flex items-center justify-center">
                      <User size={15} className="text-forest" />
                    </div>
                    <span className="font-medium text-gray-900">{user.name || '—'}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-600">{user.email}</td>
                <td className="px-5 py-4">
                  <span className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full w-fit font-medium ${user.role === 'ADMIN' ? 'bg-gold/10 text-gold' : 'bg-gray-100 text-gray-600'}`}>
                    {user.role === 'ADMIN' && <Shield size={11} />}
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">{user._count?.orders ?? 0}</td>
                <td className="px-5 py-4 text-gray-500">{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Aucun utilisateur trouvé</div>
        )}
      </div>
    </div>
  )
}

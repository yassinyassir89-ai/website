'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, X } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Category } from '@/types'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCat, setEditingCat] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: '', description: '', image: '' })

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    const res = await fetch('/api/categories')
    const data = await res.json()
    setCategories(data.categories || [])
    setLoading(false)
  }

  const openModal = (cat?: Category) => {
    if (cat) {
      setEditingCat(cat)
      setForm({ name: cat.name, description: cat.description || '', image: cat.image || '' })
    } else {
      setEditingCat(null)
      setForm({ name: '', description: '', image: '' })
    }
    setIsModalOpen(true)
  }

  const save = async () => {
    const url = editingCat ? `/api/categories/${editingCat.id}` : '/api/categories'
    const method = editingCat ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) {
      toast.success(editingCat ? 'Catégorie mise à jour' : 'Catégorie créée')
      setIsModalOpen(false)
      fetchCategories()
    } else {
      toast.error('Erreur')
    }
  }

  const deleteCat = async (id: string) => {
    if (!confirm('Supprimer cette catégorie ?')) return
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
    if (res.ok) { toast.success('Catégorie supprimée'); fetchCategories() }
  }

  const roots = categories.filter((c) => !c.parentId)
  const children = (parentId: string) => categories.filter((c) => c.parentId === parentId)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h1>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-forest text-white px-4 py-2.5 text-sm hover:bg-forest-light transition-colors">
          <Plus size={16} /> Nouvelle Catégorie
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          Array(6).fill(0).map((_, i) => <div key={i} className="h-32 bg-white animate-pulse shadow-sm" />)
        ) : roots.map((cat) => (
          <div key={cat.id} className="bg-white shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              <div className="flex gap-2">
                <button onClick={() => openModal(cat)} className="text-blue-500 hover:text-blue-700"><Edit size={14} /></button>
                <button onClick={() => deleteCat(cat.id)} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
            {cat.description && <p className="text-sm text-gray-500 mb-3">{cat.description}</p>}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{cat._count?.products || 0} produit(s)</span>
              {children(cat.id).length > 0 && <span>{children(cat.id).length} sous-catégorie(s)</span>}
            </div>
            {children(cat.id).length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
                {children(cat.id).map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between text-sm text-gray-600 py-1">
                    <span>↳ {sub.name}</span>
                    <div className="flex gap-2">
                      <button onClick={() => openModal(sub)} className="text-blue-400 hover:text-blue-600"><Edit size={12} /></button>
                      <button onClick={() => deleteCat(sub.id)} className="text-red-300 hover:text-red-500"><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-gray-900">{editingCat ? 'Modifier' : 'Nouvelle Catégorie'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase text-gray-500 mb-1.5 block">Nom *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
              </div>
              <div>
                <label className="text-xs uppercase text-gray-500 mb-1.5 block">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold resize-none" />
              </div>
              <div>
                <label className="text-xs uppercase text-gray-500 mb-1.5 block">Image URL</label>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 bg-forest text-white py-2.5 text-sm hover:bg-forest-light transition-colors">Sauvegarder</button>
              <button onClick={() => setIsModalOpen(false)} className="px-5 border border-gray-200 text-gray-700 text-sm">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

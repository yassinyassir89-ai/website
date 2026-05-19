'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Edit, Trash2, Eye, X, Link as LinkIcon, GripVertical } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, type ProductInput } from '@/lib/validations'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'
import type { Product, Category } from '@/types'

function ImageManager({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')

  const addUrl = () => {
    const url = urlInput.trim()
    if (!url) return
    if (!url.startsWith('http')) {
      setError('URL doit commencer par http')
      return
    }
    if (images.includes(url)) {
      setError('Image déjà ajoutée')
      return
    }
    onChange([...images, url])
    setUrlInput('')
    setError('')
  }

  const remove = (idx: number) => onChange(images.filter((_, i) => i !== idx))

  const moveUp = (idx: number) => {
    if (idx === 0) return
    const next = [...images]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    onChange(next)
  }

  return (
    <div className="space-y-3">
      <label className="text-xs uppercase text-gray-500 block">Photos du produit</label>

      {/* URL input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="url"
            value={urlInput}
            onChange={(e) => { setUrlInput(e.target.value); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrl())}
            placeholder="https://images.unsplash.com/..."
            className="w-full pl-8 pr-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-gold"
          />
        </div>
        <button
          type="button"
          onClick={addUrl}
          className="px-4 py-2.5 bg-forest text-white text-sm hover:bg-forest-light transition-colors whitespace-nowrap"
        >
          + Ajouter
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((url, idx) => (
            <div key={url} className="relative group">
              <div className="relative aspect-square bg-beige-100 overflow-hidden border border-gray-100">
                <Image
                  src={url}
                  alt={`Photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                  onError={() => remove(idx)}
                />
                {idx === 0 && (
                  <span className="absolute bottom-0 inset-x-0 bg-forest/80 text-white text-[9px] text-center py-0.5 uppercase tracking-wider">
                    Principale
                  </span>
                )}
              </div>

              <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="w-6 h-6 bg-red-500 text-white flex items-center justify-center rounded-full shadow"
                >
                  <X size={12} />
                </button>
                {idx > 0 && (
                  <button
                    type="button"
                    onClick={() => moveUp(idx)}
                    title="Mettre en principale"
                    className="w-6 h-6 bg-gold text-white flex items-center justify-center rounded-full shadow"
                  >
                    <GripVertical size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="border border-dashed border-gray-200 py-8 text-center text-xs text-gray-400">
          Aucune photo — ajoutez une URL ci-dessus
        </div>
      )}

      <p className="text-[11px] text-gray-400">
        {images.length} photo(s) · La première est la photo principale · Hover → icône ★ pour changer l'ordre
      </p>
    </div>
  )
}

export default function AdminProduitsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
  })

  useEffect(() => {
    fetchProducts()
    fetch('/api/categories').then((r) => r.json()).then((d) => setCategories(d.categories || []))
  }, [])

  const fetchProducts = async () => {
    const res = await fetch('/api/admin/products')
    const data = await res.json()
    setProducts(data.products || [])
    setLoading(false)
  }

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setValue('name', product.name)
      setValue('description', product.description)
      setValue('shortDesc', product.shortDesc || '')
      setValue('price', product.price)
      setValue('comparePrice', product.comparePrice || undefined)
      setValue('stock', product.stock)
      setValue('categoryId', product.categoryId)
      setValue('images', product.images)
      setValue('tags', product.tags)
      setValue('featured', product.featured)
      setValue('isNew', product.isNew)
      setValue('isBestSeller', product.isBestSeller)
      setCurrentImages(product.images)
    } else {
      setEditingProduct(null)
      reset()
      setCurrentImages([])
    }
    setIsModalOpen(true)
  }

  const handleImagesChange = (imgs: string[]) => {
    setCurrentImages(imgs)
    setValue('images', imgs)
  }

  const onSubmit = async (data: ProductInput) => {
    setSubmitting(true)
    const payload = { ...data, images: currentImages }
    const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products'
    const method = editingProduct ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (res.ok) {
      toast.success(editingProduct ? 'Produit mis à jour' : 'Produit créé')
      setIsModalOpen(false)
      fetchProducts()
    } else {
      toast.error('Erreur lors de la sauvegarde')
    }
    setSubmitting(false)
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Produit supprimé')
      fetchProducts()
    }
  }

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
        <button onClick={() => openModal()} className="flex items-center gap-2 bg-forest text-white px-4 py-2.5 text-sm font-medium hover:bg-forest-light transition-colors">
          <Plus size={16} /> Nouveau Produit
        </button>
      </div>

      <div className="relative max-w-sm mb-5">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-gold"
        />
      </div>

      <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Produit', 'Catégorie', 'Prix', 'Stock', 'Statut', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs uppercase tracking-wider text-gray-400 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <tr key={i}>{Array(6).fill(0).map((_, j) => <td key={j} className="px-5 py-4"><div className="h-4 bg-gray-100 animate-pulse rounded" /></td>)}</tr>
              ))
            ) : filtered.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-14 bg-beige-100 flex-shrink-0 overflow-hidden">
                      {product.images[0] ? (
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="48px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] text-center">Pas de photo</div>
                      )}
                      {product.images.length > 1 && (
                        <span className="absolute bottom-0 right-0 bg-forest text-white text-[9px] px-1">+{product.images.length - 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-600">{product.category?.name || '—'}</td>
                <td className="px-5 py-4">
                  <div>
                    <span className="font-semibold">{formatPrice(product.price)}</span>
                    {product.comparePrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(product.comparePrice)}</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`font-medium ${product.stock === 0 ? 'text-red-600' : product.stock <= 10 ? 'text-orange-500' : 'text-green-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {product.isActive ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => openModal(product)} className="text-blue-500 hover:text-blue-700">
                      <Edit size={15} />
                    </button>
                    <a href={`/produit/${product.slug}`} target="_blank" className="text-gray-400 hover:text-gray-600">
                      <Eye size={15} />
                    </a>
                    <button onClick={() => deleteProduct(product.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">Aucun produit trouvé</div>
        )}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-2xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingProduct ? 'Modifier le produit' : 'Nouveau Produit'}
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs uppercase text-gray-500 mb-1.5 block">Nom du produit *</label>
                    <input {...register('name')} className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase text-gray-500 mb-1.5 block">Prix (MAD) *</label>
                    <input {...register('price', { valueAsNumber: true })} type="number" step="0.01" className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                    {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase text-gray-500 mb-1.5 block">Prix barré</label>
                    <input {...register('comparePrice', { valueAsNumber: true })} type="number" step="0.01" className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-gray-500 mb-1.5 block">Stock *</label>
                    <input {...register('stock', { valueAsNumber: true })} type="number" className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                    {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs uppercase text-gray-500 mb-1.5 block">Catégorie *</label>
                    <select {...register('categoryId')} className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold">
                      <option value="">Sélectionner...</option>
                      {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                    </select>
                    {errors.categoryId && <p className="text-xs text-red-500 mt-1">{errors.categoryId.message}</p>}
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs uppercase text-gray-500 mb-1.5 block">Description courte</label>
                    <input {...register('shortDesc')} className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs uppercase text-gray-500 mb-1.5 block">Description complète *</label>
                    <textarea {...register('description')} rows={4} className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-gold resize-none" />
                    {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                  </div>

                  {/* Image Manager */}
                  <div className="col-span-2">
                    <ImageManager images={currentImages} onChange={handleImagesChange} />
                  </div>

                  <div className="col-span-2 flex gap-6">
                    {[
                      { field: 'featured', label: 'En vedette' },
                      { field: 'isNew', label: 'Nouveau' },
                      { field: 'isBestSeller', label: 'Best-seller' },
                    ].map(({ field, label }) => (
                      <label key={field} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input {...register(field as any)} type="checkbox" className="accent-forest" />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={submitting} className="flex-1 bg-forest text-white py-3 text-sm font-medium hover:bg-forest-light transition-colors disabled:opacity-70">
                    {submitting ? 'Sauvegarde...' : editingProduct ? 'Mettre à jour' : 'Créer le produit'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 border border-gray-200 text-gray-700 text-sm hover:bg-gray-50">
                    Annuler
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

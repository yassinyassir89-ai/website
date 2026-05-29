'use client'

import { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Code, Copy, Check, RotateCcw, Edit, ArrowLeft, ImageOff
} from 'lucide-react'
import { mockProducts, mockCategories, mockBrands, type MockProduct } from '@/lib/data'

type EditFormState = {
  id: string
  nameFr: string
  nameAr: string
  categoryFr: string
  categoryAr: string
  descriptionFr: string
  descriptionAr: string
  price: number
  originalPrice: number | ''
  rating: number
  reviews: number
  image: string
  badgeFr: string
  badgeAr: string
  isNew: boolean
  isBestSeller: boolean
  brandId: string
}

function productToForm(product: MockProduct): EditFormState {
  return {
    id: product.id,
    nameFr: product.name.fr,
    nameAr: product.name.ar,
    categoryFr: product.category.fr,
    categoryAr: product.category.ar,
    descriptionFr: product.description?.fr ?? '',
    descriptionAr: product.description?.ar ?? '',
    price: product.price,
    originalPrice: product.originalPrice ?? '',
    rating: product.rating,
    reviews: product.reviews,
    image: product.image,
    badgeFr: product.badge?.fr ?? '',
    badgeAr: product.badge?.ar ?? '',
    isNew: product.isNew ?? false,
    isBestSeller: product.isBestSeller ?? false,
    brandId: product.brandId ?? '',
  }
}

function generateProductCode(form: EditFormState): string {
  const lines: string[] = ['  {']
  lines.push(`    id: ${JSON.stringify(form.id)},`)
  lines.push(`    name: { fr: ${JSON.stringify(form.nameFr)}, ar: ${JSON.stringify(form.nameAr)} },`)
  lines.push(`    category: { fr: ${JSON.stringify(form.categoryFr)}, ar: ${JSON.stringify(form.categoryAr)} },`)
  if (form.descriptionFr || form.descriptionAr) {
    lines.push(`    description: {`)
    lines.push(`      fr: ${JSON.stringify(form.descriptionFr)},`)
    lines.push(`      ar: ${JSON.stringify(form.descriptionAr)},`)
    lines.push(`    },`)
  }
  lines.push(`    price: ${form.price},`)
  if (form.originalPrice && Number(form.originalPrice) > form.price) {
    lines.push(`    originalPrice: ${form.originalPrice},`)
  }
  lines.push(`    rating: ${form.rating},`)
  lines.push(`    reviews: ${form.reviews},`)
  lines.push(`    image: ${JSON.stringify(form.image)},`)
  if (form.badgeFr || form.badgeAr) {
    lines.push(`    badge: { fr: ${JSON.stringify(form.badgeFr)}, ar: ${JSON.stringify(form.badgeAr)} },`)
  }
  if (form.isNew) lines.push(`    isNew: true,`)
  if (form.isBestSeller) lines.push(`    isBestSeller: true,`)
  if (form.brandId) lines.push(`    brandId: ${JSON.stringify(form.brandId)},`)
  lines.push('  },')
  return lines.join('\n')
}

export function ProductEditor() {
  const t = useTranslations('builder.edit')
  const tForm = useTranslations('builder.form')
  const tRoot = useTranslations('builder')
  const locale = useLocale()
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [form, setForm] = useState<EditFormState | null>(null)
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [imageError, setImageError] = useState(false)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return mockProducts
    return mockProducts.filter((p) =>
      p.name.fr.toLowerCase().includes(q) ||
      p.name.ar.includes(search.trim()) ||
      p.id.includes(q) ||
      p.category.fr.toLowerCase().includes(q)
    )
  }, [search])

  function loadProduct(product: MockProduct) {
    setSelectedId(product.id)
    setForm(productToForm(product))
    setGeneratedCode('')
    setImageError(false)
  }

  function goBack() {
    setSelectedId(null)
    setForm(null)
    setGeneratedCode('')
  }

  function updateField<K extends keyof EditFormState>(key: K, value: EditFormState[K]) {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev)
    if (key === 'image') setImageError(false)
  }

  function handleGenerate() {
    if (!form) return
    setGeneratedCode(generateProductCode(form))
  }

  function handleReset() {
    if (!selectedId) return
    const original = mockProducts.find((p) => p.id === selectedId)
    if (original) {
      setForm(productToForm(original))
      setGeneratedCode('')
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  // List mode
  if (!form) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="font-serif text-2xl text-ink mb-1">{t('title')}</h2>
          <p className="text-sm text-ink/60">{t('subtitle')}</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search')}
            className="w-full ps-11 pe-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
          />
        </div>

        {/* Products list */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-ink/50">{t('no_results')}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((product) => {
              const name = locale === 'ar' ? product.name.ar : product.name.fr
              return (
                <motion.button
                  key={product.id}
                  onClick={() => loadProduct(product)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl p-3 shadow-soft flex gap-3 items-center text-start hover:shadow-pink-lg transition-shadow"
                >
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-primary-light flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget
                        img.style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-mono text-ink/40">#{product.id}</span>
                      {product.isBestSeller && <span className="text-[9px] bg-gold text-white px-1.5 rounded-full">🏆</span>}
                      {product.isNew && <span className="text-[9px] bg-primary text-white px-1.5 rounded-full">✨</span>}
                    </div>
                    <p className="text-sm font-semibold text-ink line-clamp-2 leading-tight">{name}</p>
                    <p className="text-xs text-primary font-bold mt-0.5">{product.price} DH</p>
                  </div>
                  <Edit size={14} className="text-ink/30 flex-shrink-0" />
                </motion.button>
              )
            })}
          </div>
        )}

        <p className="text-xs text-ink/40 text-center pt-2">
          {mockProducts.length} {locale === 'ar' ? 'منتج إجمالاً' : 'produits au total'}
        </p>
      </div>
    )
  }

  // Edit mode (same form as add, but with id locked)
  const discount = form.originalPrice && Number(form.originalPrice) > form.price
    ? Math.round(((Number(form.originalPrice) - form.price) / Number(form.originalPrice)) * 100)
    : null

  return (
    <div className="space-y-4">
      {/* Back + Editing label */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {locale === 'ar' ? 'العودة للقائمة' : 'Retour à la liste'}
        </button>
        <div className="bg-primary-light px-3 py-1.5 rounded-full text-xs font-bold text-primary">
          {t('editing_label', { id: form.id })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        {/* Form */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                🇫🇷 {tForm('name_fr')}
              </label>
              <input
                type="text"
                value={form.nameFr}
                onChange={(e) => updateField('nameFr', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                🇲🇦 {tForm('name_ar')}
              </label>
              <input
                type="text"
                value={form.nameAr}
                onChange={(e) => updateField('nameAr', e.target.value)}
                dir="rtl"
                className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm font-tajawal"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                  {tForm('price')}
                </label>
                <input
                  type="number"
                  value={form.price || ''}
                  onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm font-bold text-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                  {tForm('original_price')}
                </label>
                <input
                  type="number"
                  value={form.originalPrice}
                  onChange={(e) => updateField('originalPrice', e.target.value ? parseFloat(e.target.value) : '')}
                  className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm line-through text-ink/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                {tForm('image_url')}
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => updateField('image', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={form.badgeFr}
                onChange={(e) => updateField('badgeFr', e.target.value)}
                placeholder={tForm('badge_text_fr')}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              />
              <input
                type="text"
                value={form.badgeAr}
                onChange={(e) => updateField('badgeAr', e.target.value)}
                placeholder={tForm('badge_text_ar')}
                dir="rtl"
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm font-tajawal"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isNew}
                  onChange={(e) => updateField('isNew', e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                {tForm('is_new')}
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isBestSeller}
                  onChange={(e) => updateField('isBestSeller', e.target.checked)}
                  className="w-4 h-4 accent-gold"
                />
                {tForm('is_bestseller')}
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                {tForm('brand')}
              </label>
              <select
                value={form.brandId}
                onChange={(e) => updateField('brandId', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              >
                <option value="">{tForm('no_brand')}</option>
                {mockBrands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                🇫🇷 Description
              </label>
              <textarea
                value={form.descriptionFr}
                onChange={(e) => updateField('descriptionFr', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                🇲🇦 الوصف
              </label>
              <textarea
                value={form.descriptionAr}
                onChange={(e) => updateField('descriptionAr', e.target.value)}
                dir="rtl"
                rows={3}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm resize-none font-tajawal"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 sticky bottom-4 bg-cream/90 backdrop-blur-sm p-3 rounded-2xl">
            <button
              type="button"
              onClick={handleGenerate}
              className="btn-primary flex-1"
            >
              <Code size={15} />
              {t('save_changes')}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm text-ink/60 hover:text-primary transition-colors flex items-center gap-1"
            >
              <RotateCcw size={14} />
              {tForm('reset')}
            </button>
          </div>
        </div>

        {/* Preview + Code */}
        <div className="space-y-5 lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3">
              {tForm('preview_label')}
            </p>

            <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-primary/10 max-w-[260px] mx-auto">
              <div className="relative aspect-product overflow-hidden bg-primary-light">
                {form.image && !imageError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.image}
                    alt={form.nameFr}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-primary/30">
                    <ImageOff size={36} />
                  </div>
                )}
                {form.badgeFr && (
                  <div className={`absolute top-3 start-3 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    form.isBestSeller ? 'bg-gold text-white' : form.isNew ? 'bg-primary text-white' : 'bg-ink text-white'
                  }`}>
                    {locale === 'ar' ? form.badgeAr : form.badgeFr}
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <p className="text-sm font-semibold text-ink leading-tight line-clamp-2 min-h-[2.5em]">
                  {locale === 'ar' ? form.nameAr : form.nameFr}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-primary">{form.price} DH</span>
                  {form.originalPrice && Number(form.originalPrice) > form.price && (
                    <span className="text-xs text-ink/40 line-through">{form.originalPrice} DH</span>
                  )}
                  {discount && (
                    <span className="ms-auto text-xs font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-full">
                      -{discount}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {generatedCode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-ink rounded-2xl p-5 shadow-pink-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center gap-2">
                    <Code size={14} />
                    Code de mise à jour
                  </p>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      copied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    {copied ? <><Check size={13} /> {tForm('copied')}</> : <><Copy size={13} /> {tForm('copy_code')}</>}
                  </button>
                </div>
                <pre className="text-[11px] text-green-300 font-mono overflow-x-auto whitespace-pre-wrap break-all bg-black/40 p-3 rounded-lg max-h-[400px] overflow-y-auto">
                  {generatedCode}
                </pre>

                <div className="mt-4 bg-gold-light/20 rounded-lg p-3 text-xs text-white/80">
                  <p className="font-semibold text-gold mb-1">{tRoot('form.next_steps')}:</p>
                  <pre className="whitespace-pre-wrap font-sans">{t('instructions_edit', { id: form.id })}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

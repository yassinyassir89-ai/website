'use client'

import { useState, useMemo, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Sparkles, Tag, Star, ShoppingBag, Copy, Check, RotateCcw,
  Plus, Trash2, Code, AlertCircle, FileText, Download
} from 'lucide-react'
import { mockCategories, mockBrands, mockProducts, type MockProduct } from '@/lib/data'

const STORAGE_KEY = 'grow-beauty-product-drafts'

type FormState = {
  id: string
  nameFr: string
  nameAr: string
  categoryFr: string
  categoryAr: string
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

function getNextId(): string {
  const ids = mockProducts.map((p) => parseInt(p.id, 10)).filter((n) => !isNaN(n))
  return String(Math.max(...ids, 0) + 1)
}

function emptyForm(): FormState {
  return {
    id: getNextId(),
    nameFr: '',
    nameAr: '',
    categoryFr: 'Soin du visage',
    categoryAr: 'العناية بالبشرة',
    price: 0,
    originalPrice: '',
    rating: 4.7,
    reviews: 0,
    image: '',
    badgeFr: '',
    badgeAr: '',
    isNew: false,
    isBestSeller: false,
    brandId: '',
  }
}

function generateProductCode(form: FormState): string {
  const lines: string[] = ['  {']
  lines.push(`    id: '${form.id}',`)
  lines.push(`    name: { fr: ${JSON.stringify(form.nameFr)}, ar: ${JSON.stringify(form.nameAr)} },`)
  lines.push(`    category: { fr: ${JSON.stringify(form.categoryFr)}, ar: ${JSON.stringify(form.categoryAr)} },`)
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

export function ProductBuilder() {
  const t = useTranslations('builder.form')
  const tRoot = useTranslations('builder')
  const locale = useLocale()
  const [form, setForm] = useState<FormState>(emptyForm())
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [drafts, setDrafts] = useState<FormState[]>([])

  // Load drafts from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setDrafts(JSON.parse(saved))
    } catch (e) {
      // ignore
    }
  }, [])

  // Persist drafts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
    } catch (e) {
      // ignore
    }
  }, [drafts])

  const discount = useMemo(() => {
    if (!form.originalPrice || Number(form.originalPrice) <= form.price) return null
    return Math.round((((form.originalPrice as number) - form.price) / (form.originalPrice as number)) * 100)
  }, [form.price, form.originalPrice])

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setImageError(false)
  }

  function applyCategoryPreset(catId: string) {
    const cat = mockCategories.find((c) => c.id === catId)
    if (cat) {
      updateField('categoryFr', cat.name.fr)
      updateField('categoryAr', cat.name.ar)
    }
  }

  function applyBadgePreset(type: 'new' | 'bestseller' | 'discount' | 'none') {
    if (type === 'new') {
      setForm((p) => ({ ...p, badgeFr: 'Nouveau', badgeAr: 'جديد', isNew: true, isBestSeller: false }))
    } else if (type === 'bestseller') {
      setForm((p) => ({ ...p, badgeFr: 'Bestseller', badgeAr: 'الأكثر مبيعاً', isNew: false, isBestSeller: true }))
    } else if (type === 'discount') {
      if (discount) {
        setForm((p) => ({ ...p, badgeFr: `-${discount}%`, badgeAr: `-${discount}%`, isNew: false, isBestSeller: false }))
      }
    } else {
      setForm((p) => ({ ...p, badgeFr: '', badgeAr: '', isNew: false, isBestSeller: false }))
    }
  }

  function handleGenerate() {
    const code = generateProductCode(form)
    setGeneratedCode(code)
  }

  async function handleCopy() {
    if (!generatedCode) return
    try {
      await navigator.clipboard.writeText(generatedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      // fallback if clipboard not available
    }
  }

  function handleReset() {
    setForm(emptyForm())
    setGeneratedCode('')
    setImageError(false)
  }

  function handleAddToDrafts() {
    setDrafts((prev) => [...prev, form])
    setForm({ ...emptyForm(), id: String(parseInt(form.id, 10) + 1) })
    setGeneratedCode('')
  }

  function handleRemoveDraft(idx: number) {
    setDrafts((prev) => prev.filter((_, i) => i !== idx))
  }

  function handleExportAll() {
    const allCode = [form, ...drafts]
      .filter((f) => f.nameFr && f.image && f.price > 0)
      .map(generateProductCode)
      .join('\n')
    setGeneratedCode(allCode)
  }

  function handleClearDrafts() {
    if (confirm(locale === 'ar' ? 'مسح كل المنتجات المسودة؟' : 'Effacer tous les brouillons ?')) {
      setDrafts([])
    }
  }

  const isValid = form.nameFr && form.nameAr && form.image && form.price > 0

  return (
    <div className="luxury-container py-8 md:py-12">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Code size={28} className="text-primary" />
          <h1 className="font-serif text-3xl md:text-4xl text-ink">{tRoot('title')}</h1>
        </div>
        <p className="text-ink/60">{tRoot('subtitle')}</p>
      </motion.div>

      {/* Drafts banner */}
      {drafts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gold-light rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3 justify-between"
        >
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-gold-dark" />
            <span className="text-sm font-semibold text-ink">
              {t('saved_count', { count: drafts.length })}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleExportAll}
              className="text-xs font-semibold bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors flex items-center gap-1.5"
            >
              <Download size={13} />
              {t('export_all')} ({drafts.length + (isValid ? 1 : 0)})
            </button>
            <button
              type="button"
              onClick={handleClearDrafts}
              className="text-xs text-red-500 hover:text-red-700 px-3"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
        {/* FORM */}
        <div className="space-y-5">
          {/* Basic info */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft space-y-4">
            <h2 className="font-serif text-lg text-ink flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              {t('basic_info')}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                  {t('id_label')}
                </label>
                <input
                  type="text"
                  value={form.id}
                  onChange={(e) => updateField('id', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
                />
                <p className="text-[10px] text-ink/40 mt-1">{t('id_hint')}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                  {t('category')}
                </label>
                <select
                  onChange={(e) => applyCategoryPreset(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
                >
                  {mockCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name.fr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                🇫🇷 {t('name_fr')}
              </label>
              <input
                type="text"
                value={form.nameFr}
                onChange={(e) => updateField('nameFr', e.target.value)}
                placeholder={t('name_fr_placeholder')}
                className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                🇲🇦 {t('name_ar')}
              </label>
              <input
                type="text"
                value={form.nameAr}
                onChange={(e) => updateField('nameAr', e.target.value)}
                placeholder={t('name_ar_placeholder')}
                dir="rtl"
                className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm font-tajawal"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft space-y-4">
            <h2 className="font-serif text-lg text-ink flex items-center gap-2">
              <Tag size={16} className="text-primary" />
              {t('pricing')}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                  {t('price')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={form.price || ''}
                    onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
                    min={0}
                    step={1}
                    className="w-full ps-3 pe-12 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm font-bold text-primary"
                  />
                  <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-ink/50 font-semibold">DH</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                  {t('original_price')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => updateField('originalPrice', e.target.value ? parseFloat(e.target.value) : '')}
                    min={0}
                    step={1}
                    className="w-full ps-3 pe-12 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm text-ink/60 line-through"
                  />
                  <span className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-ink/50 font-semibold">DH</span>
                </div>
                {discount && (
                  <p className="text-xs text-red-500 font-bold mt-1">-{discount}% économie</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                  ⭐ {t('rating')}
                </label>
                <input
                  type="number"
                  value={form.rating}
                  onChange={(e) => updateField('rating', Math.min(5, Math.max(0, parseFloat(e.target.value) || 0)))}
                  min={0}
                  max={5}
                  step={0.1}
                  className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                  {t('reviews')}
                </label>
                <input
                  type="number"
                  value={form.reviews}
                  onChange={(e) => updateField('reviews', parseInt(e.target.value, 10) || 0)}
                  min={0}
                  className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft space-y-3">
            <h2 className="font-serif text-lg text-ink flex items-center gap-2">
              📷 {t('image')}
            </h2>

            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                {t('image_url')}
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => updateField('image', e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3 py-2.5 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              />
              <p className="text-[10px] text-ink/40 mt-1">{t('image_url_hint')}</p>
            </div>

            {form.image && (
              <div className="relative w-32 h-40 rounded-xl overflow-hidden bg-primary-light border-2 border-primary/20">
                {!imageError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.image}
                    alt={form.nameFr || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-2 text-center">
                    <AlertCircle size={20} className="mb-1" />
                    <span className="text-[10px]">{t('image_error')}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft space-y-4">
            <h2 className="font-serif text-lg text-ink flex items-center gap-2">
              <Sparkles size={16} className="text-gold" />
              {t('badges')}
            </h2>

            <div>
              <p className="text-xs text-ink/60 mb-2">{t('badge_presets')}:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => applyBadgePreset('new')}
                  className="text-xs font-semibold bg-primary text-white px-3 py-1.5 rounded-full hover:opacity-90"
                >
                  ✨ {t('preset_new')}
                </button>
                <button
                  type="button"
                  onClick={() => applyBadgePreset('bestseller')}
                  className="text-xs font-semibold bg-gold text-white px-3 py-1.5 rounded-full hover:opacity-90"
                >
                  🏆 {t('preset_bestseller')}
                </button>
                <button
                  type="button"
                  onClick={() => applyBadgePreset('discount')}
                  disabled={!discount}
                  className="text-xs font-semibold bg-red-500 text-white px-3 py-1.5 rounded-full hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  🔥 -{discount ?? 'X'}%
                </button>
                <button
                  type="button"
                  onClick={() => applyBadgePreset('none')}
                  className="text-xs text-ink/60 px-3 py-1.5 rounded-full hover:bg-gray-100 border border-gray-200"
                >
                  {t('no_badge')}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={form.badgeFr}
                onChange={(e) => updateField('badgeFr', e.target.value)}
                placeholder={t('badge_text_fr')}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              />
              <input
                type="text"
                value={form.badgeAr}
                onChange={(e) => updateField('badgeAr', e.target.value)}
                placeholder={t('badge_text_ar')}
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
                {t('is_new')}
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isBestSeller}
                  onChange={(e) => updateField('isBestSeller', e.target.checked)}
                  className="w-4 h-4 accent-gold"
                />
                {t('is_bestseller')}
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                {t('brand')}
              </label>
              <select
                value={form.brandId}
                onChange={(e) => updateField('brandId', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              >
                <option value="">{t('no_brand')}</option>
                {mockBrands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 sticky bottom-4 bg-cream/90 backdrop-blur-sm p-3 rounded-2xl">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!isValid}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Code size={15} />
              {t('generate')}
            </button>
            <button
              type="button"
              onClick={handleAddToDrafts}
              disabled={!isValid}
              className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={15} />
              {t('add_another')}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm text-ink/60 hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <RotateCcw size={14} />
              {t('reset')}
            </button>
          </div>
        </div>

        {/* PREVIEW + CODE */}
        <div className="space-y-5 lg:sticky lg:top-24 h-fit">
          {/* Live preview */}
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3">
              {t('preview_label')}
            </p>

            <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-primary/10 max-w-[260px] mx-auto">
              {/* Image */}
              <div className="relative aspect-product overflow-hidden bg-primary-light">
                {form.image && !imageError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={form.image}
                    alt={form.nameFr || 'Preview'}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-primary/30">
                    <ShoppingBag size={36} />
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

              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={i < Math.floor(form.rating) ? 'fill-gold text-gold' : 'text-gray-200 fill-gray-200'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-ink/50">({form.reviews})</span>
                </div>

                <p className="text-sm font-semibold text-ink leading-tight line-clamp-2 min-h-[2.5em]">
                  {locale === 'ar' ? (form.nameAr || 'اسم المنتج') : (form.nameFr || 'Nom du produit')}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-primary">{form.price || 0} DH</span>
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

          {/* Drafts list */}
          {drafts.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-soft space-y-2">
              <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-2">
                Brouillons ({drafts.length})
              </p>
              {drafts.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-primary-light/40 rounded-lg p-2">
                  <span className="font-mono text-[10px] text-ink/50 w-6">#{d.id}</span>
                  <span className="flex-1 truncate text-ink">{d.nameFr}</span>
                  <span className="text-xs text-primary font-bold">{d.price} DH</span>
                  <button
                    onClick={() => handleRemoveDraft(i)}
                    className="text-ink/40 hover:text-red-500"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Generated code */}
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
                    Code généré
                  </p>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      copied ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    {copied ? <><Check size={13} /> {t('copied')}</> : <><Copy size={13} /> {t('copy_code')}</>}
                  </button>
                </div>
                <pre className="text-[11px] text-green-300 font-mono overflow-x-auto whitespace-pre-wrap break-all bg-black/40 p-3 rounded-lg max-h-[400px] overflow-y-auto">
                  {generatedCode}
                </pre>

                <div className="mt-4 bg-gold-light/20 rounded-lg p-3 text-xs text-white/80">
                  <p className="font-semibold text-gold mb-1">{tRoot('form.next_steps')}:</p>
                  <pre className="whitespace-pre-wrap font-sans">{tRoot('form.instructions')}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Tag, Image as ImageIcon, Globe, Code, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react'

type BrandFormState = {
  id: string
  name: string
  taglineFr: string
  taglineAr: string
  descriptionFr: string
  descriptionAr: string
  logo: string
  cover: string
  originFr: string
  originAr: string
}

function emptyBrandForm(): BrandFormState {
  return {
    id: '',
    name: '',
    taglineFr: '',
    taglineAr: '',
    descriptionFr: '',
    descriptionAr: '',
    logo: '',
    cover: '',
    originFr: 'France',
    originAr: 'فرنسا',
  }
}

function generateBrandCode(form: BrandFormState): string {
  const lines: string[] = ['  {']
  lines.push(`    id: ${JSON.stringify(form.id)},`)
  lines.push(`    name: ${JSON.stringify(form.name)},`)
  lines.push(`    tagline: { fr: ${JSON.stringify(form.taglineFr)}, ar: ${JSON.stringify(form.taglineAr)} },`)
  lines.push(`    description: {`)
  lines.push(`      fr: ${JSON.stringify(form.descriptionFr)},`)
  lines.push(`      ar: ${JSON.stringify(form.descriptionAr)},`)
  lines.push(`    },`)
  lines.push(`    logo: ${JSON.stringify(form.logo)},`)
  lines.push(`    cover: ${JSON.stringify(form.cover)},`)
  lines.push(`    origin: { fr: ${JSON.stringify(form.originFr)}, ar: ${JSON.stringify(form.originAr)} },`)
  lines.push(`    productCount: 0,`)
  lines.push('  },')
  return lines.join('\n')
}

export function BrandBuilder() {
  const t = useTranslations('builder.brand')
  const tRoot = useTranslations('builder')
  const [form, setForm] = useState<BrandFormState>(emptyBrandForm())
  const [generatedCode, setGeneratedCode] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [coverError, setCoverError] = useState(false)

  function updateField<K extends keyof BrandFormState>(key: K, value: BrandFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (key === 'logo') setLogoError(false)
    if (key === 'cover') setCoverError(false)
  }

  const isValid = useMemo(() => {
    return Boolean(
      form.id.trim() &&
      form.name.trim() &&
      form.taglineFr.trim() &&
      form.taglineAr.trim() &&
      form.descriptionFr.trim() &&
      form.descriptionAr.trim() &&
      form.logo.trim() &&
      form.cover.trim()
    )
  }, [form])

  function handleGenerate() {
    if (!isValid) return
    setGeneratedCode(generateBrandCode(form))
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  function handleReset() {
    setForm(emptyBrandForm())
    setGeneratedCode('')
    setLogoError(false)
    setCoverError(false)
  }

  function suggestIdFromName() {
    if (form.name && !form.id) {
      updateField('id', form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">
      {/* Form */}
      <div className="space-y-5">
        {/* Header */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft space-y-4">
          <h2 className="font-serif text-lg text-ink flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            {t('title')}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                {t('brand_name')} *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                onBlur={suggestIdFromName}
                placeholder="Nivea"
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                {t('brand_id')} *
              </label>
              <input
                type="text"
                value={form.id}
                onChange={(e) => updateField('id', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="nivea"
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm font-mono"
              />
              <p className="text-[10px] text-ink/40 mt-1">{t('brand_id_hint')}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
              🇫🇷 {t('tagline_fr')} *
            </label>
            <input
              type="text"
              value={form.taglineFr}
              onChange={(e) => updateField('taglineFr', e.target.value)}
              placeholder="La beauté révélée"
              className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
              🇲🇦 {t('tagline_ar')} *
            </label>
            <input
              type="text"
              value={form.taglineAr}
              onChange={(e) => updateField('taglineAr', e.target.value)}
              dir="rtl"
              placeholder="الجمال المُكتشف"
              className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm font-tajawal"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
              🇫🇷 {t('description_fr')} *
            </label>
            <textarea
              value={form.descriptionFr}
              onChange={(e) => updateField('descriptionFr', e.target.value)}
              rows={3}
              placeholder="Description complète de la marque en français..."
              className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
              🇲🇦 {t('description_ar')} *
            </label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => updateField('descriptionAr', e.target.value)}
              dir="rtl"
              rows={3}
              placeholder="وصف كامل للماركة بالعربية..."
              className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm resize-none font-tajawal"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                🇫🇷 {t('origin_fr')} *
              </label>
              <input
                type="text"
                value={form.originFr}
                onChange={(e) => updateField('originFr', e.target.value)}
                placeholder="France"
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
                🇲🇦 {t('origin_ar')} *
              </label>
              <input
                type="text"
                value={form.originAr}
                onChange={(e) => updateField('originAr', e.target.value)}
                dir="rtl"
                placeholder="فرنسا"
                className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm font-tajawal"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft space-y-4">
          <h3 className="font-serif text-lg text-ink flex items-center gap-2">
            <ImageIcon size={16} className="text-primary" />
            Images
          </h3>

          <div>
            <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
              {t('logo_url')} *
            </label>
            <input
              type="url"
              value={form.logo}
              onChange={(e) => updateField('logo', e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-1.5">
              {t('cover_url')} *
            </label>
            <input
              type="url"
              value={form.cover}
              onChange={(e) => updateField('cover', e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 sticky bottom-4 bg-cream/90 backdrop-blur-sm p-3 rounded-2xl">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!isValid}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Code size={15} />
            {tRoot('form.generate')}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm text-ink/60 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <RotateCcw size={14} />
            {tRoot('form.reset')}
          </button>
        </div>
      </div>

      {/* Preview + Code */}
      <div className="space-y-5 lg:sticky lg:top-24 h-fit">
        {/* Live preview */}
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3">
            {tRoot('form.preview_label')}
          </p>

          <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-primary/10">
            {/* Cover */}
            <div className="relative h-32 overflow-hidden bg-primary-light">
              {form.cover && !coverError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.cover}
                  alt="cover"
                  className="w-full h-full object-cover"
                  onError={() => setCoverError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary/30">
                  <Globe size={32} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
              <div className="absolute bottom-3 start-4">
                <h3 className="font-serif text-xl text-white tracking-wide">{form.name || 'Brand Name'}</h3>
                {form.taglineFr && <p className="text-gold text-xs italic">{form.taglineFr}</p>}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              {form.logo && !logoError && (
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-primary/10 -mt-10 mb-2 bg-white shadow-luxury">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.logo}
                    alt="logo"
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                </div>
              )}
              <p className="text-xs text-ink/60">📍 {form.originFr || 'Origine'}</p>
              <p className="text-xs text-ink/70 line-clamp-3">
                {form.descriptionFr || 'Description de la marque...'}
              </p>
            </div>
          </div>

          {!isValid && (
            <div className="mt-3 flex items-start gap-2 p-2 bg-amber-50 rounded-lg">
              <AlertCircle size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                Remplissez tous les champs marqués * pour générer le code
              </p>
            </div>
          )}
        </div>

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
                  {copied ? <><Check size={13} /> {tRoot('form.copied')}</> : <><Copy size={13} /> {tRoot('form.copy_code')}</>}
                </button>
              </div>
              <pre className="text-[11px] text-green-300 font-mono overflow-x-auto whitespace-pre-wrap break-all bg-black/40 p-3 rounded-lg max-h-[400px] overflow-y-auto">
                {generatedCode}
              </pre>

              <div className="mt-4 bg-gold-light/20 rounded-lg p-3 text-xs text-white/80">
                <p className="font-semibold text-gold mb-1">{tRoot('form.next_steps')}:</p>
                <pre className="whitespace-pre-wrap font-sans">{t('instructions_brand')}</pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

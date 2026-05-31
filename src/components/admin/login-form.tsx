'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react'

export function LoginForm() {
  const t = useTranslations('admin_auth')
  const locale = useLocale()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!password) return

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push(`/${locale}/admin/builder`)
        router.refresh()
      } else if (res.status === 401) {
        setError(t('error_invalid'))
      } else {
        setError(t('error_network'))
      }
    } catch {
      setError(t('error_network'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -start-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-32 -end-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back to home */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={14} className="rtl:rotate-180" />
          {t('back_home')}
        </Link>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-luxury-lg">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-gold rounded-2xl flex items-center justify-center shadow-pink"
          >
            <Lock size={28} className="text-white" />
          </motion.div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl md:text-3xl text-ink mb-2">{t('login_title')}</h1>
            <p className="text-sm text-ink/60 leading-relaxed">{t('login_subtitle')}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-ink/60 uppercase tracking-wider mb-2">
                {t('password_label')}
              </label>
              <div className="relative">
                <Lock size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-ink/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null) }}
                  placeholder={t('password_placeholder')}
                  required
                  autoFocus
                  dir="ltr"
                  className={`w-full ps-11 pe-12 py-3.5 rounded-xl border-2 ${
                    error ? 'border-red-300 bg-red-50' : 'border-primary/20 bg-white'
                  } focus:border-primary focus:outline-none text-sm text-ink transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-ink/40 hover:text-primary transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-start gap-2 text-xs text-red-600"
                >
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting || !password}
              className="w-full bg-ink hover:bg-ink/90 text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t('logging_in')}
                </>
              ) : (
                <>
                  <Lock size={15} />
                  {t('login_button')}
                </>
              )}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-6 pt-6 border-t border-primary/10 flex items-center justify-center gap-2 text-xs text-ink/50">
            <ShieldCheck size={13} className="text-green-600" />
            <span>{t('secure_session')}</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

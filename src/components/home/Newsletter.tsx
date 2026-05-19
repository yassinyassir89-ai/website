'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Check, ArrowRight } from 'lucide-react'

export function Newsletter() {
  const t = useTranslations('newsletter')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="luxury-container">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative top line */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-12 bg-gold" />
            <Mail size={18} className="text-gold" />
            <div className="h-px w-12 bg-gold" />
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-ink mb-4 leading-tight">
            {t('title')}{' '}
            <span className="text-primary italic">{t('title_accent')}</span>
          </h2>
          <p className="text-ink/60 text-base md:text-lg leading-relaxed mb-10">
            {t('subtitle')}
          </p>

          {/* Form / Success state */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail size={16} className="absolute start-4 top-1/2 -translate-y-1/2 text-ink/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('placeholder')}
                    required
                    className="w-full ps-10 pe-4 py-4 rounded-full border-2 border-primary/20 bg-white focus:border-primary focus:outline-none text-sm text-ink placeholder:text-ink/40 transition-colors"
                  />
                </div>
                <button type="submit" className="btn-gold whitespace-nowrap group">
                  {t('cta')}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 text-primary font-semibold text-lg"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check size={20} className="text-primary" />
                </div>
                {t('success')}
              </motion.div>
            )}
          </AnimatePresence>

          {!submitted && (
            <p className="text-xs text-ink/40 mt-4">{t('privacy')}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Tag } from 'lucide-react'

export function PromoBanner() {
  const t = useTranslations('promo')
  const locale = useLocale()
  const base = `/${locale}`
  const isRtl = locale === 'ar'

  return (
    <section className="py-10 md:py-14">
      <div className="luxury-container">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-promo-gradient"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Background decorations */}
          <div className="absolute -top-16 -start-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -end-16 w-64 h-64 bg-gold/20 rounded-full blur-3xl pointer-events-none" />

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 items-center ${isRtl ? 'md:flex-row-reverse' : ''}`}>

            {/* Text side */}
            <div className={`relative z-10 p-8 md:p-12 lg:p-16 ${isRtl ? 'md:order-2' : 'md:order-1'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-bold mb-5">
                <Tag size={12} />
                {t('badge')}
              </div>

              {/* Headline */}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-3">
                {t('title')}{' '}
                <span className="text-primary italic font-bold">{t('title_accent')}</span>
              </h2>
              <p className="text-xl font-medium text-ink/70 mb-8">{t('subtitle')}</p>

              <Link
                href={`${base}/promotions`}
                className="btn-primary group inline-flex"
              >
                {t('cta')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>

              {/* Ends notice */}
              <p className="text-xs text-ink/40 mt-4">{t('ends')}</p>
            </div>

            {/* Image side */}
            <div className={`relative h-72 md:h-full min-h-[300px] ${isRtl ? 'md:order-1' : 'md:order-2'}`}>
              <Image
                src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=85"
                alt="Promotion"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay */}
              <div className={`absolute inset-0 ${isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-cream/60 to-transparent`} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

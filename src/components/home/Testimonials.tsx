'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: { fr: 'Sara El Amrani', ar: 'سارة العمراني' },
    city: { fr: 'Casablanca', ar: 'الدار البيضاء' },
    rating: 5,
    quote: {
      fr: "Le sérum vitamine C a transformé ma peau en seulement 2 semaines. Ma peau est visiblement plus lumineuse et les taches ont diminué. Je recommande vivement !",
      ar: "سيروم فيتامين سي حوّل بشرتي خلال أسبوعين فقط. بشرتي أكثر إشراقاً والبقع تقلصت بشكل واضح. أنصح به بشدة!"
    },
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: { fr: 'Nadia Benmoussa', ar: 'نادية بن موسى' },
    city: { fr: 'Rabat', ar: 'الرباط' },
    rating: 5,
    quote: {
      fr: "Livraison rapide, packaging luxueux et surtout des produits qui tiennent leurs promesses. Grow Beauty est devenue ma boutique beauté préférée au Maroc !",
      ar: "توصيل سريع، تغليف فاخر، وخاصة منتجات تفي بوعودها. أصبح Grow Beauty متجري المفضل للجمال في المغرب!"
    },
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: { fr: 'Fatima Zahra Alami', ar: 'فاطمة الزهراء العلمي' },
    city: { fr: 'Marrakech', ar: 'مراكش' },
    rating: 5,
    quote: {
      fr: "La crème de nuit réparatrice est un vrai miracle. Je me réveille chaque matin avec une peau douce et hydratée. Un must-have absolu !",
      ar: "الكريم الليلي الإصلاحي معجزة حقيقية. أستيقظ كل صباح ببشرة ناعمة ورطبة. ضرورة لا غنى عنها!"
    },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Testimonials() {
  const t = useTranslations('testimonials')
  const locale = useLocale()

  return (
    <section className="py-20 md:py-28 bg-primary-light/40 overflow-hidden">
      <div className="luxury-container">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle mb-3">{t('subtitle')}</p>
          <h2 className="section-title">
            {t('title')}{' '}
            <span className="text-primary italic">{t('title_accent')}</span>
          </h2>
          <div className="gold-divider mt-4" />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => {
            const name = locale === 'ar' ? testimonial.name.ar : testimonial.name.fr
            const city = locale === 'ar' ? testimonial.city.ar : testimonial.city.fr
            const quote = locale === 'ar' ? testimonial.quote.ar : testimonial.quote.fr

            return (
              <motion.div
                key={testimonial.id}
                variants={item}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-pink transition-all duration-300 flex flex-col gap-4"
              >
                {/* Quote icon */}
                <Quote size={28} className="text-primary/20" />

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-ink/70 leading-relaxed italic flex-1">
                  "{quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-primary/10">
                  <div className="w-11 h-11 rounded-full ring-2 ring-gold/30 ring-offset-2 overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={testimonial.avatar}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{name}</p>
                    <p className="text-xs text-ink/50">{city}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

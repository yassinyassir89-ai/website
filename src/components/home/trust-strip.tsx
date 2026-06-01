'use client'

import { motion } from 'framer-motion'
import { Truck, Banknote, RotateCcw, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'

const items = [
  {
    icon: ShieldCheck,
    titleFr: '100% Authentique',
    descFr: 'Produits originaux directement des marques officielles',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Truck,
    titleFr: 'Livraison Rapide',
    descFr: 'Partout au Maroc en 2-4 jours ouvrables',
    color: 'text-primary',
    bg: 'bg-primary-light',
  },
  {
    icon: Banknote,
    titleFr: 'Paiement à la Livraison',
    descFr: 'Payez en espèces lors de la réception',
    color: 'text-gold-dark',
    bg: 'bg-gold-light',
  },
  {
    icon: RotateCcw,
    titleFr: 'Retours Gratuits',
    descFr: '14 jours pour changer d\'avis sans frais',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function TrustStrip() {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-cream to-white">
      <div className="luxury-container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {items.map(({ icon: Icon, titleFr, descFr, color, bg }) => (
            <motion.div
              key={titleFr}
              variants={item}
              className="group bg-white rounded-2xl p-5 md:p-6 shadow-soft hover:shadow-luxury hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} className={color} strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-ink text-sm md:text-base leading-tight mb-1">
                  {titleFr}
                </h3>
                <p className="text-xs md:text-sm text-ink/60 leading-relaxed">
                  {descFr}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

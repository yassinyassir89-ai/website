'use client'

import { motion } from 'framer-motion'
import { Truck, Award, RotateCcw, Lock } from 'lucide-react'

const items = [
  {
    icon: Truck,
    title: 'LIVRAISON GRATUITE',
    subtitle: 'Pour toute commande dès 500 DH',
  },
  {
    icon: Award,
    title: 'QUALITÉ PHARMACEUTIQUE',
    subtitle: '100% produits authentiques',
  },
  {
    icon: RotateCcw,
    title: 'RETOURS FACILES',
    subtitle: 'Sous 14 jours, sans frais',
  },
  {
    icon: Lock,
    title: 'PAIEMENT SÉCURISÉ',
    subtitle: 'À la livraison disponible',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function TrustStrip() {
  return (
    <section className="bg-primary-light/40 border-y border-primary/10 py-5 md:py-6">
      <div className="luxury-container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5"
        >
          {items.map(({ icon: Icon, title, subtitle }, idx) => (
            <motion.div
              key={title}
              variants={item}
              className={`flex items-center gap-3 md:gap-4 ${
                idx > 0 ? 'lg:border-s lg:border-primary/20 lg:ps-4' : ''
              }`}
            >
              {/* Circular icon with pink ring (Zack style) */}
              <div className="relative w-11 h-11 md:w-12 md:h-12 flex-shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
                <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                  <Icon size={18} className="text-primary" strokeWidth={1.75} />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] md:text-xs font-bold text-ink tracking-wider leading-tight">
                  {title}
                </p>
                <p className="text-[10px] md:text-xs text-ink/55 leading-tight mt-0.5">
                  {subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

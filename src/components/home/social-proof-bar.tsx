'use client'

import { motion } from 'framer-motion'
import { Star, Users, Package, Heart } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '10K+',
    label: 'Clientes satisfaites',
    color: 'text-primary',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Note moyenne',
    color: 'text-gold',
    fill: true,
  },
  {
    icon: Package,
    value: '15K+',
    label: 'Commandes livrées',
    color: 'text-green-600',
  },
  {
    icon: Heart,
    value: '40+',
    label: 'Produits authentiques',
    color: 'text-rose-500',
    fill: true,
  },
]

export function SocialProofBar() {
  return (
    <section className="bg-ink text-white py-6 md:py-7">
      <div className="luxury-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {stats.map(({ icon: Icon, value, label, color, fill }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex items-center gap-3 md:gap-4 justify-center md:justify-start"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>
                <Icon size={20} className={fill ? 'fill-current' : ''} strokeWidth={fill ? 0 : 1.75} />
              </div>
              <div>
                <p className="font-serif text-xl md:text-2xl font-bold text-white leading-none">{value}</p>
                <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider mt-1">{label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

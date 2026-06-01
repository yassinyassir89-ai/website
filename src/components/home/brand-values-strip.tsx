'use client'

import { motion } from 'framer-motion'
import { Rabbit, Leaf, FlaskConical, Headphones } from 'lucide-react'

const values = [
  {
    icon: Rabbit,
    title: 'CRUELTY FREE',
    subtitle: 'Aucun test sur les animaux',
  },
  {
    icon: Leaf,
    title: 'INGRÉDIENTS NATURELS',
    subtitle: 'Formules propres et sûres',
  },
  {
    icon: FlaskConical,
    title: 'TESTÉ DERMATOLOGIQUEMENT',
    subtitle: 'Doux et formules sûres',
  },
  {
    icon: Headphones,
    title: 'SUPPORT CLIENT',
    subtitle: 'À votre service 7j/7',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export function BrandValuesStrip() {
  return (
    <section className="bg-primary-light/30 py-8 md:py-10 border-t border-primary/10">
      <div className="luxury-container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 text-center"
        >
          {values.map(({ icon: Icon, title, subtitle }) => (
            <motion.div
              key={title}
              variants={item}
              className="flex flex-col items-center gap-2.5"
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <div className="absolute inset-0 rounded-full border-2 border-primary/30" />
                <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                  <Icon size={20} className="text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <p className="text-[11px] md:text-xs font-bold text-ink tracking-wider leading-tight">
                  {title}
                </p>
                <p className="text-[10px] md:text-xs text-ink/55 leading-tight mt-1">
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

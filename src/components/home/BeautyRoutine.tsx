'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Nettoyer',
    description: 'Purifiez votre peau avec nos nettoyants doux pour Ã©liminer impuretÃ©s et maquillage.',
    href: '/categories/nettoyants',
  },
  {
    number: '02',
    title: 'Tonifier',
    description: 'Ã‰quilibrez le pH de votre peau et prÃ©parez-la Ã  absorber les soins suivants.',
    href: '/categories/soins-peau',
  },
  {
    number: '03',
    title: 'SÃ©rum',
    description: 'Appliquez votre sÃ©rum concentrÃ© pour cibler vos besoins spÃ©cifiques.',
    href: '/categories/serums',
  },
  {
    number: '04',
    title: 'Hydrater',
    description: 'Scellez votre routine avec une crÃ¨me nourrissante pour une peau douce et lumineuse.',
    href: '/categories/hydratants',
  },
]

export function BeautyRoutine() {
  return (
    <section className="py-20 md:py-28 bg-forest overflow-hidden">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] md:h-[600px]">
              <Image
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
                alt="Routine BeautÃ©"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border border-gold/30 -z-10" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -top-6 -left-6 bg-gold p-6 text-center"
            >
              <p className="font-serif text-3xl text-white">4</p>
              <p className="text-white/90 text-xs uppercase tracking-[0.2em] mt-1">Ã‰tapes</p>
              <p className="text-white/70 text-xs">Essentielles</p>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-4">Votre Rituel</p>
            <h2 className="font-serif text-4xl md:text-5xl text-beige-50 mb-4 leading-tight">
              La Routine
              <span className="italic text-gold"> Parfaite</span>
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />
            <p className="text-beige-300 text-sm leading-relaxed mb-10 max-w-md">
              Une routine beautÃ© efficace transforme votre peau. DÃ©couvrez les 4 Ã©tapes clÃ©s pour une peau saine, lumineuse et rayonnante au quotidien.
            </p>

            <div className="space-y-6 mb-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 group"
                >
                  <div className="w-12 h-12 border border-gold/40 flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <span className="font-serif text-gold group-hover:text-white text-sm transition-colors">{step.number}</span>
                  </div>
                  <div>
                    <h4 className="text-beige-50 font-medium mb-1">{step.title}</h4>
                    <p className="text-beige-400 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/boutique"
              className="inline-flex items-center gap-3 border border-gold text-gold px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-gold hover:text-white transition-all duration-300 group"
            >
              CrÃ©er Ma Routine
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

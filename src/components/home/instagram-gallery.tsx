'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=85',
    alt: 'Beauty routine',
    span: 'col-span-1 row-span-2',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=85',
    alt: 'Makeup brushes',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=85',
    alt: 'Skincare serum',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&auto=format&fit=crop&q=85',
    alt: 'Gift set',
    span: 'col-span-2 row-span-1',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=85',
    alt: 'Face mask',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=85',
    alt: 'Rose oil',
    span: 'col-span-1 row-span-1',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

export function InstagramGallery() {
  const t = useTranslations('gallery')

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="luxury-container">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Instagram size={20} className="text-primary" />
            <h2 className="font-serif text-2xl md:text-3xl text-ink">{t('title')}</h2>
          </div>
          <p className="text-sm text-ink/50">{t('subtitle')}</p>
          <div className="gold-divider mt-4" />
        </motion.div>

        {/* Asymmetric grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-3 grid-rows-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {images.map((img) => (
            <motion.a
              key={img.id}
              href="https://instagram.com/growbeauty.ma"
              target="_blank"
              rel="noopener noreferrer"
              variants={item}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-400 flex items-center justify-center">
                <motion.div
                  className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Instagram size={20} />
                  </div>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80', alt: 'Beauty Flatlay' },
  { src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80', alt: 'Beauty Editorial' },
  { src: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&auto=format&fit=crop&q=80', alt: 'Makeup' },
  { src: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&auto=format&fit=crop&q=80', alt: 'Parfums' },
  { src: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80', alt: 'Skincare' },
  { src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80', alt: 'Serum' },
  { src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&auto=format&fit=crop&q=80', alt: 'Accessoires' },
  { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80', alt: 'Hair Care' },
]

export function BeautyGallery() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="luxury-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram size={18} className="text-gold" />
            <p className="section-subtitle">@growbeauty.ma</p>
          </div>
          <h2 className="section-title">Inspirations Beauté</h2>
          <div className="gold-divider" />
          <p className="text-muted-foreground text-sm mt-4">
            Suivez-nous sur Instagram pour découvrir nos coulisses et inspirations quotidiennes
          </p>
        </motion.div>

        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden aspect-square group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 25vw, 12.5vw"
              />
              <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/40 transition-all duration-300 flex items-center justify-center">
                <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-gold transition-colors border-b border-forest hover:border-gold pb-0.5"
          >
            <Instagram size={16} />
            Nous suivre sur Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

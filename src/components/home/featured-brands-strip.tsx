'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { mockBrands } from '@/lib/data'

export function FeaturedBrandsStrip() {
  const locale = useLocale()
  const base = `/${locale}`

  // Sort brands by product count (most products first) to surface the heavyweights
  const sortedBrands = [...mockBrands].sort((a, b) => b.productCount - a.productCount).slice(0, 7)

  return (
    <section className="py-10 md:py-14 bg-white border-y border-primary/5">
      <div className="luxury-container">
        {/* Tiny eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[10px] md:text-xs uppercase tracking-[0.4em] text-ink/40 mb-6 font-medium"
        >
          Nos marques pharmaceutiques de référence
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-8 md:gap-x-14 gap-y-6"
        >
          {sortedBrands.map((brand) => (
            <Link
              key={brand.id}
              href={`${base}/marques/${brand.id}`}
              className="group flex items-center gap-3 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-primary/10 shadow-soft">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-base md:text-lg text-ink/70 group-hover:text-ink transition-colors duration-300 tracking-wide">
                {brand.name}
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

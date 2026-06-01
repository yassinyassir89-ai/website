'use client'

import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { mockBrands, mockProducts } from '@/lib/data'

const ROTATE_MS = 7000

export function BrandSpotlight() {
  const locale = useLocale()
  const base = `/${locale}`

  // Only brands with spotlight metadata get featured
  const featured = mockBrands.filter((b) => b.spotlight)

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || featured.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % featured.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [paused, featured.length])

  if (featured.length === 0) return null

  const brand = featured[index]
  const spot = brand.spotlight!
  const productsForBrand = mockProducts.filter((p) => p.brandId === brand.id).slice(0, 4)

  function go(delta: number) {
    setIndex((i) => (i + delta + featured.length) % featured.length)
  }

  return (
    <section
      className={`relative overflow-hidden transition-colors duration-700 ${spot.bgClass}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft decorative blob behind products */}
      <div className="absolute top-1/2 end-0 -translate-y-1/2 w-[55%] h-[120%] bg-white/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="luxury-container relative py-16 md:py-20 lg:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={brand.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[420px] md:min-h-[480px]"
          >
            {/* Left: Brand info */}
            <div className="space-y-5 md:space-y-6 lg:space-y-7 max-w-md">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/60"
              >
                {spot.headlineFr}
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-bold leading-[0.95] tracking-tight uppercase"
              >
                {brand.name}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white/80 text-base md:text-lg leading-relaxed max-w-sm italic"
              >
                {brand.tagline.fr}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href={`${base}/marques/${brand.id}`}
                  className={`group inline-flex items-center gap-2 text-base md:text-lg font-bold ${spot.accentClass} hover:gap-3 transition-all`}
                >
                  Découvrir maintenant
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right: Product collage */}
            <div className="relative aspect-square max-w-md lg:max-w-full mx-auto w-full">
              {productsForBrand.length > 0 && (
                <>
                  {/* Largest centerpiece */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="absolute top-[5%] start-[20%] w-[55%] h-[55%] rounded-2xl overflow-hidden bg-white shadow-2xl shadow-black/40"
                  >
                    <Image
                      src={productsForBrand[0]?.image ?? brand.cover}
                      alt={productsForBrand[0]?.name.fr ?? brand.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 30vw"
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Top-right piece */}
                  {productsForBrand[1] && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="absolute top-0 end-0 w-[35%] aspect-square rounded-2xl overflow-hidden bg-white shadow-xl shadow-black/30 -rotate-6"
                    >
                      <Image
                        src={productsForBrand[1].image}
                        alt={productsForBrand[1].name.fr}
                        fill
                        sizes="(max-width: 1024px) 33vw, 20vw"
                        className="object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Bottom-left piece */}
                  {productsForBrand[2] && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="absolute bottom-[5%] start-0 w-[32%] aspect-square rounded-2xl overflow-hidden bg-white shadow-xl shadow-black/30 rotate-3"
                    >
                      <Image
                        src={productsForBrand[2].image}
                        alt={productsForBrand[2].name.fr}
                        fill
                        sizes="(max-width: 1024px) 33vw, 20vw"
                        className="object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Bottom-right small piece */}
                  {productsForBrand[3] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="absolute bottom-[8%] end-[8%] w-[28%] aspect-square rounded-2xl overflow-hidden bg-white shadow-lg shadow-black/30 rotate-12"
                    >
                      <Image
                        src={productsForBrand[3].image}
                        alt={productsForBrand[3].name.fr}
                        fill
                        sizes="(max-width: 1024px) 33vw, 20vw"
                        className="object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Brand logo badge floating */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: 'spring' }}
                    className="absolute top-[35%] end-[18%] w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 backdrop-blur-sm shadow-xl flex items-center justify-center text-center p-2"
                  >
                    <span className="font-serif text-[10px] md:text-xs font-bold text-ink leading-tight">
                      {brand.name}
                    </span>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows (only if multiple brands) */}
        {featured.length > 1 && (
          <div className="absolute bottom-6 end-6 md:bottom-8 md:end-8 flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              className="w-10 h-10 rounded-full border border-white/30 text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center backdrop-blur-sm"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => go(1)}
              className="w-10 h-10 rounded-full border border-white/30 text-white/80 hover:bg-white/10 transition-colors flex items-center justify-center backdrop-blur-sm"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Dots indicator */}
        {featured.length > 1 && (
          <div className="absolute bottom-7 start-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {featured.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setIndex(i)}
                aria-label={b.name}
                className={`h-1 transition-all rounded-full ${
                  i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

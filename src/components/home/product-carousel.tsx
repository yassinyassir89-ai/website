'use client'

import { useRef, useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { HomepageProductCard } from './homepage-product-card'
import type { MockProduct } from '@/lib/data'

interface ProductCarouselProps {
  title: string
  titleAccent?: string
  subtitle?: string
  products: MockProduct[]
  viewAllHref?: string
  /** Background color class (defaults to bg-cream) */
  bgClass?: string
  /** Eyebrow text above title */
  eyebrow?: string
}

export function ProductCarousel({
  title,
  titleAccent,
  subtitle,
  products,
  viewAllHref,
  bgClass = 'bg-cream',
  eyebrow,
}: ProductCarouselProps) {
  const locale = useLocale()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const base = `/${locale}`
  const isRtl = locale === 'ar'

  function updateScrollState() {
    const el = scrollerRef.current
    if (!el) return
    if (isRtl) {
      // In RTL, scrollLeft is negative going left from start
      const scrollLeft = Math.abs(el.scrollLeft)
      const maxScroll = el.scrollWidth - el.clientWidth
      setCanScrollLeft(scrollLeft < maxScroll - 4)
      setCanScrollRight(scrollLeft > 4)
    } else {
      setCanScrollLeft(el.scrollLeft > 4)
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
    }
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollerRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  function scrollBy(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const cardWidth = el.querySelector('article')?.clientWidth ?? 240
    const amount = (cardWidth + 16) * 2 * direction * (isRtl ? -1 : 1)
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  if (products.length === 0) return null

  return (
    <section className={`py-12 md:py-16 ${bgClass}`}>
      <div className="luxury-container">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between gap-4 mb-7 md:mb-9"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            {eyebrow && (
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-2">
                {eyebrow}
              </p>
            )}
            <h2 className="section-title">
              {title}
              {titleAccent && (
                <>
                  {' '}
                  <span className="text-primary italic">{titleAccent}</span>
                </>
              )}
            </h2>
            {subtitle && (
              <p className="text-sm text-ink/60 mt-2 max-w-md">{subtitle}</p>
            )}
          </div>

          {/* Right side: View all + arrows */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-dark transition-colors group"
              >
                Voir tout
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollBy(-1)}
                disabled={!canScrollLeft}
                aria-label="Précédent"
                className="w-10 h-10 rounded-full border-2 border-primary/20 text-ink hover:border-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-primary/20 disabled:hover:bg-transparent disabled:hover:text-ink"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                disabled={!canScrollRight}
                aria-label="Suivant"
                className="w-10 h-10 rounded-full border-2 border-primary/20 text-ink hover:border-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-primary/20 disabled:hover:bg-transparent disabled:hover:text-ink"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Horizontal scroller */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          {/* Edge fades */}
          <div className={`pointer-events-none absolute inset-y-0 start-0 w-8 lg:w-12 z-10 transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(to right, var(--bg-edge, rgba(255,248,246,1)), transparent)' }}
          />
          <div className={`pointer-events-none absolute inset-y-0 end-0 w-8 lg:w-12 z-10 transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}
            style={{ background: 'linear-gradient(to left, var(--bg-edge, rgba(255,248,246,1)), transparent)' }}
          />

          <div
            ref={scrollerRef}
            className="flex gap-4 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-4 sm:px-6 lg:px-8"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.4) }}
                className="flex-shrink-0 w-[155px] sm:w-[195px] md:w-[220px] lg:w-[240px] snap-start"
              >
                <HomepageProductCard product={product} />
              </motion.div>
            ))}

            {/* "View all" card at the end */}
            {viewAllHref && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[155px] sm:w-[195px] md:w-[220px] lg:w-[240px] snap-start"
              >
                <Link
                  href={viewAllHref}
                  className="group h-full min-h-[280px] rounded-2xl border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary-light/30 transition-all flex flex-col items-center justify-center gap-3 text-primary"
                >
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight size={18} />
                  </div>
                  <span className="font-serif text-sm">Voir tout</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

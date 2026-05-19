'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

const slides = [
  {
    id: 1,
    title: "L'Art de la",
    titleAccent: 'Beauté Pure',
    subtitle: 'Nouvelle Collection Printemps',
    description: 'Découvrez nos soins de luxe formulés avec les ingrédients les plus précieux du monde pour une peau éclatante et sublimée.',
    cta: 'Découvrir la Collection',
    ctaHref: '/boutique',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&auto=format&fit=crop&q=85',
    badge: 'Nouveau',
  },
  {
    id: 2,
    title: 'Parfums',
    titleAccent: "d'Exception",
    subtitle: 'Collection Signature',
    description: "Des fragrances uniques qui capturent l'essence de la féminité. Chaque flacon, une œuvre d'art.",
    cta: 'Explorer les Parfums',
    ctaHref: '/categories/parfums',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1600&auto=format&fit=crop&q=85',
    badge: 'Exclusif',
  },
  {
    id: 3,
    title: 'Rituels',
    titleAccent: 'de Beauté',
    subtitle: 'Soins Visage & Corps',
    description: 'Transformez votre routine quotidienne en un rituel luxueux. Des textures somptueuses pour un résultat visible.',
    cta: 'Voir les Soins',
    ctaHref: '/categories/soins-peau',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&auto=format&fit=crop&q=85',
    badge: 'Bestseller',
  },
]

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}))

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const slide = slides[current]

  return (
    <section ref={containerRef} className="relative h-[90vh] min-h-[650px] max-h-[950px] overflow-hidden bg-forest">

      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest/75 via-forest/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Floating gold particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold/30"
            style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.6, 0.1], scale: [1, 1.3, 1] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Decorative circles */}
        <motion.div
          className="absolute -right-32 top-1/4 w-96 h-96 rounded-full border border-gold/10"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -right-20 top-1/3 w-64 h-64 rounded-full border border-gold/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-12 top-1/4 w-2 h-2 rounded-full bg-gold/50"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-1/3 bottom-1/3 w-1.5 h-1.5 rounded-full bg-gold/60"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, delay: 1, repeat: Infinity }}
        />

        {/* Vertical gold line */}
        <motion.div
          className="absolute right-24 top-16 bottom-16 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      {/* Content */}
      <motion.div className="relative h-full luxury-container flex items-center" style={{ y: contentY, opacity }}>
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-5"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-8 bg-gold" />
                <span className="text-xs uppercase tracking-[0.4em] text-gold font-medium">
                  {slide.badge}
                </span>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-beige-200 text-xs uppercase tracking-[0.35em] font-light"
              >
                {slide.subtitle}
              </motion.p>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05]"
              >
                {slide.title}
                <br />
                <span className="text-gold italic relative">
                  {slide.titleAccent}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-px bg-gold/50"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-beige-200/80 text-sm md:text-base leading-relaxed max-w-md font-light"
              >
                {slide.description}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 pt-2"
              >
                <Link
                  href={slide.ctaHref}
                  className="group relative flex items-center gap-3 bg-gold text-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
                  <span className="relative">{slide.cta}</span>
                  <ArrowRight size={14} className="relative transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/boutique"
                  className="text-beige-200/70 text-xs font-medium hover:text-gold transition-colors tracking-widest uppercase border-b border-transparent hover:border-gold pb-0.5"
                >
                  Voir tout
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10">
        <motion.button
          onClick={() => { setDirection(-1); setCurrent((c) => (c - 1 + slides.length) % slides.length) }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="w-12 h-12 border border-white/25 text-white hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
        >
          <ChevronLeft size={18} />
        </motion.button>
      </div>
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10">
        <motion.button
          onClick={() => { setDirection(1); setCurrent((c) => (c + 1) % slides.length) }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="w-12 h-12 border border-white/25 text-white hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            whileHover={{ scale: 1.3 }}
            className={`transition-all duration-500 rounded-full ${i === current ? 'w-8 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 right-8 hidden md:flex flex-col items-center gap-3 z-10"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-14 bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0 origin-top"
        />
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 rotate-90 origin-center mt-2">Scroll</span>
      </motion.div>
    </section>
  )
}

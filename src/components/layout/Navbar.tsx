'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnnouncementBar } from './announcement-bar'
import { Logo } from './logo'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

export function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const cartCount = useCartStore((s) => s.getItemCount())
  const wishCount = useWishlistStore((s) => s.count())

  const base = `/${locale}`

  const navLinks = [
    { label: t('boutique'), href: `${base}/boutique` },
    { label: t('categories'), href: `${base}/categories` },
    { label: t('marques'), href: `${base}/marques` },
    { label: t('promotions'), href: `${base}/promotions` },
  ]

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <AnnouncementBar />

      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          isScrolled ? 'glass-nav' : 'bg-cream border-b border-primary/10'
        )}
      >
        <div className="luxury-container">
          <div className="flex items-center justify-between h-18 py-3">

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 text-ink hover:text-primary transition-colors rounded-lg"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Logo size="md" showTagline />


            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ink hover:text-primary transition-colors duration-200 relative group py-1"
                >
                  {link.label}
                  <span className="absolute bottom-0 start-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setIsSearchOpen((o) => !o)}
                className="p-2 text-ink hover:text-primary transition-colors rounded-lg hover:bg-primary-light"
                aria-label={t('search_placeholder')}
              >
                <Search size={20} />
              </button>

              <Link
                href={`${base}/favoris`}
                className="relative p-2 text-ink hover:text-primary transition-colors rounded-lg hover:bg-primary-light"
                aria-label={t('wishlist')}
              >
                <Heart size={20} />
                {mounted && wishCount > 0 && (
                  <motion.span
                    key={wishCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -end-0.5 min-w-[18px] h-[18px] px-1 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm"
                  >
                    {wishCount}
                  </motion.span>
                )}
              </Link>

              <Link
                href={`${base}/panier`}
                className="relative p-2 text-ink hover:text-primary transition-colors rounded-lg hover:bg-primary-light"
                aria-label={t('cart')}
              >
                <ShoppingBag size={20} />
                {mounted && cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -end-0.5 min-w-[18px] h-[18px] px-1 bg-gold text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-primary/10 bg-white/95 backdrop-blur-sm overflow-hidden"
            >
              <div className="luxury-container py-4">
                <form className="flex items-center gap-3 max-w-2xl mx-auto">
                  <Search size={18} className="text-primary flex-shrink-0" />
                  <input
                    type="text"
                    placeholder={t('search_placeholder')}
                    autoFocus
                    className="flex-1 bg-transparent border-b-2 border-primary/30 focus:border-primary text-ink placeholder:text-ink/40 text-sm py-2 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="text-ink/50 hover:text-ink"
                  >
                    <X size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: locale === 'ar' ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: locale === 'ar' ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'fixed inset-y-0 z-50 w-80 bg-white shadow-luxury-lg lg:hidden overflow-y-auto flex flex-col',
                locale === 'ar' ? 'right-0' : 'left-0'
              )}
            >
              <div className="flex items-center justify-between p-6 border-b border-primary/10">
                <Logo size="sm" showTagline={false} />
                <button onClick={() => setIsMobileOpen(false)} aria-label="Close">
                  <X size={22} className="text-ink" />
                </button>
              </div>

              <nav className="flex-1 p-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-3 px-3 text-base font-medium text-ink hover:text-primary hover:bg-primary-light rounded-xl transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

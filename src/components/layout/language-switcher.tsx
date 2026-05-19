'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const locales = [
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'ar', label: 'AR', flag: '🇲🇦', name: 'العربية' },
] as const

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const current = locales.find((l) => l.code === locale) ?? locales[0]

  function switchLocale(code: string) {
    // Replace the current locale prefix in the path
    const segments = pathname.split('/')
    segments[1] = code
    router.push(segments.join('/') || '/')
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch language"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm font-medium text-ink hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-primary-light"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:block">{current.label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute end-0 top-full mt-2 z-50 bg-white rounded-xl shadow-luxury-lg border border-primary/10 overflow-hidden min-w-[140px]"
            >
              {locales.map((loc) => (
                <button
                  key={loc.code}
                  onClick={() => switchLocale(loc.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                    loc.code === locale
                      ? 'bg-primary-light text-primary font-semibold'
                      : 'text-ink hover:bg-primary-light hover:text-primary'
                  }`}
                >
                  <span className="text-base">{loc.flag}</span>
                  <span>{loc.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

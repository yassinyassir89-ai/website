'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-gold font-medium mb-6">Oups</p>

          <h1 className="font-serif text-[120px] md:text-[160px] text-forest/10 leading-none select-none -mb-8">
            500
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Une Erreur s'est Produite
            </h2>
            <div className="w-16 h-px bg-gold mx-auto mb-6" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-10">
              Quelque chose s'est mal passé. Veuillez réessayer ou retourner à l'accueil.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={reset}
                className="group flex items-center gap-3 bg-forest text-beige-50 px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest-light transition-all duration-300"
              >
                <RefreshCw size={16} />
                Réessayer
              </button>
              <Link
                href="/"
                className="group flex items-center gap-3 border border-forest text-forest px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest hover:text-beige-50 transition-all duration-300"
              >
                Accueil
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

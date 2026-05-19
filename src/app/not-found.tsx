'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-gold font-medium mb-6">Erreur 404</p>

          <h1 className="font-serif text-[120px] md:text-[160px] text-forest/10 leading-none select-none -mb-8">
            404
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Page Introuvable
            </h2>
            <div className="w-16 h-px bg-gold mx-auto mb-6" />
            <p className="text-muted-foreground text-sm leading-relaxed mb-10">
              La page que vous recherchez n'existe pas ou a été déplacée.
              Retournez à l'accueil pour découvrir nos produits de beauté.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="group flex items-center gap-3 bg-forest text-beige-50 px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest-light transition-all duration-300"
              >
                <Home size={16} />
                Accueil
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/boutique"
                className="group flex items-center gap-3 border border-forest text-forest px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-forest hover:text-beige-50 transition-all duration-300"
              >
                <Search size={16} />
                Boutique
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

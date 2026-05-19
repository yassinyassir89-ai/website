'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')

  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full text-center"
      >
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle size={40} className="text-gold" />
        </motion.div>

        <h1 className="font-serif text-4xl text-forest mb-3">Commande Confirmée !</h1>
        <div className="w-16 h-px bg-gold mx-auto mb-6" />

        <p className="text-muted-foreground mb-2">
          Merci pour votre commande. Nous l'avons bien reçue.
        </p>
        {orderNumber && (
          <div className="bg-white border border-beige-200 rounded px-6 py-4 mb-8 inline-block">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">Numéro de commande</p>
            <p className="font-serif text-xl text-forest font-medium">{orderNumber}</p>
          </div>
        )}

        <div className="bg-white border border-beige-200 p-6 mb-8 text-left space-y-4">
          <div className="flex items-start gap-3">
            <Package size={20} className="text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-forest text-sm mb-1">Livraison sous 48-72h</p>
              <p className="text-sm text-muted-foreground">Votre commande sera préparée et expédiée dans les plus brefs délais.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-forest text-sm mb-1">Paiement à la livraison</p>
              <p className="text-sm text-muted-foreground">Préparez le montant exact lors de la réception de votre colis.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/compte?tab=commandes" className="btn-luxury inline-flex gap-2">
            Suivre ma commande
            <ArrowRight size={16} />
          </Link>
          <Link href="/" className="btn-luxury-outline inline-flex gap-2">
            <Home size={16} />
            Accueil
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

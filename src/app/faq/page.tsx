'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    category: 'Commandes',
    questions: [
      { q: 'Comment passer une commande ?', a: 'Ajoutez vos produits au panier, procédez au paiement et renseignez votre adresse de livraison. Votre commande sera confirmée par email.' },
      { q: 'Puis-je modifier ou annuler ma commande ?', a: 'Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant sa passation en nous contactant par téléphone ou email.' },
      { q: 'Comment suivre ma commande ?', a: 'Connectez-vous à votre compte et consultez la section "Mes Commandes" pour suivre l\'état de votre commande en temps réel.' },
    ],
  },
  {
    category: 'Paiement',
    id: 'paiement',
    questions: [
      { q: 'Quels modes de paiement acceptez-vous ?', a: 'Nous acceptons uniquement le paiement à la livraison (cash). Préparez le montant exact lors de la réception de votre colis.' },
      { q: 'Le paiement à la livraison est-il sécurisé ?', a: 'Oui, absolument. Vous ne payez qu\'à la réception et vérification de votre colis. Aucun risque financier pour vous.' },
      { q: 'Puis-je payer par virement bancaire ?', a: 'Pour le moment, seul le paiement à la livraison est disponible. Nous travaillons à élargir nos options de paiement.' },
    ],
  },
  {
    category: 'Livraison',
    questions: [
      { q: 'Quel est le délai de livraison ?', a: 'Nos livraisons sont effectuées sous 48 à 72 heures ouvrables dans tout le Maroc. Casablanca et Rabat bénéficient parfois d\'une livraison en J+1.' },
      { q: 'La livraison est-elle gratuite ?', a: 'La livraison est gratuite pour toute commande supérieure à 500 MAD. En dessous de ce montant, des frais de 40 MAD sont appliqués.' },
      { q: 'Livrez-vous dans toutes les villes du Maroc ?', a: 'Nous livrons dans toutes les villes du Maroc via nos partenaires logistiques. Contactez-nous pour les zones rurales éloignées.' },
    ],
  },
  {
    category: 'Retours & Échanges',
    questions: [
      { q: 'Quelle est votre politique de retour ?', a: 'Vous disposez de 30 jours à compter de la réception pour nous retourner un article non ouvert et dans son emballage d\'origine.' },
      { q: 'Comment procéder à un retour ?', a: 'Contactez notre service client par email ou téléphone. Nous vous enverrons les instructions et organiserons la collecte de votre colis.' },
      { q: 'Quand suis-je remboursé(e) ?', a: 'Le remboursement est effectué dans les 5 à 7 jours ouvrables après réception et vérification du produit retourné.' },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-beige-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-4"
      >
        <span className="text-sm font-medium text-forest">{q}</span>
        {open ? <Minus size={16} className="text-gold flex-shrink-0" /> : <Plus size={16} className="text-gold flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-forest py-16">
          <div className="luxury-container text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Aide</p>
            <h1 className="font-serif text-4xl text-beige-50">Questions Fréquentes</h1>
            <div className="w-16 h-px bg-gold mx-auto mt-4" />
          </div>
        </div>

        <section className="py-20 bg-beige-50">
          <div className="luxury-container max-w-3xl">
            {faqs.map((section) => (
              <div key={section.category} id={section.id} className="mb-12">
                <h2 className="font-serif text-2xl text-forest mb-6 pb-3 border-b-2 border-gold/30">{section.category}</h2>
                {section.questions.map((item, i) => (
                  <FaqItem key={i} {...item} />
                ))}
              </div>
            ))}

            <div className="bg-forest p-8 text-center mt-12">
              <h3 className="font-serif text-2xl text-beige-50 mb-3">Vous n'avez pas trouvé votre réponse ?</h3>
              <p className="text-beige-300 text-sm mb-6">Notre équipe est disponible 7j/7 pour vous aider.</p>
              <a href="/contact" className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] hover:bg-gold-dark transition-colors">
                Nous Contacter
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Package, RefreshCw, Clock, MapPin } from 'lucide-react'

export const metadata = { title: 'Politique de Livraison' }

export default function PolitiqueLivraisonPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-forest py-16">
          <div className="luxury-container text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Informations</p>
            <h1 className="font-serif text-4xl text-beige-50">Politique de Livraison & Retours</h1>
            <div className="w-16 h-px bg-gold mx-auto mt-4" />
          </div>
        </div>

        <section className="py-20 bg-beige-50">
          <div className="luxury-container max-w-3xl">
            {/* Key info cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { icon: Clock, title: '48-72h', desc: 'Délai de livraison' },
                { icon: Package, title: 'Gratuite', desc: 'Dès 500 MAD' },
                { icon: MapPin, title: 'Maroc', desc: 'Livraison nationale' },
                { icon: RefreshCw, title: '30 jours', desc: 'Retours acceptés' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white shadow-soft p-5 text-center">
                  <Icon size={24} className="text-gold mx-auto mb-3" />
                  <p className="font-serif text-xl text-forest">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
              <div>
                <h2 className="font-serif text-2xl text-forest mb-4">Livraison</h2>
                <div className="space-y-3">
                  <p><strong className="text-forest">Délais :</strong> Toutes les commandes sont traitées et expédiées sous 24 heures ouvrables. La livraison est ensuite effectuée en 48 à 72 heures dans toutes les villes du Maroc.</p>
                  <p><strong className="text-forest">Frais de livraison :</strong> La livraison est offerte pour toute commande égale ou supérieure à 500 MAD. Pour les commandes inférieures, les frais de livraison sont de 40 MAD.</p>
                  <p><strong className="text-forest">Paiement à la livraison :</strong> Nous acceptons uniquement le paiement en espèces à la réception de votre colis. Préparez le montant exact.</p>
                  <p><strong className="text-forest">Suivi :</strong> Un numéro de suivi vous sera communiqué par SMS ou email une fois votre commande expédiée.</p>
                </div>
              </div>

              <div id="retours">
                <h2 className="font-serif text-2xl text-forest mb-4">Retours & Échanges</h2>
                <div className="space-y-3">
                  <p><strong className="text-forest">Délai de retour :</strong> Vous disposez de 30 jours calendaires à compter de la date de réception pour retourner un article.</p>
                  <p><strong className="text-forest">Conditions :</strong> L'article doit être non ouvert, non utilisé et dans son emballage d'origine avec tous les accessoires inclus.</p>
                  <p><strong className="text-forest">Articles non retournables :</strong> Les produits ouverts, les parfums testés, et les articles personnalisés ne peuvent pas être retournés pour des raisons d'hygiène.</p>
                  <p><strong className="text-forest">Remboursement :</strong> Le remboursement est effectué dans les 5 à 7 jours ouvrables suivant la réception et vérification du retour.</p>
                  <p><strong className="text-forest">Procédure :</strong> Contactez-nous par email à retours@growbeauty.ma ou par téléphone au +212 600 000 000 en indiquant votre numéro de commande.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

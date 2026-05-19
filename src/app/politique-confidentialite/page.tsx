import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

export const metadata = { title: 'Politique de Confidentialité' }

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-forest py-16">
          <div className="luxury-container text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Légal</p>
            <h1 className="font-serif text-4xl text-beige-50">Politique de Confidentialité</h1>
            <div className="w-16 h-px bg-gold mx-auto mt-4" />
          </div>
        </div>

        <section className="py-20 bg-beige-50">
          <div className="luxury-container max-w-3xl">
            <div className="bg-white shadow-soft p-8 md:p-12 space-y-10 text-sm text-muted-foreground leading-relaxed">
              <div>
                <p className="text-xs text-gold mb-6">Dernière mise à jour : 1er janvier 2024</p>
                <p>Grow Beauty s'engage à protéger la confidentialité de ses utilisateurs. Cette politique décrit comment nous collectons, utilisons et protégeons vos données personnelles.</p>
              </div>

              {[
                {
                  title: '1. Données Collectées',
                  content: 'Nous collectons les informations que vous nous fournissez : nom, adresse email, numéro de téléphone, adresse de livraison lors de la création d\'un compte ou d\'une commande. Nous collectons également des données de navigation anonymisées pour améliorer votre expérience.',
                },
                {
                  title: '2. Utilisation des Données',
                  content: 'Vos données sont utilisées pour : traiter et livrer vos commandes, vous envoyer des confirmations et mises à jour de commande, améliorer nos services, vous envoyer des offres marketing si vous y avez consenti. Nous ne vendons jamais vos données à des tiers.',
                },
                {
                  title: '3. Protection des Données',
                  content: 'Nous mettons en place des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.',
                },
                {
                  title: '4. Vos Droits',
                  content: 'Vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : privacy@growbeauty.ma. Nous répondrons dans un délai de 30 jours.',
                },
                {
                  title: '5. Cookies',
                  content: 'Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter certaines fonctionnalités.',
                },
              ].map((section) => (
                <div key={section.title}>
                  <h2 className="font-serif text-xl text-forest mb-3">{section.title}</h2>
                  <p>{section.content}</p>
                </div>
              ))}

              <div className="border-t border-beige-200 pt-8">
                <p>Pour toute question concernant cette politique, contactez-nous : <a href="mailto:privacy@growbeauty.ma" className="text-gold">privacy@growbeauty.ma</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Newsletter } from '@/components/home/Newsletter'
import { Leaf, Award, Heart, Globe } from 'lucide-react'

export const metadata = { title: 'À Propos' }

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-80 md:h-96 bg-forest overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&auto=format&fit=crop&q=80"
            alt="À Propos"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gold mb-3">Notre Histoire</p>
              <h1 className="font-serif text-5xl text-beige-50 mb-4">À Propos de Grow Beauty</h1>
              <div className="w-16 h-px bg-gold mx-auto" />
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 md:py-28 bg-beige-50">
          <div className="luxury-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="section-subtitle mb-3">Notre Mission</p>
                <h2 className="font-serif text-4xl text-forest mb-6">La Beauté, une Philosophie de Vie</h2>
                <div className="w-16 h-px bg-gold mb-8" />
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>
                    Fondée au Maroc avec la passion de la beauté authentique et luxueuse, Grow Beauty est née d'une vision : rendre accessible l'excellence cosmétique aux femmes marocaines et francophones.
                  </p>
                  <p>
                    Chaque produit de notre sélection est soigneusement choisi pour sa qualité exceptionnelle, ses ingrédients précieux et son efficacité prouvée. Nous collaborons avec les meilleures marques de beauté mondiales pour vous offrir une expérience shopping incomparable.
                  </p>
                  <p>
                    Notre engagement : vous accompagner dans votre rituel beauté quotidien avec des produits qui respectent votre peau et l'environnement, tout en vous offrant le luxe que vous méritez.
                  </p>
                </div>
              </div>
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80"
                  alt="Notre Histoire"
                  fill
                  className="object-cover"
                />
                <div className="absolute -bottom-5 -left-5 bg-gold p-6 text-white text-center">
                  <p className="font-serif text-3xl">2020</p>
                  <p className="text-xs uppercase tracking-[0.2em]">Fondée</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="luxury-container">
            <div className="text-center mb-14">
              <p className="section-subtitle mb-3">Ce Qui Nous Guide</p>
              <h2 className="section-title">Nos Valeurs</h2>
              <div className="gold-divider" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Leaf, title: 'Naturalité', desc: 'Ingrédients naturels et formules respectueuses de votre peau' },
                { icon: Award, title: 'Excellence', desc: 'Sélection rigoureuse de produits haut de gamme authentiques' },
                { icon: Heart, title: 'Bienveillance', desc: 'Une équipe dédiée à votre satisfaction et votre beauté' },
                { icon: Globe, title: 'Durabilité', desc: 'Engagés pour une beauté responsable et respectueuse' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center group">
                  <div className="w-16 h-16 border-2 border-beige-300 group-hover:border-gold flex items-center justify-center mx-auto mb-5 transition-colors">
                    <Icon size={28} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-3">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

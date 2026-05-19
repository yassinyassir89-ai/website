import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boutique',
  description: 'Explorez notre sélection de produits de beauté de luxe — parfums, soins de la peau, maquillage et soins capillaires.',
  openGraph: {
    title: 'Boutique | Grow Beauty',
    description: 'Explorez notre sélection de produits de beauté de luxe.',
  },
}

export default function BoutiqueLayout({ children }: { children: React.ReactNode }) {
  return children
}

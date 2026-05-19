import { unstable_setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { BoutiqueClient } from '@/components/shop/boutique-client'

interface PageProps {
  params: { locale: string }
  searchParams: { category?: string }
}

export default function BoutiquePage({ params: { locale }, searchParams }: PageProps) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <BoutiqueClient initialCategory={searchParams.category} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

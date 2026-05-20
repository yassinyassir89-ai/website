import { unstable_setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { BrandsGrid } from '@/components/shop/brands-grid'

export default function BrandsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <BrandsGrid />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

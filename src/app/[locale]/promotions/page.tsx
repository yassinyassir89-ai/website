import { unstable_setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { PromotionsClient } from '@/components/shop/promotions-client'

export default function PromotionsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <PromotionsClient />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

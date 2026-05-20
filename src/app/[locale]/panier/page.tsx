import { unstable_setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CartClient } from '@/components/shop/cart-client'

export default function CartPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <CartClient />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

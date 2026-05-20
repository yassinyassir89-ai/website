import { unstable_setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ConfirmationClient } from '@/components/shop/confirmation-client'

export default function ConfirmationPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <ConfirmationClient />
      </main>
      <Footer />
    </>
  )
}

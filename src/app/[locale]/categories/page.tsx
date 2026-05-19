import { unstable_setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CategoriesGrid } from '@/components/shop/categories-grid'

export default function CategoriesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <CategoriesGrid />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

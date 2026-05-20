import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { BrandDetailClient } from '@/components/shop/brand-detail-client'
import { mockBrands } from '@/lib/data'

interface PageProps {
  params: { locale: string; id: string }
}

export default function BrandDetailPage({ params: { locale, id } }: PageProps) {
  unstable_setRequestLocale(locale)

  const brand = mockBrands.find((b) => b.id === id)
  if (!brand) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <BrandDetailClient brand={brand} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

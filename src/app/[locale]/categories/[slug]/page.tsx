import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { CategoryDetailClient } from '@/components/shop/category-detail-client'
import { mockCategories } from '@/lib/data'

interface PageProps {
  params: { locale: string; slug: string }
}

export default function CategoryDetailPage({ params: { locale, slug } }: PageProps) {
  unstable_setRequestLocale(locale)

  const category = mockCategories.find((c) => c.id === slug)
  if (!category) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <CategoryDetailClient category={category} />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { ProductDetailClient } from '@/components/shop/product-detail-client'
import { StickyProductBar } from '@/components/shop/sticky-product-bar'
import { mockProducts } from '@/lib/data'

interface PageProps {
  params: { locale: string; slug: string }
}

export default function ProductDetailPage({ params: { locale, slug } }: PageProps) {
  unstable_setRequestLocale(locale)

  const product = mockProducts.find((p) => p.id === slug)
  if (!product) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream pb-20 lg:pb-0">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyProductBar product={product} />
    </>
  )
}

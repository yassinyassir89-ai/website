import { unstable_setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ProductBuilder } from '@/components/admin/product-builder'

export default function ProductBuilderPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <ProductBuilder />
      </main>
      <Footer />
    </>
  )
}

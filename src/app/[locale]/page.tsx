import { unstable_setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedBrandsStrip } from '@/components/home/featured-brands-strip'
import { BrandValuesStrip } from '@/components/home/brand-values-strip'
import { BrandSpotlight } from '@/components/home/brand-spotlight'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { FeaturedProducts } from '@/components/home/featured-products'
import { NewArrivalsCarousel } from '@/components/home/new-arrivals-carousel'
import { PromosCarousel } from '@/components/home/promos-carousel'
import { GiftsCarousel } from '@/components/home/gifts-carousel'
import { PromoBanner } from '@/components/home/PromoBanner'
import { BestSellers } from '@/components/home/BestSellers'
import { Testimonials } from '@/components/home/Testimonials'
import { Newsletter } from '@/components/home/Newsletter'
import { InstagramGallery } from '@/components/home/instagram-gallery'

export const dynamic = 'force-dynamic'

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedBrandsStrip />
        <CategoriesSection />
        <BrandSpotlight />
        <NewArrivalsCarousel />
        <FeaturedProducts />
        <PromosCarousel />
        <PromoBanner />
        <BestSellers />
        <GiftsCarousel />
        <Testimonials />
        <InstagramGallery />
        <BrandValuesStrip />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

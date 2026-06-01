import { unstable_setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { HeroSection } from '@/components/home/hero-section'
import { SocialProofBar } from '@/components/home/social-proof-bar'
import { TrustStrip } from '@/components/home/trust-strip'
import { FeaturedBrandsStrip } from '@/components/home/featured-brands-strip'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { FeaturedProducts } from '@/components/home/featured-products'
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
        <SocialProofBar />
        <TrustStrip />
        <FeaturedBrandsStrip />
        <CategoriesSection />
        <FeaturedProducts />
        <PromoBanner />
        <BestSellers />
        <Testimonials />
        <InstagramGallery />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

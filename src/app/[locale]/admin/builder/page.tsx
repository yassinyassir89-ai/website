import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { isAuthenticatedFromCookies } from '@/lib/admin-auth'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AdminPanel } from '@/components/admin/admin-panel'

export const dynamic = 'force-dynamic'

export default function AdminBuilderPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  // Server-side auth check — runs BEFORE any HTML is sent
  if (!isAuthenticatedFromCookies()) {
    redirect(`/${locale}/admin/login`)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <AdminPanel />
      </main>
      <Footer />
    </>
  )
}

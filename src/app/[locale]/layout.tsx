import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Playfair_Display, Poppins, Tajawal, Almarai } from 'next/font/google'
import { locales } from '@/i18n/routing'
import '../globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  fallback: ['Georgia', 'serif'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  fallback: ['system-ui', 'sans-serif'],
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['400', '500', '700', '800'],
  fallback: ['Arial', 'sans-serif'],
})

const almarai = Almarai({
  subsets: ['arabic'],
  variable: '--font-almarai',
  display: 'swap',
  weight: ['300', '400', '700', '800'],
  fallback: ['Arial', 'sans-serif'],
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'),
    title: { default: t('title'), template: `%s | Grow Beauty` },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr-MA': '/fr',
        'ar-MA': '/ar',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      title: t('title'),
      description: t('description'),
      siteName: 'Grow Beauty',
    },
    icons: { icon: '/favicon.ico' },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as 'fr' | 'ar')) {
    notFound()
  }

  unstable_setRequestLocale(locale)
  const messages = await getMessages()
  const now = new Date()
  const isRtl = locale === 'ar'

  // Load all font variables on every page so the className is deterministic
  const allFontVars = `${playfair.variable} ${poppins.variable} ${tajawal.variable} ${almarai.variable}`

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${allFontVars} ${isRtl ? 'locale-ar' : 'locale-fr'}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-cream text-ink" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale} now={now} timeZone="Africa/Casablanca">
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { Playfair_Display, Poppins, Tajawal, Almarai } from 'next/font/google'
import { StoreHydration } from '@/components/store-hydration'
import './globals.css'

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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'),
    title: { default: t('title'), template: `%s | Grow Beauty` },
    description: t('description'),
    icons: { icon: '/favicon.ico' },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()
  const isRtl = locale === 'ar'

  const allFontVars = `${playfair.variable} ${poppins.variable} ${tajawal.variable} ${almarai.variable}`

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${allFontVars} ${isRtl ? 'locale-ar' : 'locale-fr'}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-cream text-ink" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale} timeZone="Africa/Casablanca">
          <StoreHydration />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

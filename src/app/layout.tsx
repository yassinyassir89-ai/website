import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { Playfair_Display, Poppins } from 'next/font/google'
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'),
    title: { default: t('title'), template: `%s | Grow Beauty` },
    description: t('description'),
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages()

  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${playfair.variable} ${poppins.variable} locale-fr`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-cream text-ink" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale="fr" timeZone="Africa/Casablanca">
          <StoreHydration />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

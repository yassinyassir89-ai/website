import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n/routing'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({
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

  return <>{children}</>
}

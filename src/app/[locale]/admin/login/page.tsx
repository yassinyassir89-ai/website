import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { isAuthenticatedFromCookies } from '@/lib/admin-auth'
import { LoginForm } from '@/components/admin/login-form'

export const dynamic = 'force-dynamic'

export default function AdminLoginPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale)

  // Already logged in? Skip the login screen.
  if (isAuthenticatedFromCookies()) {
    redirect(`/${locale}/admin/builder`)
  }

  return <LoginForm />
}

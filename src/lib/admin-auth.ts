import { createHash } from 'crypto'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'growbeauty2026'

export const ADMIN_COOKIE_NAME = 'gb-admin-session'
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

/**
 * Cookie value = SHA256("admin-session:" + password).
 * Deterministic but not reversible — server can verify, client cannot forge.
 */
function expectedCookieValue(): string {
  return createHash('sha256').update(`admin-session:${ADMIN_PASSWORD}`).digest('hex')
}

export function validatePassword(input: string): boolean {
  if (!input) return false
  // Constant-time compare to defeat timing attacks
  const a = Buffer.from(input)
  const b = Buffer.from(ADMIN_PASSWORD)
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a[i] ^ b[i]
  return result === 0
}

export function generateSessionToken(): string {
  return expectedCookieValue()
}

export function isAuthenticated(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false
  return cookieValue === expectedCookieValue()
}

/** Server-side check from inside a Server Component */
export function isAuthenticatedFromCookies(): boolean {
  const value = cookies().get(ADMIN_COOKIE_NAME)?.value
  return isAuthenticated(value)
}

import { NextRequest, NextResponse } from 'next/server'
import {
  validatePassword,
  generateSessionToken,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
} from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (!validatePassword(password ?? '')) {
      // Small artificial delay to slow down brute force
      await new Promise((r) => setTimeout(r, 500))
      return NextResponse.json({ ok: false, error: 'invalid' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set(ADMIN_COOKIE_NAME, generateSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_COOKIE_MAX_AGE,
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }
}

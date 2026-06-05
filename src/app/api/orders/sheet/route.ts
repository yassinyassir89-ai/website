import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface OrderPayload {
  orderNumber: string
  name: string
  phone: string
  city: string
  address?: string
  notes?: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  total: number
}

export async function POST(req: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ ok: false, error: 'Webhook not configured' }, { status: 500 })
  }

  try {
    const body = (await req.json()) as OrderPayload

    if (!body.orderNumber || !body.name || !body.phone) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
    }

    const articles = body.items
      .map((item) => `${item.name} x${item.quantity}`)
      .join(', ')

    const payload = {
      orderNumber: body.orderNumber,
      date: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' }),
      clientName: body.name,
      email: '',
      phone: body.phone,
      city: body.city,
      address: body.address || '',
      subtotal: body.subtotal,
      shippingCost: body.shippingCost,
      total: body.total,
      articles,
      notes: body.notes || '',
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Sheet webhook error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

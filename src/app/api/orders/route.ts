import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { generateOrderNumber } from '@/lib/utils'

async function sendToGoogleSheets(order: any, session: any) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) return

  try {
    const address = typeof order.shippingAddress === 'string'
      ? JSON.parse(order.shippingAddress)
      : order.shippingAddress

    const articles = order.items
      .map((item: any) => `${item.name} x${item.quantity}`)
      .join(', ')

    const payload = {
      orderNumber: order.orderNumber,
      date: new Date(order.createdAt).toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' }),
      clientName: `${address.firstName} ${address.lastName}`,
      email: address.email || session.user.email,
      phone: address.phone,
      city: address.city,
      address: address.address,
      subtotal: order.subtotal,
      shippingCost: order.shippingCost,
      total: order.total,
      articles,
      notes: order.notes || '',
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })
  } catch (err) {
    console.error('Google Sheets webhook error:', err)
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ orders })
  } catch {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })

    const { shippingAddress, items, subtotal, shippingCost, total, notes } = await req.json()

    if (!items?.length) {
      return NextResponse.json({ message: 'Panier vide' }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: session.user.id,
        shippingAddress: JSON.stringify(shippingAddress),
        subtotal,
        shippingCost,
        total,
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            variant: item.variant,
          })),
        },
      },
      include: { items: true },
    })

    // Sifit l Google Sheets (background — makhlidch commande ttsenna)
    sendToGoogleSheets(order, session)

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

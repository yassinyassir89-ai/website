import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })

    const { productId, rating, title, comment } = await req.json()

    if (!productId || !rating || !comment) {
      return NextResponse.json({ message: 'Données manquantes' }, { status: 400 })
    }

    const review = await prisma.review.upsert({
      where: { userId_productId: { userId: session.user.id, productId } },
      update: { rating, title, comment },
      create: { userId: session.user.id, productId, rating, title, comment },
    })

    return NextResponse.json(review, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

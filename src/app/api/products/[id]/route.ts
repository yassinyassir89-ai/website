import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { parseProduct } from '@/lib/db-utils'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
        isActive: true,
      },
      include: {
        category: true,
        variants: true,
        reviews: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ message: 'Produit introuvable' }, { status: 404 })
    }

    return NextResponse.json(parseProduct(product))
  } catch {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

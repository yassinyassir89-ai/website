import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'
import { parseProduct, serializeProduct } from '@/lib/db-utils'

async function checkAdmin(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') return null
  return session
}

export async function GET(req: Request) {
  const session = await checkAdmin(req)
  if (!session) return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })

  const products = await prisma.product.findMany({
    include: {
      category: { select: { name: true } },
      _count: { select: { reviews: true, orderItems: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ products: products.map(parseProduct) })
}

export async function POST(req: Request) {
  const session = await checkAdmin(req)
  if (!session) return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })

  try {
    const data = await req.json()
    const slug = slugify(data.name) + '-' + Date.now().toString(36)

    const product = await prisma.product.create({
      data: serializeProduct({
        name: data.name,
        nameAr: data.nameAr || null,
        slug,
        description: data.description,
        descriptionAr: data.descriptionAr || null,
        shortDesc: data.shortDesc,
        shortDescAr: data.shortDescAr || null,
        price: data.price,
        comparePrice: data.comparePrice || null,
        stock: data.stock,
        categoryId: data.categoryId,
        images: data.images || [],
        tags: data.tags || [],
        featured: data.featured || false,
        isNew: data.isNew || false,
        isBestSeller: data.isBestSeller || false,
      }) as any,
    })

    return NextResponse.json(parseProduct(product), { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

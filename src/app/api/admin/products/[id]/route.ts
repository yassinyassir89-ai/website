import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { parseProduct, serializeProduct } from '@/lib/db-utils'

async function checkAdmin() {
  const session = await getServerSession(authOptions)
  return session?.user.role === 'ADMIN' ? session : null
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })
  try {
    const data = await req.json()
    const product = await prisma.product.update({
      where: { id: params.id },
      data: serializeProduct({
        name: data.name,
        nameAr: data.nameAr || null,
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
    return NextResponse.json(parseProduct(product))
  } catch {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  if (!await checkAdmin()) return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })
  try {
    await prisma.product.update({ where: { id: params.id }, data: { isActive: false } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

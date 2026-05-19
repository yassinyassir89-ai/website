import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    if (slug) {
      const category = await prisma.category.findUnique({
        where: { slug },
        include: { children: true, parent: true },
      })
      return NextResponse.json({ category })
    }

    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: true } },
        children: { include: { _count: { select: { products: true } } } },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ categories })
  } catch {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, description, image, parentId } = body
    if (!name) return NextResponse.json({ message: 'Nom requis' }, { status: 400 })

    const slug = name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-')
    const category = await prisma.category.create({ data: { name, slug, description, image, parentId } })
    return NextResponse.json(category, { status: 201 })
  } catch {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

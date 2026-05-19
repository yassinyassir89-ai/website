import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { parseProduct } from '@/lib/db-utils'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const categoryId = searchParams.get('categoryId') || ''
    const exclude = searchParams.get('exclude') || ''
    const filter = searchParams.get('filter') || ''
    const sort = searchParams.get('sort') || 'newest'
    const bestseller = searchParams.get('bestseller') === 'true'
    const isNew = searchParams.get('new') === 'true'
    const featured = searchParams.get('featured') === 'true'
    const priceMin = parseFloat(searchParams.get('priceMin') || '0')
    const priceMax = parseFloat(searchParams.get('priceMax') || '999999')
    const categorySlugs = searchParams.get('categories')?.split(',').filter(Boolean) || []

    const where: any = {
      isActive: true,
      ...(exclude && { id: { not: exclude } }),
      ...(search && { name: { contains: search } }),
      ...(categoryId && { categoryId }),
      ...(category && { category: { slug: category } }),
      ...(categorySlugs.length && { category: { slug: { in: categorySlugs } } }),
      ...(bestseller && { isBestSeller: true }),
      ...(isNew && { isNew: true }),
      ...(featured && { featured: true }),
      price: { gte: priceMin, lte: priceMax },
    }

    if (filter === 'nouveau') where.isNew = true
    if (filter === 'bestseller') where.isBestSeller = true
    if (filter === 'promo') where.comparePrice = { not: null }
    if (filter === 'featured') where.featured = true

    const orderBy: any =
      sort === 'price-asc' ? { price: 'asc' } :
      sort === 'price-desc' ? { price: 'desc' } :
      sort === 'bestseller' ? { isBestSeller: 'desc' } :
      { createdAt: 'desc' }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          reviews: { select: { rating: true } },
        },
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      products: products.map(parseProduct),
      total,
      page,
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}

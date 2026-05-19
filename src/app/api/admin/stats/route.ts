import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })
  }

  const [
    totalOrders,
    totalProducts,
    totalUsers,
    revenueResult,
    recentOrders,
    ordersByStatusRaw,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } }, items: true },
    }),
    prisma.order.groupBy({ by: ['status'], _count: true }),
  ])

  const ordersByStatus = ordersByStatusRaw.reduce((acc, item) => {
    acc[item.status] = item._count
    return acc
  }, {} as Record<string, number>)

  return NextResponse.json({
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue: revenueResult._sum.total || 0,
    recentOrders,
    ordersByStatus,
  })
}

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })
  }
  const { name, description, image } = await req.json()
  const slug = slugify(name) + '-' + Date.now().toString(36)
  const cat = await prisma.category.update({ where: { id: params.id }, data: { name, slug, description, image } })
  return NextResponse.json(cat)
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })
  }
  await prisma.category.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}

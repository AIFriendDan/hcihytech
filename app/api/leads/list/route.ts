import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization')
  const password = auth?.startsWith('Bearer ') ? auth.slice(7) : null

  if (!process.env.LEADS_PASSWORD || password !== process.env.LEADS_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const leads = await prisma.lead.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      service: true,
      source: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return Response.json({ leads })
}

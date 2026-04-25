import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, phone, service } = body

  if (!name || !email) {
    return Response.json(
      { success: false, error: 'Name and email are required.' },
      { status: 400 }
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return Response.json(
      { success: false, error: 'Invalid email address.' },
      { status: 400 }
    )
  }

  try {
    await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        service: service || null,
        source: 'chatbot',
        status: 'new',
      },
    })
    return Response.json({ success: true })
  } catch (error) {
    console.error('Lead save error:', error)
    return Response.json(
      { success: false, error: 'Failed to save lead.' },
      { status: 500 }
    )
  }
}

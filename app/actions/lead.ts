'use server'

import { prisma } from '@/lib/prisma'

export async function submitLead(formData: {
  name: string
  email: string
  phone?: string
  service?: string
  message?: string
  source?: string
}) {
  const { name, email, phone, service, message, source = 'hchy' } = formData

  if (!name || !email) {
    return { success: false, error: 'Name and email are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }

  try {
    await prisma.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        service: service || null,
        message: message || null,
        source,
        status: 'new',
      },
    })
    return { success: true }
  } catch (error) {
    console.error('Lead submission error:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

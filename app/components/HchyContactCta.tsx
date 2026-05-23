'use client'

import { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react'
import { CONTACT } from '../lib/services-data'
import { submitLead } from '../actions/lead'

const container: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
}

export default function HchyContactCta() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await submitLead({ ...formData, source: 'contact-form' })
    setLoading(false)

    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error || 'Something went wrong.')
    }
  }

  return (
    <section id="contact" className="w-full bg-black py-20 sm:py-32">
      <motion.div
        className="container mx-auto max-w-4xl px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="rounded-2xl bg-neutral-900/50 border border-red-900/30 p-8 sm:p-12 shadow-lg">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Get <span className="text-red-600">Started</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-400">
              Tell us what you need. Free consultations for all website projects.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-2">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center justify-center gap-2 text-white hover:text-red-500 transition-colors"
              >
                <Phone size={18} className="text-red-600" /> {CONTACT.phone}
              </a>
              <a
                href={CONTACT.emailHref}
                className="flex items-center justify-center gap-2 text-white hover:text-red-500 transition-colors"
              >
                <Mail size={18} className="text-red-600" /> {CONTACT.email}
              </a>
              <span className="flex items-center justify-center gap-2 text-neutral-500">
                <MapPin size={18} /> {CONTACT.location}
              </span>
            </div>
          </div>

          {submitted ? (
            <div className="text-center space-y-4 py-8">
              <CheckCircle size={48} className="text-red-600 mx-auto" />
              <h3 className="text-2xl font-bold text-white">Message Received</h3>
              <p className="text-neutral-400">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="lead-name" className="block text-sm font-medium text-neutral-300">
                    Name *
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-900 p-3 rounded border border-neutral-700 focus:border-red-600 outline-none text-white transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lead-email" className="block text-sm font-medium text-neutral-300">
                    Email *
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-neutral-900 p-3 rounded border border-neutral-700 focus:border-red-600 outline-none text-white transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="lead-phone" className="block text-sm font-medium text-neutral-300">
                    Phone
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-900 p-3 rounded border border-neutral-700 focus:border-red-600 outline-none text-white transition-colors"
                    placeholder="(805) 555-1234"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lead-service" className="block text-sm font-medium text-neutral-300">
                    Service Interested In
                  </label>
                  <select
                    id="lead-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-neutral-900 p-3 rounded border border-neutral-700 focus:border-red-600 outline-none text-white transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="web-design">Website Design</option>
                    <option value="ai">AI Transformation</option>
                    <option value="it">IT Support</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lead-message" className="block text-sm font-medium text-neutral-300">
                  Tell us about your project
                </label>
                <textarea
                  id="lead-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-neutral-900 p-3 rounded border border-neutral-700 focus:border-red-600 outline-none text-white resize-none transition-colors"
                  placeholder="What are you looking for?"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-red-600 px-8 py-3 rounded font-bold text-white disabled:bg-neutral-800 disabled:text-neutral-500 transition-all hover:bg-red-700 active:scale-[0.98]"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { CONTACT } from '../lib/services-data'

const navLinks = [
  { href: '#web-design', label: 'Web Design' },
  { href: '#ai-services', label: 'AI Services' },
  { href: '#social-media', label: 'Social Media' },
  { href: '#it-services', label: 'IT Services' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#contact', label: 'Contact' },
]

export function HchyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-red-900/30 bg-[#0D0D0D]/90 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
          <span className="font-bold tracking-wide">
            HC<span className="lowercase">i</span>HY Tech
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-red-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex gap-4 items-center">
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <Phone size={16} /> {CONTACT.phone}
          </a>
          <a
            href="#contact"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-all"
          >
            Get a Quote
          </a>
        </div>

        <button
          className="md:hidden p-2 hover:bg-neutral-800 rounded-md transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          className="md:hidden border-t border-red-900/30 bg-[#0D0D0D] px-6 py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-neutral-300 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-red-900/30">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 py-2 text-sm text-red-500"
              >
                <Phone size={16} /> {CONTACT.phone}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white text-center hover:bg-red-700"
              >
                Get a Quote
              </a>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

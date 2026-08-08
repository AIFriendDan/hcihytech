'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { CONTACT } from '../lib/services-data'

const navLinks = [
  { href: '/web-design', label: 'Web Design' },
  { href: '/ai-consulting', label: 'AI Consulting' },
  { href: '/social-media', label: 'Social Media' },
  { href: '/it-services', label: 'IT Services' },
  { href: '/#why-us', label: 'Why Us' },
  { href: '/#contact', label: 'Contact' },
]

export function HchyHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-hcihy-chrome/15 bg-hcihy-navy/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-headline font-bold tracking-tight hover:opacity-80 transition-opacity">
          <span className="tracking-wide">
            <span className="text-hcihy-blue">
              HC<span className="lowercase">i</span>
            </span>
            <span className="text-hcihy-volt">HY</span>
            <span className="text-white"> Tech</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-hcihy-cyan"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex gap-4 items-center">
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
          >
            <Phone size={16} /> {CONTACT.phone}
          </a>
          <Link href="/#contact" className="btn-hcihy-primary !px-4 !py-2 text-sm">
            Get a Quote
          </Link>
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
          className="md:hidden border-t border-hcihy-chrome/15 bg-hcihy-navy px-6 py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-medium text-neutral-300 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-hcihy-chrome/15">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 py-2 text-sm text-hcihy-cyan"
              >
                <Phone size={16} /> {CONTACT.phone}
              </a>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-hcihy-primary w-full text-center text-sm"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

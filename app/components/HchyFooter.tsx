import { Phone, Mail } from 'lucide-react'
import { CONTACT } from '../lib/services-data'

export function HchyFooter() {
  return (
    <footer className="border-t border-red-900/30 py-8 bg-[#0D0D0D]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-neutral-500">
            <span className="font-bold text-white">HC<span className="lowercase">i</span>HY</span> Tech &copy;{' '}
            {new Date().getFullYear()}
          </div>
          <div className="flex gap-6 text-sm text-neutral-500">
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone size={14} /> {CONTACT.phone}
            </a>
            <a
              href={CONTACT.emailHref}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail size={14} /> {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

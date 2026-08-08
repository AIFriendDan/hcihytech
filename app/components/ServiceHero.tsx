import Link from 'next/link'
import { ChevronRight, MapPin } from 'lucide-react'
import { CONTACT } from '../lib/services-data'

interface ServiceHeroProps {
  h1: string
  intro: string
  label: string
}

export default function ServiceHero({ h1, intro, label }: ServiceHeroProps) {
  return (
    <section className="w-full bg-black pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="container mx-auto max-w-4xl px-6">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-neutral-500">
            <li>
              <Link href="/" className="hover:text-hcihy-cyan transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li className="text-neutral-300">{label}</li>
          </ol>
        </nav>

        <div className="flex items-center gap-2 text-neutral-400 mb-5">
          <MapPin size={16} className="text-hcihy-cyan" />
          <span className="text-sm font-medium">Serving {CONTACT.location}</span>
        </div>

        <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {h1}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">{intro}</p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="/#contact" className="btn-hcihy-primary h-12 px-8 text-base">
            Get a Free Quote
          </Link>
          <a
            href={CONTACT.phoneHref}
            className="btn-hcihy-secondary h-12 px-8 text-base flex items-center justify-center"
          >
            Call {CONTACT.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

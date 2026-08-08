import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { servicePages } from '../lib/service-pages'

interface ServiceCrossLinksProps {
  /** Slug of the page currently being viewed, so it is excluded from the list. */
  currentSlug?: string
  heading?: React.ReactNode
}

export default function ServiceCrossLinks({
  currentSlug,
  heading,
}: ServiceCrossLinksProps) {
  const others = servicePages.filter((p) => p.slug !== currentSlug)
  const cols = others.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'

  return (
    <section className="w-full bg-black py-20 sm:py-28">
      <div className="container mx-auto max-w-5xl px-6">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {heading ?? (
            <>
              Other <span className="text-hcihy-volt">services</span>
            </>
          )}
        </h2>

        <div className={`mt-10 grid grid-cols-1 gap-6 ${cols}`}>
          {others.map((page) => (
            <Link
              key={page.slug}
              href={`/${page.slug}`}
              className="hcihy-card p-6 group transition-colors hover:border-hcihy-blue/50"
            >
              <h3 className="text-lg font-bold text-white">{page.h1}</h3>
              <p className="mt-2 text-sm text-neutral-400 line-clamp-3">{page.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-hcihy-cyan">
                Learn more
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

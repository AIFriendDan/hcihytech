import type { Faq } from '../lib/service-pages'

export default function ServiceFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="w-full bg-hcihy-navy/20 py-20 sm:py-28">
      <div className="container mx-auto max-w-3xl px-6">
        <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Common <span className="text-hcihy-blue">questions</span>
        </h2>

        <dl className="mt-10 space-y-8">
          {faqs.map((faq) => (
            <div key={faq.q} className="border-b border-hcihy-chrome/15 pb-8 last:border-0">
              <dt className="text-lg font-bold text-white">{faq.q}</dt>
              <dd className="mt-3 leading-relaxed text-neutral-400">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

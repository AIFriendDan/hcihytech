import type { Metadata } from 'next'
import ServiceHero from '../components/ServiceHero'
import ServiceFaq from '../components/ServiceFaq'
import ServiceCrossLinks from '../components/ServiceCrossLinks'
import AiServices from '../components/AiServices'
import WhyChooseUs from '../components/WhyChooseUs'
import HchyContactCta from '../components/HchyContactCta'
import { getServicePage } from '../lib/service-pages'
import { buildServiceJsonLd } from '../lib/service-schema'

const page = getServicePage('ai-consulting')!

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `/${page.slug}` },
  openGraph: {
    title: page.title,
    description: page.description,
    url: `/${page.slug}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
}

export default function AiConsultingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceJsonLd(page)) }}
      />
      <ServiceHero h1={page.h1} intro={page.intro} label={page.navLabel} />
      <AiServices />
      <WhyChooseUs />
      <ServiceFaq faqs={page.faqs} />
      <ServiceCrossLinks currentSlug={page.slug} />
      <HchyContactCta />
    </div>
  )
}

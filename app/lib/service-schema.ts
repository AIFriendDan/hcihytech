import { SITE_URL, type ServicePage } from './service-pages'

const AREA_SERVED = [
  { '@type': 'AdministrativeArea', name: 'Ventura County, CA' },
  { '@type': 'City', name: 'Ventura' },
  { '@type': 'City', name: 'Oxnard' },
  { '@type': 'City', name: 'Camarillo' },
  { '@type': 'City', name: 'Thousand Oaks' },
  { '@type': 'City', name: 'Simi Valley' },
]

/**
 * Service + BreadcrumbList + FAQPage graph for a dedicated service route.
 * Returns a single @graph object so one script tag covers all three types.
 */
export function buildServiceJsonLd(page: ServicePage) {
  const url = `${SITE_URL}/${page.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.h1,
        description: page.description,
        serviceType: page.serviceType,
        url,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: AREA_SERVED,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: page.priceFrom,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            minPrice: page.priceFrom,
          },
          availability: 'https://schema.org/InStock',
          url,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: page.navLabel, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  }
}

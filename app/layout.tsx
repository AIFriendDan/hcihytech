import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { HchyHeader } from './components/HchyHeader'
import { HchyFooter } from './components/HchyFooter'
import { ChatWidget } from './components/ChatWidget'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const SITE_URL = 'https://hcihytech.com'
const OG_IMAGE = `${SITE_URL}/og-image.png`
const TITLE = 'HCiHY Tech | IT Services & AI Consulting — Ventura County'
const DESCRIPTION =
  'Local IT services and AI consulting for Ventura County contractors and small businesses. 15+ years enterprise experience. Get a free quote today.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'HCiHY Tech',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'HCiHY Tech — IT Services & AI Consulting Ventura County',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'HCiHY Tech',
  alternateName: 'How Can i Help You Tech',
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: '+1-805-616-4676',
  email: 'dan.garza@aifrienddan.com',
  image: OG_IMAGE,
  logo: `${SITE_URL}/hcihy-logo.png`,
  priceRange: '$$',
  founder: {
    '@type': 'Person',
    name: 'Dan Garza',
    jobTitle: 'IT Consultant & AI Solutions Architect',
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Ventura County, CA' },
    { '@type': 'City', name: 'Ventura' },
    { '@type': 'City', name: 'Oxnard' },
    { '@type': 'City', name: 'Camarillo' },
    { '@type': 'City', name: 'Thousand Oaks' },
    { '@type': 'City', name: 'Simi Valley' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'HCiHY Tech Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Design & Development',
          description:
            'Custom websites for small businesses, contractors, and service professionals.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Consulting & Automation',
          description:
            'AI-powered workflows, chatbots, and automation for business operations.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'IT Support & Managed Services',
          description:
            'Onsite and remote IT support, network setup, and technology consulting.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Social Media Management',
          description: 'Content creation and social media management for local businesses.',
        },
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <HchyHeader />
        {children}
        <HchyFooter />
        <ChatWidget />
      </body>
    </html>
  )
}

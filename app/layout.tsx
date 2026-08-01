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
const LOGO = `${SITE_URL}/hcihy-logo.png`
const TITLE = 'HCiHY Tech | IT Services & AI Consulting in Ventura County'
const DESCRIPTION =
  'IT services, AI consulting, automation, and web solutions for Ventura County businesses. Get expert technology help from HCiHY Tech today.'

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
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
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
  image: LOGO,
  logo: LOGO,
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
    { '@type': 'City', name: 'Santa Barbara' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'HCiHY Tech Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'IT Support',
          description:
            'Onsite and remote IT support, network setup, and technology troubleshooting.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Managed IT Services',
          description:
            'Ongoing managed IT for small businesses — monitoring, maintenance, and vendor management.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Consulting',
          description:
            'AI strategy and implementation, including chatbots and AI-powered business tools.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automation Consulting',
          description:
            'Workflow automation that removes repetitive manual work from business operations.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development',
          description:
            'Custom websites for small businesses, contractors, and service professionals.',
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

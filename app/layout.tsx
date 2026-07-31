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

const siteUrl = 'https://hcihytech.com'
const title = 'HCiHY Tech | IT Services & AI Consulting in Ventura County'
const description =
  'IT services, AI consulting, automation, and web solutions for Ventura County businesses. Get expert technology help from HCiHY Tech today.'

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'HCiHY Tech',
  url: siteUrl,
  areaServed: [
    'Ventura County',
    'Ventura',
    'Oxnard',
    'Camarillo',
    'Santa Barbara',
  ],
  serviceType: [
    'IT Support',
    'Managed IT Services',
    'AI Consulting',
    'Automation Consulting',
    'Web Development',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'HCiHY Tech',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HCiHY Tech IT Services and AI Consulting in Ventura County',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c'),
          }}
        />
        <HchyHeader />
        {children}
        <HchyFooter />
        <ChatWidget />
      </body>
    </html>
  )
}

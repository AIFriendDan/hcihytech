import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { HchyHeader } from './components/HchyHeader'
import { HchyFooter } from './components/HchyFooter'
import { ChatWidget } from './components/ChatWidget'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://hcihytech.com'),
  title: 'HCiHY Tech | IT Services & AI Consulting in Ventura County',
  description:
    'IT services, AI consulting, automation, and web solutions for Ventura County businesses. Get expert technology help from HCiHY Tech today.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HCiHY Tech | IT Services & AI Consulting in Ventura County',
    description: 'IT services, AI consulting, automation, and web solutions for Ventura County businesses.',
    url: 'https://hcihytech.com',
    siteName: 'HCiHY Tech',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HCiHY Tech — IT Services & AI Consulting Ventura County' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HCiHY Tech | IT Services & AI Consulting',
    description: 'Helping Ventura County businesses with IT support, automation, and AI solutions.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <HchyHeader />
        {children}
        <HchyFooter />
        <ChatWidget />
      </body>
    </html>
  )
}

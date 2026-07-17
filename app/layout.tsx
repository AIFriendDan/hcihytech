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

export const metadata: Metadata = {
  title: 'HCiHY Tech | IT Services & AI Consulting — Ventura County',
  description:
    'Local IT services and AI consulting for Ventura County contractors and professionals. 15+ years enterprise experience. Real help from a real neighbor.',
  openGraph: {
    title: 'HCiHY Tech | IT Services & AI Consulting — Ventura County',
    description:
      'Local IT services and AI consulting for Ventura County contractors and professionals. Real help from a real neighbor.',
    url: 'https://hcihytech.com',
    siteName: 'HCiHY Tech',
    images: [
      {
        url: 'https://hcihytech.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HCiHY Tech — IT Services & AI Consulting Ventura County',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
        <HchyHeader />
        {children}
        <HchyFooter />
        <ChatWidget />
      </body>
    </html>
  )
}

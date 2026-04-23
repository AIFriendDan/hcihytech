import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { HchyHeader } from './components/HchyHeader'
import { HchyFooter } from './components/HchyFooter'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
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
    <html lang="en">
      <body className={poppins.className}>
        <HchyHeader />
        {children}
        <HchyFooter />
      </body>
    </html>
  )
}

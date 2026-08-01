import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leads Dashboard | HCiHY Tech',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
}

export default function LeadsLayout({ children }: { children: React.ReactNode }) {
  return children
}

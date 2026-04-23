export interface ServicePackage {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
}

export const webDesignPackages: ServicePackage[] = [
  {
    name: 'Basic',
    price: '$1,200',
    description: 'Perfect for small businesses getting online.',
    features: [
      '5-7 professionally designed pages',
      'Mobile-responsive design',
      'Contact form with email notifications',
      'Basic SEO setup',
      'SSL security certificate',
      '5-7 business day delivery',
    ],
  },
  {
    name: 'Contractor',
    price: '$1,500',
    description: 'Built for trades & service professionals.',
    features: [
      'Service area map with coverage zones',
      'Before/after photo showcase',
      'Free quote request form',
      'Click-to-call mobile buttons',
      'License & certification display',
      'Local SEO optimization',
    ],
  },
  {
    name: 'Photography',
    price: '$1,800',
    description: 'Showcase your portfolio beautifully.',
    features: [
      'Multiple portfolio galleries',
      'Lightbox image viewer',
      'Client proofing gallery',
      'Booking inquiry form',
      'Instagram feed integration',
      'Fast-loading image optimization',
    ],
  },
  {
    name: 'Professional',
    price: '$2,200',
    highlighted: true,
    badge: 'Most Popular',
    description: 'Full-featured business website with everything you need.',
    features: [
      '8-12 professionally designed pages',
      'Custom branding integration',
      'Blog / news section',
      'Advanced SEO optimization',
      'Google Analytics setup',
      'Newsletter signup integration',
    ],
  },
  {
    name: 'Premium',
    price: '$3,500',
    description: 'Enterprise-grade with custom functionality.',
    features: [
      '12-20 pages with premium design',
      'Online booking or e-commerce',
      'Custom animations & interactions',
      'Advanced SEO & schema markup',
      'Email marketing integration',
      '30 days post-launch support',
    ],
  },
]

export const aiPackages: ServicePackage[] = [
  {
    name: 'AI Starter',
    price: '$499',
    description: 'Perfect for businesses new to AI.',
    features: [
      'Email management automation',
      'Document digitization (100 docs)',
      '1 custom workflow automation',
      '2-hour training session',
      '30-day email support',
    ],
  },
  {
    name: 'AI Growth',
    price: '$1,299',
    highlighted: true,
    badge: 'Best Value',
    description: 'Comprehensive automation for growing businesses.',
    features: [
      '24/7 customer service chatbot',
      'Social media content generator',
      'Smart scheduling system',
      '5 custom automations',
      '4 hours training + 60-day support',
    ],
  },
  {
    name: 'AI Enterprise',
    price: '$2,999',
    description: 'Full digital transformation.',
    features: [
      'Custom GPT/Claude assistant',
      'CRM integration with AI lead scoring',
      'Financial dashboard with analytics',
      'Voice system & call transcription',
      'Unlimited automations + 90-day support',
    ],
  },
]

export const CONTACT = {
  phone: '805-616-4676',
  phoneHref: 'tel:+18056164676',
  email: 'dan.garza@aifrienddan.com',
  emailHref: 'mailto:dan.garza@aifrienddan.com',
  location: 'Ventura County, CA',
} as const

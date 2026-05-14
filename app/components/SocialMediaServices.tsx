'use client'

import { motion, Variants } from 'framer-motion'
import { Share2, Check } from 'lucide-react'

const container: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20, staggerChildren: 0.15 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const tiers = [
  {
    name: 'Starter',
    price: '$497',
    billing: 'one-time',
    description: 'Brand setup + 1 custom carousel',
    features: [
      'Brand voice & aesthetic setup',
      '1 fully designed custom carousel',
      'Platform-ready export (IG/FB/LinkedIn)',
      'Content brief + caption',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$997',
    billing: '/mo',
    description: 'Monthly content system, 4 carousels/month',
    features: [
      '4 custom carousels per month',
      'Content calendar & strategy',
      'Captions + hashtag sets',
      'Monthly performance review',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'VIP',
    price: '$1,997',
    billing: '/mo',
    description: 'Full done-for-you content management',
    features: [
      'Everything in Growth',
      'Daily story/reel concepts',
      'Scheduling & posting handled',
      'Dedicated content strategist',
    ],
    highlighted: false,
  },
]

export default function SocialMediaServices() {
  return (
    <section id="social-media" className="w-full bg-black py-20 sm:py-32">
      <motion.div
        className="container mx-auto max-w-5xl space-y-12 px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={item} className="text-center space-y-4">
          <div className="flex justify-center">
            <Share2 size={40} className="text-red-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Social Media <span className="text-red-600">Content Strategy</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            We turn your story into content that actually works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={item}
              className={`relative flex flex-col p-6 rounded-lg border ${
                tier.highlighted
                  ? 'border-red-600 bg-neutral-900/70 shadow-lg shadow-red-900/20'
                  : 'border-red-900/30 bg-neutral-900/50'
              } hover:border-red-600/50 transition-colors`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {tier.badge}
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              <p className="mt-2">
                <span className="text-3xl font-extrabold text-red-600">{tier.price}</span>
                <span className="text-neutral-400 text-sm">{tier.billing}</span>
              </p>
              <p className="text-neutral-400 mt-2 text-sm">{tier.description}</p>
              <ul className="mt-6 space-y-3 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-neutral-300">
                    <Check size={16} className="text-red-600 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-6 block w-full text-center rounded-md py-3 text-sm font-medium transition-all ${
                  tier.highlighted
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'border border-red-900/50 text-white hover:bg-red-900/20'
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.hcihytech.com/tammy-beatty-preview.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border border-red-600 px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition-all"
          >
            See a Live Example →
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-block rounded-md bg-red-600 px-6 py-3 text-sm font-medium text-white hover:bg-red-700 transition-all"
          >
            Get Your Free Preview
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

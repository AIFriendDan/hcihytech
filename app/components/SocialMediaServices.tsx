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
            <Share2 size={40} className="text-hcihy-emerald" />
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Social Media <span className="text-hcihy-emerald">Content Strategy</span>
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
              className={`relative flex flex-col p-6 ${
                tier.highlighted ? 'hcihy-card-highlighted' : 'hcihy-card'
              }`}
            >
              {tier.badge && <div className="hcihy-badge">{tier.badge}</div>}
              <h3 className="font-headline text-xl font-bold text-white">{tier.name}</h3>
              <p className="mt-2">
                <span className="text-3xl font-extrabold text-hcihy-blue">{tier.price}</span>
                <span className="text-neutral-400 text-sm">{tier.billing}</span>
              </p>
              <p className="text-neutral-400 mt-2 text-sm">{tier.description}</p>
              <ul className="mt-6 space-y-3 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-neutral-300">
                    <Check size={16} className="text-hcihy-emerald mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-6 w-full text-sm ${
                  tier.highlighted ? 'btn-hcihy-primary' : 'btn-hcihy-secondary'
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
            className="btn-hcihy-secondary text-sm"
          >
            See a Live Example →
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-hcihy-primary text-sm"
          >
            Request Your Free Content Audit
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

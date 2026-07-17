'use client'

import { motion, Variants } from 'framer-motion'
import { Check } from 'lucide-react'
import type { ServicePackage } from '../lib/services-data'

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function PricingCard({ pkg }: { pkg: ServicePackage }) {
  return (
    <motion.div
      variants={item}
      className={`relative flex flex-col p-6 ${
        pkg.highlighted ? 'hcihy-card-highlighted' : 'hcihy-card'
      }`}
    >
      {pkg.badge && <div className="hcihy-badge">{pkg.badge}</div>}

      <h3 className="font-headline text-xl font-bold text-white">{pkg.name}</h3>
      <p className="text-3xl font-extrabold text-hcihy-blue mt-2">{pkg.price}</p>
      <p className="text-neutral-400 mt-2 text-sm">{pkg.description}</p>

      <ul className="mt-6 space-y-3 flex-grow">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
            <Check size={16} className="text-hcihy-emerald mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`mt-6 w-full text-sm ${
          pkg.highlighted ? 'btn-hcihy-primary' : 'btn-hcihy-secondary'
        }`}
      >
        Get Started
      </a>
    </motion.div>
  )
}

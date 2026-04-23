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
      className={`relative flex flex-col p-6 rounded-lg border ${
        pkg.highlighted
          ? 'border-red-600 bg-neutral-900/70 shadow-lg shadow-red-900/20'
          : 'border-red-900/30 bg-neutral-900/50'
      } hover:border-red-600/50 transition-colors`}
    >
      {pkg.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {pkg.badge}
        </div>
      )}

      <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
      <p className="text-3xl font-extrabold text-red-600 mt-2">{pkg.price}</p>
      <p className="text-neutral-400 mt-2 text-sm">{pkg.description}</p>

      <ul className="mt-6 space-y-3 flex-grow">
        {pkg.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
            <Check size={16} className="text-red-600 mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`mt-6 block w-full text-center rounded-md py-3 text-sm font-medium transition-all ${
          pkg.highlighted
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'border border-red-900/50 text-white hover:bg-red-900/20'
        }`}
      >
        Get Started
      </a>
    </motion.div>
  )
}

'use client'

import { motion, Variants } from 'framer-motion'
import { Bot } from 'lucide-react'
import { aiPackages } from '../lib/services-data'
import PricingCard from './PricingCard'

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

export default function AiServices() {
  return (
    <section id="ai-services" className="w-full bg-neutral-900/50 py-20 sm:py-32">
      <motion.div
        className="container mx-auto max-w-5xl space-y-12 px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={item} className="text-center space-y-4">
          <div className="flex justify-center">
            <Bot size={40} className="text-red-600" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            AI <span className="text-red-600">Transformation</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            Stop paying humans to do what AI can handle. We help local businesses
            automate workflows, deploy chatbots, and adopt AI — no jargon required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiPackages.map((pkg, i) => (
            <PricingCard key={i} pkg={pkg} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

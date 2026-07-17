'use client'

import { motion, Variants } from 'framer-motion'
import { webDesignPackages } from '../lib/services-data'
import PricingCard from './PricingCard'

const container: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20, staggerChildren: 0.12 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function WebDesignPackages() {
  return (
    <section id="web-design" className="w-full bg-black py-20 sm:py-32">
      <motion.div
        className="container mx-auto max-w-6xl space-y-12 px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={item} className="text-center space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Website Design <span className="text-hcihy-blue">Packages</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            Every business deserves a professional website. Choose a package
            that fits your needs — or let us build something custom.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webDesignPackages.map((pkg, index) => (
            <PricingCard key={index} pkg={pkg} />
          ))}
        </div>

        <motion.p variants={item} className="text-center text-neutral-500 text-sm">
          All packages include mobile-responsive design, SSL certificate, and 14-day post-launch support.
          You own 100% of the website — no monthly fees to us.
        </motion.p>
      </motion.div>
    </section>
  )
}

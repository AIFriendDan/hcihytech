'use client'

import { motion, Variants } from 'framer-motion'

const container: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
}

export default function HchyAbout() {
  return (
    <section id="about" className="w-full bg-neutral-900 py-20 sm:py-28">
      <motion.div
        className="container mx-auto max-w-4xl space-y-6 px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          About <span className="text-red-600">Dan</span>
        </h2>
        <p className="text-lg leading-relaxed text-neutral-300">
          I&apos;ve been a proud Ventura local since 1988 — born and raised right here in 805 country.
          Class of &apos;93 from Buena High School. Ventura&apos;s in my blood, and everything I build is
          with this community in mind. When you work with me, you&apos;re working with a neighbor —
          not some faceless tech company.
        </p>
      </motion.div>
    </section>
  )
}

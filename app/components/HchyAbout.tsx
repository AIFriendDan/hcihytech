'use client'

import Image from 'next/image'
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
    <section id="about" className="w-full bg-hcihy-navy/30 py-20 sm:py-28">
      <motion.div
        className="container mx-auto max-w-4xl px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
          About <span className="text-hcihy-blue">Dan</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="shrink-0">
            <Image
              src="/IMG_7611__3_.jpg"
              alt="Dan Garza headshot"
              width={300}
              height={300}
              className="rounded-2xl object-cover w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72"
            />
          </div>
          <p className="text-lg leading-relaxed text-neutral-300">
            I&apos;ve been in tech since 2006 — and at the enterprise level since 2015. I&apos;ve worked every stage
            of the game: Level 1, Level 2, Level 3 support, Lead, and Manager. I hold a B.A. in Information
            Technology and an MBA in Leadership and Finance. I didn&apos;t just study this stuff — I lived it, led
            teams around it, and eventually decided I could do more good building directly for people than
            climbing a corporate ladder.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

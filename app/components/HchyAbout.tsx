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
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <div className="shrink-0">
            <Image
              src="/IMG_7611__3_.jpg"
              alt="Dan Garza headshot"
              width={300}
              height={300}
              className="h-48 w-48 rounded-2xl object-cover sm:h-64 sm:w-64 lg:h-72 lg:w-72"
            />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-neutral-300">
            <p>
              I&apos;ve been in tech since 2006, and at the enterprise level since 2015. Somewhere in there I worked
              pretty much every rung of tech support there is: Level 1 taking the first call, Level 2 digging into
              the harder tickets, Level 3 owning the stuff nobody else could crack, then Lead, then Manager running
              the whole desk. I picked up a B.A. in Information Technology along the way, and later an MBA in
              Leadership and Finance because I wanted the business side too, not just the technical side.
            </p>
            <p>
              None of that was theory for me. I answered the phones, I escalated the tickets, I trained the people
              who answered the phones after me, and eventually I ran the teams doing it. That&apos;s years of watching
              what actually breaks for people and how support really works when the fires are real. At some point I
              realized I could do more good building tools and services directly for people than staying inside
              another company&apos;s org chart, so that&apos;s the move I made.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

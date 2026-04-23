'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function HchyHero() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 sm:py-32 bg-black">
      <motion.div
        className="max-w-4xl space-y-8 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="flex items-center justify-center gap-2 text-neutral-400">
          <MapPin size={16} className="text-red-600" />
          <span className="text-sm font-medium">Serving Ventura County &amp; Beyond</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Websites That Work
          <br className="hidden sm:block" />
          <span className="text-red-600">As Hard As You Do.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl"
        >
          Professional web design, AI-powered solutions, and reliable IT support
          for local businesses. Built fast, priced fair, owned by you.
        </motion.p>

        <motion.div variants={item} className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
          <motion.a
            href="#web-design"
            className="group flex h-12 items-center justify-center gap-2 rounded-md bg-red-600 px-8 text-lg font-medium text-white shadow-md transition-all hover:bg-red-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Web Design Packages
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            href="#contact"
            className="flex h-12 items-center justify-center gap-2 rounded-md border border-red-900/50 bg-transparent px-8 text-lg font-medium text-white transition-all hover:bg-red-900/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get a Free Quote
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

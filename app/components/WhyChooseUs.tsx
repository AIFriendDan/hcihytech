'use client'

import { motion, Variants } from 'framer-motion'
import { MapPin, Zap, Users, Clock } from 'lucide-react'

const container: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20, staggerChildren: 0.2 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const reasons = [
  { icon: MapPin, title: 'Local to Ventura County', desc: 'On-site when you need it. No offshore outsourcing.' },
  { icon: Zap, title: 'AI-Powered Efficiency', desc: 'We use AI to build faster and smarter — savings we pass to you.' },
  { icon: Users, title: 'Plain English', desc: "No jargon. We explain everything so you understand what you're paying for." },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Most websites delivered in 1-2 weeks. IT support same-day or next-day.' },
]

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="w-full bg-neutral-900/50 py-20 sm:py-32">
      <motion.div
        className="container mx-auto max-w-4xl space-y-12 px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={item}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center"
        >
          Why <span className="text-red-600">HC<span className="lowercase">i</span>HY Tech</span>?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {reasons.map((r, i) => (
            <motion.div key={i} variants={item} className="flex gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-red-600/10 flex items-center justify-center">
                <r.icon size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{r.title}</h3>
                <p className="mt-1 text-neutral-400 text-sm">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

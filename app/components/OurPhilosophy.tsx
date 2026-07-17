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

export default function OurPhilosophy() {
  return (
    <section id="philosophy" className="w-full bg-black py-20 sm:py-28">
      <motion.div
        className="container mx-auto max-w-4xl px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
          <span className="text-hcihy-blue">
            &ldquo;How Can{' '}
            <span className="lowercase">i</span>{' '}
            Help You?&rdquo;
          </span>{' '}
          &mdash; That&apos;s Not a Tagline. That&apos;s How I Operate.
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-neutral-300">
          <p>
            I&apos;m not here to sell you something. I&apos;m here to solve your problem. Whatever that looks like.
          </p>
          <p>
            I&apos;ve sat across from small business owners who needed a $10,000 website to get to the next level
            &mdash; and couldn&apos;t afford it. You know what I did? I found a way to get them that website.
            Payment plan, deep discount, whatever it took. Because they deserved it, and I was invested in their success.
          </p>
          <p>
            That&apos;s not a business strategy. That&apos;s just who I am.
          </p>
          <p>
            If I can help you and it costs me nothing, I&apos;ll help you for free. If you need more than you can pay
            for right now, we&apos;ll figure it out. I&apos;m not running a transaction &mdash; I&apos;m building
            relationships. And the businesses I work with feel that difference from day one.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

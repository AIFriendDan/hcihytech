'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.35, rotate: -42, x: 70, y: -260 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    x: 0,
    y: [0, -6, 0],
    transition: {
      default: { type: 'spring', stiffness: 120, damping: 12, mass: 0.9 },
      y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 },
    },
  },
}

function ChainBadge() {
  return (
    <motion.div className="relative h-[132px] w-[132px]" variants={badgeVariants}>
      <div
        className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(5,137,255,0.35)]"
        style={{
          background:
            'conic-gradient(from 0deg,#e8ecf2,#8b93a3 20%,#f4f6f9 35%,#6b7280 50%,#e8ecf2 65%,#9aa2b2 80%,#f4f6f9 100%)',
          animation: 'hcihy-ring-spin 14s linear infinite',
        }}
      />
      <div
        className="absolute inset-[6px] overflow-hidden rounded-full"
        style={{ background: 'radial-gradient(circle at 38% 32%, #10233f, #060f22 70%)' }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%" className="absolute inset-0">
          <rect x="18" y="32" width="48" height="24" rx="12" fill="none" stroke="#040a16" strokeWidth="13" transform="rotate(-38 42 44)" />
          <rect x="18" y="32" width="48" height="24" rx="12" fill="none" stroke="var(--hcihy-blue)" strokeWidth="9" transform="rotate(-38 42 44)" />
          <rect x="34" y="44" width="48" height="24" rx="12" fill="none" stroke="#040a16" strokeWidth="13" transform="rotate(-38 58 56)" />
          <rect x="34" y="44" width="48" height="24" rx="12" fill="none" stroke="var(--hcihy-volt)" strokeWidth="9" transform="rotate(-38 58 56)" />
        </svg>
        <div
          className="absolute left-0 top-0 h-full w-2/5"
          style={{
            background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.35), transparent)',
            animation: 'hcihy-shine 3.4s ease-in-out infinite',
            animationDelay: '1.1s',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function HchyHero() {
  const [playIntro, setPlayIntro] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem('hcihy-hero-played')) {
      setPlayIntro(false)
    } else {
      sessionStorage.setItem('hcihy-hero-played', '1')
    }
  }, [])

  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 sm:py-32 bg-black">
      <style>{`
        @keyframes hcihy-ring-spin { to { transform: rotate(360deg); } }
        @keyframes hcihy-shine {
          0% { transform: translateX(-120%) rotate(20deg); }
          100% { transform: translateX(220%) rotate(20deg); }
        }
      `}</style>
      <motion.div
        className="max-w-4xl space-y-8 text-center flex flex-col items-center"
        variants={container}
        initial={playIntro ? 'hidden' : 'show'}
        animate="show"
      >
        <motion.div variants={item} className="flex items-center justify-center gap-2 text-neutral-400">
          <MapPin size={16} className="text-hcihy-cyan" />
          <span className="text-sm font-medium">Serving Ventura County &amp; Beyond</span>
        </motion.div>

        <ChainBadge />

        <motion.div
          variants={item}
          aria-hidden="true"
          className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          <span className="text-hcihy-blue">HC</span>
          <span className="text-hcihy-volt">iHY</span>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-4 text-hcihy-chrome">
          <span className="h-px w-8 bg-hcihy-chrome/40" />
          <span className="font-mono text-sm uppercase tracking-[0.22em]">
            How Can <span className="text-hcihy-volt">I Help</span> You?
          </span>
          <span className="h-px w-8 bg-hcihy-chrome/40" />
        </motion.div>

        <motion.h1
          variants={item}
          className="font-headline text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl lg:text-4xl"
        >
          IT Services &amp; AI Consulting in Ventura County
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
            className="btn-hcihy-primary group h-12 px-8 text-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Web Design Packages
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            href="#contact"
            className="btn-hcihy-secondary h-12 px-8 text-lg"
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

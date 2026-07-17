'use client'

import { motion, Variants } from 'framer-motion'
import { Shield, Wifi, Monitor, HardDrive, Headphones } from 'lucide-react'

const container: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20, staggerChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const services = [
  { icon: Wifi, title: 'Networking', desc: 'Wi-Fi setup, network security, and connectivity solutions.' },
  { icon: Shield, title: 'Security', desc: 'Antivirus, firewall configuration, and data protection.' },
  { icon: Monitor, title: 'Setup & Migration', desc: 'New computer setup, data transfer, and cloud migration.' },
  { icon: HardDrive, title: 'Backup & Recovery', desc: 'Automated backups and disaster recovery planning.' },
  { icon: Headphones, title: 'Ongoing Support', desc: 'Monthly packages starting at $400/mo for peace of mind.' },
]

export default function ItServices() {
  return (
    <section id="it-services" className="w-full bg-black py-20 sm:py-32">
      <motion.div
        className="container mx-auto max-w-5xl space-y-12 px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={item} className="text-center space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Traditional <span className="text-hcihy-blue">IT Services</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-400">
            Fast, reliable tech support for homes and businesses.
            Remote at $85/hr, on-site at $115/hr, or save with monthly packages.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div key={i} variants={item} className="hcihy-card p-6">
              <svc.icon size={32} className="text-hcihy-blue mb-4" />
              <h3 className="text-lg font-bold text-white">{svc.title}</h3>
              <p className="mt-2 text-sm text-neutral-400">{svc.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="text-center">
          <a href="#contact" className="btn-hcihy-secondary text-sm">
            Request IT Support
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

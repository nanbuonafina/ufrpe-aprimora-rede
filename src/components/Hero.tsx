import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { Container } from './ui/Container'
import { hero } from '../data/content'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark"
    >
      {/* Decorative shapes echoing the brand emblem's four-color quadrants */}
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-olive blur-3xl" />
        <div className="absolute right-1/3 top-1/2 h-56 w-56 rounded-full bg-primary-dark blur-3xl" />
      </div>

      <Container className="relative py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
            <MapPin size={13} aria-hidden="true" />
            {hero.tag}
          </span>

          <h1 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            {hero.title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#assessoria"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-dark shadow-pop transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCta}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

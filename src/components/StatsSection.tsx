import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { programNumbers } from '../data/content'
import { useCountUp } from '../lib/useCountUp'

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { value: animated, ref } = useCountUp(value)
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="rounded-2xl border border-white/15 bg-white/10 px-4 py-6 text-center backdrop-blur-sm"
    >
      <span className="block font-display text-3xl font-semibold text-white sm:text-4xl">
        {animated}
        {suffix}
      </span>
      <span className="mt-2 block text-xs leading-snug text-white/80 sm:text-sm">{label}</span>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="bg-gradient-to-br from-olive to-olive-dark py-20">
      <Container>
        <SectionHeading
          eyebrow="O programa em números"
          title="Um piloto nacional com raízes no território da RMR"
          light
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {programNumbers.map((item) => (
            <StatItem key={item.label} {...item} />
          ))}
        </div>
      </Container>
    </section>
  )
}

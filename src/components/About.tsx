import { motion } from 'framer-motion'
import { Target } from 'lucide-react'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'
import { offerCards, eixos, ods } from '../data/content'

const toneClasses = {
  primary: 'bg-primary/10 text-primary-dark',
  olive: 'bg-olive/10 text-olive',
  accent: 'bg-accent/15 text-accent-dark',
} as const

export function About() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-base-light py-20">
      <Container>
        <SectionHeading
          eyebrow="O que oferecemos"
          title="Assessoria completa para sua OSC"
          description="A equipe da UFRPE oferece suporte gratuito às organizações da sociedade civil cadastradas no programa, com foco em fortalecer a atuação das entidades no SUAS."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-line bg-white p-6 shadow-card transition-transform hover:-translate-y-1"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${toneClasses[card.tone]}`}>
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.description}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Eixos do Aprimora Rede+
            </span>
            <h3 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">
              Cinco eixos estruturam o fortalecimento da rede socioassistencial
            </h3>
            <ol className="mt-6 space-y-4">
              {eixos.map((eixo, i) => (
                <motion.li
                  key={eixo.numero}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex gap-4 rounded-xl border border-line bg-white p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {eixo.numero}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-ink">{eixo.titulo}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{eixo.descricao}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-olive">
              Compromisso público
            </span>
            <h3 className="mt-2 text-xl font-semibold text-ink sm:text-2xl">
              Alinhado aos Objetivos de Desenvolvimento Sustentável
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              O programa contribui diretamente para quatro ODS da Agenda 2030 da ONU, reforçando o
              papel das OSCs como coprodutoras de políticas públicas.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {ods.map((item) => (
                <div
                  key={item.numero}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-olive text-sm font-bold text-white">
                    <Target size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block text-xs font-semibold text-olive">ODS {item.numero}</span>
                    <span className="block text-xs leading-snug text-ink-soft">{item.titulo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

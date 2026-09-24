import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import {
  eixosIndicadores,
  formatPct,
  serieResumo,
  totalIndicadores,
  type EixoIndicadores,
} from '../../data/indicadores'
import { IndicadoresPanel } from './IndicadoresPanel'

export function IndicadoresSection() {
  const [openEixo, setOpenEixo] = useState<string | null>(null)

  return (
    <section id="indicadores" className="scroll-mt-20 bg-base-light py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Indicadores · Marco Zero"
            title="Como estão as OSCs da RMR hoje"
            description={`${totalIndicadores} indicadores em ${eixosIndicadores.length} eixos formam a linha de base do programa. Eles vão mostrar a evolução das organizações ao longo do assessoramento.`}
          />
          <button
            type="button"
            onClick={() => setOpenEixo(eixosIndicadores[0].id)}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary hover:text-white"
          >
            Ver todos os indicadores
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {eixosIndicadores.map((eixo) => (
            <li key={eixo.id} className="flex">
              <EixoCard eixo={eixo} onOpen={() => setOpenEixo(eixo.id)} />
            </li>
          ))}
        </ul>
      </Container>

      {openEixo && (
        <IndicadoresPanel activeId={openEixo} onChangeEixo={setOpenEixo} onClose={() => setOpenEixo(null)} />
      )}
    </section>
  )
}

function EixoCard({ eixo, onOpen }: { eixo: EixoIndicadores; onOpen: () => void }) {
  const Icon = eixo.icon
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex w-full flex-col rounded-2xl border border-line bg-white p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-pop"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary-dark">
          <Icon size={20} aria-hidden="true" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Eixo {eixo.numero}</span>
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug text-ink lg:min-h-[4.125rem]">{eixo.titulo}</h3>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <span className="block font-sans text-4xl font-semibold text-ink">{formatPct(eixo.forca.valor)}</span>
          <span className="mt-1 block text-sm leading-snug text-ink-soft lg:min-h-[3.625rem]">{eixo.forca.texto}</span>
        </div>
      </div>

      <MiniBars valores={serieResumo(eixo)} destaque={eixo.forca.valor} />

      <span className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs font-medium text-ink-soft">
        {eixo.indicadores.length} {eixo.indicadores.length === 1 ? 'indicador' : 'indicadores'}
        <span className="flex items-center gap-1 text-primary-dark">
          Ver detalhes
          <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </button>
  )
}

/** Mini-gráfico decorativo: o número em destaque já está em texto no card. */
function MiniBars({ valores, destaque }: { valores: number[]; destaque: number }) {
  const idxDestaque = valores.indexOf(destaque)
  return (
    <div className="my-4 flex h-10 items-end gap-[2px]" aria-hidden="true">
      {valores.slice(0, 9).map((v, i) => (
        <span
          key={i}
          className={`w-full max-w-[14px] rounded-t-sm ${i === idxDestaque ? 'bg-primary' : 'bg-primary/25'}`}
          style={{ height: `${Math.max(v, 4)}%` }}
        />
      ))}
    </div>
  )
}

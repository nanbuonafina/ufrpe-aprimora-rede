import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { BarChart3, Scale, Table2, TrendingDown, TrendingUp, X } from 'lucide-react'
import {
  eixosIndicadores,
  formatPct,
  type EixoIndicadores,
  type Indicador,
  type IndicadorPercentual,
} from '../../data/indicadores'
import {
  BarList,
  Calculo,
  ComparativoBadge,
  StackedLevels,
  StatTile,
  TableCategorias,
  TableNiveis,
  TablePercentuais,
} from './IndicadorCharts'

type Visao = 'grafico' | 'tabela'

type Bloco =
  | { kind: 'percentuais'; id: string; indicadores: IndicadorPercentual[] }
  | { kind: 'single'; id: string; indicador: Exclude<Indicador, IndicadorPercentual> }

/** Agrupa percentuais consecutivos num único gráfico de barras; os demais viram blocos próprios. */
function agruparBlocos(indicadores: Indicador[]): Bloco[] {
  const blocos: Bloco[] = []
  for (const ind of indicadores) {
    const ultimo = blocos[blocos.length - 1]
    if (ind.tipo === 'percentual') {
      if (ultimo?.kind === 'percentuais') ultimo.indicadores.push(ind)
      else blocos.push({ kind: 'percentuais', id: ind.id, indicadores: [ind] })
    } else {
      blocos.push({ kind: 'single', id: ind.id, indicador: ind })
    }
  }
  return blocos
}

interface IndicadoresPanelProps {
  activeId: string
  onChangeEixo: (id: string) => void
  onClose: () => void
}

export function IndicadoresPanel({ activeId, onChangeEixo, onClose }: IndicadoresPanelProps) {
  const [visao, setVisao] = useState<Visao>('grafico')
  const dialogRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const eixo = eixosIndicadores.find((e) => e.id === activeId) ?? eixosIndicadores[0]

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    tabRefs.current[activeId]?.focus()
    return () => {
      document.body.style.overflow = ''
      opener?.focus()
    }
    // Só no mount/unmount: foco inicial na aba ativa e devolução ao card que abriu.
  }, [])

  function handleDialogKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab' || !dialogRef.current) return
    // Mantém o foco dentro do modal.
    const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]):not([tabindex="-1"]), summary, [href], [tabindex="0"]',
    )
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  function handleTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const n = eixosIndicadores.length
    const next =
      e.key === 'ArrowRight' ? (index + 1) % n
      : e.key === 'ArrowLeft' ? (index - 1 + n) % n
      : e.key === 'Home' ? 0
      : e.key === 'End' ? n - 1
      : null
    if (next === null) return
    e.preventDefault()
    const id = eixosIndicadores[next].id
    onChangeEixo(id)
    tabRefs.current[id]?.focus()
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-stretch justify-center bg-black/40 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="indicadores-dialog-title"
        onKeyDown={handleDialogKeyDown}
        className="flex h-full w-full max-w-6xl animate-fade-up flex-col overflow-hidden bg-white shadow-card sm:h-auto sm:max-h-[90vh] sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 pb-3 pt-4 sm:px-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Marco Zero (T0)
            </span>
            <h2 id="indicadores-dialog-title" className="mt-0.5 text-lg font-semibold text-ink sm:text-xl">
              Indicadores de fortalecimento das OSCs
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-soft transition-colors hover:bg-base-light"
            aria-label="Fechar indicadores"
          >
            <X size={20} />
          </button>
        </div>

        <div
          role="tablist"
          aria-label="Eixos"
          className="thin-scrollbar flex gap-2 overflow-x-auto border-b border-line px-5 py-3 sm:px-6"
        >
          {eixosIndicadores.map((e, i) => {
            const selected = e.id === eixo.id
            const Icon = e.icon
            return (
              <button
                key={e.id}
                ref={(el) => {
                  tabRefs.current[e.id] = el
                }}
                type="button"
                role="tab"
                id={`tab-${e.id}`}
                aria-selected={selected}
                aria-controls={`painel-${e.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => onChangeEixo(e.id)}
                onKeyDown={(ev) => handleTabKeyDown(ev, i)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? 'border-primary bg-primary text-white'
                    : 'border-line bg-white text-ink-soft hover:border-primary/50 hover:text-primary-dark'
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                {e.tituloCurto}
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`painel-${eixo.id}`}
          aria-labelledby={`tab-${eixo.id}`}
          className="thin-scrollbar flex-1 overflow-y-auto"
        >
          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[300px_1fr] lg:gap-8">
            <EixoResumo eixo={eixo} />

            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-ink">
                  {eixo.indicadores.length} indicadores
                </h3>
                <div className="flex rounded-lg border border-line p-0.5" role="group" aria-label="Formato de visualização">
                  <VisaoButton active={visao === 'grafico'} onClick={() => setVisao('grafico')} icon={<BarChart3 size={14} aria-hidden="true" />}>
                    Gráfico
                  </VisaoButton>
                  <VisaoButton active={visao === 'tabela'} onClick={() => setVisao('tabela')} icon={<Table2 size={14} aria-hidden="true" />}>
                    Tabela
                  </VisaoButton>
                </div>
              </div>

              <div className="space-y-4">
                {agruparBlocos(eixo.indicadores).map((bloco) => (
                  <BlocoCard key={bloco.id} bloco={bloco} visao={visao} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EixoResumo({ eixo }: { eixo: EixoIndicadores }) {
  return (
    <aside className="space-y-4">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Eixo {eixo.numero}</span>
        <h3 className="mt-1 text-xl font-semibold leading-snug text-ink">{eixo.titulo}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{eixo.objetivo}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        <DestaqueCard tipo="forca" valor={eixo.forca.valor} texto={eixo.forca.texto} />
        <DestaqueCard tipo="lacuna" valor={eixo.lacuna.valor} texto={eixo.lacuna.texto} />
      </div>

      {eixo.marcosLegais.length > 0 && (
        <div className="rounded-xl border border-line p-4">
          <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-faint">
            <Scale size={13} aria-hidden="true" />
            Marcos legais
          </h4>
          <ul className="mt-2 space-y-1 text-xs leading-relaxed text-ink-soft">
            {eixo.marcosLegais.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}

function DestaqueCard({ tipo, valor, texto }: { tipo: 'forca' | 'lacuna'; valor: number; texto: string }) {
  const forca = tipo === 'forca'
  const Icon = forca ? TrendingUp : TrendingDown
  return (
    <div className={`rounded-xl p-4 ${forca ? 'bg-olive/10' : 'bg-primary-dark/10'}`}>
      <span
        className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wide ${
          forca ? 'text-olive-dark' : 'text-primary-dark'
        }`}
      >
        <Icon size={13} aria-hidden="true" />
        {forca ? 'Maior força' : 'Maior lacuna'}
      </span>
      <span className="mt-1 block font-sans text-3xl font-semibold text-ink">{formatPct(valor)}</span>
      <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{texto}</span>
    </div>
  )
}

function VisaoButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
        active ? 'bg-base-light text-ink' : 'text-ink-faint hover:text-ink-soft'
      }`}
    >
      {icon}
      {children}
    </button>
  )
}

function BlocoCard({ bloco, visao }: { bloco: Bloco; visao: Visao }) {
  if (bloco.kind === 'percentuais') {
    const { indicadores } = bloco
    const titulo = indicadores.length === 1 ? indicadores[0].titulo : 'Percentual de OSCs por indicador'
    return (
      <section className="rounded-xl border border-line p-4 sm:p-5">
        <h4 className="mb-4 text-sm font-semibold text-ink">{titulo}</h4>
        {visao === 'tabela' ? (
          <TablePercentuais caption={titulo} indicadores={indicadores} />
        ) : indicadores.length === 1 ? (
          <>
            <StatTile indicador={indicadores[0]} />
            <Calculo texto={indicadores[0].calculo} />
          </>
        ) : (
          <BarList items={indicadores.map((i) => ({ label: i.rotulo, valor: i.valor }))} />
        )}
      </section>
    )
  }

  const ind = bloco.indicador
  return (
    <section className="rounded-xl border border-line p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-sm font-semibold text-ink">{ind.titulo}</h4>
        {ind.comparativo && <ComparativoBadge />}
      </div>
      {ind.tipo === 'niveis'
        ? visao === 'tabela' ? <TableNiveis indicador={ind} /> : <StackedLevels indicador={ind} />
        : visao === 'tabela' ? <TableCategorias indicador={ind} /> : <BarList items={ind.itens} />}
      <Calculo texto={ind.calculo} />
    </section>
  )
}

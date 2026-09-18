import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Maximize2, Minimize2, Map as MapIcon, Search } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { oscs, municipioInfo, type Osc, type TipoServico } from '../../data/oscs'
import { Sidebar } from './Sidebar'
import { MapView } from './MapView'
import { DetailPanel } from './DetailPanel'
import type { DashboardFilters, MunicipioFiltro } from './types'

// Recharts pulls in a sizeable dependency tree; load it only once the
// dashboard actually mounts instead of bloating the initial page bundle.
const StatsCharts = lazy(() => import('./StatsCharts').then((m) => ({ default: m.StatsCharts })))

const ALL_TIPOS = new Set<TipoServico>(['crianca', 'idoso', 'mulher', 'pessoa_rua', 'deficiencia'])

interface DashboardSectionProps {
  onRequestAssessoria: (osc: Osc) => void
}

export function DashboardSection({ onRequestAssessoria }: DashboardSectionProps) {
  const [filters, setFilters] = useState<DashboardFilters>({
    activeTipos: new Set(ALL_TIPOS),
    activeMunicipio: 'todos',
    search: '',
  })
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    document.body.style.overflow = expanded ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [expanded])

  const visibleOscs = useMemo(() => {
    const term = filters.search.trim().toLowerCase()
    return oscs.filter(
      (o) =>
        filters.activeTipos.has(o.tipo) &&
        (filters.activeMunicipio === 'todos' || o.municipio === filters.activeMunicipio) &&
        (term === '' || o.nome.toLowerCase().includes(term)),
    )
  }, [filters])

  const selectedOsc = visibleOscs.find((o) => o.id === selectedId) ?? null
  const municipiosCobertos = new Set(visibleOscs.map((o) => o.municipio)).size

  function toggleTipo(tipo: TipoServico) {
    setFilters((prev) => {
      const next = new Set(prev.activeTipos)
      if (next.has(tipo)) next.delete(tipo)
      else next.add(tipo)
      return { ...prev, activeTipos: next }
    })
  }

  function selectMunicipio(municipio: MunicipioFiltro) {
    setFilters((prev) => ({ ...prev, activeMunicipio: municipio }))
  }

  const board = (
    <div className="flex h-full flex-col overflow-y-auto rounded-2xl border border-line bg-white shadow-card md:overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b border-line p-3.5">
        <div className="flex items-center gap-2 font-semibold text-ink">
          <MapIcon size={18} className="text-primary" aria-hidden="true" />
          <span className="text-sm">Mapa das OSCs — RMR</span>
        </div>

        <div className="relative min-w-[160px] flex-1">
          <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Buscar organização..."
            aria-label="Buscar organização por nome"
            className="w-full rounded-lg border border-line bg-surface-soft py-1.5 pl-8 pr-3 text-xs text-ink placeholder:text-ink-faint focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-ink-soft">
          <span className="rounded-full border border-line bg-surface-soft px-2.5 py-1">
            Total: <strong className="text-primary-dark">{visibleOscs.length}</strong> OSCs
          </span>
          <span className="hidden rounded-full border border-line bg-surface-soft px-2.5 py-1 sm:inline">
            Municípios: <strong className="text-primary-dark">{municipiosCobertos}</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-base-light"
          aria-pressed={expanded}
        >
          {expanded ? <Minimize2 size={14} aria-hidden="true" /> : <Maximize2 size={14} aria-hidden="true" />}
          {expanded ? 'Sair da tela cheia' : 'Tela cheia'}
        </button>
      </div>

      <div className="flex flex-col md:flex-1 md:flex-row md:overflow-hidden">
        <Sidebar
          filters={filters}
          visibleOscs={visibleOscs}
          selectedId={selectedId}
          onToggleTipo={toggleTipo}
          onSelectMunicipio={selectMunicipio}
          onSelectOsc={setSelectedId}
        />
        <MapView oscs={visibleOscs} selectedId={selectedId} onSelect={setSelectedId} />
        <DetailPanel osc={selectedOsc} onRequestAssessoria={onRequestAssessoria} />
      </div>

      <Suspense fallback={<div className="h-[220px] border-t border-line bg-surface-soft" />}>
        <StatsCharts oscs={visibleOscs} />
      </Suspense>
    </div>
  )

  return (
    <section id="dashboard" className="scroll-mt-20 bg-white py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Dashboard interativo"
            title="Onde estão as OSCs da Região Metropolitana do Recife"
            description={`${oscs.length} organizações mapeadas em ${Object.keys(municipioInfo).length} municípios da RMR. Filtre por tipo de serviço ou município para explorar o território.`}
          />
        </div>
      </Container>

      {!expanded && (
        <div className="mx-auto mt-8 w-full max-w-[1800px] px-3 sm:px-6 md:h-[700px] lg:h-[780px] xl:h-[840px]">
          {board}
        </div>
      )}

      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mapa das OSCs em tela cheia"
          className="fixed inset-0 z-[60] flex flex-col bg-black/40 p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="mx-auto h-full w-full max-w-[1800px]">{board}</div>
        </div>
      )}
    </section>
  )
}

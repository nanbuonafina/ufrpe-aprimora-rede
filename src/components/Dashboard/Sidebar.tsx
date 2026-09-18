import { tipoServicoInfo, municipioInfo, oscs, type MunicipioSlug, type TipoServico } from '../../data/oscs'
import type { DashboardFilters, MunicipioFiltro } from './types'

interface SidebarProps {
  filters: DashboardFilters
  visibleOscs: typeof oscs
  selectedId: number | null
  onToggleTipo: (tipo: TipoServico) => void
  onSelectMunicipio: (municipio: MunicipioFiltro) => void
  onSelectOsc: (id: number) => void
}

const MUNICIPIO_ORDER: MunicipioSlug[] = [
  'recife',
  'olinda',
  'jaboatao',
  'paulista',
  'cabo',
  'camaragibe',
  'sao_lourenco',
  'abreu_e_lima',
  'igarassu',
  'itapissuma',
  'itamaraca',
  'moreno',
  'aracoiaba',
  'ipojuca',
]

export function Sidebar({
  filters,
  visibleOscs,
  selectedId,
  onToggleTipo,
  onSelectMunicipio,
  onSelectOsc,
}: SidebarProps) {
  const tipoCounts = countBy(oscs, (o) => o.tipo)
  const municipioCounts = countBy(oscs, (o) => o.municipio)

  return (
    <div className="flex w-full flex-col border-line md:w-72 md:shrink-0 md:border-r">
      <div className="border-b border-line p-3.5">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
          Tipo de serviço
        </p>
        <div className="flex flex-col gap-1">
          {(Object.entries(tipoServicoInfo) as [TipoServico, { label: string; color: string }][]).map(
            ([tipo, info]) => {
              const on = filters.activeTipos.has(tipo)
              return (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => onToggleTipo(tipo)}
                  aria-pressed={on}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                    on ? 'bg-surface-warm text-primary-dark' : 'text-ink-soft hover:bg-base-light'
                  }`}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: info.color }}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{info.label}</span>
                  <span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] text-ink-faint">
                    {tipoCounts[tipo] ?? 0}
                  </span>
                </button>
              )
            },
          )}
        </div>
      </div>

      <div className="border-b border-line p-3.5">
        <p className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
          Município
          <span className="normal-case tracking-normal text-ink-faint/70">{MUNICIPIO_ORDER.length} na RMR</span>
        </p>
        <button
          type="button"
          onClick={() => onSelectMunicipio('todos')}
          aria-pressed={filters.activeMunicipio === 'todos'}
          className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors ${
            filters.activeMunicipio === 'todos' ? 'bg-surface-warm text-primary-dark' : 'text-ink-soft hover:bg-base-light'
          }`}
        >
          Todos os municípios
          <span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] text-ink-faint">
            {oscs.length}
          </span>
        </button>
        <div className="thin-scrollbar mt-1 max-h-52 overflow-y-auto pr-0.5">
          {MUNICIPIO_ORDER.map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => onSelectMunicipio(slug)}
              aria-pressed={filters.activeMunicipio === slug}
              className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                filters.activeMunicipio === slug ? 'bg-surface-warm font-medium text-primary-dark' : 'text-ink-soft hover:bg-base-light'
              }`}
            >
              {municipioInfo[slug].label}
              <span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] text-ink-faint">
                {municipioCounts[slug] ?? 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="thin-scrollbar max-h-72 flex-1 overflow-y-auto md:max-h-none">
        {visibleOscs.length === 0 ? (
          <p className="p-5 text-center text-xs text-ink-faint">Nenhuma OSC encontrada.</p>
        ) : (
          visibleOscs.map((osc) => (
            <button
              key={osc.id}
              type="button"
              onClick={() => onSelectOsc(osc.id)}
              className={`block w-full border-b border-line/70 p-3 text-left transition-colors hover:bg-base-light ${
                osc.id === selectedId ? 'border-l-2 border-l-primary bg-surface-warm pl-[10px]' : ''
              }`}
            >
              <p className="text-xs font-semibold text-ink">{osc.nome}</p>
              <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-ink-soft">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: tipoServicoInfo[osc.tipo].color }}
                  aria-hidden="true"
                />
                {tipoServicoInfo[osc.tipo].label}
                <span className="text-ink-faint">· {osc.bairro}</span>
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

function countBy<T, K extends string>(items: T[], key: (item: T) => K): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, item) => {
    const k = key(item)
    acc[k] = (acc[k] ?? 0) + 1
    return acc
  }, {})
}
